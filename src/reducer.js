const initialState = {
  projects: [],
  message: '',
  isFetchEnable: true,
  page: 1,
  query: 'react',
}

const reducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'PROJECTS_FETCH_SUCCEEDED':
      return {
        ...state,
        projects: [...state.projects, ...action.payload],
        isFetchEnable: true,
        page: state.page + 1,
      }
    case 'PROJECTS_FETCH_FAILED':
      return {
        ...state,
        message: action.payload,
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
