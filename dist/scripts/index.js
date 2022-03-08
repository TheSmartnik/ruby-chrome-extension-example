document.addEventListener("DOMContentLoaded", function() {
  var imagePath = ["pic1", "pic2", "pic3"][parseInt(Math.random() * 3)];
  var image = document.getElementById("image");
  var fullPath = "../images/" + imagePath + ".jpg";
  image.setAttribute("src", fullPath);
  var focusInput = document.getElementById("focus");

  chrome.storage.sync.get(["focus"], function(result) {
    if (result.focus) focusInput.value = result.focus
  });

  focusInput.addEventListener("keypress", function(event) {
    chrome.storage.sync.set({focus: event.target.value})
  })
})