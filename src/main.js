'use strict';

import store from './store';
import api from './api';

//template functions

function templateLanding(){

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
    <form class="add-bookmark-form">
     <p>Add a bookmark<button type="submit"> + </button></p>
    </form>
  `;
};

function templateAdd(){

  return `
  <select>
      <option value="show-by-rating" selected>Show by rating</option>
      <option value="all">All</option>
      <option value="two-stars"> &#9733;	&#9733;  and above</option>
      <option value="three-stars"> &#9733; &#9733; &#9733;  and above</option>
      <option value="four-stars"> &#9733; &#9733; &#9733; &#9733;  and above</option>
      <option value="five-stars"> &#9733; &#9733; &#9733; &#9733; &#9733;  only</option>
  </select>
  <form class="add-bookmark-form">
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
    </form>
  `;
};

function templateSmallBookmark(){

  return `
  <form class="bookmark-container">
    <p>Sample bookmark
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
  console.log('render is running');
  $('main').html(templateLanding());
};

//listeners

function handleStart(){
  $(window).on('load', function() {
    render();
  })
};
function handleAdd(){}
function handleSort(){}
function handleDelete(){}
function handleEdit(){}
function handleExpand(){}



function bindEventListeners() {
  handleStart,
  handleAdd,
  handleSort,
  handleDelete,
  handleEdit,
  handleExpand
};

export default {
  render,
  bindEventListeners
};
