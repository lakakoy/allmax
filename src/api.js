import axios from 'axios'
import jsonpAdapter from 'axios-jsonp'
import _ from 'lodash'
import m from 'moment'
import constants from './constants'

export async function fetchProjects(payload) {
  try {
    const { query, page } = payload
    const response = await axios({
      url: `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=${
        constants.perPage
      }`,
      adapter: jsonpAdapter,
    })
    const statusCode = _.get(response, ['data', 'meta', 'status'])

    return statusCode === 200
      ? {
          totalCount: _.get(response, ['data', 'data', 'total_count']),
          projects: _.get(response, ['data', 'data', 'items']),
          statusCode,
        }
      : {
          rateLimitResetTime: m(
            m(
              _.get(response, ['data', 'meta', 'X-RateLimit-Reset']),
              'X'
            ).format('hh:mm:ss'),
            'hh:mm:ss'
          )
            .subtract(m().format('s'), 'seconds')
            .format('s'),
          statusCode,
          message: _.get(response, ['data', 'data', 'message']),
        }
  } catch (error) {}

  return null
}

const api = {
  fetchProjects,
}

export default api
