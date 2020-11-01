"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShaderProgram = exports.initCanvas = exports.gl = exports.canvas = void 0;
exports.canvas = document.querySelector('#render');
exports.gl = exports.canvas.getContext('webgl2');
function initCanvas() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    exports.canvas.height = width / 16 * 9;
    exports.canvas.width = width;
    exports.gl.viewport(0, 0, exports.gl.drawingBufferWidth, exports.gl.drawingBufferHeight);
    exports.gl.clearColor(0.1, 0.1, 0.1, 1.0);
    exports.gl.clear(exports.gl.COLOR_BUFFER_BIT | exports.gl.DEPTH_BUFFER_BIT);
    const size = {
        width,
        height,
        center: {
            x: width / 2,
            y: height / 2
        }
    };
    return size;
}
exports.initCanvas = initCanvas;
function getShaderProgram() {
    exports.gl.enable(exports.gl.DEPTH_TEST);
    const vertexShader = exports.gl.createShader(exports.gl.VERTEX_SHADER);
    const fragmentShader = exports.gl.createShader(exports.gl.FRAGMENT_SHADER);
    exports.gl.shaderSource(vertexShader, require('../shaders/vertexShader.glsl').default);
    exports.gl.shaderSource(fragmentShader, require('../shaders/fragmentShader.glsl').default);
    exports.gl.compileShader(vertexShader);
    if (!exports.gl.getShaderParameter(vertexShader, exports.gl.COMPILE_STATUS)) {
        console.error('error compiling vertex shader', exports.gl.getShaderInfoLog(vertexShader));
        return;
    }
    exports.gl.compileShader(fragmentShader);
    if (!exports.gl.getShaderParameter(fragmentShader, exports.gl.COMPILE_STATUS)) {
        console.error('error compiling fragment shader', exports.gl.getShaderInfoLog(fragmentShader));
        return;
    }
    const program = exports.gl.createProgram();
    exports.gl.attachShader(program, vertexShader);
    exports.gl.attachShader(program, fragmentShader);
    exports.gl.linkProgram(program);
    if (!exports.gl.getProgramParameter(program, exports.gl.LINK_STATUS)) {
        console.error('ERROR linking program', exports.gl.getProgramInfoLog(program));
        return;
    }
    return program;
}
exports.getShaderProgram = getShaderProgram;
//# sourceMappingURL=canvas.js.map