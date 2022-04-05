/* global data */
/* exported data */

var img = document.querySelector('img');
var form = document.querySelector('form');
var userImage = document.querySelector('.photo');
var userTitle = document.querySelector('.user-title');
var userNotes = document.querySelector('.user-notes');

function savingInfo(event) {
  event.preventDefault();
  var store = {};
  store.images = userImage.value;
  store.title = userTitle.value;
  store.notes = userNotes.value;
  store.Id = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(store);
  form.reset();
  img.src = '/images/placeholder-image-square.jpg';
}

function savingPic(event) {
  img.src = userImage.value;
}

userImage.addEventListener('input', savingPic);
form.addEventListener('submit', savingInfo);
