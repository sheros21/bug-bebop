const sfxListBad = [
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

const sfxListGood = [
    'sfx-good/sfx-anime-wow.mp3',
    'sfx-good/sfx-heavenly-choir.mp3',
    'sfx-good/sfx-legitness.mp3',
    'sfx-good/sfx-noice.mp3',
    'sfx-good/sfx-rizz.mp3',
    'sfx-good/sfx-sheesh-choir.mp3',
    'sfx-good/sfx-wow.mp3'
];  

function sfxRandomizer(sfxList){
    const randomIndex = Math.floor(Math.random() * sfxList.length);
    return sfxList[randomIndex];
}

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
                                console.log("accepted")
                                PlayGoodAudio();
                            } else {
                                PlayBadAudio();
                            }
                        }
                    }
                } else {
                    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('class') && node.getAttribute('class') === 'flex h-full w-full flex-col overflow-hidden rounded') {
                        // If a new element with the data-e2e-locator="console-result" attribute was added, do something
                        console.log('New console result element added:', node);
                        let result = document.querySelector('div[class="flex w-full pb-4"]');
                        if (result) {
                            PlayGoodAudio();
                        }
                    }
                }
            });
        }
    }
})

// Define the configuration for the MutationObserver
const config = { childList: true, subtree: true };

// Start observing the target node for changes
observer.observe(targetNode, config);

function PlayGoodAudio()
{
    var myAudio = new Audio(chrome.runtime.getURL(sfxRandomizer(sfxListGood)));
    myAudio.play();
};

function PlayBadAudio()
{
    var myAudio = new Audio(chrome.runtime.getURL(sfxRandomizer(sfxListBad)));
    myAudio.play();
};