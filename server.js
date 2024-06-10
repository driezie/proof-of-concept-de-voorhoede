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

// Routes om pagina's weer te geven met de thema voorkeur
const pages = ['vacancies', 'about', 'news', 'members', 'contact', 'cases'];

pages.forEach(page => {
  app.get(`/${page}`, (req, res) => {

    if (page === 'vacancies') {
      fetchFromApi('/dda_agencies_vacancies').then(data => {
        console.log(data);
        // Render de template voor elke pagina met het huidige thema en de data van de API
        res.render(page, { data: data.data });
      });
      return;
    } else if (page === 'members') {
      fetchFromApi('/dda_agencies').then(data => {
        // Render de template voor elke pagina met het huidige thema en de data van de API
        res.render(page, { data: data.data });
      });
      return;
    }
    // Render de template voor elke pagina met het huidige thema
    res.render(page);
  });
});

const detailPages = ['member'];

detailPages.forEach(page => {
  if (page === 'member') {
    app.get(`/${page}/:id`, (req, res) => {
      fetchFromApi('/dda_agencies/' + req.params.id).then(data => {
        // Render the template for each page with the current theme and the data from the API
        res.render(page, { member: data.data})
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
