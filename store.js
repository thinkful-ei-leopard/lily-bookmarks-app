'use strict';

const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;
let addMode = false;
let filteredBookmarks = [];

function findById(id) {
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
};

function addBookmark(bookmark) {
  bookmark.expanded = false;
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
  addMode,
  findById,
  addBookmark,
  findAndUpdate,
  findAndDelete,
  handleError
};