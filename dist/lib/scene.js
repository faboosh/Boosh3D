"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const camera_1 = require("./camera");
const canvas_1 = require("./canvas");
const input_1 = require("./input");
class AsyncAction {
    constructor(name, duration, action, stopCondition) {
        this.name = name;
        this.duration = duration;
        this.action = action;
        this.stopCondition = stopCondition;
    }
    do() {
        this.duration--;
        if (this.duration > 0) {
            if (!this.stopCondition || !this.stopCondition()) {
                this.action();
            }
        }
    }
}
class Scene {
    constructor() {
        this.objects = {};
        this.asyncActions = {};
        this.camera = new camera_1.Camera(-1, 5, 80, 16 / 9);
        this.gl = canvas_1.gl;
        this.key = input_1.key;
        this.initCanvas = canvas_1.initCanvas;
        this.onUpdate = () => { };
    }
    sceneObjects() {
    }
    init() {
        this.onInit();
        this.sceneObjects();
    }
    onInit() {
    }
    addObject(name, object) {
        this.objects[name] = object;
    }
    asyncAction(name, duration, action, stopCondition) {
        if (!this.asyncActions['name'])
            this.asyncActions['name'] = new AsyncAction(name, duration, action, stopCondition);
    }
    run() {
        this.initCanvas();
        this.onUpdate();
        Object.keys(this.asyncActions).forEach((action) => {
            if (this.asyncActions[action])
                this.asyncActions[action].do();
            if (this.asyncActions[action] && this.asyncActions[action].duration < 0)
                this.asyncActions[action] = undefined;
        });
        const { objects, gl, camera } = this;
        Object.keys(objects).forEach(function (key) {
            objects[key].draw(gl, camera, objects[key].shader);
        });
        window.requestAnimationFrame(() => this.run());
    }
    getObject(name) {
        return this.objects[name];
    }
}
exports.Scene = Scene;
//# sourceMappingURL=scene.js.map