"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const math_1 = require("./math");
const math_2 = require("./math");
const movable_1 = require("./movable");
class Camera extends movable_1.Movable {
    constructor(near, far, fov, aspect) {
        super();
        this.near = near;
        this.far = far;
        this.fov = this.setFOV(fov);
        this.aspect = aspect;
        this.pos = new math_2.Vec(0, 0, 0);
        this.rotation = new math_2.Vec(0, 0, 0);
    }
    getProjection() {
        return math_1.Mat4.projection(this.near, this.far, this.fov, this.aspect);
    }
    getSerializedProjection() {
        return math_1.Mat4.serialize(this.getProjection());
    }
    setFOV(fov) {
        return this.fov = (fov / 360) * (Math.PI * 2);
    }
}
exports.Camera = Camera;
//# sourceMappingURL=camera.js.map