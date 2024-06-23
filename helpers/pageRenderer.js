// helpers/pageRenderer.js
import { fetchFromApi } from './fetchManager.js'

export const renderPage = (apiUrl, renderFolder, page, req, res, endpoint = null) => {
  if (endpoint) {
    fetchFromApi(apiUrl, endpoint).then((data) => {
      res.render(renderFolder + page, { data: data.data || [] })
    }).catch((error) => {
      console.error(`Error fetching data for ${page}:`, error)
      res.status(500).send("Internal Server Error")
    })
  } else {
    res.render(renderFolder + page)
  }
}

export const renderDetailPage = (apiUrl, renderFolder, page, req, res, endpoint) => {
  fetchFromApi(apiUrl, endpoint).then((data) => {
    res.render(renderFolder + page, { data: data.data || [] })
  }).catch((error) => {
    console.error(`Error fetching data for ${page}:`, error)
    res.status(500).send("Internal Server Error")
  })
}
