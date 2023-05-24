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
  searchInput.style.display = "flex";
};

searchIcon.addEventListener("click", showSearchInput);

//! search button and close button click effect

const button = document.querySelector(".search-start");
const close = document.querySelector(".close");

const clickEffectButton = () => {
  button.classList.add("button-clicked");

  setTimeout(function () {
    button.classList.remove("button-clicked");
    close.classList.remove("button-clicked");
  }, 200);
};

const clickEffectClose = () => {
  close.classList.add("button-clicked");

  setTimeout(function () {
    close.classList.remove("button-clicked");
    searchInput.style.display = "none";
  }, 200);
};

button.addEventListener("click", clickEffectButton);
close.addEventListener("click", clickEffectClose);
