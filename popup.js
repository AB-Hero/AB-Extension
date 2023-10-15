//https://klientboost.com/

document.addEventListener("DOMContentLoaded", function () {
  const changeHeadingBtn = document.getElementById("changeHeadingBtn");

  changeHeadingBtn.addEventListener("click", function () {
    const newHeading = document.getElementById("newHeading").value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: changeHeroHeading,
        args: [newHeading],
      });
    });
  });
});

function changeHeroHeading(newHeading) {
  const heroHeading = document.querySelector(".Heading-module--root--88ae8"); // Adjust the selector
  if (heroHeading) {
    heroHeading.innerText = newHeading;
  }
}
