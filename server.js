import express from "express"
import { fetchFromApi } from "./helpers/fetchManager.js"
import { getNextItemId } from "./helpers/itemNavigator.js"
import { renderPage, renderDetailPage } from "./helpers/pageRenderer.js"

// Variables
const app = express()
const apiUrl = "https://fdnd-agency.directus.app/items"
const renderFolder = "layout/"

// Routes to load the pages
const pages = [
  "vacancies",
  "about",
  "news",
  "members",
  "contact"
]

// Routes to load the detail pages
const detailPages = [
  "member",
  "vacancy",
  "member/next",
  "vacancy/next"
]

// Routes to load the 404 pages
const pages404 = [
  "apply",
  "sitemap",
  "privacy",
  "cases",
  "/theme/darkmode",
  "/theme/lightmode",
  "news/article",
  "events",
]

// Sets the view engine to ejs
app.set("view engine", "ejs")

// Sets the views folder
app.set("views", "./views")

// Set the port number
app.set("port", 8000)

// Starts the server on public folder
app.use(express.static("public"))

// Parse URL-coded bodies
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render(renderFolder + "index")
})

pages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    if (page === 'vacancies') {
      let endpoint = '/dda_agencies_vacancies?fields=id,title,description,photo.id,photo.width,photo.height,date_posted,locatie,employment,salary,agency_id.title,agency_id.colleagues,agency_id.photo.id,agency_id.photo.width,agency_id.photo.height'
      if (req.query.s) {
        endpoint += `&filter[_or][0][title][_contains]=${req.query.s}&filter[_or][1][description][_contains]=${req.query.s}&filter[_or][2][employment][_contains]=${req.query.s}`
      }
      renderPage(apiUrl, renderFolder, page, req, res, endpoint)
    } else if (page === 'members') {
      let endpoint = '/dda_agencies?fields=id,title,photo.id,photo.width,photo.height,logo.id,logo.width,logo.height,summary,vacancies.id,vacancies.title,vacancies.description,vacancies.employment'
      if (req.query.s) {
        endpoint += `&filter[_or][0][title][_contains]=${req.query.s}&filter[_or][1][summary][_contains]=${req.query.s}&filter[_or][2][description][_contains]=${req.query.s}&filter[_or][3][vacancies][title][_contains]=${req.query.s}&filter[_or][4][vacancies][description][_contains]=${req.query.s}&filter[_or][5][vacancies][employment][_contains]=${req.query.s}`
      }
      renderPage(apiUrl, renderFolder, page, req, res, endpoint)
    } else {
      renderPage(apiUrl, renderFolder, page, req, res)
    }
  })
})

detailPages.forEach((page) => {
  if (page === 'member') {
    app.get(`/${page}/:id`, (req, res) => {
      const endpoint = `/dda_agencies/${req.params.id}?fields=id,title,description,colleagues,email,phone,kvk,photo.id,photo.width,photo.height,vacancies.*.*`
      renderDetailPage(apiUrl, renderFolder, page, req, res, endpoint)
    })
  } else if (page === 'vacancy') {
    app.get(`/${page}/:id`, (req, res) => {
      const endpoint = `/dda_agencies_vacancies/${req.params.id}?fields=title,description,locatie,salary,employment,date_posted,hours,url,photo.id,photo.width,photo.height,agency_id.id,agency_id.title,agency_id.summary,agency_id.colleagues,agency_id.vacancies,id`
      renderDetailPage(apiUrl, renderFolder, page, req, res, endpoint)
    })
  } else if (page === 'member/next') {
    app.get('/member/next/:id', (req, res) => {
      fetchFromApi(apiUrl, '/dda_agencies')
        .then((allMembersData) => {
          const nextMemberId = getNextItemId(allMembersData.data, req.params.id)
          res.redirect(`/member/${nextMemberId}`)
        })
    })
  } else if (page === 'vacancy/next') {
    app.get('/vacancy/next/:id/:agency_id', (req, res) => {
      fetchFromApi(apiUrl, `/dda_agencies/${req.params.agency_id}?fields=*.*.*.*`)
        .then((agencyData) => {
          const nextVacancyId = getNextItemId(agencyData.data.vacancies, req.params.id)
          res.redirect(`/vacancy/${nextVacancyId}`)
        })
    })
  }
})

pages404.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    res.render(renderFolder + "404")
  })
})

// Start the Express server
app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`)
})
