'use strict';

import store from './store.js';
import api from './api.js';

//template functions

function templateLanding(){
  const bookmarkList = handleBookmarkList(store.bookmarks);
  return `
  <h1>My Bookmarks</h1>    
    <select id="dropdown">
      <option value="0" selected>Show by rating</option>
      <option value="0">All</option>
      <option value="2"> &#9733;	&#9733;  and above</option>
      <option value="3"> &#9733; &#9733; &#9733;  and above</option>
      <option value="4"> &#9733; &#9733; &#9733; &#9733;  and above</option>
      <option value="5"> &#9733; &#9733; &#9733; &#9733; &#9733;  only</option>
    </select>
    ${bookmarkList}
    <form id="add-start" action="#">
     <p>Add a bookmark<button type="submit" id="add-button"> + </button></p>
    </form>
  `;
};

function templateAdd(){

  return `
  <form class="add-bookmark-form">
    <input type="text" name="bookmark-name" value="Name"/>
    <input type="text" name="url" value="https://www."/>
    <div class="rating">
      <input type="radio" id="star5" name="rating" value="5" class="radio-btn hide"/><label class="full" for="star5" title="5 stars">&#9733;</label>
      <input type="radio" id="star4" name="rating" value="4" class="radio-btn hide"/><label class="full" for="star4" title="4 stars">&#9733;</label>
      <input type="radio" id="star3" name="rating" value="3" class="radio-btn hide"/><label class="full" for="star3" title="3 stars">&#9733;</label>
      <input type="radio" id="star2" name="rating" value="2" class="radio-btn hide"/><label class="full" for="star2" title="2 stars">&#9733;</label>
      <input type="radio" id="star1" name="rating" value="1" class="radio-btn hide"/><label class="full" for="star1" title="1 star">&#9733;</label>
    </div>
      <input type="text" name="description" value="Bookmark Description"/>
      <button name="cancel-add"> Cancel </button>
      <input type="submit" id="add-submit" value="Submit">
    </form>
  `;
};

function templateBookmark(bookmark){
 const stars = translateRating(bookmark.rating);
  if(bookmark.expanded === false) {
    return `
  <form class="bookmark-container" data-id="${bookmark.id}">
  <div class="bookmark-thumbnail">  
    <p>${bookmark.title}
      <span class="star-rating">${stars}</span>
      <button type="submit" class="edit-button"> &#9998; </button>
    </p>
  </div>
  </form>
  `;
 }
  else if(bookmark.expanded === true) {
    return `
  <form class="expanded-container" data-id="${bookmark.id}">
    <h2>${bookmark.title}</h2>
    <span class="star-rating"> ${stars} </span>
    <h3>Visit:</h3>
    <a href=${bookmark.url}>${bookmark.url}</a>
    <h3>Description</h3>
    <p>${bookmark.desc}</p>
    <button type="submit" class="delete-button"> &#128465; </button>
    <button type="button" name="cancel-expand" > Cancel </button>
  </form>
  `;
  }
};


function templateEdit(){ 

return `
<form class="edit-bookmark-form">
  <input type="text" name="bookmark-name" value="Name"/>
  <input type="text" name="url" value="Url"/>
  <div class="rating">
    <input type="radio" id="star5" name="rating" value="5" class="radio-btn hide"/><label class="full" for="star5" title="5 stars">&#9733;</label>
    <input type="radio" id="star4" name="rating" value="4" class="radio-btn hide"/><label class="full" for="star4" title="4 stars">&#9733;</label>
    <input type="radio" id="star3" name="rating" value="3" class="radio-btn hide"/><label class="full" for="star3" title="3 stars">&#9733;</label>
    <input type="radio" id="star2" name="rating" value="2" class="radio-btn hide"/><label class="full" for="star2" title="2 stars">&#9733;</label>
    <input type="radio" id="star1" name="rating" value="1" class="radio-btn hide"/><label class="full" for="star1" title="1 stars">&#9733;</label>
  </div>
  <input type="text" name="description" value="Bookmark Description"/>
  <button type="button" name="cancel"> Cancel </button>
  <input type="submit" value="Submit">
`;
};

//renders 

function render() {
  //renderError();
  $('main').html(templateLanding());
  if(store.addMode === true){
    $('main').append(templateAdd());
  }
  let bookmarks = [...store.bookmarks];
  if(store.filter > 0) {
    bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  }
};

//handlers

function handleBookmarkList(bookmarks){
  return bookmarks.map(bookmark => (templateBookmark(bookmark))).join('');
};

function handleAddStart(){
  $('main').on('submit', '#add-start', event => {
    console.log('add start');
    event.preventDefault();
    store.addMode = true;
    render();
  });
};

function handleAddSubmit(){
  $('main').on('submit', '.add-bookmark-form', event => {
    console.log('handleAddSubmit is running');
    event.preventDefault();
    const newBookmarkName = $('input[type="text"][name="bookmark-name"]').val();
    const newBookmarkUrl = $('input[type="text"][name="url"]').val();
    const newBookmarkRating = $('input[type="radio"]:checked').val();
    const newBookmarkDescr = $('input[type="text"][name="description"').val();
    api.createBookmark(newBookmarkName, newBookmarkUrl, newBookmarkDescr, newBookmarkRating)
     .then((newBookmark) => {
       store.addBookmark(newBookmark);
       store.addMode = false;
       render();
     })
     .catch((error) => {
       store.handleError(error.message);
       console.error(error.message);
       //renderError();
     })
  });
};


function handleExpand(){
  $('main').on('click', '.bookmark-container', event => {
    const id = findBookmarkIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    bookmark.expanded = !bookmark.expanded;
    render();
  });
};

function handleDelete(){
  $('main').on('click', '.delete-button', event => {
    console.log('handleDelete is running');
    event.preventDefault();
    const id = findBookmarkIdFromElement(event.currentTarget);
    api.deleteBookmark(id)
      .then(()=> {
        store.findAndDelete(id);
        render();
      })
  });
};

function handleFilter(){
  $('main').on('change', '#dropdown', event => {
    console.log('handle changed');
    event.preventDefault();
    let filter = $('option').val();
    store.filter = filter;
    render();
  });
};

function handleCancelExpand(){
  $('main').on('click', 'button[name="cancel-expand"]', event => {
    event.preventDefault();
    const id = findBookmarkIdFromElement(event.currentTarget);
    const bookmark = store.findById(id);
    if(bookmark.expanded === true){
      bookmark.expanded = false;
    }
      render();
  });
};

function handleCancelAdd(){
  $('main').on('click', 'button[name="cancel-add"]', event => {
    event.preventDefault();
    store.addMode = false;
    render();
  });
};

function handleEdit(){}

function translateRating(rating){
  if(rating === 1) {
    return `&#9733;`;
  }
  else if(rating === 2) {
    return `&#9733; &#9733;`;
  }
  else if(rating === 3) {
    return `&#9733; &#9733; &#9733;`;
  }
  else if(rating  === 4) {
    return `&#9733; &#9733; &#9733; &#9733;`;
  }
  else if(rating === 5) {
    return `&#9733; &#9733; &#9733; &#9733; &#9733;`;
  }
  else{
    return '';
  }
};

function findBookmarkIdFromElement(bookmark) {
  return $(bookmark)
    .closest('form')
    .data('id')
};


function bindEventListeners() {
  // handleStart();
  handleAddStart();
  handleAddSubmit();
  handleFilter();
  handleDelete();
  handleEdit();
  handleExpand();
  handleCancelExpand();
  handleCancelAdd();
};

export default {
  render,
  bindEventListeners
};
