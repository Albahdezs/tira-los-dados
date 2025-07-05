'use strict';

// Seleccionar elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Inicialización de variables que se actualizaran en el transcurso del juego
let scores, currentScore, activePlayer, playing;

// Configuración inicial
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Función para alternar a los jugadores
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Cambiar el jugador activo
  player0El.classList.toggle('player--active'); // Alternar la clase player active
  player1El.classList.toggle('player--active');
};

// Evento de tirar el dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generar un número aleatorio entre 1 y 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Mostrar el dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Comprobar si el dado es 1
    // Si es 1, cambiar al siguiente jugador
    if (dice !== 1) {
      // Sumar el dado al puntaje actual
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Si es 1, cambiar al siguiente jugador
      switchPlayer();
    }
  }
});

// Evento de guardar la puntuación 
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Agregar el puntaje actual al puntaje activo
    scores[activePlayer] += currentScore;

    // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Comprobar si el puntaje es >= 100
    if (scores[activePlayer] >= 100) {
      // Terminar el juego
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        // Añade al CSS la clase
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        // Añade al CSS la clase
        .classList.remove('player--active');
    } else {
      // Si no, cambiar al siguiente jugador
      switchPlayer();
    }
  }
});

// Evento para juego nuevo
btnNew.addEventListener('click', init);

// ------> MODAL
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnInfo = document.querySelector('.btn--info');
const btnCloseModal = document.querySelector('.close-button');

// Abrir el modal
const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Cerrar el modal
const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Eventos para abrir y cerrar el modal
btnInfo.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
