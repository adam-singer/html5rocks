#import('dart:html');
#import('../utils/webglUtils.dart');

class webgl2dRectangles {

  webgl2dRectangles() {
  }

  void run() {
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
    
    // look up where the vertext data needs to go.
    var positionLocation = gl.getAttribLocation(program, "a_position");
    
    // lookup uniforms
    var resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    var colorLocation = gl.getUniformLocation(program, "u_color");
    
    // set the resolution
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    
    // Create a buffer.
    var buffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
    
    // draw 50 random rectangles in random colors
    for (var i=0; i<50; ++i) {
      // Setup a random rectangle
      setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
      
      // Set a random color.
      gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
      
      // Draw the rectangle.
      gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 6);
    }
    
    write("");
  }
  
  void setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    var vertices = [x1, y1,
                    x2, y1,
                    x1, y2,
                    x1, y2,
                    x2, y1,
                    x2, y2];
    gl.bufferData(WebGLRenderingContext.ARRAY_BUFFER, new Float32Array.from(vertices), WebGLRenderingContext.STATIC_DRAW);
  }
  
  int randomInt(int range) {
    return (Math.random() * range).toInt();
  }

  void write(String message) {
    // the HTML library defines a global "document" variable
    document.query('#status').innerHTML = message;
  }
}

void main() {
  new webgl2dRectangles().run();
}
