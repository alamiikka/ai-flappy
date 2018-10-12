const POPULATION = 10;
let generation = 0;
let flappies = [];
let savedFlappies = [];
let pipes = [];
let score = 0;
let highScore = 0;
let looping = true;

setup = () => {
  createCanvas(800, 600);
  // [...Array(POPULATION)].map(() => {
  //   flappies.push(new flap());
  // });
  flappies = [...Array(POPULATION)].fill().map(() => new flap());
  pipes.push(new pipe());
}

draw = () => {
  background(0);

  let closestPipe = pipes[0].x + pipes[0].w < this.x ? pipes[1] : pipes[0];

  for (let p of pipes) {
    p.render();
    p.update();
    if (!p.hasGivenScore && p.x + p.w < width / 4) {
      p.hasGivenScore = true;
      score++;
    }
    // if (p.giveScore(flappy)) {
    //   score++;
    // }
  }

  // if (closestPipe.checkHit(flappy)) {
  //   flappy.dieded();
  //   noLoop();
  //   // setTimeout(() => {
  //   //   reset();
  //   // }, 2000);
  // }

  for (let f of flappies) {
    f.useYourHead(pipes, closestPipe);
    f.update();
    f.render();
  }

  // flappies = flappies.filter(flap => {
  //   return !closestPipe.checkHit(flap);
  // });

  for (let i = 0; i < flappies.length; i++) {
    if (closestPipe.checkHit(flappies[i])) {
      savedFlappies.push(flappies.splice(i, 1)[0]);
      i--;
    }
  }

  if (pipes[0].isOffscreen()) {
    pipes.shift();
  }

  if (frameCount % 75 === 0) {
    pipes.push(new pipe());
  }

  textSize(30);
  strokeWeight(0);
  fill(255);

  // score
  text("Score: " + score, 10, 30);

  // highscore
  text("High: " + highScore, 10, 70);

  // alive flaps
  text("Alive: " + flappies.length, 10, height - 10);

  //generation
  text("Gen: " + generation, 10, height - 50);

  if (flappies.length === 0) {
    allDed();
  }
}

allDed = () => {
  noLoop();
  score > highScore ? highScore = score : null;

  score = 0;
  frameCount = 0;
  pipes.length = 0;
  pipes.push(new pipe());

  generation++;
  nextGen();
  //loop();
}

mousePressed = () => {
  looping ? noLoop() : loop();
  looping = !looping;
}