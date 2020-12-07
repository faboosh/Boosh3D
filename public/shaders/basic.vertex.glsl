precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertColor;
uniform vec3 rotation;
uniform vec3 translation;
varying vec3 fragColor;
uniform mat4 mProjection;

mat4 rotationX( in float angle ) {
	return mat4(	1.0,		0,			0,			0,
			 		0, 	cos(angle),	-sin(angle),		0,
					0, 	sin(angle),	 cos(angle),		0,
					0, 			0,			  0, 		1);
}

mat4 rotationY( in float angle ) {
	return mat4(	cos(angle),		0,		sin(angle),	0,
			 				0,		1.0,			 0,	0,
					-sin(angle),	0,		cos(angle),	0,
							0, 		0,				0,	1);
}

mat4 rotationZ( in float angle ) {
	return mat4(	cos(angle),		-sin(angle),	0,	0,
			 		sin(angle),		cos(angle),		0,	0,
							0,				0,		1,	0,
							0,				0,		0,	1);
}

void main() {
    fragColor = vertColor;
    vec4 vertex = vec4(vertPosition, 1.0);

	vertex = vertex * rotationX(rotation.x) * rotationY(rotation.y) * rotationZ(rotation.z);
    gl_Position = mProjection * (vec4(0, 0, 0, 1.0) + vec4(vertex));
}