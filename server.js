import express from "express";
import { makeFetchRequest } from "./helpers/fetchManager.js";

const app = express();
const apiUrl = "https://fdnd-agency.directus.app/items";

// Stel ejs in als de template engine en configureer de views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Bedien statische bestanden vanuit de 'public' directory
app.use(express.static("public"));

// Parseer URL-gecodeerde bodies
app.use(express.urlencoded({ extended: true }));

// Fetch de data van de API
const fetchFromApi = (endpoint) => {
  return makeFetchRequest(apiUrl + endpoint).then((response) =>
    response.json(),
  );
};

app.get("/", (req, res) => {
  // Render de 'index' template
  res.render("layout/" + "index");
});

// Routes om pagina's weer te geven
const pages = ["vacancies", "about", "news", "members", "contact"];

pages.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    if (page === "vacancies") {
      let endpoint =
        "/dda_agencies_vacancies?fields=id,title,description,photo.id,photo.width,photo.height,date_posted,locatie,employment,salary,agency_id.title,agency_id.colleagues,agency_id.photo.id,agency_id.photo.width,agency_id.photo.height";
      if (req.query.s) {
        endpoint += `&filter[_or][0][title][_contains]=${req.query.s}&filter[_or][1][description][_contains]=${req.query.s}&filter[_or][2][employment][_contains]=${req.query.s}`;
      }
      fetchFromApi(endpoint).then((data) => {
        console.log(data.data);
        // Render the template for the members page with the data from the API
        res.render("layout/" + page, { data: data.data || [] });
      });
    } else if (page === "members") {
      let endpoint =
        "/dda_agencies?fields=id,title,photo.id,photo.width,photo.height,logo.id,logo.width,logo.height,summary,vacancies.id,vacancies.title,vacancies.description,vacancies.employment";
      if (req.query.s) {
        endpoint += `&filter[_or][0][title][_contains]=${req.query.s}&filter[_or][1][summary][_contains]=${req.query.s}&filter[_or][2][description][_contains]=${req.query.s}&filter[_or][3][vacancies][title][_contains]=${req.query.s}&filter[_or][4][vacancies][description][_contains]=${req.query.s}&filter[_or][5][vacancies][employment][_contains]=${req.query.s}`;
      }
      fetchFromApi(endpoint).then((data) => {
        // Render the template for the members page with the data from the API
        res.render("layout/" + page, { data: data.data || [] });
      });
    } else {
      // Render the template for other pages
      res.render("layout/" + page);
    }
  });
});

const detailPages = ["member", "vacancy", "member/next", "vacancy/next"];

detailPages.forEach((page) => {
  if (page === "member") {
    app.get(`/${page}/:id`, (req, res) => {
      fetchFromApi(
        "/dda_agencies/" +
          req.params.id +
          "?fields=id,title,description,colleagues,email,phone,kvk,photo.id,photo.width.photo.height,vacancies.*.*",
      ).then((data) => {
        // Render de pagina voor elk lid en de data van de API
        console.log(data.data);
        res.render("layout/" + page, { member: data.data || [] });
      });
    });
  } else if (page === "vacancy") {
    app.get(`/${page}/:id`, (req, res) => {
      fetchFromApi(
        "/dda_agencies_vacancies/" +
          req.params.id +
          "?fields=title,description,locatie,salary,employment,date_posted,hours,url,photo.id,photo.width.photo.height,agency_id.id,agency_id.title,agency_id.summary,agency_id.colleagues,agency_id.vacancies,id",
      ).then((data) => {
        console.log(data.data);
        // Render de pagina voor elke vacature en de data van de API
        res.render("layout/" + page, { data: data.data || [] });
      });
    });
  } else if (page === "member/next") {
    app.get("/member/next/:id", (req, res) => {
      fetchFromApi("/dda_agencies").then((allMembersData) => {
        const members = allMembersData.data;
        // Bekijk de huidige positie van het lid in de lijst
        const currentMemberIndex = members.findIndex(
          (member) => member.id == req.params.id,
        );

        // Bepaal de positie van het volgende lid
        let nextMemberIndex;
        if (
          currentMemberIndex >= 0 &&
          currentMemberIndex < members.length - 1
        ) {
          nextMemberIndex = currentMemberIndex + 1;
        } else {
          nextMemberIndex = 0;
        }

        // Haal de ID van het volgende lid op
        const nextMemberId = members[nextMemberIndex].id;

        // Redirect naar de pagina van het volgende lid
        res.redirect(`/member/${nextMemberId}`);
      });
    });
  } else if (page === "vacancy/next") {
    app.get("/vacancy/next/:id/:agency_id", (req, res) => {
      fetchFromApi(
        "/dda_agencies/" + req.params.agency_id + "?fields=*.*.*.*",
      ).then((agencyData) => {
        const vacancies = agencyData.data.vacancies;

        // Bekijk de huidige positie van de vacature in de lijst
        const currentVacancyIndex = vacancies.findIndex(
          (vacancy) => vacancy.id == req.params.id,
        );

        // Bepaal de positie van de volgende vacature
        let nextVacancyIndex;
        if (
          currentVacancyIndex >= 0 &&
          currentVacancyIndex < vacancies.length - 1
        ) {
          nextVacancyIndex = currentVacancyIndex + 1;
        } else {
          nextVacancyIndex = 0;
        }

        // Haal de ID van de volgende vacature op
        const nextVacancyId = vacancies[nextVacancyIndex].id;

        // Redirect naar de pagina van de volgende vacature
        res.redirect(`/vacancy/${nextVacancyId}`);
      });
    });
  }
});

// Routes om pagina's weer te geven 404
const pages404 = [
  "apply",
  "sitemap",
  "privacy",
  "cases",
  "/theme/darkmode",
  "/theme/lightmode",
  "news/article",
  "events",
];

pages404.forEach((page) => {
  app.get(`/${page}`, (req, res) => {
    res.render("layout/" + "404");
  });
});

// Set the port number
app.set("port", process.env.PORT || 8000);

// Start de Express server
app.listen(app.get("port"), function () {
  console.log(`Applicatie gestart op http://localhost:${app.get("port")}`);
});
