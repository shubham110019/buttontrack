const currentUrl = window.location.href;

// Get the page visit history from local storage
let visitHistory = JSON.parse(localStorage.getItem('visitHistory')) || [];

// If this is the first page visited, add it to the visit history
if (visitHistory.length === 0) {
  visitHistory.push(currentUrl);
}

// If the current page is not already in the visit history, add it
if (!visitHistory.includes(currentUrl)) {
  visitHistory.push(currentUrl);
}

// Save the updated visit history to local storage
localStorage.setItem('visitHistory', JSON.stringify(visitHistory));

const links = document.querySelectorAll('a');

// Create an array to store link data
const linkData = [];

// Loop through each link and add a unique ID
for (let i = 0; i < links.length; i++) {
  const link = links[i];
  const linkId = 'link-' + i;
  link.setAttribute('data-link-id', linkId);

  // Initialize the link data object
  const data = {
    id: linkId,
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

    // Log the link's data to the console
    console.log(data);
  });

  // Add the link data to the array
  linkData.push(data);
}
