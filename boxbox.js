// https://boxbox.in/products/formula-1-tyres-t-shirt

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

// Define changes to be made
const changes = {
  ".product__text": {
    func: (element, val) => (element.innerText = val),
    args: ["bobox"],
  },
  ".product__title": {
    func: (element, val) => (element.children[0].innerText = val),
    args: ["Other T shirt"],
  },
  ".product__tax": {
    func: (element, val) => (element.innerHTML = val),
    args: [
      `Free <a href="/policies/shipping-policy">Shipping</a> across India`,
    ],
  },
};

const chosen = {};
// Create an observer instance linked to the callback function
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      // Check if the added nodes contain elements that match the selectors used in changes
      for (let selector in changes) {
        const element = mutation.target.querySelector(selector);
        if (element && chosen[selector] === undefined) {
          const randomIndex = Math.floor(
            Math.random() * (changes[selector].args.length + 1)
          );
          if (randomIndex < changes[selector].args.length) {
            const val = changes[selector].args[randomIndex];
            changes[selector].func(element, val);
          }
          console.log(selector, randomIndex);
          chosen[selector] = randomIndex;
        }
      }
    } else if (
      mutation.type === "attributes" &&
      (mutation.attributeName === "src" ||
        mutation.attributeName === "srcset") &&
      mutation.target.tagName === "IMG" &&
      (mutation.target.src !== random ||
        mutation.target.srcset !== `${random} 1x`)
    ) {
      //changeImageSrc(mutation.target);
    }
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["src", "srcset"],
});

//javascript http request to :5000/conversions?objective=num

const abVersions = {};
