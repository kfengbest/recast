// When debugging the Jest client side tests using VS Code
// there needs to be a virtual DOM in place, which is what `jsdom` does
const { JSDOM } = require('jsdom');

require('./enzymeSetup');

// Polyfill requestAnimationFrame to clear warnings when testing in DOM environment
require('raf/polyfill');

const { window } = new JSDOM('');

global.window = window;
// if property doesn't exist on the global object assign that value from
// the window object that was created
Object.keys(window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});

// Occassionally FormData wasn't part of the keys returned from Object.keys(window)
// Which is why it's getting added manually here
global.FormData = window.FormData;

global.navigator = {
  userAgent: 'node.js',
};
