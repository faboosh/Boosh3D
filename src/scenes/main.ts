import { Vec } from '../lib/math';
import { Object3D, loadModel } from '../boosh3D';
import { getShaderProgram } from '../lib/canvas';
import { Scene } from '../lib/scene';

const main = new Scene();

main.addObject('tank', new Object3D({
    pos: new Vec(0, 0, 5),
    rotation: new Vec(0, 0, 0),
    mesh: loadModel('tank'),
    shader: getShaderProgram()
}));

main.onUpdate = () => {
    main.objects["tank"].rotateY(1);
}

export default main;