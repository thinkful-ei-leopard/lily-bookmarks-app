'use strict';

import store from './store.js';
import api from './api.js';

//template functions

function templateLanding(){
  const bookmarks = handleBookmarkList(store.bookmarks);
  return `
  <h1>My Bookmarks</h1>    
    <select>
      <option value="show-by-rating" selected>Show by rating</option>
      <option value="all">All</option>
      <option value="two-stars"> &#9733;	&#9733;  and above</option>
      <option value="three-stars"> &#9733; &#9733; &#9733;  and above</option>
      <option value="four-stars"> &#9733; &#9733; &#9733; &#9733;  and above</option>
      <option value="five-stars"> &#9733; &#9733; &#9733; &#9733; &#9733;  only</option>
    </select>
    ${bookmarks}
    <form class="add-bookmark-form" id="add-start">
     <p>Add a bookmark<button type="submit" id="add-button"> + </button></p>
    </form>
  `;
};

function templateAdd(){

  return `
  <form class="add-bookmark-form">
    <input type="text" name="bookmark-name" value="Name"/>
    <input type="text" name="url" value="Url"/>
    <div class="rating">
      <input type="radio" id="star5" name="rating" value="5" class="radio-btn hide"/><label class="full" for="star5" title="5 stars">&#9733;</label>
      <input type="radio" id="star4" name="rating" value="4" class="radio-btn hide"/><label class="full" for="star4" title="4 stars">&#9733;</label>
      <input type="radio" id="star3" name="rating" value="3" class="radio-btn hide"/><label class="full" for="star3" title="3 stars">&#9733;</label>
      <input type="radio" id="star2" name="rating" value="2" class="radio-btn hide"/><label class="full" for="star2" title="2 stars">&#9733;</label>
      <input type="radio" id="star1" name="rating" value="1" class="radio-btn hide"/><label class="full" for="star1" title="1 star">&#9733;</label>
    </div>
      <input type="text" name="description" value="Bookmark Description"/>
      <button name="cancel"> Cancel </button>
      <input type="submit" value="Submit">
    </form>
  `;
};

function templateSmallBookmark(bookmark){

  return `
  <form class="bookmark-container">
    <p>${bookmark.title}
      <span class="star-rating">&#9733; &#9733; &#9733; &#9733; &#9733;</span>
      <button type="submit" class="edit-button"> &#9998; </button>
    </p>
  </form>
  `;
};

function templateLargeBookmark(){

  return `
  <form class="expanded-container">
    <h2>Sample Bookmark</h2>
    <span class="star-rating"> &#9733; &#9733; &#9733; &#9733; &#9733; </span>
    <h3>Visit:</h3>
    <a href="google.com">Sample Link</a>
    <h3>Description</h3>
    <p>sample description</p>
    <button type="submit" class="delete-button"> &#128465; </button>
    <button type="submit" class="edit-button"> &#9998; </button>
  </form>
  `;
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
  <button name="cancel"> Cancel </button>
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
};

//handlers

// function handleStart(){
//   $(window).on('load', function() {
//     render();
//   })
//};

function handleBookmarkList(bookmarks){
  return bookmarks.map(bookmark => (templateSmallBookmark(bookmark))).join('');
};

function handleAddStart(){
  $('#add-start').submit( event => {
    event.preventDefault;
    store.addMode = true;
    render();
  });
};

function handleAddSubmit(){
  
};

function handleSort(){}
function handleDelete(){}
function handleEdit(){}
function handleExpand(){}



function bindEventListeners() {
  // handleStart,
  handleBookmarkList,
  handleAddStart,
  handleAddSubmit,
  handleSort,
  handleDelete,
  handleEdit,
  handleExpand
};

export default {
  render,
  bindEventListeners
};
