import { call, put, takeLatest, delay, fork } from 'redux-saga/effects'
import api from './api'
import _ from 'lodash'
import constants from './constants'

const { perPage, availableResults, initPage } = constants

function* fetchProjects(action) {
  try {
    yield put({ type: 'SET_FETCH_AVAILABILITY', payload: false })
    yield put({ type: 'SET_LOADER_ACTIVITY', payload: true })
    yield put({ type: 'LAST_PAGE_REACHED', payload: false })

    const { page } = action.payload
    const {
      projects = [],
      totalCount = -1,
      rateLimitResetTime = 0,
      statusCode,
      message = '',
    } = yield call(api.fetchProjects, action.payload)

    yield put({ type: 'SCROLL_TOUCHED_BOT', payload: false })

    if (projects.length !== 0) {
      yield put({
        type: 'PROJECTS_FETCH_SUCCEEDED',
        payload: { projects, totalCount },
      })
      yield put({ type: 'SET_LOADER_ACTIVITY', payload: false })
      yield delay(2000)
      yield put({ type: 'SET_FETCH_AVAILABILITY', payload: true })
    } else if (totalCount === 0) {
      yield put({ type: 'SET_PROJECTS_AVAILABILITY', payload: false })
      yield put({ type: 'SET_LOADER_ACTIVITY', payload: false })
    } else if (statusCode === 403) {
      yield put({
        type: 'PROJECTS_FETCH_FAILED',
        payload: `statusCode: ${statusCode}, message: ${message}`,
      })
      yield delay(_.toInteger(rateLimitResetTime) * 1000)
      yield fetchProjects(action)
    } else if (
      page >= _.ceil(totalCount / perPage) ||
      page >= _.ceil(availableResults / perPage) - initPage
    ) {
      yield put({
        type: 'PROJECTS_FETCH_FAILED',
        payload: `statusCode: ${statusCode}, message: ${message}`,
      })
      yield put({ type: 'LAST_PAGE_REACHED', payload: true })
      yield put({ type: 'SET_FETCH_AVAILABILITY', payload: false })
      yield put({ type: 'SET_LOADER_ACTIVITY', payload: false })
    }
  } catch (e) {
    yield put({
      type: 'PROJECTS_FETCH_FAILED',
      payload: `[sagas.fetchProjects]: ${e.message}`,
    })
  }
}

function* handleInput({ payload }) {
  yield delay(1500)
  yield payload.length >= 3 &&
    call(fetchProjects, {
      payload: { query: payload, page: initPage },
    })
}

function* watchInput() {
  yield takeLatest('SET_QUERY', handleInput)
}

function* mySaga() {
  yield takeLatest('PROJECTS_FETCH_REQUESTED', fetchProjects)
  yield fork(watchInput)
}

export default mySaga
