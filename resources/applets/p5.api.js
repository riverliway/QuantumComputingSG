// This file changes the API for P5.js so that other code can register thunks to run on desired events

"use strict";

let mousePressedThunks = [];
function mousePressed() {
    for (let i = 0; i < mousePressedThunks.length; i++) {
        mousePressedThunks[i]();
    }
}

let mouseReleasedThunks = [];
function mouseReleased() {
    for (let i = 0; i < mouseReleasedThunks.length; i++) {
        mouseReleasedThunks[i]();
    }
}

let mouseMovedThunks = [];
function mouseMoved() {
    for (let i = 0; i < mouseMovedThunks.length; i++) {
        mouseMovedThunks[i]();
    }
}

let mouseDraggedThunks = [];
function mouseDragged() {
    for (let i = 0; i < mouseDraggedThunks.length; i++) {
        mouseDraggedThunks[i]();
    }
}

let mouseClickedThunks = [];
function mouseClicked() {
    for (let i = 0; i < mouseClickedThunks.length; i++) {
        mouseClickedThunks[i]();
    }
}

let doubleClickedThunks = [];
function doubleClicked() {
    for (let i = 0; i < doubleClickedThunks.length; i++) {
        doubleClickedThunks[i]();
    }
}

let mouseWheelThunks = [];
function mouseWheel() {
    for (let i = 0; i < mouseWheelThunks.length; i++) {
        mouseWheelThunks[i]();
    }
}

let ThunkType = {
    MousePressed:  0,
    MouseReleased: 1,
    MouseMoved:    2,
    MouseDragged:  3,
    MouseClicked:  4,
    DoubleClicked: 5,
    MouseWheel:    6
};

function registerThunk(thunkType, thunk) {
    switch (thunkType) {
        case ThunkType.MousePressed:  mousePressedThunks.push(thunk);  break;
        case ThunkType.MouseReleased: mouseReleasedThunks.push(thunk); break;
        case ThunkType.MouseMoved:    mouseMovedThunks.push(thunk);    break;
        case ThunkType.MouseDragged:  mouseDraggedThunks.push(thunk);  break;
        case ThunkType.MouseClicked:  mouseClickedThunks.push(thunk);  break;
        case ThunkType.DoubleClicked: doubleClickedThunks.push(thunk); break;
        case ThunkType.MouseWheel:    mouseWheelThunks.push(thunk);    break;
    }
}