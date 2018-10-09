function pipe() {
    this.spacing = 175;
    this.top = random(height / 6, 3 / 4 * height);
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 6;
    this.givenScore = false;

    this.checkHit = flappy => {
        if (flappy.y < this.top || flappy.y > height - this.bottom) {
            if (flappy.x > this.x && flappy.x < this.x + this.w) {
                return true;
            }
        }
        return false;
    }

    this.render = () => {
        fill(255);
        if (this.highlight) {
            fill(255, 0, 0);
        }
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
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
        if(!this.givenScore && flappy.x > this.x + this.w + 1){
            this.givenScore = true;
            return true;
        }
    }

}