This project scrapes https://spotthestation.nasa.gov/ for sight timings to view the International Space Station

scraper:
 scrapeISS.js runs an http call and parses out the data and stores in DB

 DB (in progess):
  probably mySQL, probably just one table for holding the viewing time info

web api (in progress):
 probably node with express.js to support other apps accessing data