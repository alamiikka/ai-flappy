let font;
let flappy;
let pipes = [];
let score = 0;

setup = () => {
  createCanvas(800, 600);
  flappy = new flap();
  pipes.push(new pipe());
}

draw = () => {
  background(0);
  for (let p of pipes.reverse()) {
    p.render();
    p.update();

    if (p.checkHit(flappy)) {
      flappy.dieded();
      noLoop();
      // setTimeout(() => {
      //   reset();
      // }, 2000);
    }

    if (p.giveScore(flappy)) {
      score++;
    }

  }

  if (pipes[0].isOffscreen()) {
    pipes.shift();
  }

  flappy.update();
  flappy.render();

  if (frameCount % 75 === 0) {
    pipes.push(new pipe());
  }

  textSize(30);
  fill(0);
  text(score, 31, 31);
  fill(255);
  text(score, 30, 30);
}

reset = () => {
  noLoop();
  flappy = null;
  pipes.length = 0;
  score = 0;

  flappy = new flap();
  pipes.push(new pipe());

  frameCount = 0;

  redraw();
  loop();
}

keyPressed = () => {
  if (key === " ") {
    flappy.up();
  } else if (key === "r") {
    reset();
  }
}