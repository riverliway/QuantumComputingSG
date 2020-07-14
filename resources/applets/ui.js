"use strict";

class QubitSlider {
    constructor(sketch, x, y) {
        this.thetaSlider = new ArcSlider(sketch, x, y, 50, 270, 90);
        this.phiSlider = new ArcSlider(sketch, x, y, 30, 0, 360);
        this.phiSlider.setValue(90);
        this.thetaSlider.onMove = () => this.phiSlider.draw();
        this.thetaSlider.onHover = () => this.phiSlider.draw();
        this.thetaSlider.onUnHover = () => this.phiSlider.draw();
    }

    setValues(theta, phi) {
        this.thetaSlider.setValue(theta);
        this.phiSlider.setValue(phi);
    }
}

class Interactable {
    /* Abstract function _doDraw()   must be implemented by children classes */
    /* Abstract function clean()     must be implemented by children classes */
    /* Abstract function doesHover() must be implemented by children classes */
    /* Abstract function hover()     must be implemented by children classes */
    /* Abstract function unHover()   must be implemented by children classes */
    /* Abstract function grab()      must be implemented by children classes */
    /* Abstract function move()      must be implemented by children classes */

    /* Interface function onPreDraw()  may be implemented by calling function */
    /* Interface function onPostDraw() may be implemented by calling function */
    /* Interface function onHover()    may be implemented by calling function */
    /* Interface function onUnHover()  may be implemented by calling function */
    /* Interface function onRelease()  may be implemented by calling function */
    /* Interface function onGrab()     may be implemented by calling function */
    /* Interface function onMove()     may be implemented by calling function */

    constructor(sketch) {
        this.sketch = sketch;
        this.isHover = false;
        this.isGrab = false;

        registerThunk(ThunkType.MouseDragged, this.checkMove, this);
        registerThunk(ThunkType.MousePressed, this.checkGrab, this);
        registerThunk(ThunkType.MouseReleased, this.checkRelease, this);
        registerThunk(ThunkType.MouseMoved, this.checkHover, this);
    }

    checkMove() {
        if (this.isGrab) {
            let previousAngleMode = this.sketch._angleMode;
            this.sketch.push();

            if (this.child.onPreDraw != undefined) this.child.onPreDraw();
            if (this.child.clean != undefined) this.child.clean();

            if (this.child.move != undefined) this.child.move();
            if (this.child.onMove != undefined) this.child.onMove();

            if (this.child._doDraw != undefined) this.child._doDraw();
            if (this.child.onPostDraw != undefined) this.child.onPostDraw();

            this.sketch.pop();
            this.sketch.angleMode(previousAngleMode);
        }
    }

    checkGrab() {
        if (this.isHover) {
            this.isGrab = true;
            if (this.child.grab != undefined) this.child.grab();
            if (this.child.onGrab != undefined) this.child.onGrab();
        }
    }

    checkRelease() {
        if (this.isGrab) {
            this.isGrab = false;
            this.isHover = false;
            if (this.child.release != undefined) this.child.release();
            if (this.child.onRelease != undefined) this.child.onRelease();
        }
    }

    checkHover() {
        if (this.sketch.mouseIsPressed) return;

        let pHover = this.isHover;
        if (this.child.doesHover != undefined) this.isHover = this.child.doesHover();
        if (pHover != this.isHover) {
            if (this.isHover) {
                if (this.child.hover != undefined) this.child.hover();
                if (this.child.onHover != undefined) this.child.onHover();
            } else {
                if (this.child.unHover != undefined) this.child.unHover();
                if (this.child.onUnHover != undefined) this.child.onUnHover();
            }
        }
    }

    draw() {
        let previousAngleMode = this.sketch._angleMode;
        this.sketch.push();

        if (this.child.onPreDraw != undefined) this.child.onPreDraw();
        if (this.child.clean != undefined) this.child.clean();
        if (this.child._doDraw != undefined) this.child._doDraw();
        if (this.child.onPostDraw != undefined) this.child.onPostDraw();

        this.sketch.pop();
        this.sketch.angleMode(previousAngleMode);
    } 
    
    setChild(child) {
        this.child = child;
        this.draw();
    }
}

class Bobble extends Interactable {
    constructor(sketch, x, y, radius) {
        super(sketch);
        this.sketch = sketch;
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.normalColor = this.sketch.color(0, 230, 226);
        this.hoverColor = this.sketch.color(0, 176, 173);

        super.setChild(this);
    }

    doesHover() {
        return this.radius > Math.hypot(this.x - this.sketch.mouseX, this.y - this.sketch.mouseY);
    }

    hover() {
        this.sketch.cursor(this.sketch.HAND);
        this.draw();
    }

    unHover() {
        this.sketch.cursor(this.sketch.ARROW);
        this.draw();
    }

    clean() {
        this.sketch.noStroke()
        this.sketch.fill(255);
        this.sketch.ellipseMode(this.sketch.CENTER);
        this.sketch.circle(this.x, this.y, 2 * this.radius + 10);
    }

    _doDraw() {
        this.sketch.stroke(0);
        this.sketch.strokeWeight(1);
        this.sketch.fill(this.getColor());
        this.sketch.circle(this.x, this.y, 2 * this.radius);
    }

    grab() {
        this.sketch.cursor("grab");
    }

    move() {
        this.x = this.sketch.mouseX;
        this.y = this.sketch.mouseY;
    }

    getColor() {
        if (this.isHover) {
            return this.hoverColor;
        }
        return this.normalColor;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}

class ArcSlider {
    constructor(sketch, x, y, radius, beginAngle, endAngle, startAngle) {
        this.beginAngle = (beginAngle == undefined) ? 0 : beginAngle;
        this.endAngle = (endAngle == undefined) ? 360 : endAngle;
        this.value = (startAngle == undefined) ? beginAngle : startAngle;
        this.sketch = sketch;
        this.x = x;
        this.y = y;
        this.radius = radius;
        
        let [bobbleX, bobbleY] = this.getBobblePos();
        this.bobble = new Bobble(sketch, bobbleX, bobbleY, 8);
    }

    move() {
        let distance = Math.hypot(this.x - this.sketch.mouseX, this.y - this.sketch.mouseY);
        this.value = this.sketch.degrees(Math.acos((this.x - this.sketch.mouseX) / distance));
        if (this.y - this.sketch.mouseY < 0) this.value *= -1;
        this.value += 180;

        let range = Math.abs(this.beginAngle - this.endAngle);
        if (range < 360) {
            if (this.beginAngle > this.endAngle) {
                if (this.value < this.beginAngle && this.value > this.endAngle) {
                    let middleAngle = (this.beginAngle + this.endAngle) / 2;
                    this.value = (this.value < middleAngle) ? this.endAngle : this.beginAngle;
                }
            } else {
                if (this.value < this.beginAngle || this.value > this.endAngle) {
                    let middleAngle = (this.beginAngle + this.endAngle) / 2 + 180;
                    if (middleAngle < 0) middleAngle += 360;
                    else if (middleAngle > 360) middleAngle -= 360;
                    this.value = (this.value < middleAngle) ? this.beginAngle : this.endAngle;
                }
            }
        }
    }

    draw() {
        this.sketch.angleMode(this.sketch.DEGREES);
        this.sketch.push();

        // Wipe clean
        this.sketch.noStroke();
        this.sketch.fill(255);
        this.sketch.ellipseMode(this.sketch.CENTER);
        this.sketch.circle(this.x, this.y, 2 * (this.radius + this.bobbleRadius + 2));

        // Draw arc
        this.sketch.stroke(0);
        this.sketch.strokeWeight(1);
        this.sketch.noFill();
        this.sketch.arc(this.x, this.y, 2 * this.radius, 2 * this.radius, this.beginAngle, this.endAngle);

        this.sketch.pop();

        if (this.onDraw != undefined) this.onDraw();
    }

    updateBobblePosition() {
        this.bobbleX = this.radius * Math.cos(this.sketch.radians(this.value)) + this.x;
        this.bobbleY = this.radius * Math.sin(this.sketch.radians(this.value)) + this.y;
    }

    getBobblePos() {
        let x = this.radius * Math.cos(this.sketch.radians(this.value)) + this.x;
        let y = this.radius * Math.sin(this.sketch.radians(this.value)) + this.y;
        return [x, y];
    }

    setValue(val) {
        this.value = val;
        this.resetAfterRelease();
    }
}