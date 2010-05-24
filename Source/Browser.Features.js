/*
---

name: Browser.Features

description: Browser features detector.

license: MIT-style license.

copyright: Copyright (c) 2010.

authors: Slik (http://diveintoweb.net)

provides: [Browser.Features]

requires: [Core, Browser]

...
*/

(function(){
    
var canvas = document.createElement('canvas');
var video = document.createElement("video");
var input = document.createElement("input");
var BF = Browser.Features;

BF.extend = function(obj){
    for (var i in obj){
        this[i] = obj[i];
    }
}

BF.extend({
    
    canvas: !!canvas.getContext,
    video: !!video.canPlayType,
    localStorage: (('localStorage' in window) && window['localStorage'] !== null),
    workers: !!window.Worker,
    applicationCache: !!window.applicationCache,
    geolocation: !!navigator.geolocation,
    inputs: {
        placeholder: ('placeholder' in input),
        autofocus: ('autofocus' in input)
    },
    microdata: !!document.getItems
    
});

var Inputs = [
    'search',
    'number',
    'range',
    'color',
    'tel',
    'url',
    'email',
    'date',
    'month',
    'week',
    'time',
    'datetime',
    'datetime-local'
];

Inputs.each(function(o){
    input.setAttribute("type", o);
    BF.inputs[o] = !!(input.type !== "text");
});

var Mimes = {
    h264: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
    ogg: 'video/ogg; codecs="theora, vorbis"',
    webm: 'video/webm; codecs="vp8, vorbis"'
}

BF.extend({
    
    canvasText: (function(){
        if (!BF.canvas) { return false; }
        return typeof canvas.getContext('2d').fillText == 'function';
    })(),
    
    canPlay: function(mime){
        if (!BF.video) { return false; }
        return video.canPlayType(mime);
    }
    
});

if(BF.video){
    BF.video.h264 = BF.canPlay(Mimes.h264);
    BF.video.ogg = BF.canPlay(Mimes.ogg);
    BF.video.webm = BF.canPlay(Mimes.webm);
}

})();
