'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = withCanvas;
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
module.exports = exports['default'];