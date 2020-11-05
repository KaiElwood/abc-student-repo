// ----------- variables
const getCity = document.getElementById("getCity");
const getIP = document.getElementById("getIP");
const city = document.getElementById("city");


// ----------- listen for enter on keyboard
getCity.addEventListener("click", function (e) {
    // save text as variable and reset
    var text = city.value;
    console.log(text);
    city.value = "";

    app.initialize(text);
})

// ----------- random article
getIP.addEventListener("click", function () {
    app.initialize();
})

// ----------- Main App
var app = {


    // transmit input to next function
    initialize: function (input) {
        // debugger
        app.getAQIData(input);
    },

    createDiv: function(AQI){
        let element = document.createElement("div");
        let blur = AQI;
        element.style.cssText = `width:100vw;height:100vh;-webkit-backdrop-filter: blur(${blur}px);backdrop-filter: blur(${blur}px);pointer-events: none;`;
        console.log(AQI);
        let textNode = document.createTextNode(`The air quality index in your location is ${AQI}`);
        element.appendChild(textNode);
        document.body.appendChild(element);
    },

    addPollution: function (AQI){
        var color;
        if (AQI<50) {
            color = "green";
        } else if (AQI<100) {
            color = "yellow";
        } else if (AQI<200){
            color = "red";
        } else {
            color = "purple";
        }
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {code: `
                let element = document.createElement("div");
                let info = document.createElement("div");
                let blur = ${AQI}/60;
                element.style.cssText = "width: 100vw; height: 100vh; backdrop-filter: blur(${AQI / 60}px); pointer-events: none; top: 0; z-index: 999; position:fixed;-webkit-backdrop-filter:blur(${AQI}px);pointer-events:none; ";
                console.log(blur);
                info.style.cssText = "padding: 10px; color: 'black'; width: 100px; background-color: ${color}; pointer-events: none; top: 0; right:0; z-index: 999; position:absolute ";
                let textNode = document.createTextNode("The air quality index in your location is ${ AQI }.");
                let textNode2 = document.createTextNode("Higher AQI = Lower Visibility");
                info.appendChild(textNode);
                info.appendChild(textNode2);
                document.body.appendChild(element);
                document.body.appendChild(info);
                `});
        });
    },

    // gets data from api
    getAQIData: function (input) {
        // need to parse input value for text --> if text, do stuff. if no text, random article
        if (input) {
            console.log("Get City AQI Data");
            var inputWord = input;
            var URL = "https://api.waqi.info/feed/" + inputWord + "/?token=92b1d819e3b93249951c22951e6130d44b6a3e22";
            console.log(URL);
            fetch(URL,
                {
                    method: "GET"
                }
            )
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.addPollution(json.data.aqi);
                })

                .catch(error => {
                    console.log(error.message);
                });
        } else {
            console.log("Get IP Data");
            // let data = $.getJSON("https://api.ipify.org?format=json", (data) => {console.log(data); return data.ip;});
            var URL = "https://api.waqi.info/feed/here/?token=92b1d819e3b93249951c22951e6130d44b6a3e22";
            var searchTerm;
            // alert(wikiURL)
            console.log(URL);
            fetch(URL,
                {
                    method: "GET"
                }
            )
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.addPollution(json.data.aqi);
                })

                .catch(error => {
                    console.log(error.message);
                });
        }
    }
};