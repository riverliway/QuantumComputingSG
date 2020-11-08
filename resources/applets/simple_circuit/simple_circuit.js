"use strict";

let bottomCanvas = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 300;

    sketch.setup = () => {
        let p5Object = sketch.createCanvas(WIDTH, HEIGHT);
        p5Object.position(sketch.windowWidth / 2 - WIDTH / 2, sketch.windowHeight / 2 - HEIGHT / 2);

        let qc = new QuantumCircuit(sketch, 2, 0, 0);
        qc.addInteractiveRotation(0, 0, "X", 0);
        qc.addInteractiveRotation(1, 0, "X", 0);
        qc.addInteractiveRotation(0, 1, "Y", 0);
        qc.addInteractiveRotation(1, 1, "Y", 0);
        qc.addInteractiveRotation(0, 2, "Z", 0);
        qc.addInteractiveRotation(1, 2, "Z", 0);
        qc.setLabels(["|0⟩", "|0⟩"]);

        let visualState = new VisualQuantumState(sketch, qc, 550, 40, 90);

        qc.update();

        // registerThunk(0, () => {console.log("Mouse (" + sketch.mouseX + ", " + sketch.mouseY + ")");});
    }

    extendMouseAPI(sketch);
}

let bottomP5 = new p5(bottomCanvas);