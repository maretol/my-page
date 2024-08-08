function getHostname() {
  return process.env.HOST || 'https://www.maretol.com/'
}

function getCMSAPIKey() {
  return process.env.CMS_API_KEY || ''
}

export { getHostname, getCMSAPIKey }
