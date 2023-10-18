//https://boxbox.in/products/formula-1-tyres-t-shirt

document.addEventListener("DOMContentLoaded", function () {
  const changeHeadingBtn = document.getElementById("changeHeadingBtn");

  changeHeadingBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: changeProducts,
        args: [],
      });
    });
  });
});

/*{
  h1: {
    "0": "Formula 1",
  }
}*/

function changeProducts() {
  const products = {
    productText: "boxox",
    productTitle: "Formula 1 Tys T-Shirt",
    productTax: `Free <a href="/policies/shipping-policy">Shipping</a> across India`,
  };
  const productInfo = document.getElementsByTagName("product-info")[0];
  const productText = document.getElementsByClassName("product__text")[0];
  const productTitle = document.getElementsByClassName("product__title")[0];
  const productTax = document.getElementsByClassName("product__tax")[0];

  productText.innerText = products.productText;
  productTitle.children[0].innerText = products.productTitle;
  productTax.innerHTML = products.productTax;

  const css = `
  .product-form__input input[type=radio]:checked+label {
    background-color: green !important;
  }
  .product-form__input input[type=radio]+label {
    background-color: red !important;
  }
`;

  const style = document.createElement("style");
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);

  const sliderThumbnails = document.getElementsByClassName("thumbnail-list")[0];
  const sliderThumbnailsChildren = sliderThumbnails.children;
  const randomIndex = Math.floor(Math.random() * 3);
  sliderThumbnailsChildren[randomIndex].children[0].click();
}

function changeHeroHeading(newHeading) {
  const heroHeading = document.querySelector(".Heading-module--root--88ae8"); // Adjust the selector
  if (heroHeading) {
    heroHeading.innerText = newHeading;
  }
}
