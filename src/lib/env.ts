function getHostname() {
  return process.env.HOST || 'https://www.maretol.com/'
}

function getCMSAPIKey() {
  return process.env.CMS_API_KEY || ''
}

function getNodeEnv() {
  return process.env.NODE_ENV || 'development'
}

function getCMSParser() {
  return process.env.CMS_PARSER || ''
}

function getOGPFetcher() {
  return process.env.OGP_FETCHER || ''
}

function getCMSParserAPIKey() {
  return process.env.CMS_PARSER_API_KEY || 'hogehoge'
}

function getOGPFetcherAPIKey() {
  return process.env.OGP_FETCHER_API_KEY || 'fugafuga'
}

export {
  getHostname,
  getCMSAPIKey,
  getNodeEnv,
  getOGPFetcher,
  getCMSParser,
  getCMSParserAPIKey,
  getOGPFetcherAPIKey,
}
