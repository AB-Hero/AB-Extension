// content.js

// Function to handle nodes
function handleNodes(nodes) {
  nodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.nodeName === "IMG") {
        changeImageSrc(node);
      }
      // Check all child nodes.
      const imgElements = node.getElementsByTagName("img");
      for (let img of imgElements) {
        changeImageSrc(img);
      }
    }
  });
}

const random =
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/Blank_image.jpg";
// Function to change image src
function changeImageSrc(img) {
  const newSrc = random; // replace with your new image src
  img.src = newSrc;
  img.srcset = `${newSrc} 1x`; // replace srcset as well
}

// Create an observer instance linked to the callback function
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      handleNodes(mutation.addedNodes);
    } else if (
      mutation.type === "attributes" &&
      (mutation.attributeName === "src" ||
        mutation.attributeName === "srcset") &&
      mutation.target.tagName === "IMG" &&
      (mutation.target.src !== random ||
        mutation.target.srcset !== `${random} 1x`)
    ) {
      changeImageSrc(mutation.target);
    }
  }
});

// Start observing the document with the configured parameters
observer.observe(document, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["src", "srcset"],
});
