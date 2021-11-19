import commentsCounter from '../src/commentCounter.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><p id="comments-counter">Comment Counter ()</p>');
global.document = dom.window.document;

test('Should count the length of the comment list', () => {
  const commentMock = [1, 2, 3, 4, 5, 6, 7];
  const counter = document.getElementById('comments-counter');
  commentsCounter(commentMock);
  expect(counter.innerHTML).toBe('(7)');
});