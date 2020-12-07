import { Object3D, Scene, Util } from '../lib/boosh3D';

export default class Main extends Scene {
    sceneObjects() {
        for (let i = -20; i < 20; i++) {
            this.addObject('tank' + (i + 20), new Object3D({
                pos: new Util.Vec(i, (Math.random() * 5) - 2.5, 1 + (Math.random() * 20)),
                rotation: new Util.Vec(0, -2, 0),
                mesh: this.models['ico'].get(),
                shader: this.shaders['basic'].get()
            }));
        }
    }

    onInit() {
    }

    load() {
        return [
            this.loadShader('basic'),
            this.loadModel('ico')
        ]
    }

    onUpdate = (deltaTime, frameNum) => {
        Object.entries(this.objects).forEach((object: any) => {
            object[1].rotateY(1 * deltaTime);
        })

        //if (this.key['q']) this.camera.setFOV(80)
        //if (this.key['e']) this.camera.setFOV(35)

        const turnSpeed = 1;
        const walkSpeed = 0.2;

        if (this.key['a']) this.camera.rotateY(turnSpeed * deltaTime)
        if (this.key['d']) this.camera.rotateY(-(turnSpeed * deltaTime))

        if (this.key['w']) this.camera.moveZ(-(walkSpeed * deltaTime))
        if (this.key['s']) this.camera.moveZ(walkSpeed * deltaTime)
    }

};