"use strict";

const WIDTH = 800;
const HEIGHT = 500;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    line(0,0,WIDTH,HEIGHT);
    line(WIDTH, 0, 0, HEIGHT)
}

function draw() {
    if (mouseIsPressed) {
        ellipse(800, 500, 80, 80);
        ellipse(750, 450, 80, 80);
    }
}