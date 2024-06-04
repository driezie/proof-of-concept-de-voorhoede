// Functie om een HTTP-verzoek te doen met behulp van de Fetch API
export async function makeFetchRequest(url, method, body = null) {
  // Opties object om het fetch verzoek te configureren
  const options = {
    method, // HTTP-methode (GET, POST, DELETE, PATCH, etc.)
    headers: {
      'Content-Type': 'application/json' // Geef aan dat de request body JSON is
    }
  };
  // Als er een body is, voeg deze dan toe aan het opties object na het "stringiferen"
  if (body) {
    options.body = JSON.stringify(body);
  }
  // Doe het fetch verzoek met de opgegeven URL en opties
  const response = await fetch(url, options);
  // Geef het response terug
  return response;
}
