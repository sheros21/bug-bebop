const soundList = [
    'sfx-bad/sfx-auugh.mp3',
    'sfx-bad/sfx-babooey.mp3',
    'sfx-bad/sfx-bruh.mp3',
    'sfx-bad/sfx-fart-with-reverb.mp3',
    'sfx-bad/sfx-goat-scream.mp3',
    'sfx-bad/sfx-god-no-please.mp3',
    'sfx-bad/sfx-mission-failed.mp3',
    'sfx-bad/sfx-no-no-no.mp3',
    'sfx-bad/sfx-OHMYGOD.mp3',
    'sfx-bad/sfx-ok.mp3',
    'sfx-bad/sfx-roblox-oof.mp3',
    'sfx-bad/sfx-vine.mp3',
    'sfx-bad/sfx-wait-what.mp3',
    'sfx-bad/sfx-we-be-right-back.mp3',
    'sfx-bad/sfx-windows-error.mp3'
];  

function sfxRandomizer(){
    const randomIndex = Math.floor(Math.random() * soundList.length);
    return soundList[randomIndex];
}



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
                    let textCE = document.querySelector('span[data-e2e-locator="console-result"]');
                    let textWA = document.querySelector('div[data-e2e-locator="console-result"]');
                    if (textCE) {
                        PlayBadAudio();
                    } else {
                        if (textWA) {
                            textWA = textWA.innerHTML;
                            console.log(textWA);
                            if (textWA === "Accepted")
                            {
                                PlayGoodAudio();
                            } else {
                                PlayBadAudio();
                            }
                        }
                        // let text = document.querySelector('div[class="text-xl font-medium text-green-s dark:text-dark-green-s"').innerHTML;
                        // if (text === "Accepted") {
                        //     PlayAudio();
                        // }
                    }
                } else {
                    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('class') && node.getAttribute('class') === 'flex h-full w-full flex-col overflow-hidden rounded') {
                        // If a new element with the data-e2e-locator="console-result" attribute was added, do something
                        console.log('New console result element added:', node);
                        // let submission = document.querySelector('div[class="text-green-s dark:text-dark-green-s flex items-center gap-2 text-[16px] font-medium leading-6"]')
                        // console.log(submission);
                        // let text = document.querySelector('span[data-e2e-locator="submission-result"]');
                        // console.log(text);
                        let result = document.querySelector('div[class="flex w-full pb-4"]');
                        if (result) {
                            PlayGoodAudio();
                        }
                    }
                }
            });
        }
    }
});

// Define the configuration for the MutationObserver
const config = { childList: true, subtree: true };

// Start observing the target node for changes
observer.observe(targetNode, config);

function PlayGoodAudio()
{
    var myAudio = new Audio(chrome.runtime.getURL(sfxRandomizer()));
    myAudio.play();
};

function PlayBadAudio()
{
    var myAudio = new Audio(chrome.runtime.getURL(sfxRandomizer()));
    myAudio.play();
};

// bg-layer-1 dark:bg-dark-layer-1 flex h-full w-full flex-col overflow-auto