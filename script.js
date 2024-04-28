let stopwatchInterval;
let startTime;
let pausedTime = 0;
let isRunning = false;

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - pausedTime;
    stopwatchInterval = setInterval(updateStopwatch, 10);
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    document.getElementById('resetBtn').disabled = false;
    document.getElementById('lapBtn').disabled = false;
  }
}

function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(stopwatchInterval);
    pausedTime = Date.now() - startTime;
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
  }
}

function resetStopwatch() {
  isRunning = false;
  clearInterval(stopwatchInterval);
  pausedTime = 0;
  updateStopwatch();
  document.getElementById('startBtn').disabled = false;
  document.getElementById('pauseBtn').disabled = true;
  document.getElementById('resetBtn').disabled = true;
  document.getElementById('lapBtn').disabled = true;
  document.getElementById('laps').innerHTML = '';
}

function recordLap() {
  const lapsContainer = document.getElementById('laps');
  const lapTime = Date.now() - startTime;
  const lapMinutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const lapSeconds = Math.floor((lapTime % (1000 * 60)) / 1000).toString().padStart(2, '0');
  const lapMilliseconds = Math.floor((lapTime % 1000)).toString().padStart(3, '0');
  const lapItem = document.createElement('li');
  lapItem.textContent =`${lapMinutes}:${lapSeconds}.${lapMilliseconds}`;
  lapsContainer.appendChild(lapItem);
}

function updateStopwatch() {
  const currentTime = Date.now() - startTime;
  const hours = Math.floor((currentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
  const minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
  const seconds = Math.floor((currentTime % (1000 * 60)) / 1000).toString().padStart(2, '0');
  const milliseconds = Math.floor((currentTime % 1000)).toString().padStart(3, '0');
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
  document.getElementById('milliseconds').textContent = milliseconds;
}