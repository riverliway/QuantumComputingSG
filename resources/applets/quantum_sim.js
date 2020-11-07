"use strict";

class QuantumCircuit {
    // DEPENDENCY: ui.js

    constructor(sketch, numQubits) {
        this.sketch = sketch;

        this.circuit = [];
        for (let i = 0; i < numQubits; i++) {
            this.circuit[i] = [];
        }


    }

    clean() {

    }

    update() {
        this.updateBoundingBox();
        this.clean();
    }

    updateBoundingBox() {

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

    cnot(target, control, delta) {
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