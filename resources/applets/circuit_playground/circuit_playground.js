"use strict";

// This applet was not designed to be incorperated into the textbook. It is used for designing circuits to screenshot and use as an image

let bottomCanvas = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 500;

    sketch.setup = () => {
        let p5Object = sketch.createCanvas(WIDTH, HEIGHT);
        p5Object.position(sketch.windowWidth / 2 - WIDTH / 2, sketch.windowHeight / 2 - HEIGHT / 2);

        let qc = new QuantumCircuit(sketch, 2, 0, 0);
        qc.addStaticCnot(0, 1, 0);

        qc.update();

        let qc2 = new QuantumCircuit(sketch, 2, 300, 0);
        qc2.addStaticGate(0, 0, "H");
        qc2.addStaticGate(0, 1, "H");
        qc2.addStaticCnot(1, 0, 1);
        qc2.addStaticGate(2, 0, "H");
        qc2.addStaticGate(2, 1, "H");

        qc2.update();

        // registerThunk(0, () => {console.log("Mouse (" + sketch.mouseX + ", " + sketch.mouseY + ")");});
    }

    extendMouseAPI(sketch);
}

let bottomP5 = new p5(bottomCanvas);