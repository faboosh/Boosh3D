import { Scene } from "./lib/scene";
import { Object3D } from "./lib/object3D";
import { key, onKeyDown, onKeyUp } from "./lib/input";
import * as Util from './lib/math';

export default class Boosh3D {
    scenes: { [key: string]: Scene; } = {};
    canvas:HTMLCanvasElement
    gl:WebGL2RenderingContext;

    constructor(selector:string) {
        this.canvas = <HTMLCanvasElement>document.querySelector(selector);
        this.gl = <WebGL2RenderingContext>this.canvas.getContext('webgl2');
    }

    addScene(name:string, scene:any) {
        const newScene = new scene();
        newScene.gl = this.gl;
        newScene.initCanvas = () => {
            initCanvas(this.canvas, this.gl)
        }
        this.scenes[name] = newScene;
    }

    async setScene(name:string) {
        console.log(`set scene to ${name}`)
        const scene = this.scenes[name];
        await scene.init()
        scene.run();
    }
}

function initCanvas(canvas:HTMLCanvasElement, gl:WebGL2RenderingContext) {
    const height:number = window.innerHeight;
    const width:number = window.innerWidth;
    canvas.height = height;
    canvas.width = width;

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const size = {
        width,
        height,
        center: {
            x: width / 2,
            y: height / 2
        }
    }

    return size;
}

export {
    Object3D,
    key,
    Scene,
    onKeyDown, 
    onKeyUp,
    Util
}