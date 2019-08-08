const fancy = true;

function pipe(firstPipe) {
    this.spacing = 145;
    this.top = random(0 + (height / 10), height - this.spacing - (height / 10));
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 5.5;
    this.hasGivenScore = false;
    this.firstPipe = firstPipe;
    this.closestPipe = false;

    this.checkHit = flappy => {

        if (this.x > width / 2 || this.givenScore) {
            return false;
        }

        if (flappy.y < this.top ||
            flappy.y > height - this.bottom) {
            if (flappy.x > this.x &&
                flappy.x < this.x + this.w) {
                return true;
            }
        }

        return false;
    }

    this.render = () => {
        strokeWeight(0);

        fill(0, 200, 0);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
        //TODO gradient
        if(this.closestPipe){
            fill(50, 255, 50);
            rect(this.x + this.w / 7, 0, this.w / 7, this.top);
            rect(this.x + this.w / 7, height - this.bottom, this.w / 7, this.bottom);
        } else {
            fill(0, 220, 0);
            rect(this.x + this.w / 7, 0, this.w / 7, this.top);
            rect(this.x + this.w / 7, height - this.bottom, this.w / 7, this.bottom);
        }
    }

    this.update = () => {
        this.x -= this.speed;
    }

    this.isOffscreen = () => {
        if (this.x < -this.w) {
            return true;
        } else {
            return false;
        }
    }

    this.giveScore = flappy => {
        if (!this.givenScore && flappy.x > this.x + this.w + 1) {
            this.givenScore = true;
            return true;
        }
    }

}