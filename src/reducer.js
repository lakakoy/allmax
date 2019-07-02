const initialState = {
  projects: [],
  erorrMessage: '',
  isFetchEnable: true,
  page: 1,
  query: 'reac',
  isScrollBottom: false,
  isLoaderActive: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
        projects: [...state.projects, ...action.payload],
        page: state.page + 1,
        erorrMessage: initialState.erorrMessage,
      }
    case 'PROJECTS_FETCH_FAILED':
      return {
        ...state,
        erorrMessage: action.payload,
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
