#import('dart:html');

class webglFundamentals {

  bool DEBUG=true;
  debugPrint(var p) {
    if (DEBUG) {
      print(p);
    }  
  }

  debugPrintMethod(f) {
    if (DEBUG) {
      f();
    }
  }

  
  webglFundamentals() {
  }

  WebGLProgram createProgram(WebGLRenderingContext gl, [List<WebGLShader> shaders]) {
    // Create program
    var program = gl.createProgram();
    
    // Iterate the shaders list
    if (shaders is List<WebGLShader>) {
      debugPrint("shaders.length = ${shaders.length}");
      shaders.forEach((var shader) => gl.attachShader(program, shader));
    }
    
    // Link the shader to program
    gl.linkProgram(program);
    
    // Check the linked status
    //var linked = gl.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS);
    //debugPrint("linked = ${linked}");
    
    return program;
  }
  
  WebGLShader loadShader(WebGLRenderingContext gl, String shaderSource, int shaderType) { 
    // Create the shader object
    var shader = gl.createShader(shaderType);
    
    // Load the shader source
    gl.shaderSource(shader, shaderSource);
    
    // Compile the shader
    gl.compileShader(shader);
    
    // Check the compile status
    // NOTE: getShaderParameter maybe borken in minfrog or frog compiler. 
    //var compiled = gl.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS);
    //debugPrint("compiled = ${compiled}");
    
    return shader;
  }
  
  WebGLShader createShaderFromScriptElement(WebGLRenderingContext gl, String id) {
    ScriptElement shaderScript = document.query(id);
    String shaderSource = shaderScript.text;
    int shaderType;
    if (shaderScript.type == "x-shader/x-vertex") {
      shaderType = WebGLRenderingContext.VERTEX_SHADER;
    } else if (shaderScript.type == "x-shader/x-fragment") {
      shaderType = WebGLRenderingContext.FRAGMENT_SHADER;
    } else {
      throw new Exception('*** Error: unknown shader type');
    }
    
    return loadShader(gl, shaderSource, shaderType);
  }
  
  WebGLRenderingContext getWebGLContext(CanvasElement canvas) {
    return canvas.getContext("experimental-webgl");
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
    
    write("Ran webgl fundamental sample");
  }

  void write(String message) {
    // the HTML library defines a global "document" variable
    document.query('#status').innerHTML = message;
  }
}

void main() {
  new webglFundamentals().run();
}
