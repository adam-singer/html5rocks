#import('dart:html');
#import('../utils/webglUtils.dart');

class webgl2dImage3x3Convolution {

  webgl2dImage3x3Convolution() {
  }

  void run() {
    ImageElement image = document.query('#photo');
    render(image);
    write("");
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
    var textureSizeLocation = gl.getUniformLocation(program, "u_textureSize");
    var kernelLocation = gl.getUniformLocation(program, "u_kernel[0]");
    
    // set the resolution
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    
    // set the size of the image
    gl.uniform2f(textureSizeLocation, image.width, image.height);
    
    // Define several convolution kernels
    var kernels = {
      "normal": [
        0, 0, 0,
        0, 1, 0,
        0, 0, 0
      ],
      "gaussianBlur": [
        0.045, 0.122, 0.045,
        0.122, 0.332, 0.122,
        0.045, 0.122, 0.045
      ],
      "gaussianBlur2": [
        1, 2, 1,
        2, 4, 2,
        1, 2, 1
      ],
      "gaussianBlur3": [
        0, 1, 0,
        1, 1, 1,
        0, 1, 0
      ],
      "unsharpen": [
        -1, -1, -1,
        -1,  9, -1,
        -1, -1, -1
      ],
      "sharpness": [
         0,-1, 0,
        -1, 5,-1,
         0,-1, 0
      ],
      "sharpen": [
         -1, -1, -1,
         -1, 16, -1,
         -1, -1, -1
      ],
      "edgeDetect": [
         -0.125, -0.125, -0.125,
         -0.125,  1,     -0.125,
         -0.125, -0.125, -0.125
      ],
      "edgeDetect2": [
         -1, -1, -1,
         -1,  8, -1,
         -1, -1, -1
      ],
      "edgeDetect3": [
         -5, 0, 0,
          0, 0, 0,
          0, 0, 5
      ],
      "edgeDetect4": [
         -1, -1, -1,
          0,  0,  0,
          1,  1,  1
      ],
      "edgeDetect5": [
         -1, -1, -1,
          2,  2,  2,
         -1, -1, -1
      ],
      "edgeDetect6": [
         -5, -5, -5,
         -5, 39, -5,
         -5, -5, -5
      ],
      "sobelHorizontal": [
          1,  2,  1,
          0,  0,  0,
         -1, -2, -1
      ],
      "sobelVertical": [
          1,  0, -1,
          2,  0, -2,
          1,  0, -1
      ],
      "previtHorizontal": [
          1,  1,  1,
          0,  0,  0,
         -1, -1, -1
      ],
      "previtVertical": [
          1,  0, -1,
          1,  0, -1,
          1,  0, -1
      ],
      "boxBlur": [
          0.111, 0.111, 0.111,
          0.111, 0.111, 0.111,
          0.111, 0.111, 0.111
      ],
      "triangleBlur": [
          0.0625, 0.125, 0.0625,
          0.125,  0.25,  0.125,
          0.0625, 0.125, 0.0625
      ],
      "emboss": [
         -2, -1,  0,
         -1,  1,  1,
          0,  1,  2
      ]
    };
    
    // Setup method to draw arrays
    drawWithKernel(name) {
      // set the kernel
      gl.uniform1fv(kernelLocation, new Float32Array.from(kernels[name]));
      
      // Draw the rectangle.
      gl.drawArrays(WebGLRenderingContext.TRIANGLES, 0, 6);
    };
    
    
    // Setup UI to pick kernels. 
    var initialSelection = 'emboss';
    var ui = document.query('#ui');
    var select = new Element.tag('select');
    kernels.forEach((var name, var value) {
      OptionElement option = new Element.tag('option');
      option.value = name;
      if (name == initialSelection) {
        option.selected = true;
      }
      
      option.text = name;
      select.nodes.add(option);
    });
    
    select.on.change.add((var event) {
      debugPrint(event);
      debugPrint(event.type);
      debugPrint(select.value);
      drawWithKernel(select.value);
    });
    
    ui.nodes.add(select);
    
    // Create a buffer for the position of the rectangle corners.
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, WebGLRenderingContext.FLOAT, false, 0, 0);
    
    // Set a rectangle the same size as the image. 
    setRectangle(gl, 0, 0, image.width, image.height);
        
    drawWithKernel(initialSelection);
  }
  
  
  
  void write(String message) {
    // the HTML library defines a global "document" variable
    document.query('#status').innerHTML = message;
  }
}

void main() {
  new webgl2dImage3x3Convolution().run();
}
