/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

function beforeCall(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('Entry Data', dataJSON);
}

window.addEventListener('beforeunload', beforeCall);

var previousDataJSON = localStorage.getItem('Entry Data');
var previousData = JSON.parse(previousDataJSON);
if (previousData !== null) {
  data = previousData;
}
