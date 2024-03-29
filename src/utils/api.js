import { apiConfig } from "./apiConfig";

class Api {
  /**
   * Отвечает за осуществление и обработку сетевых запросов к серверу
   * @constructor
   *
   * @param {object} Конфиг запросов к серверу:
   * - baseUrl - Базовая часть url-адреса сервера
   * - headers - Заголовки запроса, будут передаваться при каждом обращении
   */
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Ошибка ${res.status}`);

  }

  /**
   * Получает данные текущего пользователя
   * @returns {Promise} Промис с ответом сервера: объект текущего пользователя
   */
  getUserInfo() {
    const url = `${this._baseUrl}/users/me`;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  /**
   * Устанавливает новые имя и профессию текущего пользователя
   * @param {object} Объект с обновляемыми параметрами:
   * - name - имя пользователя
   * - job - профессия пользователя
   * @returns {Promise} Промис с ответом сервера: обновленный объект пользователя
   */
  setUserInfo({name, about}) {
    const url = `${this._baseUrl}/users/me`;
    console.log({name, about})
    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(this._checkResponse);
  }

  /**
   * Устанавливает новый аватар пользователя
   * @param {string} link - Ссылка на картинку
   * @returns {Promise} Промис с ответом сервера: обновленный объект пользователя
   */
  changeAvatar(link) {
    const url = `${this._baseUrl}/users/me/avatar`;

    return fetch(url, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(this._checkResponse);
  }

  /**
   * Получает исходные карточки для отрисовки
   * @returns {Promise} Промис с ответом сервера: массив карточек
   */
  getInitialCards() {
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: 'GET',
      headers: this._headers,
    })
    .then(this._checkResponse);
  }

  /**
   * Добавляет новую карточку
   * @param {object} Параметры добавляемой карточки:
   * - name - отображаемое имя
   * - link - ссылка на добавляемую картинку
   * @returns {Promise} Промис с ответом сервера: объект созданной карточки
   */
  addNewCard({name, link}) {
    const url = `${this._baseUrl}/cards`;

    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse);
  }

  /**
   * Удаляет карточку с сервера
   * @param {string} cardId - ID карточки
   * @returns {Promise} Промис с ответом сервера
   */
  deleteCard(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  /**
   * Ставит лайк на карточку
   * @param {string} cardId - ID карточки
   * @returns {Promise} Промис с массивом новых лайков карточки
   */
  _setLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  /**
   * Удаляет лайк с карточки
   * @param {string} cardId - ID карточки
   * @returns {Promise} Промис с массивом новых лайков карточки
   */
  _deleteLike(cardId) {
    const url = `${this._baseUrl}/cards/${cardId}/likes`;

    return fetch(url, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  /**
   * Переключает лайк карточки
   * @param {string} cardId - ID карточки
   * @param {boolean} isLiked - Текущий статус лайка
   * @returns {Promise} Промис с массивом новых лайков карточки
   */
  toggleLike(cardId, isLiked) {
    if (isLiked) {
      return this._deleteLike(cardId);
    } else {
      return this._setLike(cardId);
    }
  }
}

const api = new Api(apiConfig);

export default api;
