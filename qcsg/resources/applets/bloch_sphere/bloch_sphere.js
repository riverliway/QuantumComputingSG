"use strict";

let theta = Math.PI / 4;
let phi = Math.PI / 3;

let THETA_COLOR = rgb(161, 10, 242);
let THETA_DARK = rgb(99, 7, 148);
let PHI_COLOR = rgb(242, 107, 10);
let PHI_DARK = rgb(209, 72, 4);
let POINT_DARK = rgb(5, 150, 129);

const topCanvas = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 350;

    const RADIUS = 100;
    const SENSITIVITY = 1.2;

    sketch.setup = () => {
        let p5Object = sketch.createCanvas(WIDTH, HEIGHT, sketch.WEBGL);
        p5Object.position(sketch.windowWidth / 2 - WIDTH / 2, sketch.windowHeight / 2 - 500 / 2);
        sketch.angleMode(sketch.DEGREES);

        // Change the original camera angle
        let moveX = SENSITIVITY * 50 / HEIGHT;
        let moveY = SENSITIVITY * 70 / HEIGHT;
        p5Object._curCamera._orbit(moveX, moveY, 0);
    }

    sketch.draw = () => {
        if (sketch.mouseX > 0 && sketch.mouseY > 0 && sketch.mouseX < WIDTH && sketch.mouseY < HEIGHT) {
            if (sketch.mouseIsPressed) {
                sketch.cursor("grab");
            } else {
                sketch.cursor(sketch.HAND);
            }
        }

        sketch.background(255);
        sketch.orbitControl(SENSITIVITY, SENSITIVITY, 0.3);
        drawBlochSphere(theta, phi);
    }

    function drawBlochSphere(theta, phi) {
        // Draw reference circles
        sketch.noFill();
        sketch.stroke(120);
        sketch.ellipse(0, 0, 2 * RADIUS, 2 * RADIUS, 40);
        sketch.rotateY(90);
        sketch.ellipse(0, 0, 2 * RADIUS, 2 * RADIUS, 40);
        sketch.rotateX(90);
        sketch.ellipse(0, 0, 2 * RADIUS, 2 * RADIUS, 40);

        // Draw X, Y, Z axes
        sketch.line(0, 1.5 * RADIUS, 0, 0, -1.5 * RADIUS, 0);
        sketch.line(1.5 * RADIUS, 0, 0, -1.5 * RADIUS, 0, 0);
        sketch.line(0, 0, 1.5 * RADIUS, 0, 0, -1.5 * RADIUS);

        // Draw vector
        sketch.stroke(0);
        let xPos = RADIUS * Math.sin(theta) * Math.cos(phi);
        let yPos = RADIUS * Math.sin(theta) * Math.sin(phi);
        let zPos = RADIUS * Math.cos(theta);
        sketch.line(0, 0, 0, -xPos, yPos, zPos);

        // Draw supporting lines
        linedash(0, 0, 0, -xPos, yPos, 0, 10);
        linedash(-xPos, yPos, 0, -xPos, yPos, zPos, 10);

        // Draw angles
        sketch.fill(PHI_COLOR);
        if (phi > 0.001) sketch.arc(0, 0, RADIUS / 2, RADIUS / 2, 180 - sketch.degrees(phi), 180);
        sketch.rotateX(90);
        sketch.rotateY(-sketch.degrees(phi));
        sketch.fill(THETA_COLOR);
        if (theta > 0.001) sketch.arc(0, 0, RADIUS / 2, RADIUS / 2, 90, 90 + sketch.degrees(theta));

        // Draw point
        sketch.noStroke();
        sketch.fill(POINT_DARK);
        sketch.rotateY(sketch.degrees(phi));
        sketch.rotateX(-90);
        sketch.translate(-xPos, yPos, zPos);
        sketch.sphere(3);
    }

    function linedash(x1, y1, z1, x2, y2, z2, segments) {
        let xDiff = x2 - x1; let yDiff = y2 - y1; let zDiff = z2 - z1;
        let distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff + zDiff * zDiff);
        let xDelta = xDiff / segments / 2; let yDelta = yDiff / segments / 2; let zDelta = zDiff / segments / 2;
        for (let i = 0; i < 2 * segments; i += 2) {
            sketch.line(
                x1 + xDelta * i, y1 + yDelta * i, z1 + zDelta * i,
                x1 + xDelta * (i + 1), y1 + yDelta * (i + 1), z1 + zDelta * (i + 1)
            );
        }
    }
}

let topP5 = new p5(topCanvas);

let bottomCanvas = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 150;

    let sliders = [];
    let activeSlider = -1;
    let hoveredSlider = -1;

    sketch.setup = () => {
        let p5Object = sketch.createCanvas(WIDTH, HEIGHT);
        sketch.textSize(18);
        p5Object.position(sketch.windowWidth / 2 - WIDTH / 2, sketch.windowHeight / 2 - 500 / 2 + 350);

        sliders[0] = new Slider(crd(210, 50), crd(595, 50), 0, 180, 45, 20);
        sliders[1] = new Slider(crd(210, 100), crd(595, 100),  0, 360, 60, 20);

        sliders[0].color = THETA_COLOR;
        sliders[1].color = PHI_COLOR;

        for (let i = 0; i < sliders.length; i++) {
            sliders[i].drawSlider();
            sliders[i].drawValue(sliders[i].pos2.x + 20, sliders[i].pos2.y);
        }

        sketch.text("θ", 180, 50 + 5);
        sketch.text("ϕ", 180, 100 + 5);
    }

    sketch.mousePressed = () => {
        activeSlider = hoveredSlider;
        if (activeSlider != -1) sketch.cursor("grab");
    }

    sketch.mouseReleased = () => {
        activeSlider = -1;
        sketch.mouseMoved();
    }

    sketch.mouseMoved = () => {
        if (activeSlider == -1) {
            for (let i = 0; i < sliders.length; i++) {
                if (sliders[i].isOver(sketch.mouseX, sketch.mouseY)) {
                    sketch.cursor(sketch.HAND);
                    hoveredSlider = i;
                    return;
                }
            }
            hoveredSlider = -1;
            sketch.cursor(sketch.ARROW);
        }
    }

    sketch.mouseDragged = () => {
        if (activeSlider != -1) {
            sketch.fill(255);
            sketch.noStroke();
            let current = sliders[activeSlider];
            sketch.rect(current.pos1.x - current.radius, current.pos1.y - current.radius,
                current.pos2.x - current.pos1.x + current.radius * 5 + 5, current.radius * 2);
            current.update(sketch.mouseX, sketch.mouseY);
            current.drawSlider();
            current.drawValue(current.pos2.x + 20, current.pos2.y);

            theta = sketch.radians(sliders[0].value);
            phi = sketch.radians(sliders[1].value);
        }
    }

    function crd(xCoord, yCoord) {
        return {x:xCoord, y:yCoord};
    }

    function dist(x0, y0, x1, y1) {
        let xDiff = x1 - x0;
        let yDiff = y1 - y0;
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }

    class Slider {
        constructor(pos1, pos2, lowerBound, higherBound, initialValue, radius) {
            // Slider class creates a line between pos1 & pos2 and allows for an adjustable circle to slide between those points
            // The pos1 & pos2 are coordinate pairs define the points for the edges of the line segment
            // lowerBound is a number defining the lowest value 
            // higherBound is a number defining the highest value
            // initialValue is a number defining where the value should start at
            // radius is a number defining how big the circle should be

            this.pos1 = pos1;
            this.pos2 = pos2;
            this.lowerBound = lowerBound;
            this.higherBound = higherBound;
            this.value = initialValue;
            this.radius = radius;
            this.color = sketch.color("green")

            this.xScale = (pos2.x - pos1.x) / (higherBound - lowerBound);
            this.yScale = (pos2.y - pos1.y) / (higherBound - lowerBound);
        }

        isOver(x, y) {
            // isOver(x, y):boolean returns true if the x & y coordinates is inside the circle
            // x is a number defining the x coordinate to check
            // y is a number defining the y coordinate to check

            let xValue = (this.value - this.lowerBound) * this.xScale + this.pos1.x;
            let yValue = (this.value - this.lowerBound) * this.yScale + this.pos1.y;

            return dist(x, y, xValue, yValue) < this.radius;
        }

        update(x, y) {
            // update(x, y):void updates the value of the slider based off the coordinate provided
            // x is a number defining the x coordinate of the new location
            // y is a number defining the y coordinate of the new location

            if (x < this.pos1.x) x = this.pos1.x;
            else if (x > this.pos2.x) x = this.pos2.x;
            if (y < this.pos1.y) y = this.pos1.y;
            else if (y > this.pos2.y) y = this.pos2.y;

            x -= this.pos1.x;
            y -= this.pos1.y;

            if (this.xScale > this.yScale) {
                this.value = x / this.xScale + this.lowerBound;
            } else {
                this.value = y / this.yScale + this.lowerBound;
            }
        }

        drawSlider() {
            // drawSlider():void draws the slider

            let x = (this.value - this.lowerBound) * this.xScale + this.pos1.x;
            let y = (this.value - this.lowerBound) * this.yScale + this.pos1.y;

            sketch.strokeWeight(1);
            sketch.stroke(0);
            sketch.line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
            sketch.fill(this.color);
            sketch.ellipse(x, y, this.radius, this.radius);
        }

        drawValue(x, y) {
            // drawValue(x, y):void draws the value on screen at the specified location
            sketch.noStroke();
            sketch.fill(0);
            sketch.text(this.value.toFixed(2) + "°", x, y + 5);
        }

        getValue() {
            // getValue(): number returns the value bounded between the lower and higher bounds
            return this.value;
        }
    }
}

let bottomP5 = new p5(bottomCanvas);

function rgb(r, g, b) {
    return [r, g, b];
}