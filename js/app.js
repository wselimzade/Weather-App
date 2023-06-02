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
const fire = document.querySelector("#fire");

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

const clickEffectFire = () => {
  fire.classList.add("button-clicked");

  setTimeout(function () {
    fire.classList.remove("button-clicked");
  }, 200);
};

const clickEffectSearch = () => {
  searchIcon.classList.add("button-clicked");

  setTimeout(function () {
    searchIcon.classList.remove("button-clicked");
  }, 200);
};

button.addEventListener("click", clickEffectButton);
close.addEventListener("click", clickEffectClose);
currentLocation.addEventListener("click", clickEffectLocation);
fire.addEventListener("click", clickEffectFire);
searchIcon.addEventListener("click", clickEffectSearch);

//! nigt mode & light mode

const nightLink = document.getElementsByTagName("link")[2];

const locationIcon = document.querySelector("#location");
const searchIcontheme = document.querySelector("#search");

const locationSearch = document.querySelector("#location-search");

function changeTheme() {
  if (nightLink.getAttribute("href") === "") {
    nightLink.setAttribute("href", "./css/night-mode.css");
    locationIcon.src = "img/nightMode-location.svg";
    searchIcontheme.src = "img/nightMode-search.svg";
    locationSearch.src = "img/nightMode-location.svg";
  } else {
    nightLink.href = "";
    locationIcon.src = "img/location.svg";
    searchIcontheme.src = "img/search.svg";
    locationSearch.src = "img/location-svgrepo-com.svg";
  }
}

fire.addEventListener("click", changeTheme);

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
  dailyAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&cnt=40&units=metric&cnt=10&appid=${apiKey}`;

  fetchData();
  alertError.style.display = "none";
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
  dailyAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=40&units=metric&appid=${apiKey}`;

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
    console.log("daily data is don't found");
  } else {
    const dailyData = dInfo.list;

    // daily data number convert month name
    switch (month) {
      case "January":
        month = "01";
        break;
      case "February":
        month = "02";
        break;
      case "March":
        month = "03";
        break;
      case "April":
        month = "04";
        break;
      case "May":
        month = "05";
        break;
      case "June":
        month = "06";
        break;
      case "July":
        month = "07";
        break;
      case "August":
        month = "08";
        break;
      case "September":
        month = "09";
        break;
      case "October":
        month = "10";
        break;
      case "November":
        month = "11";
        break;
      case "December":
        month = "12";
        break;
    }

    // tomorrow and next day
    let day2 = String(Number(day) + 1);
    let day3 = String(Number(day) + 2);
    let day4 = String(Number(day) + 3);
    let day5 = String(Number(day) + 4);

    // add "0" after the day number
    day = day < 10 ? "0" + day : day;
    day2 = day2 < 10 ? "0" + day2 : day2;
    day3 = day3 < 10 ? "0" + day3 : day3;
    day4 = day4 < 10 ? "0" + day4 : day4;
    day5 = day5 < 10 ? "0" + day5 : day5;

    // tomorrow and next day data time
    const tomorrowData = `${year}-${month}-${day2}`;
    const theDayAfterTomorrowData = `${year}-${month}-${day3}`;
    const inTwoDaysData = `${year}-${month}-${day4}`;
    const inThreeDaysData = `${year}-${month}-${day5}`;

    // tomorrow and next day temp of while day
    let tomorrowArr = [];
    let theDayAfterTomorrowArr = [];
    let inTwoDaysArr = [];
    let inThreeDaysArr = [];

    // tomorrow and next day ID for 12:00
    let tomorrowAverageTimeID;
    let theDayAfterTomorrowAverageTimeID;
    let inTwoDaysAverageTimeID;
    let inThreeDaysAverageTimeID;

    // array list all weather icon in thirdsection
    let weatherInfoIcon = thirdSection.querySelectorAll("#weather-info-icon");

    // weather icon for tomorrow and next day
    let tomorrowWeatherIcon = weatherInfoIcon[0];
    let theDayAfterTomorrowWeatherIcon = weatherInfoIcon[1];
    let inTwoDaysWeatherIcon = weatherInfoIcon[2];
    let inThreeDaysWeatherIcon = weatherInfoIcon[3];

    // array list weather info for tomorrow and next day
    const weekDayInfoAll = thirdSection.querySelectorAll(".weekDay-info");

    // weather info for tomorrow and next day
    let tomorrowWeekDayInfo;
    let theAfterDayTomorrowWeekDayInfo;
    let inTwoDaysWeekDayInfo;
    let inThreeDaysWeekDayInfo;

    // tomorrow and next day temp of while day add to array
    for (let i = 0; i <= 39; i++) {
      let dailyDataAll = dailyData[i].dt_txt.split(" ")[0];
      let dailyDataTime = dailyData[i].dt_txt.split(" ")[1];

      if (dailyDataAll == tomorrowData) {
        tomorrowArr.push(dailyData[i].main.temp);
        if (dailyDataTime == "12:00:00") {
          tomorrowAverageTimeID = dailyData[i].weather[0].id;
          tomorrowWeekDayInfo = dailyData[i].weather[0].description;
        }
      } else if (dailyDataAll == theDayAfterTomorrowData) {
        theDayAfterTomorrowArr.push(dailyData[i].main.temp);
        if (dailyDataTime == "12:00:00") {
          theDayAfterTomorrowAverageTimeID = dailyData[i].weather[0].id;
          theAfterDayTomorrowWeekDayInfo = dailyData[i].weather[0].description;
        }
      } else if (dailyDataAll == inTwoDaysData) {
        inTwoDaysArr.push(dailyData[i].main.temp);
        if (dailyDataTime == "12:00:00") {
          inTwoDaysAverageTimeID = dailyData[i].weather[0].id;
          inTwoDaysWeekDayInfo = dailyData[i].weather[0].description;
        }
      } else if (dailyDataAll == inThreeDaysData) {
        inThreeDaysArr.push(dailyData[i].main.temp);
        if (dailyDataTime == "12:00:00") {
          inThreeDaysAverageTimeID = dailyData[i].weather[0].id;
          inThreeDaysWeekDayInfo = dailyData[i].weather[0].description;
        }
      }
    }

    let infoTextAlertHead = thirdSection.querySelector(".info-text-head");
    let infoTextAlertContent = thirdSection.querySelector(".info-text-content");

    //? Tomorrow weather info icon change for weather data
    // clear
    if (tomorrowAverageTimeID === 800) {
      let clear = "01d";
      tomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${clear}.png`;
      weekDayInfoAll[0].innerText = tomorrowWeekDayInfo;
      infoTextAlertHead.innerText =
        "Clear and sunny weather is expected tomorrow.";
      infoTextAlertContent.innerText =
        "Enjoy a sunny day and engage in activities outside. Don't forget to apply sunscreen and drink enough water.";
    }
    //thunderstorm
    else if (tomorrowAverageTimeID >= 200 && tomorrowAverageTimeID <= 232) {
      let thunderstorm = "11d";
      tomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
      weekDayInfoAll[0].innerText = tomorrowWeekDayInfo;
      infoTextAlertHead.innerText = "Be prepared for a thunderstorm tomorrow.";
      infoTextAlertContent.innerText =
        "Be prepared for a thunderstorm tomorrow. Follow the weather updates and be prepared for possible power outages.";
    }
    // drizzle
    else if (tomorrowAverageTimeID >= 300 && tomorrowAverageTimeID <= 321) {
      let drizzle = "09d";
      tomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${drizzle}.png`;
      weekDayInfoAll[0].innerText = tomorrowWeekDayInfo;
      infoTextAlertHead.innerText = "Light drizzle expected tomorrow.";
      infoTextAlertContent.innerText =
        "It is useful to carry an umbrella or a waterproof jacket to stay dry. Drizzle can make surfaces slippery, step carefully.";
    }
    // rain
    else if (tomorrowAverageTimeID >= 500 && tomorrowAverageTimeID <= 531) {
      let rain = "";
      if (tomorrowAverageTimeID >= 500 && tomorrowAverageTimeID < 504) {
        rain = "10d";
      } else if (tomorrowAverageTimeID === 511) {
        rain = "13d";
      } else {
        rain = "09d";
      }
      tomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${rain}.png`;
      weekDayInfoAll[0].innerText = tomorrowWeekDayInfo;
      infoTextAlertHead.innerText =
        "Rain is expected during the weather forecast tomorrow.";
      infoTextAlertContent.innerText =
        "Remember to take an umbrella or raincoat to stay dry. Be careful when driving on wet roads and travel at a safe speed.";
    }
    // snow
    else if (tomorrowAverageTimeID >= 600 && tomorrowAverageTimeID <= 622) {
      let snow = "13d";
      tomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${snow}.png`;
      weekDayInfoAll[0].innerText = tomorrowWeekDayInfo;
      infoTextAlertHead.innerText = "Snowfall is expected tomorrow.";
      infoTextAlertContent.innerText =
        "Wear warm clothes and be careful on snowy grounds. Enjoy the beauty of snowfall! Be careful on slippery surfaces and stay safe.";
    }
    // atmosphere
    else if (tomorrowAverageTimeID >= 701 && tomorrowAverageTimeID <= 781) {
      let atmosphere = "50d";
      tomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
      weekDayInfoAll[0].innerText = tomorrowWeekDayInfo;
      infoTextAlertHead.innerText = "Tomorrow may be foggy or misty.";
      infoTextAlertContent.innerText =
        "Be careful while driving and allow extra time for your journey. Use fog lights if necessary and stay at a safe distance from other vehicles.";
    }
    // clouds
    else if (tomorrowAverageTimeID >= 801 && tomorrowAverageTimeID <= 804) {
      let clouds = "";
      if (tomorrowAverageTimeID === 801) {
        clouds = "02d";
      } else if (tomorrowAverageTimeID === 802) {
        clouds = "03d";
      } else {
        clouds = "04d";
      }
      tomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${clouds}.png`;
      weekDayInfoAll[0].innerText = tomorrowWeekDayInfo;
      infoTextAlertHead.innerText =
        "Tomorrow will be cloudy, providing a cool and comfortable atmosphere.";
      infoTextAlertContent.innerText =
        "Enjoy indoor weather. Check for any updates or changes in weather conditions.";
    }

    //? theDayAfterTomorrow weather info icon change for weather data
    // clear
    if (theDayAfterTomorrowAverageTimeID === 800) {
      let clear = "01d";
      theDayAfterTomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${clear}.png`;
      weekDayInfoAll[1].innerText = theAfterDayTomorrowWeekDayInfo;
    }
    //thunderstorm
    else if (
      theDayAfterTomorrowAverageTimeID >= 200 &&
      theDayAfterTomorrowAverageTimeID <= 232
    ) {
      let thunderstorm = "11d";
      theDayAfterTomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
      weekDayInfoAll[1].innerText = theAfterDayTomorrowWeekDayInfo;
    }
    // drizzle
    else if (
      theDayAfterTomorrowAverageTimeID >= 300 &&
      theDayAfterTomorrowAverageTimeID <= 321
    ) {
      let drizzle = "09d";
      theDayAfterTomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${drizzle}.png`;
      weekDayInfoAll[1].innerText = theAfterDayTomorrowWeekDayInfo;
    }
    // rain
    else if (
      theDayAfterTomorrowAverageTimeID >= 500 &&
      theDayAfterTomorrowAverageTimeID <= 531
    ) {
      let rain = "";
      if (
        theDayAfterTomorrowAverageTimeID >= 500 &&
        theDayAfterTomorrowAverageTimeID < 504
      ) {
        rain = "10d";
      } else if (theDayAfterTomorrowAverageTimeID === 511) {
        rain = "13d";
      } else {
        rain = "09d";
      }
      theDayAfterTomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${rain}.png`;
      weekDayInfoAll[1].innerText = theAfterDayTomorrowWeekDayInfo;
    }
    // snow
    else if (
      theDayAfterTomorrowAverageTimeID >= 600 &&
      theDayAfterTomorrowAverageTimeID <= 622
    ) {
      let snow = "13d";
      theDayAfterTomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${snow}.png`;
      weekDayInfoAll[1].innerText = theAfterDayTomorrowWeekDayInfo;
    }
    // atmosphere
    else if (
      theDayAfterTomorrowAverageTimeID >= 701 &&
      theDayAfterTomorrowAverageTimeID <= 781
    ) {
      let atmosphere = "50d";
      theDayAfterTomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
      weekDayInfoAll[1].innerText = theAfterDayTomorrowWeekDayInfo;
    }
    // clouds
    else if (
      theDayAfterTomorrowAverageTimeID >= 801 &&
      theDayAfterTomorrowAverageTimeID <= 804
    ) {
      let clouds = "";
      if (theDayAfterTomorrowAverageTimeID === 801) {
        clouds = "02d";
      } else if (theDayAfterTomorrowAverageTimeID === 802) {
        clouds = "03d";
      } else {
        clouds = "04d";
      }
      theDayAfterTomorrowWeatherIcon.src = `https://openweathermap.org/img/w/${clouds}.png`;
      weekDayInfoAll[1].innerText = theAfterDayTomorrowWeekDayInfo;
    }

    //? in two days weather info icon change for weather data
    // clear
    if (inTwoDaysAverageTimeID === 800) {
      let clear = "01d";
      inTwoDaysWeatherIcon.src = `https://openweathermap.org/img/w/${clear}.png`;
      weekDayInfoAll[2].innerText = inTwoDaysWeekDayInfo;
    }
    //thunderstorm
    else if (inTwoDaysAverageTimeID >= 200 && inTwoDaysAverageTimeID <= 232) {
      let thunderstorm = "11d";
      inTwoDaysWeatherIcon.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
      weekDayInfoAll[2].innerText = inTwoDaysWeekDayInfo;
    }
    // drizzle
    else if (inTwoDaysAverageTimeID >= 300 && inTwoDaysAverageTimeID <= 321) {
      let drizzle = "09d";
      inTwoDaysWeatherIcon.src = `https://openweathermap.org/img/w/${drizzle}.png`;
      weekDayInfoAll[2].innerText = inTwoDaysWeekDayInfo;
    }
    // rain
    else if (inTwoDaysAverageTimeID >= 500 && inTwoDaysAverageTimeID <= 531) {
      let rain = "";
      if (inTwoDaysAverageTimeID >= 500 && inTwoDaysAverageTimeID < 504) {
        rain = "10d";
      } else if (inTwoDaysAverageTimeID === 511) {
        rain = "13d";
      } else {
        rain = "09d";
      }
      inTwoDaysWeatherIcon.src = `https://openweathermap.org/img/w/${rain}.png`;
      weekDayInfoAll[2].innerText = inTwoDaysWeekDayInfo;
    }
    // snow
    else if (inTwoDaysAverageTimeID >= 600 && inTwoDaysAverageTimeID <= 622) {
      let snow = "13d";
      inTwoDaysWeatherIcon.src = `https://openweathermap.org/img/w/${snow}.png`;
      weekDayInfoAll[2].innerText = inTwoDaysWeekDayInfo;
    }
    // atmosphere
    else if (inTwoDaysAverageTimeID >= 701 && inTwoDaysAverageTimeID <= 781) {
      let atmosphere = "50d";
      inTwoDaysWeatherIcon.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
      weekDayInfoAll[2].innerText = inTwoDaysWeekDayInfo;
    }
    // clouds
    else if (inTwoDaysAverageTimeID >= 801 && inTwoDaysAverageTimeID <= 804) {
      let clouds = "";
      if (inTwoDaysAverageTimeID === 801) {
        clouds = "02d";
      } else if (inTwoDaysAverageTimeID === 802) {
        clouds = "03d";
      } else {
        clouds = "04d";
      }
      inTwoDaysWeatherIcon.src = `https://openweathermap.org/img/w/${clouds}.png`;
      weekDayInfoAll[2].innerText = inTwoDaysWeekDayInfo;
    }

    //? in three days weather info icon change for weather data
    // clear
    if (inThreeDaysAverageTimeID === 800) {
      let clear = "01d";
      inThreeDaysWeatherIcon.src = `https://openweathermap.org/img/w/${clear}.png`;
      weekDayInfoAll[3].innerText = inThreeDaysWeekDayInfo;
    }
    //thunderstorm
    else if (
      inThreeDaysAverageTimeID >= 200 &&
      inThreeDaysAverageTimeID <= 232
    ) {
      let thunderstorm = "11d";
      inThreeDaysWeatherIcon.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
      weekDayInfoAll[3].innerText = inThreeDaysWeekDayInfo;
    }
    // drizzle
    else if (
      inThreeDaysAverageTimeID >= 300 &&
      inThreeDaysAverageTimeID <= 321
    ) {
      let drizzle = "09d";
      inThreeDaysWeatherIcon.src = `https://openweathermap.org/img/w/${drizzle}.png`;
      weekDayInfoAll[3].innerText = inThreeDaysWeekDayInfo;
    }
    // rain
    else if (
      inThreeDaysAverageTimeID >= 500 &&
      inThreeDaysAverageTimeID <= 531
    ) {
      let rain = "";
      if (inThreeDaysAverageTimeID >= 500 && inThreeDaysAverageTimeID < 504) {
        rain = "10d";
      } else if (inThreeDaysAverageTimeID === 511) {
        rain = "13d";
      } else {
        rain = "09d";
      }
      inThreeDaysWeatherIcon.src = `https://openweathermap.org/img/w/${rain}.png`;
      weekDayInfoAll[3].innerText = inThreeDaysWeekDayInfo;
    }
    // snow
    else if (
      inThreeDaysAverageTimeID >= 600 &&
      inThreeDaysAverageTimeID <= 622
    ) {
      let snow = "13d";
      inThreeDaysWeatherIcon.src = `https://openweathermap.org/img/w/${snow}.png`;
      weekDayInfoAll[3].innerText = inThreeDaysWeekDayInfo;
    }
    // atmosphere
    else if (
      inThreeDaysAverageTimeID >= 701 &&
      inThreeDaysAverageTimeID <= 781
    ) {
      let atmosphere = "50d";
      inThreeDaysWeatherIcon.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
      weekDayInfoAll[3].innerText = inThreeDaysWeekDayInfo;
    }
    // clouds
    else if (
      inThreeDaysAverageTimeID >= 801 &&
      inThreeDaysAverageTimeID <= 804
    ) {
      let clouds = "";
      if (inThreeDaysAverageTimeID === 801) {
        clouds = "02d";
      } else if (inThreeDaysAverageTimeID === 802) {
        clouds = "03d";
      } else {
        clouds = "04d";
      }
      inThreeDaysWeatherIcon.src = `https://openweathermap.org/img/w/${clouds}.png`;
      weekDayInfoAll[3].innerText = inThreeDaysWeekDayInfo;
    }

    // calculating temp avarage of day
    function tempAvarage(one, two, three, four, five, six, seven, eight) {
      return (one + two + three + four + five + six + seven + eight) / 8;
    }

    const weekDayInfo = thirdSection.querySelectorAll(".weekDay-dg-info");

    weekDayInfo[0].innerText = `${Math.floor(tempAvarage(...tomorrowArr))}º C`;
    weekDayInfo[1].innerText = `${Math.floor(
      tempAvarage(...theDayAfterTomorrowArr)
    )}º C`;
    weekDayInfo[2].innerText = `${Math.floor(tempAvarage(...inTwoDaysArr))}º C`;
    weekDayInfo[3].innerText = `${Math.floor(
      tempAvarage(...inThreeDaysArr)
    )}º C`;

    console.log(dInfo);
  }
}

function hourlyDetails(hInfo) {
  //? warning, if input false value
  if (hInfo.cod == "404") {
    console.log("hourly data is don't found");
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

      // clear
      if (hId === 800) {
        let clear = "01d";
        hWIconArr.src = `https://openweathermap.org/img/w/${clear}.png`;
      }
      //thunderstorm
      else if (hId >= 200 && hId <= 232) {
        let thunderstorm = "11d";
        hWIconArr.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
      }
      // drizzle
      else if (hId >= 300 && hId <= 321) {
        let drizzle = "09d";
        hWIconArr.src = `https://openweathermap.org/img/w/${drizzle}.png`;
      }
      // rain
      else if (hId >= 500 && hId <= 531) {
        let rain = "";
        if (hId >= 500 && hId < 504) {
          rain = "10d";
        } else if (hId === 511) {
          rain = "13d";
        } else {
          rain = "09d";
        }
        hWIconArr.src = `https://openweathermap.org/img/w/${rain}.png`;
      }
      // snow
      else if (hId >= 600 && hId <= 622) {
        let snow = "13d";
        hWIconArr.src = `https://openweathermap.org/img/w/${snow}.png`;
      }
      // atmosphere
      else if (hId >= 701 && hId <= 781) {
        let atmosphere = "50d";
        hWIconArr.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
      }
      // clouds
      else if (hId >= 801 && hId <= 804) {
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
    const { humidity, temp, pressure } = info.main;
    const wind = info.wind.speed;
    const visibility = info.visibility;

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
    secondPageThirdSection.querySelector("#fog-sum").innerText = `${
      visibility / 1000
    } km`;

    //? weather icons for different temprature
    // clear
    if (id === 800) {
      let clear = "01d";
      wIcon.src = `https://openweathermap.org/img/w/${clear}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${clear}.png`;
      let color =
        "linear-gradient(104deg, rgba(222,203,174,1) 9%, rgba(79,155,170,1) 100%)";
      weather.style.background = color;
      defaultBackground.style.background = color;
    }
    // thunderstrom
    else if (id >= 200 && id <= 232) {
      let thunderstorm = "11d";
      wIcon.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${thunderstorm}.png`;
      let color = "linear-gradient(104.02deg, #4C4E53 9.87%, #0B1223 98.3%)";
      weather.style.background = color;
      defaultBackground.style.background = color;
    }
    // drizzle
    else if (id >= 300 && id <= 321) {
      let drizzle = "09d";
      wIcon.src = `https://openweathermap.org/img/w/${drizzle}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${drizzle}.png`;
      let color =
        "linear-gradient(104deg, rgba(213,210,207,1) 9%, rgba(52,97,121,1) 100%)";
      weather.style.background = color;
      defaultBackground.style.background = color;
    }
    // rain
    else if (id >= 500 && id <= 531) {
      let rain = "";
      if (id >= 500 && id < 504) {
        rain = "10d";
        let color =
          "linear-gradient(104deg, rgb(190, 219, 224) 9%, rgba(157,101,65,1) 100%)";
        weather.style.background = color;
        defaultBackground.style.background = color;
      } else if (id === 511) {
        rain = "13d";
        let color =
          "linear-gradient(104deg, rgba(251,246,242,1) 9%, rgba(61,155,204,1) 100%)";
        weather.style.background = color;
        defaultBackground.style.background = color;
      } else {
        rain = "09d";
        let color =
          "linear-gradient(104deg, rgba(213,210,207,1) 9%, rgba(52,97,121,1) 100%)";
        weather.style.background = color;
        defaultBackground.style.background = color;
      }
      wIcon.src = `https://openweathermap.org/img/w/${rain}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${rain}.png`;
    }
    // snow
    else if (id >= 600 && id <= 622) {
      let snow = "13d";
      wIcon.src = `https://openweathermap.org/img/w/${snow}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${snow}.png`;
      let color =
        "linear-gradient(104deg, rgba(251,246,242,1) 9%, rgba(61,155,204,1) 100%)";
      weather.style.background = color;
      defaultBackground.style.background = color;
    }
    // atmosphere
    else if (id >= 701 && id <= 781) {
      let atmosphere = "50d";
      wIcon.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
      wsIcon.src = `https://openweathermap.org/img/w/${atmosphere}.png`;
      let color =
        "linear-gradient(104deg,rgba(177, 180, 191, 1) 9%,rgba(59, 58, 68, 1) 100%)";
      weather.style.background = color;
      defaultBackground.style.background = color;
    }
    // clouds
    else if (id >= 801 && id <= 804) {
      let clouds = "";
      if (id === 801) {
        clouds = "02d";
        let color =
          "linear-gradient(104deg, rgba(235,178,92,1) 9%, rgba(149,238,255,1) 100%)";
        weather.style.background = color;
        defaultBackground.style.background = color;
      } else if (id === 802) {
        clouds = "03d";
        let color = "104deg, rgba(215,218,227,1) 9%, rgb(115, 159, 196) 100%";
        weather.style.background = color;
        defaultBackground.style.background = color;
      } else {
        clouds = "04d";
        let color =
          "linear-gradient(104deg,rgb(193, 196, 204) 9%,rgb(90, 125, 153) 100%";
        weather.style.background = color;
        defaultBackground.style.background = color;
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

//! Date, Hour

const date = firstSection.querySelector(".date");
const clock = firstSection.querySelector(".clock");
const sDate = secondPageFirstSection.querySelector(".date");
const sClock = secondPageFirstSection.querySelector(".clock");

const WeekDayName = thirdSection.querySelectorAll(".weekDay");

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
  "Sunday",
  "Monday",
  "Thuesday",
  "Wendesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekDayValue;
if (weekDay >= 0 && weekDay <= 6) {
  weekDayValue = weekDaysNames[weekDay];
  for (let i = 0; i <= 3; i++) {
    let j = i + 1;
    WeekDayName[i].innerText = weekDaysNames[weekDay + j];
  }
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
UpdateTime();
function UpdateTime() {
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
}

let dateText = (date.innerText = `${weekDayValue}, ${day} ${month} ${year}`);
sDate.innerText = dateText;

//! last update time

const lastUpdate = firstSection.querySelector(".last-update");
const sLastUpdate = secondPageFirstSection.querySelector(".last-update");

lastUpdate.innerText = `Last updated ${clockText}`;
sLastUpdate.innerText = `Last updated ${clockText}`;
