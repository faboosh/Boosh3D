import { Object3D, Scene, Util } from '../boosh3D';

export default class Test extends Scene {
    sceneObjects() {
            this.addObject('tank', new Object3D({
                pos: new Util.Vec(0, 0, 5),
                rotation: new Util.Vec(0, 0, 0),
                mesh: this.models['tank'].get(),
                shader: this.shaders['basic'].get()
            }));
    }

    onInit() {
    }

    load() {
        return [
            this.loadShader('basic'),
            this.loadModel('tank')
        ]
    }

    onUpdate = () => {
        Object.entries(this.objects).forEach((object:any) => {
            object[1].rotateY(1);
        })

        if(this.key['q']) this.camera.setFOV(80)
        if(this.key['e']) this.camera.setFOV(35)
    }
    
};