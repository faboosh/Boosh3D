import { parseOBJ } from './lib/objParser';

export const ico = parseOBJ(require('./obj/ico.obj').default);
export const sphere = parseOBJ(require('./obj/sphere.obj').default);
export const monkey = parseOBJ(require('./obj/monkey.obj').default);
export const ship = parseOBJ(require('./obj/ship.obj').default);
export const tank = parseOBJ(require('./obj/tank.obj').default);
//export const bananaPlant = parseOBJ(require('./obj/banana_plant.obj').default);
export const fabian = parseOBJ(require('./obj/fabian.obj').default);