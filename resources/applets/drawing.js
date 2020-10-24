"use strict";

class Drawing {
    static arrow(sketch, base, vector, color, size) {
        // Base and vector need to be p5 vectors
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

    static curve(sketch, curve, color, weight) {
        // Curve is just a collection of points to draw straight lines between
        sketch.push();
        sketch.noFill();
        if (color != undefined) sketch.stroke(color);
        sketch.strokeWeight(weight == undefined ? 0 : weight);
        
        let previous = curve[0];
        for (let i = 1; i < curve.length; i++) {
            sketch.line(previous.x, previous.y, previous.z, curve[i].x, curve[i].y, curve[i].z);
            previous = curve[i];
        }

        sketch.pop();
    }

    static ring(sketch, x, y, z, d, normal) {
        // Normal needs to be a p5 vector
        sketch.push();
        sketch.translate(x, y, z);
        Drawing.rotateNormal(sketch, normal.x, normal.y, normal.z);
        sketch.ellipse(0, 0, d, d, 50);
        sketch.pop();
    }

    static arc(sketch, x, y, z, d, normal, angleBegin, angleEnd, mode) {
        let m = (mode == undefined) ? sketch.OPEN : mode;
        sketch.push();
        sketch.translate(x, y, z);
        Drawing.rotateNormal(sketch, normal.x, normal.y, normal.z);
        sketch.arc(0, 0, d, d, angleBegin, angleEnd, m, 50);
        sketch.pop();
    }

    static rotateNormal(sketch, facex, facey, facez, posx, posy, posz) {
        let x = facex - (posx == undefined ? 0 : posx);
        let y = facey - (posy == undefined ? 0 : posy);
        let z = facez - (posz == undefined ? 0 : posz);

        let previousAngleMode = sketch._angleMode;
        sketch.angleMode(sketch.RADIANS);

        let r = Math.sqrt(x * x + z * z);
        let theta = Math.asin(x / r);
        if (z < 0) {
            theta = 2 * Math.PI - theta;
            theta += Math.PI;
        }
        if (r == 0) {
            theta = 0;
        }
        sketch.rotateY(theta);

        let rho = Math.sqrt(x * x + y * y + z * z);
        let gamma = Math.acos(r / rho);
        if (y > 0) {
            gamma = 2 * Math.PI - gamma;
            gamma += Math.PI;
        }
        sketch.rotateX(gamma);

        sketch.angleMode(previousAngleMode);
    }
}