// This file changes the API for P5.js so that other code can register thunks to run on desired events

"use strict";

let eventArray = [[],[],[],[],[],[],[]];

function extendMouseAPI(sketch) {
    function eventCall (thunkArray) {
        for (let i = 0; i < thunkArray.length; i++) {
            let [instance, thunk] = thunkArray[i];
            if (instance == undefined) thunk();
            else thunk.call(instance);
        }
    }

    sketch.mousePressed  = () => eventCall(eventArray[0]);
    sketch.mouseReleased = () => eventCall(eventArray[1]);
    sketch.mouseMoved    = () => eventCall(eventArray[2]);
    sketch.mouseDragged  = () => eventCall(eventArray[3]);
    sketch.mouseClicked  = () => eventCall(eventArray[4]);
    sketch.doubleClicked = () => eventCall(eventArray[5]);
    sketch.mouseWheel    = () => eventCall(eventArray[6]);
}

const ThunkType = {
    MousePressed:  0,
    MouseReleased: 1,
    MouseMoved:    2,
    MouseDragged:  3,
    MouseClicked:  4,
    DoubleClicked: 5,
    MouseWheel:    6
};

function registerThunk(thunkType, thunk, instance) {
    if (instance == undefined) eventArray[thunkType].push([undefined, thunk]);
    else eventArray[thunkType].push([instance, thunk]);
}

function rgb(_r, _g, _b) {
    return [_r, _g, _b];
}