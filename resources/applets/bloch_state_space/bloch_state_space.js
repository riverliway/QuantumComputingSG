"use strict";

let theta = 80 * Math.PI / 180;
let phi = 10 * Math.PI / 180;
let axis = "XZ";

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

let debug = true;   // The debug variable is only true for the first run of the drawing function

const RADIAL_SECTORS = 50;

let curves = [];
function createStateSpace(beginTheta, endTheta) {
    const RADIUS = 98;
    const THETA_STEP = 0.1;
    const PHI_STEP = 20;

    function createRing(theta) {
        // Creates a ring of all phis at a specified theta
        let curve = [];
        for (let j = 0; j <= RADIAL_SECTORS; j++) {
            let phi = 2 * Math.PI * j / RADIAL_SECTORS;
            let x = RADIUS * Math.sin(theta) * Math.cos(phi);
            let y = RADIUS * Math.sin(theta) * Math.sin(phi);
            let z = RADIUS * Math.cos(theta);
            curve.push({x:x, y:y, z:z});
        }
        curves.push(curve);
    }

    function createArc(phi) {
        // Creates an arc of all thetas at a specified phi
        let curve = [];
        for (let j = 0; j <= RADIAL_SECTORS; j++) {
            let theta = (endTheta - beginTheta) * j / RADIAL_SECTORS + beginTheta;
            let x = RADIUS * Math.sin(theta) * Math.cos(phi);
            let y = RADIUS * Math.sin(theta) * Math.sin(phi);
            let z = RADIUS * Math.cos(theta);
            curve.push({x:x, y:y, z:z});
        }
        curves.push(curve);
    }

    for (let theta = beginTheta; theta < endTheta; theta += THETA_STEP) {
        createRing(theta);
    }
    createRing(endTheta);


    for (let i = 0; i <= PHI_STEP; i++) {
        let phi = 2 * Math.PI * i / PHI_STEP;
        createArc(phi);
    }
}

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
        let moveX = SENSITIVITY * 150 / HEIGHT;
        let moveY = SENSITIVITY * 80 / HEIGHT;
        p5Object._curCamera._orbit(moveX, moveY, 0);

        createCoordinateLabels();
        createStateSpace(Math.PI * 0.25, Math.PI * 0.75);
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

        configureSlicedSphere();

        drawBlochSphere(theta, phi);

        drawCoordinateLabels();
        debug = false;
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

    function configureSlicedSphere() {
        sketch.push();
        sketch.rotateY(-90);
        sketch.rotateX(90);
        sketch.scale(1, -1, 1);

        let bound;
        let x = Math.sin(theta) * Math.cos(phi);
        let y = Math.sin(theta) * Math.sin(phi);
        let z = Math.cos(theta);

        sketch.noFill();

        if (axis[0] == "X") {
            let r = Math.sqrt(z * z + y * y);
            bound = Math.atan(Math.abs(x) / r);

            sketch.stroke(X_DARK);
            Drawing.ring(sketch, x * RADIUS, 0, 0, 2 * r * RADIUS, sketch.createVector(1, 0, 0));
            if (axis[1] == "Y") {
                sketch.rotateX(90);
            }
        } else if (axis[0] == "Y") {
            let r = Math.sqrt(z * z + x * x);
            bound = Math.atan(Math.abs(y) / r);

            sketch.stroke(Y_DARK);
            Drawing.ring(sketch, 0, y * RADIUS, 0, 2 * r * RADIUS, sketch.createVector(0, 1, 0));
            if (axis[1] == "X") {
                sketch.rotateY(90);
            }
        } else {
            let r = Math.sqrt(y * y + x * x);
            bound = Math.atan(Math.abs(z) / r);

            sketch.stroke(Z_DARK);
            Drawing.ring(sketch, 0, 0, z * RADIUS, 2 * r * RADIUS, sketch.createVector(0, 0, 1));
            if (axis[1] == "X") {
                sketch.rotateY(90);
            } else if (axis[1] == "Y") {
                sketch.rotateX(90);
            }
        }

        drawSlicedSphere(bound, Math.PI - bound);
        sketch.pop();
    }

    function drawSlicedSphere(beginTheta, endTheta) {
        const RHO = RADIUS - 2;
        const THETA_STEP = 0.1;
        const PHI_STEP = 20;

        sketch.push();
        sketch.noFill();
        sketch.stroke(sketch.color(5, 240, 224, 50));

        // Draw rings
        for (let theta = beginTheta + THETA_STEP; theta < endTheta; theta += THETA_STEP) {
            Drawing.ring(sketch, 0, 0, RHO * Math.cos(theta), 2 * RHO * Math.sin(theta), sketch.createVector(0, 0, 1));
        }
        // Draw the ends more prominently
        sketch.stroke(sketch.color(0, 230, 226));
        Drawing.ring(sketch, 0, 0, RHO * Math.cos(beginTheta), 2 * RHO * Math.sin(beginTheta), sketch.createVector(0, 0, 1));
        Drawing.ring(sketch, 0, 0, RHO * Math.cos(endTheta), 2 * RHO * Math.sin(endTheta), sketch.createVector(0, 0, 1));

        if (Math.abs(beginTheta - endTheta) < 0.01) {
            // If the bounds are similar, don't bother drawing the arcs
            sketch.pop();
            return;
        }

        // Draw arcs
        sketch.stroke(sketch.color(5, 240, 224, 50));
        sketch.angleMode(sketch.RADIANS);
        for (let i = 0; i < PHI_STEP; i++) {
            let phi = 2 * Math.PI * i / PHI_STEP;
            Drawing.arc(sketch, 0, 0, 0, 2 * RHO, sketch.createVector(Math.cos(phi), Math.sin(phi), 0), beginTheta, endTheta);
        }
        sketch.angleMode(sketch.DEGREES);
        
        sketch.pop();
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
        sketch.push();
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
        sketch.pop();
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

    function linedash(x1, y1, z1, x2, y2, z2, segments) {
        let xDiff = x2 - x1; let yDiff = y2 - y1; let zDiff = z2 - z1;
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
    let radioButtons;

    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);
        
        bobbleBox = new BobbleBox(sketch, 100, 10, 200, 100);

        bobbleBox.onMove = () => {
            let values = bobbleBox.getValues();
            theta = values.y / 100 * Math.PI;
            phi = values.x / 100 * Math.PI;
            bobbleBox.xAxisName = "ϕ = " + sketch.degrees(phi).toFixed(2) + "°";
            bobbleBox.yAxisName = "θ = " + sketch.degrees(theta).toFixed(2) + "°";
        }

        bobbleBox.onPreDraw = () => {
            sketch.noStroke();
            sketch.fill(POINT_COLOR);
            // sketch.rect(170, 50, 25 ,25);
        }

        bobbleBox.setOrientation(1, -1);
        bobbleBox.setColors(sketch.color(0, 0, 0, 0));
        bobbleBox.setValues(phi / Math.PI * 100, theta / Math.PI * 100);
        bobbleBox.setAxes(true, "ϕ", "θ", PHI_DARK, THETA_DARK);
        bobbleBox.onMove();
        bobbleBox.update();

        setupButtons();
    }

    function setupButtons() {
        sketch.textSize(18);
        let buttonXY = new Button(sketch, 500, 40, 50, 50, "XY");
        let buttonXZ = new Button(sketch, 500, 105, 50, 50, "XZ");
        let buttonYX = new Button(sketch, 565, 40, 50, 50, "YX");
        let buttonYZ = new Button(sketch, 565, 105, 50, 50, "YZ");
        let buttonZX = new Button(sketch, 630, 40, 50, 50, "ZX");
        let buttonZY = new Button(sketch, 630, 105, 50, 50, "ZY");
        radioButtons = new RadioButtonSet([buttonXY, buttonXZ, buttonYX, buttonYZ, buttonZX, buttonZY]);
        radioButtons.setSelectedIndex(1);
        radioButtons.onSelect = () => {
            axis = radioButtons.getSelectedText();
        }
    }

    extendMouseAPI(sketch);
}

let bottomP5 = new p5(bottomCanvas);