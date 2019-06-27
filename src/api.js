import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import _ from 'lodash'

export async function fetchProjects(subject) {
  try {
    const response = await axios({
      url: `https://api.github.com/search/repositories?q=${subject}`,
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
