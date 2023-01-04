/* Arguments: baseAPI, errors */
const { _repeatableCall, handleError, handleResult } = baseAPI
return {
  getQuery: async (query) => {
    const result = await _repeatableCall(`/api/v2/properties?${qs.stringify(query)}`, 'GET')
    return handleResult(result, errors)
  },
  post: async (property) => {
    const result = await _repeatableCall('/api/v2/properties', 'POST', property)
    return handleResult(result, errors)
  },
  patch: async (id, body) => {
    const result = await _repeatableCall(`/api/v2/properties/${id}`, 'PATCH', body)
    return handleResult(result, errors)
  },
  jsonPatch: async (id, body) => {
    if (!Array.isArray(body)) throw new Error('JSON PATCH MUST BE CALLED WITH AN ARRAY AS BODY')
    const result = await _repeatableCall(`/api/v2/properties/jsonpatch/${id}`, 'PATCH', body)
    return handleResult(result, errors)
  },
  getByCode: async (code) => {
    const result = await _repeatableCall(`/api/v2/properties/code/${code}`, 'GET')
    return handleResult(result, errors)
  },
  getById: async (id) => {
    const result = await _repeatableCall(`/api/v2/properties/${id}`, 'GET')
    return handleResult(result, errors)
  }
}
