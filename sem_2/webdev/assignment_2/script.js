const API_KEY = "ba2f74f4da8bcb463e4e5c7276cff6b1";

const form = document.getElementById("form");
const cityInput = document.getElementById("city");
const weatherInfo = document.getElementById("weatherInfo");
const logBox = document.getElementById("logBox");
const historyBox = document.getElementById("history");

let history = JSON.parse(localStorage.getItem("cities")) || [];
renderHistory();


function log(message) {
    logBox.textContent += message + "\n";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();

    logBox.textContent = ""; 

    if (!city) {
        weatherInfo.innerHTML = `<span style="color:red">Please enter a city</span>`;
        log("❌ Validation failed (Empty Input)");
        return;
    }

    log("1️⃣ Sync Start");
    log("2️⃣ [ASYNC] Fetch request initiated");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        );

        
        Promise.resolve().then(() => {
            log("4️⃣ Promise.then() → Microtask Queue");
        });

        
        setTimeout(() => {
            log("5️⃣ setTimeout() → Macrotask Queue");
        }, 0);

        if (!response.ok) throw new Error("Invalid City");

        const data = await response.json();
        log("3️⃣ [ASYNC] Data received from API");

        displayWeather(data);
        saveHistory(city);

    } catch (error) {
        weatherInfo.innerHTML = `<span style="color:red">City not found</span>`;
        log("❌ Error handled using try...catch");
    }

    log("6️⃣ Sync End");
});


function displayWeather(data) {
    weatherInfo.innerHTML = `
        <p><b>City</b> ${data.name}, ${data.sys.country}</p>
        <p><b>Temp</b> ${(data.main.temp - 273.15).toFixed(1)} °C</p>
        <p><b>Weather</b> ${data.weather[0].main}</p>
        <p><b>Humidity</b> ${data.main.humidity}%</p>
        <p><b>Wind</b> ${data.wind.speed} m/s</p>
    `;
}


function saveHistory(city) {
    if (!history.includes(city)) {
        history.unshift(city);
        history = history.slice(0, 5);
        localStorage.setItem("cities", JSON.stringify(history));
        renderHistory();
    }
}

function renderHistory() {
    historyBox.innerHTML = "";
    history.forEach(city => {
        const tag = document.createElement("span");
        tag.textContent = city;
        tag.onclick = () => {
            cityInput.value = city;
            form.dispatchEvent(new Event("submit"));
        };
        historyBox.appendChild(tag);
    });
}