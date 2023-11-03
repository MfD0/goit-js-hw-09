function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

//змінна для ідентифікатора інтервалу
let colorIntervalId = null;

function startColorSwitch() {

  if (colorIntervalId) {
    return;
  }

  colorIntervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.disabled = true;
}

// Функція для зупинки зміни кольору
function stopColorSwitch() {
  clearInterval(colorIntervalId);
  colorIntervalId = null;
  
  startButton.disabled = false;
}

startButton.addEventListener('click', startColorSwitch);
stopButton.addEventListener('click', stopColorSwitch);
