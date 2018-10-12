function flap(brains) {
    this.y = height / 2;
    this.x = width / 4;

    this.r = random(10, 255);
    this.b = random(10, 255);
    this.g = random(10, 255);

    this.size = 32;

    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;

    this.birdBrain = null;

    if (brains) {
        this.birdBrain = brains.copy();
    } else {
        this.birdBrain = new NeuralNetwork(4, 4, 1);
    }

    this.dead = false;

    this.render = () => {
        // if (this.dead) {
        //     fill(255, 0, 0);
        // } else {
        //     fill(255);
        // }
        strokeWeight(1.5);
        stroke(255);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size, this.size)
    }

    this.up = () => {
        this.velocity = this.lift;
    }

    this.useYourHead = (pipes, closestPipe) => {
        //but i don't want to use my head!
        if (!pipes || !closestPipe) return;

        let inputs = [];
        inputs[0] = this.y / height;
        inputs[1] = closestPipe.top / height;
        inputs[2] = closestPipe.bottom / height;
        inputs[3] = closestPipe.x / width

        let output = this.birdBrain.predict(inputs);
        if (output[0] > 0.5) {
            this.up();
        }
    }

    this.update = () => {
        this.score++;
        this.velocity += this.gravity;
        this.y += this.velocity;

        // this.y =  mouseY;

        if (this.y + this.size / 2 > height) {

            this.y = height - this.size / 2;
            this.velocity = 0;

        } else if (this.y < this.size / 2) {

            this.y = this.size / 2;
            this.velocity = 0;

        }
    }

    this.mutate = (amount) => {
        this.birdBrain.mutate(x => x * amount);
    }

    this.dieded = () => {
        this.dead = true;
    }

}