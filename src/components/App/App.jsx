import { useEffect, useState } from "react";

import "./App.css";
import { cordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const cardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const addBtnClick = () => {
    setActiveModal("add-garment");
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setClothingItems([{ name, link: imageUrl, weather, }, ...clothingItems]);
    closeModal();
  };

  useEffect(() => {
    getWeatherData(cordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
        setIsWeatherDataLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsWeatherDataLoaded(false);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <div className="app__content">
          <Header
            addBtnClick={addBtnClick}
            weatherData={weatherData}
            isWeatherDataLoaded={isWeatherDataLoaded}
          />
          <Main
            weatherData={weatherData}
            cardClick={cardClick}
            isWeatherDataLoaded={isWeatherDataLoaded}
            clothingItems={clothingItems}
          />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          onClose={closeModal}
          card={selectedCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
