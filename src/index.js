import api from './api';
import store from './store';
import main from './main';

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