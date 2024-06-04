// Importeer het npm pakket express uit de node_modules map
import express from 'express';

// Importeer de zelfgemaakte functies uit de ./helpers map
import { makeFetchRequest } from './helpers/fetchManager.js';

// Maak een nieuwe express app aan
const app = express();

// API naar Directus
const apiUrl = "https://fdnd-agency.directus.app/items";

// Stel ejs in als template engine
// Stel de map met ejs templates in
// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
// Zorg dat werken met request data makkelijker wordt
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', async (request, response) => {

  // Rendert de homepagina 
  response.render('index');
});




// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`);
});
