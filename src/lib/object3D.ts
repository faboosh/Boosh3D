import { Vec, rotate3D, pointsToVec, matrixToVec, matMul, vecToMatrix } from './math'
import { drawPolygon } from './draw';

export class Object3D {
    pos: Vec;
    rotation: Vec;
    scale: number;
    mesh: number[][][];
    colors: any;

    constructor({pos, rotation, mesh}: {pos: Vec, rotation: Vec, mesh:number[][][]}) {
        this.pos = pos;
        this.rotation = rotation;
        this.scale = 1;
        this.mesh = mesh;
        this.colors = this.mesh.map(() => {
            return {
                r: 0.6 + (Math.random() * 0.4),
                g: 0 + (Math.random() * 0),
                b: 0.2 + (Math.random() * 0.1),
            }
        })
    }

    drawMesh(gl:WebGL2RenderingContext, projection: number[][], program:WebGLShader) {
        const projected = this.mesh.map(polygon => {
            return polygon.map(point => {
    
    
                let rotated = rotate3D(pointsToVec(point), this.rotation);
    
                let projected = matrixToVec(
                    matMul(projection, vecToMatrix(rotated))
                );
    
                projected.scale(this.scale);
                projected.translate(this.pos)
    
                return projected;
            })
        });

        projected.forEach((polygon, i) => {
            drawPolygon(polygon, gl, program, this.colors[i]);
        })
    }
}