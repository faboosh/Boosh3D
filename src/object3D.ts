import { Vec, rotate3D, pointsToVec, matrixToVec, matMul, vecToMatrix } from './math'
import { drawPolygon } from './draw';

export class Object3D {
    pos: Vec;
    rotation: Vec;
    scale: number;
    mesh: number[][][];

    constructor({pos, rotation, mesh}: {pos: Vec, rotation: Vec, mesh:number[][][]}) {
        this.pos = pos;
        this.rotation = rotation;
        this.scale = 1;
        this.mesh = mesh;
    }

    drawMesh(ctx:CanvasRenderingContext2D, projection: number[][]) {
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

        function getAvgZPos(polygon:Vec[]):number {
            const [a, b, c] = polygon;

            return Math.max(a.z, b.z, c.z)
        }

        projected.sort((a, b) => {
            return getAvgZPos(b) - getAvgZPos(a)
        })

        projected.forEach(polygon => {
            drawPolygon(polygon, ctx);
        })
    }
}