import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(zipcode) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=${process.env.API_KEY}`;
  request.addEventListener("readystatechange", function() {
    console.log(this.readyState);
  });

  request.addEventListener("loadend", function() {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        printElements(response, zipcode);
      } else {
        printError(this, response, zipcode);
      }
    });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printError(request, apiResponse, zipcode) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${zipcode}:  ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function printElements(apiResponse, zipcode) {
  let sunset = new Date((apiResponse.sys.sunset + apiResponse.timezone) * 1000).toISOString().substring(11,16);
  document.querySelector('#showResponse').innerText = `The humidity in ${zipcode} is ${apiResponse.main.humidity}%.
  The temperature in Fahrenheit is ${apiResponse.main.temp} degrees. \nThe visbility is ${apiResponse.visibility} meters. The sunset will set at ${sunset}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const zipcode = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(zipcode);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});