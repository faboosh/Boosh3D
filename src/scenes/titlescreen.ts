import { Vec } from '../lib/math';
import { Object3D, loadModel } from '../boosh3D';
import { getShaderProgram } from '../lib/canvas';
import { Scene } from '../boosh3D';

export default new class Titlescreen extends Scene {
    constructor() {
        super();
    }
    
    onInit() {
        this.camera.setFOV(60);
    }

    sceneObjects() {
        this.addObject('title', new Object3D({
            pos: new Vec(0, 0.5, 5),
            rotation: new Vec(0, 0, 0),
            mesh: loadModel('title'),
            shader: getShaderProgram()
        }));
    }

    onUpdate = () => {
        let rotationSpeed = 6;
        const title = this.objects.title;
    
        if(this.key[" "]) {
            this.asyncAction('rotate', 360, () => {
                title.rotateY(rotationSpeed);
            })
        }
    }
}