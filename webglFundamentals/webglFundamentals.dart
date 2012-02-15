#import('dart:html');
#import('../utils/webglUtils.dart');

class webglFundamentals {

  webglFundamentals() {
  }
  
  void run() {
    var canvas = document.query("canvas");
    if (canvas is! CanvasElement) {
      write("Failed to load canvas");
      return;
    }
    
    var gl = getWebGLContext(canvas);
    var vertexShader = createShaderFromScriptElement(gl, "#v2d-vertex-shader");
    var fragmentShader = createShaderFromScriptElement(gl, "#f2d-fragment-shader");
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);
    
    // look up where the vertex data needs to go. 
    var positionLocation = gl.getAttribLocation(program, "a_position");
    
    // Create a buffer and put a single clipspace rectangle in it (2 triangles)
    var buffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, buffer);
    var vertices = [-1.0, -1.0,
                     1.0, -1.0,
                    -1.0,  1.0,
                    -1.0,  1.0,
                     1.0, -1.0,
                     1.0,  1.0];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.from(vertices), WebGLRenderingContext.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
    
    // draw
    gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 6);
    
    write("");
  }

  void write(String message) {
    // the HTML library defines a global "document" variable
    document.query('#status').innerHTML = message;
  }
}

void main() {
  new webglFundamentals().run();
}
