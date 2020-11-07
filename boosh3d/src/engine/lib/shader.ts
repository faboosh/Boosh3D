import { loadTextResource } from './util';

export class ShaderProgram {
    name:string;
    gl:WebGL2RenderingContext;
    shader:any = null;
    constructor(name:string, gl:WebGL2RenderingContext) {
        this.name = name;
        this.gl = gl;
    }

    async load() {
        return new Promise(async (resolve, reject) => {
            this.gl.enable(this.gl.DEPTH_TEST);
    
            const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
            const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        
            this.gl.shaderSource(vertexShader, await loadTextResource(`/shaders/${this.name}.vertex.glsl`));
            this.gl.shaderSource(fragmentShader, await loadTextResource(`/shaders/${this.name}.fragment.glsl`));
        
            this.gl.compileShader(vertexShader);
            if(!this.gl.getShaderParameter(vertexShader, this.gl.COMPILE_STATUS)) {
                console.error('error compiling vertex shader', this.gl.getShaderInfoLog(vertexShader));
                return;
            }
        
            this.gl.compileShader(fragmentShader);
            if(!this.gl.getShaderParameter(fragmentShader, this.gl.COMPILE_STATUS)) {
                console.error('error compiling fragment shader', this.gl.getShaderInfoLog(fragmentShader));
                return;
            }
        
            const program = this.gl.createProgram();
            this.gl.attachShader(program, vertexShader);
            this.gl.attachShader(program, fragmentShader);
            this.gl.linkProgram(program);
            if(!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
                console.error('ERROR linking program', this.gl.getProgramInfoLog(program));
                return;
            }
            this.shader = program;
            resolve(true);
        })
    }

    get() {
        return this.shader;
    }
}