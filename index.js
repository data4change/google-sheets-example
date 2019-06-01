const API_KEY = '<API_KEY>';
const SHEET_ID = '<SHEET_ID>';
const SHEET_NAME = '<SHEET_NAME>'; // name of the data range in a spreadsheet

function constructSheetApiUrl(sheetId, sheetName, apiKey) {
  const BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';
  return `${BASE_URL}/${sheetId}/values:batchGet?ranges=${sheetName}&key=${apiKey}`;
}

function parseResponseJSON(respJson) {
  if (respJson && respJson.valueRanges && respJson.valueRanges.length) {
    const { values } = respJson.valueRanges[0];

    if (values.length) {
      //  first row is an array of keys
      const keys = values.shift();
      
      return values.reduce((acc, row) => {
        const obj = row.reduce((acc, value, i) => {
          acc[keys[i]] = value;
          return acc;
        }, {});

        acc.push(obj);
        return acc;
      }, []);
    }

    return {};
  }
}

async function getGoogleSheetData(sheetId, sheetName, apiKey) {
  const url = constructSheetApiUrl(sheetId, sheetName, apiKey);
  const response = await fetch(url);
  const json = await response.json();
  const data = parseResponseJSON(json);
  return data;
}

(async() => {
  const data = await getGoogleSheetData(SHEET_ID, SHEET_NAME, API_KEY);
  console.log('Data', data);
})();
