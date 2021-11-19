export default function dogCounter(list) {
  const counter = document.getElementById('dog-counter');
  counter.innerHTML = `Dog Counter (${list.length})`;
}
