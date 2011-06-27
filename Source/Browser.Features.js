/*
---

name: Browser.Features

description: Browser features detector.

license: MIT-style license.

copyright: Copyright (c) 2010.

authors: Slik (http://diveintoweb.net)

provides: [Browser.Features]

requires:
  - core/1.3: Browser

...
*/

(function(){

var BF = Browser.Features;

BF.add = function(name, func, cache){
	if(cache){
		var results = {};

		BF[name] = function(){
			var args = Array.prototype.slice.apply(arguments);
			var token = args.join(',');

			if(!results[token]){
				results[token] = func.apply(null, args);
			}

			return results[token];
		}
	} else {
		BF[name] = func;
	}
}

var tags = {
	canvas: function(type){
		var canvas = document.createElement('canvas');
		if(!type){
			return !!canvas.getContext;
		}
		if(arguments.callee()) switch(type){
			'text': return canvas.getContext('2d').fillText == 'function'; break;
			default: return false;
		}
	},

	video: function(type){
		var video = document.createElement("video");
		if(!type){
			return !!video.canPlayType;
		}
		if(arguments.callee()) switch(type){
			case 'h264': return video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'); break;
			case 'ogg': return video.canPlayType('video/ogg; codecs="theora, vorbis"'); break;
			case 'webm': return video.canPlayType('video/webm; codecs="vp8, vorbis"'); break;
			default: return false;
		}
	},

	audio: function(type){
		var audio = document.createElement('audio');
		if(!type){
			return !!audio.canPlayType;
		}
		if(arguments.callee()) switch(type){
			case 'mp3': return audio.canPlayType('audio/mpeg;'); break;
			case 'ogg': return audio.canPlayType('audio/ogg; codecs="vorbis"'); break;
			case 'wav': return audio.canPlayType('audio/wav; codecs="1"'); break;
			case 'aac': return audio.canPlayType('audio/mp4; codecs="mp4a.40.2"'); break;
			default: return false;
		}
	},

	command: function(){
		return 'type' in document.createElement('command');
	},

	datalist: function(){
		return 'options' in document.createElement('datalist');
	},

	details: function(){
		return 'open' in document.createElement('details');
	},

	device: function(){
		return 'type' in document.createElement('device');
	},

	meter: function(){
		return 'value' in document.createElement('meter');
	},

	output: function(){
		return 'value' in document.createElement('output');
	},

	progress: function(){
		return 'value' in document.createElement('progress');
	},

	time: function(){
		return 'valueAsDate' in document.createElement('time');
	},

	form: function(type){
		var form = document.createElement('form');
		switch(type){
			case 'validation': return 'noValidate' in form; break;
			default: return false;
		}
	},

	iframe: function(type){
		return type in document.createElement('iframe');
	},

	input: function(type){
		var input = document.createElement('input');
		if(type in ['placeholder', 'autofocus']){
			return type in input;
		} else {
			if(type == "text") return true;

			input.setAttribute("type", type);
			return !!(input.type !== "text");
		}
	}

};

BF.add('tag', function(name){
	if(tags[name]){
		return tags[name](Array.prototype.slice.call(arguments, 1));
	}
}, true);

BF.add('localStorage', function(){
	return (('localStorage' in window) && window['localStorage'] !== null);
}, true);

BF.add('workders', function(){
	return !!window.Worker;
}, true);

BF.add('applicationCache', function(){
	return !!window.applicationCache;
}, true);

BF.add('geolocation', function(){
	return !!navigator.geolocation;
}, true);

BF.add('microdata', function(){
	return !!document.getItems;
});

})();
