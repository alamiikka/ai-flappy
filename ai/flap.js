class flap {
    constructor(brain, pr, pg, pb){
        this.y = height / 2;
        this.x = width / 4;
    
        this.size = 32;
    
        this.gravity = 0.7;
        this.lift = -12;
        this.velocity = 0;
    
        this.score = 0;
        this.fitness = 0;
    
        this.birdBrain = null;

        this.tyhmaKuSaapas = false;

    
        if (brain) {
            this.birdBrain = brain;
            this.r = pr;
            this.g = pg;
            this.b = pb;
        } else {
            this.birdBrain = new NeuralNetwork(5, 8, 2);
            this.r = random(10, 255);
            this.b = random(10, 255);
            this.g = random(10, 255);
        }
    
        this.dead = false;
    }

    render = () => {
        strokeWeight(1.5);
        stroke(255);
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.size, this.size)
    }

    up = () => {
        this.velocity = this.lift;
    }

    useYourHead = (pipes, closestPipe) => {
        //but i don't want to use my head!
        if (!pipes || !closestPipe) return;

        let inputs = [];
        inputs[0] = this.y;
        inputs[1] = closestPipe.top;
        inputs[2] = closestPipe.bottom;
        inputs[3] = closestPipe.x;
        inputs[4] = this.velocity;

        let action = this.birdBrain.predict(inputs);
        if (action[1] > action[0]) {
            this.up();
        }
    }

    update = () => {
        this.score++;
        this.velocity += this.gravity;
        this.y += this.velocity;

        if (this.y + this.size / 2 > height) {

            this.y = height - this.size / 2;
            this.velocity = 0;

        } else if (this.y < this.size / 2) {

            this.y = this.size / 2;
            this.velocity = 0;

        }
    }

    dieded = () => {
        this.dead = true;
    }

}