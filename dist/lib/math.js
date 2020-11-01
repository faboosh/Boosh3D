"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angleToRadiant = exports.Mat4 = exports.pointsToVec = exports.pointsToMatrix = exports.vecToMatrix = exports.matrixToVec = exports.Vec = exports.MatrixError = exports.rotate3D = exports.emptyMatrix = exports.matMul = void 0;
function matMul(a, b) {
    const colsA = a[0].length;
    const rowsB = b.length;
    const tempA = a;
    const tempB = b;
    a = tempB;
    b = tempA;
    if (colsA != rowsB)
        throw new MatrixError('Invalid matrix row/col count');
    let result = [];
    for (let j = 0; j < b.length; j++) {
        result[j] = [];
        for (let k = 0; k < a[0].length; k++) {
            let sum = 0;
            for (let i = 0; i < a.length; i++) {
                sum += a[i][k] * b[j][i];
            }
            result[j].push(sum);
        }
    }
    return result;
}
exports.matMul = matMul;
function emptyMatrix(rows, cols) {
    return new Array(rows).fill(new Array(cols).fill(0));
}
exports.emptyMatrix = emptyMatrix;
function rotate3D(point, rotation) {
    const { x, y, z } = rotation;
    const { sin, cos } = Math;
    const rotationZ = [
        [cos(z), -sin(z), 0, 0],
        [sin(z), cos(z), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ];
    const rotationX = [
        [1, 0, 0, 0],
        [0, cos(x), -sin(x), 0],
        [0, sin(x), cos(x), 0],
        [0, 0, 0, 1],
    ];
    const rotationY = [
        [cos(y), 0, -sin(y), 0],
        [0, 1, 0, 0],
        [sin(y), 0, cos(y), 0],
        [0, 0, 0, 1],
    ];
    let rotated = matrixToVec(matMul(rotationZ, vecToMatrix(point)));
    rotated = matrixToVec(matMul(rotationY, vecToMatrix(rotated)));
    rotated = matrixToVec(matMul(rotationX, vecToMatrix(rotated)));
    return rotated;
}
exports.rotate3D = rotate3D;
class MatrixError extends Error {
    constructor(message) {
        super(message);
        this.name = "MatrixError";
    }
}
exports.MatrixError = MatrixError;
class Vec {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = 1;
    }
    scale(factor) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
    }
    translate(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.z += vec.z;
    }
    static fromObject({ x, y, z }) {
        return new Vec(x, y, z);
    }
}
exports.Vec = Vec;
function matrixToVec(m) {
    let vec = new Vec();
    vec.x = m[0][0];
    vec.y = m[1][0];
    if (m.length > 2) {
        vec.z = m[2][0];
        if (m.length > 3) {
            vec.w = m[3][0];
        }
    }
    return vec;
}
exports.matrixToVec = matrixToVec;
function vecToMatrix(vec) {
    return [
        [vec.x],
        [vec.y],
        [vec.z],
        [vec.w],
    ];
}
exports.vecToMatrix = vecToMatrix;
function pointsToMatrix(points) {
    return points.map(point => [point]);
}
exports.pointsToMatrix = pointsToMatrix;
function pointsToVec(points) {
    let vec = new Vec();
    vec.x = points[0];
    vec.y = points[1];
    if (points.length > 2) {
        vec.z = points[2];
        if (points.length > 3) {
            vec.w = points[3];
        }
    }
    return vec;
}
exports.pointsToVec = pointsToVec;
exports.Mat4 = {
    create() {
        return [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ];
    },
    projection(near, far, fov, aspect) {
        const { tan } = Math;
        return ([
            [1 / tan(fov / 2), 0, 0, 0],
            [0, aspect / tan(fov / 2), 0, 0],
            [0, 0, (near + far) / (near - far), 2 * near * far / (near - far)],
            [0, 0, -1, 0],
        ]);
    },
    serialize(mat4) {
        let serialized = [];
        mat4.forEach((row) => {
            row.forEach((val) => {
                serialized.push(val);
            });
        });
        return serialized;
    }
};
function angleToRadiant(angle) {
    return (angle / 360) * (Math.PI * 2);
}
exports.angleToRadiant = angleToRadiant;
//# sourceMappingURL=math.js.map