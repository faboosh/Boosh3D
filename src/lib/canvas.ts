export const canvas = <HTMLCanvasElement> document.querySelector('#render');
export const gl:WebGL2RenderingContext = canvas.getContext('webgl2');

export function initCanvas() {
    const height:number = window.innerHeight;
    const width:number = window.innerWidth;
    canvas.height = width / 16 * 9;
    canvas.width = width;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const size = {
        width,
        height,
        center: {
            x: width / 2,
            y: height / 2
        }
    }

    return size;
}

export function getShaderProgram() {
    gl.enable(gl.DEPTH_TEST);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, require('../shaders/vertexShader.glsl').default);
    gl.shaderSource(fragmentShader, require('../shaders/fragmentShader.glsl').default);

    gl.compileShader(vertexShader);
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('error compiling vertex shader', gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('error compiling fragment shader', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('ERROR linking program', gl.getProgramInfoLog(program));
        return;
    }

    return program;
}