// helpers/apiHelper.js
import { makeFetchRequest } from './fetchManager.js'

export const fetchFromApi = async (apiUrl, endpoint, fields = []) => {
  const fieldsQuery = fields.length > 0 ? `?fields=${fields.join(',')}` : ''
  const response = await makeFetchRequest(`${apiUrl}${endpoint}${fieldsQuery}`)
  const data = await response.json()
  return data
}

export const fetchDataWithFilters = async (apiUrl, endpoint, fields = [], filters = []) => {
  const fieldsQuery = fields.length > 0 ? `?fields=${fields.join(',')}` : ''
  const filtersQuery = filters.length > 0 ? `&filter=${filters.join('&filter=')}` : ''
  const response = await makeFetchRequest(`${apiUrl}${endpoint}${fieldsQuery}${filtersQuery}`)
  const data = await response.json()
  return data
}
