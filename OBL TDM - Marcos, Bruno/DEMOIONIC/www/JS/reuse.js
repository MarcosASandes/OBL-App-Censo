
function ConvResp(response) {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(response);
    }
}

function dqs(selector) {
    return document.querySelector(selector);
}

let allcamp = document.querySelectorAll("clase");
for (let i = 0; i < allcamp.length; i++) {
    allcamp[i].style.display = "none";
}

