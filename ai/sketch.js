const POPULATION = 300;
let flappies = [];
let pipes = [];
let score = 0;

setup = () => {
  createCanvas(800, 600);
  [...Array(POPULATION)].map(() => {
    flappies.push(new flap());
  })
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

  flappies = flappies.filter(flap => {
    return !closestPipe.checkHit(flap);
  });


  if (pipes[0].isOffscreen()) {
    pipes.shift();
  }

  if (frameCount % 75 === 0) {
    pipes.push(new pipe());
  }

  // score text
  textSize(30);
  strokeWeight(0);
  fill(0);
  text(score, 10, 31);
  fill(255);
  text(score, 10, 30);

  fill(0);
  text(flappies.length, 10, height - 10);
  fill(255);
  text(flappies.length, 10, height - 10);

  if (flappies.length === 0) {
    noLoop();
  }
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

// keyPressed = () => {
//   if (key === " ") {
//     flappy.up();
//   } else if (key === "r") {
//     reset();
//   }
// }