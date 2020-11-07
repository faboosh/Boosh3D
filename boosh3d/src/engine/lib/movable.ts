import { Vec, angleToRadiant } from './math';

export class Movable {
    pos: Vec;
    rotation: Vec;

    constructor() {
        this.pos = new Vec(0, 0, 0);
        this.rotation = new Vec(0, 0, 0);
    }

    rotateX(deg:number) {
        this.rotation.x += angleToRadiant(deg) 
    }

    rotateY(deg:number) {
        this.rotation.y += angleToRadiant(deg)
    }

    rotateZ(deg:number) {
        this.rotation.z += angleToRadiant(deg)
    }

    moveX(units:number) {
        this.pos.translate(new Vec(units, 0, 0))
    }

    moveY(units:number) {
        this.pos.translate(new Vec(0, units, 0))
    }

    moveZ(units:number) {
        this.pos.translate(new Vec(0, 0, units))
    }
}