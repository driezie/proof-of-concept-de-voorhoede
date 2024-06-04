import express from 'express';
import { makeFetchRequest } from './helpers/fetchManager.js';

const app = express();
const apiUrl = "https://fdnd-agency.directus.app/items";

// Set ejs as the template engine and configure the views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Example route to render a page with the selected language

// Import and use cookie-parser middleware
import cookieParser from 'cookie-parser';
app.use(cookieParser());

// Route to set language preference and save in cookie
app.get('/lang/:language', (req, res) => {
  const { language } = req.params;
  res.cookie('language', language, { maxAge: 900000, httpOnly: true }); // Set cookie for 15 minutes
  res.redirect('/');
});

// Route to render page with language preference from cookie
app.get('/', (req, res) => {
  const lang = req.cookies.language || 'en'; // Get language from cookie or default to English
  // Make a request to fetch data based on the selected language
  makeFetchRequest(apiUrl, lang)
    .then(data => {
      // Render the view with the fetched data and the selected language
      res.render('index', { data, lang });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      res.status(500).send('Internal Server Error');
    });
});
// Set the port number
app.set('port', process.env.PORT || 8000);

// Start the Express server
app.listen(app.get('port'), function() {
  console.log(`Application started on http://localhost:${app.get('port')}`);
});
