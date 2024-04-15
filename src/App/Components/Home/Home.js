import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "./Home.css";
import { useTranslation } from "react-i18next";
import fetchWeatherAndForecastDataAction from "../Project-Redux/Weather/WeatherAction";
const Home = () => {
  var i = 1;
  const timerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCity] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [airPoll, setAirPoll] = useState([]);
  const [poll, setPoll] = useState("");
  const [img, setImg] = useState("");
  const [textColor, setTextColor] = useState("");
  const [t, setTranslate] = useTranslation();
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather.weather);
  const weatherForecast = useSelector((state) => state.weather.forecast);
  const weatherAirPoll = useSelector((state) => state.weather.airPollution);
  const memoizedWeatherData = useMemo(() => weatherData, [weatherData]);
  const memoizedWeatherForecast = useMemo(
    () => weatherForecast,
    [weatherForecast]
  );
  const memoizedAirPollution = useMemo(() => weatherAirPoll, [weatherAirPoll]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (cities == null) {
      setSearchQuery(""); // Set searchQuery to an empty string if cities is null
      setCity("Cairo");
    }
  };

  const handleButtonClick = (country) => {
    dispatch(fetchWeatherAndForecastDataAction(country));
    setSearchQuery(country)
    const stateImg = document.querySelector(".stateImg");
    stateImg.classList.remove("slide");
    void stateImg.offsetWidth;
    stateImg.classList.add("slide");
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedDate = date.toLocaleTimeString("en-US", options);
    return formattedDate;
  };
  const formatDayName = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long" };
    const formattedDayName = date.toLocaleDateString("en-US", options);
    return formattedDayName;
  };
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };
  const getCurrentDateTime = () => {
    const date = new Date();

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", options);
    const localTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate} | Local time : ${localTime}`;
  };
  <div className="text-white text-center mt-2">{getCurrentDateTime()}</div>;

  const fetchWeatherAndForecastData = () => {
    dispatch(fetchWeatherAndForecastDataAction(searchQuery));
  
    setCity(memoizedWeatherData);
    setForecast(memoizedWeatherForecast);
    setAirPoll(memoizedAirPollution);
    const stateImg = document.querySelector(".stateImg");
    stateImg.classList.remove("slide");
    void stateImg.offsetWidth;
    stateImg.classList.add("slide");
  };

  const calculateAirPollutionIndex = (data) => {
    if (!data || !data.components) {
      return 0; 
    }
    const maxValues = {
      co: 1000,
      nh3: 50,
      no: 200,
      no2: 200,
      o3: 100,
      pm2_5: 50,
      pm10: 100,
      so2: 50,
    };
    let totalNormalizedPollution = 0;
    let count = 0;
    if (
      airPoll &&
      airPoll.components &&
      typeof airPoll.components === "object"
    ) {
      for (const [key, value] of Object.entries(airPoll.components)) {
        if (maxValues[key]) {
          const max = maxValues[key];
          const normalizedValue = (value / max) * 200;
          totalNormalizedPollution += normalizedValue;
          count++;
        }
      }
    }

    const AQI = totalNormalizedPollution / count.toFixed();

    return AQI.toFixed();
  };

  useEffect(() => {
   
    if (!weatherData || !weatherForecast || !airPoll || !searchQuery) {
      dispatch(fetchWeatherAndForecastDataAction(searchQuery));
      const stateImg = document.querySelector(".stateImg");
      stateImg.classList.remove("slide");
      void stateImg.offsetWidth;
      stateImg.classList.add("slide");
    }
    if (searchQuery === "") {
      setSearchQuery("Cairo"); 
      dispatch(fetchWeatherAndForecastDataAction("Cairo"));
   
    }
    setCity(memoizedWeatherData);
    setForecast(memoizedWeatherForecast);
    setAirPoll(memoizedAirPollution);
    // }
    const AQI = calculateAirPollutionIndex(airPoll);
    if (AQI >= 0 && AQI <= 50) {
      setPoll("Good");
      setImg("../s.png");
      setTextColor("#109125"); 
    } else if (AQI > 50 && AQI <= 100) {
      setPoll("Moderate");
      setImg("../m.png");
      setTextColor("#F9B220"); 
    } else if (AQI > 100 && AQI < 200) {
      setPoll("Poor");
      setImg("../un.png");
      setTextColor("#F9B220");
    } else if (AQI >= 200) {
      setPoll("Unhealthy");
      setImg("../ca.png");
      setTextColor("#ED0A0B");
    }
    const counter = document.querySelector(".pollNum");
    let count = 0;
    const targetCount = AQI;
    const duration = 500; // 5 seconds
    const interval = duration / targetCount;

    function updateCounter() {
      counter.textContent = count;
      count++;
      if (count <= targetCount) {
        timerRef.current = setTimeout(updateCounter, interval);
      }
    }
    clearTimeout(timerRef.current);
    if (weatherAirPoll && weatherAirPoll.components) {
      updateCounter();
    }

    // Cleanup function to clear the previous timer
    return () => clearTimeout(timerRef.current);
  }, [dispatch, weatherData , forecast ]);

  return (
    <div className="container-fluid p-50">
      <div className="col-lg-12">
        <div className="row d-flex">
          <div className="col-lg-6 p-4">
            <div className="card shadow-lg  m-2 p-5 bg-dark" key={i++}>
              <div id="cityButton" className="d-flex justify-content-center p-2">
                <a type="button" onClick={() => handleButtonClick("Paris")}>
                  <div className="text-white mx-4">Paris</div>
                </a>
                <a type="button" onClick={() => handleButtonClick("Cairo")}>
                  <div className="text-white mx-4">Cairo</div>
                </a>
                <a type="button" onClick={() => handleButtonClick("Tokyo")}>
                  {" "}
                  <div className="text-white mx-4">Tokyo</div>
                </a>
                <a type="button" onClick={() => handleButtonClick("New Delhi")}>
                  {" "}
                  <div className="text-white mx-4">New Delhi</div>
                </a>
                <a type="button" onClick={() => handleButtonClick("London")}>
                  {" "}
                  <div className="text-white mx-4">London</div>
                </a>
              </div>

              <div className="d-flex justify-content-evenly ">
                <div className="d-flex justify-content-center p-3">
                  <input
                    className="form-control w-75"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <i
                    id="iconSearch"
                    className="bi bi-geo-alt text-white mx-1 p-2 "
                  ></i>
                  <a
                    className="bi bi-search text-white mx-1 p-2 "
                    type="button"
                    onClick={fetchWeatherAndForecastData}
                  ></a>
                </div>
              </div>
              <div>
                <div className="text-white text-center ">
                  {getCurrentDateTime()}
                </div>

                <div className="d-flex justify-content-center mx-1">
                  <div
                    className="text-white text-center"
                    style={{ fontSize: "30px" }}
                  >
                    {cities ? cities.name : ""},
                  </div>
                  <div
                    className="text-white text-center mx-2"
                    style={{ fontSize: "30px" }}
                  >
                    {cities && cities.sys && cities.sys.country
                      ? cities.sys.country
                      : ""}
                  </div>
                </div>
              </div>
              <div className="text-white text-center">
                {cities &&
                cities.weather &&
                Array.isArray(cities.weather) &&
                cities.weather.length > 0
                  ? cities.weather[0].main
                  : "0"}
              </div>

              <div className="d-flex justify-content-evenly ">
                <img
                  src={
                    cities &&
                    Array.isArray(cities.weather) &&
                    cities.weather.length > 0
                      ? `https://openweathermap.org/img/w/${cities.weather[0].icon}.png`
                      : ""
                  }
                  alt="weatherIcon"
                  className="bigImg"
                />
                <div
                  className="text-white text-center"
                  style={{ fontSize: "50px" }}
                >
                  {cities &&
                  cities.main &&
                  typeof cities.main.temp !== "undefined"
                    ? kelvinToCelsius(cities.main.temp).toFixed()
                    : "0"}
                  &deg;
                </div>
                <div>
                  <div className="text-white text-center">
                    <i className="bi bi-thermometer-half"></i> Real Feel :{" "}
                    {cities &&
                    cities.main &&
                    typeof cities.main.temp !== "undefined"
                      ? kelvinToCelsius(cities.main.feels_like).toFixed()
                      : "0"}
                    &deg;
                  </div>
                  <div className="text-white text-center">
                    <i className="bi bi-droplet"></i> Humidity :{" "}
                    {cities &&
                    cities.main &&
                    typeof cities.main.humidity !== "undefined"
                      ? `${cities.main.humidity}%`
                      : "0%"}
                  </div>

                  <div className="text-white text-center">
                    <i className="bi bi-wind"></i> Wind :{" "}
                    {cities &&
                    cities.wind &&
                    typeof cities.wind.speed !== "undefined"
                      ? `${cities.wind.speed.toFixed()} km/h`
                      : "0 km/h"}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-white mx-4">Hourly Forecast</div>
                <div className="d-flex justify-content-center">
                  <hr />
                </div>

                <div className="d-flex justify-content-evenly">
                  {forecast &&
                  Array.isArray(forecast.list) &&
                  forecast.list.length > 0 ? (
                    forecast.list.slice(0, 5).map((item, index) => (
                      <div key={index}>
                        <div className="text-white text-center mx-1">
                          {formatDate(item.dt_txt)}
                        </div>
                        <div className="d-flex justify-content-evenly">
                          <img
                            src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                            alt="weatherIcon"
                          />
                        </div>
                        <div className="text-white text-center">
                          {typeof item.main.temp !== "undefined"
                            ? kelvinToCelsius(item.main.temp).toFixed()
                            : "0"}
                          &deg;
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-white text-center">
                      No forecast data available
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3">
                <div className="text-white mx-4  ">Daily Forecast</div>
                <div className="d-flex justify-content-center">
                  <hr />
                </div>
                <div className="d-flex justify-content-evenly">
                  {forecast &&
                  Array.isArray(forecast.list) &&
                  forecast.list.length > 0 ? (
                    forecast.list
                      .filter((item, index) => index % 8 === 0)
                      .map((item, index) => (
                        <div key={index}>
                          <div id="dayName" className="text-white text-center">
                            {formatDayName(item.dt_txt)}
                          </div>
                          <div className="d-flex justify-content-evenly">
                            <img
                              src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                              alt="weatherIcon"
                              
                            />
                          </div>
                          <div className="text-white text-center">
                            {typeof item.main.temp !== "undefined"
                              ? kelvinToCelsius(item.main.temp).toFixed()
                              : "0"}
                            &deg;
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-white text-center">
                      No forecast data available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <p className="colHead p-3">Air Quality Info:</p>
            <div id="pollCard" className=" m-3 p-4">
              <div className=" d-flex justify-content-center">
                <p
                  id="pollCard"
                  style={{ color: textColor, transition: "color 10s ease" }}
                  className="pollNum"
                >
                  {calculateAirPollutionIndex(
                    airPoll &&
                      Array.isArray(airPoll) &&
                      typeof airPoll.components !== "undefined" &&
                      airPoll.components.length > 0
                      ? airPoll.components
                      : 0
                  )}
                </p>
              </div>
              <div className="d-flex justify-content-center mx-3">
                <div className="poll">{t(poll)}</div>

                <img className="stateImg" src={img} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
