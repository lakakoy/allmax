import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import _ from 'lodash'

export async function fetchProjects(payload) {
  try {
    const { query, page } = payload
    const response = await axios({
      url: `https://api.github.com/search/repositories?q=${query}&page=${page}`,
      adapter: jsonpAdapter,
    })

    return _.get(response, ['data', 'data', 'items'])
  } catch (error) {}

  return null
}

const api = {
  fetchProjects,
}

export default api
