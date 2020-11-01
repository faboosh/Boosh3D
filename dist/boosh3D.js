"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onKeyUp = exports.onKeyDown = exports.loadModel = exports.Scene = exports.key = exports.Object3D = void 0;
const scene_1 = require("./lib/scene");
Object.defineProperty(exports, "Scene", { enumerable: true, get: function () { return scene_1.Scene; } });
const object3D_1 = require("./lib/object3D");
Object.defineProperty(exports, "Object3D", { enumerable: true, get: function () { return object3D_1.Object3D; } });
const input_1 = require("./lib/input");
Object.defineProperty(exports, "key", { enumerable: true, get: function () { return input_1.key; } });
Object.defineProperty(exports, "onKeyDown", { enumerable: true, get: function () { return input_1.onKeyDown; } });
Object.defineProperty(exports, "onKeyUp", { enumerable: true, get: function () { return input_1.onKeyUp; } });
const objParser_1 = require("./lib/objParser");
class Boosh3D {
    constructor() {
        this.scenes = {};
    }
    addScene(name, scene) {
        scene.init();
        this.scenes[name] = scene;
    }
    setScene(name) {
        this.scenes[name].run();
    }
}
exports.default = Boosh3D;
function loadModel(name) {
    return objParser_1.parseOBJ(require(`./models/${name}.obj`).default);
}
exports.loadModel = loadModel;
//# sourceMappingURL=boosh3D.js.map