"use strict";

class Drawing {
    static arrow(sketch, base, vector, color, size) {
        sketch.push();
        sketch.stroke(color);
        sketch.fill(color);
        sketch.translate(base.x, base.y);
        sketch.line(0, 0, vector.x, vector.y);
        sketch.rotate(vector.heading());
        sketch.translate(vector.mag() - size, 0);
        sketch.triangle(0, size / 2, 0, -size / 2, size, 0);
        sketch.pop();
    }
}