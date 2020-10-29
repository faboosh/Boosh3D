import { Vec, matrixToVec, vecToMatrix, pointsToMatrix, pointsToVec, matMul } from '../../src/math';
import { expect } from 'chai';
describe('Math library', () => {
    describe('Vec', () => {
        it('should return correctly formatted vector', () => {
            const vec:Vec = new Vec(-5, 5, 0);
            expect(vec).to.eql({ x: -5, y: 5, z: 0 });
        })

        it('should scale vector correctly', () => {
            const vec:Vec = new Vec(-5, 5, 0);
            vec.scale(10);
            expect(vec).to.eql({ x: -50, y: 50, z: 0 });
        })
    })

    describe('matrixToVec', () => {
        it('should return correctly formatted vector', () => {
            const matrix:number[][] = [
                [5],
                [3],
                [-2],
            ]
            const vec:Vec = matrixToVec(matrix);
            expect(vec).to.eql({ x: 5, y: 3, z: -2 });
        })
    })

    describe('vecToMatrix', () => {
        it('should return correctly formatted matrix', () => {
            const vec:Vec = new Vec(-5, 5, 0);
            const matrix:number[][] = vecToMatrix(vec);
            expect(matrix).to.eql([
                [-5], 
                [5], 
                [0]
            ]);
        })
    })

    describe('pointsToMatrix', () => {
        it('should return correctly formatted matrix', () => {
            const points:number[] = [-5, 5, 0];
            const matrix:number[][] = pointsToMatrix(points);
            expect(matrix).to.eql([
                [-5], 
                [5], 
                [0]
            ]);
        })
    })

    describe('pointsToVec', () => {
        it('should return correctly formatted vector', () => {
            const points:number[] = [-5, 5, 0];
            const vec:Vec = pointsToVec(points);
            expect(vec).to.eql({ x: -5, y: 5, z: 0 });
        })
    })

    describe('matMul', () => {
        it('should multiply matricies correctly', () => {
            const mat1:number[][] = [
                [-5], 
                [5], 
                [0]
            ];

            const mat2:number[][] = [
                [-5, 5, 0]
            ];

            expect(matMul(mat2, mat1)).to.eql([[50]]);
            expect(matMul(mat1, mat2)).to.eql([
                [25, -25, 0],
                [-25, 25, 0],
                [0, 0, 0],
            ]);
        })
    })
})

