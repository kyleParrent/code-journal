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

var theUL = document.querySelector('ul');

function journalEntry(entry) {
  var list = document.createElement('li');
  var row = document.createElement('div');
  row.className = 'row';
  list.appendChild(row);
  var col = document.createElement('div');
  col.className = 'column-half entry';
  row.appendChild(col);
  var image = document.createElement('img');
  var userImg = document.createTextNode(entry.images);
  image.appendChild(userImg);
  col.appendChild(image);
  var col2 = document.createElement('div');
  col2.className = 'column-half';
  row.appendChild(col2);
  var header = document.createElement('h2');
  var userName = document.createTextNode(entry.title);
  header.appendChild(userName);
  col2.appendChild(header);
  var para = document.createElement('p');
  var userNotes = document.createTextNode(entry.notes);
  para.appendChild(userNotes);
  col2.appendChild(para);
  return list;
}

function domLoad(event) {
  for (var i = 0; i < data.entries; i++) {
    theUL.appendChild(journalEntry(data.entries[i]));
  }
}

window.addEventListener('DOMContentLoaded', domLoad);
