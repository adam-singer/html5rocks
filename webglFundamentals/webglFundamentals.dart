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

  WebGLShader loadShader(WebGLRenderingContext gl, String shaderSource, int shaderType) { 
    // Create the shader object
    var shader = gl.createShader(shaderType);
    
    // Load the shader source
    gl.shaderSource(shader, shaderSource);
    
    // Check the compile status
    var compiled = gl.getShaderParameter(shader, WebGLRenderingContext.COMPILE_STATUS);
    debugPrint("compiled = ${compiled}");
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
