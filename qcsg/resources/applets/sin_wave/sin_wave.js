"use strict";

const WIDTH = 800;
const HEIGHT = 500;

const pos1 = crd(100, 10);
const pos2 = crd(700, 310);

let sliders = [];
let activeSlider = -1;
let hoveredSlider = -1;

function setup() {
    let sketch = createCanvas(WIDTH, HEIGHT);
    sketch.position(windowWidth / 2 - WIDTH / 2, windowHeight / 2 - HEIGHT / 2);
    textSize(18);

    sliders[0] = new Slider(crd(260, 350), crd(645, 350), -4, 4, 2, 20);
    sliders[1] = new Slider(crd(260, 390), crd(645, 390),  0, 5, 1, 20);
    sliders[2] = new Slider(crd(260, 430), crd(645, 430), -10, 10, 0, 20);
    sliders[3] = new Slider(crd(260, 470), crd(645, 470), -3, 3, 0, 20);

    drawSinWave();

    for (let i = 0; i < sliders.length; i++) {
        sliders[i].drawSlider();
        sliders[i].drawValue(sliders[i].pos2.x + 20, sliders[i].pos2.y);
    }

    text("[A] Amplitude", 100, 350 + 5);
    text("[B] Frequency", 100, 390 + 5);
    text("[C] Horz. Shift", 100, 430 + 5);
    text("[D] Vert. Shift", 100, 470 + 5);
}

function mousePressed() {
    activeSlider = hoveredSlider;
    if (activeSlider != -1) cursor("grab");
}

function mouseReleased() {
    activeSlider = -1;
    mouseMoved();
}

function mouseMoved() {
    if (activeSlider == -1) {
        for (let i = 0; i < sliders.length; i++) {
            if (sliders[i].isOver(mouseX, mouseY)) {
                cursor(HAND);
                hoveredSlider = i;
                return;
            }
        }
        hoveredSlider = -1;
        cursor(ARROW);
    }
}

function mouseDragged() {
    if (activeSlider != -1) {
        fill(255);
        noStroke();
        rect(pos1.x - 1, pos1.y - 1, pos2.x - pos1.x + 2, pos2.y - pos1.y + 2);
        let current = sliders[activeSlider];
        rect(current.pos1.x - current.radius, current.pos1.y - current.radius,
            current.pos2.x - current.pos1.x + current.radius * 5, current.radius * 2);
        current.update(mouseX, mouseY);
        current.drawSlider();
        current.drawValue(current.pos2.x + 20, current.pos2.y);
        drawSinWave();
    }
}

function wave(x) {
    return -sliders[0].getValue() * Math.sin(sliders[1].getValue() * (x + sliders[2].getValue())) + sliders[3].getValue();
}

function drawSinWave() {
    drawGraph(pos1, pos2, crd(WIDTH / 2, (pos2.y - pos1.y) / 2 + pos1.y), crd(50, 50));
    strokeWeight(2);
    drawEquation(pos1, pos2, wave, crd(-10, 10), 50, crd(WIDTH / 2 - pos1.x, 150), Math.min(0.1, 0.1 / sliders[1].getValue()));
}

function drawGraph(pos1, pos2, origin, scale) {
    // This function will draw a graph bounded by the rectangle
    // pos1 and pos2 are coordinate pairs which define the bounding box for the graph
    // origin is a coordinate pair defining where the major axises are
    // scale is a coordinate pair defining how close the minor axises are

    strokeWeight(1);
    stroke(190);
    for (let i = origin.x; i <= pos2.x; i += scale.x) {
        line(i, pos1.y, i, pos2.y);
    }
    for (let i = origin.x; i >= pos1.x; i -= scale.x) {
        line(i, pos1.y, i, pos2.y);
    }
    for (let i = origin.y; i <= pos2.y; i += scale.y) {
        line(pos1.x, i, pos2.x, i);
    }
    for (let i = origin.y; i >= pos1.y; i -= scale.y) {
        line(pos1.x, i, pos2.x, i);
    }

    stroke(0);
    line(origin.x, pos1.y, origin.x, pos2.y);
    line(pos1.x, origin.y, pos2.x, origin.y);
}

function drawEquation(pos1, pos2, equation, xBounds, yScale, offset, step) {
    // This function will draw a smooth, continous equation on the screen bounded by the rectangle
    // The pos1 and pos2 are coordinate pairs which define the bounding box for this equation to be drawn on screen
    // The equation needs to be a function which takes a number as a parameter and returns a number f(x) = y
    // The xBounds is a coordinate pair which defines from which x point it should begin and end evaulating
    // The yScale is a number which defines how much it should stretch the y value by
    // The offset is a coordinate pair defining how far the origin gets moved and in what direction
    // The step is a number which defines how many points are evaluated: lower numbers = more points

    let min; let max;
    if (xBounds.x < xBounds.y) {
        min = xBounds.x;
        max = xBounds.y;
    } else {
        min = xBounds.y;
        max = xBounds.x;
    }
    let domain = max - min;
    let drawDomain = pos2.x - pos1.x;
    let drawScale = drawDomain / domain;

    let prevX = 0; 
    let prevY = 0;
    let didPrevious = false;

    for (let i = min; i <= max; i += step) {
        let y = equation(i) * yScale + offset.y + pos1.y;
        let x = i * drawScale + offset.x + pos1.x;

        if (y > pos1.y && y < pos2.y) {
            if (didPrevious) {
                // General case: draws the line normally
                line(x, y, prevX, prevY);
            } else {
                // Bound -> general case: draws the line from the y bound
                let boundedY = prevY < pos1.y ? pos1.y : pos2.y;
                let slope = (prevY - y) / (prevX - x);
                if (slope != 0 && i != min) {
                    let boundedX = (boundedY - prevY) / slope + prevX;
                    line(x, y, boundedX, boundedY);
                }
                didPrevious = true;
            }
        } else {
            if (didPrevious) {
                // General -> bound case: draws the line up to the y bound
                let boundedY = y < pos1.y ? pos1.y : pos2.y;
                let slope = (prevY - y) / (prevX - x);
                if (slope != 0) {
                    let boundedX = (boundedY - prevY) / slope + prevX;
                    line(prevX, prevY, boundedX, boundedY);
                }
            }
            didPrevious = false;
        }

        prevX = x;
        prevY = y;
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

        strokeWeight(1);
        stroke(0);
        line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
        fill("green");
        ellipse(x, y, this.radius, this.radius);
    }

    drawValue(x, y) {
        // drawValue(x, y):void draws the value on screen at the specified location
        noStroke();
        fill(0);
        text(this.value.toFixed(2), x, y + 5);
    }

    getValue() {
        // getValue(): number returns the value bounded between the lower and higher bounds
        return this.value;
    }
}