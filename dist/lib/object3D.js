"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Object3D = void 0;
const math_1 = require("./math");
const draw_1 = require("./draw");
const movable_1 = require("./movable");
class Object3D extends movable_1.Movable {
    constructor({ pos, rotation, mesh, shader }) {
        super();
        this.pos = pos;
        this.rotation = rotation;
        this.scale = 1;
        this.mesh = mesh;
        this.shader = shader;
        this.colors = this.mesh.map(() => {
            return {
                r: 0.6 + (Math.random() * 0.4),
                g: 0 + (Math.random() * 0),
                b: 0.2 + (Math.random() * 0.1),
            };
        });
    }
    draw(gl, camera, program) {
        const transformed = this.mesh.map(polygon => {
            return polygon.map(point => {
                let vec = math_1.rotate3D(math_1.pointsToVec(point), this.rotation);
                vec.scale(this.scale);
                vec.translate(this.pos);
                return vec;
            });
        });
        transformed.forEach((polygon, i) => {
            draw_1.drawPolygon(polygon, gl, program, this.colors[i], {
                mProjection: camera.getSerializedProjection()
            });
        });
    }
}
exports.Object3D = Object3D;
//# sourceMappingURL=object3D.js.map