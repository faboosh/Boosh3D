export default class Mesh {
    verticies: number[][];
    indicies: number[][];
    constructor(verticies, indicies) {
        this.verticies = verticies;
        this.indicies = indicies;
    }

    getSerializedIndicies(): number[] {
        const indicies = [];
        this.indicies.forEach(index => {
            index.forEach(val => {
                indicies.push(val);
            })
        })

        return indicies;
    }

    getSerializedVerticies(): number[] {
        const verticies = [];
        this.verticies.forEach(vertex => {
            vertex.forEach(val => {
                verticies.push(val);
            })
        })

        return verticies;
    }
}