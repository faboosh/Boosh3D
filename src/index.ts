import { Vec } from './math';
import { tank } from './models';
import { Object3D } from './object3D';
import { ctx, initCanvas } from './canvas';

const scaleSlider:HTMLInputElement = document.querySelector('#scale');

const projection = [
    [ 1, 0, 0 ],
    [ 0, 1, 0 ],
    [ 0, 0, 1 ],
]

const cubeObj = new Object3D({
    pos: new Vec(200, 200, 0),
    rotation: new Vec(0, 0, 0),
    mesh: tank
})

cubeObj.rotation.x = 0.1;
cubeObj.rotation.y = -2.8;

function render() {
    const { width, height, center } = initCanvas();

    cubeObj.pos = Vec.fromObject({...center, z: 0});

    cubeObj.scale = Number(scaleSlider.value) * 2;

    cubeObj.drawMesh(ctx, projection);

    cubeObj.rotation.y += 0.01;

    window.requestAnimationFrame(render);
}

render();