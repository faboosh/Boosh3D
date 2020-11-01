"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Boosh3D = void 0;
const camera_1 = require("./camera");
const canvas_1 = require("./canvas");
class Boosh3D {
    constructor() {
        this.objects = {};
        this.camera = new camera_1.Camera(-1, 5, 80, 16 / 9);
        this.gl = canvas_1.gl;
        this.initCanvas = canvas_1.initCanvas;
        this.onUpdate = () => { };
    }
    addObject(name, object) {
        this.objects[name] = object;
    }
    run() {
        this.initCanvas();
        this.onUpdate();
        const { objects, gl, camera, run } = this;
        Object.keys(objects).forEach(function (key) {
            objects[key].draw(gl, camera, objects[key].shader);
        });
        window.requestAnimationFrame(() => this.run());
    }
}
exports.Boosh3D = Boosh3D;
//# sourceMappingURL=boosh3D.js.map