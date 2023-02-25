// Load the Google API client library
gapi.load('client', start);

// Initialize the Google API client library with your OAuth2 credentials
function start() {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    clientId: 'YOUR_CLIENT_ID',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    scope: 'https://www.googleapis.com/auth/spreadsheets'
  }).then(function() {
    // Authenticate the user and authorize access to the Google Sheets API
    gapi.auth2.getAuthInstance().signIn();
  });
}

// Define the Google Sheets document ID and sheet name where the link data will be stored
const spreadsheetId = 'YOUR_SPREADSHEET_ID';
const sheetName = 'Link Data';

// Create a new row in the Google Sheets document with the link data
function addRowToSheet(data) {
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: spreadsheetId,
    range: sheetName + '!A1',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [
        [data.id, data.userId, data.buttonId, data.pagelink, data.referrer, data.redirectLink, data.text, data.clicks, JSON.stringify(data.visitHistory), data.date]
      ]
    }
  }).then(function(response) {
    console.log('Link data added to Google Sheets:', response);
  }, function(error) {
    console.error('Error adding link data to Google Sheets:', error);
  });
}

// Modify the click event listener on each link to send the link data to the Google Sheets API
for (let i = 0; i < links.length; i++) {
  const link = links[i];
  const linkId = 'link-' + i;
  link.setAttribute('data-link-id', linkId);

  // Initialize the link data object
  const data = {
    id: visitorId,
    userId: visitorId,
    buttonId: linkId,
    pagelink: currentUrl,
    referrer: document.referrer,
    redirectLink: link.getAttribute('href'),
    text: link.textContent.trim(),
    clicks: parseInt(localStorage.getItem(linkId)) || 0,
    visitHistory: visitHistory,
    date: new Date().toISOString()
  };

  // Attach a click event listener to the link
  link.addEventListener('click', function(event) {
    event.preventDefault();

    // Increment the click count and save to local storage
    data.clicks++;
    localStorage.setItem(data.id, data.clicks);

    // Send the link data to the Google Sheets API
    addRowToSheet(data);

    // Log the link's data to the console
    console.log(data);
  });

  // Add the link data to the array
  linkData.push(data);
}
