// Get all the links on the page
const links = document.querySelectorAll('a');

// Create an array to store the link data
const linkData = [];

// Loop through each link and attach an event listener
for (let i = 0; i < links.length; i++) {
  const link = links[i];

  // Create an object for this link
  const thisLinkData = {
    id: link.id,
    href: link.href,
    text: link.textContent.trim(),
    clickData: []
  };

  // Add this object to the linkData array
  linkData.push(thisLinkData);

  // Attach a click event listener to the link
  link.addEventListener('click', function(event) {
    // Get the index of this link in the linkData array
    const index = linkData.findIndex(item => item.id === link.id);

    // Record the link click and hold time
    const clickData = {
      clicked: new Date().toISOString(),
      holdTime: new Date() - pageLoadTime
    };

    // Add this click data to the link's array of click data
    linkData[index].clickData.push(clickData);

    // Log the link data to the console
    console.log(linkData);
  });
}

// Record the page load time
const pageLoadTime = new Date();
