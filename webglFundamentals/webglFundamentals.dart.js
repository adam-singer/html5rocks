//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$index = function(i) { return this[i]; }
  }
  return this[i];
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
$defProp(Object.prototype, '$setindex', function(i, value) {
  var proto = Object.getPrototypeOf(this);
  if (proto !== Object) {
    proto.$setindex = function(i, value) { return this[i] = value; }
  }
  return this[i] = value;
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $wrap_call$1(fn) { return fn; }
function $add(x, y) {
  return ((typeof(x) == 'number' && typeof(y) == 'number') ||
          (typeof(x) == 'string'))
    ? x + y : x.$add(y);
}
function $div(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x / y : x.$div(y);
}
function $eq(x, y) {
  if (x == null) return y == null;
  return (typeof(x) == 'number' && typeof(y) == 'number') ||
         (typeof(x) == 'boolean' && typeof(y) == 'boolean') ||
         (typeof(x) == 'string' && typeof(y) == 'string')
    ? x == y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $lt(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x < y : x.$lt(y);
}
function $mul(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x * y : x.$mul(y);
}
function $sub(x, y) {
  return (typeof(x) == 'number' && typeof(y) == 'number')
    ? x - y : x.$sub(y);
}
$defProp(Object.prototype, '$typeNameOf', function() {
  var constructor = this.constructor;
  if (typeof(constructor) == 'function') {
    // The constructor isn't null or undefined at this point. Try
    // to grab hold of its name.
    var name = constructor.name;
    // If the name is a non-empty string, we use that as the type
    // name of this object. On Firefox, we often get 'Object' as
    // the constructor name even for more specialized objects so
    // we have to fall through to the toString() based implementation
    // below in that case.
    if (name && typeof(name) == 'string' && name != 'Object') return name;
  }
  var string = Object.prototype.toString.call(this);
  var name = string.substring(8, string.length - 1);
  if (name == 'Window') {
    name = 'DOMWindow';
  } else if (name == 'Document') {
    name = 'HTMLDocument';
  }
  return name;
});
$defProp(Object.prototype, "get$typeName", Object.prototype.$typeNameOf);
// ********** Code for Object **************
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments, _existingArgumentNames) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
  this._existingArgumentNames = _existingArgumentNames;
}
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  if (null == this._existingArgumentNames) {
    return $add($add(("NoSuchMethodException : method not found: '" + this._functionName + "'\n"), ("Receiver: " + this._receiver + "\n")), ("Arguments: [" + sb + "]"));
  }
  else {
    var actualParameters = sb.toString();
    sb = new StringBufferImpl("");
    for (var i = (0);
     i < this._existingArgumentNames.get$length(); i++) {
      if (i > (0)) {
        sb.add(", ");
      }
      sb.add(this._existingArgumentNames.$index(i));
    }
    var formalParameters = sb.toString();
    return $add($add($add("NoSuchMethodException: incorrect number of arguments passed to ", ("method named '" + this._functionName + "'\nReceiver: " + this._receiver + "\n")), ("Tried calling: " + this._functionName + "(" + actualParameters + ")\n")), ("Found: " + this._functionName + "(" + formalParameters + ")"));
  }
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for ObjectNotClosureException **************
function ObjectNotClosureException() {

}
ObjectNotClosureException.prototype.toString = function() {
  return "Object is not closure";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(arg) {
  this._arg = arg;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._arg);
}
// ********** Code for StackOverflowException **************
function StackOverflowException() {

}
StackOverflowException.prototype.toString = function() {
  return "Stack Overflow";
}
// ********** Code for NullPointerException **************
function NullPointerException() {

}
NullPointerException.prototype.toString = function() {
  return "NullPointerException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for dart_core_Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
// ********** Code for Math **************
// ********** Code for Strings **************
function Strings() {}
Strings.join = function(strings, separator) {
  return StringBase.join(strings, separator);
}
// ********** Code for top level **************
function _toDartException(e) {
  function attachStack(dartEx) {
    // TODO(jmesserly): setting the stack property is not a long term solution.
    var stack = e.stack;
    // The stack contains the error message, and the stack is all that is
    // printed (the exception's toString() is never called).  Make the Dart
    // exception's toString() be the dominant message.
    if (typeof stack == 'string') {
      var message = dartEx.toString();
      if (/^(Type|Range)Error:/.test(stack)) {
        // Indent JS message (it can be helpful) so new message stands out.
        stack = '    (' + stack.substring(0, stack.indexOf('\n')) + ')\n' +
                stack.substring(stack.indexOf('\n') + 1);
      }
      stack = message + '\n' + stack;
    }
    dartEx.stack = stack;
    return dartEx;
  }

  if (e instanceof TypeError) {
    switch(e.type) {
      case 'property_not_function':
      case 'called_non_callable':
        if (e.arguments[0] == null) {
          return attachStack(new NullPointerException());
        } else {
          return attachStack(new ObjectNotClosureException());
        }
        break;
      case 'non_object_property_call':
      case 'non_object_property_load':
        return attachStack(new NullPointerException());
        break;
      case 'undefined_method':
        var mname = e.arguments[0];
        if (typeof(mname) == 'string' && (mname.indexOf('call$') == 0
            || mname == 'call' || mname == 'apply')) {
          return attachStack(new ObjectNotClosureException());
        } else {
          // TODO(jmesserly): fix noSuchMethod on operators so we don't hit this
          return attachStack(new NoSuchMethodException('', e.arguments[0], []));
        }
        break;
    }
  } else if (e instanceof RangeError) {
    if (e.message.indexOf('call stack') >= 0) {
      return attachStack(new StackOverflowException());
    }
  }
  return e;
}
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "clear", function() {
  this.set$length((0));
});
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.$negate = function() {
  'use strict'; return -this;
}
NumImplementation.prototype.abs = function() {
  'use strict'; return Math.abs(this);
}
NumImplementation.prototype.toStringAsPrecision = function(precision) {
  'use strict'; return this.toPrecision(precision)
}
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
// ********** Code for StringBase **************
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add($add(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
// ********** Code for _Worker **************
// ********** Code for _ArgumentMismatchException **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
// ********** Code for _FunctionImplementation **************
_FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches
      if (this.length == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = this.length - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > this.length ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (this.length == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
//  ********** Library dom **************
// ********** Code for _DOMTypeJs **************
// ********** Code for _EventTargetJs **************
// ********** Code for _AbstractWorkerJs **************
// ********** Code for _ArrayBufferJs **************
// ********** Code for _ArrayBufferViewJs **************
// ********** Code for _NodeJs **************
// ********** Code for _AttrJs **************
// ********** Code for _AudioBufferJs **************
// ********** Code for _AudioNodeJs **************
// ********** Code for _AudioSourceNodeJs **************
// ********** Code for _AudioBufferSourceNodeJs **************
// ********** Code for _AudioChannelMergerJs **************
// ********** Code for _AudioChannelSplitterJs **************
// ********** Code for _AudioContextJs **************
// ********** Code for _AudioDestinationNodeJs **************
// ********** Code for _AudioParamJs **************
// ********** Code for _AudioGainJs **************
// ********** Code for _AudioGainNodeJs **************
// ********** Code for _AudioListenerJs **************
// ********** Code for _AudioPannerNodeJs **************
// ********** Code for _EventJs **************
// ********** Code for _AudioProcessingEventJs **************
// ********** Code for _BarInfoJs **************
// ********** Code for _BeforeLoadEventJs **************
// ********** Code for _BiquadFilterNodeJs **************
// ********** Code for _BlobJs **************
// ********** Code for _CharacterDataJs **************
// ********** Code for _TextJs **************
// ********** Code for _CDATASectionJs **************
// ********** Code for _CSSRuleJs **************
// ********** Code for _CSSCharsetRuleJs **************
// ********** Code for _CSSFontFaceRuleJs **************
// ********** Code for _CSSImportRuleJs **************
// ********** Code for _CSSMediaRuleJs **************
// ********** Code for _CSSPageRuleJs **************
// ********** Code for _CSSValueJs **************
// ********** Code for _CSSPrimitiveValueJs **************
// ********** Code for _CSSRuleListJs **************
// ********** Code for _CSSStyleDeclarationJs **************
// ********** Code for _CSSStyleRuleJs **************
// ********** Code for _StyleSheetJs **************
// ********** Code for _CSSStyleSheetJs **************
// ********** Code for _CSSUnknownRuleJs **************
// ********** Code for _CSSValueListJs **************
// ********** Code for _CanvasGradientJs **************
// ********** Code for _CanvasPatternJs **************
// ********** Code for _CanvasPixelArrayJs **************
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;
    var proto = Object.getPrototypeOf(obj);
    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];
$dynamic("get$length").CanvasPixelArray = function() { return this.length; };
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("$setindex").CanvasPixelArray = function(index, value) {
  this[index] = value
}
// ********** Code for _CanvasRenderingContextJs **************
// ********** Code for _CanvasRenderingContext2DJs **************
// ********** Code for _ClientRectJs **************
// ********** Code for _ClientRectListJs **************
// ********** Code for _ClipboardJs **************
// ********** Code for _CloseEventJs **************
// ********** Code for _CommentJs **************
// ********** Code for _UIEventJs **************
// ********** Code for _CompositionEventJs **************
// ********** Code for _ConsoleJs **************
_ConsoleJs = (typeof console == 'undefined' ? {} : console);
// ********** Code for _ConvolverNodeJs **************
// ********** Code for _CoordinatesJs **************
// ********** Code for _CounterJs **************
// ********** Code for _CryptoJs **************
// ********** Code for _CustomEventJs **************
// ********** Code for _DOMApplicationCacheJs **************
// ********** Code for _DOMExceptionJs **************
// ********** Code for _DOMFileSystemJs **************
// ********** Code for _DOMFileSystemSyncJs **************
// ********** Code for _DOMFormDataJs **************
// ********** Code for _DOMImplementationJs **************
// ********** Code for _DOMMimeTypeJs **************
// ********** Code for _DOMMimeTypeArrayJs **************
// ********** Code for _DOMParserJs **************
// ********** Code for _DOMPluginJs **************
// ********** Code for _DOMPluginArrayJs **************
// ********** Code for _DOMSelectionJs **************
// ********** Code for _DOMTokenListJs **************
// ********** Code for _DOMSettableTokenListJs **************
// ********** Code for _DOMURLJs **************
// ********** Code for _DOMWindowJs **************
// ********** Code for _DataTransferItemJs **************
// ********** Code for _DataTransferItemListJs **************
// ********** Code for _DataViewJs **************
// ********** Code for _DatabaseJs **************
// ********** Code for _DatabaseSyncJs **************
// ********** Code for _WorkerContextJs **************
// ********** Code for _DedicatedWorkerContextJs **************
// ********** Code for _DelayNodeJs **************
// ********** Code for _DeviceMotionEventJs **************
// ********** Code for _DeviceOrientationEventJs **************
// ********** Code for _EntryJs **************
// ********** Code for _DirectoryEntryJs **************
// ********** Code for _EntrySyncJs **************
// ********** Code for _DirectoryEntrySyncJs **************
// ********** Code for _DirectoryReaderJs **************
// ********** Code for _DirectoryReaderSyncJs **************
// ********** Code for _DocumentJs **************
// ********** Code for _DocumentFragmentJs **************
// ********** Code for _DocumentTypeJs **************
// ********** Code for _DynamicsCompressorNodeJs **************
// ********** Code for _ElementJs **************
// ********** Code for _ElementTimeControlJs **************
// ********** Code for _ElementTraversalJs **************
// ********** Code for _EntityJs **************
// ********** Code for _EntityReferenceJs **************
// ********** Code for _EntryArrayJs **************
// ********** Code for _EntryArraySyncJs **************
// ********** Code for _ErrorEventJs **************
// ********** Code for _EventExceptionJs **************
// ********** Code for _EventSourceJs **************
// ********** Code for _FileJs **************
// ********** Code for _FileEntryJs **************
// ********** Code for _FileEntrySyncJs **************
// ********** Code for _FileErrorJs **************
// ********** Code for _FileExceptionJs **************
// ********** Code for _FileListJs **************
// ********** Code for _FileReaderJs **************
// ********** Code for _FileReaderSyncJs **************
// ********** Code for _FileWriterJs **************
// ********** Code for _FileWriterSyncJs **************
// ********** Code for _Float32ArrayJs **************
var _Float32ArrayJs = {};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
// ********** Code for _Float64ArrayJs **************
var _Float64ArrayJs = {};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
// ********** Code for _GeolocationJs **************
// ********** Code for _GeopositionJs **************
// ********** Code for _HTMLAllCollectionJs **************
// ********** Code for _HTMLElementJs **************
// ********** Code for _HTMLAnchorElementJs **************
// ********** Code for _HTMLAppletElementJs **************
// ********** Code for _HTMLAreaElementJs **************
// ********** Code for _HTMLMediaElementJs **************
// ********** Code for _HTMLAudioElementJs **************
// ********** Code for _HTMLBRElementJs **************
// ********** Code for _HTMLBaseElementJs **************
// ********** Code for _HTMLBaseFontElementJs **************
// ********** Code for _HTMLBodyElementJs **************
// ********** Code for _HTMLButtonElementJs **************
// ********** Code for _HTMLCanvasElementJs **************
// ********** Code for _HTMLCollectionJs **************
$dynamic("get$length").HTMLCollection = function() { return this.length; };
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
// ********** Code for _HTMLDListElementJs **************
// ********** Code for _HTMLDetailsElementJs **************
// ********** Code for _HTMLDirectoryElementJs **************
// ********** Code for _HTMLDivElementJs **************
// ********** Code for _HTMLDocumentJs **************
// ********** Code for _HTMLEmbedElementJs **************
// ********** Code for _HTMLFieldSetElementJs **************
// ********** Code for _HTMLFontElementJs **************
// ********** Code for _HTMLFormElementJs **************
// ********** Code for _HTMLFrameElementJs **************
// ********** Code for _HTMLFrameSetElementJs **************
// ********** Code for _HTMLHRElementJs **************
// ********** Code for _HTMLHeadElementJs **************
// ********** Code for _HTMLHeadingElementJs **************
// ********** Code for _HTMLHtmlElementJs **************
// ********** Code for _HTMLIFrameElementJs **************
// ********** Code for _HTMLImageElementJs **************
// ********** Code for _HTMLInputElementJs **************
// ********** Code for _HTMLIsIndexElementJs **************
// ********** Code for _HTMLKeygenElementJs **************
// ********** Code for _HTMLLIElementJs **************
// ********** Code for _HTMLLabelElementJs **************
// ********** Code for _HTMLLegendElementJs **************
// ********** Code for _HTMLLinkElementJs **************
// ********** Code for _HTMLMapElementJs **************
// ********** Code for _HTMLMarqueeElementJs **************
// ********** Code for _HTMLMenuElementJs **************
// ********** Code for _HTMLMetaElementJs **************
// ********** Code for _HTMLMeterElementJs **************
// ********** Code for _HTMLModElementJs **************
// ********** Code for _HTMLOListElementJs **************
// ********** Code for _HTMLObjectElementJs **************
// ********** Code for _HTMLOptGroupElementJs **************
// ********** Code for _HTMLOptionElementJs **************
// ********** Code for _HTMLOptionsCollectionJs **************
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
// ********** Code for _HTMLOutputElementJs **************
// ********** Code for _HTMLParagraphElementJs **************
// ********** Code for _HTMLParamElementJs **************
// ********** Code for _HTMLPreElementJs **************
// ********** Code for _HTMLProgressElementJs **************
// ********** Code for _HTMLQuoteElementJs **************
// ********** Code for _HTMLScriptElementJs **************
// ********** Code for _HTMLSelectElementJs **************
// ********** Code for _HTMLSourceElementJs **************
// ********** Code for _HTMLSpanElementJs **************
// ********** Code for _HTMLStyleElementJs **************
// ********** Code for _HTMLTableCaptionElementJs **************
// ********** Code for _HTMLTableCellElementJs **************
// ********** Code for _HTMLTableColElementJs **************
// ********** Code for _HTMLTableElementJs **************
// ********** Code for _HTMLTableRowElementJs **************
// ********** Code for _HTMLTableSectionElementJs **************
// ********** Code for _HTMLTextAreaElementJs **************
// ********** Code for _HTMLTitleElementJs **************
// ********** Code for _HTMLTrackElementJs **************
// ********** Code for _HTMLUListElementJs **************
// ********** Code for _HTMLUnknownElementJs **************
// ********** Code for _HTMLVideoElementJs **************
// ********** Code for _HashChangeEventJs **************
// ********** Code for _HighPass2FilterNodeJs **************
// ********** Code for _HistoryJs **************
// ********** Code for _IDBAnyJs **************
// ********** Code for _IDBCursorJs **************
// ********** Code for _IDBCursorWithValueJs **************
// ********** Code for _IDBDatabaseJs **************
// ********** Code for _IDBDatabaseErrorJs **************
// ********** Code for _IDBDatabaseExceptionJs **************
// ********** Code for _IDBFactoryJs **************
// ********** Code for _IDBIndexJs **************
// ********** Code for _IDBKeyJs **************
// ********** Code for _IDBKeyRangeJs **************
// ********** Code for _IDBObjectStoreJs **************
// ********** Code for _IDBRequestJs **************
// ********** Code for _IDBTransactionJs **************
// ********** Code for _IDBVersionChangeEventJs **************
// ********** Code for _IDBVersionChangeRequestJs **************
// ********** Code for _ImageDataJs **************
// ********** Code for _Int16ArrayJs **************
var _Int16ArrayJs = {};
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
// ********** Code for _Int32ArrayJs **************
var _Int32ArrayJs = {};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
// ********** Code for _Int8ArrayJs **************
var _Int8ArrayJs = {};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
// ********** Code for _JavaScriptAudioNodeJs **************
// ********** Code for _JavaScriptCallFrameJs **************
// ********** Code for _KeyboardEventJs **************
// ********** Code for _LocationJs **************
// ********** Code for _LowPass2FilterNodeJs **************
// ********** Code for _MediaControllerJs **************
// ********** Code for _MediaElementAudioSourceNodeJs **************
// ********** Code for _MediaErrorJs **************
// ********** Code for _MediaListJs **************
$dynamic("get$length").MediaList = function() { return this.length; };
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
// ********** Code for _MediaQueryListJs **************
// ********** Code for _MediaQueryListListenerJs **************
// ********** Code for _MemoryInfoJs **************
// ********** Code for _MessageChannelJs **************
// ********** Code for _MessageEventJs **************
// ********** Code for _MessagePortJs **************
// ********** Code for _MetadataJs **************
// ********** Code for _MouseEventJs **************
// ********** Code for _MutationEventJs **************
// ********** Code for _NamedNodeMapJs **************
$dynamic("get$length").NamedNodeMap = function() { return this.length; };
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
// ********** Code for _NavigatorJs **************
// ********** Code for _NodeFilterJs **************
// ********** Code for _NodeIteratorJs **************
// ********** Code for _NodeListJs **************
$dynamic("get$length").NodeList = function() { return this.length; };
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
// ********** Code for _NodeSelectorJs **************
// ********** Code for _NotationJs **************
// ********** Code for _NotificationJs **************
// ********** Code for _NotificationCenterJs **************
// ********** Code for _OESStandardDerivativesJs **************
// ********** Code for _OESTextureFloatJs **************
// ********** Code for _OESVertexArrayObjectJs **************
// ********** Code for _OfflineAudioCompletionEventJs **************
// ********** Code for _OperationNotAllowedExceptionJs **************
// ********** Code for _OverflowEventJs **************
// ********** Code for _PageTransitionEventJs **************
// ********** Code for _PerformanceJs **************
// ********** Code for _PerformanceNavigationJs **************
// ********** Code for _PerformanceTimingJs **************
// ********** Code for _PopStateEventJs **************
// ********** Code for _PositionErrorJs **************
// ********** Code for _ProcessingInstructionJs **************
// ********** Code for _ProgressEventJs **************
// ********** Code for _RGBColorJs **************
// ********** Code for _RangeJs **************
// ********** Code for _RangeExceptionJs **************
// ********** Code for _RealtimeAnalyserNodeJs **************
// ********** Code for _RectJs **************
// ********** Code for _SQLErrorJs **************
// ********** Code for _SQLExceptionJs **************
// ********** Code for _SQLResultSetJs **************
// ********** Code for _SQLResultSetRowListJs **************
// ********** Code for _SQLTransactionJs **************
// ********** Code for _SQLTransactionSyncJs **************
// ********** Code for _SVGElementJs **************
// ********** Code for _SVGAElementJs **************
// ********** Code for _SVGAltGlyphDefElementJs **************
// ********** Code for _SVGTextContentElementJs **************
// ********** Code for _SVGTextPositioningElementJs **************
// ********** Code for _SVGAltGlyphElementJs **************
// ********** Code for _SVGAltGlyphItemElementJs **************
// ********** Code for _SVGAngleJs **************
// ********** Code for _SVGAnimationElementJs **************
// ********** Code for _SVGAnimateColorElementJs **************
// ********** Code for _SVGAnimateElementJs **************
// ********** Code for _SVGAnimateMotionElementJs **************
// ********** Code for _SVGAnimateTransformElementJs **************
// ********** Code for _SVGAnimatedAngleJs **************
// ********** Code for _SVGAnimatedBooleanJs **************
// ********** Code for _SVGAnimatedEnumerationJs **************
// ********** Code for _SVGAnimatedIntegerJs **************
// ********** Code for _SVGAnimatedLengthJs **************
// ********** Code for _SVGAnimatedLengthListJs **************
// ********** Code for _SVGAnimatedNumberJs **************
// ********** Code for _SVGAnimatedNumberListJs **************
// ********** Code for _SVGAnimatedPreserveAspectRatioJs **************
// ********** Code for _SVGAnimatedRectJs **************
// ********** Code for _SVGAnimatedStringJs **************
// ********** Code for _SVGAnimatedTransformListJs **************
// ********** Code for _SVGCircleElementJs **************
// ********** Code for _SVGClipPathElementJs **************
// ********** Code for _SVGColorJs **************
// ********** Code for _SVGComponentTransferFunctionElementJs **************
// ********** Code for _SVGCursorElementJs **************
// ********** Code for _SVGDefsElementJs **************
// ********** Code for _SVGDescElementJs **************
// ********** Code for _SVGDocumentJs **************
// ********** Code for _SVGElementInstanceJs **************
// ********** Code for _SVGElementInstanceListJs **************
// ********** Code for _SVGEllipseElementJs **************
// ********** Code for _SVGExceptionJs **************
// ********** Code for _SVGExternalResourcesRequiredJs **************
// ********** Code for _SVGFEBlendElementJs **************
// ********** Code for _SVGFEColorMatrixElementJs **************
// ********** Code for _SVGFEComponentTransferElementJs **************
// ********** Code for _SVGFECompositeElementJs **************
// ********** Code for _SVGFEConvolveMatrixElementJs **************
// ********** Code for _SVGFEDiffuseLightingElementJs **************
// ********** Code for _SVGFEDisplacementMapElementJs **************
// ********** Code for _SVGFEDistantLightElementJs **************
// ********** Code for _SVGFEDropShadowElementJs **************
// ********** Code for _SVGFEFloodElementJs **************
// ********** Code for _SVGFEFuncAElementJs **************
// ********** Code for _SVGFEFuncBElementJs **************
// ********** Code for _SVGFEFuncGElementJs **************
// ********** Code for _SVGFEFuncRElementJs **************
// ********** Code for _SVGFEGaussianBlurElementJs **************
// ********** Code for _SVGFEImageElementJs **************
// ********** Code for _SVGFEMergeElementJs **************
// ********** Code for _SVGFEMergeNodeElementJs **************
// ********** Code for _SVGFEMorphologyElementJs **************
// ********** Code for _SVGFEOffsetElementJs **************
// ********** Code for _SVGFEPointLightElementJs **************
// ********** Code for _SVGFESpecularLightingElementJs **************
// ********** Code for _SVGFESpotLightElementJs **************
// ********** Code for _SVGFETileElementJs **************
// ********** Code for _SVGFETurbulenceElementJs **************
// ********** Code for _SVGFilterElementJs **************
// ********** Code for _SVGStylableJs **************
// ********** Code for _SVGFilterPrimitiveStandardAttributesJs **************
// ********** Code for _SVGFitToViewBoxJs **************
// ********** Code for _SVGFontElementJs **************
// ********** Code for _SVGFontFaceElementJs **************
// ********** Code for _SVGFontFaceFormatElementJs **************
// ********** Code for _SVGFontFaceNameElementJs **************
// ********** Code for _SVGFontFaceSrcElementJs **************
// ********** Code for _SVGFontFaceUriElementJs **************
// ********** Code for _SVGForeignObjectElementJs **************
// ********** Code for _SVGGElementJs **************
// ********** Code for _SVGGlyphElementJs **************
// ********** Code for _SVGGlyphRefElementJs **************
// ********** Code for _SVGGradientElementJs **************
// ********** Code for _SVGHKernElementJs **************
// ********** Code for _SVGImageElementJs **************
// ********** Code for _SVGLangSpaceJs **************
// ********** Code for _SVGLengthJs **************
// ********** Code for _SVGLengthListJs **************
// ********** Code for _SVGLineElementJs **************
// ********** Code for _SVGLinearGradientElementJs **************
// ********** Code for _SVGLocatableJs **************
// ********** Code for _SVGMPathElementJs **************
// ********** Code for _SVGMarkerElementJs **************
// ********** Code for _SVGMaskElementJs **************
// ********** Code for _SVGMatrixJs **************
// ********** Code for _SVGMetadataElementJs **************
// ********** Code for _SVGMissingGlyphElementJs **************
// ********** Code for _SVGNumberJs **************
// ********** Code for _SVGNumberListJs **************
// ********** Code for _SVGPaintJs **************
// ********** Code for _SVGPathElementJs **************
// ********** Code for _SVGPathSegJs **************
// ********** Code for _SVGPathSegArcAbsJs **************
// ********** Code for _SVGPathSegArcRelJs **************
// ********** Code for _SVGPathSegClosePathJs **************
// ********** Code for _SVGPathSegCurvetoCubicAbsJs **************
// ********** Code for _SVGPathSegCurvetoCubicRelJs **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothAbsJs **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothRelJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticAbsJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticRelJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothAbsJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothRelJs **************
// ********** Code for _SVGPathSegLinetoAbsJs **************
// ********** Code for _SVGPathSegLinetoHorizontalAbsJs **************
// ********** Code for _SVGPathSegLinetoHorizontalRelJs **************
// ********** Code for _SVGPathSegLinetoRelJs **************
// ********** Code for _SVGPathSegLinetoVerticalAbsJs **************
// ********** Code for _SVGPathSegLinetoVerticalRelJs **************
// ********** Code for _SVGPathSegListJs **************
// ********** Code for _SVGPathSegMovetoAbsJs **************
// ********** Code for _SVGPathSegMovetoRelJs **************
// ********** Code for _SVGPatternElementJs **************
// ********** Code for _SVGPointJs **************
// ********** Code for _SVGPointListJs **************
// ********** Code for _SVGPolygonElementJs **************
// ********** Code for _SVGPolylineElementJs **************
// ********** Code for _SVGPreserveAspectRatioJs **************
// ********** Code for _SVGRadialGradientElementJs **************
// ********** Code for _SVGRectJs **************
// ********** Code for _SVGRectElementJs **************
// ********** Code for _SVGRenderingIntentJs **************
// ********** Code for _SVGSVGElementJs **************
// ********** Code for _SVGScriptElementJs **************
// ********** Code for _SVGSetElementJs **************
// ********** Code for _SVGStopElementJs **************
// ********** Code for _SVGStringListJs **************
// ********** Code for _SVGStyleElementJs **************
// ********** Code for _SVGSwitchElementJs **************
// ********** Code for _SVGSymbolElementJs **************
// ********** Code for _SVGTRefElementJs **************
// ********** Code for _SVGTSpanElementJs **************
// ********** Code for _SVGTestsJs **************
// ********** Code for _SVGTextElementJs **************
// ********** Code for _SVGTextPathElementJs **************
// ********** Code for _SVGTitleElementJs **************
// ********** Code for _SVGTransformJs **************
// ********** Code for _SVGTransformListJs **************
// ********** Code for _SVGTransformableJs **************
// ********** Code for _SVGURIReferenceJs **************
// ********** Code for _SVGUnitTypesJs **************
// ********** Code for _SVGUseElementJs **************
// ********** Code for _SVGVKernElementJs **************
// ********** Code for _SVGViewElementJs **************
// ********** Code for _SVGZoomAndPanJs **************
// ********** Code for _SVGViewSpecJs **************
// ********** Code for _SVGZoomEventJs **************
// ********** Code for _ScreenJs **************
// ********** Code for _ScriptProfileJs **************
// ********** Code for _ScriptProfileNodeJs **************
// ********** Code for _SharedWorkerJs **************
// ********** Code for _SharedWorkerContextJs **************
// ********** Code for _SpeechInputEventJs **************
// ********** Code for _SpeechInputResultJs **************
// ********** Code for _SpeechInputResultListJs **************
// ********** Code for _StorageJs **************
// ********** Code for _StorageEventJs **************
// ********** Code for _StorageInfoJs **************
// ********** Code for _StyleMediaJs **************
// ********** Code for _StyleSheetListJs **************
$dynamic("get$length").StyleSheetList = function() { return this.length; };
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
// ********** Code for _TextEventJs **************
// ********** Code for _TextMetricsJs **************
// ********** Code for _TextTrackJs **************
// ********** Code for _TextTrackCueJs **************
// ********** Code for _TextTrackCueListJs **************
// ********** Code for _TextTrackListJs **************
// ********** Code for _TimeRangesJs **************
// ********** Code for _TouchJs **************
// ********** Code for _TouchEventJs **************
// ********** Code for _TouchListJs **************
$dynamic("get$length").TouchList = function() { return this.length; };
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
// ********** Code for _TrackEventJs **************
// ********** Code for _TreeWalkerJs **************
// ********** Code for _Uint16ArrayJs **************
var _Uint16ArrayJs = {};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
// ********** Code for _Uint32ArrayJs **************
var _Uint32ArrayJs = {};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
// ********** Code for _Uint8ArrayJs **************
var _Uint8ArrayJs = {};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
// ********** Code for _Uint8ClampedArrayJs **************
var _Uint8ClampedArrayJs = {};
// ********** Code for _ValidityStateJs **************
// ********** Code for _WaveShaperNodeJs **************
// ********** Code for _WebGLActiveInfoJs **************
// ********** Code for _WebGLBufferJs **************
// ********** Code for _WebGLCompressedTexturesJs **************
// ********** Code for _WebGLContextAttributesJs **************
// ********** Code for _WebGLContextEventJs **************
// ********** Code for _WebGLDebugRendererInfoJs **************
// ********** Code for _WebGLDebugShadersJs **************
// ********** Code for _WebGLFramebufferJs **************
// ********** Code for _WebGLLoseContextJs **************
// ********** Code for _WebGLProgramJs **************
// ********** Code for _WebGLRenderbufferJs **************
// ********** Code for _WebGLRenderingContextJs **************
// ********** Code for _WebGLShaderJs **************
// ********** Code for _WebGLTextureJs **************
// ********** Code for _WebGLUniformLocationJs **************
// ********** Code for _WebGLVertexArrayObjectOESJs **************
// ********** Code for _WebKitAnimationJs **************
// ********** Code for _WebKitAnimationEventJs **************
// ********** Code for _WebKitAnimationListJs **************
// ********** Code for _WebKitBlobBuilderJs **************
// ********** Code for _WebKitCSSKeyframeRuleJs **************
// ********** Code for _WebKitCSSKeyframesRuleJs **************
// ********** Code for _WebKitCSSMatrixJs **************
// ********** Code for _WebKitCSSRegionRuleJs **************
// ********** Code for _WebKitCSSTransformValueJs **************
// ********** Code for _WebKitNamedFlowJs **************
// ********** Code for _WebKitPointJs **************
// ********** Code for _WebKitTransitionEventJs **************
// ********** Code for _WebSocketJs **************
// ********** Code for _WheelEventJs **************
// ********** Code for _WorkerJs **************
// ********** Code for _WorkerLocationJs **************
// ********** Code for _WorkerNavigatorJs **************
// ********** Code for _XMLHttpRequestJs **************
// ********** Code for _XMLHttpRequestExceptionJs **************
// ********** Code for _XMLHttpRequestProgressEventJs **************
// ********** Code for _XMLHttpRequestUploadJs **************
// ********** Code for _XMLSerializerJs **************
// ********** Code for _XPathEvaluatorJs **************
// ********** Code for _XPathExceptionJs **************
// ********** Code for _XPathExpressionJs **************
// ********** Code for _XPathNSResolverJs **************
// ********** Code for _XPathResultJs **************
// ********** Code for _XSLTProcessorJs **************
// ********** Code for _Collections **************
function _Collections() {}
// ********** Code for _AudioContextFactoryProvider **************
function _AudioContextFactoryProvider() {}
// ********** Code for _DOMParserFactoryProvider **************
function _DOMParserFactoryProvider() {}
// ********** Code for _FileReaderFactoryProvider **************
function _FileReaderFactoryProvider() {}
// ********** Code for _TypedArrayFactoryProvider **************
function _TypedArrayFactoryProvider() {}
_TypedArrayFactoryProvider.Float32Array$factory = function(length) {
  return _TypedArrayFactoryProvider._F32(length);
}
_TypedArrayFactoryProvider.Float32Array$fromList$factory = function(list) {
  return _TypedArrayFactoryProvider._F32(_TypedArrayFactoryProvider.ensureNative(list));
}
_TypedArrayFactoryProvider.Uint16Array$fromList$factory = function(list) {
  return _TypedArrayFactoryProvider._U16(_TypedArrayFactoryProvider.ensureNative(list));
}
_TypedArrayFactoryProvider._F32 = function(arg) {
  return new Float32Array(arg);
}
_TypedArrayFactoryProvider._U16 = function(arg) {
  return new Uint16Array(arg);
}
_TypedArrayFactoryProvider.ensureNative = function(list) {
  return list;
}
// ********** Code for _WebKitCSSMatrixFactoryProvider **************
function _WebKitCSSMatrixFactoryProvider() {}
// ********** Code for _WebKitPointFactoryProvider **************
function _WebKitPointFactoryProvider() {}
// ********** Code for _WebSocketFactoryProvider **************
function _WebSocketFactoryProvider() {}
// ********** Code for _XMLHttpRequestFactoryProvider **************
function _XMLHttpRequestFactoryProvider() {}
// ********** Code for _XSLTProcessorFactoryProvider **************
function _XSLTProcessorFactoryProvider() {}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$window() {
  return window;
}
function get$document() {
  return window.document;
}
//  ********** Library matrix **************
// ********** Code for ZeroLengthVectorException **************
function ZeroLengthVectorException() {

}
// ********** Code for Vector3 **************
function Vector3(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}
Vector3.prototype.magnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}
Vector3.prototype.normalize = function() {
  var len = this.magnitude();
  if (len == (0.0)) {
    $throw(new ZeroLengthVectorException());
  }
  return new Vector3(this.x / len, this.y / len, this.z / len);
}
Vector3.prototype.$sub = function(other) {
  return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
}
Vector3.prototype.toString = function() {
  return ("Vector3(" + this.x + "," + this.y + "," + this.z + ")");
}
// ********** Code for Matrix4 **************
function Matrix4() {
  this.buf = _TypedArrayFactoryProvider.Float32Array$factory((16));
}
Matrix4.rc = function(row, col) {
  return row + col * (4);
}
Matrix4.prototype.set$m00 = function(m) {
  this.buf.$setindex(Matrix4.rc((0), (0)), m);
}
Matrix4.prototype.set$m01 = function(m) {
  this.buf.$setindex(Matrix4.rc((0), (1)), m);
}
Matrix4.prototype.set$m02 = function(m) {
  this.buf.$setindex(Matrix4.rc((0), (2)), m);
}
Matrix4.prototype.set$m03 = function(m) {
  this.buf.$setindex(Matrix4.rc((0), (3)), m);
}
Matrix4.prototype.set$m10 = function(m) {
  this.buf.$setindex(Matrix4.rc((1), (0)), m);
}
Matrix4.prototype.set$m11 = function(m) {
  this.buf.$setindex(Matrix4.rc((1), (1)), m);
}
Matrix4.prototype.set$m12 = function(m) {
  this.buf.$setindex(Matrix4.rc((1), (2)), m);
}
Matrix4.prototype.set$m13 = function(m) {
  this.buf.$setindex(Matrix4.rc((1), (3)), m);
}
Matrix4.prototype.set$m20 = function(m) {
  this.buf.$setindex(Matrix4.rc((2), (0)), m);
}
Matrix4.prototype.set$m21 = function(m) {
  this.buf.$setindex(Matrix4.rc((2), (1)), m);
}
Matrix4.prototype.set$m22 = function(m) {
  this.buf.$setindex(Matrix4.rc((2), (2)), m);
}
Matrix4.prototype.set$m23 = function(m) {
  this.buf.$setindex(Matrix4.rc((2), (3)), m);
}
Matrix4.prototype.set$m32 = function(m) {
  this.buf.$setindex(Matrix4.rc((3), (2)), m);
}
Matrix4.prototype.set$m33 = function(m) {
  this.buf.$setindex(Matrix4.rc((3), (3)), m);
}
Matrix4.prototype.toString = function() {
  var rows = new Array();
  for (var row = (0);
   row < (4); row++) {
    var items = new Array();
    for (var col = (0);
     col < (4); col++) {
      var v = this.buf.$index(Matrix4.rc(row, col));
      if (v.abs() < (0.0)) {
        v = (0.0);
      }
      var display = null;
      try {
        display = v.toStringAsPrecision((4));
      } catch (e) {
        e = _toDartException(e);
        display = v.toString();
      }
      items.add(display);
    }
    rows.add(("| " + Strings.join(items, ", ") + " |"));
  }
  return ("Matrix4:\n" + Strings.join(rows, "\n"));
}
Matrix4.identity = function() {
  var m = new Matrix4();
  m.set$m00((1.0));
  m.set$m11((1.0));
  m.set$m22((1.0));
  m.set$m33((1.0));
  return m;
}
Matrix4.rotation = function(degrees, axis) {
  var radians = degrees / (180.0) * (3.141593);
  axis = axis.normalize();
  var x = axis.x;
  var y = axis.y;
  var z = axis.z;
  var s = Math.sin(radians);
  var c = Math.cos(radians);
  var t = (1) - c;
  var m = new Matrix4();
  m.set$m00(x * x * t + c);
  m.set$m10(x * y * t + z * s);
  m.set$m20(x * z * t - y * s);
  m.set$m01(x * y * t - z * s);
  m.set$m11(y * y * t + c);
  m.set$m21(y * z * t + x * s);
  m.set$m02(x * z * t + y * s);
  m.set$m12(y * z * t - x * s);
  m.set$m22(z * z * t + c);
  m.set$m33((1.0));
  return m;
}
Matrix4.translation = function(v) {
  var m = Matrix4.identity();
  m.set$m03(v.x);
  m.set$m13(v.y);
  m.set$m23(v.z);
  return m;
}
Matrix4.prototype.$mul = function(matrixB) {
  var $0;
  var matrixC = new Matrix4();
  var bufA = this.buf;
  var bufB = matrixB.buf;
  var bufC = matrixC.buf;
  for (var row = (0);
   row < (4); row++) {
    for (var col = (0);
     col < (4); col++) {
      for (var i = (0);
       i < (4); i++) {
        bufC.$setindex(($0 = Matrix4.rc(row, col)), bufC.$index($0) + (bufA.$index(Matrix4.rc(row, i)) * bufB.$index(Matrix4.rc(i, col))));
      }
    }
  }
  return matrixC;
}
Matrix4.perspective = function(fovyDegrees, aspectRatio, zNear, zFar) {
  var yTop = Math.tan(fovyDegrees * (3.141593) / (180.0) / (2.0)) * zNear;
  var xRight = aspectRatio * yTop;
  var zDepth = zFar - zNear;
  var m = new Matrix4();
  m.set$m00(zNear / xRight);
  m.set$m11(zNear / yTop);
  m.set$m22(-(zFar + zNear) / zDepth);
  m.set$m23(-((2) * zNear * zFar) / zDepth);
  m.set$m32((-1));
  return m;
}
// ********** Code for top level **************
//  ********** Library Lesson06 **************
// ********** Code for Lesson06 **************
function Lesson06() {

}
Lesson06.prototype.run = function() {
  new example().Init();
  this.write("Hello World!");
}
Lesson06.prototype.write = function(message) {
  var l = get$document().getElementById("status");
  l.innerText = message;
}
// ********** Code for example **************
function example() {
  this.rPyramid = (0);
  this.rCube = (0);
  this.xRot = (0);
  this.xSpeed = (50);
  this.yRot = (0);
  this.ySpeed = (50);
  this.z = (-5.0);
  this.filter = (0);
  this.scale = (1);
}
example.prototype._createShaders = function() {
  this.fragmentShaderSource = "    precision mediump float;\n\n    varying vec2 vTextureCoord;\n\n    uniform sampler2D uSampler;\n\n    void main(void) {\n        gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n    }\n    ";
  this.vertexShaderSource = " \n    attribute vec3 aVertexPosition;\n    attribute vec2 aTextureCoord;\n\n    uniform mat4 uMVMatrix;\n    uniform mat4 uPMatrix;\n\n    varying vec2 vTextureCoord;\n\n\n    void main(void) {\n        gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);\n        vTextureCoord = aTextureCoord;\n    }\n    ";
  this.fragmentShader = this.gl.createShader((35632));
  this.vertexShader = this.gl.createShader((35633));
  this.gl.shaderSource(this.fragmentShader, this.fragmentShaderSource);
  this.gl.compileShader(this.fragmentShader);
  this.gl.shaderSource(this.vertexShader, this.vertexShaderSource);
  this.gl.compileShader(this.vertexShader);
  this.shaderProgram = this.gl.createProgram();
  this.gl.attachShader(this.shaderProgram, this.vertexShader);
  this.gl.attachShader(this.shaderProgram, this.fragmentShader);
  this.gl.linkProgram(this.shaderProgram);
  this.gl.useProgram(this.shaderProgram);
  this.vertexPositionAttribute = this.gl.getAttribLocation(this.shaderProgram, "aVertexPosition");
  this.gl.enableVertexAttribArray(this.vertexPositionAttribute);
  this.textureCoordAttribute = this.gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
  this.gl.enableVertexAttribArray(this.textureCoordAttribute);
  this.pMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uPMatrix");
  this.mvMatrixUniform = this.gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
  this.samplerUniform = this.gl.getUniformLocation(this.shaderProgram, "uSampler");
}
example.prototype._createBuffers = function() {
  this.cubeVertexPositionBuffer = this.gl.createBuffer();
  this.gl.bindBuffer((34962), this.cubeVertexPositionBuffer);
  var vertices = [(-1.0), (-1.0), (1.0), (1.0), (-1.0), (1.0), (1.0), (1.0), (1.0), (-1.0), (1.0), (1.0), (-1.0), (-1.0), (-1.0), (-1.0), (1.0), (-1.0), (1.0), (1.0), (-1.0), (1.0), (-1.0), (-1.0), (-1.0), (1.0), (-1.0), (-1.0), (1.0), (1.0), (1.0), (1.0), (1.0), (1.0), (1.0), (-1.0), (-1.0), (-1.0), (-1.0), (1.0), (-1.0), (-1.0), (1.0), (-1.0), (1.0), (-1.0), (-1.0), (1.0), (1.0), (-1.0), (-1.0), (1.0), (1.0), (-1.0), (1.0), (1.0), (1.0), (1.0), (-1.0), (1.0), (-1.0), (-1.0), (-1.0), (-1.0), (-1.0), (1.0), (-1.0), (1.0), (1.0), (-1.0), (1.0), (-1.0)];
  this.gl.bufferData((34962), _TypedArrayFactoryProvider.Float32Array$fromList$factory(vertices), (35044));
  this.cubeVertexPositionBufferitemSize = (3);
  this.cubeVertexPositionBuffernumItems = (24);
  this.cubeVertexTextureCoordBuffer = this.gl.createBuffer();
  this.gl.bindBuffer((34962), this.cubeVertexTextureCoordBuffer);
  var textureCoords = [(0.0), (0.0), (1.0), (0.0), (1.0), (1.0), (0.0), (1.0), (1.0), (0.0), (1.0), (1.0), (0.0), (1.0), (0.0), (0.0), (0.0), (1.0), (0.0), (0.0), (1.0), (0.0), (1.0), (1.0), (1.0), (1.0), (0.0), (1.0), (0.0), (0.0), (1.0), (0.0), (1.0), (0.0), (1.0), (1.0), (0.0), (1.0), (0.0), (0.0), (0.0), (0.0), (1.0), (0.0), (1.0), (1.0), (0.0), (1.0)];
  this.gl.bufferData((34962), _TypedArrayFactoryProvider.Float32Array$fromList$factory(textureCoords), (35044));
  this.cubeVertexTextureCoordBufferitemSize = (2);
  this.cubeVertexTextureCoordBuffernumItems = (24);
  this.cubeVertexIndexBuffer = this.gl.createBuffer();
  this.gl.bindBuffer((34963), this.cubeVertexIndexBuffer);
  var cubeVertexIndices = [(0), (1), (2), (0), (2), (3), (4), (5), (6), (4), (6), (7), (8), (9), (10), (8), (10), (11), (12), (13), (14), (12), (14), (15), (16), (17), (18), (16), (18), (19), (20), (21), (22), (20), (22), (23)];
  this.gl.bufferData((34963), _TypedArrayFactoryProvider.Uint16Array$fromList$factory(cubeVertexIndices), (35044));
  this.cubeVertexIndexBufferitemSize = (1);
  this.cubeVertexIndexBuffernumItems = (36);
}
example.prototype._handleLoadedTexture = function(textures) {
  this.gl.pixelStorei((37440), (1));
  this.gl.bindTexture((3553), textures.$index((0)));
  this.gl.texImage2D((3553), (0), (6408), (6408), (5121), this.crateImage);
  this.gl.texParameteri((3553), (10240), (9728));
  this.gl.texParameteri((3553), (10241), (9728));
  this.gl.bindTexture((3553), textures.$index((1)));
  this.gl.texImage2D((3553), (0), (6408), (6408), (5121), this.crateImage);
  this.gl.texParameteri((3553), (10240), (9729));
  this.gl.texParameteri((3553), (10241), (9729));
  this.gl.bindTexture((3553), textures.$index((2)));
  this.gl.texImage2D((3553), (0), (6408), (6408), (5121), this.crateImage);
  this.gl.texParameteri((3553), (10240), (9729));
  this.gl.texParameteri((3553), (10241), (9985));
  this.gl.generateMipmap((3553));
  this.gl.bindTexture((3553), null);
}
example.prototype._setMatrixUniforms = function() {
  this.gl.uniformMatrix4fv(this.pMatrixUniform, false, this.pMatrix.buf);
  this.gl.uniformMatrix4fv(this.mvMatrixUniform, false, this.mvMatrix.buf);
}
example.prototype._degToRad = function(degrees) {
  return $div($mul(degrees, (3.141593)), (180));
}
example.prototype._createTextures = function() {
  this.crateTextures = [];
  this.crateImage = get$document().getElementById("crate");
  for (var i = (0);
   $lt(i, (3)); i = $add(i, (1))) {
    var texture = this.gl.createTexture();
    this.crateTextures.add(texture);
  }
  this._handleLoadedTexture(this.crateTextures);
}
example.prototype._drawScene = function() {
  this.gl.viewport((0), (0), this.canvas.width, this.canvas.height);
  this.gl.clear((16640));
  this.pMatrix = Matrix4.perspective((45.0), this.canvas.width / this.canvas.height, (0.1), (100.0));
  this.mvMatrix = Matrix4.translation(new Vector3((0.0), (0.0), this.z));
  this.mvMatrix = $mul(this.mvMatrix, Matrix4.rotation(this._degToRad(this.xRot), new Vector3((1), (0), (0))));
  this.mvMatrix = $mul(this.mvMatrix, Matrix4.rotation(this._degToRad(this.yRot), new Vector3((0), (1), (0))));
  this.gl.bindBuffer((34962), this.cubeVertexPositionBuffer);
  this.gl.vertexAttribPointer(this.vertexPositionAttribute, this.cubeVertexPositionBufferitemSize, (5126), false, (0), (0));
  this.gl.bindBuffer((34962), this.cubeVertexTextureCoordBuffer);
  this.gl.vertexAttribPointer(this.textureCoordAttribute, this.cubeVertexTextureCoordBufferitemSize, (5126), false, (0), (0));
  this.gl.activeTexture((33984));
  this.gl.bindTexture((3553), this.crateTextures.$index(this.filter));
  this.gl.uniform1i(this.samplerUniform, (0));
  this.gl.bindBuffer((34963), this.cubeVertexIndexBuffer);
  this._setMatrixUniforms();
  this.gl.drawElements((4), this.cubeVertexIndexBuffernumItems, (5123), (0));
}
example.prototype._tick = function(t) {
  get$window().webkitRequestAnimationFrame($wrap_call$1(this.get$_tick()), this.canvas);
  this._drawScene();
  this._animate();
}
example.prototype.get$_tick = function() {
  return this._tick.bind(this);
}
Function.prototype.bind = Function.prototype.bind ||
  function(thisObj, args) {
    var func = this;
    if (typeof args !== 'undefined') {
      var boundArgs = Array.prototype.slice.call(arguments, 3);
      return function() {
        // Prepend the bound arguments to the current arguments.
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(newArgs, boundArgs);
        return func.apply(thisObj, newArgs);
      };
    } else {
      return function() {
        return func.apply(thisObj, arguments);
      };
    }
  };
example.prototype._animate = function() {
  this.xRot = $add(this.xRot, this.xSpeed);
  this.yRot = $add(this.yRot, this.ySpeed);
}
example.prototype.Init = function() {
  this.mvMatrixStack = [];
  this.canvas = get$document().getElementById("canvas");
  this.gl = this.canvas.getContext("experimental-webgl");
  this.gl.viewport((0), (0), this.canvas.width, this.canvas.height);
  this._createShaders();
  this._createBuffers();
  this._createTextures();
  this.gl.clearColor((0.0), (0.0), (0.0), (1.0));
  this.gl.enable((2929));
  get$document().addEventListener("keydown", $wrap_call$1(this.get$_doKeyDown()), true);
  this._tick((0));
}
example.prototype._doKeyDown = function(event) {
  var c = event.keyCode;
  if ($eq(c, (90))) {
    this.z = $sub(this.z, ((0.05) * this.scale));
  }
  if ($eq(c, (88))) {
    this.z = $add(this.z, ((0.05) * this.scale));
  }
  if ($eq(c, (37))) {
    this.ySpeed = $sub(this.ySpeed, ((1) * this.scale));
  }
  if ($eq(c, (39))) {
    this.ySpeed = $add(this.ySpeed, ((1) * this.scale));
  }
  if ($eq(c, (38))) {
    this.xSpeed = $sub(this.xSpeed, ((1) * this.scale));
  }
  if ($eq(c, (40))) {
    this.xSpeed = $add(this.xSpeed, ((1) * this.scale));
  }
  if ($eq(c, (70))) {
    this.filter = $add(this.filter, (1));
    if ($eq(this.filter, (3))) {
      this.filter = (0);
    }
  }
  if ($eq(c, (83))) {
    this.scale = this.scale * (10);
    if (this.scale > (50)) {
      this.scale = (1);
    }
  }
}
example.prototype.get$_doKeyDown = function() {
  return this._doKeyDown.bind(this);
}
// ********** Code for top level **************
function main() {
  new Lesson06().run();
}
// 16 dynamic types.
// 17 types
// 2 !leaf
function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
(function(){
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection']
    , ['Uint8Array', 'Uint8Array|Uint8ClampedArray']
  ];
  $dynamicSetMetadata(table);
})();
main();
