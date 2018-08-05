# withCanvas

Creates a new canvas, sets up mouse and keyboard events, and provides an animation frame loop. All rendering and events are delegated to the provided  scene object.

## Usage

### withCanvas(container, scene) : props
- `container`: An HTML element ID
- `scene`: Object providing options and implementing event handlers

Upon initialization, the following callbacks will be called immediately:
- `init()`
- `render()`

### scene
- `options`:
    + `width`: Canvas width (default to container's width)
    + `height`: Canvas height (default to container's height)
- `init(props)`: Called on initialization
- `render(props)`: Called on each animation frame
- `resize(props)`: Called on resize event
- `keyDown(props)`: Called on keyDown event
- `keyUp(props)`: Called on keyUp event
- `mouseDown(props)`: Called on mouseDown event
- `mouseUp(props)`: Called on mouseUp event
- `mouseMove(props)`: Called on mouseMove event
- `mouseWheel(props)`: Called on mouseWheel event

### props
- `scene`: The `scene` object provided to `withCanvas`
- `container`: Container HTML element
- `canvas`: Canvas HTML element
- `context`: 2D rendering context for `canvas`
- `draw()`: Trigger a call to `scene.render`
- `start()`: Start the animation frame loop
- `stop()`: Stop the animation frame loop
- `running`: True while the animation loop is running
- `time`: Current time in milliseconds
- `delta`: Milliseconds since last frame
- `constrain(value, min, max)`: Clip a value to a range
- `map(value, inMin, inMax, outMin, outMax)`: Map a value from one range to another
