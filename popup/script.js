window.onload = function() {
    document.getElementById("save").onclick = function() {
        let apiKey = document.getElementById("apiKey").value;

        chrome.storage.sync.set({ apiKey: apiKey }, function() {
            console.log("Value is set to " + apiKey);
        });

        window.close();
    };

    document.getElementById("close").onclick = function() {
        window.close();
    };

    chrome.storage.sync.get("apiKey", function(obj) {
        console.log("Value currently is " + obj.apiKey);
        if (obj.apiKey) document.getElementById("apiKey").value = obj.apiKey;
    });
};
