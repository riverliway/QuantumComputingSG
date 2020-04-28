"use strict";

const WIDTH = 800;
const HEIGHT = 500;

let origin;
const AXIS_LENGTH = 250;
const toRad = Math.PI / 180;
const toDeg = 1 / toRad;

function setup() {
    createCanvas(WIDTH, HEIGHT);

    origin = createVector(WIDTH / 2, HEIGHT / 2);

    drawUnitCircle(60 * toRad);
}

function draw() {
    
}

function mouseDragged() {
    let xDiff = mouseX - WIDTH / 2;
    let yDiff = mouseY - HEIGHT / 2;
    let theta = Math.acos(xDiff / Math.sqrt(xDiff * xDiff + yDiff * yDiff));
    if (mouseY > HEIGHT / 2) theta = 2 * Math.PI - theta;
    drawUnitCircle(theta);
}

// This is not the same as the draw loop, it doesn't get called every frame, only on a mouse event
function drawUnitCircle(theta) {
    let y = Math.sin(theta);
    let x = Math.cos(theta);

    strokeWeight(0);
    fill(255);
    rect(0, 0, WIDTH, HEIGHT);

    strokeWeight(1);
    drawArrow(origin, createVector(AXIS_LENGTH, 0), 140);
    drawArrow(origin, createVector(-AXIS_LENGTH, 0), 140);
    drawArrow(origin, createVector(0, AXIS_LENGTH), 140);
    drawArrow(origin, createVector(0, -AXIS_LENGTH), 140);

    noFill();
    ellipse(WIDTH / 2, HEIGHT / 2, 400, 400);
    arc(WIDTH / 2, HEIGHT / 2, 50, 50, -theta, 0);

    strokeWeight(3);
    drawArrow(origin, createVector(x * 200, -y * 200), 'blue');

    fill(0);
    textSize(35);
    text("y = " + y.toFixed(2), WIDTH / 2 + 30, 30);
    text("x = " + x.toFixed(2), 630, HEIGHT / 2 + 30);
    text("θ = " + (theta * toDeg).toFixed(2) + "°", 600, 120);
}

// Taken from https://p5js.org/reference/#/p5.Vector/magSq
function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }

  function round(value) {
      return Math.round(value * 100) / 100;
  }