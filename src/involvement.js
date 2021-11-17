const getLikes = async () => {
  const url = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${process.env.INVOLVEMENT_ID}/likes`;
  const response = await fetch(url, {
    headers: { 'x-api-key': process.env.API_KEY },
  });
  return response.json();
};

export default getLikes;
