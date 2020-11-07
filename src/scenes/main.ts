import { Object3D, loadModel, Scene, Util } from '../boosh3D';

export default class Main extends Scene {
    constructor() {
        super()
    }

    sceneObjects() {
        this.addObject('ship', new Object3D({
            pos: new Util.Vec(5, 2, 10),
            rotation: new Util.Vec(0, -2, 0),
            mesh: loadModel('ship'),
            shader: this.getShaderProgram('basic')
        }));

        this.addObject('ship2', new Object3D({
            pos: new Util.Vec(-5, 0, 10),
            rotation: new Util.Vec(0, 0, 0),
            mesh: loadModel('ship'),
            shader: this.getShaderProgram('basic')
        }));
    }

    onInit() {
        this.objects['ship'].rotateX(180);
        this.objects['ship2'].rotateX(180);
    }

    onUpdate = () => {
        this.objects["ship"].rotateY(1);
        this.objects["ship2"].rotateY(1);

        if(this.key['q']) this.camera.setFOV(80)
        if(this.key['e']) this.camera.setFOV(35)
    }
    
};