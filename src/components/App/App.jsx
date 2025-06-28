import { useEffect, useState } from "react";

import "./App.css";
import { cordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

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
          />
        </div>
        <ModalWithForm
          isOpen={activeModal === "add-garment"}
          titleText="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          closeModal={closeModal}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
              required
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
              required
            />
          </label>
          <fieldset className="modal__radio-btns">
            <legend className="modal__radio-title">
              Select the weather type:
            </legend>
            <label className="modal__radio-label" htmlFor="hot">
              <input
                type="radio"
                id="hot"
                name="temperature"
                value="hot"
                className="modal__radio-input"
              />
              Hot
            </label>
            <label className="modal__radio-label" htmlFor="warm">
              <input
                type="radio"
                id="warm"
                name="temperature"
                value="warm"
                className="modal__radio-input"
              />
              Warm
            </label>
            <label className="modal__radio-label" htmlFor="cold">
              <input
                type="radio"
                id="cold"
                name="temperature"
                value="cold"
                className="modal__radio-input"
              />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          closeModal={closeModal}
          card={selectedCard}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
