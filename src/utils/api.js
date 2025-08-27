import { BASE_URL, checkResponse } from "./auth";


function getItems() {
  return fetch(`${BASE_URL}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function deleteItem(id) {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function getUserInfo() {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

const addCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${BASE_URL}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export {
  getItems,
  addItem,
  deleteItem,
  getUserInfo,
  addCardLike,
  removeCardLike,
};
