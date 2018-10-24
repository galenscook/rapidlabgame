let timer;
let totalMilliseconds = 0;
document.addEventListener(
  'DOMContentLoaded',
  function() {
    const tagInput = document.getElementById('tagInput');
    const startButton = document.querySelector('button[name="startButton"]');

    tagInput && tagInput.addEventListener('keypress', tagInputHandler);
    startButton && startButton.addEventListener('click', startGame);
  },
  false
);

function startGame() {
  window.location.pathname = 'participants/new';
}
function tagInputHandler(event) {
  if (event.target.value.length === 5) {
    const listDiv = document.querySelector('ul[name="tagsList"]');
    if (listDiv.childElementCount === 0) {
      timer = setInterval(setTimer, 1);
    }
    listDiv.appendChild(newTagListItem(event.target.value));
    if (listDiv.childElementCount === 5) {
      clearInterval(timer);
      handleGameDone(listDiv.id, totalMilliseconds / 1000);
    }
    this.value = '';
  }
}

function newTagListItem(value) {
  const listElement = document.createElement('li');
  const text = document.createTextNode(value);
  listElement.appendChild(text);
  return listElement;
}

function setTimer() {
  totalMilliseconds++;
}

function recordTime(userId, time) {
  $.ajax({
    url: `/participants/${userId}`,
    method: 'patch',
    data: { time: time }
  }).done(response => {
    response = JSON.parse(response);
    const scoreDisplay = document.getElementById('scoreDisplay');
    const rankDisplay = document.getElementById('rankDisplay');
    scoreDisplay.appendChild(
      document.createTextNode(`Your time: ${time} seconds!`)
    );
    rankDisplay.appendChild(
      document.createTextNode(`${formatNumber(response.rank)} place`)
    );
  });
}

function handleGameDone(userId, time) {
  recordTime(userId, time);
  document.getElementById('tagInput').disabled = true;
  // const scoreInSeconds = time;

  // const scoreDisplay = document.getElementById('scoreDisplay');
  // scoreDisplay.appendChild(
  //   document.createTextNode(`Your time: ${scoreInSeconds} seconds!`)
  // );
  timer = setInterval(redirectHome, 5000);
  totalMilliseconds = null;
}

function redirectHome() {
  window.location.pathname = 'participants';
  clearInterval(timer);
  timer = null;
}

function formatNumber(number) {
  var j = number % 10,
    k = number % 100;
  if (j == 1 && k != 11) {
    return number + 'st';
  }
  if (j == 2 && k != 12) {
    return number + 'nd';
  }
  if (j == 3 && k != 13) {
    return number + 'rd';
  }
  return number + 'th';
}
