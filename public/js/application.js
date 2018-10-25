let startTime;
let endTime;
let totalMilliseconds = 0;
document.addEventListener(
  'DOMContentLoaded',
  function() {
    const tagInput = document.getElementById('tagInput');
    const startButton = document.querySelector('button[name="startButton"]');
    const countdown = document.getElementById('countdown');

    countdown && startCountdown();
    tagInput && tagInput.addEventListener('keyup', tagInputHandler);
    startButton && startButton.addEventListener('click', startGame);

    document.addEventListener('click', e => {
      if (e.target && e.target.id === 'replay') {
        location.reload();
      }
    });
  },
  false
);

function startGame() {
  window.location.pathname = 'participants/new';
}
function tagInputHandler(event) {
  if (event.target.value.length === 6) {
    document.getElementById('countdown').style.display = 'none';

    const listDiv = document.querySelector('ul[name="tagsList"]');
    listDiv.appendChild(newTagListItem(event.target.value));
    if (listDiv.childElementCount === 5) {
      endTime = Date.now();
      totalMilliseconds = endTime - startTime;

      handleGameDone(listDiv.id, totalMilliseconds / 1000);
    }
    this.value = '';
  }
}

function newTagListItem(value) {
  const listElement = document.createElement('li');
  listElement.innerHTML =
    '<p><span class="tagCode">' +
    value +
    "</span><img class='tagImg' src='/assets/" +
    identifyColor(value) +
    ".png'></p>";
  return listElement;
}

function recordTime(userId, time) {
  $.ajax({
    url: `/participants/${userId}`,
    method: 'patch',
    data: { time: time }
  }).done(response => {
    response = JSON.parse(response);
    document.getElementsByClassName('scoreFinal')[0].innerHTML = scoreDisplay(
      time,
      response.rank
    );
  });
}

function scoreDisplay(time, rank) {
  return (
    '<div><h1>Your time: ' +
    time +
    ' seconds!</h1><h1>' +
    formatNumber(rank) +
    ' place</h1><button class="btn btn-lg btn-primary" id="replay">Try again?</button></div>'
  );
}

function handleGameDone(userId, time) {
  recordTime(userId, time);
  document.getElementById('tagInput').disabled = true;
  setTimeout(redirectHome, 10000);
  startTime = 0;
  totalMilliseconds = 0;
  endTime = 0;
}

function redirectHome() {
  window.location.pathname = 'participants';
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

function startCountdown() {
  let seconds = 4;
  const timer = setInterval(() => {
    seconds--;
    const text = seconds === 0 ? 'GO' : seconds;
    document.getElementById('countdown').innerHTML = text;

    if (seconds === 0) {
      clearInterval(timer);
      startTime = Date.now();
    }
  }, 1000);
}

function identifyColor(code) {
  array = code.toLowerCase().split('');
  if (array[0] < 'g') {
    if (array[0] !== 'f') {
      return 'yellow';
    }
    if (array[0] < 'g') {
      if (array[1] !== 'f') {
        return 'yellow';
      }

      if (array[2] <= 1) {
        return 'yellow';
      } else {
        return 'white';
      }
    }
  } else if (array[0] < 'j') {
    if (array[0] !== 'k') {
      return 'white';
    }
    if (array[0] < 'j') {
      if (array[1] !== 'k') {
        return 'white';
      }

      if (array[2] <= 3) {
        return 'white';
      } else {
        return 'red';
      }
    }
  } else if (array[0] < 'q') {
    if (array[0] !== 'p') {
      return 'red';
    }
    if (array[0] < 'q') {
      if (array[1] !== 'p') {
        return 'red';
      }

      if (array[2] <= 5) {
        return 'red';
      } else {
        return 'blue';
      }
    }
  } else if (array[0] < 'v') {
    if (array[0] !== 'u') {
      return 'blue';
    }
    if (array[0] < 'v') {
      if (array[1] !== 'u') {
        return 'blue';
      }

      if (array[2] <= 7) {
        return 'blue';
      } else {
        return 'green';
      }
    }
  } else {
    return 'green';
  }
}
