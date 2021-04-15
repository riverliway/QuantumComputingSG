"use strict";

let qubitSlider;

let screen = (sketch) => {
    const WIDTH = 800;
    const HEIGHT = 500;

    let qubitSlider;

    sketch.setup = () => {
        let p5Object = sketch.createCanvas(WIDTH, HEIGHT);
        p5Object.position(sketch.windowWidth / 2 - WIDTH / 2, sketch.windowHeight / 2 - HEIGHT / 2);
        sketch.angleMode(sketch.DEGREES);

        qubitSlider = new QubitSlider(sketch, 400, 250);
    }

    extendMouseAPI(sketch);
}

let p5Obj = new p5(screen);