import { Vec, rotate3D, pointsToVec, angleToRadiant } from './math'
import { drawPolygon } from './draw';
import { Camera } from './camera';
import { Movable } from './movable';

export class Object3D extends Movable {
    scale: number;
    mesh: number[][][];
    colors: any;
    shader: any;

    constructor({pos, rotation, mesh, shader}: {pos: Vec, rotation: Vec, mesh:number[][][], shader:any}) {
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
                b: 0.8 + (Math.random() * 0.1),
            }
        })
    }

    draw(gl:WebGL2RenderingContext, camera: Camera, program:WebGLShader) {
        const transformed = this.mesh.map(polygon => {
            return polygon.map(point => {
    
                let vec = rotate3D(pointsToVec(point), this.rotation)

                vec.scale(this.scale);
                vec.translate(this.pos)
    
                return vec;
            })
        });

        transformed.forEach((polygon, i) => {
            drawPolygon(polygon, gl, program, this.colors[i], {
                mProjection: camera.getSerializedProjection()
            });
        })
    }
}