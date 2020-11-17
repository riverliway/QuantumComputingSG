"use strict";

// This applet was not designed to be incorperated into the textbook. It is used for designing circuits to screenshot and use as an image

let bottomCanvas = (sketch) => {
    const WIDTH = 1000;
    const HEIGHT = 500;

    sketch.setup = () => {
        let p5Object = sketch.createCanvas(WIDTH, HEIGHT);
        p5Object.position(sketch.windowWidth / 2 - WIDTH / 2, sketch.windowHeight / 2 - HEIGHT / 2);

        let qc = new QuantumCircuit(sketch, 4, 0, 0);
        qc.addStaticCU(0, 0, 3, "U");

        qc.update();

        let qc2 = new QuantumCircuit(sketch, 4, 250, 0);
        qc2.addStaticSWAP(0, 0, 1);
        qc2.addStaticSWAP(1, 2, 1);
        qc2.addStaticCU(2, 2, 3, "U");
        qc2.addStaticSWAP(3, 2, 1);
        qc2.addStaticSWAP(4, 0, 1);

        qc2.update();

        // registerThunk(0, () => {console.log("Mouse (" + sketch.mouseX + ", " + sketch.mouseY + ")");});
    }

    extendMouseAPI(sketch);
}

let bottomP5 = new p5(bottomCanvas);