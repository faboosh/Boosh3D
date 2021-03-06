export function matMul(a:number[][], b:number[][]) {
    const colsA:number = a[0].length;
    const rowsB:number = b.length;
    const tempA:number[][] = a;
    const tempB:number[][] = b;

    a = tempB;
    b = tempA;

    if(colsA != rowsB) throw new MatrixError( 'Invalid matrix row/col count' );

    let result:number[][] = [];

    for(let j = 0; j < b.length; j++) {
        result[j] = [];
        for(let k = 0; k < a[0].length; k++) {
            let sum = 0;
            for(let i = 0; i < a.length; i++) {
                sum += a[i][k] * b[j][i];
            }
            result[j].push(sum);
        }
    }
    return result;
}

export function emptyMatrix(rows:number, cols:number): number[][] {
    return new Array( rows ).fill( new Array( cols ).fill( 0 ) );
}

export function rotate3D(point:Vec, rotation:Vec): Vec {
    const { x, y, z } = rotation;
    const { sin, cos } = Math;

    const rotationZ:number[][] = [
        [ cos(z), -sin(z), 0, 0 ],
        [ sin(z), cos(z),  0, 0 ],
        [ 0,      0,       1, 0 ],
        [ 0,      0,       0, 1 ],
    ]

    const rotationX:number[][] = [
        [ 1,      0,       0, 0 ],
        [ 0, cos(x), -sin(x), 0 ],
        [ 0, sin(x),  cos(x), 0 ],
        [ 0,      0,       0, 1 ],
    ]

    const rotationY:number[][] = [
        [ cos(y), 0, -sin(y), 0 ],
        [ 0,      1,       0, 0 ],
        [ sin(y), 0,  cos(y), 0 ],
        [ 0,      0,       0, 1 ],
    ]

    let rotated = matrixToVec(
        matMul(rotationZ, vecToMatrix(point))
    )

    rotated = matrixToVec(
        matMul(rotationY, vecToMatrix(rotated))
    )

    rotated = matrixToVec(
        matMul(rotationX, vecToMatrix(rotated))
    )

    return rotated;
}

export class MatrixError extends Error {
    constructor(message:string) {
        super(message);
        this.name = "MatrixError";
    }
}

export class Vec {
    x:number;
    y:number;
    z:number;
    w:number;

    constructor(x?:number, y?:number, z?:number) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = 1;
    }

    scale(factor:number) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;       
    }

    translate(vec:Vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;       
    }

    static fromObject({x, y, z}:{x:number, y:number, z:number}) {
        return new Vec(x, y, z)
    }
}

export function matrixToVec(m:number[][]): Vec {
    let vec:Vec = new Vec();
    vec.x = m[0][0];
    vec.y = m[1][0];

    if(m.length > 2) {
        vec.z = m[2][0];
        
        if(m.length > 3) {
            vec.w = m[3][0];
        }
    }

    return vec;
}

export function vecToMatrix(vec:Vec): number[][] {
    return [
        [vec.x],
        [vec.y],
        [vec.z],
        [vec.w],
    ];
}

export function pointsToMatrix(points:number[]): number[][] {
    return points.map(point => [point]);
}

export function pointsToVec(points:number[]): Vec {
    let vec:Vec = new Vec();
    vec.x = points[0];
    vec.y = points[1];

    if(points.length > 2) {
        vec.z = points[2];

        if(points.length > 3) {
            vec.w = points[3];
        }
    }

    return vec;
}

export const Mat4 = {
    create() : number[][] {
        return [
            [ 1,   0,    0,   0 ],
            [ 0,   1,    0,   0 ],
            [ 0,   0,    1,   0 ],
            [ 0,   0,    0,   1 ],
        ]
    },

    projection(near:number, far:number, fov:number, aspect:number) :number[][] {
        const { tan } = Math;
        return (
            [
                [ 1 / tan(fov / 2),   0,                        0,                        0 ],
                [ 0,                  aspect / tan(fov / 2),    0,                        0 ],
                [ 0,                  0,                        (near + far) / (near - far),  2 * near * far / (near - far) ],
                [ 0,                  0,                       -1,                        0 ],
            ]
        )
    },

    serialize(mat4:number[][]) : number[] {
        let serialized:number[] = [];
        mat4.forEach((row:any) => {
            row.forEach((val:any) => {
                serialized.push(val);
            })
        })

        return serialized;
    }
}

export function angleToRadiant(angle: number) : number {
    return (angle / 360) * (Math.PI * 2)
}
