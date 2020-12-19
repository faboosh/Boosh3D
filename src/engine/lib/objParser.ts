import Mesh from "./mesh";

export function parseOBJ(objText: string): Mesh {
    let verticies: number[][] = [];
    let vertexMatches = objText.match(/^v( -?\d+(\.\d+)?){3}$/gm);
    let faceMatches = objText.match(/^f( (\/?\d+)+){3}/gm);

    let textures = [];
    let normals = [];
    let faces = [];


    if (vertexMatches && faceMatches) {
        verticies =
            vertexMatches.map(vertex => {
                var vertices = vertex.split(" ");
                vertices.shift();
                return vertices.map(vertex => Number(vertex))
            });


        faceMatches.forEach(face => {
            let splitFaces = face.split(" ");
            splitFaces.shift();

            console.log(splitFaces)

            let vertex = [];
            let texture = [];
            let normal = [];

            splitFaces.forEach(face => {
                let [v, vt, vn] = face.split("/").map(num => Number(num))
                vertex.push(v);
                texture.push(vt);
                normal.push(vn);
            });

            faces.push(vertex)
            textures.push(texture)
            normals.push(normal)
        })

    }

    return new Mesh(verticies, faces);
}
