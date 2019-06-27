import { call, put, takeLatest } from 'redux-saga/effects'
import api from './api'

function* fetchProjects(action) {
  try {
    const projects = yield call(api.fetchProjects, action.payload)
    yield put({ type: 'PROJECTS_FETCH_SUCCEEDED', payload: projects })
  } catch (e) {
    yield put({ type: 'PROJECTS_FETCH_FAILED', payload: e.message })
  }
}

function* mySaga() {
  yield takeLatest('PROJECTS_FETCH_REQUESTED', fetchProjects)
}

export default mySaga
