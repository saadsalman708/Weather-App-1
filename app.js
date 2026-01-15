const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const displayBody = document.querySelector('.display-body');





async function getWeather() {

    const cityName = cityInput.value.trim();
    if (!cityName) return;

    const apiKey = 'ffdff44281404cee8cf140259261501';

    displayBody.innerHTML = `
        <div class="d-flex justify-content-center pt-5">
        <div class="spinner">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            </div>
        </div>
    `;

    try {
        
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;

        const res = await fetch(apiUrl);

        if (!res.ok) {
            if (res.status === 400 || res.status === 401) {
                throw new Error("City not found");
            }
            throw new Error("Network response was not ok");
        }

        const data = await res.json();

        const timeStamp = data.location && data.location.localtime ? data.location.localtime : '';
        const city = data.location && data.location.name ? data.location.name : '';
        const country = data.location && data.location.country ? data.location.country : '';
        const icon = data.current && data.current.condition && data.current.condition.icon ? data.current.condition.icon : '-';
        const text = data.current && data.current.condition && data.current.condition.text ? data.current.condition.text : '';
        const temp = data.current && data.current.temp_c ? data.current.temp_c : '';
        const windSpeed = data.current && data.current.wind_kph ? data.current.wind_kph : '';
        const humidity = data.current && data.current.humidity ? data.current.humidity : '';        

        displayBody.innerHTML = `
            <div class="weather-card card mx-auto">
                <div class="card-body text-center">
                    <h5 class="card-title mb-4">${city}, ${country}</h5>
                    <p class="card-text mb-2">Local Time: ${timeStamp}</p>
                    <img src="${icon}" />
                    <p class="card-text mb-2">${text}</p>
                    <h2 class="card-text mb-2">${temp} &deg;C</h2>
                    <p class="card-text mb-2">Wind Speed: ${windSpeed} kph</p>
                    <p class="card-text mb-2">Humidity: ${humidity}%</p>
                </div>
            </div>
        `;

    } catch (error) {

        console.log( "error: " , error);
        displayBody.innerHTML = `<div class="error">Could not fetch weather. check city name or api key</div>`;
    }
}





searchBtn.addEventListener('click', ()=>{
    getWeather();
});

clearBtn.addEventListener('click', ()=>{
    cityInput.value = '';
    displayBody.innerHTML = ``;
});

cityInput.addEventListener('keyup', (e)=>{
    if (e.key === 'Enter') getWeather();
    return;
});