/**
 * Настройки для подключения к серверу
 */
const token = 'b248be84-0eef-477e-9108-228b62f4c697';
const cohortId = 'cohort-74';

export const apiConfig = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
};
