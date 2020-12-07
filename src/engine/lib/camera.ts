import { Mat4 } from './math';
import { Vec, rotate3D } from './math';
import { Movable } from './movable';

export class Camera extends Movable {
    private near: number;
    private far: number;
    private fov: number;
    private aspect: number;

    constructor(near: number, far: number, fov: number, aspect: number) {
        super();
        this.near = near;
        this.far = far;
        this.fov = this.setFOV(fov);
        this.aspect = aspect;
        this.pos = new Vec(0, 0, 0);
        this.rotation = new Vec(0, 0, 0);
    }

    setAspect(aspect: number) {
        this.aspect = aspect;
    }

    getProjection(): number[][] {
        return Mat4.projection(this.near, this.far, this.fov, this.aspect);
    }

    getSerializedProjection(): number[] {
        return Mat4.serialize(this.getProjection());
    }

    getSerializedRotation(): number[] {
        return [this.rotation.x, this.rotation.y, this.rotation.z];
    }

    getSerializedPosition(): number[] {
        return [this.pos.x, this.pos.y, this.pos.z];
    }

    setFOV(fov: number): number {
        return this.fov = (fov / 360) * (Math.PI * 2);
    }

    getFOV(): number {
        return Math.round((this.fov * 360) / (Math.PI * 2));
    }
}