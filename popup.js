// Retrieve the sound toggle checkbox element
const soundToggle = document.getElementById('soundToggle');
const slider = document.getElementById('mySlider');
const sliderValue = document.getElementById('sliderValue');

// Add an event listener to the checkbox
soundToggle.addEventListener('change', function () {
  // Send a message to the background script with the sound toggle value
  chrome.runtime.sendMessage({ soundToggle: soundToggle.checked });
});

// Send a message to the background script to get the initial slider value
chrome.runtime.sendMessage({ getSliderValue: true }, function (response) {
  // Set the initial slider value
  slider.value = response.sliderValue;
  // Display the initial slider value
  sliderValue.textContent = response.sliderValue;
});

// Add an event listener to the slider
slider.addEventListener('input', function () {
  // Update the slider value display
  sliderValue.textContent = slider.value;
  // Send a message to the background script with the updated slider value
  chrome.runtime.sendMessage({ sliderValue: slider.value });
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Check if the message is about updating the slider value
  if (request.sliderValue) {
    // Update the slider value and its display
    slider.value = request.sliderValue;
    sliderValue.textContent = request.sliderValue;
  }
});
