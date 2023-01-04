# ccjs-imports
Useful imports for Cotalker CCJS

import using the following example:
```Javascript
const cotimporter = async (mod, baseAPI) => {
  const githubPath = `CotalkerPartners/ccjs-imports/main/${mod}.js`
  const text = (await axios.get(`https://raw.githubusercontent.com/${githubPath}`)).data
  if (mod === 'BASE_API') return (new Function('axios','env','networkLogs','errors',text))(axios, env, networkLogs, errors)
  return (new Function('baseAPI',text))(baseAPI)
}
const errors = [], networkLogs = []
const baseAPI = await cotimporter('BASE_API')
const COTPropertyAPI = await cotimporter('COTProperty', baseAPI)

const banana = await COTPropertyAPI.getByCode('banana')
return { banana }
```
