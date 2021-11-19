export default function commentsCounter(list) {
  const commentsCounter = document.getElementById('comments-counter');
  commentsCounter.innerHTML = `(${list.length})`;
}