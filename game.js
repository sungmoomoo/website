const textElement = document.getElementById('text');
const continuePrompt = document.getElementById('continuePrompt');
const mailIcon = document.getElementById('letterContainer');
const noteOverlay = document.getElementById('noteOverlay');
const closeNote = document.getElementById('closeNote');

const story = [
  "Hello, brave adventurer.",
  "Something... or someone... is watching you.",
  "In the darkness, two eyes blink slowly.",
  "It's... friendly? Or is it?",
  "The choice is yours."
];

let storyIndex = 0;
let charIndex = 0;
let currentLine = '';
let isTyping = false;

function typeWriter() {
  if (charIndex < currentLine.length) {
    textElement.textContent += currentLine.charAt(charIndex);
    charIndex++;

    new Audio('https://undertale-sheet-music.github.io/sounds/snd_txt.wav').play();

    setTimeout(typeWriter, 50);
  } else {
    isTyping = false;
    continuePrompt.style.display = 'block';
  }
}

function nextLine() {
  if (isTyping || storyIndex >= story.length) return;

  continuePrompt.style.display = 'none';
  currentLine = story[storyIndex];
  textElement.textContent = '';
  charIndex = 0;
  isTyping = true;
  typeWriter();
  storyIndex++;

  if (storyIndex === story.length) {
    setTimeout(() => mailIcon.style.display = 'block', 1000);
  }
}

document.addEventListener('click', nextLine);
document.addEventListener('touchstart', nextLine);

mailIcon.addEventListener('click', () => {
  noteOverlay.style.display = 'flex';
});

closeNote.addEventListener('click', () => {
  noteOverlay.style.display = 'none';

});

nextLine();

const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');

let allowMovement = false;
let posX = 152;
let posY = 112;

function updatePlayerPosition() {
  player.style.left = posX + 'px';
  player.style.top = posY + 'px';
}

document.addEventListener('keydown', (e) => {
  if (!allowMovement) return;

  const step = 8;

  if (e.key === 'ArrowUp' || e.key === 'w') posY -= step;
  if (e.key === 'ArrowDown' || e.key === 's') posY += step;
  if (e.key === 'ArrowLeft' || e.key === 'a') posX -= step;
  if (e.key === 'ArrowRight' || e.key === 'd') posX += step;

  // Keep within bounds
  posX = Math.max(0, Math.min(posX, 320 - 16));
  posY = Math.max(0, Math.min(posY, 240 - 16));

  updatePlayerPosition();
});

// Enable movement after letter is closed
closeNote.addEventListener('click', () => {
  gameArea.style.display = 'block';
  allowMovement = true;
});
