export function displayTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let meridiem = "AM";

  // convert to 12-hour format
  if (hours > 12) {
    hours = hours - 12;
    meridiem = "PM";
  }

  // zero pad hours, minutes, and seconds
  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);

  // display the time
  document.getElementById("clock").textContent =
    hours + ":" + minutes + " " + meridiem;
}

// update the time every second
setInterval(displayTime, 1000);
