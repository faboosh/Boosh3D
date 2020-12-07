import { loadTextResource } from './util'
import { parseOBJ } from './objParser'
export class Model {
    name:string;
    private model:any = null;
    constructor(name:string) {
        this.name = name;
    }

    load() {
        return new Promise(async (resolve, reject) => {
            const model = await loadTextResource(`/models/${this.name}.obj`)
            this.model = parseOBJ(model)
            resolve();
        })
    }

    get() {
        return this.model;
    }
}