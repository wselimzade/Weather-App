"use strict";

//! Change page and return.

const weather = document.querySelector(".date-clock-weather-content");
const defaultBackground = document.querySelector(".default");
const returnArrow = document.querySelector("#arrow-left");
const firstSection = document.querySelector(".first-section");
const thirdSection = document.querySelector(".third-section");
const secondPageFirstSection = document.querySelector(
  ".second-page-first-section"
);
const secondPageThirdSection = document.querySelector(
  ".second-page-third-section"
);

//? Run Function when click weather area.
const weatherInfo = () => {
  firstSection.style.display = "none";
  thirdSection.style.display = "none";
  secondPageFirstSection.style.display = "block";
  secondPageThirdSection.style.display = "block";

  defaultBackground.classList.add("bg");
};

//? Run Function when return default page with return arrow.
const returnDefaultPage = () => {
  secondPageFirstSection.style.display = "none";
  secondPageThirdSection.style.display = "none";
  firstSection.style.display = "block";
  thirdSection.style.display = "block";

  defaultBackground.classList.remove("bg");
};

weather.addEventListener("click", weatherInfo);
returnArrow.addEventListener("click", returnDefaultPage);

//! Search input

const searchIcon = document.querySelector("#search");
const searchInput = document.querySelector(".search-input");

const showSearchInput = () => {
  searchInput.style.display = "block";
};

searchIcon.addEventListener("click", showSearchInput);

//! search button and close button click effect

const button = document.querySelector(".search-start");
const close = document.querySelector(".close");
const currentLocation = document.querySelector(".current-location");

const clickEffectButton = () => {
  button.classList.add("button-clicked");

  setTimeout(function () {
    button.classList.remove("button-clicked");
  }, 200);
};

const clickEffectClose = () => {
  close.classList.add("button-clicked");

  setTimeout(function () {
    close.classList.remove("button-clicked");
    searchInput.style.display = "none";
  }, 200);
};

const clickEffectLocation = () => {
  currentLocation.classList.add("button-clicked");

  setTimeout(function () {
    currentLocation.classList.remove("button-clicked");
  }, 200);
};

button.addEventListener("click", clickEffectButton);
close.addEventListener("click", clickEffectClose);
currentLocation.addEventListener("click", clickEffectLocation);

//! Weather API Current Data

const main = document.querySelector("main");

const searchBar = document.querySelector("#search-input");
let alertError = document.querySelector("#alert");

let apiKey = "3916b6165d316713f49d8aae73379ad0";
let API;
let hourlyAPI;
let dailyAPI;

//? search button
button.addEventListener("click", () => {
  if (searchBar.value != "") {
    requestApi(searchBar.value);
  }
  alertError.style.display = "none";
});

//? location button
currentLocation.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSucces, onError);
  } else {
    console.log("INVALID");
  }
});

//? currentlocation allow
function onSucces(position) {
  const { latitude, longitude } = position.coords;
  API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  hourlyAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=10&appid=${apiKey}`;
  dailyAPI = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&units=metric&cnt=10&appid=${apiKey}`;

  fetchData();
}

//? currentlocation don't allow
function onError(error) {
  alertError.style.display = "block";
  alertError.innerText = error.message;
}

//? Weather data for city name
function requestApi(city) {
  API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  hourlyAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=10&units=metric&appid=${apiKey}`;
  dailyAPI = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&units=metric&appid=${apiKey}`;
  fetchData();
}

//? fetch data from API
function fetchData() {
  fetch(API)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));

  fetch(hourlyAPI)
    .then((response) => response.json())
    .then((result) => hourlyDetails(result));

  fetch(dailyAPI)
    .then((response) => response.json())
    .then((result) => dailyDetails(result));
}

//? weather data details
const wIcon = firstSection.querySelector(".first-section-weather");
const wsIcon = secondPageFirstSection.querySelector(".first-section-weather");

function dailyDetails(dInfo) {
  //? warning, if input false value

  if (dInfo.cod == "404") {
    alert("daily data is don't found")
  } else {
    console.log(dInfo);
  }
}

function hourlyDetails(hInfo) {
  //? warning, if input false value
  if (hInfo.cod == "404") {
    alert("hourly data is don't found")
  } else {
    const dg = document.querySelectorAll(".dg");
    const clock = document.querySelectorAll(".hClock");
    const hWIcon = document.querySelectorAll(".hImage");
    const hourlyData = hInfo.list;

    for (let i = 0; i < 9; i++) {
      let hpart;
      let hId = hInfo.list[i].weather[0].id;
      let hWIconArr = hWIcon[i];
      if (
        hourlyData[i].dt_txt.split(" ")[1].slice(0, 5)[0] == 0 &&
        hourlyData[i].dt_txt.split(" ")[1].slice(0, 5) !== "00:00"
      ) {
        hpart = "AM";
      } else {
        hpart = "PM";
      }
      dg[i].innerText = `${Math.floor(hourlyData[i].main.temp)}º`;
      clock[i].innerText = `${hourlyData[i].dt_txt
        .split(" ")[1]
        .slice(0, 5)} ${hpart}`;

      if (hId === 800) {
        let clear = "01d";
        hWIconArr.src = `https://openweathermap.org/img/w/${clear}.png`;
      } else if (hId >= 200 && hId <= 232) {
        let thunderstorm = "11d";
        hWIconArr.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
      } else if (hId >= 300 && hId <= 321) {
        let drizzle = "09d";
        hWIconArr.src = `https://openweathermap.org/img/w/${drizzle}.png`;
      } else if (hId >= 500 && hId <= 504) {
        let rain = "";
        if (hId >= 500 && hId < 504) {
          rain = "10d";
        } else if (hId === 511) {
          rain = "13d";
        } else {
          rain = "09d";
        }
        hWIconArr.src = `https://openweathermap.org/img/w/${rain}.png`;
      } else if (hId >= 600 && hId <= 622) {
        let snow = "13d";
        hWIconArr.src = `https://openweathermap.org/img/w/${snow}.png`;
      } else if (hId >= 701 && hId <= 781) {
        let atmosphere = "50d";
        hWIconArr.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
      } else if (hId >= 801 && hId <= 804) {
        let clouds = "";
        if (hId === 801) {
          clouds = "02d";
        } else if (hId === 802) {
          clouds = "03d";
        } else {
          clouds = "04d";
        }
        hWIconArr.src = `https://openweathermap.org/img/w/${clouds}.png`;
      }
    }
  }

  console.log(hInfo);
}

function weatherDetails(info) {
  //? warning, if input false value
  if (info.cod == "404") {
    alertError.style.display = "block";
    alertError.innerText = `${searchBar.value} city was not found...`;
  } else {
    //? real weather data set current weather data on the app
    const city = info.name;
    const country = info.sys.country;
    const { description, id } = info.weather[0];
    const { humidity, temp, pressure, fog } = info.main;
    const wind = info.wind.speed;

    let sameTemp = (firstSection.querySelector(
      "#degree"
    ).innerText = `${Math.floor(temp)} º C`);
    let sameDescription = (firstSection.querySelector(
      "#weather-type"
    ).innerText = description);
    let sameCityCountry = (firstSection.querySelector(
      ".city-country"
    ).innerText = `${city}, ${country}`);

    secondPageFirstSection.querySelector("#degree").innerText = sameTemp;
    secondPageFirstSection.querySelector("#weather-type").innerText =
      sameDescription;
    secondPageFirstSection.querySelector(".city-country").innerHTML =
      sameCityCountry;

    secondPageThirdSection.querySelector(
      "#humidity-sum"
    ).innerText = `${humidity} %`;
    secondPageThirdSection.querySelector(
      "#wind-sum"
    ).innerText = `${wind} km/h`;
    secondPageThirdSection.querySelector(
      "#air-sum"
    ).innerText = `${pressure} hPa`;
    secondPageThirdSection.querySelector("#fog-sum").innerText =
      fog === undefined ? "-" : `${fog}%`;

    //? weather icons for different temprature
    if (id === 800) {
      let clear = "01d";
      wIcon.src = `https://openweathermap.org/img/w/${clear}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${clear}.png`;
    } else if (id >= 200 && id <= 232) {
      let thunderstorm = "11d";
      wIcon.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
    } else if (id >= 300 && id <= 321) {
      let drizzle = "09d";
      wIcon.src = `https://openweathermap.org/img/w/${drizzle}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${drizzle}.png`;
    } else if (id >= 500 && id <= 504) {
      let rain = "";
      if (id >= 500 && id < 504) {
        rain = "10d";
      } else if (id === 511) {
        rain = "13d";
      } else {
        rain = "09d";
      }
      wIcon.src = `https://openweathermap.org/img/w/${rain}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${rain}.png`;
    } else if (id >= 600 && id <= 622) {
      let snow = "13d";
      wIcon.src = `https://openweathermap.org/img/w/${snow}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${snow}.png`;
    } else if (id >= 701 && id <= 781) {
      let atmosphere = "50d";
      wIcon.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
    } else if (id >= 801 && id <= 804) {
      let clouds = "";
      if (id === 801) {
        clouds = "02d";
      } else if (id === 802) {
        clouds = "03d";
      } else {
        clouds = "04d";
      }
      wIcon.src = `https://openweathermap.org/img/w/${clouds}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${clouds}.png`;
    }
  }
  console.log(info);
}

//? when open the App showing recently data
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSucces, onError);
    alertError.style.display = "none!important";
  }

  function onError() {
    alert(
      "Please share your location information with the application to get the data based on the current location."
    );
    alertError.style.display = "none!important";
  }
};

//! Weather API hourly data

//! Date, Hour

const date = firstSection.querySelector(".date");
const clock = firstSection.querySelector(".clock");
const sDate = secondPageFirstSection.querySelector(".date");
const sClock = secondPageFirstSection.querySelector(".clock");

// this function create current date
const newDate = new Date();

// week day
let weekDay = newDate.getDay();
// day
let day = newDate.getDate();
// month
let month = newDate.getMonth();
// year
let year = newDate.getFullYear();

// getMonth value converter Months' name
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

if (month >= 0 && month <= 11) {
  month = monthNames[month];
} else {
  alert("Allow the app to use your phone's date and time");
}

// getDay value converter Day's name
const weekDaysNames = [
  "Sunday",
  "Monday",
  "Thuesday",
  "Wendesday",
  "Thursday",
  "Friday",
  "Saturday",
];

if (weekDay >= 0 && weekDay <= 6) {
  weekDay = weekDaysNames[weekDay];
} else {
  alert("Allow the app to use your phone's date and time");
}

//? Time

let hour, minutes, part, clockText;

//?* Default time value
hour = newDate.getHours();
minutes = newDate.getMinutes();

// PM or AM
if (hour >= 12 && hour <= 24) {
  part = "PM";
} else {
  part = "AM";
}

// add minutes before "0" if minut value = 0~9
if (minutes < 10) {
  minutes = "0" + minutes;
}

clockText = clock.innerText = `${hour}.${minutes} ${part}`;
sClock.innerText = clockText;

//* update time per minute
setInterval(() => {
  const newDateTime = new Date();
  hour = newDateTime.getHours();
  minutes = newDateTime.getMinutes();

  // PM or AM
  if (hour >= 12 && hour <= 24) {
    part = "PM";
  } else {
    part = "AM";
  }

  // add minutes before "0" if minut value = 0~9
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  clockText = clock.innerText = `${hour}.${minutes} ${part}`;
  sClock.innerText = clockText;
}, 1000);

let dateText = (date.innerText = `${weekDay}, ${day} ${month} ${year}`);
sDate.innerText = dateText;

//! last update time

const lastUpdate = firstSection.querySelector(".last-update");
const sLastUpdate = secondPageFirstSection.querySelector(".last-update");

lastUpdate.innerText = `Last updated ${clockText}`;
sLastUpdate.innerText = `Last updated ${clockText}`;
