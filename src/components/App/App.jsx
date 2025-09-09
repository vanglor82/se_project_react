import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { filterWeatherData, getWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import * as auth from "../../utils/auth";
import DeleteModal from "../DeleteModal/DeleteModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleCardPreview = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItem = () => {
    setActiveModal("add-garment");
  };

  const handleLogin = () => {
    setActiveModal("login");
  };

  const handleRegister = () => {
    setActiveModal("register");
  };

  const handleDelete = () => {
    setActiveModal("delete");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("jwt");
  };

  const handleEditProfile = () => {
    setActiveModal("edit");
  };

  const closeModals = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [
          newItem.data || newItem,
          ...prevItems,
        ]);
        closeModals();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleLoginSubmit = ({ email, password }) => {
    auth
      .signin({ email, password })
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          return auth.checkToken(res.token);
        }
        return Promise.reject(new Error("No token received from server"));
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData.data || userData);
        closeModals();
        navigate("/profile");
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleRegisterSubmit = ({ name, avatar, email, password }) => {
    auth
      .signup({ name, avatar, email, password })
      .then(() => {
        handleLoginSubmit({ email, password });
      })
      .catch(console.error);
  };

  const handleDeleteItemSubmit = (id) => {
    const token = localStorage.getItem("jwt");
    deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeModals();
      })
      .catch((err) => {
        console.error("Failed to delete item:", err);
      });
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    auth
      .editProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser.data || updatedUser);
        closeModals();
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const apiCall = isLiked
      ? removeCardLike(id, token)
      : addCardLike(id, token);

    apiCall
      .then((updatedCard) => {
        const card = updatedCard.data || updatedCard;
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? card : item))
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
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

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          const user = res?.data || res;
          if (user && user.id) {
            setIsLoggedIn(true);
            setCurrentUser(user);
          }
        })
        .catch((err) => {
          console.error("Token check failed:", err);
        });
    }
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeModals();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <div className="app__content">
            <Header
              onClick={handleAddItem}
              weatherData={weatherData}
              isWeatherDataLoaded={isWeatherDataLoaded}
              isLoggedIn={isLoggedIn}
              onLoginClick={handleLogin}
              onRegisterClick={handleRegister}
              onLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardPreview}
                    isWeatherDataLoaded={isWeatherDataLoaded}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardPreview}
                      clothingItems={clothingItems}
                      onClick={handleAddItem}
                      onDeleteClick={handleDelete}
                      isLoggedIn={isLoggedIn}
                      onLogout={handleLogout}
                      onEditProfile={handleEditProfile}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeModals}
            onAddItem={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            onClose={closeModals}
            card={selectedCard}
            onDelete={handleDelete}
          />
          <DeleteModal
            activeModal={activeModal === "delete"}
            onClose={closeModals}
            onDelete={handleDeleteItemSubmit}
            selectedCard={selectedCard}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeModals}
            onLogin={handleLoginSubmit}
            onRegisterClick={handleRegister}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeModals}
            onRegister={handleRegisterSubmit}
            onLoginClick={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            onClose={closeModals}
            onEditProfile={handleEditProfileSubmit}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
