"use strict";

class BobbleBox {
    constructor(sketch, x, y, width, height) {
        this.VEC_OFFSET = 20;

        this.sketch = sketch;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.backgroundColor = sketch.color(255);
        this.outlineColor = sketch.color(0);

        this.drawAxes = true;
        this.xAxisName = "X";
        this.yAxisName = "Y";
        this.xAxisColor = sketch.color(0);
        this.yAxisColor = sketch.color(0);

        this.bobble = new Bobble(sketch, this.x, this.y, 10);
        this.bobble.clean = undefined; // We will do our own cleaning
        this.bobble.onPreDraw = () => this.draw();
        this.bobble.move = () => this.move();
    }

    clean() {
        const OFFSET = this.bobble.radius + 1;
        this.sketch.erase();
        this.sketch.rect(this.x - OFFSET, this.y - OFFSET - this.VEC_OFFSET * 2, this.width + (OFFSET + this.VEC_OFFSET * 2) * 2, this.height + (OFFSET + this.VEC_OFFSET * 2) * 2);
        this.sketch.noErase();
    }

    draw() {
        // Only draws the box and axes, doesn't draw bobble. Call update to draw everything
        this.clean();
        this.sketch.strokeWeight(1);
        this.sketch.stroke(this.outlineColor);
        this.sketch.fill(this.backgroundColor);
        this.sketch.rect(this.x, this.y, this.width, this.height);

        if (this.drawAxes) {
            this.sketch.strokeWeight(2);
            let base = this.sketch.createVector(this.x, this.y + this.height);
            Drawing.arrow(this.sketch, base, this.sketch.createVector(0, -this.VEC_OFFSET - this.height), this.yAxisColor, 7);
            Drawing.arrow(this.sketch, base, this.sketch.createVector(this.width + this.VEC_OFFSET, 0), this.xAxisColor, 7);
            this.sketch.stroke(this.xAxisColor);
            this.sketch.fill(this.xAxisColor);
            this.sketch.textSize(15);
            this.sketch.strokeWeight(0);
            this.sketch.text(this.xAxisName, this.x + this.width + this.VEC_OFFSET * 1.2, this.y + this.height);
            this.sketch.stroke(this.yAxisColor);
            this.sketch.fill(this.yAxisColor);
            this.sketch.text(this.yAxisName, this.x, this.y - this.VEC_OFFSET * 1.2);
        }
    }

    move() {
        let x = this.sketch.mouseX;
        if (x < this.x) x = this.x;
        if (x > this.x + this.width) x = this.x + this.width;
        let y = this.sketch.mouseY;
        if (y < this.y) y = this.y;
        if (y > this.y + this.height) y = this.y + this.height;
        this.bobble.setPosition(x, y);

        if (this.onMove != undefined) this.onMove();
    }

    update() {
        this.bobble.draw();
    }

    getValues() {
        let vals = this.bobble.getPosition();
        vals.x -= this.x;
        vals.y = this.y + this.height - vals.y;
        return vals;
    }

    setValues(x, y) {
        this.bobble.setPosition(x + this.x, this.height - y + this.y);
        this.update();
    }

    setColors(background, outline, bobble, hover) {
        this.backgroundColor = background;
        this.outlineColor = outline;
        this.bobble.setColors(bobble, hover, outline);
        this.update();
    }

    setAxes(drawAxes, xAxisName, yAxisName, xAxisColor, yAxisColor) {
        this.drawAxes = drawAxes;
        this.xAxisName = xAxisName;
        this.yAxisName = yAxisName;
        this.xAxisColor = xAxisColor;
        this.yAxisColor = yAxisColor;
        this.update();
    }
}

class QubitSlider {
    /* Interface function onMove() may be implemented by calling function */

    constructor(sketch, x, y) {
        this.thetaSlider = new ArcSlider(sketch, x, y, 50, 90, 270);
        this.phiSlider = new ArcSlider(sketch, x, y, 30, 0, 360);
        this.setValues(0, 0);

        // Since the theta slider will 'clean' the phi slider, we need to re-draw
        this.thetaSlider.onPostDraw = () => this.phiSlider.update();

        this.thetaSlider.onMove = () => {
            if (this.onMove != undefined) this.onMove();
        }
        this.phiSlider.onMove = () => {
            if (this.onMove != undefined) this.onMove();
        }
    }

    getValues() {
        let phi = this.phiSlider.getValue();
        phi -= 90;
        if (phi <= 0) phi += 360;
        let theta = this.thetaSlider.getValue();
        theta -= 270;
        if (theta <= 0) theta += 360;
        return {phi: 360 - phi, theta: 360 - theta};
    }

    setValues(theta, phi) {
        theta = (360 - theta) - 90;
        if (theta < 0) theta += 360;
        this.thetaSlider.setValue(theta);
        phi = (360 - phi) + 90;
        if (phi >= 360) phi -= 360;
        this.phiSlider.setValue(phi);
    }
}

class RadioButtonSet {
    // This class has an array of Button instances and will automatically make them radio buttons

    /* Interface function onSelect() may be implemented by calling function */

    constructor(buttons) {
        this.selectedIndex = 0;
        this.buttons = buttons;

        this.buttons[this.selectedIndex].setIsSelected(true);

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].onPress = () => this.setSelectedIndex(i);
        }
    }

    getSelectedIndex() {
        return this.selectedIndex;
    }

    setSelectedIndex(selectedIndex) {
        this.buttons[this.selectedIndex].setIsSelected(false);
        this.buttons[selectedIndex].setIsSelected(true);
        let isDuplicate = selectedIndex == this.selectedIndex;
        this.selectedIndex = selectedIndex;
        if (!isDuplicate && this.onSelect != undefined) this.onSelect();
    }
}

class Interactable {
    /* Abstract function _doDraw()   should be implemented by children classes */
    /* Abstract function clean()     should be implemented by children classes */
    /* Abstract function doesHover() should be implemented by children classes */
    /* Abstract function hover()     should be implemented by children classes */
    /* Abstract function unHover()   should be implemented by children classes */
    /* Abstract function grab()      should be implemented by children classes */
    /* Abstract function release()   should be implemented by children classes */
    /* Abstract function move()      should be implemented by children classes */

    /* Interface function onPreDraw()  may be implemented by calling function */
    /* Interface function onPostDraw() may be implemented by calling function */
    /* Interface function onHover()    may be implemented by calling function */
    /* Interface function onUnHover()  may be implemented by calling function */
    /* Interface function onRelease()  may be implemented by calling function */
    /* Interface function onGrab()     may be implemented by calling function */
    /* Interface function onMove()     may be implemented by calling function */
    /* Interface function onPress()    may be implemented by calling function */

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
            if (this.child.onPress != undefined) this.child.onPress();
        }
    }

    checkRelease() {
        if (this.isGrab) {
            this.isGrab = false;
            this.checkHover();
            if (this.child.release != undefined) this.child.release();
            if (this.child.onRelease != undefined) this.child.onRelease();
        }
    }

    checkHover(debug) {
        if (this.sketch.mouseIsPressed) return;

        let pHover = this.isHover;
        if (this.child.doesHover != undefined) this.isHover = this.child.doesHover();
        if (debug != undefined) console.log(pHover, this.isHover);
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
        this.strokeColor = this.sketch.color(0);

        super.setChild(this);
    }

    doesHover() {
        return this.radius > Math.hypot(this.x - this.sketch.mouseX, this.y - this.sketch.mouseY) - 3;
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
        this.sketch.stroke(this.strokeColor);
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

    release() {
        this.sketch.cursor(this.sketch.ARROW);
        this.draw();
    }

    getColor() {
        if (this.isHover) {
            return this.hoverColor;
        }
        return this.normalColor;
    }

    setColors(normalColor, hoverColor, outlineColor) {
        this.normalColor = normalColor;
        this.hoverColor = hoverColor;
        this.strokeColor = (outlineColor == undefined) ? 0 : outlineColor;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosition() {
        return {x:this.x, y:this.y};
    }
}

class ArcSlider {
    /* Interface function onMove()      may be implemented by calling function */
    /* Interface function onPreDraw()   may be implemented by calling function */
    /* Interface function onPostDraw()  may be implemented by calling function */

    constructor(sketch, x, y, radius, beginAngle, endAngle, startAngle) {
        this.beginAngle = (beginAngle == undefined) ? 0 : beginAngle;
        this.endAngle = (endAngle == undefined) ? 360 : endAngle;
        this.value = (startAngle == undefined) ? beginAngle : startAngle;
        this.sketch = sketch;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.bobbleRadius = 8;
        
        let [bobbleX, bobbleY] = this.getBobblePos();
        this.bobble = new Bobble(sketch, bobbleX, bobbleY, this.bobbleRadius);

        // Override bobble methods. We will do cleaning ourselves
        this.bobble.clean = undefined;
        this.bobble.move = () => this.move();
        this.bobble.onPreDraw = () => this.draw();

        // Re-draw everything now that the plumbing is correct
        this.draw();
        this.bobble.draw();
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
                    else if (middleAngle >= 360) middleAngle -= 360;
                   
                    // This will be broken for other angles, but Ian is to blame
                    if (this.value > this.endAngle) this.value -= 360;

                    this.value = (this.value + 360 - this.endAngle > middleAngle + 360 - this.endAngle) ? this.beginAngle : this.endAngle;
                }
            }
        }

        this.updateBobblePosition();

        if (this.onMove != undefined) this.onMove();
    }

    draw() {
        if (this.onPreDraw != undefined) this.onPreDraw();

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

        if (this.onPostDraw != undefined) this.onPostDraw();
    }

    updateBobblePosition() {
        this.bobbleX = this.radius * Math.cos(this.sketch.radians(this.value)) + this.x;
        this.bobbleY = this.radius * Math.sin(this.sketch.radians(this.value)) + this.y;
        this.bobble.setPosition(this.bobbleX, this.bobbleY);
    }

    getBobblePos() {
        let x = this.radius * Math.cos(this.sketch.radians(this.value)) + this.x;
        let y = this.radius * Math.sin(this.sketch.radians(this.value)) + this.y;
        return [x, y];
    }

    update() {
        // Simply refreshes the coordinates and re-draws the slider and bobble
        this.updateBobblePosition();
        this.bobble.draw();
    }

    setColors(normalColor, hoverColor) {
        this.bobble.setColors(normalColor, hoverColor);
        this.update();
    }

    getValue() {
        return this.value;
    }

    setValue(val) {
        if (val < this.beginAngle) val = this.beginAngle;
        else if (val > this.endAngle) val = this.endAngle;
        this.value = val;
        this.update();
    }
}

class Button extends Interactable{
  
    constructor(sketch, x, y, width, height, text) {
        super(sketch);
        this.sketch = sketch;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.updateBoundingBox();

        this.normalColor = sketch.color(255, 255, 255);
        this.hoverColor = sketch.color(200, 200, 200);
        this.textColor = sketch.color(0, 0, 0);
        this.borderColor = sketch.color(0, 0, 0);
        this.normalStroke = 1;
        this.selectedStroke = 2;

        this.isSelected = false;

        super.setChild(this);
    }

    _doDraw() {
        let backgroundColor = this.getCurrentColor();
        this.sketch.fill(backgroundColor);
        this.sketch.stroke(this.borderColor);
        this.sketch.strokeWeight(this.isSelected ? this.selectedStroke : this.normalStroke);
        this.sketch.rect(this.bbox.x1, this.bbox.y1, this.width, this.height);

        this.sketch.stroke(this.textColor);
        this.sketch.fill(this.textColor);
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
        this.sketch.text(this.text, this.x, this.y);
    }

    clean() {
        this.sketch.push();

        this.sketch.fill(this.sketch.color(255, 255, 255));
        this.sketch.noStroke();
        this.sketch.rect(this.bbox.x1 - 1, this.bbox.y1 - 1, this.width + 2, this.height + 2);

        this.sketch.pop();
    }

    doesHover() {
        // if mouse inside the box, it is hovering
        let ret = this.sketch.mouseX > this.bbox.x1 && this.sketch.mouseX < this.bbox.x2 && this.sketch.mouseY > this.bbox.y1 && this.sketch.mouseY < this.bbox.y2;
        return ret;
    }

    hover() {
        this.draw();
    }

    unHover() {
        this.draw();
    }

    grab() {
        this.isSelected = !this.isSelected;
        this.draw();
    }

    getCurrentColor() {
        if (this.isHover || this.isSelected) {
            return this.hoverColor;
        }
        return this.normalColor;
    }

    updateBoundingBox() {
        this.bbox = {x1: this.x - this.width / 2, x2: this.x + this.width / 2, y1: this.y - this.height / 2, y2: this.y + this.height / 2};
    }

    update() {
        this.updateBoundingBox();
        this.draw();
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;
        this.update();
    }

    setLocation(x, y) {
        this.x = x;
        this.y = y;
        this.update();
    }

    setIsSelected(isSelected) {
        this.isSelected = isSelected;
        this.update();
    }
}

class Label extends Interactable {
  
    constructor(sketch, x, y, text, fontSize) {
        super(sketch);
        this.sketch = sketch;
        this.x = x;
        this.y = y;
        this.text = text;
        this.width = 0;
        this.height = 0;
        this.updateBoundingBox();

        this.textColor = sketch.color(0, 0, 0);
        this.normalStroke = 0;
        this.fontSize = (fontSize == undefined) ? 14 : fontSize;

        super.setChild(this);
    }

    _doDraw() {
        this.sketch.strokeWeight(this.normalStroke);
        this.sketch.stroke(this.textColor);
        this.sketch.fill(this.textColor);
        this.sketch.textAlign(this.sketch.CENTER, this.sketch.CENTER);
        this.sketch.textSize(this.fontSize);
        this.sketch.text(this.text, this.x, this.y);
    }

    clean() {
        this.sketch.push();

        this.sketch.fill(this.sketch.color(255, 255, 255));
        this.sketch.noStroke();
        this.sketch.rect(this.bbox.x1 - 1, this.bbox.y1 - 1, this.width + 2, this.height + 2);

        this.sketch.pop();
    }

    doesHover() {
        // if mouse inside the box, it is hovering
        let ret = this.sketch.mouseX > this.bbox.x1 && this.sketch.mouseX < this.bbox.x2 && this.sketch.mouseY > this.bbox.y1 && this.sketch.mouseY < this.bbox.y2;
        return ret;
    }

    updateBoundingBox() {
        this.width = this.text.length * this.fontSize;
        this.height = this.fontSize; 
        this.bbox = {x1: this.x - this.width / 2, x2: this.x + this.width / 2, y1: this.y - this.height / 2, y2: this.y + this.height / 2};
    }

    update() {
        this.updateBoundingBox();
        this.draw();
    }

    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.update();
    }

    setLocation(x, y) {
        this.x = x;
        this.y = y;
        this.update();
    }

    setText(text) {
        this.text = text;
        this.update();
    }
}