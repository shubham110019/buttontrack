const data = {
  id: linkId,
  pagelink: currentUrl,
  redirectLink: link.getAttribute('href'),
  text: link.textContent.trim(),
  clicks: parseInt(localStorage.getItem(linkId)) || 0,
  date: new Date().toISOString(),
  location: window.location.pathname,
  lastVisit: localStorage.getItem('lastVisit') || 'N/A'
};

// Attach a click event listener to the link
link.addEventListener('click', function(event) {
  event.preventDefault();

  // Increment the click count and save to local storage
  data.clicks++;
  localStorage.setItem(data.id, data.clicks);

  // Save the last visit time to local storage
  localStorage.setItem('lastVisit', new Date().toISOString());

  // Log the link's data to the console
  console.log(data);
});

// Add the link data to the array
linkData.push(data);
