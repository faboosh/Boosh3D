"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../lib/math");
const boosh3D_1 = require("../boosh3D");
const canvas_1 = require("../lib/canvas");
const boosh3D_2 = require("../boosh3D");
exports.default = new class Titlescreen extends boosh3D_2.Scene {
    constructor() {
        super();
        this.onUpdate = () => {
            let rotationSpeed = 6;
            const title = this.objects.title;
            if (this.key[" "]) {
                this.asyncAction('rotate', 360, () => {
                    title.rotateY(rotationSpeed);
                });
            }
        };
    }
    onInit() {
        this.camera.setFOV(60);
    }
    sceneObjects() {
        this.addObject('title', new boosh3D_1.Object3D({
            pos: new math_1.Vec(0, 0.5, 5),
            rotation: new math_1.Vec(0, 0, 0),
            mesh: boosh3D_1.loadModel('title'),
            shader: canvas_1.getShaderProgram()
        }));
    }
};
//# sourceMappingURL=titlescreen.js.map