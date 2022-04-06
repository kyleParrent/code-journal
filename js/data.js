/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('Entry Data');
if (previousDataJSON !== null) {
  var previousData = JSON.parse(previousDataJSON);
  data = previousData;
}

function beforeCall(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('Entry Data', dataJSON);
}

window.addEventListener('beforeunload', beforeCall);
