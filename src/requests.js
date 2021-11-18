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
  const commentUrl = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.INVOLVEMENT_ID}/comments?item_id=${id}`;
  try {
    const commentsResponse = await fetch(commentUrl);
    return commentsResponse.json();
  } catch (e) {
    return [];
  }
};

export {
  getDogsData, getLikes, getComments, postLikes,
};
