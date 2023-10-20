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

// Create an observer instance linked to the callback function
const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      //handleNodes(mutation.addedNodes);
      console.log(mutation.target);
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

function changeProducts() {
  const products = {
    productText: "boxox",
    productTitle: "Formula 1 Tys T-Shirt",
    productTax: `Free <a href="/policies/shipping-policy">Shipping</a> across India`,
  };
  const productText = document.getElementsByClassName("product__text")[0];
  const productTitle = document.getElementsByClassName("product__title")[0];
  const productTax = document.getElementsByClassName("product__tax")[0];

  productText.innerText = products.productText;
  productTitle.children[0].innerText = products.productTitle;
  productTax.innerHTML = products.productTax;
}
