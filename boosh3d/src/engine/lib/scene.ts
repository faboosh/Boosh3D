import { Object3D } from "./object3D";
import { Camera } from "./camera";
import { key } from './input';
import { ShaderProgram } from "./shader";
import { Model } from './model';
import { AsyncAction } from './asyncAction';

export class Scene {
    objects: { [key: string]: Object3D; } = {};
    asyncActions: { [key: string]: AsyncAction; } = {};
    camera:Camera = new Camera(-1, 5, 80, 16 / 9);
    gl:WebGL2RenderingContext | undefined;
    key:any = key;
    shaders: { [key: string]: ShaderProgram; } = {};
    models: { [key: string]: Model; } = {};
    initCanvas:Function | undefined;
    onUpdate:Function = () => {};

    sceneObjects() {

    }

    async init() {
        return new Promise(async (resolve, reject) => {
            await Promise.all(this.load())
            this.sceneObjects();
            this.onInit();
            resolve();
        })
    }

    onInit() {

    } 

    load() {
        return []
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
        this.camera.setAspect(window.innerWidth / window.innerHeight);
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


    loadShader(name:string) {
        return new Promise(async (resolve, reject) => {
            const shader = new ShaderProgram(name, this.gl)
            await shader.load();      
            this.shaders[name] = shader;
            resolve(shader);
        })
    }

    loadModel(name:string) {
        return new Promise(async (resolve, reject) => {
            const model = new Model(name);
            await model.load();
            this.models[name] = model;
            resolve(model);
        })
    }
}