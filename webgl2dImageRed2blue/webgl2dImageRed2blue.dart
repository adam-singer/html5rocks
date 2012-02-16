#import('dart:html');
#import('../utils/webglUtils.dart');

class webgl2dImageRed2blue {

  webgl2dImageRed2blue() {
  }

  void run() {
    ImageElement image = document.query('#photo');
    render(image);
    write("Run Done");
  }

  render(image) {
    // Get a WebGL context
    var canvas = document.query("canvas");
    var gl = getWebGLContext(canvas);
    if (canvas is! CanvasElement || gl is! WebGLRenderingContext) {
      write("Failed to load canvas");
      return;
    }
    
    // setup GLSL program
    var vertexShader = createShaderFromScriptElement(gl, "#v2d-vertex-shader");
    var fragmentShader = createShaderFromScriptElement(gl, "#f2d-fragment-shader");
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);
    
    // look up where the vertex data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    
    // provide texture coordinates for the rectangle. 
    var texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, texCoordBuffer);
    var vertices = [0.0,  0.0,
                    1.0,  0.0,
                    0.0,  1.0,
                    0.0,  1.0,
                    1.0,  0.0,
                    1.0,  1.0];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.from(vertices), WebGLRenderingContext.STATIC_DRAW);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
    
    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
    
    // Set the parameters so we can render any size image. 
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_S, WebGLRenderingContext.CLAMP_TO_EDGE);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_WRAP_T, WebGLRenderingContext.CLAMP_TO_EDGE);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MIN_FILTER, WebGLRenderingContext.NEAREST);
    gl.texParameteri(WebGLRenderingContext.TEXTURE_2D, WebGLRenderingContext.TEXTURE_MAG_FILTER, WebGLRenderingContext.NEAREST);
    
    // Upload the image into the texture.
    gl.texImage2D(WebGLRenderingContext.TEXTURE_2D, 0, WebGLRenderingContext.RGBA, WebGLRenderingContext.RGBA, WebGLRenderingContext.UNSIGNED_BYTE, image);
    
    // lookup uniforms
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    
    // set the resolution
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    
    // Create a buffer for the position of the rectangle corners.
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
    
    // Set a rectangle the same size as the image. 
    setRectangle(gl, 0, 0, image.width, image.height);
    
    // Draw the rectangle
    gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 6);
  }
  
  void write(String message) {
    // the HTML library defines a global "document" variable
    document.query('#status').innerHTML = message;
  }
}

void main() {
  new webgl2dImageRed2blue().run();
}
