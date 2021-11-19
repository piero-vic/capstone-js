import reservationCounter from '../src/reservationCounter.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><p id="reservation-counter">()</p>');
global.document = dom.window.document;

test('Should display the number of reservations made', () => {
  const mockList = [1, 2];
  const counter = document.getElementById('reservation-counter');
  reservationCounter(mockList);
  expect(counter.innerHTML).toBe('(2)');
});