/* Arguments: axios, env, networkLogs [], errors []  */
const handleError = (error) => {
  const { response, config } = error
  if (response.status === 404) {
    errors.push(`NOT FOUND ${config.url}`)
    return { error: null }
  }
  if (response.status === 401) {
    throw new Error('NO AUTH PROVIDED YOU MUST SET useInternalAuth = true')
  }
  return { error: response.data }
}

const handleResult = (result, errors) => {
  if (result.error) {
    errors.push(result.error)
    return null
  }
  return result.data
}

const _repeatableCall = async (path, method, data) => {
  networkLogs.push({
    path, method, data
  })
  const headers = { admin: 'true' }
  if (method === 'POST' || method === 'PATCH') {
    headers['Content-Type'] = 'application/json'
  }
  const config = {
    url: `${env.EXTERNAL_API_URL}${path}`,
    method,
    headers,
    data,
  }
  try {
    const response = await axios(config)
    return { data: response.data }
  } catch (error) {
    if (error.response.status === 429) {
      const waitTime = Number(
        error.response.headers['retry-after'] ?? error.response.headers['Retry-After'] ?? 1
      )*1000
      await new Promise(resolve => setTimeout(resolve, waitTime))
      return _repeatableCall(path, method, data)
    }
    return handleError(error)
  }
}

return { handleError, handleResult, _repeatableCall }
