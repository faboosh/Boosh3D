precision mediump float;

varying vec3 fragColor;

varying vec2 v_uv;

void main() {

    gl_FragColor = vec4(fragColor, 1.0);
}