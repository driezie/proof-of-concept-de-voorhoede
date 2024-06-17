import express from 'express';
import { makeFetchRequest } from './helpers/fetchManager.js';

const app = express()
const apiUrl = "https://fdnd-agency.directus.app/items";

// Stel ejs in als de template engine en configureer de views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Bedien statische bestanden vanuit de 'public' directory
app.use(express.static('public'));

// Parseer URL-gecodeerde bodies
app.use(express.urlencoded({ extended: true }));

// Fetch de data van de API
const fetchFromApi = (endpoint) => {
  return makeFetchRequest(apiUrl + endpoint).then(response => response.json());
};

app.get('/', (req, res) => {
  // Render de 'index' template
  res.render('index');
});

// Routes om pagina's weer te geven
const pages = ['vacancies', 'about', 'news', 'members', 'contact', 'cases'];

pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {

    if (page === 'vacancies') {
      fetchFromApi('/dda_agencies_vacancies?fields=*.*.*').then(data => {
        // Render de template voor elke pagina met en de data van de API
        res.render(page, { data: data.data });
      });
      return;
    } else if (page === 'members') {
      fetchFromApi('/dda_agencies').then(data => {
        // Render de template voor elke pagina en de data van de API
        res.render(page, { data: data.data });
      });
      return;
    }
    // Render de template voor elke pagina 
    res.render(page);
  });
});

const detailPages = ['member', 'vacancy', 'member/next', 'vacancy/next'];

detailPages.forEach(page => {
  if (page === 'member') {
    app.get(`/${page}/:id`, (req, res) => {
      fetchFromApi('/dda_agencies/' + req.params.id + "?fields=*.*.*").then(data => {
        // Render de pagina voor elk lid en de data van de API
        res.render(page, { member: data.data });
      });
    });
  } else if (page === 'vacancy') {
    app.get(`/${page}/:id`, (req, res) => {
      fetchFromApi('/dda_agencies_vacancies/' + req.params.id + "?fields=*.*.*").then(data => {
        // Render de pagina voor elke vacature en de data van de API
        res.render(page, { data: data.data });
      });
    });
  } else if (page === 'member/next') {
    app.get('/member/next/:id', (req, res) => {
      fetchFromApi('/dda_agencies?fields=*.*.*').then(allMembersData => {
        const members = allMembersData.data;
        // Bekijk de huidige positie van het lid in de lijst
        const currentMemberIndex = members.findIndex(member => member.id == req.params.id);
        
        // Bepaal de positie van het volgende lid
        let nextMemberIndex;
        if (currentMemberIndex >= 0 && currentMemberIndex < members.length - 1) {
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
  
  } else if (page === 'vacancy/next') {
    app.get('/vacancy/next/:id/:agency_id', (req, res) => {
      fetchFromApi('/dda_agencies/' + req.params.agency_id + '?fields=*.*.*').then(agencyData => {
        const vacancies = agencyData.data.vacancies;

        // Bekijk de huidige positie van de vacature in de lijst
        const currentVacancyIndex = vacancies.findIndex(vacancy => vacancy.id == req.params.id);
        
        // Bepaal de positie van de volgende vacature
        let nextVacancyIndex;
        if (currentVacancyIndex >= 0 && currentVacancyIndex < vacancies.length - 1) {
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

// Set the port number
app.set('port', process.env.PORT || 8000);

// Start de Express server
app.listen(app.get('port'), function() {
  console.log(`Applicatie gestart op http://localhost:${app.get('port')}`);
});
