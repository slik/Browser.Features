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

var el = {
	canvas: document.createElement('canvas'),
	video: document.createElement("video"),
	audio: document.createElement("audio"),
	input: document.createElement("input"),
	iframe: document.createElement('iframe')
}
var BF = Browser.Features;

BF.extend = function(obj){
	for (var i in obj){
		this[i] = obj[i];
	}
}

BF.extend({
	
	tag: {
		canvas: !!el.canvas.getContext,
		
		video: !!el.video.canPlayType,
		audio: !!el.audio.canPlayType,
		command: 'type' in document.createElement('command'),
		datalist: 'options' in document.createElement('datalist'),
		details: 'open' in document.createElement('details'),
		device: 'type' in document.createElement('device'),
		meter: 'value' in document.createElement('meter'),
		output: 'value' in document.createElement('output'),
		progress: 'value' in document.createElement('progress'),
		time: 'valueAsDate' in document.createElement('time'),
		form: {
			validation: 'noValidate' in document.createElement('form')
		},
		iframe: {
			sandbox: 'sandbox' in el.iframe,
			srcdoc: 'srcdoc' in el.iframe
		},
		input: {
			placeholder: ('placeholder' in el.input),
			autofocus: ('autofocus' in el.input),
			type: {}
		}
	},
	
	media: {},
	
	localStorage: (('localStorage' in window) && window['localStorage'] !== null),
	workers: !!window.Worker,
	applicationCache: !!window.applicationCache,
	geolocation: !!navigator.geolocation,
	
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
	el.input.setAttribute("type", Inputs[i]);
	BF.tag.input.type[Inputs[i]] = !!(el.input.type !== "text");
}

var Mimes = {
	audio: {
		mp3: 'audio/mpeg;',
		ogg: 'audio/ogg; codecs="vorbis"',
		wav: 'audio/wav; codecs="1"',
		aac: 'audio/mp4; codecs="mp4a.40.2"'
	},
	video: {
		h264: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
		ogg: 'video/ogg; codecs="theora, vorbis"',
		webm: 'video/webm; codecs="vp8, vorbis"'
	}
}

BF.extend({
	
	canvasText: (function(){
		if (!BF.canvas) { return false; }
		return typeof el.canvas.getContext('2d').fillText == 'function';
	})()
	
});

for (var context in Mimes){
	if(BF.tag[context]){
		BF.media[context] = {};
		for (var i in Mimes[context]){
			BF.media[context][i] = el[context].canPlayType(Mimes[context][i]).replace(/no/, '');
		}
	}
}

})();
