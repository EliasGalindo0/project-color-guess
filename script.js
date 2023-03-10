const randomColors = document.querySelectorAll('.random');
const answer = document.querySelector('#answer');
const colorList = document.querySelector('#color-list');
const resetButton = document.getElementById('reset-game');
const scoreDisplay = document.querySelector('#score');

function randomColorsGenerate() {
  const aux = '0123456789ABCDEF';
  let color = '#';
  for (let index = 0; index < 6; index += 1) {
    color += aux[Math.floor(Math.random() * 16)];
  }
  return `${color}FF`;
}

function setColors() {
  for (let index = 0; index < randomColors.length; index += 1) {
    const color = randomColorsGenerate();
    randomColors[index].style.backgroundColor = color;
  }
  const rgbText = document.getElementById('rgb-color');
  const rgbColor = document.querySelector('.ball');
  const bgColor = getComputedStyle(rgbColor).backgroundColor;
  rgbText.innerHTML = bgColor;
  return randomColors;
}

window.onload = setColors();

function updateScore() {
  const actualScore = localStorage.getItem('score');

  if (actualScore !== null) {
    scoreDisplay.innerText = `${localStorage.getItem('score')}`;
  }
}

updateScore();

function pontuation() {
  let score = localStorage.getItem('score');
  if (score === null) {
    localStorage.setItem('score', 3);
  }
  score = Number(score) + 3;
  localStorage.setItem('score', score);
  scoreDisplay.innerText = `${localStorage.getItem('score')}`;
}

function changeClassChoosen(event) {
  event.target.classList.contains('ball');
  event.target.classList.add('choosen');
  const choose = document.querySelector('.choosen');
  const bkgChoose = getComputedStyle(choose).backgroundColor;
  const rgbCompare = document.getElementById('rgb-color').innerText;
  if (bkgChoose === rgbCompare) {
    answer.innerText = 'Acertou!';
    pontuation();
  } else {
    answer.innerText = 'Errou! Tente novamente!';
  }
}

function reset() {
  window.location.reload();
}

colorList.addEventListener('click', changeClassChoosen);
resetButton.addEventListener('click', reset);
