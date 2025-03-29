const colorBtns = document.body.querySelectorAll(".colorBtn");
const scorecard = document.body.querySelector(".score");
colorBtns.forEach((btn) => (btn.disabled = true)); //Disabled by default
const startBtn = document.body.querySelector(".startGame");

let computerClicks = [];
let humanClicks = [];
let score = 0;
let gameStarted = false;

const colors = ["royalblue", "crimson", "khaki", "limegreen"];

//Automated click by computer
const clickByComputer = () => {
  const color = colors[Math.floor(Math.random() * 4)];
  colorBtns.forEach((btn) => {
    if (btn.getAttribute("id") === color) {
      btn.style.backgroundColor = "white";
      setTimeout(() => (btn.style.backgroundColor = color), 50);
      computerClicks.push(color);
    }
  });
};

//Human click event listener
const clickByHuman = (e) => {
  humanClicks.push(e.target.id);
  e.target.style.backgroundColor = "white";
  setTimeout(() => (e.target.style.backgroundColor = e.target.id), 50);

  for (let i = 0; i < computerClicks.length; i++) {
    if (!humanClicks[i]) return;
    if (humanClicks[i] === computerClicks[i]) {
      if (i === computerClicks.length - 1) {
        score++;
        scorecard.innerHTML = "";
        scorecard.textContent = `Score: ${score}`;
        humanClicks = [];
        setTimeout(() => clickByComputer(), 500);
      } else {
        continue;
      }
    } else endGame();
  }
};

colorBtns.forEach((btn) => {
  btn.addEventListener("click", clickByHuman);
});

//Starts game
const initiateGame = () => {
  if (gameStarted) return;
  gameStarted = true;
  colorBtns.forEach((btn) => (btn.disabled = false));
  startBtn.disabled = true;

  clickByComputer();
};

//Ends game
const endGame = () => {
  computerClicks = [];
  humanClicks = [];
  gameStarted = false;
  scorecard.innerHTML = "";
  scorecard.textContent = `Oops, you lost! Want to try again?`;
  startBtn.disabled = false;
};
startBtn.addEventListener("click", initiateGame);
