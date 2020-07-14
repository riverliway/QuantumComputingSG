"use strict";

let qubitSlider;

let screen = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 500;

    let arcSlider;

    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);
        sketch.angleMode(sketch.DEGREES);

        // qubitSlider = new QubitSlider(sketch, 400, 250);
        let bobble = new Bobble(sketch, 400, 250, 10);
    }

    // registerThunk(ThunkType.MouseClicked, this, () => {
    //     console.log(sketch.mouseX, sketch.mouseY);
    // });

    extendMouseAPI(sketch);
}

let p5Obj = new p5(screen);