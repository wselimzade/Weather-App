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

//! Slider weather menu for time

const scrollbarThumb = document.querySelector('.second-section .dg-clock::-webkit-scrollbar-thumb');

scrollbarThumb.addEventListener('mouseenter', function() {
  scrollbarThumb.style.cursor = 'pointer';
});

scrollbarThumb.addEventListener('mouseleave', function() {
  scrollbarThumb.style.cursor = 'auto';
});

