// ===== FECHA Y RELOJ =====
const dateEl = document.getElementById("date");
const clockEl = document.getElementById("clock");

function updateDateTime() {
  const now = new Date();
  // Fecha en formato día/mes/año
  dateEl.textContent = now.toLocaleDateString();
  // Hora en formato HH:MM:SS
  clockEl.textContent = now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);
updateDateTime(); // Ejecuta al cargar la página



// ===== FRASES ROTATIVAS =====
const quotes = [
  "Disciplina primero.",
  "El éxito requiere esfuerzo.",
  "Cada día cuenta.",
  "Concéntrate en tus metas.",
  "La constancia vence todo."
];

const quoteEl = document.getElementById("quote");
let currentQuote = 0;

setInterval(() => {
  currentQuote = (currentQuote + 1) % quotes.length;
  quoteEl.textContent = quotes[currentQuote];
}, 5000); // Cambia cada 5 segundos



// ===== TEMPORIZADOR DE ENFOQUE =====
let timerDuration = 25 * 60; // 25 minutos
let timerInterval;
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function startTimer() {
  clearInterval(timerInterval); // Para cualquier temporizador previo
  let timeLeft = timerDuration;
  timerEl.textContent = formatTime(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert("¡Tiempo de enfoque terminado!");
      timerEl.textContent = formatTime(timerDuration);
    }
  }, 1000);
}

startBtn.addEventListener("click", startTimer);



// ===== MODO OSCURO =====
const darkBtn = document.getElementById("darkBtn");

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
