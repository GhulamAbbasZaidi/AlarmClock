const timerRef = document.getElementById("currentTime");

const hourInput = document.getElementById("alarmHours");
const minuteInput = document.getElementById("alarmMinutes");
const activeAlarms = document.getElementsByClassName("activeAlarms");
const setAlarm = document.getElementsByClassName("set")[0];
const alarmList = document.getElementById("alarmList");
let AlarmSound = new Audio(
  "https://raw.githubusercontent.com/himalayasingh/music-player-1/master/music/2.mp3"
);

const Zero = (value) => (value < 10 ? "0" + value : value);

function timeDisplay() {
  const now = new Date();
  let hours = Zero(now.getHours());
  const minutes = Zero(now.getMinutes());
  const seconds = Zero(now.getSeconds());
  let amPm = "AM";

  if (hours >= 12) {
    amPm = "PM";
  }

  if (hours > 12) {
    hours -= 12;
  }
  const timeFormat = `${hours}:${minutes}:${seconds}:${amPm}`;
  timerRef.innerHTML = timeFormat;
}
setInterval(timeDisplay, 1000);

function setAlarmTime() {
  const alarmHours = parseInt(hourInput.value, 10);
  const alarmMinutes = parseInt(minuteInput.value, 10);

  if (
    isNaN(alarmMinutes) ||
    isNaN(alarmHours) ||
    alarmHours < 0 ||
    alarmHours > 23 ||
    alarmMinutes < 0 ||
    alarmMinutes > 59
  ) {
    alert("Please enter valid values for hours and minutes.");
    return;
  }

  const alarmTime = {
    hours: Zero(alarmHours),
    minutes: Zero(alarmMinutes),
  };
  saveAlarmToLocalStorage(alarmTime);

  console.log(alarmTime);
  checkAndTriggerAlarm(alarmTime);

  // setInterval(function () {
  //   const now = new Date();
  //   const currentHours = now.getHours();
  //   const currentMinutes = now.getMinutes();

  //   if (
  //     currentHours === alarmTime.hours &&
  //     currentMinutes === alarmTime.minutes
  //   ) {
  //     AlarmSound.play();
  //   }
  // }, 1000);
}
function saveAlarmToLocalStorage(alarmTime) {
  const existingAlarms = JSON.parse(localStorage.getItem("alarms")) || [];

  existingAlarms.push(alarmTime);

  localStorage.setItem("alarms", JSON.stringify(existingAlarms));
}
function checkAndTriggerAlarm(setAlarmTime) {
  const now = new Date();
  const currentHours = Zero(now.getHours());
  const currentMinutes = Zero(now.getMinutes());

  // Retrieve existing alarms from local storage
  const existingAlarms = JSON.parse(localStorage.getItem("alarms")) || [];

  existingAlarms.forEach((alarm) => {
    if (currentHours === alarm.hours && currentMinutes === alarm.minutes) {
      // Trigger the alarm sound
      AlarmSound.play();
    }
  });
}
