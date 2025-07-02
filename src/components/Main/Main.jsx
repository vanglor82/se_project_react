import { useContext } from "react";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";


function Main({ weatherData, onCardClick, isWeatherDataLoaded, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
      <main>
        <WeatherCard
          weatherData={weatherData}
          isWeatherDataLoaded={isWeatherDataLoaded}
        />
        <section className="cards">
          {isWeatherDataLoaded ? (
            <p className="card__text">
              Today is{" "}
              <span
                className={`temp ${
                  currentTemperatureUnit === "F" ? "temp-f" : "temp-c"
                }`}
              >
                {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
                {currentTemperatureUnit}
              </span>{" "}
              / You may want to wear:
            </p>
          ) : (
            <p className="card__text">Loading weather data...</p>
          )}
          <ul className="cards__list">
            {clothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={onCardClick}
                  />
                );
              })}
          </ul>
        </section>
      </main> 
  );
}

export default Main;
