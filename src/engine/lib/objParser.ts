export function parseOBJ(objText:string):number[][][] {
    let verticies:number[][] = [];
    let faces:any;
    let vertexMatches = objText.match(/^v( -?\d+(\.\d+)?){3}$/gm);
    let faceMatches = objText.match(/^f( (\/?\d+)+){3}/gm)
    

    if (vertexMatches && faceMatches)
    {
        verticies = 
            vertexMatches.map(vertex => {
                var vertices = vertex.split(" ");
                vertices.shift();
                return vertices.map(vertex => Number(vertex))
            });


        faces =
            faceMatches.map(face => {
                let splitFaces = face.split(" ");
                splitFaces.shift();

                return splitFaces.map(face => {
                    let [v, vt, vn] = face.split("/").map(num => Number(num))
                    return {v, vt, vn};
                });
            })
        
    }

    faces = faces.map((face: any) => {
        return face.map((vert:any) => {
            return verticies[vert.v - 1]
        })
    })

    return faces
}
