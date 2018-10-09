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
    console.log(score);

    p.render();
    p.update();

    if (p.checkHit(flappy)) {
      noLoop();
      console.log("DED");
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
  flappy = null;
  pipes.length = 0;
  score = 0;

  flappy = new flap();
  pipes.push(new pipe());

  frameCount = 0;

  redraw();
  setTimeout(() => {
    loop();
  }, 1000);
}

keyPressed = () => {
  if (key === " ") {
    flappy.up();
  }
}