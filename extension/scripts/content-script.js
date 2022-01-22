let observer;
const OBSERVER_CONFIG = { attributes: true, childList: true, characterData: true, subtree: true };

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomize() {
    const min = 0;
    const max = $(".episode-item").length - 1;

    const rando = getRandomArbitrary(min, max);
    $(".episode-item")[rando].click();
}

function addButton() {
    console.log("adding button");
    const newButton = $("button.color-primary").first().clone(true);
    newButton.css("marginRight", 16);
    newButton.css("fontSize", "1.5em");
    newButton.attr('id', 'shuffleButton');
    newButton.on("click", randomize);

    newButton.html('<span">Shuffle</span>');
    
    const container = $(".episodeSelector-dropdown");
    container.css("display", "flex");

    container.prepend(newButton);
}

function observerCallback(mutations) {
    const found = $(document).find(".episodeSelector-header");
    const shuffleButtonFound = found.find("#shuffleButton");
    if (found.length > 0 && !shuffleButtonFound.length) {
        addButton();
        observer.disconnect();
    }
}

function resetObserver() {
    observer?.disconnect();

    if (observer == null)
      observer = new MutationObserver(observerCallback);

    observer.observe(document, OBSERVER_CONFIG);
}

console.log("Running Shuffle and Chill");
resetObserver();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === 'urlchanged') {
      resetObserver();
    }
});
