// ! /////////////////////////////
let searchText = document.getElementById("searchText");
let searchBtn = document.getElementById("searchBtn");
// ! //////////////////////////////////////////////////////////////////
// ?Current Weather
let currentDayName = document.getElementById("currentDayName");
let currentDayDate = document.getElementById("currentDayDate");
let capitalTitle = document.getElementById("capitalTitle");
let currentTemperature = document.getElementById("currentTemp");
let currentDayImgIcon = document.getElementById("currentDayImgIcon");
let currentWeatherStatus = document.getElementById("currentWeatherStatus");
let currentWeatherSpeed = document.getElementById("currentWeatherSpeed");
let currentWeatherDir = document.getElementById("currentWeatherDir");
// ! //////////////////////////////////////////////////////////////////
// ? second Day weather
let secondDayName = document.getElementById("secondDayName");
let secondDayImgIcon = document.getElementById("secondDayImgIcon");
let secondDayMaxTemperature = document.getElementById("secondDayMaxTemp");
let secondDayMinTemperature = document.getElementById("secondDayMinTemp");
let secondDayWeatherStatus = document.getElementById("secondDayWeatherStatus");
// ! ////////////////////////////////////////////////////////////////////
// ? third Day weather
let thirdDayName = document.getElementById("thirdDayName");
let thirdDayImgIcon = document.getElementById("thirdDayImgIcon");
let thirdDayMaxTemperature = document.getElementById("thirdDayMaxTemp");
let thirdDayMinTemperature = document.getElementById("thirdDayMinTemp");
let thirdDayWeatherStatus = document.getElementById("thirdDayWeatherStatus");
// ! //////////////////////////////////////////////////////////////////

async function getCurrentWeather(searchedCapital = "Cairo") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=a720c50ede5a4092bd510014241301&q=${searchedCapital}&days=3`
  );
  //data as JSON
  let dataResponse = await response.json();
  //data of current forecast data
  let forecast = await dataResponse.forecast;

  // forecastday data is []
  let forecastday = forecast.forecastday;
  for (let i = 0; i < forecastday.length; i++) {
    let todayDate = forecastday[0].date;
    let today = new Date(todayDate);

    //get current day
    let currentDay = today.getDay();
    let dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednsday",
      "thursday",
      "friday",
      "saturday",
    ];

    //get current date and month
    let currentDate = today.getDate();
    let currentMonth = today.getMonth();
    let monthNames = [
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

    //get current date and month

    currentDayName.innerText = dayNames[currentDay];
    currentDayDate.innerText = currentDate + " " + monthNames[currentMonth];

    break;
  }

  //data of current Capital Name
  let locationData = await dataResponse.location;
  let capitalName = await locationData.name;
  capitalTitle.innerText = capitalName;

  // data of current weather temperature and Icon
  let current = await dataResponse.current;
  let currentCondition = await current.condition;
  let currentTemp = await current.temp_c;
  let weatherStatus = await currentCondition.text;
  let weatherIcon = await currentCondition.icon;
  currentTemperature.innerHTML = `${currentTemp}<sup>o</sup>C`;
  currentWeatherStatus.innerText = weatherStatus;
  currentDayImgIcon.setAttribute("src", `https:${weatherIcon}`);

  //data of wind speed and direction

  console.log(dataResponse);
  let currentWindSpeed = await current.wind_kph;
  let currentWindDir = await current.wind_dir;
  currentWeatherSpeed.innerHTML = `  <img
  id="currentWeatherSpeed"
  src="img/icon-wind@2x.png"
  alt="wind"
    />
${currentWindSpeed}Km/h`;
  currentWeatherDir.innerHTML = `
  <img src="img/icon-compass@2x.png" alt="compass" />
  ${currentWindDir}
  `;

  getFutureWeather(searchedCapital);

  // console.log(weatherStatus);
  // console.log(weatherIcon);
}

async function getFutureWeather(searchedCapital = "Cairo") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=a720c50ede5a4092bd510014241301&q=${searchedCapital}&days=3`
  );

  let dataResponse = await response.json();
  let forecast = await dataResponse.forecast;
  //forecastDay []
  let forecastDay = await forecast.forecastday;
  for (let i = 0; i < forecastDay.length; i++) {
    // ******************************** second day
    // get the tomorrow Day Name
    let tomorrowDate = forecastDay[1].date;
    let tomorrow = new Date(tomorrowDate);
    //get current day
    let nextDay = tomorrow.getDay();
    let dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednsday",
      "thursday",
      "friday",
      "saturday",
    ];
    let secondDayMaxTemp = forecastDay[1].day.maxtemp_c;
    let secondDayMinTemp = forecastDay[1].day.mintemp_c;
    let secondDayStatus = forecastDay[1].day.condition.text;
    let secondDayIcon = forecastDay[1].day.condition.icon;

    secondDayName.innerText = dayNames[nextDay];
    secondDayMaxTemperature.innerHTML = `${secondDayMaxTemp}<sup>o</sup>C`;
    secondDayMinTemperature.innerHTML = `${secondDayMinTemp}<sup>o</sup>C`;
    secondDayWeatherStatus.innerText = secondDayStatus;
    secondDayImgIcon.setAttribute("src", `https:${secondDayIcon}`);

    // ******************************** third day
    let thirdDate = forecastDay[2].date;
    let thirdDayDate = new Date(thirdDate);
    //get current day
    let thirdDay = thirdDayDate.getDay();

    let thirdDayMaxTemp = forecastDay[2].day.maxtemp_c;
    let thirdDayMinTemp = forecastDay[2].day.mintemp_c;
    let thirdDayStatus = forecastDay[2].day.condition.text;
    let thirdDayIcon = forecastDay[2].day.condition.icon;

    thirdDayName.innerText = dayNames[thirdDay];
    thirdDayMaxTemperature.innerHTML = `${thirdDayMaxTemp}<sup>o</sup>C`;
    thirdDayMinTemperature.innerHTML = `${thirdDayMinTemp}<sup>o</sup>C`;
    thirdDayWeatherStatus.innerText = thirdDayStatus;
    thirdDayImgIcon.setAttribute("src", `https:${thirdDayIcon}`);

    break;
  }

  // get the third Day Name
}

searchBtn.addEventListener("click", function (e) {
  let searchedText = searchText.value;
  let finalSearchedText =
    searchedText.charAt(0).toUpperCase() + searchedText.slice(1);
  getCurrentWeather(finalSearchedText);
  console.log(finalSearchedText);
});

function autoSearch() {
  let searchedText = searchText.value;

  let finalSearchedText =
    searchedText.charAt(0).toUpperCase() + searchedText.slice(1);
  console.log(finalSearchedText);
  getCurrentWeather(finalSearchedText);
}

getCurrentWeather();
