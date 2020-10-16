"use strict";

let theta = Math.PI / 4;
let phi = Math.PI / 6;
let delta = 0;
let axis = "X";
let newAngles = getPostRotatedCoords(theta, phi, delta, axis);

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

    sketch.setup = () => {
        p5Object = sketch.createCanvas(WIDTH, HEIGHT, sketch.WEBGL);
        sketch.angleMode(sketch.DEGREES);

        // Change the original camera angle
        let moveX = SENSITIVITY * 50 / HEIGHT;
        let moveY = SENSITIVITY * 70 / HEIGHT;
        p5Object._curCamera._orbit(moveX, moveY, 0);

        console.log(p5Object._curCamera);
    }

    let isDrag = false;

    sketch.draw = () => {
        if (sketch.mouseX > 0 && sketch.mouseY > 0 && sketch.mouseX < WIDTH && sketch.mouseY < HEIGHT) {
            if (sketch.mouseIsPressed) {
                sketch.cursor("grab");
            } else {
                sketch.cursor(sketch.HAND);
            }
        }

        sketch.background(255);
        if (isDrag) {
            sketch.orbitControl(SENSITIVITY, SENSITIVITY, 0.3);
        }
        drawRotation(theta, phi, delta, axis);

        

        drawBlochSphere(newAngles.theta, newAngles.phi);
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
        if (delta > 0.001 && delta < 2 * Math.PI - 0.001) {
            if (axis == "X") {
                sketch.fill(X_DARK);
            } else if (axis == "Y") {
                sketch.fill(Y_DARK);
            } else {
                sketch.fill(Z_DARK);
            }
        } else {
            sketch.fill(POINT_DARK);
        }
        sketch.rotateY(sketch.degrees(phi));
        sketch.rotateX(-90);
        sketch.translate(-xPos, yPos, zPos);
        sketch.sphere(3);

        sketch.pop();

        let camera = getCameraPos();
        // drawOrthoCircle(camera.x, camera.y, camera.z);
    }

    function drawOrthoCircle(x, y, z) {
        // Draws a circle on the sphere which is orthogonal to the given coordiantes
        sketch.push();

        // sketch.stroke(120);
        sketch.noStroke();
        sketch.fill(sketch.color(0, 0, 0, 10));

        // Project the camera onto the YZ plane to find the X rotation
        let radius = Math.sqrt(y * y + z * z);
        let x_angle = Math.acos(z / radius);
        if (y > 0) x_angle = -x_angle;
        sketch.rotateX(sketch.degrees(x_angle));
        

        // Project the camera onto the XZ plane to find the Y rotation
        radius = Math.sqrt(x * x + z * z);
        let y_angle = Math.acos(z / radius);
        if (x < 0) y_angle = -y_angle;
        if (Math.abs(x) < 0.001 && Math.abs(z) < 0.001) y_angle = 0;
        sketch.rotateY(sketch.degrees(y_angle));

        sketch.ellipse(0, 0, 2 * RADIUS, 2 * RADIUS, RADIAL_SECTORS);

        sketch.pop();
    }

    function drawRotation(theta, phi, delta, axis) {
        // Calculate coordinate location
        let qubitPoint = getEuclideanPoint(theta, phi);
        let axisPoint = getAxisIntersecPoint(qubitPoint, axis);

        // Draw ring of rotation
        sketch.push()
        sketch.noFill();
        sketch.stroke(POINT_COLOR);

        switch (axis) {
            case "X": sketch.translate(0, 0, RADIUS * axisPoint.x); break;
            case "Y": sketch.rotateY(90); sketch.translate(0, 0, RADIUS * axisPoint.y); break;
            case "Z": sketch.rotateX(90); sketch.translate(0, 0, RADIUS * axisPoint.z); break;
        }

        let diameter = 2 * RADIUS * dist(qubitPoint, axisPoint);
        sketch.ellipse(0, 0, diameter, diameter, RADIAL_SECTORS);

        // Draw arc of rotation
        sketch.stroke(POINT_DARK);
        sketch.strokeWeight(3);
        if (delta > 0.001 && delta < 2 * Math.PI - 0.001) {
            let angle = getAxisAngle(qubitPoint, axis);
            sketch.angleMode(sketch.RADIANS);
            sketch.arc(0, 0, diameter, diameter, 2 * Math.PI - angle - delta, 2 * Math.PI - angle, sketch.OPEN, RADIAL_SECTORS);
            sketch.angleMode(sketch.DEGREES);
        }

        sketch.pop();
        sketch.push();

        if (delta > 0.001 && delta < 2 * Math.PI - 0.001) {
            // Draw original vector
            sketch.stroke(0);
            sketch.line(0, 0, 0, RADIUS * qubitPoint.y, RADIUS * -qubitPoint.z, RADIUS * qubitPoint.x);

            // Draw rotation point
            sketch.noStroke();
            sketch.fill(POINT_DARK);
            sketch.translate(RADIUS * qubitPoint.y, RADIUS * -qubitPoint.z, RADIUS * qubitPoint.x);
            sketch.sphere(3);
        }

        sketch.pop();
    }

    function getAxisAngle(euclideanPoint, axis) {
        // Returns the angle the point is from an axis
        let distance1, distance2;
        switch(axis) {
            case "X": distance1 = euclideanPoint.y; distance2 = euclideanPoint.z; break;
            case "Y": distance1 = -euclideanPoint.x; distance2 = euclideanPoint.z; break;
            case "Z": distance1 = euclideanPoint.y; distance2 = -euclideanPoint.x; break;
        }

        let radius = dist(euclideanPoint, getAxisIntersecPoint(euclideanPoint, axis));

        let angle = Math.acos(distance1 / radius);
        if (distance2 < 0) return -angle;
        return angle; 
    }

    function getEuclideanPoint(theta, phi) {
        return {x: Math.sin(theta) * Math.cos(phi), y:Math.sin(theta) * Math.sin(phi), z:Math.cos(theta)};
    }

    function getAxisIntersecPoint(point, axis) {
        switch (axis) {
            case "X": return {x:point.x, y:0, z:0};
            case "Y": return {x:0, y:point.y, z:0};
            case "Z": return {x:0, y:0, z:point.z};
            default: console.log("Error: invalid axis passed into getAxisIntersecPoint(): " + axis);
        }
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

    let qubitSlider;
    let rotationSlider;
    let buttonX;
    let buttonY;
    let buttonZ;
    let radioSet;
    let thetaLabel;
    let phiLabel;
    let deltaLabel;

    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);
        sketch.textSize(18);

        qubitSlider = new QubitSlider(sketch, 200, 70);
        rotationSlider = new ArcSlider(sketch, 600, 70, 30, 0, 360);
        rotationSlider.setValue(270);

        buttonX = new Button(sketch, 330, 100, 50, 50, "X");
        buttonY = new Button(sketch, 400, 100, 50, 50, "Y");
        buttonZ = new Button(sketch, 470, 100, 50, 50, "Z");
        colorAxisButtons();
        
        radioSet = new RadioButtonSet([buttonX, buttonY, buttonZ]);
        radioSet.onSelect = () => {
            axis = String.fromCharCode("X".charCodeAt(0) + radioSet.getSelectedIndex());
            delta = 0;
            rotationSlider.setValue(270);
        }

        thetaLabel = new Label(sketch, 330, 20, "theta", 16);
        phiLabel = new Label(sketch, 330, 40, "phi", 16);
        deltaLabel = new Label(sketch, 470, 20, "delta", 16);

        qubitSlider.setValues(sketch.degrees(theta), sketch.degrees(phi));
        qubitSlider.onMove = () => {
            let values = qubitSlider.getValues();
            theta = sketch.radians(values.theta);
            phi = sketch.radians(values.phi);
            delta = 0;
            rotationSlider.setValue(270);

            newAngles = getPostRotatedCoords(theta, phi, delta, axis);

            thetaLabel.setText("θ = " + values.theta.toFixed(2) + "°");
            phiLabel.setText("ϕ = " + values.phi.toFixed(2) + "°");
        }
        qubitSlider.onMove();
        qubitSlider.thetaSlider.setColors(THETA_COLOR, THETA_DARK);
        qubitSlider.phiSlider.setColors(PHI_COLOR, PHI_DARK);

        rotationSlider.onMove = () => {
            delta = rotationSlider.getValue() - 270;
            let deltaDeg = 360 - delta;
            if (deltaDeg < 0) deltaDeg += 360;
            if (deltaDeg >= 360) deltaDeg -= 360;
            delta = sketch.radians(deltaDeg);

            newAngles = getPostRotatedCoords(theta, phi, delta, axis);
            let phiDeg = sketch.degrees(newAngles.phi);
            if (phiDeg < 0) phiDeg += 360;
            if (phiDeg >= 360) phiDeg -= 360;

            deltaLabel.setText("Δ = " + deltaDeg.toFixed(2) + "°");
            thetaLabel.setText("θ = " + sketch.degrees(newAngles.theta).toFixed(2) + "°");
            phiLabel.setText("ϕ = " + phiDeg.toFixed(2) + "°");
        }
        rotationSlider.onMove();

        rotationSlider.setColors(POINT_COLOR, POINT_DARK);
    }

    function colorAxisButtons() {
        buttonX.normalColor = X_COLOR;
        buttonX.hoverColor = X_DARK;
        buttonX.textColor = sketch.color(0, 0, 0);
        buttonX.borderColor = sketch.color(0, 0, 0);
        buttonX.update();

        buttonY.normalColor = Y_COLOR;
        buttonY.hoverColor = Y_DARK;
        buttonY.textColor = sketch.color(0, 0, 0);
        buttonY.borderColor = sketch.color(0, 0, 0);
        buttonY.update();

        buttonZ.normalColor = Z_COLOR;
        buttonZ.hoverColor = Z_DARK;
        buttonZ.textColor = sketch.color(0, 0, 0);
        buttonZ.borderColor = sketch.color(0, 0, 0);
        buttonZ.update();
    }

    extendMouseAPI(sketch);
}

let bottomP5 = new p5(bottomCanvas);

function getPostRotatedCoords(theta, phi, delta, axis) {
    let state = new QuantumState(1);
    state.setAngles({theta:theta, phi:phi});
    
    switch (axis) {
        case "X": state.x(0, delta); break;
        case "Y": state.y(0, delta); break;
        case "Z": state.z(0, delta); break;
        default: console.log("Error: invalid axis passed into getPostRotatedCoords(): " + axis);
    }

    return state.getAngles();
}