"use strict";

let theta = 45 * Math.PI / 180;
let phi = 60 * Math.PI / 180;

let THETA_COLOR = rgb(161, 10, 242);
let THETA_DARK = rgb(99, 7, 148);
let PHI_COLOR = rgb(242, 107, 10);
let PHI_DARK = rgb(209, 72, 4);
let X_COLOR = rgb(255, 117, 117);
let X_DARK = rgb(224, 22, 22);
let Y_COLOR = rgb(102, 222, 130);
let Y_DARK = rgb(4, 207, 51);
let Z_COLOR = rgb(108, 175, 230);
let Z_DARK = rgb(39, 152, 245);
let POINT_COLOR = rgb(5, 240, 224);
let POINT_DARK = rgb(5, 150, 129);

let RADIAL_SECTORS = 50;

const topCanvas = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 350;

    const RADIUS = 100;
    const SENSITIVITY = 1.2;

    let p5Object;

    // TODO: remove quantum sim js dependency if not needed

    sketch.setup = () => {
        p5Object = sketch.createCanvas(WIDTH, HEIGHT, sketch.WEBGL);
        sketch.angleMode(sketch.DEGREES);

        // Change the original camera angle
        let moveX = SENSITIVITY * 100 / HEIGHT;
        let moveY = SENSITIVITY * 50 / HEIGHT;
        p5Object._curCamera._orbit(moveX, moveY, 0);

        createCoordinateLabels();
    }

    let COORDINATE_LABEL_SIZE = 120;
    let coordinateLables = [];

    function createCoordinateLabels() {
        // WEBGL does not like drawing text, so we draw it onto textures first
        // The coordinateLabels array is a lambda which will return a graphic
        // Pass in the transparancy to the lambda as a parameter
        // For efficency reasons, we are just wiping and re-drawing the graphics rather than re-creating them

        sketch.push();

        let labels = ["X", "Y", "Z"];
        let colors = [X_DARK, Y_DARK, Z_DARK];
        let graphics = [];
        let alphas = [];

        for (let i = 0; i <= 2; i++) {
            alphas[i] = 0;
            graphics[i] = sketch.createGraphics(COORDINATE_LABEL_SIZE, COORDINATE_LABEL_SIZE);
            coordinateLables[i] = (alpha) => {
                // If the alpha is the same, don't bother re-drawing, just return the already drawn graphic
                if (alphas[i] == alpha) return graphics[i];

                // Wipe the previous drawing
                graphics[i].erase();
                graphics[i].rect(0, 0, COORDINATE_LABEL_SIZE, COORDINATE_LABEL_SIZE);
                graphics[i].noErase();

                // Draw the text with the alpha provided
                graphics[i].textFont("Helvitica");
                graphics[i].noStroke();
                graphics[i].fill(colors[i][0], colors[i][1], colors[i][2], alpha);
                graphics[i].textAlign(sketch.CENTER, sketch.CENTER);
                graphics[i].textSize(COORDINATE_LABEL_SIZE / 3);
                graphics[i].text(labels[i], COORDINATE_LABEL_SIZE / 2, COORDINATE_LABEL_SIZE / 2);

                return graphics[i];
            }
        }

        sketch.pop();
    }

    let isDrag = false;

    sketch.draw = () => {
        sketch.background(255);
        if (isDrag) {
            sketch.orbitControl(SENSITIVITY, SENSITIVITY, 0.3);
            sketch.cursor("grab");
        } else {
            sketch.cursor(sketch.HAND);
        }

        drawBlochSphere(theta, phi);

        drawCoordinateLabels();
    }

    sketch.mousePressed = () => {
        // Only allow dragging if mouse was pressed in this sketch
        if (sketch.mouseX > 0 && sketch.mouseY > 0 && sketch.mouseX < WIDTH && sketch.mouseY < HEIGHT) {
            isDrag = true;
        }
    }

    sketch.mouseReleased = () => {
        isDrag = false;
    }

    function drawBlochSphere(theta, phi) {
        if (phi < 0) phi += 2 * Math.PI;
        sketch.push();

        // Draw reference circles
        sketch.noFill();
        sketch.stroke(120);
        sketch.ellipse(0, 0, 2 * RADIUS, 2 * RADIUS, RADIAL_SECTORS);
        sketch.rotateY(90);
        sketch.ellipse(0, 0, 2 * RADIUS, 2 * RADIUS, RADIAL_SECTORS);
        sketch.rotateX(90);
        sketch.ellipse(0, 0, 2 * RADIUS, 2 * RADIUS, RADIAL_SECTORS);

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
        if (phi > 0.001 && phi < 2 * Math.PI - 0.001) sketch.arc(0, 0, RADIUS / 2, RADIUS / 2, 180 - sketch.degrees(phi), 180);
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

        sketch.pop();

        let camera = getCameraPos();
        // drawOrthoCircle(camera.x, camera.y, camera.z);
    }

    function drawCoordinateLabels() {
        let camera = getCameraPos();
        let r = Math.sqrt(camera.x * camera.x + camera.y * camera.y + camera.z * camera.z);
        let DISTANCE = 1.7 * RADIUS;

        function transparency(camera, position) {
            let x = camera.x - position.x / DISTANCE * r;
            let y = camera.y - position.y / DISTANCE * r;
            let z = camera.z - position.z  /DISTANCE * r;
            let dist = Math.sqrt(x * x + y * y + z * z);
            dist = Math.round(dist * dist * 0.02);
            if (dist > 255) dist = 255;
            return dist;
        }

        sketch.noStroke();

        let xPos = {x:0, y:0, z:DISTANCE};
        let yPos = {x:DISTANCE, y:0, z:0};
        let zPos = {x:0, y:-DISTANCE, z:0};

        function drawLabel(lambda, pos) {
            sketch.push();
            sketch.texture(lambda(transparency(camera, pos)));
            sketch.translate(pos.x, pos.y, pos.z);
            rotateBillboard(camera, pos);
            sketch.plane(COORDINATE_LABEL_SIZE / 2, COORDINATE_LABEL_SIZE / 2);
            sketch.pop();
        }

        drawLabel(coordinateLables[0], xPos);
        drawLabel(coordinateLables[1], yPos);
        drawLabel(coordinateLables[2], zPos);
    }

    function rotateBillboard(camera, position) {
        let x = camera.x - position.x;
        let y = camera.y - position.y;
        let z = camera.z - position.z;

        let previousAngleMode = sketch._angleMode;
        sketch.angleMode(sketch.RADIANS);

        let r = Math.sqrt(x * x + z * z);
        let theta = Math.asin(x / r);
        if (z < 0) {
            theta = 2 * Math.PI - theta;
            theta += Math.PI;
        }
        sketch.rotateY(theta);

        let rho = Math.sqrt(x * x + y * y + z * z);
        theta = Math.acos(r / rho);
        if (y > 0) theta = 2 * Math.PI - theta;
        sketch.rotateX(theta);

        sketch.angleMode(previousAngleMode);
    }

    function dist(point1, point2) {
        let dx = point1.x - point2.x;
        let dy = point1.y - point2.y;
        let dz = point1.z - point2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
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

    function getCameraPos() {
        return {x: p5Object._curCamera.eyeX, y: p5Object._curCamera.eyeY, z: p5Object._curCamera.eyeZ};
    }
}

let topP5 = new p5(topCanvas);

let bottomCanvas = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 150;

    let bobbleBox;

    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);
        
        bobbleBox = new BobbleBox(sketch, 50, 40, 200, 100);
        bobbleBox.setValues(phi / Math.PI * 100, theta / Math.PI * 100);
        bobbleBox.setAxes(true, "ϕ", "θ", PHI_DARK, THETA_DARK);

        bobbleBox.onMove = () => {
            let values = bobbleBox.getValues();
            theta = values.y / 100 * Math.PI;
            phi = values.x / 100 * Math.PI;
        }
    }

    extendMouseAPI(sketch);
}

let bottomP5 = new p5(bottomCanvas);