// helpers/fetchManager.js
export async function makeFetchRequest(url, method = 'GET', body = null) {
  const options = {
    method, // HTTP-methode (GET, POST, DELETE, PATCH, etc.)
    headers: {
      'Content-Type': 'application/json' // Geef aan dat de request body JSON is
    }
  }
  // Als er een body is, voeg deze dan toe aan het opties object na het "stringiferen"
  if (body) {
    options.body = JSON.stringify(body)
  }
  // Doe het fetch verzoek met de opgegeven URL en opties
  const response = await fetch(url, options)
  // Geef het response terug
  return response
}

// Functie om gegevens van de API op te halen
export async function fetchFromApi(apiUrl, endpoint) {
  const response = await makeFetchRequest(apiUrl + endpoint)
  const data = await response.json()
  return data
}
