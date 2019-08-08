const POPULATION = 300;
const ELITE = Math.floor(POPULATION * 0.1);
let generation = 0;
let flappies = [];
let savedFlappies = [];
let pipes = [];
let score = 0;
let highScore = 0;
let looping = true;

setup = () => {
  createCanvas(800, 600);
  flappies = [...Array(POPULATION)].fill().map(() => new flap());
  pipes.push(new pipe(true));
};

draw = () => {
  background(0);

  let closestPipe = pipes[0].x + pipes[0].w < width / 4 ? pipes[1] : pipes[0];
  let ccc = pipes[0].x + pipes[0].w < width / 4 ? 1 : 0;
  pipes[0].closestPipe = false;
  pipes[ccc].closestPipe = true;

  for (let p of pipes) {
    p.render();
    p.update();
    if (!p.hasGivenScore && p.x + p.w < width / 4) {
      p.hasGivenScore = true;
      score++;
    }
  }

  for (let f of flappies) {
    f.useYourHead(pipes, closestPipe);
    f.update();
    f.render();
  }

  for (let i = 0; i < flappies.length; i++) {
    if (closestPipe.checkHit(flappies[i])) {
      if (closestPipe.firstPipe) {
        flappies[i].tyhmaKuSaapas = true;
      } else {
        flappies[i].tyhmaKuSaapas = false;
      }
      savedFlappies.push(flappies.splice(i, 1)[0]);
      i--;
    }
  }

  if (pipes[0].isOffscreen()) {
    pipes.shift();
  }

  if (frameCount % 75 === 0) {
    pipes.push(new pipe(false));
  }

  textSize(30);
  strokeWeight(0);
  fill(255);

  text("Score: " + score, 10, 30);
  text("High: " + highScore, 10, 70);
  text("Alive: " + flappies.length, 10, height - 10);
  text("Gen: " + generation, 10, height - 50);

  if (flappies.length === 0) {
    allDed();
  }
};

allDed = () => {
  noLoop();
  score > highScore ? (highScore = score) : null;

  score = 0;
  frameCount = 0;
  pipes.length = 0;
  pipes.push(new pipe(true));

  generation++;
  nextGen();
  loop();
};

mousePressed = () => {
  looping ? noLoop() : loop();
  looping = !looping;
};

keyPressed = () => {
  if (keyCode === 75) {
    for (let i = 0; i < flappies.length; i++) {
      savedFlappies.push(flappies.splice(i, 1)[0]);
      i--;
    }
  }
};
