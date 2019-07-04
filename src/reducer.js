import constants from './constants'

const initialState = {
  projects: [],
  erorrMessage: '',
  isFetchEnable: true,
  page: constants.initPage,
  query: 'reac',
  isScrollBottom: false,
  isLoaderActive: false,
  areProjectsAvailable: true,
  isLastPage: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LAST_PAGE_REACHED':
      return {
        ...state,
        isLastPage: action.payload,
      }
    case 'SET_LOADER_ACTIVITY':
      return {
        ...state,
        isLoaderActive: action.payload,
      }
    case 'SCROLL_TOUCHED_BOT':
      return {
        ...state,
        isScrollBottom: action.payload,
      }
    case 'PROJECTS_FETCH_SUCCEEDED':
      return {
        ...state,
        projects: [...state.projects, ...action.payload.projects],
        page: state.page + 1,
        erorrMessage: initialState.erorrMessage,
        areProjectsAvailable: true,
      }
    case 'PROJECTS_FETCH_FAILED':
      return {
        ...state,
        erorrMessage: action.payload,
      }
    case 'SET_PROJECTS_AVAILABILITY': {
      return {
        ...state,
        areProjectsAvailable: action.payload,
      }
    }
    case 'SET_FETCH_AVAILABILITY':
      return {
        ...state,
        isFetchEnable: action.payload,
      }
    case 'SET_QUERY':
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
