import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import _ from 'lodash'
import m from 'moment'

export async function fetchProjects(payload) {
  try {
    const { query, page } = payload
    const response = await axios({
      url: `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=30`,
      adapter: jsonpAdapter,
    })

    const statusCode = _.get(response, ['data', 'meta', 'status'])

    return statusCode === 200
      ? { projects: _.get(response, ['data', 'data', 'items']), statusCode }
      : {
          projects: [],
          statusCode,
          rateLimitResetTime: m(
            m(
              _.get(response, ['data', 'meta', 'X-RateLimit-Reset']),
              'X'
            ).format('hh:mm:ss'),
            'hh:mm:ss'
          )
            .subtract(m().format('s'), 'seconds')
            .format('s'),
        }
  } catch (error) {}

  return null
}

const api = {
  fetchProjects,
}

export default api
