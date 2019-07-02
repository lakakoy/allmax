import { call, put, takeLatest, delay, fork } from 'redux-saga/effects'
import api from './api'
import _ from 'lodash'

function* fetchProjects(action) {
  try {
    yield put({ type: 'SET_FETCH_AVAILABILITY', payload: false })
    yield put({ type: 'SET_LOADER_ACTIVITY', payload: true })

    const { projects, statusCode, rateLimitResetTime = 0 } = yield call(
      api.fetchProjects,
      action.payload
    )

    yield put({ type: 'SCROLL_TOUCHED_BOT', payload: false })

    if (projects.length !== 0) {
      yield put({ type: 'PROJECTS_FETCH_SUCCEEDED', payload: projects })
      yield put({ type: 'SET_LOADER_ACTIVITY', payload: false })
      yield delay(2000)
      yield put({ type: 'SET_FETCH_AVAILABILITY', payload: true })
    } else {
      yield put({
        type: 'PROJECTS_FETCH_FAILED',
        payload: `statusCode: ${statusCode}, rateLimitResetTime: ${rateLimitResetTime}s`,
      })
      yield delay(_.toInteger(rateLimitResetTime) * 1000)
      yield fetchProjects(action)
    }
  } catch (e) {
    yield put({
      type: 'PROJECTS_FETCH_FAILED',
      payload: `[sagas.fetchProjects]: ${e.message}`,
    })
  }
}

function* handleInput({ payload }) {
  yield delay(500)
  yield payload.length >= 3 &&
    call(fetchProjects, { payload: { query: payload, page: 1 } })
}

function* watchInput() {
  yield takeLatest('SET_QUERY', handleInput)
}

function* mySaga() {
  yield takeLatest('PROJECTS_FETCH_REQUESTED', fetchProjects)
  yield fork(watchInput)
}

export default mySaga
