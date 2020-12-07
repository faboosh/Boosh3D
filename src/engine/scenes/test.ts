import { Object3D, Scene, Util } from '../lib/boosh3D';

export default class Test extends Scene {
    sceneObjects() {
            this.addObject('sniper', new Object3D({
                pos: new Util.Vec(0, 0, 8),
                rotation: new Util.Vec(0, 0, 0),
                mesh: this.models['sniper'].get(),
                shader: this.shaders['basic'].get()
            }));
    }

    onInit() {
    }

    load() {
        return [
            this.loadShader('basic'),
            this.loadModel('sniper')
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