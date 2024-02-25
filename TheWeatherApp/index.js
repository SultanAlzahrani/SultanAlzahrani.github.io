// One Cute Global Won't Hurt--
let errorBox = document.querySelector(".error");
const key = "454b2f199d8d4b0db0d141340242502";
// Calling function here, so we can start the program
formListener();

// So that everytime you run the program it'll show jeddah weather;
showJeddah();

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=4&aqi=no&alerts=no`,
      {
        mode: "cors",
      }
    );

    const response_as_json = await response.json();
    hide(errorBox);

    return response_as_json;
  } catch (error) {
    show(errorBox);
  }
}

async function formListener() {
  // Form Selectors
  const form = document.querySelector(".form");
  const input = document.querySelector(".search-box");

  // Other Selectors
  const crntDay = document.querySelector(".current-day");
  const restDays = document.querySelector(".rest-days");
  const rightSection = document.querySelector(".right-side");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const json = await getWeatherData(input.value);

      hide(rightSection);
      displayCurrentDay(crntDay, json.location, json.current);
      displayRestOfDays(restDays, json.forecast.forecastday);
      setTimeout(function () {
        show(rightSection);
      }, 1);

      // resetting
      input.value = "";
      hide(errorBox);
    } catch (error) {
      show(errorBox);
      return;
    }
  });
}

function displayCurrentDay(container, location, forecast) {
  const info = container.querySelector(".current-day-info");
  const condition = info.querySelector("span");
  const cityName = info.querySelector("p");

  addText(condition, forecast.condition.text);
  addText(cityName, `${location.name}, ${location.country}`);

  const detailsBox = container.querySelector(".current-forecast");
  const degree = detailsBox.querySelector(".degree span");

  addText(degree, forecast.temp_c);

  const details = detailsBox.querySelector(".current-forecast-details");
  const spans = details.querySelectorAll("span");

  console.log(forecast);
  addText(spans[0], forecast.feelslike_c, "Feels like: ", " cel."); // Feels like
  addText(spans[1], forecast.humidity, "Humidity: ", "%"); // Humidity
  addText(spans[2], forecast.wind_kph, "Wind: ", " KPH"); // Wind
}

function displayRestOfDays(container, forcastArr) {
  const dayElements = container.querySelectorAll(".day-element");

  for (let i = 0, j = 1; i < dayElements.length; i++, j++) {
    setUpDayElement(dayElements[i], forcastArr[j]);
  }
}
function setUpDayElement(elementDay, forcast) {
  const dayName = elementDay.querySelector(".day-element-header span");
  const dayImg = elementDay.querySelector(".day-element-header img");

  console.log(forcast);
  addText(dayName, getDayName(forcast.date));
  addImg(dayImg, forcast.day.condition.icon);

  const spans = elementDay.querySelectorAll(".day-element-details span");

  addText(spans[0], forcast.day.avgtemp_c, "Avg. Temp: ", " cel."); // Avg. Temp
  addText(spans[1], forcast.day.avghumidity, "Avg. Humidity: ", "%"); // Avg. Humidity
  addText(spans[2], forcast.day.condition.text, "Condition: "); // Condition
}

function getDayName(dateString) {
  // Parse the input date string
  const dateObject = new Date(dateString);

  // Array of day names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the day index (0 for Sunday, 1 for Monday, etc.)
  const dayIndex = dateObject.getDay();

  // Return the corresponding day name
  return daysOfWeek[dayIndex];
}
//
//
//

// Lousey code but what i can do. This function is totally Optional
async function showJeddah() {
  const crntDay = document.querySelector(".current-day");
  const restDays = document.querySelector(".rest-days");
  const rightSection = document.querySelector(".right-side");

  rightSection.classList.toggle("hidden");
  // hide
  try {
    const json = await getWeatherData("jeddah");

    displayCurrentDay(crntDay, json.location, json.current);
    displayRestOfDays(restDays, json.forecast.forecastday);

    show(rightSection);

    // resetting
    hide(errorBox);
  } catch (error) {
    show(errorBox);
    rightSection.classList.toggle("hidden");
    return;
  }

  //
}

function addText(box, text, before = "", after = "") {
  box.textContent = before + text + after;
}
function addImg(dayImg, src) {
  dayImg.src = src;
}

// Used for Animation
function hide(box) {
  box.classList.add("hidden");
}
function show(box) {
  box.classList.remove("hidden");
}
