import dogCounter from '../src/dogCounter.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><p id="dog-counter">Dog Counter ()</p>');
global.document = dom.window.document;

test('Should update counter', () => {
  const mockList = [1, 2, 3, 4];
  const counterElement = document.getElementById('dog-counter');
  dogCounter(mockList);
  expect(counterElement.innerHTML).toBe('Dog Counter (4)');
});
