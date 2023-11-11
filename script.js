document.getElementById("xhr-btn").addEventListener("click", doXHR);
document.getElementById("fetch-btn").addEventListener("click", doFetch);
document.getElementById("fetch-async-btn").addEventListener("click", doFetchAsyncAwait);



function displayResult(responseObject) {
    let date = 'Date: ' + responseObject.daily.time[0] +'\n';
    let maxTemp = 'maxTemp: ' + responseObject.daily.temperature_2m_max[0] +'\n';
    let minTemp = 'minTemp: ' + responseObject.daily.temperature_2m_min[0] +'\n';
    let weatherCodeNumber = parseInt(responseObject.daily.weather_code[0]);
    let weatherDescription ='';

        if (weatherCodeNumber === 0) {
            weatherDescription = "Clear sky";
        } else if ([1, 2, 3].includes(weatherCodeNumber)) {
            weatherDescription = "Mainly clear, partly cloudy, and overcast";
        } else if ([45, 48].includes(weatherCodeNumber)) {
            weatherDescription = "Fog and depositing rime fog";
        } else if ([51, 53, 55].includes(weatherCodeNumber)) {
            weatherDescription = "Drizzle: Light, moderate, and dense intensity";
        } else if ([56, 57].includes(weatherCodeNumber)) {
            weatherDescription = "Freezing Drizzle: Light and dense intensity";
        } else if ([61, 63, 65].includes(weatherCodeNumber)) {
            weatherDescription = "Rain: Slight, moderate and heavy intensity";
        } else if ([66, 67].includes(weatherCodeNumber)) {
            weatherDescription = "Freezing Rain: Light and heavy intensity";
        } else if ([71, 73, 75].includes(weatherCodeNumber)) {
            weatherDescription = "Snow fall: Slight, moderate, and heavy intensity";
        } else if (weatherCodeNumber === 77) {
            weatherDescription = "Snow grains";
        } else if ([80, 81, 82].includes(weatherCodeNumber)) {
            weatherDescription = "Rain showers: Slight, moderate, and violent";
        } else if ([85, 86].includes(weatherCodeNumber)) {
            weatherDescription = "Snow showers slight and heavy";
        } else if (weatherCodeNumber === 95) {
            weatherDescription = "Thunderstorm: Slight or moderate";
        } else if ([96, 99].includes(weatherCodeNumber)) {
            weatherDescription = "Thunderstorm with slight and heavy hail";
        } else {
            weatherDescription = "Unknown weather code";
        }

    document.getElementById('test').innerText = date + maxTemp +  minTemp + 'Description: ' + weatherDescription;
}

// This will fetch the API using XMLHTTPRequest (XHR)
function doXHR() {
    let lat = document.getElementById("lat").value;
    let lon = document.getElementById("lon").value;


    // let search = document.getElementById("searchGifs").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        // When the request is done, successful, and response is ready
        if (this.readyState == 4 && this.status == 200) {
            displayResult(JSON.parse(xhttp.responseText));
        }
    }
    
    // Send an asynchronous HTTP GET request to the given end point (url)
    xhttp.open("GET", 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&timezone=Asia/Riyadh&daily=temperature_2m_max,temperature_2m_min,weather_code');
    xhttp.send();
}

// This will fetch the API using Fetch API with promises
function doFetch() {
    let lat = document.getElementById("lat").value;
    let lon = document.getElementById("lon").value;

    let url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&timezone=Asia/Riyadh&daily=temperature_2m_max,temperature_2m_min,weather_code';
    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            displayResult(JSON.parse(text));
        })
        .catch(function (e) {
            console.log("Error: " + e);
        })

}

// This will fetch the API using Fetch API with async/await
async function doFetchAsyncAwait() {
    let lat = document.getElementById("lat").value;
    let lon = document.getElementById("lon").value;

    let url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&timezone=Asia/Riyadh&daily=temperature_2m_max,temperature_2m_min,weather_code';
    let response = await fetch(url); // this is an async call
    let data = await response.json(); // this is an async call
    displayResult(data);
}