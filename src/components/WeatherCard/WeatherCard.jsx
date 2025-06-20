import "./WeatherCard.css";
import sunny from "../../assets/Sunny.png";
import { getWeatherData } from "../../utils/weatherApi";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F </p>
      <img src={sunny} alt="sunny" className="weather-card__img" />
    </section>
  );
}

export default WeatherCard;
