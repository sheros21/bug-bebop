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
                    //m4a to console.log('New console result element added:', node);
                    console.log("op");
                    // Add your own code here to handle the new element
                    PlayAudio();
                    console.log("sound played");
                }
            });
        }
    }
});

// Define the configuration for the MutationObserver
const config = { childList: true, subtree: true };

// Start observing the target node for changes
observer.observe(targetNode, config);

// Function to play the error sound
function PlayAudio()
{
    var myAudio = new Audio(chrome.runtime.getURL("soundeffect.mp3"));
    myAudio.play();
};