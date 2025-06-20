import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import Footer from "../Footer/Footer";
import { defaultClothingItems } from "../../utils/constants";
import "./Main.css";

function Main({ weatherData, cardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="card__text">
          Today is {weatherData.temp.F} &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard key={item._id} item={item} onCardClick={cardClick} />
              );
            })}
        </ul>
      </section>
      <Footer />
    </main>
  );
}

export default Main;
