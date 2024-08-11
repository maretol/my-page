function getHostname() {
  return process.env.HOST || 'https://www.maretol.com/'
}

function getCMSAPIKey() {
  return process.env.CMS_API_KEY || ''
}

function getNodeEnv() {
  return process.env.NODE_ENV || 'development'
}

export { getHostname, getCMSAPIKey, getNodeEnv }
