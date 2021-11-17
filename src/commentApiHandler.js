/* eslint-disable no-unused-vars */
export const BASE_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const API_KEY = '79fce215-15ef-4e33-b377-68e218319a6b';
const URL = `${BASE_URL}/apps/${API_KEY}/comments`;
const headers = {
  'Content-type': 'application/json; charset=UTF-8',
};

export const fetchComments = async (dogId) => {
  const query = `?item_id=${dogId.toString()}`;
  let allComments = await fetch(`${BASE_URL}${query}`);
  allComments = await allComments.json();
  return allComments;
};

export const postComments = (dogId, username, comment) => {
  const body = JSON.stringify({
    item_id: dogId,
    username,
    comment,
  });
  return fetch(BASE_URL, {
    method: 'POST',
    body,
    headers,
  });
};
