precision mediump float;

attribute vec3 vertPosition;
attribute vec3 vertColor;
uniform vec3 viewRotation;
uniform vec3 viewTranslation;
uniform mat4 mProjection;
varying vec3 fragColor;

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
    vec4 vertex = vec4(vertPosition, 1.0) + vec4(viewTranslation, 1.0);

	vertex = vertex * rotationX(viewRotation.x) * rotationY(viewRotation.y) * rotationZ(viewRotation.z);
    gl_Position = mProjection * vec4(vertex);
}