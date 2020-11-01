import { Scene } from "./lib/scene";
import { Object3D } from "./lib/object3D";
import { key, onKeyDown, onKeyUp } from "./lib/input";
import { parseOBJ } from './lib/objParser';

export default class Boosh3D {
    scenes: { [key: string]: Scene; } = {};

    addScene(name:string, scene:Scene) {
        scene.init();
        this.scenes[name] = scene;
    }

    setScene(name:string) {
        this.scenes[name].run()
    }
}

function loadModel(name:string) {
    return parseOBJ(require(`./models/${name}.obj`).default);
}

export {
    Object3D,
    key,
    Scene,
    loadModel,
    onKeyDown, 
    onKeyUp
}