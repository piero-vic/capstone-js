const getDogsData = async () => {
  const url = 'https://api.thedogapi.com/v1/breeds?page=0&limit=9';
  const response = await fetch(url, {
    headers: { 'x-api-key': process.env.API_KEY },
  });
  return response.json();
};

const getLikes = async () => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.INVOLVEMENT_ID}/likes`;
  const response = await fetch(url);
  return response.json();
};

const postLikes = async (body) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.INVOLVEMENT_ID}/likes`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getComments = async (id) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.INVOLVEMENT_ID}/comments?item_id=${id}`;
  try {
    const commentsResponse = await fetch(url);
    return commentsResponse.json();
  } catch (e) {
    return [];
  }
};

const getReservations = async (id) => {
  const reservationUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.INVOLVEMENT_ID}/reservations?item_id=${id}`;
  try {
    const reservationsResponse = await fetch(reservationUrl);
    return await reservationsResponse.json();
  } catch (e) {
    return [];
  }
};

const submitReservation = async (id, name, dateStart, dateEnd) => {
  fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.INVOLVEMENT_ID}/reservations/`,
    {
      method: 'POST',
      body: JSON.stringify({
        item_id: id,
        username: name,
        date_start: dateStart,
        date_end: dateEnd,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
};

const postComments = async (body) => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.INVOLVEMENT_ID}/comments`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json',
    },
  });
};

export {
  getDogsData, getLikes, getComments, postLikes, postComments, getReservations, submitReservation,
};
