"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math_1 = require("../lib/math");
const boosh3D_1 = require("../boosh3D");
const canvas_1 = require("../lib/canvas");
const scene_1 = require("../lib/scene");
const main = new scene_1.Scene();
main.addObject('tank', new boosh3D_1.Object3D({
    pos: new math_1.Vec(0, 0, 5),
    rotation: new math_1.Vec(0, 0, 0),
    mesh: boosh3D_1.loadModel('tank'),
    shader: canvas_1.getShaderProgram()
}));
main.onUpdate = () => {
    main.objects["tank"].rotateY(1);
};
exports.default = main;
//# sourceMappingURL=main.js.map