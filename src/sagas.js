import { call, put, takeLatest, delay, fork } from 'redux-saga/effects'
import api from './api'

function* fetchProjects(action) {
  try {
    const projects = yield call(api.fetchProjects, action.payload)
    yield put({ type: 'PROJECTS_FETCH_SUCCEEDED', payload: projects })
  } catch (e) {
    yield put({
      type: 'PROJECTS_FETCH_FAILED',
      payload: `[sagas.fetchProjects]:${e.message}`,
    })
  }
}

function* handleInput({ payload }) {
  yield delay(250)
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
