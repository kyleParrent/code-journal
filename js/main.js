/* global data */
/* exported data */

var img = document.querySelector('img');
var userImage = document.querySelector('.photo');
var userTitle = document.querySelector('.user-title');
var userNotes = document.querySelector('.user-notes');
var saveB = document.querySelector('.save');

function savingPic(event) {
  img.src = userImage.value;
}

function savingInfo(event) {
  var store = {};
  store.images = userImage.value;
  store.title = userTitle.value;
  store.notes = userNotes.value;
  store.Id = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(store);
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascipt-local-storage', dataJSON);
}

window.addEventListener('beforeunload', savingInfo);
userImage.addEventListener('input', savingPic);
saveB.addEventListener('submit', savingInfo);
