/*
---

name: Browser.Features

description: Browser features detector.

license: MIT-style license.

copyright: Copyright (c) 2010.

authors: Slik (http://diveintoweb.net)

provides: [Browser.Features]

requires: 
  - core/1.2.4: Browser

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

for (var i in Inputs){
    if(!Inputs.hasOwnProperty(i)) continue;
    input.setAttribute("type", Inputs[i]);
    BF.inputs[Inputs[i]] = !!(input.type !== "text");
}

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
	BF.video = {};
    for (var i in Mimes){console.log(i, Mimes[i], BF.canPlay(Mimes[i]))
        BF.video[i] = BF.canPlay(Mimes[i]);
    }
}

})();
