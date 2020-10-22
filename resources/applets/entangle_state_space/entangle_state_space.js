"use strict";

const SECTORS = 15;
const STEP_SIZE = 1 / 15;
const SCALE = 150;

const topCanvas = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 500;

    const SENSITIVITY = 1.2;

    let p5Object;

    sketch.setup = () => {
        p5Object = sketch.createCanvas(WIDTH, HEIGHT, sketch.WEBGL);
        sketch.angleMode(sketch.DEGREES);

        // Change the original camera angle
        let moveX = SENSITIVITY * 100 / HEIGHT;
        let moveY = SENSITIVITY * 50 / HEIGHT;
        p5Object._curCamera._orbit(moveX, moveY, 0);

        // createPoints();
        createCurves();
    }

    let points = [];

    function createPoints() {
        for (let i = 0; i <= 1; i += 1 / SECTORS) {
            for (let j = 0; j <= 1; j += 1 / SECTORS) {
                points.push(createPoint(i * Math.PI, j * Math.PI));
            }
        }
    }

    let curves1;
    let curves2;
    let curves3;
    function createCurves() {
        function create(cnot, color) {
            let curves = [];
            for (let i = 0; i <= 1; i += 1 / SECTORS) {
                let curve1 = [];
                let curve2 = [];
                for (let j = 0; j <= 1 / STEP_SIZE; j++) {
                    curve1.push(createPoint(i * Math.PI, j * Math.PI * STEP_SIZE, cnot));
                    curve2.push(createPoint(j * Math.PI * STEP_SIZE, i * Math.PI, cnot));
                }
                curves.push(curve1);
                curves.push(curve2);
            }
            return {c:curves, color:color};
        }

        curves1 = create(0, "red");
        // curves2 = create(1, "red");
        // curves3 = create(2, "red");
    }

    function createPoint(top, bottom, cnot) {
        if (cnot == 0) {
            let _x = Math.cos(bottom / 2) * Math.cos(top / 2);
            let _y = Math.cos(bottom / 2) * Math.sin(top / 2);
            let _z = Math.sin(bottom / 2) * Math.cos(top / 2);
            return {x:_x, y:_y, z:_z};
        }
        if (cnot == 1) {
            // Control above target
            let _x = Math.cos(bottom / 2) * Math.cos(top / 2);
            let _y = Math.sin(bottom / 2) * Math.sin(top / 2);
            let _z = Math.sin(bottom / 2) * Math.cos(top / 2);
            return {x:_x, y:_y, z:_z};
        }
        // Target above control
        let _x = Math.cos(bottom / 2) * Math.cos(top / 2);
        let _y = Math.cos(bottom / 2) * Math.sin(top / 2);
        let _z = Math.sin(bottom / 2) * Math.sin(top / 2);
        return {x:_x, y:_y, z:_z};
    }

    sketch.draw = () => {
        sketch.background(255);
        sketch.orbitControl(SENSITIVITY, SENSITIVITY, 0.3);
        // Set the coordinate axis to the math one instead of the graphics one
        sketch.rotateY(-90);
        sketch.rotateX(90);
        sketch.scale(SCALE, -SCALE, SCALE);

        drawAxes();
        // drawPoints();
        if (curves1 != undefined) drawCurves(curves1);
        if (curves2 != undefined) drawCurves(curves2);
        if (curves3 != undefined) drawCurves(curves3);
    }

    function drawAxes() {
        sketch.push();

        sketch.noFill();
        sketch.stroke(120);
        sketch.line(0, 0, 0, 1.5, 0, 0);
        sketch.line(0, 0, 0, 0, 1.5, 0);
        sketch.line(0, 0, 0, 0, 0, 1.5);

        sketch.pop();
    }

    function drawPoints() {
        sketch.push();

        sketch.fill("red");
        sketch.noStroke();
        for (let i = 0; i < points.length; i++) {
            sketch.push();

            let p = points[i];
            sketch.translate(p.x, p.y, p.z);
            sketch.sphere(0.01);

            sketch.pop();
        }

        sketch.pop();
    }

    function drawCurves(curves) {
        sketch.push();
        sketch.noFill();
        sketch.strokeWeight(1);
        sketch.stroke(curves.color);
        let lines = curves.c;
        for (let c = 0; c < lines.length; c++) {
            let curve = lines[c];
            for (let i = 0; i < curve.length - 1; i++) {
                let p1 = curve[i];
                let p2 = curve[i + 1];
                sketch.line(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
            }
        }
        sketch.pop();
    }
}

let topP5 = new p5(topCanvas);
