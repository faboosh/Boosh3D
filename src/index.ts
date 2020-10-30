import { Vec } from './lib/math';
import { fabian } from './models';
import { Object3D } from './lib/object3D';
import { gl, initCanvas, getShaderProgram } from './lib/canvas';

const scaleSlider:HTMLInputElement = document.querySelector('#scale');

const projection = [
    [ 0.9, 0, 0 ],
    [ 0, 1.6, 0 ],
    [ 0, 0, 1 ],
]

const cubeObj = new Object3D({
    pos: new Vec(0, 0, 0),
    rotation: new Vec(0, 0, 0),
    mesh: fabian
})

cubeObj.rotation.x = -0.2;

cubeObj.scale = 0.2;

const shaderProgram = getShaderProgram();

function render() {
    initCanvas();

    cubeObj.drawMesh(gl, projection, shaderProgram);

    cubeObj.rotation.y += 0.005;

    window.requestAnimationFrame(render);
}

render();