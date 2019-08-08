nextGen = () => {
  normalizeFitness();

  let newFlaps = [];

  let eliteflaps = savedFlappies.sort((a, b) => b.fitness - a.fitness);

  for (let i = 0; i < ELITE; i++) {
    newFlaps.push(eliteflaps[i]);
    let e = eliteflaps[i]
    let b = e.birdBrain;
    b.mutate(mutate);
    let brian = b.copy();
    newFlaps.push(new flap(brian, e.r, e.g, e.b));
  }

  savedFlappies = shuffle(savedFlappies);

  while(newFlaps.length < POPULATION){
    newFlaps.push(pickANewFlappy());
  }

  savedFlappies.length = 0;
  flappies = newFlaps;
};

pickANewFlappy = () => {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - savedFlappies[index].fitness;
    index++;
  }
  index--;
  let f = savedFlappies[index];
  if (f.tyhmaKuSaapas) {
    // Died on the first pipe, what an idiot, better to get totally new one
    return new flap();
  } else {
    let b = f.birdBrain;
    b.mutate(mutate);
    let brian = b.copy();
    return new flap(brian, f.r, f.g, f.b);
  }
};

function normalizeFitness() {
  let sum = 0;
  for (let flap of savedFlappies) {
    sum += flap.score;
  }
  for (let flap of savedFlappies) {
    flap.fitness = flap.score / sum;
  }
}

function mutate(x) {
  if (Math.random() < 0.1) {
    let offset = randomGaussian(0, 0.1);
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}



// https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}