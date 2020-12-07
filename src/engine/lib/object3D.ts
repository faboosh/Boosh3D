import { Vec, rotate3D, pointsToVec } from './math'
import { Camera } from './camera';
import { Movable } from './movable';

export class Object3D extends Movable {
    scale: number;
    mesh: number[][][];
    colors: any;
    shader: any;

    constructor({ pos, rotation, mesh, shader }: { pos: Vec, rotation: Vec, mesh: number[][][], shader: any }) {
        super();
        this.pos = pos;
        this.rotation = rotation;
        this.scale = 1;
        this.mesh = mesh;
        this.shader = shader;
        this.colors = this.mesh.map(() => {
            // return {
            //     r: 0.3 + (Math.random() * 0.6),
            //     g: 0 + (Math.random() * 0),
            //     b: 0.3 + (Math.random() * 0.1),
            // }
            const rand = Math.random() * 0.3;
            return {
                r: 0.3 + (rand),
                g: 0.3 + (rand),
                b: 0.3 + (rand),
            }
        })
    }

    getTransformedPolygons() {
        return this.mesh.map(polygon => {
            return polygon.map(point => {

                let vec = rotate3D(pointsToVec(point), this.rotation)
                //const vec = pointsToVec(point);

                vec.scale(this.scale);
                vec.translate(this.pos)

                return vec;
            })
        });
    }

    draw(gl: WebGL2RenderingContext, camera: Camera, program: WebGLShader) {
        gl.useProgram(program);

        const polygons = this.getTransformedPolygons();
        const mProjection = camera.getSerializedProjection();
        const viewRotation = camera.getSerializedRotation();
        const viewTranslation = camera.getSerializedPosition();

        const positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        const colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
        const mProjectionUniformLocation = gl.getUniformLocation(program, 'mProjection');
        const viewRotationUniformLocation = gl.getUniformLocation(program, 'viewRotation');
        const viewTranslationUniformLocation = gl.getUniformLocation(program, 'viewTranslation');

        gl.uniformMatrix4fv(
            mProjectionUniformLocation,
            false,
            new Float32Array(mProjection)
        )

        gl.uniform3fv(
            viewRotationUniformLocation,
            new Float32Array(viewRotation)
        )

        gl.uniform3fv(
            viewTranslationUniformLocation,
            new Float32Array(viewTranslation)
        )


        for (let i = 0; i < polygons.length; i++) {
            const c = this.colors[i];

            const triangleVerticies = [
                //  X                 Y                 Z                 R    G    B
                polygons[i][0].x, polygons[i][0].y, polygons[i][0].z, c.r, c.g, c.b,
                polygons[i][1].x, polygons[i][1].y, polygons[i][1].z, c.r, c.g, c.b,
                polygons[i][2].x, polygons[i][2].y, polygons[i][2].z, c.r, c.g, c.b
            ];

            const triangleVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticies), gl.DYNAMIC_DRAW);

            gl.vertexAttribPointer(
                positionAttribLocation,
                3,
                gl.FLOAT,
                false,
                6 * Float32Array.BYTES_PER_ELEMENT,
                0
            );

            gl.vertexAttribPointer(
                colorAttribLocation,
                3,
                gl.FLOAT,
                false,
                6 * Float32Array.BYTES_PER_ELEMENT,
                3 * Float32Array.BYTES_PER_ELEMENT
            );


            gl.enableVertexAttribArray(positionAttribLocation);
            gl.enableVertexAttribArray(colorAttribLocation);

            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
    }
}