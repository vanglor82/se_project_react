import { baseUrl, checkResponse } from "./auth";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function addItem({ name, imageUrl, weather }) {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/items`, {
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
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function getUserInfo() {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function processResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processResponse);
};

export {
  getItems,
  addItem,
  deleteItem,
  getUserInfo,
  addCardLike,
  removeCardLike,
};
