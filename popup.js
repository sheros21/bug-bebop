// document.addEventListener('DOMContentLoaded', function() {
//   // Retrieve the sound toggle checkbox element
//   const soundToggle = document.getElementById('soundToggle');

//   // Add an event listener to the checkbox
//   soundToggle.addEventListener('change', function() {
//     // Send a message to the content script to toggle sound effects
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { enableSound: soundToggle.checked });
//     });
//   });

//   // Retrieve the current sound effect state from storage and update the checkbox
//   chrome.storage.sync.get('enableSound', function(data) {
//     soundToggle.checked = data.enableSound;
//   });
// });


// document.addEventListener('DOMContentLoaded', function() {
//   // Retrieve the sound toggle checkbox element
//   const soundToggle = document.getElementById('soundToggle');

//   // Add an event listener to the checkbox
//   soundToggle.addEventListener('change', function() {
//     // Save the sound effect state to storage
//     chrome.storage.sync.set({ enableSound: soundToggle.checked });
    
//     // Send a message to the content script to toggle sound effects
//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { enableSound: soundToggle.checked });
//     });
//   });

//   // Retrieve the current sound effect state from storage and update the checkbox
//   chrome.storage.sync.get('enableSound', function(data) {
//     soundToggle.checked = data.enableSound;
//   });
// });



document.addEventListener('DOMContentLoaded', function() {
  // Retrieve the sound toggle checkbox element
  const soundToggle = document.getElementById('soundToggle');

  // Add an event listener to the checkbox
  soundToggle.addEventListener('change', function() {
    // Save the sound effect state to storage
    chrome.storage.sync.set({ enableSound: soundToggle.checked });
    
    // Send a message to the content script to toggle sound effects
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { enableSound: soundToggle.checked });
    });
  });

  // Retrieve the current sound effect state from storage and update the checkbox
  chrome.storage.sync.get('enableSound', function(data) {
    soundToggle.checked = data.enableSound;
    
    // Send a message to the content script to toggle sound effects
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { enableSound: soundToggle.checked });
    });
  });
});
