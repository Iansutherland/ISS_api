axios =  require('axios');
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

async function formatTableData() {
    const page = await callApi()
    const dom = new JSDOM(page.data);

    //get table element
    const tableElem = dom.window.document.querySelector('.table');
    const tableContent = tableElem ?tableElem.textContent : null;

    //get table headers
    const firstRow = tableElem.querySelector('tr');
    const headers = firstRow.textContent.trim().split('\n\t');

    //get rid of 'share event' column used for social media links
    headers.pop(-1);

    //get the other rows
    const dataRows = Array.from(tableElem.querySelectorAll('tr'))
        .map(x => x.textContent.replace("\t", "").split('\n').filter(x => x !== '').splice(0, 5));
    const dataSansHeaders = dataRows.splice(1, dataRows.length).map(x => x.map(str => str.replace("\t", "")));

    const resultArray = [];
    const result = {};
    dataSansHeaders.map(row => {
        row.map((cell, index) => result[headers[index]] = cell)
        resultArray.push(result);
    })
    
    return resultArray;
}

async function callApi() {
    const result = await axios.get(`https://spotthestation.nasa.gov/sightings/view.cfm?country=United_States&region=Arizona&city=Phoenix`);
    if(result.statusCode === 200){
        return result.data;
    }
    else{
        return result
    }
}

formatTableData().then(x => console.log(x));