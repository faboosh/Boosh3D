export function parseOBJ(objText:string):number[][][] {
    let verticies:number[][] = [];
    let faces:number[][][] = []
    let vertexMatches = objText.match(/^v( -?\d+(\.\d+)?){3}$/gm);
    let faceMatches = objText.match(/^f( -?\d+(\.\d+)?){3}$/gm)


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
                let faceVerticies = face.split(" ").map(vert => {
                    return Number(vert);
                })
                faceVerticies.shift();

                let mappedFaceVerticies = faceVerticies.map(vertIndex => {
                    return verticies[vertIndex - 1]
                })
                return mappedFaceVerticies;
            })
        
    }

    return faces
}
