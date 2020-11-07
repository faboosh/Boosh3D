import { Vec } from '../lib/math';
import { Object3D, loadModel } from '../boosh3D';
import { Scene } from '../boosh3D';

export default class Titlescreen extends Scene {
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
            shader: this.getShaderProgram('basic')
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