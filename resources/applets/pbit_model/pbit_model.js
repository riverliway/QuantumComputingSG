"use strict";

let qubitSlider;

let screen = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 500;

    let qubitSlider;

    sketch.setup = () => {
        sketch.createCanvas(WIDTH, HEIGHT);
        sketch.angleMode(sketch.DEGREES);

        qubitSlider = new QubitSlider(sketch, 400, 250);
    }

    extendMouseAPI(sketch);
}

let p5Obj = new p5(screen);