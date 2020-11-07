import { Mat4 } from './math';
import { Vec, rotate3D } from './math';
import { Movable } from './movable';

export class Camera extends Movable {
    near:number;
    far:number;
    fov:number;
    aspect:number;
    
    constructor(near:number, far:number, fov:number, aspect:number) {
        super();
        this.near = near;
        this.far = far;
        this.fov = this.setFOV(fov);
        this.aspect = aspect;
        this.pos = new Vec(0, 0, 0);
        this.rotation = new Vec(0, 0, 0);
    }

    getProjection() : number[][] {
        return Mat4.projection(this.near, this.far, this.fov, this.aspect);
    }

    getSerializedProjection() : number[] {
        return Mat4.serialize(this.getProjection());
    }

    setFOV(fov:number) : number {
        return this.fov = (fov / 360) * (Math.PI * 2);
    }

    getFOV() : number {
        return Math.round((this.fov * 360) / (Math.PI * 2));
    }
}