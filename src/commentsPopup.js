import { fetchComments, postComments } from './commentApiHandler.js';

export const KEY_PREFIX = 'breedsInfo';

// const commentsButton = document.getElementById(`comments-button-${dog.id}`);

// const getComments = async () => {
//   const url = 'https://api.thedogapi.com/v1/breeds?page=0&limit=9';
//   const response = await fetch(url, {
//     headers: { 'x-api-key': process.env.API_KEY },
//   });
//   return response.json();
// };

// getComments().then((list) => {
//   list.forEach((dog) => commentsButton(dog));
// });
// export default getComments;

const displayComment = (container, comment) => {
  const commentDisplay = document.createElement('li');
  commentDisplay.innerHTML = `
    <span class="comment-date">${comment.creation_date}</span>
    <span class="commenter">${comment.username}:</span>
    <span class="comment-content">${comment.comment}</span>
`;
  container.appendChild(commentDisplay);
};

const displayCommentCounter = (container, comments) => {
  const counterDisplay = container.querySelector('#comments-counter');
  counterDisplay.innerHTML = `(${comments.length})`;
};

export const displayComments = async (breedId, popup) => {
  let comments = await fetchComments(breedId);
  const commentsContainer = popup.querySelector('#comments-list');
  commentsContainer.innerHTML = '';
  if (comments.error) comments = [];
  displayCommentCounter(popup, comments);
  Array.from(comments)
    .forEach((comment) => { displayComment(commentsContainer, comment); });
};

export const postCommentsListener = (breedId, commentButton, popup) => (event) => {
  event.preventDefault();
  const username = popup.querySelector('#new-comment-name');
  const content = popup.querySelector('#new-comment-content');
  postComments(breedId, username.value, content.value)
    .then(() => {
      username.value = '';
      content.value = '';
      displayComments(breedId, popup);
    });
};
