"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movable = void 0;
const math_1 = require("./math");
class Movable {
    constructor() {
        this.pos = new math_1.Vec(0, 0, 0);
        this.rotation = new math_1.Vec(0, 0, 0);
    }
    rotateX(deg) {
        this.rotation.x += math_1.angleToRadiant(deg);
    }
    rotateY(deg) {
        this.rotation.y += math_1.angleToRadiant(deg);
    }
    rotateZ(deg) {
        this.rotation.z += math_1.angleToRadiant(deg);
    }
    moveX(units) {
        this.pos.translate(new math_1.Vec(units, 0, 0));
    }
    moveY(units) {
        this.pos.translate(new math_1.Vec(0, units, 0));
    }
    moveZ(units) {
        this.pos.translate(new math_1.Vec(0, 0, units));
    }
}
exports.Movable = Movable;
//# sourceMappingURL=movable.js.map