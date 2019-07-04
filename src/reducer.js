import _ from 'lodash'
import constants from './constants'
import * as ActionTypes from './actions'

const initialState = {
  projects: [],
  erorrMessage: '',
  isFetchEnable: true,
  page: constants.initPage,
  query: '',
  isScrollBottom: false,
  isLoaderActive: false,
  areProjectsAvailable: true,
  isLastPage: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LAST_PAGE_REACHED:
      return {
        ...state,
        isLastPage: action.payload,
      }
    case ActionTypes.SET_LOADER_ACTIVITY:
      return {
        ...state,
        isLoaderActive: action.payload,
      }
    case ActionTypes.SCROLL_TOUCHED_BOT:
      return {
        ...state,
        isScrollBottom: action.payload,
      }
    case ActionTypes.PROJECTS_FETCH_SUCCEEDED:
      return {
        ...state,
        projects: _.uniqBy([...state.projects, ...action.payload.projects], project => project.id),
        page: state.page + 1,
        erorrMessage: initialState.erorrMessage,
        areProjectsAvailable: true,
      }
    case ActionTypes.PROJECTS_FETCH_FAILED:
      return {
        ...state,
        erorrMessage: action.payload,
      }
    case ActionTypes.SET_PROJECTS_AVAILABILITY: {
      return {
        ...state,
        areProjectsAvailable: action.payload,
      }
    }
    case ActionTypes.SET_FETCH_AVAILABILITY:
      return {
        ...state,
        isFetchEnable: action.payload,
      }
    case ActionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
        page: initialState.page,
        projects: initialState.projects,
      }
    default:
      return state
  }
}

export default reducer
