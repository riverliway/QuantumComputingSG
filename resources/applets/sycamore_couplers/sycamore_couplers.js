"use strict";

const WIDTH = 800;
const HEIGHT = 500;

let qubits = [];
const SIZE = 28;

let couplers1 = [];
let couplers2 = [];
let active = -1;

let toggle;
let buttons = [];

function setup() {
    let p5Object = createCanvas(WIDTH, HEIGHT);
    p5Object.position(windowWidth / 2 - WIDTH / 2, windowHeight / 2 - HEIGHT / 2);

    let beginX = 30;
    let beginY = 30;
    let offsetX = 100;
    let offsetY = offsetX / 2;
    let row = -1;
    for (let i = 0; i < 54; i++) {
        if (i % 6 == 0) row++;
        qubits[i] = {
            x: beginX + (i % 6) * offsetX,
            y: beginY + row * offsetY,
            useable: true
        };

        if (row % 2 == 1) qubits[i].x += offsetX / 2;
    }
    qubits[3].useable = false;

    beginX += SIZE + 7;
    beginY += SIZE - 2;
    offsetX /= 2;
    row = -1;
    let col = 0;
    let pattern1 = [0, 2, 1, 3];
    let pattern2 = [3, 1, 2, 0];
    for (let i = 0; i < 88; i++) {
        if (i % 11 == 0) {
            row++;
            col = 0;
        }

        couplers1[i] = {
            x: beginX + col * offsetX,
            y: beginY + row * offsetY,
            type: (col % 2) * 2 + row % 2
        };
        if (couplers1[i].type == 3) couplers1[i].type = 1;
        else if (couplers1[i].type == 1) couplers1[i].type = 3;
        if (i % 2 == 1) {
            couplers1[i].x += 2;
        }

        couplers2[i] = Object.assign({}, couplers1[i]);
        let arrOffset = row % 4 > 1 ? 2 : 0;
        if (row % 2 == 0) {
            couplers2[i].type = pattern1[(col + arrOffset) % 4];
        } else {
            couplers2[i].type = pattern2[(col + arrOffset) % 4];
        }

        col++;
    }

    offsetY = 70;
    let scaleY = 80;
    for (let i = 0; i < 4; i++) {
        buttons[i] = new Button(680, 130 + i * scaleY, 750, 130 + i * scaleY + offsetY,  String.fromCharCode(i + 65), () => {
            active = i;
            updateSycamore();
            buttons[i].text = String.fromCharCode(i + (toggle.value ? 69 : 65));
        });
        buttons[i].color = createColor(i, false);
        buttons[i].hoverColor = createColor(i, true);
        buttons[i].drawButton(buttons[i].color);
    }

    noStroke();
    fill(0);
    textSize(18);
    text("Pattern", 688, 45);
    text("A", 670, 80);
    text("E", 748, 80);
    toggle = new Toggle(690, 60, 50, false, color(30, 200, 30), () => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].text = String.fromCharCode(i + (toggle.value ? 69 : 65));
            buttons[i].drawButton(createColor(i, false));
        }
        updateSycamore();
    });

    drawQubits();
    drawCouplers();
    toggle.drawToggle();
}

function updateSycamore() {
    fill(255);
    noStroke();
    rect(29, 29, 609, 466);
    drawQubits();
    drawCouplers();
}

function mouseMoved() {
    if (toggle.isOver(mouseX, mouseY)) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].update(mouseX, mouseY);
    }
}

function mouseClicked() {
    toggle.update(mouseX, mouseY);
}

function createColor(index, active) {
    let alpha = active ? 255 : 100;
    switch(index) {
        case 0: return color(43, 160, 43, alpha);
        case 1: return color(24, 190, 197, alpha);
        case 2: return color(32, 119, 181, alpha);
        case 3: return color(134, 70, 72, alpha);
    }
}

function drawCouplers() {
    let couplers = couplers1;
    if (toggle.value) couplers = couplers2;

    const LENGTH = SIZE * 0.6;
    const HEIGHT = SIZE / 2;
    noStroke();
    textSize(12);
    for (let i = 0; i < couplers.length; i++) {
        let c = couplers[i];
        let isActive = active == c.type;
        fill(createColor(c.type, isActive));
        if (isActive) {
            strokeWeight(1);
            stroke(0);
        }
        if (i % 2 == 0) {
            quad(c.x, c.y, c.x + LENGTH, c.y + LENGTH, c.x + LENGTH - HEIGHT, c.y + LENGTH + HEIGHT, c.x - HEIGHT, c.y + HEIGHT);
            fill(255);
            noStroke();
            text(String.fromCharCode(c.type + (toggle.value ? 69 : 65)), c.x - HEIGHT * 0.2, c.y + LENGTH * 1.1);
        } else {
            quad(c.x, c.y, c.x + HEIGHT, c.y + HEIGHT, c.x + HEIGHT - LENGTH, c.y + HEIGHT + LENGTH, c.x - LENGTH, c.y + LENGTH);
            fill(255);
            noStroke();
            text(String.fromCharCode(c.type + (toggle.value ? 69 : 65)), c.x - HEIGHT * 0.4, c.y + LENGTH * 1.1);
        }
    }
}

function drawQubits() {
    const HEIGHT = 6;
    fill(130);
    strokeWeight(1);
    stroke(130);

    for (let i = 0; i < qubits.length; i++) {
        let q = qubits[i];
        if (q.useable) {
            quad(q.x, q.y, q.x + SIZE, q.y + SIZE, q.x + SIZE - HEIGHT, q.y + SIZE + HEIGHT, q.x - HEIGHT, q.y + HEIGHT);
            let newX = q.x + SIZE - HEIGHT;
            quad(newX, q.y, newX - SIZE, q.y + SIZE, newX - SIZE + HEIGHT, q.y + SIZE + HEIGHT, newX + HEIGHT, q.y + HEIGHT);
        } else {
            const ARM = (SIZE - HEIGHT) / 2;
            let x = q.x; let y = q.y;
            line(x, y, x += ARM, y += ARM);
            line(x, y, x += ARM, y -= ARM);
            line(x, y, x += HEIGHT, y += HEIGHT);
            line(x, y, x -= ARM, y += ARM);
            line(x, y, x += ARM, y += ARM);
            line(x, y, x -= HEIGHT, y += HEIGHT);
            line(x, y, x -= ARM, y -= ARM);
            line(x, y, x -= ARM, y += ARM);
            line(x, y, x -= HEIGHT, y -= HEIGHT);
            line(x, y, x += ARM, y -= ARM);
            line(x, y, x -= ARM, y -= ARM);
            line(x, y, x += HEIGHT, y -= HEIGHT);
        }
    }
}

class Button {
    constructor(x0, y0, x1, y1, text, onHover) {
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.text = text;
        this.onHover = onHover;
        this.color = color(255);
        this.hoverColor = color(220);
        this.justEntered = true;
    }

    isOver(x, y) {
        return x > this.x0 && x < this.x1 && y > this.y0 && y < this.y1;
    }

    update(x, y) {
        if (this.isOver(x, y)) {
            if (this.justEntered) {
                if (this.onHover != undefined) this.onHover();
                this.drawButton(this.hoverColor);
                this.justEntered = false;
            }
        } else {
            if (!this.justEntered) {
                this.drawButton(this.color);
                active = -1;
                updateSycamore();
                this.justEntered = true;
            }
        }
    }

    drawButton(fillColor) {
        fill(255);
        noStroke();
        rect(this.x0 - 2, this.y0 - 2, this.x1 - this.x0 + 4, this.y1 - this.y0 + 4);
        if (alpha(fillColor) == 255) {
            strokeWeight(1);
            stroke(0);
        }
        fill(fillColor);
        rect(this.x0, this.y0, this.x1 - this.x0, this.y1 - this.y0);
        fill(255);
        strokeWeight(1);
        stroke(255);
        textSize(35);
        text(this.text, this.x0 + 22, this.y0 + 45);
    }
}

class Toggle {
    constructor(x, y, size, value, color, onToggle) {
        this.x0 = x;
        this.y0 = y;
        this.x1 = x + size;
        this.y1 = y + size / 2;
        this.size = size;
        this.value = value;
        this.color = color;
        this.onToggle = onToggle;
    }

    isOver(x, y,) {
        return x > this.x0 && x < this.x1 && y > this.y0 && y < this.y1;
    }

    update(x, y) {
        if (this.isOver(x, y)) {
            this.value = !this.value;
            if (this.onToggle != undefined) this.onToggle();
            this.drawToggle();
        }
    }

    drawToggle() {
        fill(255);
        noStroke();
        rect(this.x0 - 1, this.y0 - 1, this.x1 - this.x0 + 2, this.y1 - this.y0 + 2);

        noFill();
        strokeWeight(1);
        stroke(0);
        let radius = (this.y1 - this.y0) / 2;
        arc(this.x0 + radius, this.y0 + radius, radius * 2, radius * 2, HALF_PI, -HALF_PI);
        arc(this.x1 - radius, this.y0 + radius, radius * 2, radius * 2, -HALF_PI, HALF_PI);
        line(this.x0 + radius, this.y0, this.x1 - radius, this.y0);
        line(this.x0 + radius, this.y1, this.x1 - radius, this.y1);

        let littleRadius = radius * 1.5;
        fill(this.color);
        ellipse(this.value ? this.x1 - radius : this.x0 + radius, this.y0 + radius, littleRadius, littleRadius);
    }
}