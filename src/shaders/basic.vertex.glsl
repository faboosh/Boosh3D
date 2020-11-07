precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;
uniform mat4 mProjection;

void main() {
    fragColor = vertColor;
    gl_Position = mProjection * vec4(vertPosition, 1.0);
}