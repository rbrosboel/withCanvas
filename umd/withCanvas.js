/*!
 * withCanvas v1.0.0
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["withCanvas"] = factory();
	else
		root["withCanvas"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = withCanvas;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function withCanvas(id) {
    var scene = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var container = document.getElementById(id);
    if (!container) {
        throw new Error('Unknown element #' + id);
    }
    var canvas = document.createElement('canvas');
    var context = canvas.getContext("2d");
    var props = void 0;
    var animationFrame = void 0;

    function resize() {
        var _scene$options = scene.options,
            height = _scene$options.height,
            width = _scene$options.width;


        canvas.height = height || container.offsetHeight;
        canvas.width = width || container.offsetWidth;
        return props;
    }

    function draw(ms) {
        ms = ms || performance.now();

        props.delta = props.time ? ms - props.time : 0;
        props.time = ms;

        scene.render && scene.render(props);

        props.running && window.requestAnimationFrame(draw);
        return props;
    }

    function start() {
        props.running = true;
        animationFrame = window.requestAnimationFrame(draw);
        return props;
    }

    function stop() {
        props.running = false;
        window.cancelAnimationFrame(animationFrame);
        return props;
    }

    function constrain(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function map(value, minIn, maxIn, minOut, maxOut) {
        return (value - minIn) / (maxIn - minIn) * (maxOut - minOut) + minOut;
    }

    function eventHandler(name) {
        return function (event) {
            return scene[name] && scene[name](_extends({}, props, { event: event }));
        };
    }

    document.addEventListener('resize', function (event) {
        resize();scene.resize && scene.resize(_extends({}, props, { event: event }));
    });
    document.addEventListener('keydown', eventHandler('keyDown'));
    document.addEventListener('keyup', eventHandler('keyUp'));
    canvas.addEventListener('mousedown', eventHandler('mouseDown'));
    canvas.addEventListener('mouseup', eventHandler('mouseUp'));
    canvas.addEventListener('mousemove', eventHandler('mouseMove'));
    canvas.addEventListener('mousewheel', eventHandler('mouseWheel'));

    props = {
        scene: scene,
        container: container,
        canvas: canvas,
        context: context,
        draw: draw,
        start: start,
        stop: stop,
        constrain: constrain,
        map: map
    };

    resize();
    scene.init && scene.init(props);
    draw();

    container.appendChild(canvas);

    return props;
}

/***/ })
/******/ ])["default"];
});