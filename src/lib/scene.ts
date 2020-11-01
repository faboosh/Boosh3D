import { Object3D } from "./object3D";
import { Camera } from "./camera";
import { gl, initCanvas } from './canvas';
import { key } from './input';

class AsyncAction {
    duration:number;
    name:string;
    action:Function;
    stopCondition:Function;
    constructor(name:string, duration:number, action:Function, stopCondition?: Function) {
        this.name = name;
        this.duration = duration;
        this.action = action;
        this.stopCondition = stopCondition;
    }

    do() {
        this.duration--;
        if(this.duration > 0) {
            if(!this.stopCondition || !this.stopCondition()) {
                this.action();
            }
        }
    }
}

export class Scene {
    objects: { [key: string]: Object3D; } = {};
    asyncActions: { [key: string]: AsyncAction; } = {};
    camera:Camera = new Camera(-1, 5, 80, 16 / 9);
    gl:WebGL2RenderingContext = gl;
    key:any = key;
    initCanvas:Function = initCanvas;
    onUpdate:Function = () => {};


    sceneObjects() {

    }

    init() {
        this.onInit();
        this.sceneObjects();
    }

    onInit() {

    }

    addObject(name:string, object:Object3D) {
        this.objects[name] = object;
    }

    asyncAction(name:string, duration:number, action:Function, stopCondition?:Function) {
        if(!this.asyncActions['name'])
            this.asyncActions['name'] = new AsyncAction(name, duration, action, stopCondition);
    }

    run() {
        this.initCanvas();
        this.onUpdate();
        Object.keys(this.asyncActions).forEach((action:string) => {
            if(this.asyncActions[action]) 
                this.asyncActions[action].do();
            if(this.asyncActions[action] && this.asyncActions[action].duration < 0) 
                this.asyncActions[action] = undefined;
        })
        const { objects, gl, camera} 
            : {
                objects : { [key: string]: Object3D; }, 
                gl:WebGL2RenderingContext, 
                camera:Camera
            } = this;
        
        Object.keys(objects).forEach(function (key:string) {
            objects[key].draw(gl, camera, objects[key].shader)
        })
        
        window.requestAnimationFrame(() =>  this.run());
    }

    getObject(name:string) : Object3D {
        return this.objects[name];
    }
}