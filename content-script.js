// // Listen for changes to the page
// window.addEventListener("click", () => {
//     // Get the element by its data-e2e-locator attribute
//     let consoleSpanResultElement = document.querySelector('span[data-e2e-locator="console-result"]');
//     let consoleDivResultElement = document.querySelector('div[data-e2e-locator="console-result"]');

//     // Check if the element exists and is visible on the page
//     if (consoleSpanResultElement || consoleDivResultElement) {
//     // The element is loaded and visible on the page
//     console.log('The console result element is loaded');
//     } else {
//     // The element is not loaded or not visible on the page
//     console.log('The console result element is not loaded');
//     }
//   });

// Select the target node that you want to observe for changes
const targetNode = document.documentElement;

// Create a new instance of the MutationObserver object
const observer = new MutationObserver(function(mutationsList, observer) {
    // Iterate through each mutation that was observed
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Iterate through each added node to check for the data-e2e-locator attribute
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('class') && node.getAttribute('class') === 'mx-5 my-4 space-y-4') {
                    // If a new element with the data-e2e-locator="console-result" attribute was added, do something
                    console.log('New console result element added:', node);
                    // Add your own code here to handle the new element
                }
            });
        }
    }
});

// Define the configuration for the MutationObserver
const config = { childList: true, subtree: true };

// Start observing the target node for changes
observer.observe(targetNode, config);

