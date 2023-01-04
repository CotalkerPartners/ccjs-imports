# ccjs-imports
Useful imports for Cotalker CCJS

import using the following example:
```Javascript
const cotimporter = async (mod, args) => {
  const githubPath = `CotalkerPartners/ccjs-imports/main/${mod}.js`
  const text = (await axios.get(`https://raw.githubusercontent.com/${githubPath}`)).data
  return (new Function(...args,text))
}
const errors = [], networkLogs = []
const baseAPI = (await cotimporter('BASE_API',['axios','networkLogs','errors']))(axios, networkLogs, errors)
const COTPropertyAPI = (await cotimporter('COTProperty',['baseAPI']))(baseAPI)
```
