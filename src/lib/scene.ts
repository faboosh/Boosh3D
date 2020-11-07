import { Object3D } from "./object3D";
import { Camera } from "./camera";
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
    gl:WebGL2RenderingContext;
    key:any = key;
    initCanvas:Function;
    onUpdate:Function = () => {};

    sceneObjects() {

    }

    init() {
        this.sceneObjects();
        this.onInit();
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


    getShaderProgram(name:string) {
        this.gl.enable(this.gl.DEPTH_TEST);
    
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
    
        this.gl.shaderSource(vertexShader, require(`../shaders/${name}.vertex.glsl`).default);
        this.gl.shaderSource(fragmentShader, require(`../shaders/${name}.fragment.glsl`).default);
    
        this.gl.compileShader(vertexShader);
        if(!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
            console.error('error compiling vertex shader', this.gl.getShaderInfoLog(vertexShader));
            return;
        }
    
        this.gl.compileShader(fragmentShader);
        if(!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
            console.error('error compiling fragment shader', this.gl.getShaderInfoLog(fragmentShader));
            return;
        }
    
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        if(!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            console.error('ERROR linking program', this.gl.getProgramInfoLog(program));
            return;
        }
    
        return program;
    }
}