import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  startButton: document.querySelector('[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours]'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
  datetimePicker: document.getElementById('datetime-picker'),
};

let countdownTimer = null;
let selectedDate = null;

refs.startButton.disabled = true; // Спочатку кнопка "Start" неактивна

flatpickr(refs.datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      window.alert("Будь ласка виберіть дату в майбутньому");
    } else {
      selectedDate = selectedDates[0];
      refs.startButton.disabled = false; // Активуємо кнопку "Start", якщо дата вибрана коректно
    }
  },
});

function startCountdown() {
  refs.startButton.disabled = true;

  countdownTimer = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;
    const time = convertMs(deltaTime);

    if (deltaTime < 0) {
      clearInterval(countdownTimer);
      return;
    }

    updateTimerFace(time);
  }, 1000);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysSpan.textContent = addLeadingZero(days);
  refs.hoursSpan.textContent = addLeadingZero(hours);
  refs.minutesSpan.textContent = addLeadingZero(minutes);
  refs.secondsSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  //days
  const days = Math.floor(ms / day);
  //hours
  const hours = Math.floor((ms % day) / hour);
  //minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  //seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

refs.startButton.addEventListener('click', startCountdown);
