const currentUrl = window.location.href;

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
