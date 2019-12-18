console.log("Content script from Dr. Opinion");

var lastElementClicked;

window.addEventListener(
    "mousedown",
    function(event) {
        lastElementClicked = event.target;
    },
    false
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "FIND_IMAGE") {
        sendResponse(findImage());
    } else {
        sendResponse(undefined);
    }
});

function findImage() {
    var element = lastElementClicked;

    while (element) {
        if (element instanceof HTMLImageElement) {
            element.style.cssText = "border: 3px solid blue";
            return element.src;
        } else if (element instanceof HTMLAnchorElement) {
            var bg = getComputedStyle(element).getPropertyValue("background-image");

            if (bg !== "none") {
                element.style.cssText = "border: 3px solid blue";
                return bg.match(/url\("?(.+?)"?\)/)[1];
            }
        } else {
            element = element.parentElement;
        }
    }
}
