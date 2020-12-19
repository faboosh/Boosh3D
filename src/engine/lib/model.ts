import { loadTextResource } from './util'
import { parseOBJ } from './objParser'
import Mesh from './mesh';
export class Model {
    name: string;
    private model: Mesh;
    constructor(name: string) {
        this.name = name;
    }

    load() {
        return new Promise(async (resolve, reject) => {
            const model = await loadTextResource(`/models/${this.name}.obj`)
            this.model = parseOBJ(model)
            resolve(true);
        })
    }

    get() {
        return this.model;
    }
}