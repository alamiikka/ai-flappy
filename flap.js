function flap() {
    this.y = height / 2;
    this.x = width / 4;

    this.size = 32;

    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;

    this.render = () => {
        fill(255);
        ellipse(this.x, this.y, this.size, this.size)
    }

    this.up = () => {
        this.velocity = this.lift;
    }

    this.update = () => {
        this.velocity += this.gravity;
        this.y += this.velocity;
        // this.y = mouseY;
        if (this.y + this.size / 2 > height) {

            this.y = height - this.size / 2;
            this.velocity = 0;

        } else if (this.y < this.size / 2) {

            this.y = this.size / 2;
            this.velocity = 0;

        }
    }
}