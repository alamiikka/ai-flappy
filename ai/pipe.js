const fancy = true;

function pipe() {
    this.spacing = 145;
    this.top = random(0 + (height / 10), height - this.spacing - (height / 10));
    this.bottom = height - (this.top + this.spacing);
    this.x = width;
    this.w = 80;
    this.speed = 5.5;
    this.hasGivenScore = false;

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


        // AI simplify hitbox to one pixel
        //
        // // hit checks
        // //   1
        // //4 ball 2
        // //   3

        // const flapSize = flappy.size / 2;

        // //1 & 3
        // if (flappy.y - flapSize < this.top ||
        //     flappy.y + flapSize > height - this.bottom) {
        //     if (flappy.x > this.x && flappy.x < this.x + this.w) {
        //         return true;
        //     }
        // }

        // //2 & 4
        // if (flappy.y < this.top ||
        //     flappy.y > height - this.bottom) {
        //     if ((flappy.x + flapSize > this.x &&
        //             flappy.x + flapSize < this.x + this.w) ||
        //         (flappy.x - flapSize > this.x &&
        //             flappy.x - flapSize < this.x + this.w)) {
        //         return true;
        //     }
        // }

        return false;
    }

    this.render = () => {
        strokeWeight(0);

        fill(0, 200, 0);
        rect(this.x, 0, this.w, this.top);
        rect(this.x, height - this.bottom, this.w, this.bottom);
        //TODO gradient
        fill(0, 255, 0);
        rect(this.x + this.w / 7, 0, this.w / 7, this.top);
        rect(this.x + this.w / 7, height - this.bottom, this.w / 7, this.bottom);
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