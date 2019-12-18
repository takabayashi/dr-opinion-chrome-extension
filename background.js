console.log("Background script from Dr. Opinion");

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log(tab);
});

chrome.contextMenus.create({
    title: "Dr. Opinion",
    type: "normal",
    contexts: ["image", "link"],
    onclick: function(info, tab) {
        console.log(info);
        console.log(info.srcUrl);
        console.log(tab);

        chrome.storage.sync.get("apiKey", function(obj) {
            console.log("API Key is:" + obj.apiKey);
            if (!obj.apiKey) {
                openImageInfo(info);
            } else {
                getSelectedImage(tab);
            }
        });
    }
});

function openImageInfo(element) {
    if (element.srcUrl) {
        var url = "imageinfo/info.html#" + element.srcUrl;
        chrome.windows.create({ url: url, width: 520, height: 660 });
    } else {
        alert("This is not a image");
    }
}

function getSelectedImage(tab) {
    chrome.tabs.sendMessage(tab.id, { action: "FIND_IMAGE" }, function onMessageResponse(response) {
        if (!response) {
            alert("Failed to find any image in the selection.");
        } else {
            console.log(response);
            alert(response);
        }
    });
}
