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
var isSoundOn = true;
var isConfettiOn = true;

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
                    if (isSoundOn && textCE) {
                        PlayBadAudio();
                    } else {
                        if (textWA) {
                            textWA = textWA.innerHTML;
                            console.log(textWA);
                            if (textWA === "Accepted")
                            {
                                console.log("accepted")
                                if (isSoundOn) {
                                    PlayGoodAudio();
                                }
                                if (isConfettiOn) {
                                    PlayConfetti();
                                }
                            } else {
                                if (isSoundOn) {
                                    PlayBadAudio();
                                }
                            }
                        }
                    }
                } else {
                    if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('class') && node.getAttribute('class') === 'flex h-full w-full flex-col overflow-hidden rounded') {
                        // flex h-full w-full flex-col overflow-hidden rounded
                        // If a new element with the data-e2e-locator="console-result" attribute was added, do something
                        console.log('New console result element added:', node);
                        // let result = document.querySelector('div[class="flex w-full pb-4"]');
                        let result = document.querySelector('div[class="flex flex-col gap-6 px-5 pt-6"]');
                        if (result) {
                            if (isSoundOn) {
                                PlayGoodAudio();
                            }
                            if (isConfettiOn) {
                                PlayConfetti();
                            }
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

// Retrieves the state of the toggles upon window being loaded
window.onload = function() {
    console.log("dom loaded");
    // Retrieve the current sound effect state from storage and update the checkbox
    chrome.storage.sync.get('enableSound', function(data) {
        isSoundOn = data.enableSound;
    });

    // Retrieve the current confetti effect state from storage and update the checkbox
    chrome.storage.sync.get('enableConfetti', function(data) {
        isConfettiOn = data.enableConfetti;
    });
};

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'sound') {
        if (message.enableSound) {
            // Enable sound effects
            isSoundOn = true;
            console.log("sound on")
        } else {
            // Disable sound effects
            isSoundOn = false;
            console.log("sound off")
        }
    }
    if (message.type === 'confetti') {
        if (message.enableConfetti) {
            isConfettiOn = true;
            console.log("confetti on")
        } else {
            isConfettiOn = false;
            console.log("confetti off")
        }
    }
});

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

function PlayConfetti()
{
    // CODE OBTAINED FROM :https://codepen.io/bananascript/pen/EyZeWm, "JavaScript Confetti", Michael Beckius
    var random = Math.random
        , cos = Math.cos
        , sin = Math.sin
        , PI = Math.PI
        , PI2 = PI * 2
        , timer = undefined
        , frame = undefined
        , confetti = [];

    var particles = 10
        , spread = 40
        , sizeMin = 3
        , sizeMax = 12 - sizeMin
        , eccentricity = 10
        , deviation = 100
        , dxThetaMin = -.1
        , dxThetaMax = -dxThetaMin - dxThetaMin
        , dyMin = .13
        , dyMax = .18
        , dThetaMin = .4
        , dThetaMax = .7 - dThetaMin;

    var colorThemes = [
        function() {
        return color(200 * random()|0, 200 * random()|0, 200 * random()|0);
        }, function() {
        var black = 200 * random()|0; return color(200, black, black);
        }, function() {
        var black = 200 * random()|0; return color(black, 200, black);
        }, function() {
        var black = 200 * random()|0; return color(black, black, 200);
        }, function() {
        return color(200, 100, 200 * random()|0);
        }, function() {
        return color(200 * random()|0, 200, 200);
        }, function() {
        var black = 256 * random()|0; return color(black, black, black);
        }, function() {
        return colorThemes[random() < .5 ? 1 : 2]();
        }, function() {
        return colorThemes[random() < .5 ? 3 : 5]();
        }, function() {
        return colorThemes[random() < .5 ? 2 : 4]();
        }
    ];
    function color(r, g, b) {
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    // Cosine interpolation
    function interpolation(a, b, t) {
        return (1-cos(PI*t))/2 * (b-a) + a;
    }

    // Create a 1D Maximal Poisson Disc over [0, 1]
    var radius = 1/eccentricity, radius2 = radius+radius;
    function createPoisson() {
        // domain is the set of points which are still available to pick from
        // D = union{ [d_i, d_i+1] | i is even }
        var domain = [radius, 1-radius], measure = 1-radius2, spline = [0, 1];
        while (measure) {
        var dart = measure * random(), i, l, interval, a, b, c, d;

        // Find where dart lies
        for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
            a = domain[i], b = domain[i+1], interval = b-a;
            if (dart < measure+interval) {
            spline.push(dart += a-measure);
            break;
            }
            measure += interval;
        }
        c = dart-radius, d = dart+radius;

        // Update the domain
        for (i = domain.length-1; i > 0; i -= 2) {
            l = i-1, a = domain[l], b = domain[i];
            // c---d          c---d  Do nothing
            //   c-----d  c-----d    Move interior
            //   c--------------d    Delete interval
            //         c--d          Split interval
            //       a------b
            if (a >= c && a < d)
            if (b > d) domain[l] = d; // Move interior (Left case)
            else domain.splice(l, 2); // Delete interval
            else if (a < c && b > c)
            if (b <= d) domain[i] = c; // Move interior (Right case)
            else domain.splice(i, 0, c, d); // Split interval
        }

        // Re-measure the domain
        for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
            measure += domain[i+1]-domain[i];
        }

        return spline.sort();
    }

    // Create the overarching container
    var container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top      = '0';
    container.style.left     = '0';
    container.style.width    = '100%';
    container.style.height   = '0';
    container.style.overflow = 'visible';
    container.style.zIndex   = '9999';

    // Confetto constructor
    function Confetto(theme) {
        this.frame = 0;
        this.outer = document.createElement('div');
        this.inner = document.createElement('div');
        this.outer.appendChild(this.inner);

        var outerStyle = this.outer.style, innerStyle = this.inner.style;
        outerStyle.position = 'absolute';
        outerStyle.width  = (sizeMin + sizeMax * random()) + 'px';
        outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
        innerStyle.width  = '100%';
        innerStyle.height = '100%';
        innerStyle.backgroundColor = theme();

        outerStyle.perspective = '50px';
        outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
        this.axis = 'rotate3D(' +
        cos(360 * random()) + ',' +
        cos(360 * random()) + ',0,';
        this.theta = 360 * random();
        this.dTheta = dThetaMin + dThetaMax * random();
        innerStyle.transform = this.axis + this.theta + 'deg)';

        this.x = window.innerWidth * random();
        this.y = -deviation;
        this.dx = sin(dxThetaMin + dxThetaMax * random());
        this.dy = dyMin + dyMax * random();
        outerStyle.left = this.x + 'px';
        outerStyle.top  = this.y + 'px';

        // Create the periodic spline
        this.splineX = createPoisson();
        this.splineY = [];
        for (var i = 1, l = this.splineX.length-1; i < l; ++i)
        this.splineY[i] = deviation * random();
        this.splineY[0] = this.splineY[l] = deviation * random();

        this.update = function(height, delta) {
        this.frame += delta;
        this.x += this.dx * delta;
        this.y += this.dy * delta;
        this.theta += this.dTheta * delta;

        // Compute spline and convert to polar
        var phi = this.frame % 7777 / 7777, i = 0, j = 1;
        while (phi >= this.splineX[j]) i = j++;
        var rho = interpolation(
            this.splineY[i],
            this.splineY[j],
            (phi-this.splineX[i]) / (this.splineX[j]-this.splineX[i])
        );
        phi *= PI2;

        outerStyle.left = this.x + rho * cos(phi) + 'px';
        outerStyle.top  = this.y + rho * sin(phi) + 'px';
        innerStyle.transform = this.axis + this.theta + 'deg)';
        return this.y > height+deviation;
        };
    }

    function poof() {
        if (!frame) {
        // Append the container
        document.body.appendChild(container);

        // Add confetti
        var theme = colorThemes[0]
            , count = 0;
        (function addConfetto() {
            var confetto = new Confetto(theme);
            confetti.push(confetto);
            container.appendChild(confetto.outer);
            timer = setTimeout(addConfetto, spread * random());
            count++;

            // Stop the animation after 5 seconds (5000 milliseconds)
            if (count >= 200 || count >= 10000 / (spread * random())) {
                clearTimeout(timer);
            }

        })(0);

        // Start the loop
        var prev = undefined;
        requestAnimationFrame(function loop(timestamp) {
            var delta = prev ? timestamp - prev : 0;
            prev = timestamp;
            var height = window.innerHeight;

            for (var i = confetti.length-1; i >= 0; --i) {
            if (confetti[i].update(height, delta)) {
                container.removeChild(confetti[i].outer);
                confetti.splice(i, 1);
            }
            }
            if (timer || confetti.length)
            return frame = requestAnimationFrame(loop);

            // Cleanup
            document.body.removeChild(container);
            frame = undefined;
        });
        }
    }

    poof();
};