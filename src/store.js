'use strict';

const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

function findById(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

function addBookmark(bookmark) {
  this.bookmarks.push(bookmark);
};

function findAndUpdate(id, newData) {
  const currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);
};

function findAndDelete(id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
};

function handleError(error) {
  this.error = error;
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark,
  findAndUpdate,
  findAndDelete,
  handleError
};