import { Vec } from "./math";

export function drawPolygon(polygon:Vec[], gl:WebGL2RenderingContext, program:WebGLShader, c:any) {
    // c = {
    //     r: 1.0,
    //     g: 0.1,
    //     b: 0.3
    // }

    // const triangleVerticies = [
    // //  x             y             z             R    G    B
    //     polygon[0].x, polygon[0].y, polygon[0].z, 0.8, 0.8, 0.8,
    //     polygon[1].x, polygon[1].y, polygon[1].z, 0.7, 0.8, 1.0,
    //     polygon[2].x, polygon[2].y, polygon[2].z, 0.8, 1.0, 1.0
    // ];
    
    const triangleVerticies = [
    //  x             y             z             R    G    B
        polygon[0].x, polygon[0].y, polygon[0].z, c.r, c.g, c.b,
        polygon[1].x, polygon[1].y, polygon[1].z, c.r, c.g, c.b,
        polygon[2].x, polygon[2].y, polygon[2].z, c.r, c.g, c.b
    ];

    const triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVerticies), gl.STATIC_DRAW);

    const positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
    const colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
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

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}