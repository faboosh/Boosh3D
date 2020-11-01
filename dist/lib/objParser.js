"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOBJ = void 0;
function parseOBJ(objText) {
    let verticies = [];
    let faces;
    let vertexMatches = objText.match(/^v( -?\d+(\.\d+)?){3}$/gm);
    let faceMatches = objText.match(/^f( (\/?\d+)+){3}/gm);
    if (vertexMatches && faceMatches) {
        verticies =
            vertexMatches.map(vertex => {
                var vertices = vertex.split(" ");
                vertices.shift();
                return vertices.map(vertex => Number(vertex));
            });
        faces =
            faceMatches.map(face => {
                let splitFaces = face.split(" ");
                splitFaces.shift();
                return splitFaces.map(face => {
                    let [v, vt, vn] = face.split("/").map(num => Number(num));
                    return { v, vt, vn };
                });
            });
    }
    faces = faces.map((face) => {
        return face.map((vert) => {
            return verticies[vert.v - 1];
        });
    });
    return faces;
}
exports.parseOBJ = parseOBJ;
//# sourceMappingURL=objParser.js.map