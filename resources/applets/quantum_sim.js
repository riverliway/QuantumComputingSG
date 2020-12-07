"use strict";

class StaticGate {
    // Once inserted, the user has no control over static gates
    constructor(sketch, row, col, axis, delta) {
        this.gateType = "staticRotation";
        this.circuit = undefined;
        this.sketch = sketch;
        this.row = row;
        this.col = col;
        this.axis = axis;
        this.delta = delta;
    }

    _doDraw(x, y, size) {
        // Draw square
        this.sketch.fill(this.getFillColor(this.axis));
        this.sketch.stroke(this.getOutlineColor(this.axis));
        this.sketch.strokeWeight(2);
        let half = size / 2;
        this.sketch.rect(x - half, y - half, size, size);

        // Draw text
        this.sketch.fill(0);
        this.sketch.stroke(0);
        this.sketch.strokeWeight(0);
        this.sketch.textSize(size * 0.35);
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
        if (this.delta == undefined || this.delta == "") {
            this.sketch.text(this.axis, x, y);
        } else {
            this.sketch.text(this.axis, x - 5, y + 5);
            this.sketch.textSize(size * 0.15);
            let content = (typeof this.delta == "string") ? this.delta : this.delta.toFixed(2);
            this.sketch.text(content, x + 10, y - 14);
        }
    }

    getFillColor(axis) {
        switch (axis) {
            case "X": return [255, 122, 122];
            case "Y": return [138, 219, 140];
            case "Z": return [139, 212, 224];
            default: return 255;
        }
    }

    getOutlineColor(axis) {
        switch (axis) {
            case "X": return [158, 5, 5];
            case "Y": return [21, 158, 78];
            case "Z": return [61, 123, 217];
            default: return 0;
        }
    }

    setCircuit(circuit) {
        this.circuit = circuit;
    }
}

class StaticCnot {
    constructor(sketch, col, controls, target) {
        // Controls is an array of indexes which to control on
        this.gateType = "cnot";
        this.circuit = undefined;
        this.sketch = sketch;
        this.col = col;
        this.controls = controls;
        this.target = target;
        this.row = target;
        this.minControl = Math.min(Math.min(...controls), target);
        this.maxControl = Math.max(Math.max(...controls), target)
    }

    _doDraw(x, y, size) {
        // The x and y passed in are the position of the target gate, not the controls

        const CONTROL_RADIUS = size * 0.2;

        // Draw controls
        this.sketch.fill(0);
        this.sketch.stroke(0);
        this.sketch.strokeWeight(0);
        for (let i = 0; i < this.controls.length; i++) {
            this.sketch.circle(x, this._createY(this.controls[i], y), CONTROL_RADIUS);
        }

        // Draw target
        this.sketch.noFill();
        this.sketch.strokeWeight(2);
        const TARGET_RADIUS = CONTROL_RADIUS * 1.7;
        this.sketch.circle(x, y, 2 * TARGET_RADIUS);
        this.sketch.line(x - TARGET_RADIUS, y, x + TARGET_RADIUS, y);
        this.sketch.line(x, y - TARGET_RADIUS, x, y + TARGET_RADIUS);

        // Draw connecting line
        this.sketch.line(x, this._createY(this.minControl, y), x, this._createY(this.maxControl, y));
    }

    _createY(index, y) {
        return (index - this.target) * this.circuit.SCALE + y;
    }

    setCircuit(circuit) {
        this.circuit = circuit;
    }
}

class StaticCZ {
    constructor(sketch, col, control, target) {
        this.gateType = "cz";
        this.circuit = undefined;
        this.sketch = sketch;
        this.col = col;
        this.control = control;
        this.target = target;
        this.row = control;
    }

    _doDraw(x, y, size) {
        const CONTROL_RADIUS = size * 0.2;

        // Draw controls
        this.sketch.fill(0);
        this.sketch.stroke(0);
        this.sketch.strokeWeight(0);
        this.sketch.circle(x, y, CONTROL_RADIUS);
        let ty = (this.target - this.control) * this.circuit.SCALE + y;
        this.sketch.circle(x, ty, CONTROL_RADIUS);

        // Draw connecting line
        this.sketch.strokeWeight(2);
        this.sketch.line(x, y, x, ty);
    }

    setCircuit(circuit) {
        this.circuit = circuit;
    }
}

class StaticCU {
    constructor(sketch, col, control, target, axis, exp) {
        this.gateType = "cu";
        this.circuit = undefined;
        this.sketch = sketch;
        this.col = col;
        this.control = control;
        this.target = target;
        this.row = control;
        this.axis = axis;
        this.exp = exp;
        this.fillColor = sketch.color(255);
        this.outlineColor = sketch.color(0);
    }

    _doDraw(x, y, size) {
        const CONTROL_RADIUS = size * 0.2;

        // Draw control
        this.sketch.fill(0);
        this.sketch.stroke(0);
        this.sketch.strokeWeight(0);
        this.sketch.circle(x, y, CONTROL_RADIUS);

        // Draw connecting line
        this.sketch.strokeWeight(2);
        let half = size / 2;
        let line_extension = (this.control < this.target) ? half : -half;
        let ty = (this.target - this.control) * this.circuit.SCALE + y;
        this.sketch.line(x, y, x, ty - line_extension);

        // Draw square
        this.sketch.fill(this.fillColor);
        this.sketch.stroke(this.outlineColor);
        y = ty;
        this.sketch.rect(x - half, y - half, size, size);

        // Draw text
        this.sketch.fill(0);
        this.sketch.stroke(this.outlineColor);
        this.sketch.strokeWeight(0);
        this.sketch.textSize(size * 0.35);
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
        if (this.exp == undefined || this.exp == "") {
            this.sketch.text(this.axis, x, y);
        } else {
            this.sketch.text(this.axis, x - 5, y + 5);
            this.sketch.textSize(size * 0.15);
            let content = (typeof this.exp == "string") ? this.exp : this.exp.toFixed(2);
            this.sketch.text(content, x + 10, y - 14);
        }
    }

    setCircuit(circuit) {
        this.circuit = circuit;
    }

    setColors(fillColor, outlineColor) {
        this.fillColor = fillColor;
        this.outlineColor = outlineColor;
    }
}

class StaticSWAP {
    constructor(sketch, col, qubit1, qubit2) {
        this.gateType = "swap";
        this.circuit = undefined;
        this.sketch = sketch;
        this.col = col;
        this.qubit1 = qubit1;
        this.qubit2 = qubit2;
        this.row = qubit1;
    }

    _doDraw(x, y, size) {
        const LENGTH = size * 0.2;

        // Draw first cross
        this.sketch.fill(0);
        this.sketch.stroke(0);
        this.sketch.strokeWeight(2);
        this.sketch.line(x - LENGTH, y - LENGTH, x + LENGTH, y + LENGTH);
        this.sketch.line(x + LENGTH, y - LENGTH, x - LENGTH, y + LENGTH);

        // Draw second cross
        let ty = (this.qubit2 - this.qubit1) * this.circuit.SCALE + y;
        this.sketch.line(x - LENGTH, ty - LENGTH, x + LENGTH, ty + LENGTH);
        this.sketch.line(x + LENGTH, ty - LENGTH, x - LENGTH, ty + LENGTH);

        // Draw connecting line
        this.sketch.line(x, y, x, ty);
    }

    setCircuit(circuit) {
        this.circuit = circuit;
    }
}

class RotatingGate {
    // Spawns an arc slider which the user can use to change the value of delta
    constructor(sketch, row, col, axis, delta) {
        this.gateType = "rotating";
        this.circuit = undefined;
        this.sketch = sketch;
        this.row = row;
        this.col = col;
        this.axis = axis;
        this.delta = delta;

        this.slider = undefined;
    }

    _doDraw(x, y, size) {
        if (this.slider == undefined) this._buildSlider(x, y, size);

        // Draw square
        this.sketch.fill(this.getFillColor(this.axis));
        this.sketch.stroke(this.getOutlineColor(this.axis));
        this.sketch.strokeWeight(2);
        let half = size / 2;
        this.sketch.rect(x - half, y - half, size, size);

        // Draw text
        this.sketch.fill(0);
        this.sketch.stroke(0);
        this.sketch.strokeWeight(0);
        this.sketch.textSize(size * 0.35);
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
        this.sketch.text(this.axis, x - 7, y + 7);
        this.sketch.textSize(size * 0.15);
        this.sketch.text(this.delta.toFixed(2), x + 8, y - 8);

        this.slider.update();
    }

    _buildSlider(x, y, size) {
        this.slider = new ArcSlider(this.sketch, x, y, size * 0.43, 0, 360, 270 - this.delta * 180);

        // We've already cleaned in the QuantumCircuit class before the draw function is called
        this.slider.clean = undefined;
        this.slider.onMove = () => {
            let value = 270 - this.slider.getValue();
            if (value < 0) value += 360;
            if (value >= 360) value -= 360;
            this.delta = value / 180;
            this.circuit.update();
        }
        this.slider.onHover = () => this.circuit.update();
        this.slider.onUnHover = () => this.circuit.update();
        this.slider.onRelease = () => this.circuit.update();
        this.circuit.update();
    }

    getFillColor(axis) {
        switch (axis) {
            case "X": return [255, 122, 122];
            case "Y": return [138, 219, 140];
            case "Z": return [139, 212, 224];
        }
    }

    getOutlineColor(axis) {
        switch (axis) {
            case "X": return [158, 5, 5];
            case "Y": return [21, 158, 78];
            case "Z": return [61, 123, 217];
        }
    }

    setCircuit(circuit) {
        this.circuit = circuit;
    }
}

class QuantumCircuit {
    // DEPENDENCY: ui.js

    constructor(sketch, numQubits, x, y) {
        this.SCALE = 85;
        this.sketch = sketch;
        this.numQubits = numQubits;
        this.x = x;
        this.y = y;

        // The circuit variable is an array of columns in the circuit, each column may contain zero or more gates
        this.circuit = [[]];

        this.labels = [];
    }

    clean() {
        this.sketch.erase();
        this.sketch.noStroke();
        this.sketch.rect(this.bbox.x1, this.bbox.y1, this.bbox.x2 - this.bbox.x1, this.bbox.y2 - this.bbox.y1);
        this.sketch.noErase();
    }

    _drawLabels() {
        this.sketch.fill(0);
        this.sketch.stroke(0);
        this.sketch.strokeWeight(0);

        this.sketch.textSize(this.SCALE * 0.3);
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);

        for (let i = 0; i < this.labels.length; i++) {
            this.sketch.text(this.labels[i], this.x + this.SCALE / 2, this.y + this.SCALE * (i + 1) - 1);
        }
    }

    _drawWires() {
        this.sketch.stroke(30);
        this.sketch.noFill();
        this.sketch.strokeWeight(1);
        for (let i = 0; i < this.numQubits; i++) {
            this.sketch.line(this.x + this.SCALE, this.y + this.SCALE * (i + 1), this.x + this.SCALE * (this.circuit.length + 2), this.y + this.SCALE * (i + 1));
        }
    }

    _doDraw() {
        this._drawLabels();
        this._drawWires();
        for (let i = 0; i < this.circuit.length; i++) {
            if (this.circuit[i] == undefined) continue;
            for (let j = 0; j < this.circuit[i].length; j++) {
                if (this.circuit[i][j] != undefined) {
                    this.circuit[i][j]._doDraw(this.x + (i + 2) * this.SCALE, this.y + (j + 1) * this.SCALE, this.SCALE * 0.8);
                }
            }
        }
    }

    update() {
        this.updateBoundingBox();
        this.sketch.push();
        this.clean();

        if (this.onPreDraw != undefined) this.onPreDraw();
        this._doDraw();
        if (this.onPostDraw != undefined) this.onPostDraw();
        if (this._onStateUpdate != undefined) this._onStateUpdate();

        this.sketch.pop();
    }

    addGate(gate) {
        if (gate.col >= this.circuit.length) {
            for (let i = this.circuit.length; i <= gate.col; i++) {
                this.circuit[i] = [];
            }
        }
        gate.setCircuit(this);
        this.circuit[gate.col][gate.row] = gate;
    }

    addStaticGate(col, row, axis, delta) {
        let staticGate = new StaticGate(this.sketch, row, col, axis, delta);
        this.addGate(staticGate);
    }

    addStaticCnot(col, control, target) {
        let cnot = new StaticCnot(this.sketch, col, [control], target);
        this.addGate(cnot);
    }

    addStaticToffoli(col, control1, control2, target) {
        let toff = new StaticCnot(this.sketch, col, [control1, control2], target);
        this.addGate(toff);
    }

    addStaticCZ(col, control, target) {
        let cz = new StaticCZ(this.sketch, col, control, target);
        this.addGate(cz);
    }

    addStaticCU(col, control, target, axis, exp, fillColor, outlineColor) {
        let cu = new StaticCU(this.sketch, col, control, target, axis, exp);
        if (fillColor != undefined) {
            cu.setColors(fillColor, outlineColor);
        }
        this.addGate(cu);
    }

    addStaticSWAP(col, qubit1, qubit2) {
        let swap = new StaticSWAP(this.sketch, col, qubit1, qubit2);
        this.addGate(swap);
    }

    addInteractiveRotation(col, row, axis, delta) {
        let rotatingGate = new RotatingGate(this.sketch, row, col, axis, delta);
        this.addGate(rotatingGate);
    }

    updateBoundingBox() {
        this.bbox = {x1:this.x, y1:this.y, x2:this.x + this.SCALE * (this.circuit.length + 2), y2:this.y + this.SCALE * (this.numQubits + 1)};
    }

    setLabels(labels) {
        this.labels = labels;
    }
}

class VisualQuantumState {
    // A visual representation of a quantum state
    constructor(sketch, circuit, x, y, scale) {
        this.scale = scale;
        this.sketch = sketch;
        this.circuit = circuit;
        this.numQubits = circuit.numQubits;
        this.width = (this.numQubits % 2 == 0) ? 1 << (this.numQubits / 2) : 1 << ((this.numQubits - 1) / 2);
        this.height = (this.numQubits % 2 == 0) ? 1 << (this.numQubits / 2) : 1 << ((this.numQubits + 1) / 2);
        this.x = x;
        this.y = y;

        circuit._onStateUpdate = () => this.update();
    }

    clean() {
        this.sketch.erase();
        this.sketch.noStroke();
        this.sketch.rect(this.bbox.x1, this.bbox.y1, this.bbox.x2 - this.bbox.x1, this.bbox.y2 - this.bbox.y1);
        this.sketch.noErase();
    }

    _drawAmplitude(index, x, y) {
        let amp = this.state[index].getPolarCoords();
        let midX = x + this.scale / 2;
        let midY = y + this.scale / 2;
        let mag = amp.radius * amp.radius;
        if (mag < 0.0001) return;

        // Draw outer circle
        this.sketch.noFill();
        this.sketch.strokeWeight(0.5);
        this.sketch.stroke(80);
        this.sketch.circle(midX, midY, amp.radius * this.scale);

        // Draw filled box
        this.sketch.fill([0, 176, 173]);
        this.sketch.noStroke();
        this.sketch.rect(x, y + (1 - mag) * this.scale, this.scale, mag * this.scale);

        // Draw inner circle
        this.sketch.fill([135, 249, 255]);
        this.sketch.strokeWeight(0.75);
        this.sketch.stroke(10);
        this.sketch.circle(midX, midY, mag * this.scale);

        // Draw phase line
        this.sketch.noFill();
        this.sketch.stroke(0);
        this.sketch.line(midX, midY, midX + amp.radius * Math.cos(amp.angle) * this.scale / 2, midY + amp.radius * Math.sin(amp.angle) * this.scale / 2);
    }

    _doDraw() {
        // Draw each amplitude
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this._drawAmplitude(j * this.width + i, this.x + i * this.scale, this.y + j * this.scale);
            }
        }
        // Draw grid overlay
        this.sketch.noFill();
        this.sketch.strokeWeight(0.5);
        this.sketch.stroke(80);
        for (let i = 0; i <= this.width; i++) {
            this.sketch.line(this.x + i * this.scale, this.y, this.x + i * this.scale, this.y + this.height * this.scale);
        }
        for (let i = 0; i <= this.height; i++) {
            this.sketch.line(this.x, this.y + i * this.scale, this.x + this.width * this.scale, this.y + i * this.scale);
        }
    }

    update() {
        this.sketch.push();
        this.updateBoundingBox();

        if (this.onPreDraw != undefined) this.onPreDraw();
        this.clean();
        this.runSimulation();
        this._doDraw();
        if (this.onPostDraw != undefined) this.onPostDraw();

        this.sketch.pop();
    }

    runSimulation() {
        let qs = new QuantumState(this.numQubits);
        let circuit = this.circuit.circuit;
        for (let col = 0; col < circuit.length; col++) {
            if (circuit[col] == undefined) continue;

            for (let row = 0; row < circuit[col].length; row++) {
                if (circuit[col][row] != undefined) {
                    this.simulateGate(circuit[col][row], qs);
                }
            }
        }

        qs.phaseNormalForm();
        this.state = qs.state;
    }

    simulateGate(gate, qs) {
        if (gate.gateType == "cnot") {
            qs.cnot(gate.control, gate.target);
        } else if (gate.gateType == "swap") {
            qs.swap(gate.qubit1, gate.qubit2);
        } else if (gate.gateType == "staticRotation" || gate.gateType == "rotating") {
            qs.majorRotation(gate.row, gate.axis, gate.delta * Math.PI);
        }
    }

    updateBoundingBox() {
        const OFFSET = 1;
        this.bbox = {x1:this.x - OFFSET, y1:this.y - OFFSET, x2:this.x + this.width * this.scale + OFFSET * 2, y2:this.y + this.height * this.scale + OFFSET * 2};
    }
}

class QuantumState {
    constructor(numQubits) {
        if (numQubits < 1) console.log("Error: QuantumState must have a positive number of qubits: " + numQubits);

        this.width = numQubits;
        this.length = 1 << this.width;
        this.state = [];
        this.probs = {p:[], isUpdated:false};

        this.state[0] = new Complex(1, 0);
        for (let i = 1; i < this.length; i++) {
            this.state[i] = new Complex(0, 0);
        }
    }

    cnot(control, target, delta) {
        let c = 1 << control;
        let t = 1 << target;

        for (let i = 0; i < this.length; i++) {
            if ((i & c) != 0) {
                let destination = i ^ t;
                if (destination > i) {
                    let temp = this.state[i];
                    this.state[i] = this.state[destination];
                    this.state[destination] = temp;
                }
            }
        }

        this.probs.isUpdated = false;
    }

    swap(qubit1, qubit2) {
        this.cnot(qubit1, qubit2);
        this.cnot(qubit2, qubit1);
        this.cnot(qubit1, qubit2);
    }

    z(target, delta) {
        let lineLength = 1 << target;
        let phase = new Complex(1, delta, true);

        for (let i = 0; i < this.length; i++) {
            if ((i & lineLength) != 0) {
                this.state[i] = Complex.multiply(this.state[i], phase);
            }
        }

        this.probs.isUpdated = false;
    }

    x(target, delta) {
        let gate = [new Complex(Math.cos(delta / 2), 0),   new Complex(0, -Math.sin(delta / 2)), 
                    new Complex(0, -Math.sin(delta / 2)),  new Complex(Math.cos(delta / 2), 0)];
        this._applyGeneralGate(target, gate);
    }

    y(target, delta) {
        let gate = [new Complex(Math.cos(delta / 2), 0),   new Complex(-Math.sin(delta / 2), 0), 
                    new Complex(Math.sin(delta / 2), 0),   new Complex(Math.cos(delta / 2), 0)];
        this._applyGeneralGate(target, gate);
    }

    majorRotation(target, axis, delta) {
        switch (axis) {
            case "X": this.x(target, delta); break;
            case "Y": this.y(target, delta); break;
            case "Z": this.z(target, delta); break;
            default: console.log("Error: Invalid axis passed to QuantumState.majorRotation()");
        }
    }

    _applyGeneralGate(target, gate) {
        // Takes in any 2x2 matrix and applys it to the state. The gate object is a 1d array representing the matrix

        let numCubes = 1 << (this.width - target - 1);
        let cubeDepth = 1 << target;
        let cubeOffset = cubeDepth << 1;

        for (let cube = 0; cube < numCubes; cube++) {
            for (let depth = 0; depth < cubeDepth; depth++) {
                let y = cube * cubeOffset + depth;
                let value1 = this.state[y];
                let value2 = this.state[y + cubeDepth];
                this.state[y] = Complex.add(Complex.multiply(gate[0], value1), Complex.multiply(gate[1], value2));
                this.state[y + cubeDepth] = Complex.add(Complex.multiply(gate[2], value1), Complex.multiply(gate[3], value2));
            }
        }

        this.probs.isUpdated = false;
    }

    getProbabilities() {
        if (this.probs.isUpdated) return this.probs.p;

        for (let i = 0; i < this.length; i++) {
            this.probs.p[i] = this.state[i].absSquare();
        }

        this.probs.isUpdated = true;
        return this.probs.p;
    }

    adjustGlobalPhase(phase) {
        // Multiplies a phase factor into every element
        let scalar = new Complex(1, phase, true);
        for (let i = 0; i < this.length; i++) {
            this.state[i] = Complex.multiply(this.state[i], scalar);
        }
    }

    phaseNormalForm() {
        // Adjusts the global phase so the first coefficent is real
        let amp = this.state[0].getPolarCoords();
        if (amp.radius > 0) {
            this.adjustGlobalPhase(-amp.angle);
        }
    }

    measure() {
        let probs = this.getProbabilities();

        let random = Math.random();
        let sumProbs = 0;

        for (let i = 0; i < this.length; i++) {
            sumProbs += probs[i];
            if (sumProbs > random) return i;
        }

        return this.length - 1;
    }

    getAngles() {
        // This will only work if the number of qubits is 1, otherwise will return undefined
        if (this.width != 1) return undefined;

        let alpha_polar = this.state[0].getPolarCoords();
        let beta_polar = this.state[1].getPolarCoords();

        let _theta = 2 * this._aTrig(alpha_polar.radius, beta_polar.radius);
        // Re-adjust global phase so alpha is real
        let _phi = beta_polar.angle - alpha_polar.angle;
        if (_phi < 0) phi += 2 * Math.PI;
        return {theta:_theta, phi:_phi};
    }

    setAngles(angles) {
        // Takes in initial states for every qubit in the form of [{theta:#, phi:#}, ...]
        // This method re-writes the current state with a new state
        if (!Array.isArray(angles)) {
            let _theta = (angles.theta != undefined) ? angles.theta : 0;
            let _phi = (angles.phi != undefined) ? angles.phi : 0;
            angles = [{theta:_theta, phi:_phi}];
        }

        // If the array is missing values, add enough 0 qubits to fill out the register
        if (angles.length < this.width) {
            for (let i = angles.length; i < this.width; i++) {
                angles[i] = {theta:0, phi:0};
            }
        }

        // Calculate all the qubit states
        let qubitStates = [];
        for (let i = 0; i < this.width; i++) {
            let _alpha = new Complex(Math.cos(angles[i].theta / 2), 0);
            let _beta = new Complex(Math.sin(angles[i].theta / 2) * Math.cos(angles[i].phi), Math.sin(angles[i].theta / 2) * Math.sin(angles[i].phi));
            qubitStates[i] = {alpha:_alpha, beta:_beta};
        }

        // Create the tensor product for the new state
        for (let i = 0; i < this.length; i++) {
            this.state[i] = new Complex(1, 0);
            for (let j = 0; j < this.width; j++) {
                // If the jth bit in i is 1, multiply by beta, else multiply by alpha
                let coefficent = (((1 << j) & i) != 0) ? qubitStates[j].beta : qubitStates[j].alpha;
                this.state[i] = Complex.multiply(this.state[i], coefficent);
            }
        }
    }

    _aTrig(cos_theta, sin_theta) {
        // Returns theta from the cosine and sine of the angle
        let theta = Math.acos(cos_theta);
        if (sin_theta < 0) return -theta;
        return theta;
    }
}

class Complex {
    constructor(real, imag, isPolar) {
        if (isPolar != true) { 
            // Arguments represent their normal parameters
            this.real = real;
            this.imag = imag;
        } else {
            // The first argument is the radius, the second is the an angle representing a complex polar number
            this.real = real * Math.cos(imag);
            this.imag = real * Math.sin(imag);
        }
    }

    abs() {
        return Math.sqrt(this.absSquare());
    }

    absSquare() {
        return this.real * this.real + this.imag * this.imag;
    }

    getPolarCoords() {
        let _radius = this.abs();
        let _angle = Math.acos(this.real / _radius);
        if (this.imag < 0) _angle = -_angle;
        return {radius:_radius, angle:_angle};
    }

    static add(c1, c2) {
        return new Complex(c1.real + c2.real, c1.imag + c2.imag);
    }

    static multiply(c1, c2) {
        return new Complex(c1.real*c2.real - c1.imag*c2.imag, c1.real*c2.imag + c2.real*c1.imag);
    }
}