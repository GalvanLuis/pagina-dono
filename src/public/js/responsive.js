// Import Bootstrap 5 CSS and JS
const bootstrapCSS = document.createElement('link');
bootstrapCSS.rel = 'stylesheet';
bootstrapCSS.href = 'https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/css/bootstrap.min.css';
document.head.appendChild(bootstrapCSS);

const bootstrapJS = document.createElement('script');
bootstrapJS.src = 'https://stackpath.bootstrapcdn.com/bootstrap/5.1.3/js/bootstrap.bundle.min.js';
document.body.appendChild(bootstrapJS);

// Add meta tag for viewport settings
const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1';
document.head.appendChild(metaViewport);

// Function to apply Bootstrap classes for responsiveness
function makeResponsive() {
  // Example: Add 'container' class to body
  document.body.classList.add('container');

  // Example: Add 'row' class to all direct children of body
  const bodyChildren = document.body.children;
  for (let i = 0; i < bodyChildren.length; i++) {
    bodyChildren[i].classList.add('row');
  }

  // Example: Add 'col' class to all grandchildren of body
  for (let i = 0; i < bodyChildren.length; i++) {
    const grandchildren = bodyChildren[i].children;
    for (let j = 0; j < grandchildren.length; j++) {
      grandchildren[j].classList.add('col');
    }
  }
}

// Call the function to apply Bootstrap classes
makeResponsive();