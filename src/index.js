import api from './api.js';
import store from './store.js';
import main from './main.js';

function mainFunc() {
  api.getBookmarks()
    .then((bookmark) => {
      bookmark.forEach((bookmark) => store.addBookmark(bookmark));
      main.render();
    });
  main.bindEventListeners();
  main.render();
};

$(mainFunc);