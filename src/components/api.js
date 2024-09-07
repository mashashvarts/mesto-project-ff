"use strict";

const cohortId = "wff-cohort-21";
const authorizationToken = "00868a1e-ca26-4726-a888-3ea76b84febf";
const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: authorizationToken,
    "Content-Type": "application/json"
  }
};

export function handleError(err) {
  if (err.status === undefined) {
    console.log('Неизвестная ошибка');
  } else {
    console.log(`Ошибка ${err.status}`);
  }
}

function sendRequest(path, method = "GET", body = null) {
  const params = {
    method: method,
    headers: config.headers
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  return fetch(`${config.baseUrl}/${path}`, params)
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    });
}

export function getProfileData() {
  return sendRequest("users/me");
}

export function getInitialCards() {
  return sendRequest("cards");
}

export function updateProfileInfo(name, about) {
  return sendRequest("users/me", "PATCH", { name: name, about: about });
}

export function createCard(name, link) {
  return sendRequest("cards", "POST", { name: name, link: link });
}

export function deleteCard(id) {
  return sendRequest(`cards/${id}`, 'DELETE');
}

export function setLike(id) {
  return sendRequest(`cards/likes/${id}`, 'PUT');
}

export function unsetLike(id) {
  return sendRequest(`cards/likes/${id}`, 'DELETE');
}

export function updateAvatar(link) {
  return sendRequest('users/me/avatar', 'PATCH', { avatar: link });
}
