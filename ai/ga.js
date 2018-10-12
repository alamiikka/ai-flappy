nextGen = () => {
    console.log('Gen:' + generation + 1);
    calcFitness();

    for (let i = 0; i < POPULATION; i++) {
        flappies[i] = pickANewFlappy();
    }

    savedFlappies.length = 0;
}

calcFitness = () => {

    let sum = 0;
    for (let i = 0; i < birds.length; i++) {
        birds[i].score = pow(birds[i].score, 2);
        sum += birds[i].score;
    }
    // Divide by the sum
    for (let i = 0; i < birds.length; i++) {
        birds[i].fitness = birds[i].score / sum;
    }
}

pickANewFlappy = () => {
    let index = 0;
    let r = random(1);
    console.log(r, savedFlappies[index].fitness);

    while (r > 0) {
        r = r - savedFlappies[index].fitness;
        index++;
    }
    index--;
    let oldFlap = savedFlappies[index];
    // savedFlappies.splice(index, 1);
    let newFlap = new flap(oldFlap.birdBrain.copy());
    newFlap.mutate(0.1);
    return newFlap;
}