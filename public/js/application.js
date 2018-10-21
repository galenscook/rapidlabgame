let timer;
let totalMilliseconds = 0;
document.addEventListener(
  "DOMContentLoaded",
  function() {
    const tagInput = document.querySelector('input[name="tagInput"]');
    const startButton = document.querySelector('button[name="startButton"]');

    tagInput && tagInput.addEventListener("input", tagInputHandler);
    startButton && startButton.addEventListener("click", startGame);
  },
  false
);

function startGame() {
  window.location.pathname = "participants/new";
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
    console.log(totalMilliseconds);
    this.value = "";
  }
}

function newTagListItem(value) {
  const listElement = document.createElement("li");
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
    method: "patch",
    data: { time: time }
  });
}

function handleGameDone(userId, time) {
  recordTime(userId, time);
  document.querySelector('input[name="tagInput"]').disabled = true;
  const scoreInSeconds = time;

  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.appendChild(
    document.createTextNode(`Your time: ${scoreInSeconds} seconds!`)
  );
  timer = setInterval(redirectHome, 5000);
  totalMilliseconds = null;
}

function redirectHome() {
  window.location.pathname = "participants";
  clearInterval(timer);
  timer = null;
}
