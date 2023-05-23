"use strict";

const weather = document.querySelector(".date-clock-weather-content");
const defaultBackground = document.querySelector(".default");

const firstSection = document.querySelector(".first-section");
const thirdSection = document.querySelector(".third-section");
const secondPageFirstSection = document.querySelector(
  ".second-page-first-section"
);
const secondPageThirdSection = document.querySelector(
  ".second-page-third-section"
);

const returnArrow = document.querySelector("#arrow-left");

const weatherInfo = () => {
  
    firstSection.style.display = "none";
    thirdSection.style.display = "none";
    secondPageFirstSection.style.display = "block";
    secondPageThirdSection.style.display = "block";

    defaultBackground.classList.add("bg");
  
};

const returnDefaultPage = () => {
  
    secondPageFirstSection.style.display = "none";
    secondPageThirdSection.style.display = "none";
    firstSection.style.display = "block";
    thirdSection.style.display = "block";

    defaultBackground.classList.remove("bg");
  
};

weather.addEventListener("click", weatherInfo);
returnArrow.addEventListener("click", returnDefaultPage);
