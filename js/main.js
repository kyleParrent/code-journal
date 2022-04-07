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
  var liList = document.querySelectorAll('li');
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].id === data.editing.id) {
        data.entries[i].images = userImage.value;
        data.entries[i].title = userTitle.value;
        data.entries[i].notes = userNotes.value;
        data.editing = null;
        var editedEntry = data.entries[i];
        break;
      }
    }
    var newEntryLi = journalEntry(editedEntry);
    for (var ii = 0; ii < liList.length; ii++) {
      var listEntryJSON = liList[ii].getAttribute('data-entry-id');
      var listEntry = JSON.parse(listEntryJSON);
      if (listEntry === editedEntry.id) {
        liList[ii].replaceWith(newEntryLi);
        form.reset();
        viewSwitch('entries');
      }
    }
  } else {
    store.images = userImage.value;
    store.title = userTitle.value;
    store.notes = userNotes.value;
    store.id = data.nextEntryId;
    data.nextEntryId++;
    data.entries.push(store);
    form.reset();
    img.src = '/images/placeholder-image-square.jpg';
    viewSwitch('entries');
    theUL.prepend(journalEntry(store));
  }
}

function savingPic(event) {
  img.src = userImage.value;
}

userImage.addEventListener('input', savingPic);
form.addEventListener('submit', savingInfo);

var theUL = document.querySelector('ul');

function journalEntry(entry) {
  var list = document.createElement('li');
  list.setAttribute('data-entry-id', entry.id);
  var row = document.createElement('div');
  row.className = 'row';
  list.appendChild(row);
  var col = document.createElement('div');
  col.className = 'column-half entry';
  row.appendChild(col);
  var image = document.createElement('img');
  image.setAttribute('src', entry.images);
  col.appendChild(image);
  var col2 = document.createElement('div');
  col2.className = 'column-half entries';
  row.appendChild(col2);
  var header = document.createElement('h2');
  header.className = 'inline';
  var userName = document.createTextNode(entry.title);
  header.appendChild(userName);
  col2.appendChild(header);
  var editSign = document.createElement('i');
  editSign.className = 'fas fa-pen icon';
  col2.appendChild(editSign);
  var para = document.createElement('p');
  var userNotes = document.createTextNode(entry.notes);
  para.appendChild(userNotes);
  col2.appendChild(para);
  return list;
}

function domLoad(event) {
  for (var i = 0; i < data.entries.length; i++) {
    theUL.prepend(journalEntry(data.entries[i]));
    viewSwitch(data.view);
  }
}

window.addEventListener('DOMContentLoaded', domLoad);

var button = document.querySelector('.to-new-entry');
var nav = document.querySelector('.to-entries');
var views = document.querySelectorAll('.view');

function viewSwitch(view) {
  for (var i = 0; i < views.length; i++) {
    if (views[i].getAttribute('data-view') === view) {
      views[i].className = 'view';
    } else {
      views[i].className = 'view hidden';
    }
  }
  data.view = view;
}

function viewEvent(event) {
  var targetDV = event.target.getAttribute('data-view');
  viewSwitch(targetDV);
}

button.addEventListener('click', viewEvent);
nav.addEventListener('click', viewEvent);

theUL.addEventListener('click', function (event) {
  if (event.target.matches('.icon')) {
    viewSwitch('entry-form');
    var parentLi = event.target.closest('li');
    var parentIdJSON = parentLi.getAttribute('data-entry-id');
    var parentId = JSON.parse(parentIdJSON);
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].id === parentId) {
        data.editing = data.entries[i];
        userNotes.value = data.editing.notes;
        userImage.value = data.editing.images;
        userTitle.value = data.editing.title;
      }
    }
  }
});
