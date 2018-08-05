export default function withCanvas(id, scene = {}) {
    const container = document.getElementById(id)
    if (!container) {
        throw new Error('Unknown element #' + id)
    }
    const canvas = document.createElement('canvas')
    const context = canvas.getContext("2d")
    let props
    let animationFrame

    function resize() {
        const {
            height,
            width,
        } = scene.options

        canvas.height = height || container.offsetHeight
        canvas.width = width || container.offsetWidth
        return props
    }

    function draw(ms) {
        ms = ms || performance.now()

        props.delta = props.time ? ms - props.time : 0
        props.time = ms

        scene.render && scene.render(props)

        props.running && window.requestAnimationFrame(draw)
        return props
    }
    
    function start() {
        props.running = true
        animationFrame = window.requestAnimationFrame(draw)
        return props
    }
    
    function stop() {
        props.running = false
        window.cancelAnimationFrame(animationFrame)
        return props
    }

    function constrain(value, min, max) {
        return Math.max(min, Math.min(max, value))
    }

    function map(value, minIn, maxIn, minOut, maxOut) {
        return (value - minIn) / (maxIn - minIn) * (maxOut - minOut) + minOut
    }

    function eventHandler(name) {
        return event => scene[name] && scene[name]({...props, event})
    }

    document.addEventListener('resize', event => {resize(); scene.resize && scene.resize({...props, event})})
    document.addEventListener('keydown', eventHandler('keyDown'))
    document.addEventListener('keyup', eventHandler('keyUp'))
    canvas.addEventListener('mousedown', eventHandler('mouseDown'))
    canvas.addEventListener('mouseup', eventHandler('mouseUp'))
    canvas.addEventListener('mousemove', eventHandler('mouseMove'))
    canvas.addEventListener('mousewheel', eventHandler('mouseWheel'))

    props = {
        scene,
        container,
        canvas,
        context,
        draw,
        start,
        stop,
        constrain,
        map,
    }

    resize()
    scene.init && scene.init(props)
    draw()

    container.appendChild(canvas)

    return props
}

