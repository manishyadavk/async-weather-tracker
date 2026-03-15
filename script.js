const apiKey = "bae9b6150ca24d8f1df98426fd2ebc21";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherInfo = document.getElementById("weatherInfo");
const historyDiv = document.getElementById("history");
const consoleLog = document.getElementById("consoleLog");

let history = JSON.parse(localStorage.getItem("cities")) || [];
function log(msg){
consoleLog.innerHTML += msg + "\n";
}

async function getWeather(city){

log("Sync Start");
log("[ASYNC] Start fetching");

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

log("[ASYNC] Data received");

displayWeather(data);

addHistory(city);

}
catch(error){

weatherInfo.innerHTML="City not found";

}

log("Sync End");

}

function displayWeather(data){

document.getElementById("cityName").innerText =
`${data.name}, ${data.sys.country}`;

document.getElementById("temp").innerText =
`${data.main.temp} °C`;

document.getElementById("weather").innerText =
data.weather[0].main;

document.getElementById("humidity").innerText =
`${data.main.humidity}%`;

document.getElementById("wind").innerText =
`${data.wind.speed} m/s`;

}

function addHistory(city){

if(!history.includes(city)){
history.push(city);
}

localStorage.setItem("cities", JSON.stringify(history));

historyDiv.innerHTML="";

history.forEach(c=>{

let span=document.createElement("span");

span.textContent=c;

span.onclick = () => getWeather(c);

historyDiv.appendChild(span);

});

}

searchBtn.addEventListener("click",()=>{

const city = cityInput.value;

if(city){
getWeather(city);
}

});
window.onload = () => {
history.forEach(c=>{
let span=document.createElement("span");
span.textContent=c;
span.onclick=()=>getWeather(c);
historyDiv.appendChild(span);
});
};