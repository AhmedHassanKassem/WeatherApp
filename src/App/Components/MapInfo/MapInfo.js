import React, { useState, useEffect, useCallback } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { cities } from "../Interfaces/Cities";
import { useTranslation } from "react-i18next";
const MapInfo = (props) => {
  const [cityAQIMap, setCityAQIMap] = useState({});
  const [t] = useTranslation()
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  const fetchWeatherData = useCallback(() => {
    Promise.all(
      cities.map(city => 
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=e8a604118a233d4dfafc5dc3d1964315`)
          .then(response => response.json())
          .then(res => ({ city: city.name, AQI: calculateAirPollutionIndex(res) }))
      )
    ).then(data => {
      const cityAQIMap = {};
      data.forEach(({ city, AQI }) => {
        cityAQIMap[city] = AQI;
      });
      setCityAQIMap(cityAQIMap);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
  }, []);

const calculateAirPollutionIndex = (data) => {
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

    if (data && data.list && data.list.length > 0 && data.list[0].components) {
        const components = data.list[0].components;
        
        for (const [key, value] of Object.entries(components)) {
            if (maxValues[key]) {
                const max = maxValues[key];
                const normalizedValue = (value / max) * 200;
                totalNormalizedPollution += normalizedValue;
                count++;
            }
        }
    }

    if (count > 0) {
        const AQI = totalNormalizedPollution / count;
        return AQI.toFixed();
    } else {
        // Return 0 if no valid pollutant values are found
        console.log("No valid pollutant values found.");
        return 0;
    }
};


  const getMarkerIcon = (AQI) => {
  if (AQI >= 0 && AQI <= 50) {
    return "#109125"; // Green color
  } else if (AQI > 50 && AQI <= 100) {
    return "#F9B220"; // Yellow color
  } else if (AQI > 100 && AQI < 200) {
    return "#FFA500"; // Orange color
  } else if (AQI >= 200) {
    return "#ED0A0B"; // Red color
  } else {
    return "#000000"; // Default color
  }
  };

  return (
    <>
    <div className="d-flex justify-content-center  ">
      <div className="mx-3"><i class="bi bi-square-fill" style={{color : "#109125"}}></i> {t('Good')}</div>
      <div className="mx-3"><i class="bi bi-square-fill" style={{color : "#F9B220"}}></i> {t('Moderate')}</div>
      <div className="mx-3"><i class="bi bi-square-fill" style={{color : "#FFA500"}}></i> {t('Poor')}</div>
      <div><i class="bi bi-square-fill" style={{color : "#ED0A0B"}}></i> {t('Unhealthy')}</div>
    </div>
     <div className="mt-5">
     <Map
        google={props.google}
        zoom={4}
        style={mapStyles}
        initialCenter={{ lat: 0, lng: 0 }}
      >
        {cities.map((city) => (
          <Marker
          key={city.name}
          position={{ lat: city.coords.lat, lng: city.coords.lng }}
          icon={{
            path: props.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            fillColor: getMarkerIcon(cityAQIMap[city.name]),
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 10 // Adjust the scale as needed
          }}
        />
        ))}
      </Map>
     </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAEwmt7_UCFJ8p55J8vi9msPa28_QNmi1I",
})(MapInfo);
