// content.js
const newHeading = "Default Heading"; // Set a default heading
//changeHeroHeading(newHeading);

function changeHeroHeading(newHeading) {
  const heroHeading = document.querySelector(".Heading-module--root--88ae8"); // Adjust the selector
  if (heroHeading) {
    heroHeading.innerText = newHeading;
  }
}
