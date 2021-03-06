'use strict';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/lily';

function bookmarkApiFetch(...args){
  let error;
  return fetch(...args)
    .then(res => {
      if(!res.ok) {
        error = {code: res.status};
      if(!res.headers.get('content-type').includes('json')) {
        error.message = res.statusText
        return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data =>{
      if(error){
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};

//get 
function getBookmarks(){
  return bookmarkApiFetch(`${BASE_URL}/bookmarks`)
};

//post
function createBookmark(title, url, desc, rating){
  const newBookmark = JSON.stringify({
    title,
    url,
    desc,
    rating
  });
  return bookmarkApiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newBookmark
  });
};

//update
function updateBookmark(id, updateData){
  const newData = JSON.stringify(updateData);
  return bookmarkApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: newData
  });
};

//delete
function deleteBookmark(id){
  return bookmarkApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};


export default{
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark
};