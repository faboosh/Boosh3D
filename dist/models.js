"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fabian = exports.tank = exports.ship = exports.monkey = exports.sphere = exports.ico = void 0;
const objParser_1 = require("./lib/objParser");
exports.ico = objParser_1.parseOBJ(require('./obj/ico.obj').default);
exports.sphere = objParser_1.parseOBJ(require('./obj/sphere.obj').default);
exports.monkey = objParser_1.parseOBJ(require('./obj/monkey.obj').default);
exports.ship = objParser_1.parseOBJ(require('./obj/ship.obj').default);
exports.tank = objParser_1.parseOBJ(require('./obj/tank.obj').default);
//export const bananaPlant = parseOBJ(require('./obj/banana_plant.obj').default);
exports.fabian = objParser_1.parseOBJ(require('./obj/fabian.obj').default);
//# sourceMappingURL=models.js.map