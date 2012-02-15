//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
$defProp(Object.prototype, '$typeNameOf', function() {
  if ((typeof(window) != 'undefined' && window.constructor.name == 'DOMWindow')
      || typeof(process) != 'undefined') { // fast-path for Chrome and Node
    return this.constructor.name;
  }
  var str = Object.prototype.toString.call(this);
  str = str.substring(8, str.length - 1);
  if (str == 'Window') {
    str = 'DOMWindow';
  } else if (str == 'Document') {
    str = 'HTMLDocument';
  }
  return str;
});
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
function $truncdiv(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') {
    if (y == 0) $throw(new IntegerDivisionByZeroException());
    var tmp = x / y;
    return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
  } else {
    return x.$truncdiv(y);
  }
}
$defProp(Object.prototype, "get$typeName", Object.prototype.$typeNameOf);
// ********** Code for Object **************
$defProp(Object.prototype, "get$dynamic", function() {
  "use strict"; return this;
});
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "add$1", function($0) {
  return this.noSuchMethod("add", [$0]);
});
$defProp(Object.prototype, "add$2", function($0, $1) {
  return this.noSuchMethod("add", [$0, $1]);
});
$defProp(Object.prototype, "clear$0", function() {
  return this.noSuchMethod("clear", []);
});
$defProp(Object.prototype, "filter$1", function($0) {
  return this.noSuchMethod("filter", [$0]);
});
$defProp(Object.prototype, "forEach$1", function($0) {
  return this.noSuchMethod("forEach", [$0]);
});
$defProp(Object.prototype, "getContext$0", function() {
  return this.noSuchMethod("getContext", []);
});
$defProp(Object.prototype, "is$CanvasElement", function() {
  return false;
});
$defProp(Object.prototype, "is$Date", function() {
  return false;
});
$defProp(Object.prototype, "is$html_Element", function() {
  return false;
});
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
  this._existingArgumentNames = _existingArgumentNames;
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
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
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for EmptyQueueException **************
function EmptyQueueException() {

}
EmptyQueueException.prototype.toString = function() {
  return "EmptyQueueException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for IntegerDivisionByZeroException **************
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
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
// ********** Code for top level **************
function dart_core_print(obj) {
  return _print(obj);
}
function _print(obj) {
  if (typeof console == 'object') {
    if (obj) obj = obj.toString();
    console.log(obj);
  } else if (typeof write === 'function') {
    write(obj);
    write('\n');
  }
}
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
ListFactory.ListFactory$from$factory = function(other) {
  var list = [];
  for (var $$i = other.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    list.add$1(e);
  }
  return list;
}
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "addAll", function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var item = $$i.next();
    this.add(item);
  }
});
$defProp(ListFactory.prototype, "clear", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "add$1", ListFactory.prototype.add);
$defProp(ListFactory.prototype, "clear$0", ListFactory.prototype.clear);
$defProp(ListFactory.prototype, "filter$1", function($0) {
  return this.filter(to$call$1($0));
});
$defProp(ListFactory.prototype, "forEach$1", function($0) {
  return this.forEach(to$call$1($0));
});
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  return this._array.$index(this._pos++);
}
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
// ********** Code for ExceptionImplementation **************
function ExceptionImplementation(msg) {
  this._msg = msg;
}
ExceptionImplementation.prototype.toString = function() {
  return (null == this._msg) ? "Exception" : ("Exception: " + this._msg);
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0001 ? null == (existingKey) : const$0001 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0001) : key === const$0001)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.clear = function() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    this._keys.$setindex(i);
    this._values.$setindex(i);
  }
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0001) : $0 === const$0001))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.get$length = function() {
  return this._numberOfEntries;
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0001) : key !== const$0001))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.clear$0 = HashMapImplementation.prototype.clear;
HashMapImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$2($0));
};
// ********** Code for HashSetImplementation **************
function HashSetImplementation() {
  this._backingMap = new HashMapImplementation();
}
HashSetImplementation.prototype.clear = function() {
  this._backingMap.clear();
}
HashSetImplementation.prototype.add = function(value) {
  this._backingMap.$setindex(value, value);
}
HashSetImplementation.prototype.addAll = function(collection) {
  var $this = this; // closure support
  collection.forEach$1(function _(value) {
    $this.add(value);
  }
  );
}
HashSetImplementation.prototype.forEach = function(f) {
  this._backingMap.forEach(function _(key, value) {
    f(key);
  }
  );
}
HashSetImplementation.prototype.filter = function(f) {
  var result = new HashSetImplementation();
  this._backingMap.forEach(function _(key, value) {
    if (f(key)) result.add(key);
  }
  );
  return result;
}
HashSetImplementation.prototype.get$length = function() {
  return this._backingMap.get$length();
}
HashSetImplementation.prototype.iterator = function() {
  return new HashSetIterator(this);
}
HashSetImplementation.prototype.add$1 = HashSetImplementation.prototype.add;
HashSetImplementation.prototype.clear$0 = HashSetImplementation.prototype.clear;
HashSetImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
HashSetImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for HashSetIterator **************
function HashSetIterator(set_) {
  this._entries = set_._backingMap._keys;
  this._nextValidIndex = (-1);
  this._advance();
}
HashSetIterator.prototype.hasNext = function() {
  var $0;
  if (this._nextValidIndex >= this._entries.get$length()) return false;
  if ((($0 = this._entries.$index(this._nextValidIndex)) == null ? null == (const$0001) : $0 === const$0001)) {
    this._advance();
  }
  return this._nextValidIndex < this._entries.get$length();
}
HashSetIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  var res = this._entries.$index(this._nextValidIndex);
  this._advance();
  return res;
}
HashSetIterator.prototype._advance = function() {
  var length = this._entries.get$length();
  var entry;
  var deletedKey = const$0001;
  do {
    if (++this._nextValidIndex >= length) break;
    entry = this._entries.$index(this._nextValidIndex);
  }
  while ((null == entry) || ((null == entry ? null == (deletedKey) : entry === deletedKey)))
}
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {

}
// ********** Code for DoubleLinkedQueueEntry **************
function DoubleLinkedQueueEntry(e) {
  this._element = e;
}
DoubleLinkedQueueEntry.prototype._link = function(p, n) {
  this._next = n;
  this._previous = p;
  p._next = this;
  n._previous = this;
}
DoubleLinkedQueueEntry.prototype.prepend = function(e) {
  new DoubleLinkedQueueEntry(e)._link(this._previous, this);
}
DoubleLinkedQueueEntry.prototype.get$element = function() {
  return this._element;
}
// ********** Code for _DoubleLinkedQueueEntrySentinel **************
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
$inherits(_DoubleLinkedQueueEntrySentinel, DoubleLinkedQueueEntry);
function _DoubleLinkedQueueEntrySentinel() {
  DoubleLinkedQueueEntry.call(this, null);
  this._link(this, this);
}
_DoubleLinkedQueueEntrySentinel.prototype.get$element = function() {
  $throw(const$0002);
}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {
  this._sentinel = new _DoubleLinkedQueueEntrySentinel();
}
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    this.add(e);
  }
}
DoubleLinkedQueue.prototype.first = function() {
  return this._sentinel._next.get$element();
}
DoubleLinkedQueue.prototype.get$first = function() {
  return this.first.bind(this);
}
DoubleLinkedQueue.prototype.get$length = function() {
  var counter = (0);
  this.forEach(function _(element) {
    counter++;
  }
  );
  return counter;
}
DoubleLinkedQueue.prototype.clear = function() {
  this._sentinel._next = this._sentinel;
  this._sentinel._previous = this._sentinel;
}
DoubleLinkedQueue.prototype.forEach = function(f) {
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    f(entry._element);
    entry = nextEntry;
  }
}
DoubleLinkedQueue.prototype.filter = function(f) {
  var other = new DoubleLinkedQueue();
  var entry = this._sentinel._next;
  while ((null == entry ? null != (this._sentinel) : entry !== this._sentinel)) {
    var nextEntry = entry._next;
    if (f(entry._element)) other.addLast(entry._element);
    entry = nextEntry;
  }
  return other;
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
DoubleLinkedQueue.prototype.clear$0 = DoubleLinkedQueue.prototype.clear;
DoubleLinkedQueue.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
DoubleLinkedQueue.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _DoubleLinkedQueueIterator **************
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.get$length = function() {
  return this._length;
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.addAll = function(objects) {
  for (var $$i = objects.iterator(); $$i.hasNext(); ) {
    var obj = $$i.next();
    this.add(obj);
  }
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
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
StringBufferImpl.prototype.clear$0 = StringBufferImpl.prototype.clear;
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
StringImplementation.prototype.get$length = function() { return this.length; };
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
// ********** Code for _Worker **************
// ********** Code for _ArgumentMismatchException **************
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
$dynamic("get$dartObjectLocalStorage").DOMType = function() { return this.dartObjectLocalStorage; };
$dynamic("set$dartObjectLocalStorage").DOMType = function(value) { return this.dartObjectLocalStorage = value; };
// ********** Code for _EventTargetJs **************
// ********** Code for _AbstractWorkerJs **************
// ********** Code for _ArrayBufferJs **************
// ********** Code for _ArrayBufferViewJs **************
// ********** Code for _NodeJs **************
$dynamic("get$childNodes").Node = function() { return this.childNodes; };
$dynamic("get$firstChild").Node = function() { return this.firstChild; };
$dynamic("get$parentNode").Node = function() { return this.parentNode; };
$dynamic("get$textContent").Node = function() { return this.textContent; };
$dynamic("set$textContent").Node = function(value) { return this.textContent = value; };
// ********** Code for _AttrJs **************
// ********** Code for _AudioBufferJs **************
$dynamic("get$length").AudioBuffer = function() { return this.length; };
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
$dynamic("get$type").Event = function() { return this.type; };
// ********** Code for _AudioProcessingEventJs **************
// ********** Code for _BarInfoJs **************
// ********** Code for _BeforeLoadEventJs **************
// ********** Code for _BiquadFilterNodeJs **************
$dynamic("get$type").BiquadFilterNode = function() { return this.type; };
// ********** Code for _BlobJs **************
$dynamic("get$type").Blob = function() { return this.type; };
// ********** Code for _CharacterDataJs **************
$dynamic("get$length").CharacterData = function() { return this.length; };
// ********** Code for _TextJs **************
// ********** Code for _CDATASectionJs **************
// ********** Code for _CSSRuleJs **************
$dynamic("get$type").CSSRule = function() { return this.type; };
// ********** Code for _CSSCharsetRuleJs **************
// ********** Code for _CSSFontFaceRuleJs **************
// ********** Code for _CSSImportRuleJs **************
// ********** Code for _CSSMediaRuleJs **************
// ********** Code for _CSSPageRuleJs **************
// ********** Code for _CSSValueJs **************
// ********** Code for _CSSPrimitiveValueJs **************
// ********** Code for _CSSRuleListJs **************
$dynamic("get$length").CSSRuleList = function() { return this.length; };
// ********** Code for _CSSStyleDeclarationJs **************
$dynamic("get$length").CSSStyleDeclaration = function() { return this.length; };
// ********** Code for _CSSStyleRuleJs **************
// ********** Code for _StyleSheetJs **************
$dynamic("get$type").StyleSheet = function() { return this.type; };
// ********** Code for _CSSStyleSheetJs **************
// ********** Code for _CSSUnknownRuleJs **************
// ********** Code for _CSSValueListJs **************
$dynamic("get$length").CSSValueList = function() { return this.length; };
// ********** Code for _CanvasGradientJs **************
// ********** Code for _CanvasPatternJs **************
// ********** Code for _CanvasPixelArrayJs **************
$dynamic("get$length").CanvasPixelArray = function() { return this.length; };
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("$setindex").CanvasPixelArray = function(index, value) {
  this[index] = value
}
$dynamic("iterator").CanvasPixelArray = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").CanvasPixelArray = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").CanvasPixelArray = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").CanvasPixelArray = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").CanvasPixelArray = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").CanvasPixelArray = function($0) {
  return this.add($0);
};
$dynamic("filter$1").CanvasPixelArray = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").CanvasPixelArray = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _CanvasRenderingContextJs **************
// ********** Code for _CanvasRenderingContext2DJs **************
// ********** Code for _ClientRectJs **************
// ********** Code for _ClientRectListJs **************
$dynamic("get$length").ClientRectList = function() { return this.length; };
// ********** Code for _ClipboardJs **************
// ********** Code for _CloseEventJs **************
// ********** Code for _CommentJs **************
// ********** Code for _UIEventJs **************
// ********** Code for _CompositionEventJs **************
// ********** Code for _ConsoleJs **************
_ConsoleJs = (typeof console == 'undefined' ? {} : console);
_ConsoleJs.get$dartObjectLocalStorage = function() { return this.dartObjectLocalStorage; };
_ConsoleJs.set$dartObjectLocalStorage = function(value) { return this.dartObjectLocalStorage = value; };
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
$dynamic("get$type").DOMMimeType = function() { return this.type; };
// ********** Code for _DOMMimeTypeArrayJs **************
$dynamic("get$length").DOMMimeTypeArray = function() { return this.length; };
// ********** Code for _DOMParserJs **************
// ********** Code for _DOMPluginJs **************
$dynamic("get$length").DOMPlugin = function() { return this.length; };
// ********** Code for _DOMPluginArrayJs **************
$dynamic("get$length").DOMPluginArray = function() { return this.length; };
// ********** Code for _DOMSelectionJs **************
$dynamic("get$type").DOMSelection = function() { return this.type; };
// ********** Code for _DOMTokenListJs **************
$dynamic("get$length").DOMTokenList = function() { return this.length; };
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
// ********** Code for _DOMSettableTokenListJs **************
// ********** Code for _DOMURLJs **************
// ********** Code for _DOMWindowJs **************
$dynamic("get$length").DOMWindow = function() { return this.length; };
// ********** Code for _DataTransferItemJs **************
$dynamic("get$type").DataTransferItem = function() { return this.type; };
// ********** Code for _DataTransferItemListJs **************
$dynamic("get$length").DataTransferItemList = function() { return this.length; };
$dynamic("add$1").DataTransferItemList = function($0) {
  return this.add($0);
};
$dynamic("add$2").DataTransferItemList = function($0, $1) {
  return this.add($0, $1);
};
$dynamic("clear$0").DataTransferItemList = function() {
  return this.clear();
};
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
$dynamic("get$documentElement").Document = function() { return this.documentElement; };
// ********** Code for _DocumentFragmentJs **************
// ********** Code for _DocumentTypeJs **************
// ********** Code for _DynamicsCompressorNodeJs **************
// ********** Code for _ElementJs **************
$dynamic("get$firstElementChild").Element = function() { return this.firstElementChild; };
// ********** Code for _ElementTimeControlJs **************
// ********** Code for _ElementTraversalJs **************
$dynamic("get$firstElementChild").ElementTraversal = function() { return this.firstElementChild; };
// ********** Code for _EntityJs **************
// ********** Code for _EntityReferenceJs **************
// ********** Code for _EntryArrayJs **************
$dynamic("get$length").EntryArray = function() { return this.length; };
// ********** Code for _EntryArraySyncJs **************
$dynamic("get$length").EntryArraySync = function() { return this.length; };
// ********** Code for _ErrorEventJs **************
// ********** Code for _EventExceptionJs **************
// ********** Code for _EventSourceJs **************
// ********** Code for _FileJs **************
// ********** Code for _FileEntryJs **************
// ********** Code for _FileEntrySyncJs **************
// ********** Code for _FileErrorJs **************
// ********** Code for _FileExceptionJs **************
// ********** Code for _FileListJs **************
$dynamic("get$length").FileList = function() { return this.length; };
// ********** Code for _FileReaderJs **************
// ********** Code for _FileReaderSyncJs **************
// ********** Code for _FileWriterJs **************
$dynamic("get$length").FileWriter = function() { return this.length; };
// ********** Code for _FileWriterSyncJs **************
$dynamic("get$length").FileWriterSync = function() { return this.length; };
// ********** Code for _Float32ArrayJs **************
var _Float32ArrayJs = {};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new dom__FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float32Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Float32Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").Float32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Float32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Float64ArrayJs **************
var _Float64ArrayJs = {};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new dom__FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Float64Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Float64Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Float64Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").Float64Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Float64Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Float64Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _GeolocationJs **************
// ********** Code for _GeopositionJs **************
// ********** Code for _HTMLAllCollectionJs **************
$dynamic("get$length").HTMLAllCollection = function() { return this.length; };
// ********** Code for _HTMLElementJs **************
$dynamic("get$children").HTMLElement = function() { return this.children; };
$dynamic("set$innerHTML").HTMLElement = function(value) { return this.innerHTML = value; };
// ********** Code for _HTMLAnchorElementJs **************
$dynamic("get$text").HTMLAnchorElement = function() { return this.text; };
$dynamic("get$type").HTMLAnchorElement = function() { return this.type; };
// ********** Code for _HTMLAppletElementJs **************
// ********** Code for _HTMLAreaElementJs **************
// ********** Code for _HTMLMediaElementJs **************
// ********** Code for _HTMLAudioElementJs **************
// ********** Code for _HTMLBRElementJs **************
// ********** Code for _HTMLBaseElementJs **************
// ********** Code for _HTMLBaseFontElementJs **************
// ********** Code for _HTMLBodyElementJs **************
$dynamic("get$text").HTMLBodyElement = function() { return this.text; };
// ********** Code for _HTMLButtonElementJs **************
$dynamic("get$type").HTMLButtonElement = function() { return this.type; };
// ********** Code for _HTMLCanvasElementJs **************
// ********** Code for _HTMLCollectionJs **************
$dynamic("get$length").HTMLCollection = function() { return this.length; };
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new dom__FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").HTMLCollection = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").HTMLCollection = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").HTMLCollection = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").HTMLCollection = function($0) {
  return this.add($0);
};
$dynamic("filter$1").HTMLCollection = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").HTMLCollection = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _HTMLDListElementJs **************
// ********** Code for _HTMLDetailsElementJs **************
// ********** Code for _HTMLDirectoryElementJs **************
// ********** Code for _HTMLDivElementJs **************
// ********** Code for _HTMLDocumentJs **************
$dynamic("clear$0").HTMLDocument = function() {
  return this.clear();
};
// ********** Code for _HTMLEmbedElementJs **************
$dynamic("get$type").HTMLEmbedElement = function() { return this.type; };
// ********** Code for _HTMLFieldSetElementJs **************
// ********** Code for _HTMLFontElementJs **************
// ********** Code for _HTMLFormElementJs **************
$dynamic("get$elements").HTMLFormElement = function() { return this.elements; };
$dynamic("get$length").HTMLFormElement = function() { return this.length; };
// ********** Code for _HTMLFrameElementJs **************
// ********** Code for _HTMLFrameSetElementJs **************
// ********** Code for _HTMLHRElementJs **************
// ********** Code for _HTMLHeadElementJs **************
// ********** Code for _HTMLHeadingElementJs **************
// ********** Code for _HTMLHtmlElementJs **************
// ********** Code for _HTMLIFrameElementJs **************
// ********** Code for _HTMLImageElementJs **************
// ********** Code for _HTMLInputElementJs **************
$dynamic("get$type").HTMLInputElement = function() { return this.type; };
// ********** Code for _HTMLIsIndexElementJs **************
// ********** Code for _HTMLKeygenElementJs **************
$dynamic("get$type").HTMLKeygenElement = function() { return this.type; };
// ********** Code for _HTMLLIElementJs **************
$dynamic("get$type").HTMLLIElement = function() { return this.type; };
// ********** Code for _HTMLLabelElementJs **************
// ********** Code for _HTMLLegendElementJs **************
// ********** Code for _HTMLLinkElementJs **************
$dynamic("get$type").HTMLLinkElement = function() { return this.type; };
// ********** Code for _HTMLMapElementJs **************
// ********** Code for _HTMLMarqueeElementJs **************
// ********** Code for _HTMLMenuElementJs **************
// ********** Code for _HTMLMetaElementJs **************
// ********** Code for _HTMLMeterElementJs **************
// ********** Code for _HTMLModElementJs **************
// ********** Code for _HTMLOListElementJs **************
$dynamic("get$type").HTMLOListElement = function() { return this.type; };
// ********** Code for _HTMLObjectElementJs **************
$dynamic("get$type").HTMLObjectElement = function() { return this.type; };
// ********** Code for _HTMLOptGroupElementJs **************
// ********** Code for _HTMLOptionElementJs **************
$dynamic("get$text").HTMLOptionElement = function() { return this.text; };
// ********** Code for _HTMLOptionsCollectionJs **************
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
// ********** Code for _HTMLOutputElementJs **************
$dynamic("get$type").HTMLOutputElement = function() { return this.type; };
// ********** Code for _HTMLParagraphElementJs **************
// ********** Code for _HTMLParamElementJs **************
$dynamic("get$type").HTMLParamElement = function() { return this.type; };
// ********** Code for _HTMLPreElementJs **************
// ********** Code for _HTMLProgressElementJs **************
// ********** Code for _HTMLQuoteElementJs **************
// ********** Code for _HTMLScriptElementJs **************
$dynamic("get$text").HTMLScriptElement = function() { return this.text; };
$dynamic("get$type").HTMLScriptElement = function() { return this.type; };
// ********** Code for _HTMLSelectElementJs **************
$dynamic("get$length").HTMLSelectElement = function() { return this.length; };
$dynamic("get$type").HTMLSelectElement = function() { return this.type; };
$dynamic("add$2").HTMLSelectElement = function($0, $1) {
  return this.add($0, $1);
};
// ********** Code for _HTMLSourceElementJs **************
$dynamic("get$type").HTMLSourceElement = function() { return this.type; };
// ********** Code for _HTMLSpanElementJs **************
// ********** Code for _HTMLStyleElementJs **************
$dynamic("get$type").HTMLStyleElement = function() { return this.type; };
// ********** Code for _HTMLTableCaptionElementJs **************
// ********** Code for _HTMLTableCellElementJs **************
// ********** Code for _HTMLTableColElementJs **************
// ********** Code for _HTMLTableElementJs **************
// ********** Code for _HTMLTableRowElementJs **************
// ********** Code for _HTMLTableSectionElementJs **************
// ********** Code for _HTMLTextAreaElementJs **************
$dynamic("get$type").HTMLTextAreaElement = function() { return this.type; };
// ********** Code for _HTMLTitleElementJs **************
$dynamic("get$text").HTMLTitleElement = function() { return this.text; };
// ********** Code for _HTMLTrackElementJs **************
// ********** Code for _HTMLUListElementJs **************
$dynamic("get$type").HTMLUListElement = function() { return this.type; };
// ********** Code for _HTMLUnknownElementJs **************
// ********** Code for _HTMLVideoElementJs **************
// ********** Code for _HashChangeEventJs **************
// ********** Code for _HighPass2FilterNodeJs **************
// ********** Code for _HistoryJs **************
$dynamic("get$length").History = function() { return this.length; };
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
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
$dynamic("add$2").IDBObjectStore = function($0, $1) {
  return this.add($0, $1);
};
$dynamic("clear$0").IDBObjectStore = function() {
  return this.clear();
};
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
$dynamic("iterator").Int16Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int16Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Int16Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").Int16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int16Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Int32ArrayJs **************
var _Int32ArrayJs = {};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int32Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Int32Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").Int32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Int8ArrayJs **************
var _Int8ArrayJs = {};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Int8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Int8Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Int8Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").Int8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Int8Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Int8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _JavaScriptAudioNodeJs **************
// ********** Code for _JavaScriptCallFrameJs **************
$dynamic("get$type").JavaScriptCallFrame = function() { return this.type; };
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
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new dom__FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").MediaList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").MediaList = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").MediaList = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").MediaList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").MediaList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").MediaList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
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
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new dom__FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NamedNodeMap = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NamedNodeMap = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").NamedNodeMap = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").NamedNodeMap = function($0) {
  return this.add($0);
};
$dynamic("filter$1").NamedNodeMap = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").NamedNodeMap = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _NavigatorJs **************
// ********** Code for _NodeFilterJs **************
// ********** Code for _NodeIteratorJs **************
// ********** Code for _NodeListJs **************
$dynamic("get$length").NodeList = function() { return this.length; };
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("$setindex").NodeList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NodeList = function() {
  return new dom__FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NodeList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").NodeList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").NodeList = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").NodeList = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").NodeList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").NodeList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").NodeList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
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
$dynamic("get$type").PerformanceNavigation = function() { return this.type; };
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
$dynamic("get$length").SQLResultSetRowList = function() { return this.length; };
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
$dynamic("get$type").SVGComponentTransferFunctionElement = function() { return this.type; };
// ********** Code for _SVGCursorElementJs **************
// ********** Code for _SVGDefsElementJs **************
// ********** Code for _SVGDescElementJs **************
// ********** Code for _SVGDocumentJs **************
// ********** Code for _SVGElementInstanceJs **************
$dynamic("get$childNodes").SVGElementInstance = function() { return this.childNodes; };
$dynamic("get$firstChild").SVGElementInstance = function() { return this.firstChild; };
$dynamic("get$parentNode").SVGElementInstance = function() { return this.parentNode; };
// ********** Code for _SVGElementInstanceListJs **************
$dynamic("get$length").SVGElementInstanceList = function() { return this.length; };
// ********** Code for _SVGEllipseElementJs **************
// ********** Code for _SVGExceptionJs **************
// ********** Code for _SVGExternalResourcesRequiredJs **************
// ********** Code for _SVGFEBlendElementJs **************
// ********** Code for _SVGFEColorMatrixElementJs **************
$dynamic("get$type").SVGFEColorMatrixElement = function() { return this.type; };
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
$dynamic("get$type").SVGFETurbulenceElement = function() { return this.type; };
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
$dynamic("clear$0").SVGLengthList = function() {
  return this.clear();
};
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
$dynamic("clear$0").SVGNumberList = function() {
  return this.clear();
};
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
$dynamic("clear$0").SVGPathSegList = function() {
  return this.clear();
};
// ********** Code for _SVGPathSegMovetoAbsJs **************
// ********** Code for _SVGPathSegMovetoRelJs **************
// ********** Code for _SVGPatternElementJs **************
// ********** Code for _SVGPointJs **************
// ********** Code for _SVGPointListJs **************
$dynamic("clear$0").SVGPointList = function() {
  return this.clear();
};
// ********** Code for _SVGPolygonElementJs **************
// ********** Code for _SVGPolylineElementJs **************
// ********** Code for _SVGPreserveAspectRatioJs **************
// ********** Code for _SVGRadialGradientElementJs **************
// ********** Code for _SVGRectJs **************
// ********** Code for _SVGRectElementJs **************
// ********** Code for _SVGRenderingIntentJs **************
// ********** Code for _SVGSVGElementJs **************
// ********** Code for _SVGScriptElementJs **************
$dynamic("get$type").SVGScriptElement = function() { return this.type; };
// ********** Code for _SVGSetElementJs **************
// ********** Code for _SVGStopElementJs **************
// ********** Code for _SVGStringListJs **************
$dynamic("clear$0").SVGStringList = function() {
  return this.clear();
};
// ********** Code for _SVGStyleElementJs **************
$dynamic("get$type").SVGStyleElement = function() { return this.type; };
// ********** Code for _SVGSwitchElementJs **************
// ********** Code for _SVGSymbolElementJs **************
// ********** Code for _SVGTRefElementJs **************
// ********** Code for _SVGTSpanElementJs **************
// ********** Code for _SVGTestsJs **************
// ********** Code for _SVGTextElementJs **************
// ********** Code for _SVGTextPathElementJs **************
// ********** Code for _SVGTitleElementJs **************
// ********** Code for _SVGTransformJs **************
$dynamic("get$type").SVGTransform = function() { return this.type; };
// ********** Code for _SVGTransformListJs **************
$dynamic("clear$0").SVGTransformList = function() {
  return this.clear();
};
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
$dynamic("get$children").ScriptProfileNode = function() { return this.children; };
// ********** Code for _SharedWorkerJs **************
// ********** Code for _SharedWorkerContextJs **************
// ********** Code for _SpeechInputEventJs **************
// ********** Code for _SpeechInputResultJs **************
// ********** Code for _SpeechInputResultListJs **************
$dynamic("get$length").SpeechInputResultList = function() { return this.length; };
// ********** Code for _StorageJs **************
$dynamic("get$length").Storage = function() { return this.length; };
$dynamic("get$dartObjectLocalStorage").Storage = function() {
      if (this === window.localStorage)
        return window._dartLocalStorageLocalStorage;
      else if (this === window.sessionStorage)
        return window._dartSessionStorageLocalStorage;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');
}
$dynamic("set$dartObjectLocalStorage").Storage = function(value) {
      if (this === window.localStorage)
        window._dartLocalStorageLocalStorage = value;
      else if (this === window.sessionStorage)
        window._dartSessionStorageLocalStorage = value;
      else
        throw new UnsupportedOperationException('Cannot dartObjectLocalStorage for unknown Storage object.');
}
$dynamic("clear$0").Storage = function() {
  return this.clear();
};
// ********** Code for _StorageEventJs **************
// ********** Code for _StorageInfoJs **************
// ********** Code for _StyleMediaJs **************
$dynamic("get$type").StyleMedia = function() { return this.type; };
// ********** Code for _StyleSheetListJs **************
$dynamic("get$length").StyleSheetList = function() { return this.length; };
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new dom__FixedSizeListIterator_dom_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").StyleSheetList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").StyleSheetList = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").StyleSheetList = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").StyleSheetList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").StyleSheetList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").StyleSheetList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _TextEventJs **************
// ********** Code for _TextMetricsJs **************
// ********** Code for _TextTrackJs **************
// ********** Code for _TextTrackCueJs **************
$dynamic("get$text").TextTrackCue = function() { return this.text; };
// ********** Code for _TextTrackCueListJs **************
$dynamic("get$length").TextTrackCueList = function() { return this.length; };
// ********** Code for _TextTrackListJs **************
$dynamic("get$length").TextTrackList = function() { return this.length; };
// ********** Code for _TimeRangesJs **************
$dynamic("get$length").TimeRanges = function() { return this.length; };
// ********** Code for _TouchJs **************
// ********** Code for _TouchEventJs **************
// ********** Code for _TouchListJs **************
$dynamic("get$length").TouchList = function() { return this.length; };
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new dom__FixedSizeListIterator_dom_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").TouchList = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").TouchList = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").TouchList = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").TouchList = function($0) {
  return this.add($0);
};
$dynamic("filter$1").TouchList = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").TouchList = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _TrackEventJs **************
// ********** Code for _TreeWalkerJs **************
$dynamic("get$firstChild").TreeWalker = function() {
  return this.firstChild.bind(this);
}
$dynamic("get$parentNode").TreeWalker = function() {
  return this.parentNode.bind(this);
}
// ********** Code for _Uint16ArrayJs **************
var _Uint16ArrayJs = {};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint16Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint16Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Uint16Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").Uint16Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint16Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint16Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Uint32ArrayJs **************
var _Uint32ArrayJs = {};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint32Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint32Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Uint32Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").Uint32Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint32Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint32Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Uint8ArrayJs **************
var _Uint8ArrayJs = {};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new dom__FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("addAll").Uint8Array = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("forEach").Uint8Array = function(f) {
  return dom__Collections.forEach(this, f);
}
$dynamic("filter").Uint8Array = function(f) {
  return dom__Collections.filter(this, [], f);
}
$dynamic("add$1").Uint8Array = function($0) {
  return this.add($0);
};
$dynamic("filter$1").Uint8Array = function($0) {
  return this.filter($wrap_call$1(to$call$1($0)));
};
$dynamic("forEach$1").Uint8Array = function($0) {
  return this.forEach($wrap_call$1(to$call$1($0)));
};
// ********** Code for _Uint8ClampedArrayJs **************
var _Uint8ClampedArrayJs = {};
// ********** Code for _ValidityStateJs **************
// ********** Code for _WaveShaperNodeJs **************
// ********** Code for _WebGLActiveInfoJs **************
$dynamic("get$type").WebGLActiveInfo = function() { return this.type; };
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
$dynamic("get$length").WebKitAnimationList = function() { return this.length; };
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
// ********** Code for dom__Collections **************
function dom__Collections() {}
dom__Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    f(e);
  }
}
dom__Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) destination.add(e);
  }
  return destination;
}
// ********** Code for _AudioContextFactoryProvider **************
function _AudioContextFactoryProvider() {}
// ********** Code for _DOMParserFactoryProvider **************
function _DOMParserFactoryProvider() {}
// ********** Code for _FileReaderFactoryProvider **************
function _FileReaderFactoryProvider() {}
// ********** Code for _TypedArrayFactoryProvider **************
function _TypedArrayFactoryProvider() {}
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
// ********** Code for dom__VariableSizeListIterator **************
function dom__VariableSizeListIterator() {}
dom__VariableSizeListIterator.prototype.hasNext = function() {
  return this._dom_array.get$length() > this._dom_pos;
}
dom__VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  return this._dom_array.$index(this._dom_pos++);
}
// ********** Code for dom__FixedSizeListIterator **************
$inherits(dom__FixedSizeListIterator, dom__VariableSizeListIterator);
function dom__FixedSizeListIterator() {}
dom__FixedSizeListIterator.prototype.hasNext = function() {
  return this._dom_length > this._dom_pos;
}
// ********** Code for dom__VariableSizeListIterator_dart_core_String **************
$inherits(dom__VariableSizeListIterator_dart_core_String, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_dart_core_String(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_dart_core_String **************
$inherits(dom__FixedSizeListIterator_dart_core_String, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_dart_core_String(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_dart_core_String.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_int **************
$inherits(dom__VariableSizeListIterator_int, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_int(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_int **************
$inherits(dom__FixedSizeListIterator_int, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_int(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_int.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_num **************
$inherits(dom__VariableSizeListIterator_num, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_num(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_num **************
$inherits(dom__FixedSizeListIterator_num, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_num(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_num.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_dom_Node **************
$inherits(dom__VariableSizeListIterator_dom_Node, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_dom_Node(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_dom_Node **************
$inherits(dom__FixedSizeListIterator_dom_Node, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_dom_Node(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_dom_Node.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_dom_StyleSheet **************
$inherits(dom__VariableSizeListIterator_dom_StyleSheet, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_dom_StyleSheet(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_dom_StyleSheet **************
$inherits(dom__FixedSizeListIterator_dom_StyleSheet, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_dom_StyleSheet(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_dom_StyleSheet.call(this, array);
}
// ********** Code for dom__VariableSizeListIterator_dom_Touch **************
$inherits(dom__VariableSizeListIterator_dom_Touch, dom__VariableSizeListIterator);
function dom__VariableSizeListIterator_dom_Touch(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for dom__FixedSizeListIterator_dom_Touch **************
$inherits(dom__FixedSizeListIterator_dom_Touch, dom__FixedSizeListIterator);
function dom__FixedSizeListIterator_dom_Touch(array) {
  this._dom_length = array.get$length();
  dom__VariableSizeListIterator_dom_Touch.call(this, array);
}
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$window() {
  return window;
}
function get$document() {
  return window.document;
}
//  ********** Library htmlimpl **************
// ********** Code for DOMWrapperBase **************
DOMWrapperBase._wrap$ctor = function(_ptr) {
  this._ptr = _ptr;
  var hasExistingWrapper = null == this._ptr.get$dartObjectLocalStorage();
  this._ptr.set$dartObjectLocalStorage(this);
}
DOMWrapperBase._wrap$ctor.prototype = DOMWrapperBase.prototype;
function DOMWrapperBase() {}
DOMWrapperBase.prototype.get$_ptr = function() { return this._ptr; };
// ********** Code for EventTargetWrappingImplementation **************
$inherits(EventTargetWrappingImplementation, DOMWrapperBase);
EventTargetWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventTargetWrappingImplementation._wrap$ctor.prototype = EventTargetWrappingImplementation.prototype;
function EventTargetWrappingImplementation() {}
// ********** Code for NodeWrappingImplementation **************
$inherits(NodeWrappingImplementation, EventTargetWrappingImplementation);
NodeWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
NodeWrappingImplementation._wrap$ctor.prototype = NodeWrappingImplementation.prototype;
function NodeWrappingImplementation() {}
NodeWrappingImplementation.prototype.get$nodes = function() {
  if (null == this._nodes) {
    this._nodes = new _ChildrenNodeList._wrap$ctor(this._ptr);
  }
  return this._nodes;
}
NodeWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$textContent();
}
NodeWrappingImplementation.prototype.replaceWith = function(otherNode) {
  try {
    this._ptr.get$parentNode().replaceChild(LevelDom.unwrap(otherNode), this._ptr);
  } catch (e) {
    e = _toDartException(e);
  }
  return this;
}
// ********** Code for ElementWrappingImplementation **************
$inherits(ElementWrappingImplementation, NodeWrappingImplementation);
ElementWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ElementWrappingImplementation._wrap$ctor.prototype = ElementWrappingImplementation.prototype;
function ElementWrappingImplementation() {}
ElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ElementWrappingImplementation.ElementWrappingImplementation$tag$factory = function(tag) {
  return LevelDom.wrapElement(get$document().createElement(tag));
}
ElementWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new _ChildrenElementList._wrap$ctor(this._ptr);
  }
  return this._elements;
}
ElementWrappingImplementation.prototype.get$firstElementChild = function() {
  return LevelDom.wrapElement(this._ptr.get$firstElementChild());
}
ElementWrappingImplementation.prototype.set$innerHTML = function(value) {
  this._ptr.set$innerHTML(value);
}
ElementWrappingImplementation.prototype.query = function(selectors) {
  return LevelDom.wrapElement(this._ptr.querySelector(selectors));
}
// ********** Code for AnchorElementWrappingImplementation **************
$inherits(AnchorElementWrappingImplementation, ElementWrappingImplementation);
AnchorElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnchorElementWrappingImplementation._wrap$ctor.prototype = AnchorElementWrappingImplementation.prototype;
function AnchorElementWrappingImplementation() {}
AnchorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
AnchorElementWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$text();
}
AnchorElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
AnchorElementWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for AnimationListWrappingImplementation **************
$inherits(AnimationListWrappingImplementation, DOMWrapperBase);
AnimationListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
AnimationListWrappingImplementation._wrap$ctor.prototype = AnimationListWrappingImplementation.prototype;
function AnimationListWrappingImplementation() {}
AnimationListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
AnimationListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapAnimation(this._ptr.item(index));
}
// ********** Code for AnimationWrappingImplementation **************
$inherits(AnimationWrappingImplementation, DOMWrapperBase);
AnimationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
AnimationWrappingImplementation._wrap$ctor.prototype = AnimationWrappingImplementation.prototype;
function AnimationWrappingImplementation() {}
// ********** Code for AreaElementWrappingImplementation **************
$inherits(AreaElementWrappingImplementation, ElementWrappingImplementation);
AreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AreaElementWrappingImplementation._wrap$ctor.prototype = AreaElementWrappingImplementation.prototype;
function AreaElementWrappingImplementation() {}
AreaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ArrayBufferViewWrappingImplementation **************
$inherits(ArrayBufferViewWrappingImplementation, DOMWrapperBase);
ArrayBufferViewWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ArrayBufferViewWrappingImplementation._wrap$ctor.prototype = ArrayBufferViewWrappingImplementation.prototype;
function ArrayBufferViewWrappingImplementation() {}
// ********** Code for ArrayBufferWrappingImplementation **************
$inherits(ArrayBufferWrappingImplementation, DOMWrapperBase);
ArrayBufferWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ArrayBufferWrappingImplementation._wrap$ctor.prototype = ArrayBufferWrappingImplementation.prototype;
function ArrayBufferWrappingImplementation() {}
// ********** Code for AudioNodeWrappingImplementation **************
$inherits(AudioNodeWrappingImplementation, DOMWrapperBase);
AudioNodeWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
AudioNodeWrappingImplementation._wrap$ctor.prototype = AudioNodeWrappingImplementation.prototype;
function AudioNodeWrappingImplementation() {}
// ********** Code for AudioSourceNodeWrappingImplementation **************
$inherits(AudioSourceNodeWrappingImplementation, AudioNodeWrappingImplementation);
AudioSourceNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioSourceNodeWrappingImplementation._wrap$ctor.prototype = AudioSourceNodeWrappingImplementation.prototype;
function AudioSourceNodeWrappingImplementation() {}
// ********** Code for AudioBufferSourceNodeWrappingImplementation **************
$inherits(AudioBufferSourceNodeWrappingImplementation, AudioSourceNodeWrappingImplementation);
AudioBufferSourceNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioSourceNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioBufferSourceNodeWrappingImplementation._wrap$ctor.prototype = AudioBufferSourceNodeWrappingImplementation.prototype;
function AudioBufferSourceNodeWrappingImplementation() {}
// ********** Code for AudioBufferWrappingImplementation **************
$inherits(AudioBufferWrappingImplementation, DOMWrapperBase);
AudioBufferWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
AudioBufferWrappingImplementation._wrap$ctor.prototype = AudioBufferWrappingImplementation.prototype;
function AudioBufferWrappingImplementation() {}
AudioBufferWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for AudioChannelMergerWrappingImplementation **************
$inherits(AudioChannelMergerWrappingImplementation, AudioNodeWrappingImplementation);
AudioChannelMergerWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioChannelMergerWrappingImplementation._wrap$ctor.prototype = AudioChannelMergerWrappingImplementation.prototype;
function AudioChannelMergerWrappingImplementation() {}
// ********** Code for AudioChannelSplitterWrappingImplementation **************
$inherits(AudioChannelSplitterWrappingImplementation, AudioNodeWrappingImplementation);
AudioChannelSplitterWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioChannelSplitterWrappingImplementation._wrap$ctor.prototype = AudioChannelSplitterWrappingImplementation.prototype;
function AudioChannelSplitterWrappingImplementation() {}
// ********** Code for AudioContextWrappingImplementation **************
$inherits(AudioContextWrappingImplementation, DOMWrapperBase);
AudioContextWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
AudioContextWrappingImplementation._wrap$ctor.prototype = AudioContextWrappingImplementation.prototype;
function AudioContextWrappingImplementation() {}
// ********** Code for AudioDestinationNodeWrappingImplementation **************
$inherits(AudioDestinationNodeWrappingImplementation, AudioNodeWrappingImplementation);
AudioDestinationNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioDestinationNodeWrappingImplementation._wrap$ctor.prototype = AudioDestinationNodeWrappingImplementation.prototype;
function AudioDestinationNodeWrappingImplementation() {}
// ********** Code for MediaElementWrappingImplementation **************
$inherits(MediaElementWrappingImplementation, ElementWrappingImplementation);
MediaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MediaElementWrappingImplementation._wrap$ctor.prototype = MediaElementWrappingImplementation.prototype;
function MediaElementWrappingImplementation() {}
MediaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for AudioElementWrappingImplementation **************
$inherits(AudioElementWrappingImplementation, MediaElementWrappingImplementation);
AudioElementWrappingImplementation._wrap$ctor = function(ptr) {
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioElementWrappingImplementation._wrap$ctor.prototype = AudioElementWrappingImplementation.prototype;
function AudioElementWrappingImplementation() {}
AudioElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for AudioGainNodeWrappingImplementation **************
$inherits(AudioGainNodeWrappingImplementation, AudioNodeWrappingImplementation);
AudioGainNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioGainNodeWrappingImplementation._wrap$ctor.prototype = AudioGainNodeWrappingImplementation.prototype;
function AudioGainNodeWrappingImplementation() {}
// ********** Code for AudioParamWrappingImplementation **************
$inherits(AudioParamWrappingImplementation, DOMWrapperBase);
AudioParamWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
AudioParamWrappingImplementation._wrap$ctor.prototype = AudioParamWrappingImplementation.prototype;
function AudioParamWrappingImplementation() {}
// ********** Code for AudioGainWrappingImplementation **************
$inherits(AudioGainWrappingImplementation, AudioParamWrappingImplementation);
AudioGainWrappingImplementation._wrap$ctor = function(ptr) {
  AudioParamWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioGainWrappingImplementation._wrap$ctor.prototype = AudioGainWrappingImplementation.prototype;
function AudioGainWrappingImplementation() {}
// ********** Code for AudioListenerWrappingImplementation **************
$inherits(AudioListenerWrappingImplementation, DOMWrapperBase);
AudioListenerWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
AudioListenerWrappingImplementation._wrap$ctor.prototype = AudioListenerWrappingImplementation.prototype;
function AudioListenerWrappingImplementation() {}
// ********** Code for AudioPannerNodeWrappingImplementation **************
$inherits(AudioPannerNodeWrappingImplementation, AudioNodeWrappingImplementation);
AudioPannerNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioPannerNodeWrappingImplementation._wrap$ctor.prototype = AudioPannerNodeWrappingImplementation.prototype;
function AudioPannerNodeWrappingImplementation() {}
// ********** Code for EventWrappingImplementation **************
$inherits(EventWrappingImplementation, DOMWrapperBase);
EventWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventWrappingImplementation._wrap$ctor.prototype = EventWrappingImplementation.prototype;
function EventWrappingImplementation() {}
EventWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for AudioProcessingEventWrappingImplementation **************
$inherits(AudioProcessingEventWrappingImplementation, EventWrappingImplementation);
AudioProcessingEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
AudioProcessingEventWrappingImplementation._wrap$ctor.prototype = AudioProcessingEventWrappingImplementation.prototype;
function AudioProcessingEventWrappingImplementation() {}
// ********** Code for BRElementWrappingImplementation **************
$inherits(BRElementWrappingImplementation, ElementWrappingImplementation);
BRElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BRElementWrappingImplementation._wrap$ctor.prototype = BRElementWrappingImplementation.prototype;
function BRElementWrappingImplementation() {}
BRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for BarInfoWrappingImplementation **************
$inherits(BarInfoWrappingImplementation, DOMWrapperBase);
BarInfoWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
BarInfoWrappingImplementation._wrap$ctor.prototype = BarInfoWrappingImplementation.prototype;
function BarInfoWrappingImplementation() {}
// ********** Code for BaseElementWrappingImplementation **************
$inherits(BaseElementWrappingImplementation, ElementWrappingImplementation);
BaseElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BaseElementWrappingImplementation._wrap$ctor.prototype = BaseElementWrappingImplementation.prototype;
function BaseElementWrappingImplementation() {}
BaseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for BiquadFilterNodeWrappingImplementation **************
$inherits(BiquadFilterNodeWrappingImplementation, AudioNodeWrappingImplementation);
BiquadFilterNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
BiquadFilterNodeWrappingImplementation._wrap$ctor.prototype = BiquadFilterNodeWrappingImplementation.prototype;
function BiquadFilterNodeWrappingImplementation() {}
BiquadFilterNodeWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for BlobBuilderWrappingImplementation **************
$inherits(BlobBuilderWrappingImplementation, DOMWrapperBase);
BlobBuilderWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
BlobBuilderWrappingImplementation._wrap$ctor.prototype = BlobBuilderWrappingImplementation.prototype;
function BlobBuilderWrappingImplementation() {}
// ********** Code for BlobWrappingImplementation **************
$inherits(BlobWrappingImplementation, DOMWrapperBase);
BlobWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
BlobWrappingImplementation._wrap$ctor.prototype = BlobWrappingImplementation.prototype;
function BlobWrappingImplementation() {}
BlobWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for ButtonElementWrappingImplementation **************
$inherits(ButtonElementWrappingImplementation, ElementWrappingImplementation);
ButtonElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ButtonElementWrappingImplementation._wrap$ctor.prototype = ButtonElementWrappingImplementation.prototype;
function ButtonElementWrappingImplementation() {}
ButtonElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ButtonElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for CharacterDataWrappingImplementation **************
$inherits(CharacterDataWrappingImplementation, NodeWrappingImplementation);
CharacterDataWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
CharacterDataWrappingImplementation._wrap$ctor.prototype = CharacterDataWrappingImplementation.prototype;
function CharacterDataWrappingImplementation() {}
CharacterDataWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for TextWrappingImplementation **************
$inherits(TextWrappingImplementation, CharacterDataWrappingImplementation);
TextWrappingImplementation._wrap$ctor = function(ptr) {
  CharacterDataWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextWrappingImplementation._wrap$ctor.prototype = TextWrappingImplementation.prototype;
function TextWrappingImplementation() {}
// ********** Code for CDATASectionWrappingImplementation **************
$inherits(CDATASectionWrappingImplementation, TextWrappingImplementation);
CDATASectionWrappingImplementation._wrap$ctor = function(ptr) {
  TextWrappingImplementation._wrap$ctor.call(this, ptr);
}
CDATASectionWrappingImplementation._wrap$ctor.prototype = CDATASectionWrappingImplementation.prototype;
function CDATASectionWrappingImplementation() {}
// ********** Code for CSSRuleWrappingImplementation **************
$inherits(CSSRuleWrappingImplementation, DOMWrapperBase);
CSSRuleWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CSSRuleWrappingImplementation._wrap$ctor.prototype = CSSRuleWrappingImplementation.prototype;
function CSSRuleWrappingImplementation() {}
CSSRuleWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for CSSCharsetRuleWrappingImplementation **************
$inherits(CSSCharsetRuleWrappingImplementation, CSSRuleWrappingImplementation);
CSSCharsetRuleWrappingImplementation._wrap$ctor = function(ptr) {
  CSSRuleWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSCharsetRuleWrappingImplementation._wrap$ctor.prototype = CSSCharsetRuleWrappingImplementation.prototype;
function CSSCharsetRuleWrappingImplementation() {}
// ********** Code for CSSFontFaceRuleWrappingImplementation **************
$inherits(CSSFontFaceRuleWrappingImplementation, CSSRuleWrappingImplementation);
CSSFontFaceRuleWrappingImplementation._wrap$ctor = function(ptr) {
  CSSRuleWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSFontFaceRuleWrappingImplementation._wrap$ctor.prototype = CSSFontFaceRuleWrappingImplementation.prototype;
function CSSFontFaceRuleWrappingImplementation() {}
// ********** Code for CSSImportRuleWrappingImplementation **************
$inherits(CSSImportRuleWrappingImplementation, CSSRuleWrappingImplementation);
CSSImportRuleWrappingImplementation._wrap$ctor = function(ptr) {
  CSSRuleWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSImportRuleWrappingImplementation._wrap$ctor.prototype = CSSImportRuleWrappingImplementation.prototype;
function CSSImportRuleWrappingImplementation() {}
// ********** Code for CSSKeyframeRuleWrappingImplementation **************
$inherits(CSSKeyframeRuleWrappingImplementation, CSSRuleWrappingImplementation);
CSSKeyframeRuleWrappingImplementation._wrap$ctor = function(ptr) {
  CSSRuleWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSKeyframeRuleWrappingImplementation._wrap$ctor.prototype = CSSKeyframeRuleWrappingImplementation.prototype;
function CSSKeyframeRuleWrappingImplementation() {}
// ********** Code for CSSKeyframesRuleWrappingImplementation **************
$inherits(CSSKeyframesRuleWrappingImplementation, CSSRuleWrappingImplementation);
CSSKeyframesRuleWrappingImplementation._wrap$ctor = function(ptr) {
  CSSRuleWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSKeyframesRuleWrappingImplementation._wrap$ctor.prototype = CSSKeyframesRuleWrappingImplementation.prototype;
function CSSKeyframesRuleWrappingImplementation() {}
// ********** Code for CSSMatrixWrappingImplementation **************
$inherits(CSSMatrixWrappingImplementation, DOMWrapperBase);
CSSMatrixWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CSSMatrixWrappingImplementation._wrap$ctor.prototype = CSSMatrixWrappingImplementation.prototype;
function CSSMatrixWrappingImplementation() {}
CSSMatrixWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for CSSMediaRuleWrappingImplementation **************
$inherits(CSSMediaRuleWrappingImplementation, CSSRuleWrappingImplementation);
CSSMediaRuleWrappingImplementation._wrap$ctor = function(ptr) {
  CSSRuleWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSMediaRuleWrappingImplementation._wrap$ctor.prototype = CSSMediaRuleWrappingImplementation.prototype;
function CSSMediaRuleWrappingImplementation() {}
// ********** Code for CSSPageRuleWrappingImplementation **************
$inherits(CSSPageRuleWrappingImplementation, CSSRuleWrappingImplementation);
CSSPageRuleWrappingImplementation._wrap$ctor = function(ptr) {
  CSSRuleWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSPageRuleWrappingImplementation._wrap$ctor.prototype = CSSPageRuleWrappingImplementation.prototype;
function CSSPageRuleWrappingImplementation() {}
// ********** Code for CSSValueWrappingImplementation **************
$inherits(CSSValueWrappingImplementation, DOMWrapperBase);
CSSValueWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CSSValueWrappingImplementation._wrap$ctor.prototype = CSSValueWrappingImplementation.prototype;
function CSSValueWrappingImplementation() {}
// ********** Code for CSSPrimitiveValueWrappingImplementation **************
$inherits(CSSPrimitiveValueWrappingImplementation, CSSValueWrappingImplementation);
CSSPrimitiveValueWrappingImplementation._wrap$ctor = function(ptr) {
  CSSValueWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSPrimitiveValueWrappingImplementation._wrap$ctor.prototype = CSSPrimitiveValueWrappingImplementation.prototype;
function CSSPrimitiveValueWrappingImplementation() {}
// ********** Code for CSSRuleListWrappingImplementation **************
$inherits(CSSRuleListWrappingImplementation, DOMWrapperBase);
CSSRuleListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CSSRuleListWrappingImplementation._wrap$ctor.prototype = CSSRuleListWrappingImplementation.prototype;
function CSSRuleListWrappingImplementation() {}
CSSRuleListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
CSSRuleListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapCSSRule(this._ptr.item(index));
}
// ********** Code for CSSStyleRuleWrappingImplementation **************
$inherits(CSSStyleRuleWrappingImplementation, CSSRuleWrappingImplementation);
CSSStyleRuleWrappingImplementation._wrap$ctor = function(ptr) {
  CSSRuleWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSStyleRuleWrappingImplementation._wrap$ctor.prototype = CSSStyleRuleWrappingImplementation.prototype;
function CSSStyleRuleWrappingImplementation() {}
// ********** Code for StyleSheetWrappingImplementation **************
$inherits(StyleSheetWrappingImplementation, DOMWrapperBase);
StyleSheetWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
StyleSheetWrappingImplementation._wrap$ctor.prototype = StyleSheetWrappingImplementation.prototype;
function StyleSheetWrappingImplementation() {}
StyleSheetWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for CSSStyleSheetWrappingImplementation **************
$inherits(CSSStyleSheetWrappingImplementation, StyleSheetWrappingImplementation);
CSSStyleSheetWrappingImplementation._wrap$ctor = function(ptr) {
  StyleSheetWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSStyleSheetWrappingImplementation._wrap$ctor.prototype = CSSStyleSheetWrappingImplementation.prototype;
function CSSStyleSheetWrappingImplementation() {}
// ********** Code for CSSValueListWrappingImplementation **************
$inherits(CSSValueListWrappingImplementation, CSSValueWrappingImplementation);
CSSValueListWrappingImplementation._wrap$ctor = function(ptr) {
  CSSValueWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSValueListWrappingImplementation._wrap$ctor.prototype = CSSValueListWrappingImplementation.prototype;
function CSSValueListWrappingImplementation() {}
CSSValueListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
CSSValueListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapCSSValue(this._ptr.item(index));
}
// ********** Code for CSSTransformValueWrappingImplementation **************
$inherits(CSSTransformValueWrappingImplementation, CSSValueListWrappingImplementation);
CSSTransformValueWrappingImplementation._wrap$ctor = function(ptr) {
  CSSValueListWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSTransformValueWrappingImplementation._wrap$ctor.prototype = CSSTransformValueWrappingImplementation.prototype;
function CSSTransformValueWrappingImplementation() {}
// ********** Code for CSSUnknownRuleWrappingImplementation **************
$inherits(CSSUnknownRuleWrappingImplementation, CSSRuleWrappingImplementation);
CSSUnknownRuleWrappingImplementation._wrap$ctor = function(ptr) {
  CSSRuleWrappingImplementation._wrap$ctor.call(this, ptr);
}
CSSUnknownRuleWrappingImplementation._wrap$ctor.prototype = CSSUnknownRuleWrappingImplementation.prototype;
function CSSUnknownRuleWrappingImplementation() {}
// ********** Code for CanvasElementWrappingImplementation **************
$inherits(CanvasElementWrappingImplementation, ElementWrappingImplementation);
CanvasElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
CanvasElementWrappingImplementation._wrap$ctor.prototype = CanvasElementWrappingImplementation.prototype;
function CanvasElementWrappingImplementation() {}
CanvasElementWrappingImplementation.prototype.is$CanvasElement = function(){return true};
CanvasElementWrappingImplementation.prototype.is$html_Element = function(){return true};
CanvasElementWrappingImplementation.prototype.getContext = function(contextId) {
  if (null == contextId) {
    return LevelDom.wrapCanvasRenderingContext(this._ptr.getContext$0());
  }
  else {
    return LevelDom.wrapCanvasRenderingContext(this._ptr.getContext(contextId));
  }
}
CanvasElementWrappingImplementation.prototype.getContext$0 = CanvasElementWrappingImplementation.prototype.getContext;
// ********** Code for CanvasGradientWrappingImplementation **************
$inherits(CanvasGradientWrappingImplementation, DOMWrapperBase);
CanvasGradientWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CanvasGradientWrappingImplementation._wrap$ctor.prototype = CanvasGradientWrappingImplementation.prototype;
function CanvasGradientWrappingImplementation() {}
// ********** Code for CanvasPatternWrappingImplementation **************
$inherits(CanvasPatternWrappingImplementation, DOMWrapperBase);
CanvasPatternWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CanvasPatternWrappingImplementation._wrap$ctor.prototype = CanvasPatternWrappingImplementation.prototype;
function CanvasPatternWrappingImplementation() {}
// ********** Code for CanvasPixelArrayWrappingImplementation **************
$inherits(CanvasPixelArrayWrappingImplementation, DOMWrapperBase);
CanvasPixelArrayWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CanvasPixelArrayWrappingImplementation._wrap$ctor.prototype = CanvasPixelArrayWrappingImplementation.prototype;
function CanvasPixelArrayWrappingImplementation() {}
CanvasPixelArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
CanvasPixelArrayWrappingImplementation.prototype.$index = function(index) {
  return this._ptr.$index(index);
}
CanvasPixelArrayWrappingImplementation.prototype.$setindex = function(index, value) {
  this._ptr.$setindex(index, value);
}
CanvasPixelArrayWrappingImplementation.prototype.add = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
CanvasPixelArrayWrappingImplementation.prototype.addAll = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
CanvasPixelArrayWrappingImplementation.prototype.clear = function() {
  $throw(new UnsupportedOperationException("Cannot clear immutable List."));
}
CanvasPixelArrayWrappingImplementation.prototype.forEach = function(f) {
  _Collections.forEach(this, f);
}
CanvasPixelArrayWrappingImplementation.prototype.filter = function(f) {
  return _Collections.filter(this, new Array(), f);
}
CanvasPixelArrayWrappingImplementation.prototype.iterator = function() {
  return new _FixedSizeListIterator_int(this);
}
CanvasPixelArrayWrappingImplementation.prototype.add$1 = CanvasPixelArrayWrappingImplementation.prototype.add;
CanvasPixelArrayWrappingImplementation.prototype.clear$0 = CanvasPixelArrayWrappingImplementation.prototype.clear;
CanvasPixelArrayWrappingImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
CanvasPixelArrayWrappingImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for CanvasRenderingContextWrappingImplementation **************
$inherits(CanvasRenderingContextWrappingImplementation, DOMWrapperBase);
CanvasRenderingContextWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CanvasRenderingContextWrappingImplementation._wrap$ctor.prototype = CanvasRenderingContextWrappingImplementation.prototype;
function CanvasRenderingContextWrappingImplementation() {}
// ********** Code for CanvasRenderingContext2DWrappingImplementation **************
$inherits(CanvasRenderingContext2DWrappingImplementation, CanvasRenderingContextWrappingImplementation);
CanvasRenderingContext2DWrappingImplementation._wrap$ctor = function(ptr) {
  CanvasRenderingContextWrappingImplementation._wrap$ctor.call(this, ptr);
}
CanvasRenderingContext2DWrappingImplementation._wrap$ctor.prototype = CanvasRenderingContext2DWrappingImplementation.prototype;
function CanvasRenderingContext2DWrappingImplementation() {}
// ********** Code for ClientRectListWrappingImplementation **************
$inherits(ClientRectListWrappingImplementation, DOMWrapperBase);
ClientRectListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ClientRectListWrappingImplementation._wrap$ctor.prototype = ClientRectListWrappingImplementation.prototype;
function ClientRectListWrappingImplementation() {}
ClientRectListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
ClientRectListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapClientRect(this._ptr.item(index));
}
// ********** Code for ClientRectWrappingImplementation **************
$inherits(ClientRectWrappingImplementation, DOMWrapperBase);
ClientRectWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ClientRectWrappingImplementation._wrap$ctor.prototype = ClientRectWrappingImplementation.prototype;
function ClientRectWrappingImplementation() {}
// ********** Code for ClipboardWrappingImplementation **************
$inherits(ClipboardWrappingImplementation, DOMWrapperBase);
ClipboardWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ClipboardWrappingImplementation._wrap$ctor.prototype = ClipboardWrappingImplementation.prototype;
function ClipboardWrappingImplementation() {}
// ********** Code for CommentWrappingImplementation **************
$inherits(CommentWrappingImplementation, CharacterDataWrappingImplementation);
CommentWrappingImplementation._wrap$ctor = function(ptr) {
  CharacterDataWrappingImplementation._wrap$ctor.call(this, ptr);
}
CommentWrappingImplementation._wrap$ctor.prototype = CommentWrappingImplementation.prototype;
function CommentWrappingImplementation() {}
// ********** Code for ConsoleWrappingImplementation **************
$inherits(ConsoleWrappingImplementation, DOMWrapperBase);
ConsoleWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ConsoleWrappingImplementation._wrap$ctor.prototype = ConsoleWrappingImplementation.prototype;
function ConsoleWrappingImplementation() {}
// ********** Code for ConvolverNodeWrappingImplementation **************
$inherits(ConvolverNodeWrappingImplementation, AudioNodeWrappingImplementation);
ConvolverNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ConvolverNodeWrappingImplementation._wrap$ctor.prototype = ConvolverNodeWrappingImplementation.prototype;
function ConvolverNodeWrappingImplementation() {}
// ********** Code for CoordinatesWrappingImplementation **************
$inherits(CoordinatesWrappingImplementation, DOMWrapperBase);
CoordinatesWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CoordinatesWrappingImplementation._wrap$ctor.prototype = CoordinatesWrappingImplementation.prototype;
function CoordinatesWrappingImplementation() {}
// ********** Code for CounterWrappingImplementation **************
$inherits(CounterWrappingImplementation, DOMWrapperBase);
CounterWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CounterWrappingImplementation._wrap$ctor.prototype = CounterWrappingImplementation.prototype;
function CounterWrappingImplementation() {}
// ********** Code for CryptoWrappingImplementation **************
$inherits(CryptoWrappingImplementation, DOMWrapperBase);
CryptoWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CryptoWrappingImplementation._wrap$ctor.prototype = CryptoWrappingImplementation.prototype;
function CryptoWrappingImplementation() {}
// ********** Code for DListElementWrappingImplementation **************
$inherits(DListElementWrappingImplementation, ElementWrappingImplementation);
DListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DListElementWrappingImplementation._wrap$ctor.prototype = DListElementWrappingImplementation.prototype;
function DListElementWrappingImplementation() {}
DListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DOMExceptionWrappingImplementation **************
$inherits(DOMExceptionWrappingImplementation, DOMWrapperBase);
DOMExceptionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMExceptionWrappingImplementation._wrap$ctor.prototype = DOMExceptionWrappingImplementation.prototype;
function DOMExceptionWrappingImplementation() {}
DOMExceptionWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for DOMFileSystemSyncWrappingImplementation **************
$inherits(DOMFileSystemSyncWrappingImplementation, DOMWrapperBase);
DOMFileSystemSyncWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMFileSystemSyncWrappingImplementation._wrap$ctor.prototype = DOMFileSystemSyncWrappingImplementation.prototype;
function DOMFileSystemSyncWrappingImplementation() {}
// ********** Code for DOMFileSystemWrappingImplementation **************
$inherits(DOMFileSystemWrappingImplementation, DOMWrapperBase);
DOMFileSystemWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMFileSystemWrappingImplementation._wrap$ctor.prototype = DOMFileSystemWrappingImplementation.prototype;
function DOMFileSystemWrappingImplementation() {}
// ********** Code for DOMFormDataWrappingImplementation **************
$inherits(DOMFormDataWrappingImplementation, DOMWrapperBase);
DOMFormDataWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMFormDataWrappingImplementation._wrap$ctor.prototype = DOMFormDataWrappingImplementation.prototype;
function DOMFormDataWrappingImplementation() {}
// ********** Code for DOMMimeTypeArrayWrappingImplementation **************
$inherits(DOMMimeTypeArrayWrappingImplementation, DOMWrapperBase);
DOMMimeTypeArrayWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMMimeTypeArrayWrappingImplementation._wrap$ctor.prototype = DOMMimeTypeArrayWrappingImplementation.prototype;
function DOMMimeTypeArrayWrappingImplementation() {}
DOMMimeTypeArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
DOMMimeTypeArrayWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapDOMMimeType(this._ptr.item(index));
}
// ********** Code for DOMMimeTypeWrappingImplementation **************
$inherits(DOMMimeTypeWrappingImplementation, DOMWrapperBase);
DOMMimeTypeWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMMimeTypeWrappingImplementation._wrap$ctor.prototype = DOMMimeTypeWrappingImplementation.prototype;
function DOMMimeTypeWrappingImplementation() {}
DOMMimeTypeWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for DOMParserWrappingImplementation **************
$inherits(DOMParserWrappingImplementation, DOMWrapperBase);
DOMParserWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMParserWrappingImplementation._wrap$ctor.prototype = DOMParserWrappingImplementation.prototype;
function DOMParserWrappingImplementation() {}
// ********** Code for DOMPluginArrayWrappingImplementation **************
$inherits(DOMPluginArrayWrappingImplementation, DOMWrapperBase);
DOMPluginArrayWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMPluginArrayWrappingImplementation._wrap$ctor.prototype = DOMPluginArrayWrappingImplementation.prototype;
function DOMPluginArrayWrappingImplementation() {}
DOMPluginArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
DOMPluginArrayWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapDOMPlugin(this._ptr.item(index));
}
// ********** Code for DOMPluginWrappingImplementation **************
$inherits(DOMPluginWrappingImplementation, DOMWrapperBase);
DOMPluginWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMPluginWrappingImplementation._wrap$ctor.prototype = DOMPluginWrappingImplementation.prototype;
function DOMPluginWrappingImplementation() {}
DOMPluginWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
DOMPluginWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapDOMMimeType(this._ptr.item(index));
}
// ********** Code for DOMSelectionWrappingImplementation **************
$inherits(DOMSelectionWrappingImplementation, DOMWrapperBase);
DOMSelectionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMSelectionWrappingImplementation._wrap$ctor.prototype = DOMSelectionWrappingImplementation.prototype;
function DOMSelectionWrappingImplementation() {}
DOMSelectionWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
DOMSelectionWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for DOMTokenListWrappingImplementation **************
$inherits(DOMTokenListWrappingImplementation, DOMWrapperBase);
DOMTokenListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMTokenListWrappingImplementation._wrap$ctor.prototype = DOMTokenListWrappingImplementation.prototype;
function DOMTokenListWrappingImplementation() {}
DOMTokenListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
DOMTokenListWrappingImplementation.prototype.add = function(token) {
  this._ptr.add$1(token);
  return;
}
DOMTokenListWrappingImplementation.prototype.item = function(index) {
  return this._ptr.item(index);
}
DOMTokenListWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
DOMTokenListWrappingImplementation.prototype.add$1 = DOMTokenListWrappingImplementation.prototype.add;
// ********** Code for DOMSettableTokenListWrappingImplementation **************
$inherits(DOMSettableTokenListWrappingImplementation, DOMTokenListWrappingImplementation);
DOMSettableTokenListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMTokenListWrappingImplementation._wrap$ctor.call(this, ptr);
}
DOMSettableTokenListWrappingImplementation._wrap$ctor.prototype = DOMSettableTokenListWrappingImplementation.prototype;
function DOMSettableTokenListWrappingImplementation() {}
// ********** Code for DOMURLWrappingImplementation **************
$inherits(DOMURLWrappingImplementation, DOMWrapperBase);
DOMURLWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DOMURLWrappingImplementation._wrap$ctor.prototype = DOMURLWrappingImplementation.prototype;
function DOMURLWrappingImplementation() {}
// ********** Code for DataListElementWrappingImplementation **************
$inherits(DataListElementWrappingImplementation, ElementWrappingImplementation);
DataListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DataListElementWrappingImplementation._wrap$ctor.prototype = DataListElementWrappingImplementation.prototype;
function DataListElementWrappingImplementation() {}
DataListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DataTransferItemListWrappingImplementation **************
$inherits(DataTransferItemListWrappingImplementation, DOMWrapperBase);
DataTransferItemListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DataTransferItemListWrappingImplementation._wrap$ctor.prototype = DataTransferItemListWrappingImplementation.prototype;
function DataTransferItemListWrappingImplementation() {}
DataTransferItemListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
DataTransferItemListWrappingImplementation.prototype.add = function(data, type) {
  this._ptr.add$2(data, type);
  return;
}
DataTransferItemListWrappingImplementation.prototype.clear = function() {
  this._ptr.clear$0();
  return;
}
DataTransferItemListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapDataTransferItem(this._ptr.item(index));
}
DataTransferItemListWrappingImplementation.prototype.add$2 = DataTransferItemListWrappingImplementation.prototype.add;
DataTransferItemListWrappingImplementation.prototype.clear$0 = DataTransferItemListWrappingImplementation.prototype.clear;
// ********** Code for DataTransferItemWrappingImplementation **************
$inherits(DataTransferItemWrappingImplementation, DOMWrapperBase);
DataTransferItemWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DataTransferItemWrappingImplementation._wrap$ctor.prototype = DataTransferItemWrappingImplementation.prototype;
function DataTransferItemWrappingImplementation() {}
DataTransferItemWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for DataViewWrappingImplementation **************
$inherits(DataViewWrappingImplementation, ArrayBufferViewWrappingImplementation);
DataViewWrappingImplementation._wrap$ctor = function(ptr) {
  ArrayBufferViewWrappingImplementation._wrap$ctor.call(this, ptr);
}
DataViewWrappingImplementation._wrap$ctor.prototype = DataViewWrappingImplementation.prototype;
function DataViewWrappingImplementation() {}
// ********** Code for DelayNodeWrappingImplementation **************
$inherits(DelayNodeWrappingImplementation, AudioNodeWrappingImplementation);
DelayNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
DelayNodeWrappingImplementation._wrap$ctor.prototype = DelayNodeWrappingImplementation.prototype;
function DelayNodeWrappingImplementation() {}
// ********** Code for DetailsElementWrappingImplementation **************
$inherits(DetailsElementWrappingImplementation, ElementWrappingImplementation);
DetailsElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DetailsElementWrappingImplementation._wrap$ctor.prototype = DetailsElementWrappingImplementation.prototype;
function DetailsElementWrappingImplementation() {}
DetailsElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for EntrySyncWrappingImplementation **************
$inherits(EntrySyncWrappingImplementation, DOMWrapperBase);
EntrySyncWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EntrySyncWrappingImplementation._wrap$ctor.prototype = EntrySyncWrappingImplementation.prototype;
function EntrySyncWrappingImplementation() {}
// ********** Code for DirectoryEntrySyncWrappingImplementation **************
$inherits(DirectoryEntrySyncWrappingImplementation, EntrySyncWrappingImplementation);
DirectoryEntrySyncWrappingImplementation._wrap$ctor = function(ptr) {
  EntrySyncWrappingImplementation._wrap$ctor.call(this, ptr);
}
DirectoryEntrySyncWrappingImplementation._wrap$ctor.prototype = DirectoryEntrySyncWrappingImplementation.prototype;
function DirectoryEntrySyncWrappingImplementation() {}
// ********** Code for EntryWrappingImplementation **************
$inherits(EntryWrappingImplementation, DOMWrapperBase);
EntryWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EntryWrappingImplementation._wrap$ctor.prototype = EntryWrappingImplementation.prototype;
function EntryWrappingImplementation() {}
// ********** Code for DirectoryEntryWrappingImplementation **************
$inherits(DirectoryEntryWrappingImplementation, EntryWrappingImplementation);
DirectoryEntryWrappingImplementation._wrap$ctor = function(ptr) {
  EntryWrappingImplementation._wrap$ctor.call(this, ptr);
}
DirectoryEntryWrappingImplementation._wrap$ctor.prototype = DirectoryEntryWrappingImplementation.prototype;
function DirectoryEntryWrappingImplementation() {}
// ********** Code for DirectoryReaderSyncWrappingImplementation **************
$inherits(DirectoryReaderSyncWrappingImplementation, DOMWrapperBase);
DirectoryReaderSyncWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DirectoryReaderSyncWrappingImplementation._wrap$ctor.prototype = DirectoryReaderSyncWrappingImplementation.prototype;
function DirectoryReaderSyncWrappingImplementation() {}
// ********** Code for DirectoryReaderWrappingImplementation **************
$inherits(DirectoryReaderWrappingImplementation, DOMWrapperBase);
DirectoryReaderWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
DirectoryReaderWrappingImplementation._wrap$ctor.prototype = DirectoryReaderWrappingImplementation.prototype;
function DirectoryReaderWrappingImplementation() {}
// ********** Code for DivElementWrappingImplementation **************
$inherits(DivElementWrappingImplementation, ElementWrappingImplementation);
DivElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
DivElementWrappingImplementation._wrap$ctor.prototype = DivElementWrappingImplementation.prototype;
function DivElementWrappingImplementation() {}
DivElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DynamicsCompressorNodeWrappingImplementation **************
$inherits(DynamicsCompressorNodeWrappingImplementation, AudioNodeWrappingImplementation);
DynamicsCompressorNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
DynamicsCompressorNodeWrappingImplementation._wrap$ctor.prototype = DynamicsCompressorNodeWrappingImplementation.prototype;
function DynamicsCompressorNodeWrappingImplementation() {}
// ********** Code for ElementTimeControlWrappingImplementation **************
$inherits(ElementTimeControlWrappingImplementation, DOMWrapperBase);
ElementTimeControlWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ElementTimeControlWrappingImplementation._wrap$ctor.prototype = ElementTimeControlWrappingImplementation.prototype;
function ElementTimeControlWrappingImplementation() {}
// ********** Code for EmbedElementWrappingImplementation **************
$inherits(EmbedElementWrappingImplementation, ElementWrappingImplementation);
EmbedElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
EmbedElementWrappingImplementation._wrap$ctor.prototype = EmbedElementWrappingImplementation.prototype;
function EmbedElementWrappingImplementation() {}
EmbedElementWrappingImplementation.prototype.is$html_Element = function(){return true};
EmbedElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for EntityReferenceWrappingImplementation **************
$inherits(EntityReferenceWrappingImplementation, NodeWrappingImplementation);
EntityReferenceWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
EntityReferenceWrappingImplementation._wrap$ctor.prototype = EntityReferenceWrappingImplementation.prototype;
function EntityReferenceWrappingImplementation() {}
// ********** Code for EntityWrappingImplementation **************
$inherits(EntityWrappingImplementation, NodeWrappingImplementation);
EntityWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
EntityWrappingImplementation._wrap$ctor.prototype = EntityWrappingImplementation.prototype;
function EntityWrappingImplementation() {}
// ********** Code for EntryArraySyncWrappingImplementation **************
$inherits(EntryArraySyncWrappingImplementation, DOMWrapperBase);
EntryArraySyncWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EntryArraySyncWrappingImplementation._wrap$ctor.prototype = EntryArraySyncWrappingImplementation.prototype;
function EntryArraySyncWrappingImplementation() {}
EntryArraySyncWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
EntryArraySyncWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapEntrySync(this._ptr.item(index));
}
// ********** Code for EntryArrayWrappingImplementation **************
$inherits(EntryArrayWrappingImplementation, DOMWrapperBase);
EntryArrayWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EntryArrayWrappingImplementation._wrap$ctor.prototype = EntryArrayWrappingImplementation.prototype;
function EntryArrayWrappingImplementation() {}
EntryArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
EntryArrayWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapEntry(this._ptr.item(index));
}
// ********** Code for EventExceptionWrappingImplementation **************
$inherits(EventExceptionWrappingImplementation, DOMWrapperBase);
EventExceptionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
EventExceptionWrappingImplementation._wrap$ctor.prototype = EventExceptionWrappingImplementation.prototype;
function EventExceptionWrappingImplementation() {}
EventExceptionWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for FieldSetElementWrappingImplementation **************
$inherits(FieldSetElementWrappingImplementation, ElementWrappingImplementation);
FieldSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FieldSetElementWrappingImplementation._wrap$ctor.prototype = FieldSetElementWrappingImplementation.prototype;
function FieldSetElementWrappingImplementation() {}
FieldSetElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for FileEntrySyncWrappingImplementation **************
$inherits(FileEntrySyncWrappingImplementation, EntrySyncWrappingImplementation);
FileEntrySyncWrappingImplementation._wrap$ctor = function(ptr) {
  EntrySyncWrappingImplementation._wrap$ctor.call(this, ptr);
}
FileEntrySyncWrappingImplementation._wrap$ctor.prototype = FileEntrySyncWrappingImplementation.prototype;
function FileEntrySyncWrappingImplementation() {}
// ********** Code for FileEntryWrappingImplementation **************
$inherits(FileEntryWrappingImplementation, EntryWrappingImplementation);
FileEntryWrappingImplementation._wrap$ctor = function(ptr) {
  EntryWrappingImplementation._wrap$ctor.call(this, ptr);
}
FileEntryWrappingImplementation._wrap$ctor.prototype = FileEntryWrappingImplementation.prototype;
function FileEntryWrappingImplementation() {}
// ********** Code for FileErrorWrappingImplementation **************
$inherits(FileErrorWrappingImplementation, DOMWrapperBase);
FileErrorWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
FileErrorWrappingImplementation._wrap$ctor.prototype = FileErrorWrappingImplementation.prototype;
function FileErrorWrappingImplementation() {}
// ********** Code for FileExceptionWrappingImplementation **************
$inherits(FileExceptionWrappingImplementation, DOMWrapperBase);
FileExceptionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
FileExceptionWrappingImplementation._wrap$ctor.prototype = FileExceptionWrappingImplementation.prototype;
function FileExceptionWrappingImplementation() {}
FileExceptionWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for FileListWrappingImplementation **************
$inherits(FileListWrappingImplementation, DOMWrapperBase);
FileListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
FileListWrappingImplementation._wrap$ctor.prototype = FileListWrappingImplementation.prototype;
function FileListWrappingImplementation() {}
FileListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
FileListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapFile(this._ptr.item(index));
}
// ********** Code for FileReaderSyncWrappingImplementation **************
$inherits(FileReaderSyncWrappingImplementation, DOMWrapperBase);
FileReaderSyncWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
FileReaderSyncWrappingImplementation._wrap$ctor.prototype = FileReaderSyncWrappingImplementation.prototype;
function FileReaderSyncWrappingImplementation() {}
// ********** Code for FileReaderWrappingImplementation **************
$inherits(FileReaderWrappingImplementation, DOMWrapperBase);
FileReaderWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
FileReaderWrappingImplementation._wrap$ctor.prototype = FileReaderWrappingImplementation.prototype;
function FileReaderWrappingImplementation() {}
// ********** Code for FileWrappingImplementation **************
$inherits(FileWrappingImplementation, BlobWrappingImplementation);
FileWrappingImplementation._wrap$ctor = function(ptr) {
  BlobWrappingImplementation._wrap$ctor.call(this, ptr);
}
FileWrappingImplementation._wrap$ctor.prototype = FileWrappingImplementation.prototype;
function FileWrappingImplementation() {}
// ********** Code for FileWriterSyncWrappingImplementation **************
$inherits(FileWriterSyncWrappingImplementation, DOMWrapperBase);
FileWriterSyncWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
FileWriterSyncWrappingImplementation._wrap$ctor.prototype = FileWriterSyncWrappingImplementation.prototype;
function FileWriterSyncWrappingImplementation() {}
FileWriterSyncWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for FileWriterWrappingImplementation **************
$inherits(FileWriterWrappingImplementation, DOMWrapperBase);
FileWriterWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
FileWriterWrappingImplementation._wrap$ctor.prototype = FileWriterWrappingImplementation.prototype;
function FileWriterWrappingImplementation() {}
FileWriterWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for FlagsWrappingImplementation **************
$inherits(FlagsWrappingImplementation, DOMWrapperBase);
FlagsWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
FlagsWrappingImplementation._wrap$ctor.prototype = FlagsWrappingImplementation.prototype;
function FlagsWrappingImplementation() {}
// ********** Code for FontElementWrappingImplementation **************
$inherits(FontElementWrappingImplementation, ElementWrappingImplementation);
FontElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FontElementWrappingImplementation._wrap$ctor.prototype = FontElementWrappingImplementation.prototype;
function FontElementWrappingImplementation() {}
FontElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for FormElementWrappingImplementation **************
$inherits(FormElementWrappingImplementation, ElementWrappingImplementation);
FormElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
FormElementWrappingImplementation._wrap$ctor.prototype = FormElementWrappingImplementation.prototype;
function FormElementWrappingImplementation() {}
FormElementWrappingImplementation.prototype.is$html_Element = function(){return true};
FormElementWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for GeolocationWrappingImplementation **************
$inherits(GeolocationWrappingImplementation, DOMWrapperBase);
GeolocationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
GeolocationWrappingImplementation._wrap$ctor.prototype = GeolocationWrappingImplementation.prototype;
function GeolocationWrappingImplementation() {}
// ********** Code for GeopositionWrappingImplementation **************
$inherits(GeopositionWrappingImplementation, DOMWrapperBase);
GeopositionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
GeopositionWrappingImplementation._wrap$ctor.prototype = GeopositionWrappingImplementation.prototype;
function GeopositionWrappingImplementation() {}
// ********** Code for HRElementWrappingImplementation **************
$inherits(HRElementWrappingImplementation, ElementWrappingImplementation);
HRElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HRElementWrappingImplementation._wrap$ctor.prototype = HRElementWrappingImplementation.prototype;
function HRElementWrappingImplementation() {}
HRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for HTMLAllCollectionWrappingImplementation **************
$inherits(HTMLAllCollectionWrappingImplementation, DOMWrapperBase);
HTMLAllCollectionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
HTMLAllCollectionWrappingImplementation._wrap$ctor.prototype = HTMLAllCollectionWrappingImplementation.prototype;
function HTMLAllCollectionWrappingImplementation() {}
HTMLAllCollectionWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
HTMLAllCollectionWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapNode(this._ptr.item(index));
}
// ********** Code for HeadElementWrappingImplementation **************
$inherits(HeadElementWrappingImplementation, ElementWrappingImplementation);
HeadElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadElementWrappingImplementation._wrap$ctor.prototype = HeadElementWrappingImplementation.prototype;
function HeadElementWrappingImplementation() {}
HeadElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for HeadingElementWrappingImplementation **************
$inherits(HeadingElementWrappingImplementation, ElementWrappingImplementation);
HeadingElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
HeadingElementWrappingImplementation._wrap$ctor.prototype = HeadingElementWrappingImplementation.prototype;
function HeadingElementWrappingImplementation() {}
HeadingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for HighPass2FilterNodeWrappingImplementation **************
$inherits(HighPass2FilterNodeWrappingImplementation, AudioNodeWrappingImplementation);
HighPass2FilterNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
HighPass2FilterNodeWrappingImplementation._wrap$ctor.prototype = HighPass2FilterNodeWrappingImplementation.prototype;
function HighPass2FilterNodeWrappingImplementation() {}
// ********** Code for HistoryWrappingImplementation **************
$inherits(HistoryWrappingImplementation, DOMWrapperBase);
HistoryWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
HistoryWrappingImplementation._wrap$ctor.prototype = HistoryWrappingImplementation.prototype;
function HistoryWrappingImplementation() {}
HistoryWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for IDBAnyWrappingImplementation **************
$inherits(IDBAnyWrappingImplementation, DOMWrapperBase);
IDBAnyWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBAnyWrappingImplementation._wrap$ctor.prototype = IDBAnyWrappingImplementation.prototype;
function IDBAnyWrappingImplementation() {}
// ********** Code for IDBCursorWrappingImplementation **************
$inherits(IDBCursorWrappingImplementation, DOMWrapperBase);
IDBCursorWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBCursorWrappingImplementation._wrap$ctor.prototype = IDBCursorWrappingImplementation.prototype;
function IDBCursorWrappingImplementation() {}
// ********** Code for IDBCursorWithValueWrappingImplementation **************
$inherits(IDBCursorWithValueWrappingImplementation, IDBCursorWrappingImplementation);
IDBCursorWithValueWrappingImplementation._wrap$ctor = function(ptr) {
  IDBCursorWrappingImplementation._wrap$ctor.call(this, ptr);
}
IDBCursorWithValueWrappingImplementation._wrap$ctor.prototype = IDBCursorWithValueWrappingImplementation.prototype;
function IDBCursorWithValueWrappingImplementation() {}
// ********** Code for IDBDatabaseErrorWrappingImplementation **************
$inherits(IDBDatabaseErrorWrappingImplementation, DOMWrapperBase);
IDBDatabaseErrorWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBDatabaseErrorWrappingImplementation._wrap$ctor.prototype = IDBDatabaseErrorWrappingImplementation.prototype;
function IDBDatabaseErrorWrappingImplementation() {}
// ********** Code for IDBDatabaseExceptionWrappingImplementation **************
$inherits(IDBDatabaseExceptionWrappingImplementation, DOMWrapperBase);
IDBDatabaseExceptionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBDatabaseExceptionWrappingImplementation._wrap$ctor.prototype = IDBDatabaseExceptionWrappingImplementation.prototype;
function IDBDatabaseExceptionWrappingImplementation() {}
IDBDatabaseExceptionWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for IDBDatabaseWrappingImplementation **************
$inherits(IDBDatabaseWrappingImplementation, DOMWrapperBase);
IDBDatabaseWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBDatabaseWrappingImplementation._wrap$ctor.prototype = IDBDatabaseWrappingImplementation.prototype;
function IDBDatabaseWrappingImplementation() {}
// ********** Code for IDBFactoryWrappingImplementation **************
$inherits(IDBFactoryWrappingImplementation, DOMWrapperBase);
IDBFactoryWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBFactoryWrappingImplementation._wrap$ctor.prototype = IDBFactoryWrappingImplementation.prototype;
function IDBFactoryWrappingImplementation() {}
// ********** Code for IDBIndexWrappingImplementation **************
$inherits(IDBIndexWrappingImplementation, DOMWrapperBase);
IDBIndexWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBIndexWrappingImplementation._wrap$ctor.prototype = IDBIndexWrappingImplementation.prototype;
function IDBIndexWrappingImplementation() {}
// ********** Code for IDBKeyRangeWrappingImplementation **************
$inherits(IDBKeyRangeWrappingImplementation, DOMWrapperBase);
IDBKeyRangeWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBKeyRangeWrappingImplementation._wrap$ctor.prototype = IDBKeyRangeWrappingImplementation.prototype;
function IDBKeyRangeWrappingImplementation() {}
// ********** Code for IDBKeyWrappingImplementation **************
$inherits(IDBKeyWrappingImplementation, DOMWrapperBase);
IDBKeyWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBKeyWrappingImplementation._wrap$ctor.prototype = IDBKeyWrappingImplementation.prototype;
function IDBKeyWrappingImplementation() {}
// ********** Code for IDBObjectStoreWrappingImplementation **************
$inherits(IDBObjectStoreWrappingImplementation, DOMWrapperBase);
IDBObjectStoreWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBObjectStoreWrappingImplementation._wrap$ctor.prototype = IDBObjectStoreWrappingImplementation.prototype;
function IDBObjectStoreWrappingImplementation() {}
IDBObjectStoreWrappingImplementation.prototype.add = function(value, key) {
  if (null == key) {
    return LevelDom.wrapIDBRequest(this._ptr.add$1(value));
  }
  else {
    return LevelDom.wrapIDBRequest(this._ptr.add$2(value, LevelDom.unwrap(key)));
  }
}
IDBObjectStoreWrappingImplementation.prototype.clear = function() {
  return LevelDom.wrapIDBRequest(this._ptr.clear$0());
}
IDBObjectStoreWrappingImplementation.prototype.add$1 = IDBObjectStoreWrappingImplementation.prototype.add;
IDBObjectStoreWrappingImplementation.prototype.add$2 = IDBObjectStoreWrappingImplementation.prototype.add;
IDBObjectStoreWrappingImplementation.prototype.clear$0 = IDBObjectStoreWrappingImplementation.prototype.clear;
// ********** Code for IDBRequestWrappingImplementation **************
$inherits(IDBRequestWrappingImplementation, DOMWrapperBase);
IDBRequestWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBRequestWrappingImplementation._wrap$ctor.prototype = IDBRequestWrappingImplementation.prototype;
function IDBRequestWrappingImplementation() {}
// ********** Code for IDBTransactionWrappingImplementation **************
$inherits(IDBTransactionWrappingImplementation, DOMWrapperBase);
IDBTransactionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
IDBTransactionWrappingImplementation._wrap$ctor.prototype = IDBTransactionWrappingImplementation.prototype;
function IDBTransactionWrappingImplementation() {}
// ********** Code for IDBVersionChangeEventWrappingImplementation **************
$inherits(IDBVersionChangeEventWrappingImplementation, EventWrappingImplementation);
IDBVersionChangeEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
IDBVersionChangeEventWrappingImplementation._wrap$ctor.prototype = IDBVersionChangeEventWrappingImplementation.prototype;
function IDBVersionChangeEventWrappingImplementation() {}
// ********** Code for IDBVersionChangeRequestWrappingImplementation **************
$inherits(IDBVersionChangeRequestWrappingImplementation, IDBRequestWrappingImplementation);
IDBVersionChangeRequestWrappingImplementation._wrap$ctor = function(ptr) {
  IDBRequestWrappingImplementation._wrap$ctor.call(this, ptr);
}
IDBVersionChangeRequestWrappingImplementation._wrap$ctor.prototype = IDBVersionChangeRequestWrappingImplementation.prototype;
function IDBVersionChangeRequestWrappingImplementation() {}
// ********** Code for IFrameElementWrappingImplementation **************
$inherits(IFrameElementWrappingImplementation, ElementWrappingImplementation);
IFrameElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
IFrameElementWrappingImplementation._wrap$ctor.prototype = IFrameElementWrappingImplementation.prototype;
function IFrameElementWrappingImplementation() {}
IFrameElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ImageDataWrappingImplementation **************
$inherits(ImageDataWrappingImplementation, DOMWrapperBase);
ImageDataWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ImageDataWrappingImplementation._wrap$ctor.prototype = ImageDataWrappingImplementation.prototype;
function ImageDataWrappingImplementation() {}
// ********** Code for ImageElementWrappingImplementation **************
$inherits(ImageElementWrappingImplementation, ElementWrappingImplementation);
ImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ImageElementWrappingImplementation._wrap$ctor.prototype = ImageElementWrappingImplementation.prototype;
function ImageElementWrappingImplementation() {}
ImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for InputElementWrappingImplementation **************
$inherits(InputElementWrappingImplementation, ElementWrappingImplementation);
InputElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
InputElementWrappingImplementation._wrap$ctor.prototype = InputElementWrappingImplementation.prototype;
function InputElementWrappingImplementation() {}
InputElementWrappingImplementation.prototype.is$html_Element = function(){return true};
InputElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for JavaScriptAudioNodeWrappingImplementation **************
$inherits(JavaScriptAudioNodeWrappingImplementation, AudioNodeWrappingImplementation);
JavaScriptAudioNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
JavaScriptAudioNodeWrappingImplementation._wrap$ctor.prototype = JavaScriptAudioNodeWrappingImplementation.prototype;
function JavaScriptAudioNodeWrappingImplementation() {}
// ********** Code for KeygenElementWrappingImplementation **************
$inherits(KeygenElementWrappingImplementation, ElementWrappingImplementation);
KeygenElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
KeygenElementWrappingImplementation._wrap$ctor.prototype = KeygenElementWrappingImplementation.prototype;
function KeygenElementWrappingImplementation() {}
KeygenElementWrappingImplementation.prototype.is$html_Element = function(){return true};
KeygenElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for LIElementWrappingImplementation **************
$inherits(LIElementWrappingImplementation, ElementWrappingImplementation);
LIElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LIElementWrappingImplementation._wrap$ctor.prototype = LIElementWrappingImplementation.prototype;
function LIElementWrappingImplementation() {}
LIElementWrappingImplementation.prototype.is$html_Element = function(){return true};
LIElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for LabelElementWrappingImplementation **************
$inherits(LabelElementWrappingImplementation, ElementWrappingImplementation);
LabelElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LabelElementWrappingImplementation._wrap$ctor.prototype = LabelElementWrappingImplementation.prototype;
function LabelElementWrappingImplementation() {}
LabelElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for LegendElementWrappingImplementation **************
$inherits(LegendElementWrappingImplementation, ElementWrappingImplementation);
LegendElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LegendElementWrappingImplementation._wrap$ctor.prototype = LegendElementWrappingImplementation.prototype;
function LegendElementWrappingImplementation() {}
LegendElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for LinkElementWrappingImplementation **************
$inherits(LinkElementWrappingImplementation, ElementWrappingImplementation);
LinkElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
LinkElementWrappingImplementation._wrap$ctor.prototype = LinkElementWrappingImplementation.prototype;
function LinkElementWrappingImplementation() {}
LinkElementWrappingImplementation.prototype.is$html_Element = function(){return true};
LinkElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for LocationWrappingImplementation **************
$inherits(LocationWrappingImplementation, DOMWrapperBase);
LocationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
LocationWrappingImplementation._wrap$ctor.prototype = LocationWrappingImplementation.prototype;
function LocationWrappingImplementation() {}
LocationWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for LowPass2FilterNodeWrappingImplementation **************
$inherits(LowPass2FilterNodeWrappingImplementation, AudioNodeWrappingImplementation);
LowPass2FilterNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
LowPass2FilterNodeWrappingImplementation._wrap$ctor.prototype = LowPass2FilterNodeWrappingImplementation.prototype;
function LowPass2FilterNodeWrappingImplementation() {}
// ********** Code for MapElementWrappingImplementation **************
$inherits(MapElementWrappingImplementation, ElementWrappingImplementation);
MapElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MapElementWrappingImplementation._wrap$ctor.prototype = MapElementWrappingImplementation.prototype;
function MapElementWrappingImplementation() {}
MapElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MarqueeElementWrappingImplementation **************
$inherits(MarqueeElementWrappingImplementation, ElementWrappingImplementation);
MarqueeElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MarqueeElementWrappingImplementation._wrap$ctor.prototype = MarqueeElementWrappingImplementation.prototype;
function MarqueeElementWrappingImplementation() {}
MarqueeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MediaElementAudioSourceNodeWrappingImplementation **************
$inherits(MediaElementAudioSourceNodeWrappingImplementation, AudioSourceNodeWrappingImplementation);
MediaElementAudioSourceNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioSourceNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
MediaElementAudioSourceNodeWrappingImplementation._wrap$ctor.prototype = MediaElementAudioSourceNodeWrappingImplementation.prototype;
function MediaElementAudioSourceNodeWrappingImplementation() {}
// ********** Code for MediaErrorWrappingImplementation **************
$inherits(MediaErrorWrappingImplementation, DOMWrapperBase);
MediaErrorWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
MediaErrorWrappingImplementation._wrap$ctor.prototype = MediaErrorWrappingImplementation.prototype;
function MediaErrorWrappingImplementation() {}
// ********** Code for MediaListWrappingImplementation **************
$inherits(MediaListWrappingImplementation, DOMWrapperBase);
MediaListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
MediaListWrappingImplementation._wrap$ctor.prototype = MediaListWrappingImplementation.prototype;
function MediaListWrappingImplementation() {}
MediaListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
MediaListWrappingImplementation.prototype.$index = function(index) {
  return this._ptr.$index(index);
}
MediaListWrappingImplementation.prototype.$setindex = function(index, value) {
  this._ptr.$setindex(index, value);
}
MediaListWrappingImplementation.prototype.add = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
MediaListWrappingImplementation.prototype.addAll = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
MediaListWrappingImplementation.prototype.clear = function() {
  $throw(new UnsupportedOperationException("Cannot clear immutable List."));
}
MediaListWrappingImplementation.prototype.forEach = function(f) {
  _Collections.forEach(this, f);
}
MediaListWrappingImplementation.prototype.filter = function(f) {
  return _Collections.filter(this, new Array(), f);
}
MediaListWrappingImplementation.prototype.iterator = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
MediaListWrappingImplementation.prototype.item = function(index) {
  return this._ptr.item(index);
}
MediaListWrappingImplementation.prototype.add$1 = MediaListWrappingImplementation.prototype.add;
MediaListWrappingImplementation.prototype.clear$0 = MediaListWrappingImplementation.prototype.clear;
MediaListWrappingImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
MediaListWrappingImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for MediaQueryListListenerWrappingImplementation **************
$inherits(MediaQueryListListenerWrappingImplementation, DOMWrapperBase);
MediaQueryListListenerWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
MediaQueryListListenerWrappingImplementation._wrap$ctor.prototype = MediaQueryListListenerWrappingImplementation.prototype;
function MediaQueryListListenerWrappingImplementation() {}
// ********** Code for MediaQueryListWrappingImplementation **************
$inherits(MediaQueryListWrappingImplementation, DOMWrapperBase);
MediaQueryListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
MediaQueryListWrappingImplementation._wrap$ctor.prototype = MediaQueryListWrappingImplementation.prototype;
function MediaQueryListWrappingImplementation() {}
// ********** Code for MenuElementWrappingImplementation **************
$inherits(MenuElementWrappingImplementation, ElementWrappingImplementation);
MenuElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MenuElementWrappingImplementation._wrap$ctor.prototype = MenuElementWrappingImplementation.prototype;
function MenuElementWrappingImplementation() {}
MenuElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MessageChannelWrappingImplementation **************
$inherits(MessageChannelWrappingImplementation, DOMWrapperBase);
MessageChannelWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
MessageChannelWrappingImplementation._wrap$ctor.prototype = MessageChannelWrappingImplementation.prototype;
function MessageChannelWrappingImplementation() {}
// ********** Code for MetaElementWrappingImplementation **************
$inherits(MetaElementWrappingImplementation, ElementWrappingImplementation);
MetaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MetaElementWrappingImplementation._wrap$ctor.prototype = MetaElementWrappingImplementation.prototype;
function MetaElementWrappingImplementation() {}
MetaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MetadataWrappingImplementation **************
$inherits(MetadataWrappingImplementation, DOMWrapperBase);
MetadataWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
MetadataWrappingImplementation._wrap$ctor.prototype = MetadataWrappingImplementation.prototype;
function MetadataWrappingImplementation() {}
// ********** Code for MeterElementWrappingImplementation **************
$inherits(MeterElementWrappingImplementation, ElementWrappingImplementation);
MeterElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
MeterElementWrappingImplementation._wrap$ctor.prototype = MeterElementWrappingImplementation.prototype;
function MeterElementWrappingImplementation() {}
MeterElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ModElementWrappingImplementation **************
$inherits(ModElementWrappingImplementation, ElementWrappingImplementation);
ModElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ModElementWrappingImplementation._wrap$ctor.prototype = ModElementWrappingImplementation.prototype;
function ModElementWrappingImplementation() {}
ModElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for MutationCallbackWrappingImplementation **************
$inherits(MutationCallbackWrappingImplementation, DOMWrapperBase);
MutationCallbackWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
MutationCallbackWrappingImplementation._wrap$ctor.prototype = MutationCallbackWrappingImplementation.prototype;
function MutationCallbackWrappingImplementation() {}
// ********** Code for MutationRecordWrappingImplementation **************
$inherits(MutationRecordWrappingImplementation, DOMWrapperBase);
MutationRecordWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
MutationRecordWrappingImplementation._wrap$ctor.prototype = MutationRecordWrappingImplementation.prototype;
function MutationRecordWrappingImplementation() {}
MutationRecordWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for NavigatorUserMediaErrorWrappingImplementation **************
$inherits(NavigatorUserMediaErrorWrappingImplementation, DOMWrapperBase);
NavigatorUserMediaErrorWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
NavigatorUserMediaErrorWrappingImplementation._wrap$ctor.prototype = NavigatorUserMediaErrorWrappingImplementation.prototype;
function NavigatorUserMediaErrorWrappingImplementation() {}
// ********** Code for NavigatorUserMediaSuccessCallbackWrappingImplementation **************
$inherits(NavigatorUserMediaSuccessCallbackWrappingImplementation, DOMWrapperBase);
NavigatorUserMediaSuccessCallbackWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
NavigatorUserMediaSuccessCallbackWrappingImplementation._wrap$ctor.prototype = NavigatorUserMediaSuccessCallbackWrappingImplementation.prototype;
function NavigatorUserMediaSuccessCallbackWrappingImplementation() {}
// ********** Code for NavigatorWrappingImplementation **************
$inherits(NavigatorWrappingImplementation, DOMWrapperBase);
NavigatorWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
NavigatorWrappingImplementation._wrap$ctor.prototype = NavigatorWrappingImplementation.prototype;
function NavigatorWrappingImplementation() {}
// ********** Code for NotationWrappingImplementation **************
$inherits(NotationWrappingImplementation, NodeWrappingImplementation);
NotationWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
NotationWrappingImplementation._wrap$ctor.prototype = NotationWrappingImplementation.prototype;
function NotationWrappingImplementation() {}
// ********** Code for NotificationCenterWrappingImplementation **************
$inherits(NotificationCenterWrappingImplementation, DOMWrapperBase);
NotificationCenterWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
NotificationCenterWrappingImplementation._wrap$ctor.prototype = NotificationCenterWrappingImplementation.prototype;
function NotificationCenterWrappingImplementation() {}
// ********** Code for OESStandardDerivativesWrappingImplementation **************
$inherits(OESStandardDerivativesWrappingImplementation, DOMWrapperBase);
OESStandardDerivativesWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
OESStandardDerivativesWrappingImplementation._wrap$ctor.prototype = OESStandardDerivativesWrappingImplementation.prototype;
function OESStandardDerivativesWrappingImplementation() {}
// ********** Code for OESTextureFloatWrappingImplementation **************
$inherits(OESTextureFloatWrappingImplementation, DOMWrapperBase);
OESTextureFloatWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
OESTextureFloatWrappingImplementation._wrap$ctor.prototype = OESTextureFloatWrappingImplementation.prototype;
function OESTextureFloatWrappingImplementation() {}
// ********** Code for OESVertexArrayObjectWrappingImplementation **************
$inherits(OESVertexArrayObjectWrappingImplementation, DOMWrapperBase);
OESVertexArrayObjectWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
OESVertexArrayObjectWrappingImplementation._wrap$ctor.prototype = OESVertexArrayObjectWrappingImplementation.prototype;
function OESVertexArrayObjectWrappingImplementation() {}
// ********** Code for OListElementWrappingImplementation **************
$inherits(OListElementWrappingImplementation, ElementWrappingImplementation);
OListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OListElementWrappingImplementation._wrap$ctor.prototype = OListElementWrappingImplementation.prototype;
function OListElementWrappingImplementation() {}
OListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
OListElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for OfflineAudioCompletionEventWrappingImplementation **************
$inherits(OfflineAudioCompletionEventWrappingImplementation, EventWrappingImplementation);
OfflineAudioCompletionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
OfflineAudioCompletionEventWrappingImplementation._wrap$ctor.prototype = OfflineAudioCompletionEventWrappingImplementation.prototype;
function OfflineAudioCompletionEventWrappingImplementation() {}
// ********** Code for OperationNotAllowedExceptionWrappingImplementation **************
$inherits(OperationNotAllowedExceptionWrappingImplementation, DOMWrapperBase);
OperationNotAllowedExceptionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
OperationNotAllowedExceptionWrappingImplementation._wrap$ctor.prototype = OperationNotAllowedExceptionWrappingImplementation.prototype;
function OperationNotAllowedExceptionWrappingImplementation() {}
OperationNotAllowedExceptionWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for OptGroupElementWrappingImplementation **************
$inherits(OptGroupElementWrappingImplementation, ElementWrappingImplementation);
OptGroupElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptGroupElementWrappingImplementation._wrap$ctor.prototype = OptGroupElementWrappingImplementation.prototype;
function OptGroupElementWrappingImplementation() {}
OptGroupElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for OptionElementWrappingImplementation **************
$inherits(OptionElementWrappingImplementation, ElementWrappingImplementation);
OptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OptionElementWrappingImplementation._wrap$ctor.prototype = OptionElementWrappingImplementation.prototype;
function OptionElementWrappingImplementation() {}
OptionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
OptionElementWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$text();
}
// ********** Code for OutputElementWrappingImplementation **************
$inherits(OutputElementWrappingImplementation, ElementWrappingImplementation);
OutputElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
OutputElementWrappingImplementation._wrap$ctor.prototype = OutputElementWrappingImplementation.prototype;
function OutputElementWrappingImplementation() {}
OutputElementWrappingImplementation.prototype.is$html_Element = function(){return true};
OutputElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for ParagraphElementWrappingImplementation **************
$inherits(ParagraphElementWrappingImplementation, ElementWrappingImplementation);
ParagraphElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParagraphElementWrappingImplementation._wrap$ctor.prototype = ParagraphElementWrappingImplementation.prototype;
function ParagraphElementWrappingImplementation() {}
ParagraphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ParamElementWrappingImplementation **************
$inherits(ParamElementWrappingImplementation, ElementWrappingImplementation);
ParamElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ParamElementWrappingImplementation._wrap$ctor.prototype = ParamElementWrappingImplementation.prototype;
function ParamElementWrappingImplementation() {}
ParamElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ParamElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for PointWrappingImplementation **************
$inherits(PointWrappingImplementation, DOMWrapperBase);
PointWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
PointWrappingImplementation._wrap$ctor.prototype = PointWrappingImplementation.prototype;
function PointWrappingImplementation() {}
// ********** Code for PositionErrorWrappingImplementation **************
$inherits(PositionErrorWrappingImplementation, DOMWrapperBase);
PositionErrorWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
PositionErrorWrappingImplementation._wrap$ctor.prototype = PositionErrorWrappingImplementation.prototype;
function PositionErrorWrappingImplementation() {}
// ********** Code for PreElementWrappingImplementation **************
$inherits(PreElementWrappingImplementation, ElementWrappingImplementation);
PreElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
PreElementWrappingImplementation._wrap$ctor.prototype = PreElementWrappingImplementation.prototype;
function PreElementWrappingImplementation() {}
PreElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ProcessingInstructionWrappingImplementation **************
$inherits(ProcessingInstructionWrappingImplementation, NodeWrappingImplementation);
ProcessingInstructionWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProcessingInstructionWrappingImplementation._wrap$ctor.prototype = ProcessingInstructionWrappingImplementation.prototype;
function ProcessingInstructionWrappingImplementation() {}
// ********** Code for ProgressElementWrappingImplementation **************
$inherits(ProgressElementWrappingImplementation, ElementWrappingImplementation);
ProgressElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProgressElementWrappingImplementation._wrap$ctor.prototype = ProgressElementWrappingImplementation.prototype;
function ProgressElementWrappingImplementation() {}
ProgressElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for QuoteElementWrappingImplementation **************
$inherits(QuoteElementWrappingImplementation, ElementWrappingImplementation);
QuoteElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
QuoteElementWrappingImplementation._wrap$ctor.prototype = QuoteElementWrappingImplementation.prototype;
function QuoteElementWrappingImplementation() {}
QuoteElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for RGBColorWrappingImplementation **************
$inherits(RGBColorWrappingImplementation, DOMWrapperBase);
RGBColorWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
RGBColorWrappingImplementation._wrap$ctor.prototype = RGBColorWrappingImplementation.prototype;
function RGBColorWrappingImplementation() {}
// ********** Code for RangeExceptionWrappingImplementation **************
$inherits(RangeExceptionWrappingImplementation, DOMWrapperBase);
RangeExceptionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
RangeExceptionWrappingImplementation._wrap$ctor.prototype = RangeExceptionWrappingImplementation.prototype;
function RangeExceptionWrappingImplementation() {}
RangeExceptionWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for RangeWrappingImplementation **************
$inherits(RangeWrappingImplementation, DOMWrapperBase);
RangeWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
RangeWrappingImplementation._wrap$ctor.prototype = RangeWrappingImplementation.prototype;
function RangeWrappingImplementation() {}
RangeWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for RealtimeAnalyserNodeWrappingImplementation **************
$inherits(RealtimeAnalyserNodeWrappingImplementation, AudioNodeWrappingImplementation);
RealtimeAnalyserNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
RealtimeAnalyserNodeWrappingImplementation._wrap$ctor.prototype = RealtimeAnalyserNodeWrappingImplementation.prototype;
function RealtimeAnalyserNodeWrappingImplementation() {}
// ********** Code for RectWrappingImplementation **************
$inherits(RectWrappingImplementation, DOMWrapperBase);
RectWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
RectWrappingImplementation._wrap$ctor.prototype = RectWrappingImplementation.prototype;
function RectWrappingImplementation() {}
// ********** Code for SVGElementWrappingImplementation **************
$inherits(SVGElementWrappingImplementation, ElementWrappingImplementation);
SVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGElementWrappingImplementation._wrap$ctor.prototype = SVGElementWrappingImplementation.prototype;
function SVGElementWrappingImplementation() {}
SVGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGElementWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new FilteredElementList(this);
  }
  return this._elements;
}
SVGElementWrappingImplementation.prototype.set$elements = function(value) {
  var elements = this.get$elements();
  elements.clear$0();
  elements.addAll(value);
}
SVGElementWrappingImplementation.prototype.set$innerHTML = function(svg) {
  var container = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  container.set$innerHTML(("<svg version=\"1.1\">" + svg + "</svg>"));
  this.set$elements(container.get$elements().get$first().get$elements());
}
// ********** Code for SVGAElementWrappingImplementation **************
$inherits(SVGAElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAElementWrappingImplementation._wrap$ctor.prototype = SVGAElementWrappingImplementation.prototype;
function SVGAElementWrappingImplementation() {}
SVGAElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAltGlyphDefElementWrappingImplementation **************
$inherits(SVGAltGlyphDefElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphDefElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphDefElementWrappingImplementation.prototype;
function SVGAltGlyphDefElementWrappingImplementation() {}
SVGAltGlyphDefElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextContentElementWrappingImplementation **************
$inherits(SVGTextContentElementWrappingImplementation, SVGElementWrappingImplementation);
SVGTextContentElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextContentElementWrappingImplementation._wrap$ctor.prototype = SVGTextContentElementWrappingImplementation.prototype;
function SVGTextContentElementWrappingImplementation() {}
SVGTextContentElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextPositioningElementWrappingImplementation **************
$inherits(SVGTextPositioningElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
SVGTextPositioningElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPositioningElementWrappingImplementation._wrap$ctor.prototype = SVGTextPositioningElementWrappingImplementation.prototype;
function SVGTextPositioningElementWrappingImplementation() {}
SVGTextPositioningElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAltGlyphElementWrappingImplementation **************
$inherits(SVGAltGlyphElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGAltGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphElementWrappingImplementation.prototype;
function SVGAltGlyphElementWrappingImplementation() {}
SVGAltGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAltGlyphItemElementWrappingImplementation **************
$inherits(SVGAltGlyphItemElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAltGlyphItemElementWrappingImplementation._wrap$ctor.prototype = SVGAltGlyphItemElementWrappingImplementation.prototype;
function SVGAltGlyphItemElementWrappingImplementation() {}
SVGAltGlyphItemElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAngleWrappingImplementation **************
$inherits(SVGAngleWrappingImplementation, DOMWrapperBase);
SVGAngleWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAngleWrappingImplementation._wrap$ctor.prototype = SVGAngleWrappingImplementation.prototype;
function SVGAngleWrappingImplementation() {}
// ********** Code for SVGAnimationElementWrappingImplementation **************
$inherits(SVGAnimationElementWrappingImplementation, SVGElementWrappingImplementation);
SVGAnimationElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimationElementWrappingImplementation._wrap$ctor.prototype = SVGAnimationElementWrappingImplementation.prototype;
function SVGAnimationElementWrappingImplementation() {}
SVGAnimationElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateColorElementWrappingImplementation **************
$inherits(SVGAnimateColorElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateColorElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateColorElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateColorElementWrappingImplementation.prototype;
function SVGAnimateColorElementWrappingImplementation() {}
SVGAnimateColorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateElementWrappingImplementation **************
$inherits(SVGAnimateElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateElementWrappingImplementation.prototype;
function SVGAnimateElementWrappingImplementation() {}
SVGAnimateElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateMotionElementWrappingImplementation **************
$inherits(SVGAnimateMotionElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateMotionElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateMotionElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateMotionElementWrappingImplementation.prototype;
function SVGAnimateMotionElementWrappingImplementation() {}
SVGAnimateMotionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimateTransformElementWrappingImplementation **************
$inherits(SVGAnimateTransformElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGAnimateTransformElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGAnimateTransformElementWrappingImplementation._wrap$ctor.prototype = SVGAnimateTransformElementWrappingImplementation.prototype;
function SVGAnimateTransformElementWrappingImplementation() {}
SVGAnimateTransformElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGAnimatedAngleWrappingImplementation **************
$inherits(SVGAnimatedAngleWrappingImplementation, DOMWrapperBase);
SVGAnimatedAngleWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedAngleWrappingImplementation._wrap$ctor.prototype = SVGAnimatedAngleWrappingImplementation.prototype;
function SVGAnimatedAngleWrappingImplementation() {}
// ********** Code for SVGAnimatedBooleanWrappingImplementation **************
$inherits(SVGAnimatedBooleanWrappingImplementation, DOMWrapperBase);
SVGAnimatedBooleanWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedBooleanWrappingImplementation._wrap$ctor.prototype = SVGAnimatedBooleanWrappingImplementation.prototype;
function SVGAnimatedBooleanWrappingImplementation() {}
// ********** Code for SVGAnimatedEnumerationWrappingImplementation **************
$inherits(SVGAnimatedEnumerationWrappingImplementation, DOMWrapperBase);
SVGAnimatedEnumerationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedEnumerationWrappingImplementation._wrap$ctor.prototype = SVGAnimatedEnumerationWrappingImplementation.prototype;
function SVGAnimatedEnumerationWrappingImplementation() {}
// ********** Code for SVGAnimatedIntegerWrappingImplementation **************
$inherits(SVGAnimatedIntegerWrappingImplementation, DOMWrapperBase);
SVGAnimatedIntegerWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedIntegerWrappingImplementation._wrap$ctor.prototype = SVGAnimatedIntegerWrappingImplementation.prototype;
function SVGAnimatedIntegerWrappingImplementation() {}
// ********** Code for SVGAnimatedLengthListWrappingImplementation **************
$inherits(SVGAnimatedLengthListWrappingImplementation, DOMWrapperBase);
SVGAnimatedLengthListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedLengthListWrappingImplementation._wrap$ctor.prototype = SVGAnimatedLengthListWrappingImplementation.prototype;
function SVGAnimatedLengthListWrappingImplementation() {}
// ********** Code for SVGAnimatedLengthWrappingImplementation **************
$inherits(SVGAnimatedLengthWrappingImplementation, DOMWrapperBase);
SVGAnimatedLengthWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedLengthWrappingImplementation._wrap$ctor.prototype = SVGAnimatedLengthWrappingImplementation.prototype;
function SVGAnimatedLengthWrappingImplementation() {}
// ********** Code for SVGAnimatedNumberListWrappingImplementation **************
$inherits(SVGAnimatedNumberListWrappingImplementation, DOMWrapperBase);
SVGAnimatedNumberListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedNumberListWrappingImplementation._wrap$ctor.prototype = SVGAnimatedNumberListWrappingImplementation.prototype;
function SVGAnimatedNumberListWrappingImplementation() {}
// ********** Code for SVGAnimatedNumberWrappingImplementation **************
$inherits(SVGAnimatedNumberWrappingImplementation, DOMWrapperBase);
SVGAnimatedNumberWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedNumberWrappingImplementation._wrap$ctor.prototype = SVGAnimatedNumberWrappingImplementation.prototype;
function SVGAnimatedNumberWrappingImplementation() {}
// ********** Code for SVGAnimatedPreserveAspectRatioWrappingImplementation **************
$inherits(SVGAnimatedPreserveAspectRatioWrappingImplementation, DOMWrapperBase);
SVGAnimatedPreserveAspectRatioWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedPreserveAspectRatioWrappingImplementation._wrap$ctor.prototype = SVGAnimatedPreserveAspectRatioWrappingImplementation.prototype;
function SVGAnimatedPreserveAspectRatioWrappingImplementation() {}
// ********** Code for SVGAnimatedRectWrappingImplementation **************
$inherits(SVGAnimatedRectWrappingImplementation, DOMWrapperBase);
SVGAnimatedRectWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedRectWrappingImplementation._wrap$ctor.prototype = SVGAnimatedRectWrappingImplementation.prototype;
function SVGAnimatedRectWrappingImplementation() {}
// ********** Code for SVGAnimatedStringWrappingImplementation **************
$inherits(SVGAnimatedStringWrappingImplementation, DOMWrapperBase);
SVGAnimatedStringWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedStringWrappingImplementation._wrap$ctor.prototype = SVGAnimatedStringWrappingImplementation.prototype;
function SVGAnimatedStringWrappingImplementation() {}
// ********** Code for SVGAnimatedTransformListWrappingImplementation **************
$inherits(SVGAnimatedTransformListWrappingImplementation, DOMWrapperBase);
SVGAnimatedTransformListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGAnimatedTransformListWrappingImplementation._wrap$ctor.prototype = SVGAnimatedTransformListWrappingImplementation.prototype;
function SVGAnimatedTransformListWrappingImplementation() {}
// ********** Code for SVGCircleElementWrappingImplementation **************
$inherits(SVGCircleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGCircleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCircleElementWrappingImplementation._wrap$ctor.prototype = SVGCircleElementWrappingImplementation.prototype;
function SVGCircleElementWrappingImplementation() {}
SVGCircleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGClipPathElementWrappingImplementation **************
$inherits(SVGClipPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGClipPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGClipPathElementWrappingImplementation._wrap$ctor.prototype = SVGClipPathElementWrappingImplementation.prototype;
function SVGClipPathElementWrappingImplementation() {}
SVGClipPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGColorWrappingImplementation **************
$inherits(SVGColorWrappingImplementation, CSSValueWrappingImplementation);
SVGColorWrappingImplementation._wrap$ctor = function(ptr) {
  CSSValueWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGColorWrappingImplementation._wrap$ctor.prototype = SVGColorWrappingImplementation.prototype;
function SVGColorWrappingImplementation() {}
// ********** Code for SVGComponentTransferFunctionElementWrappingImplementation **************
$inherits(SVGComponentTransferFunctionElementWrappingImplementation, SVGElementWrappingImplementation);
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.prototype = SVGComponentTransferFunctionElementWrappingImplementation.prototype;
function SVGComponentTransferFunctionElementWrappingImplementation() {}
SVGComponentTransferFunctionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGComponentTransferFunctionElementWrappingImplementation.prototype.get$type = function() {
  return LevelDom.wrapSVGAnimatedEnumeration(this._ptr.get$type());
}
// ********** Code for SVGCursorElementWrappingImplementation **************
$inherits(SVGCursorElementWrappingImplementation, SVGElementWrappingImplementation);
SVGCursorElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGCursorElementWrappingImplementation._wrap$ctor.prototype = SVGCursorElementWrappingImplementation.prototype;
function SVGCursorElementWrappingImplementation() {}
SVGCursorElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGDefsElementWrappingImplementation **************
$inherits(SVGDefsElementWrappingImplementation, SVGElementWrappingImplementation);
SVGDefsElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDefsElementWrappingImplementation._wrap$ctor.prototype = SVGDefsElementWrappingImplementation.prototype;
function SVGDefsElementWrappingImplementation() {}
SVGDefsElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGDescElementWrappingImplementation **************
$inherits(SVGDescElementWrappingImplementation, SVGElementWrappingImplementation);
SVGDescElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGDescElementWrappingImplementation._wrap$ctor.prototype = SVGDescElementWrappingImplementation.prototype;
function SVGDescElementWrappingImplementation() {}
SVGDescElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGElementInstanceListWrappingImplementation **************
$inherits(SVGElementInstanceListWrappingImplementation, DOMWrapperBase);
SVGElementInstanceListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGElementInstanceListWrappingImplementation._wrap$ctor.prototype = SVGElementInstanceListWrappingImplementation.prototype;
function SVGElementInstanceListWrappingImplementation() {}
SVGElementInstanceListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
SVGElementInstanceListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapSVGElementInstance(this._ptr.item(index));
}
// ********** Code for SVGEllipseElementWrappingImplementation **************
$inherits(SVGEllipseElementWrappingImplementation, SVGElementWrappingImplementation);
SVGEllipseElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGEllipseElementWrappingImplementation._wrap$ctor.prototype = SVGEllipseElementWrappingImplementation.prototype;
function SVGEllipseElementWrappingImplementation() {}
SVGEllipseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGExceptionWrappingImplementation **************
$inherits(SVGExceptionWrappingImplementation, DOMWrapperBase);
SVGExceptionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGExceptionWrappingImplementation._wrap$ctor.prototype = SVGExceptionWrappingImplementation.prototype;
function SVGExceptionWrappingImplementation() {}
SVGExceptionWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for SVGExternalResourcesRequiredWrappingImplementation **************
$inherits(SVGExternalResourcesRequiredWrappingImplementation, DOMWrapperBase);
SVGExternalResourcesRequiredWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGExternalResourcesRequiredWrappingImplementation._wrap$ctor.prototype = SVGExternalResourcesRequiredWrappingImplementation.prototype;
function SVGExternalResourcesRequiredWrappingImplementation() {}
// ********** Code for SVGFEBlendElementWrappingImplementation **************
$inherits(SVGFEBlendElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEBlendElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEBlendElementWrappingImplementation._wrap$ctor.prototype = SVGFEBlendElementWrappingImplementation.prototype;
function SVGFEBlendElementWrappingImplementation() {}
SVGFEBlendElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEColorMatrixElementWrappingImplementation **************
$inherits(SVGFEColorMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEColorMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEColorMatrixElementWrappingImplementation.prototype;
function SVGFEColorMatrixElementWrappingImplementation() {}
SVGFEColorMatrixElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFEColorMatrixElementWrappingImplementation.prototype.get$type = function() {
  return LevelDom.wrapSVGAnimatedEnumeration(this._ptr.get$type());
}
// ********** Code for SVGFEComponentTransferElementWrappingImplementation **************
$inherits(SVGFEComponentTransferElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEComponentTransferElementWrappingImplementation._wrap$ctor.prototype = SVGFEComponentTransferElementWrappingImplementation.prototype;
function SVGFEComponentTransferElementWrappingImplementation() {}
SVGFEComponentTransferElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEConvolveMatrixElementWrappingImplementation **************
$inherits(SVGFEConvolveMatrixElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor.prototype = SVGFEConvolveMatrixElementWrappingImplementation.prototype;
function SVGFEConvolveMatrixElementWrappingImplementation() {}
SVGFEConvolveMatrixElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEDiffuseLightingElementWrappingImplementation **************
$inherits(SVGFEDiffuseLightingElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFEDiffuseLightingElementWrappingImplementation.prototype;
function SVGFEDiffuseLightingElementWrappingImplementation() {}
SVGFEDiffuseLightingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEDisplacementMapElementWrappingImplementation **************
$inherits(SVGFEDisplacementMapElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor.prototype = SVGFEDisplacementMapElementWrappingImplementation.prototype;
function SVGFEDisplacementMapElementWrappingImplementation() {}
SVGFEDisplacementMapElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEDistantLightElementWrappingImplementation **************
$inherits(SVGFEDistantLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDistantLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDistantLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEDistantLightElementWrappingImplementation.prototype;
function SVGFEDistantLightElementWrappingImplementation() {}
SVGFEDistantLightElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEDropShadowElementWrappingImplementation **************
$inherits(SVGFEDropShadowElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEDropShadowElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEDropShadowElementWrappingImplementation._wrap$ctor.prototype = SVGFEDropShadowElementWrappingImplementation.prototype;
function SVGFEDropShadowElementWrappingImplementation() {}
SVGFEDropShadowElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFloodElementWrappingImplementation **************
$inherits(SVGFEFloodElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEFloodElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFloodElementWrappingImplementation._wrap$ctor.prototype = SVGFEFloodElementWrappingImplementation.prototype;
function SVGFEFloodElementWrappingImplementation() {}
SVGFEFloodElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncAElementWrappingImplementation **************
$inherits(SVGFEFuncAElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncAElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncAElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncAElementWrappingImplementation.prototype;
function SVGFEFuncAElementWrappingImplementation() {}
SVGFEFuncAElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncBElementWrappingImplementation **************
$inherits(SVGFEFuncBElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncBElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncBElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncBElementWrappingImplementation.prototype;
function SVGFEFuncBElementWrappingImplementation() {}
SVGFEFuncBElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncGElementWrappingImplementation **************
$inherits(SVGFEFuncGElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncGElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncGElementWrappingImplementation.prototype;
function SVGFEFuncGElementWrappingImplementation() {}
SVGFEFuncGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEFuncRElementWrappingImplementation **************
$inherits(SVGFEFuncRElementWrappingImplementation, SVGComponentTransferFunctionElementWrappingImplementation);
SVGFEFuncRElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEFuncRElementWrappingImplementation._wrap$ctor.prototype = SVGFEFuncRElementWrappingImplementation.prototype;
function SVGFEFuncRElementWrappingImplementation() {}
SVGFEFuncRElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEGaussianBlurElementWrappingImplementation **************
$inherits(SVGFEGaussianBlurElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor.prototype = SVGFEGaussianBlurElementWrappingImplementation.prototype;
function SVGFEGaussianBlurElementWrappingImplementation() {}
SVGFEGaussianBlurElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEImageElementWrappingImplementation **************
$inherits(SVGFEImageElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEImageElementWrappingImplementation._wrap$ctor.prototype = SVGFEImageElementWrappingImplementation.prototype;
function SVGFEImageElementWrappingImplementation() {}
SVGFEImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEMergeElementWrappingImplementation **************
$inherits(SVGFEMergeElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEMergeElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeElementWrappingImplementation.prototype;
function SVGFEMergeElementWrappingImplementation() {}
SVGFEMergeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEMergeNodeElementWrappingImplementation **************
$inherits(SVGFEMergeNodeElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEMergeNodeElementWrappingImplementation._wrap$ctor.prototype = SVGFEMergeNodeElementWrappingImplementation.prototype;
function SVGFEMergeNodeElementWrappingImplementation() {}
SVGFEMergeNodeElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEOffsetElementWrappingImplementation **************
$inherits(SVGFEOffsetElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEOffsetElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEOffsetElementWrappingImplementation._wrap$ctor.prototype = SVGFEOffsetElementWrappingImplementation.prototype;
function SVGFEOffsetElementWrappingImplementation() {}
SVGFEOffsetElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFEPointLightElementWrappingImplementation **************
$inherits(SVGFEPointLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFEPointLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFEPointLightElementWrappingImplementation._wrap$ctor.prototype = SVGFEPointLightElementWrappingImplementation.prototype;
function SVGFEPointLightElementWrappingImplementation() {}
SVGFEPointLightElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFESpecularLightingElementWrappingImplementation **************
$inherits(SVGFESpecularLightingElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpecularLightingElementWrappingImplementation._wrap$ctor.prototype = SVGFESpecularLightingElementWrappingImplementation.prototype;
function SVGFESpecularLightingElementWrappingImplementation() {}
SVGFESpecularLightingElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFESpotLightElementWrappingImplementation **************
$inherits(SVGFESpotLightElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFESpotLightElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFESpotLightElementWrappingImplementation._wrap$ctor.prototype = SVGFESpotLightElementWrappingImplementation.prototype;
function SVGFESpotLightElementWrappingImplementation() {}
SVGFESpotLightElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFETileElementWrappingImplementation **************
$inherits(SVGFETileElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFETileElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETileElementWrappingImplementation._wrap$ctor.prototype = SVGFETileElementWrappingImplementation.prototype;
function SVGFETileElementWrappingImplementation() {}
SVGFETileElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFETurbulenceElementWrappingImplementation **************
$inherits(SVGFETurbulenceElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFETurbulenceElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFETurbulenceElementWrappingImplementation._wrap$ctor.prototype = SVGFETurbulenceElementWrappingImplementation.prototype;
function SVGFETurbulenceElementWrappingImplementation() {}
SVGFETurbulenceElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGFETurbulenceElementWrappingImplementation.prototype.get$type = function() {
  return LevelDom.wrapSVGAnimatedEnumeration(this._ptr.get$type());
}
// ********** Code for SVGFilterElementWrappingImplementation **************
$inherits(SVGFilterElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFilterElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFilterElementWrappingImplementation._wrap$ctor.prototype = SVGFilterElementWrappingImplementation.prototype;
function SVGFilterElementWrappingImplementation() {}
SVGFilterElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGStylableWrappingImplementation **************
$inherits(SVGStylableWrappingImplementation, DOMWrapperBase);
SVGStylableWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGStylableWrappingImplementation._wrap$ctor.prototype = SVGStylableWrappingImplementation.prototype;
function SVGStylableWrappingImplementation() {}
// ********** Code for SVGFilterPrimitiveStandardAttributesWrappingImplementation **************
$inherits(SVGFilterPrimitiveStandardAttributesWrappingImplementation, SVGStylableWrappingImplementation);
SVGFilterPrimitiveStandardAttributesWrappingImplementation._wrap$ctor = function(ptr) {
  SVGStylableWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFilterPrimitiveStandardAttributesWrappingImplementation._wrap$ctor.prototype = SVGFilterPrimitiveStandardAttributesWrappingImplementation.prototype;
function SVGFilterPrimitiveStandardAttributesWrappingImplementation() {}
// ********** Code for SVGFitToViewBoxWrappingImplementation **************
$inherits(SVGFitToViewBoxWrappingImplementation, DOMWrapperBase);
SVGFitToViewBoxWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGFitToViewBoxWrappingImplementation._wrap$ctor.prototype = SVGFitToViewBoxWrappingImplementation.prototype;
function SVGFitToViewBoxWrappingImplementation() {}
// ********** Code for SVGFontElementWrappingImplementation **************
$inherits(SVGFontElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontElementWrappingImplementation._wrap$ctor.prototype = SVGFontElementWrappingImplementation.prototype;
function SVGFontElementWrappingImplementation() {}
SVGFontElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceElementWrappingImplementation **************
$inherits(SVGFontFaceElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceElementWrappingImplementation.prototype;
function SVGFontFaceElementWrappingImplementation() {}
SVGFontFaceElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceFormatElementWrappingImplementation **************
$inherits(SVGFontFaceFormatElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceFormatElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceFormatElementWrappingImplementation.prototype;
function SVGFontFaceFormatElementWrappingImplementation() {}
SVGFontFaceFormatElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceNameElementWrappingImplementation **************
$inherits(SVGFontFaceNameElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceNameElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceNameElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceNameElementWrappingImplementation.prototype;
function SVGFontFaceNameElementWrappingImplementation() {}
SVGFontFaceNameElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceSrcElementWrappingImplementation **************
$inherits(SVGFontFaceSrcElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceSrcElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceSrcElementWrappingImplementation.prototype;
function SVGFontFaceSrcElementWrappingImplementation() {}
SVGFontFaceSrcElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGFontFaceUriElementWrappingImplementation **************
$inherits(SVGFontFaceUriElementWrappingImplementation, SVGElementWrappingImplementation);
SVGFontFaceUriElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGFontFaceUriElementWrappingImplementation._wrap$ctor.prototype = SVGFontFaceUriElementWrappingImplementation.prototype;
function SVGFontFaceUriElementWrappingImplementation() {}
SVGFontFaceUriElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGForeignObjectElementWrappingImplementation **************
$inherits(SVGForeignObjectElementWrappingImplementation, SVGElementWrappingImplementation);
SVGForeignObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGForeignObjectElementWrappingImplementation._wrap$ctor.prototype = SVGForeignObjectElementWrappingImplementation.prototype;
function SVGForeignObjectElementWrappingImplementation() {}
SVGForeignObjectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGGElementWrappingImplementation **************
$inherits(SVGGElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGElementWrappingImplementation._wrap$ctor.prototype = SVGGElementWrappingImplementation.prototype;
function SVGGElementWrappingImplementation() {}
SVGGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGGlyphElementWrappingImplementation **************
$inherits(SVGGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphElementWrappingImplementation.prototype;
function SVGGlyphElementWrappingImplementation() {}
SVGGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGGlyphRefElementWrappingImplementation **************
$inherits(SVGGlyphRefElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGlyphRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGlyphRefElementWrappingImplementation._wrap$ctor.prototype = SVGGlyphRefElementWrappingImplementation.prototype;
function SVGGlyphRefElementWrappingImplementation() {}
SVGGlyphRefElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGGradientElementWrappingImplementation **************
$inherits(SVGGradientElementWrappingImplementation, SVGElementWrappingImplementation);
SVGGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGGradientElementWrappingImplementation._wrap$ctor.prototype = SVGGradientElementWrappingImplementation.prototype;
function SVGGradientElementWrappingImplementation() {}
SVGGradientElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGHKernElementWrappingImplementation **************
$inherits(SVGHKernElementWrappingImplementation, SVGElementWrappingImplementation);
SVGHKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGHKernElementWrappingImplementation._wrap$ctor.prototype = SVGHKernElementWrappingImplementation.prototype;
function SVGHKernElementWrappingImplementation() {}
SVGHKernElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGImageElementWrappingImplementation **************
$inherits(SVGImageElementWrappingImplementation, SVGElementWrappingImplementation);
SVGImageElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGImageElementWrappingImplementation._wrap$ctor.prototype = SVGImageElementWrappingImplementation.prototype;
function SVGImageElementWrappingImplementation() {}
SVGImageElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGLangSpaceWrappingImplementation **************
$inherits(SVGLangSpaceWrappingImplementation, DOMWrapperBase);
SVGLangSpaceWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGLangSpaceWrappingImplementation._wrap$ctor.prototype = SVGLangSpaceWrappingImplementation.prototype;
function SVGLangSpaceWrappingImplementation() {}
// ********** Code for SVGLengthListWrappingImplementation **************
$inherits(SVGLengthListWrappingImplementation, DOMWrapperBase);
SVGLengthListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGLengthListWrappingImplementation._wrap$ctor.prototype = SVGLengthListWrappingImplementation.prototype;
function SVGLengthListWrappingImplementation() {}
SVGLengthListWrappingImplementation.prototype.clear = function() {
  this._ptr.clear$0();
  return;
}
SVGLengthListWrappingImplementation.prototype.clear$0 = SVGLengthListWrappingImplementation.prototype.clear;
// ********** Code for SVGLengthWrappingImplementation **************
$inherits(SVGLengthWrappingImplementation, DOMWrapperBase);
SVGLengthWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGLengthWrappingImplementation._wrap$ctor.prototype = SVGLengthWrappingImplementation.prototype;
function SVGLengthWrappingImplementation() {}
// ********** Code for SVGLineElementWrappingImplementation **************
$inherits(SVGLineElementWrappingImplementation, SVGElementWrappingImplementation);
SVGLineElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLineElementWrappingImplementation._wrap$ctor.prototype = SVGLineElementWrappingImplementation.prototype;
function SVGLineElementWrappingImplementation() {}
SVGLineElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGLinearGradientElementWrappingImplementation **************
$inherits(SVGLinearGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
SVGLinearGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGLinearGradientElementWrappingImplementation._wrap$ctor.prototype = SVGLinearGradientElementWrappingImplementation.prototype;
function SVGLinearGradientElementWrappingImplementation() {}
SVGLinearGradientElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGLocatableWrappingImplementation **************
$inherits(SVGLocatableWrappingImplementation, DOMWrapperBase);
SVGLocatableWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGLocatableWrappingImplementation._wrap$ctor.prototype = SVGLocatableWrappingImplementation.prototype;
function SVGLocatableWrappingImplementation() {}
// ********** Code for SVGMPathElementWrappingImplementation **************
$inherits(SVGMPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMPathElementWrappingImplementation._wrap$ctor.prototype = SVGMPathElementWrappingImplementation.prototype;
function SVGMPathElementWrappingImplementation() {}
SVGMPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMarkerElementWrappingImplementation **************
$inherits(SVGMarkerElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMarkerElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMarkerElementWrappingImplementation._wrap$ctor.prototype = SVGMarkerElementWrappingImplementation.prototype;
function SVGMarkerElementWrappingImplementation() {}
SVGMarkerElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMaskElementWrappingImplementation **************
$inherits(SVGMaskElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMaskElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMaskElementWrappingImplementation._wrap$ctor.prototype = SVGMaskElementWrappingImplementation.prototype;
function SVGMaskElementWrappingImplementation() {}
SVGMaskElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMatrixWrappingImplementation **************
$inherits(SVGMatrixWrappingImplementation, DOMWrapperBase);
SVGMatrixWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGMatrixWrappingImplementation._wrap$ctor.prototype = SVGMatrixWrappingImplementation.prototype;
function SVGMatrixWrappingImplementation() {}
// ********** Code for SVGMetadataElementWrappingImplementation **************
$inherits(SVGMetadataElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMetadataElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMetadataElementWrappingImplementation._wrap$ctor.prototype = SVGMetadataElementWrappingImplementation.prototype;
function SVGMetadataElementWrappingImplementation() {}
SVGMetadataElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGMissingGlyphElementWrappingImplementation **************
$inherits(SVGMissingGlyphElementWrappingImplementation, SVGElementWrappingImplementation);
SVGMissingGlyphElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGMissingGlyphElementWrappingImplementation._wrap$ctor.prototype = SVGMissingGlyphElementWrappingImplementation.prototype;
function SVGMissingGlyphElementWrappingImplementation() {}
SVGMissingGlyphElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGNumberListWrappingImplementation **************
$inherits(SVGNumberListWrappingImplementation, DOMWrapperBase);
SVGNumberListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGNumberListWrappingImplementation._wrap$ctor.prototype = SVGNumberListWrappingImplementation.prototype;
function SVGNumberListWrappingImplementation() {}
SVGNumberListWrappingImplementation.prototype.clear = function() {
  this._ptr.clear$0();
  return;
}
SVGNumberListWrappingImplementation.prototype.clear$0 = SVGNumberListWrappingImplementation.prototype.clear;
// ********** Code for SVGNumberWrappingImplementation **************
$inherits(SVGNumberWrappingImplementation, DOMWrapperBase);
SVGNumberWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGNumberWrappingImplementation._wrap$ctor.prototype = SVGNumberWrappingImplementation.prototype;
function SVGNumberWrappingImplementation() {}
// ********** Code for SVGPaintWrappingImplementation **************
$inherits(SVGPaintWrappingImplementation, SVGColorWrappingImplementation);
SVGPaintWrappingImplementation._wrap$ctor = function(ptr) {
  SVGColorWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPaintWrappingImplementation._wrap$ctor.prototype = SVGPaintWrappingImplementation.prototype;
function SVGPaintWrappingImplementation() {}
// ********** Code for SVGPathElementWrappingImplementation **************
$inherits(SVGPathElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathElementWrappingImplementation._wrap$ctor.prototype = SVGPathElementWrappingImplementation.prototype;
function SVGPathElementWrappingImplementation() {}
SVGPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGPathSegWrappingImplementation **************
$inherits(SVGPathSegWrappingImplementation, DOMWrapperBase);
SVGPathSegWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGPathSegWrappingImplementation._wrap$ctor.prototype = SVGPathSegWrappingImplementation.prototype;
function SVGPathSegWrappingImplementation() {}
// ********** Code for SVGPathSegArcAbsWrappingImplementation **************
$inherits(SVGPathSegArcAbsWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegArcAbsWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegArcAbsWrappingImplementation._wrap$ctor.prototype = SVGPathSegArcAbsWrappingImplementation.prototype;
function SVGPathSegArcAbsWrappingImplementation() {}
// ********** Code for SVGPathSegArcRelWrappingImplementation **************
$inherits(SVGPathSegArcRelWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegArcRelWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegArcRelWrappingImplementation._wrap$ctor.prototype = SVGPathSegArcRelWrappingImplementation.prototype;
function SVGPathSegArcRelWrappingImplementation() {}
// ********** Code for SVGPathSegClosePathWrappingImplementation **************
$inherits(SVGPathSegClosePathWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegClosePathWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegClosePathWrappingImplementation._wrap$ctor.prototype = SVGPathSegClosePathWrappingImplementation.prototype;
function SVGPathSegClosePathWrappingImplementation() {}
// ********** Code for SVGPathSegCurvetoCubicAbsWrappingImplementation **************
$inherits(SVGPathSegCurvetoCubicAbsWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegCurvetoCubicAbsWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegCurvetoCubicAbsWrappingImplementation._wrap$ctor.prototype = SVGPathSegCurvetoCubicAbsWrappingImplementation.prototype;
function SVGPathSegCurvetoCubicAbsWrappingImplementation() {}
// ********** Code for SVGPathSegCurvetoCubicRelWrappingImplementation **************
$inherits(SVGPathSegCurvetoCubicRelWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegCurvetoCubicRelWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegCurvetoCubicRelWrappingImplementation._wrap$ctor.prototype = SVGPathSegCurvetoCubicRelWrappingImplementation.prototype;
function SVGPathSegCurvetoCubicRelWrappingImplementation() {}
// ********** Code for SVGPathSegCurvetoCubicSmoothAbsWrappingImplementation **************
$inherits(SVGPathSegCurvetoCubicSmoothAbsWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegCurvetoCubicSmoothAbsWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegCurvetoCubicSmoothAbsWrappingImplementation._wrap$ctor.prototype = SVGPathSegCurvetoCubicSmoothAbsWrappingImplementation.prototype;
function SVGPathSegCurvetoCubicSmoothAbsWrappingImplementation() {}
// ********** Code for SVGPathSegCurvetoCubicSmoothRelWrappingImplementation **************
$inherits(SVGPathSegCurvetoCubicSmoothRelWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegCurvetoCubicSmoothRelWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegCurvetoCubicSmoothRelWrappingImplementation._wrap$ctor.prototype = SVGPathSegCurvetoCubicSmoothRelWrappingImplementation.prototype;
function SVGPathSegCurvetoCubicSmoothRelWrappingImplementation() {}
// ********** Code for SVGPathSegCurvetoQuadraticAbsWrappingImplementation **************
$inherits(SVGPathSegCurvetoQuadraticAbsWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegCurvetoQuadraticAbsWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegCurvetoQuadraticAbsWrappingImplementation._wrap$ctor.prototype = SVGPathSegCurvetoQuadraticAbsWrappingImplementation.prototype;
function SVGPathSegCurvetoQuadraticAbsWrappingImplementation() {}
// ********** Code for SVGPathSegCurvetoQuadraticRelWrappingImplementation **************
$inherits(SVGPathSegCurvetoQuadraticRelWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegCurvetoQuadraticRelWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegCurvetoQuadraticRelWrappingImplementation._wrap$ctor.prototype = SVGPathSegCurvetoQuadraticRelWrappingImplementation.prototype;
function SVGPathSegCurvetoQuadraticRelWrappingImplementation() {}
// ********** Code for SVGPathSegCurvetoQuadraticSmoothAbsWrappingImplementation **************
$inherits(SVGPathSegCurvetoQuadraticSmoothAbsWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegCurvetoQuadraticSmoothAbsWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegCurvetoQuadraticSmoothAbsWrappingImplementation._wrap$ctor.prototype = SVGPathSegCurvetoQuadraticSmoothAbsWrappingImplementation.prototype;
function SVGPathSegCurvetoQuadraticSmoothAbsWrappingImplementation() {}
// ********** Code for SVGPathSegCurvetoQuadraticSmoothRelWrappingImplementation **************
$inherits(SVGPathSegCurvetoQuadraticSmoothRelWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegCurvetoQuadraticSmoothRelWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegCurvetoQuadraticSmoothRelWrappingImplementation._wrap$ctor.prototype = SVGPathSegCurvetoQuadraticSmoothRelWrappingImplementation.prototype;
function SVGPathSegCurvetoQuadraticSmoothRelWrappingImplementation() {}
// ********** Code for SVGPathSegLinetoAbsWrappingImplementation **************
$inherits(SVGPathSegLinetoAbsWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegLinetoAbsWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegLinetoAbsWrappingImplementation._wrap$ctor.prototype = SVGPathSegLinetoAbsWrappingImplementation.prototype;
function SVGPathSegLinetoAbsWrappingImplementation() {}
// ********** Code for SVGPathSegLinetoHorizontalAbsWrappingImplementation **************
$inherits(SVGPathSegLinetoHorizontalAbsWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegLinetoHorizontalAbsWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegLinetoHorizontalAbsWrappingImplementation._wrap$ctor.prototype = SVGPathSegLinetoHorizontalAbsWrappingImplementation.prototype;
function SVGPathSegLinetoHorizontalAbsWrappingImplementation() {}
// ********** Code for SVGPathSegLinetoHorizontalRelWrappingImplementation **************
$inherits(SVGPathSegLinetoHorizontalRelWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegLinetoHorizontalRelWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegLinetoHorizontalRelWrappingImplementation._wrap$ctor.prototype = SVGPathSegLinetoHorizontalRelWrappingImplementation.prototype;
function SVGPathSegLinetoHorizontalRelWrappingImplementation() {}
// ********** Code for SVGPathSegLinetoRelWrappingImplementation **************
$inherits(SVGPathSegLinetoRelWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegLinetoRelWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegLinetoRelWrappingImplementation._wrap$ctor.prototype = SVGPathSegLinetoRelWrappingImplementation.prototype;
function SVGPathSegLinetoRelWrappingImplementation() {}
// ********** Code for SVGPathSegLinetoVerticalAbsWrappingImplementation **************
$inherits(SVGPathSegLinetoVerticalAbsWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegLinetoVerticalAbsWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegLinetoVerticalAbsWrappingImplementation._wrap$ctor.prototype = SVGPathSegLinetoVerticalAbsWrappingImplementation.prototype;
function SVGPathSegLinetoVerticalAbsWrappingImplementation() {}
// ********** Code for SVGPathSegLinetoVerticalRelWrappingImplementation **************
$inherits(SVGPathSegLinetoVerticalRelWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegLinetoVerticalRelWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegLinetoVerticalRelWrappingImplementation._wrap$ctor.prototype = SVGPathSegLinetoVerticalRelWrappingImplementation.prototype;
function SVGPathSegLinetoVerticalRelWrappingImplementation() {}
// ********** Code for SVGPathSegListWrappingImplementation **************
$inherits(SVGPathSegListWrappingImplementation, DOMWrapperBase);
SVGPathSegListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGPathSegListWrappingImplementation._wrap$ctor.prototype = SVGPathSegListWrappingImplementation.prototype;
function SVGPathSegListWrappingImplementation() {}
SVGPathSegListWrappingImplementation.prototype.clear = function() {
  this._ptr.clear$0();
  return;
}
SVGPathSegListWrappingImplementation.prototype.clear$0 = SVGPathSegListWrappingImplementation.prototype.clear;
// ********** Code for SVGPathSegMovetoAbsWrappingImplementation **************
$inherits(SVGPathSegMovetoAbsWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegMovetoAbsWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegMovetoAbsWrappingImplementation._wrap$ctor.prototype = SVGPathSegMovetoAbsWrappingImplementation.prototype;
function SVGPathSegMovetoAbsWrappingImplementation() {}
// ********** Code for SVGPathSegMovetoRelWrappingImplementation **************
$inherits(SVGPathSegMovetoRelWrappingImplementation, SVGPathSegWrappingImplementation);
SVGPathSegMovetoRelWrappingImplementation._wrap$ctor = function(ptr) {
  SVGPathSegWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPathSegMovetoRelWrappingImplementation._wrap$ctor.prototype = SVGPathSegMovetoRelWrappingImplementation.prototype;
function SVGPathSegMovetoRelWrappingImplementation() {}
// ********** Code for SVGPatternElementWrappingImplementation **************
$inherits(SVGPatternElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPatternElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPatternElementWrappingImplementation._wrap$ctor.prototype = SVGPatternElementWrappingImplementation.prototype;
function SVGPatternElementWrappingImplementation() {}
SVGPatternElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGPointListWrappingImplementation **************
$inherits(SVGPointListWrappingImplementation, DOMWrapperBase);
SVGPointListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGPointListWrappingImplementation._wrap$ctor.prototype = SVGPointListWrappingImplementation.prototype;
function SVGPointListWrappingImplementation() {}
SVGPointListWrappingImplementation.prototype.clear = function() {
  this._ptr.clear$0();
  return;
}
SVGPointListWrappingImplementation.prototype.clear$0 = SVGPointListWrappingImplementation.prototype.clear;
// ********** Code for SVGPointWrappingImplementation **************
$inherits(SVGPointWrappingImplementation, DOMWrapperBase);
SVGPointWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGPointWrappingImplementation._wrap$ctor.prototype = SVGPointWrappingImplementation.prototype;
function SVGPointWrappingImplementation() {}
// ********** Code for SVGPolygonElementWrappingImplementation **************
$inherits(SVGPolygonElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPolygonElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolygonElementWrappingImplementation._wrap$ctor.prototype = SVGPolygonElementWrappingImplementation.prototype;
function SVGPolygonElementWrappingImplementation() {}
SVGPolygonElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGPolylineElementWrappingImplementation **************
$inherits(SVGPolylineElementWrappingImplementation, SVGElementWrappingImplementation);
SVGPolylineElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGPolylineElementWrappingImplementation._wrap$ctor.prototype = SVGPolylineElementWrappingImplementation.prototype;
function SVGPolylineElementWrappingImplementation() {}
SVGPolylineElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGPreserveAspectRatioWrappingImplementation **************
$inherits(SVGPreserveAspectRatioWrappingImplementation, DOMWrapperBase);
SVGPreserveAspectRatioWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGPreserveAspectRatioWrappingImplementation._wrap$ctor.prototype = SVGPreserveAspectRatioWrappingImplementation.prototype;
function SVGPreserveAspectRatioWrappingImplementation() {}
// ********** Code for SVGRadialGradientElementWrappingImplementation **************
$inherits(SVGRadialGradientElementWrappingImplementation, SVGGradientElementWrappingImplementation);
SVGRadialGradientElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGGradientElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRadialGradientElementWrappingImplementation._wrap$ctor.prototype = SVGRadialGradientElementWrappingImplementation.prototype;
function SVGRadialGradientElementWrappingImplementation() {}
SVGRadialGradientElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGRectElementWrappingImplementation **************
$inherits(SVGRectElementWrappingImplementation, SVGElementWrappingImplementation);
SVGRectElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGRectElementWrappingImplementation._wrap$ctor.prototype = SVGRectElementWrappingImplementation.prototype;
function SVGRectElementWrappingImplementation() {}
SVGRectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGRectWrappingImplementation **************
$inherits(SVGRectWrappingImplementation, DOMWrapperBase);
SVGRectWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGRectWrappingImplementation._wrap$ctor.prototype = SVGRectWrappingImplementation.prototype;
function SVGRectWrappingImplementation() {}
// ********** Code for SVGRenderingIntentWrappingImplementation **************
$inherits(SVGRenderingIntentWrappingImplementation, DOMWrapperBase);
SVGRenderingIntentWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGRenderingIntentWrappingImplementation._wrap$ctor.prototype = SVGRenderingIntentWrappingImplementation.prototype;
function SVGRenderingIntentWrappingImplementation() {}
// ********** Code for SVGScriptElementWrappingImplementation **************
$inherits(SVGScriptElementWrappingImplementation, SVGElementWrappingImplementation);
SVGScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGScriptElementWrappingImplementation._wrap$ctor.prototype = SVGScriptElementWrappingImplementation.prototype;
function SVGScriptElementWrappingImplementation() {}
SVGScriptElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGScriptElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for SVGSetElementWrappingImplementation **************
$inherits(SVGSetElementWrappingImplementation, SVGAnimationElementWrappingImplementation);
SVGSetElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGAnimationElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSetElementWrappingImplementation._wrap$ctor.prototype = SVGSetElementWrappingImplementation.prototype;
function SVGSetElementWrappingImplementation() {}
SVGSetElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGStopElementWrappingImplementation **************
$inherits(SVGStopElementWrappingImplementation, SVGElementWrappingImplementation);
SVGStopElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStopElementWrappingImplementation._wrap$ctor.prototype = SVGStopElementWrappingImplementation.prototype;
function SVGStopElementWrappingImplementation() {}
SVGStopElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGStringListWrappingImplementation **************
$inherits(SVGStringListWrappingImplementation, DOMWrapperBase);
SVGStringListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGStringListWrappingImplementation._wrap$ctor.prototype = SVGStringListWrappingImplementation.prototype;
function SVGStringListWrappingImplementation() {}
SVGStringListWrappingImplementation.prototype.clear = function() {
  this._ptr.clear$0();
  return;
}
SVGStringListWrappingImplementation.prototype.clear$0 = SVGStringListWrappingImplementation.prototype.clear;
// ********** Code for SVGStyleElementWrappingImplementation **************
$inherits(SVGStyleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGStyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGStyleElementWrappingImplementation._wrap$ctor.prototype = SVGStyleElementWrappingImplementation.prototype;
function SVGStyleElementWrappingImplementation() {}
SVGStyleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SVGStyleElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for SVGSwitchElementWrappingImplementation **************
$inherits(SVGSwitchElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSwitchElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSwitchElementWrappingImplementation._wrap$ctor.prototype = SVGSwitchElementWrappingImplementation.prototype;
function SVGSwitchElementWrappingImplementation() {}
SVGSwitchElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGSymbolElementWrappingImplementation **************
$inherits(SVGSymbolElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSymbolElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSymbolElementWrappingImplementation._wrap$ctor.prototype = SVGSymbolElementWrappingImplementation.prototype;
function SVGSymbolElementWrappingImplementation() {}
SVGSymbolElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTRefElementWrappingImplementation **************
$inherits(SVGTRefElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTRefElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTRefElementWrappingImplementation._wrap$ctor.prototype = SVGTRefElementWrappingImplementation.prototype;
function SVGTRefElementWrappingImplementation() {}
SVGTRefElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTSpanElementWrappingImplementation **************
$inherits(SVGTSpanElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTSpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTSpanElementWrappingImplementation._wrap$ctor.prototype = SVGTSpanElementWrappingImplementation.prototype;
function SVGTSpanElementWrappingImplementation() {}
SVGTSpanElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTestsWrappingImplementation **************
$inherits(SVGTestsWrappingImplementation, DOMWrapperBase);
SVGTestsWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGTestsWrappingImplementation._wrap$ctor.prototype = SVGTestsWrappingImplementation.prototype;
function SVGTestsWrappingImplementation() {}
// ********** Code for SVGTextElementWrappingImplementation **************
$inherits(SVGTextElementWrappingImplementation, SVGTextPositioningElementWrappingImplementation);
SVGTextElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextPositioningElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextElementWrappingImplementation._wrap$ctor.prototype = SVGTextElementWrappingImplementation.prototype;
function SVGTextElementWrappingImplementation() {}
SVGTextElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTextPathElementWrappingImplementation **************
$inherits(SVGTextPathElementWrappingImplementation, SVGTextContentElementWrappingImplementation);
SVGTextPathElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGTextContentElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTextPathElementWrappingImplementation._wrap$ctor.prototype = SVGTextPathElementWrappingImplementation.prototype;
function SVGTextPathElementWrappingImplementation() {}
SVGTextPathElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTitleElementWrappingImplementation **************
$inherits(SVGTitleElementWrappingImplementation, SVGElementWrappingImplementation);
SVGTitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTitleElementWrappingImplementation._wrap$ctor.prototype = SVGTitleElementWrappingImplementation.prototype;
function SVGTitleElementWrappingImplementation() {}
SVGTitleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGTransformListWrappingImplementation **************
$inherits(SVGTransformListWrappingImplementation, DOMWrapperBase);
SVGTransformListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGTransformListWrappingImplementation._wrap$ctor.prototype = SVGTransformListWrappingImplementation.prototype;
function SVGTransformListWrappingImplementation() {}
SVGTransformListWrappingImplementation.prototype.clear = function() {
  this._ptr.clear$0();
  return;
}
SVGTransformListWrappingImplementation.prototype.clear$0 = SVGTransformListWrappingImplementation.prototype.clear;
// ********** Code for SVGTransformWrappingImplementation **************
$inherits(SVGTransformWrappingImplementation, DOMWrapperBase);
SVGTransformWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGTransformWrappingImplementation._wrap$ctor.prototype = SVGTransformWrappingImplementation.prototype;
function SVGTransformWrappingImplementation() {}
SVGTransformWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for SVGTransformableWrappingImplementation **************
$inherits(SVGTransformableWrappingImplementation, SVGLocatableWrappingImplementation);
SVGTransformableWrappingImplementation._wrap$ctor = function(ptr) {
  SVGLocatableWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGTransformableWrappingImplementation._wrap$ctor.prototype = SVGTransformableWrappingImplementation.prototype;
function SVGTransformableWrappingImplementation() {}
// ********** Code for SVGURIReferenceWrappingImplementation **************
$inherits(SVGURIReferenceWrappingImplementation, DOMWrapperBase);
SVGURIReferenceWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGURIReferenceWrappingImplementation._wrap$ctor.prototype = SVGURIReferenceWrappingImplementation.prototype;
function SVGURIReferenceWrappingImplementation() {}
// ********** Code for SVGUnitTypesWrappingImplementation **************
$inherits(SVGUnitTypesWrappingImplementation, DOMWrapperBase);
SVGUnitTypesWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGUnitTypesWrappingImplementation._wrap$ctor.prototype = SVGUnitTypesWrappingImplementation.prototype;
function SVGUnitTypesWrappingImplementation() {}
// ********** Code for SVGUseElementWrappingImplementation **************
$inherits(SVGUseElementWrappingImplementation, SVGElementWrappingImplementation);
SVGUseElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGUseElementWrappingImplementation._wrap$ctor.prototype = SVGUseElementWrappingImplementation.prototype;
function SVGUseElementWrappingImplementation() {}
SVGUseElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGVKernElementWrappingImplementation **************
$inherits(SVGVKernElementWrappingImplementation, SVGElementWrappingImplementation);
SVGVKernElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGVKernElementWrappingImplementation._wrap$ctor.prototype = SVGVKernElementWrappingImplementation.prototype;
function SVGVKernElementWrappingImplementation() {}
SVGVKernElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGViewElementWrappingImplementation **************
$inherits(SVGViewElementWrappingImplementation, SVGElementWrappingImplementation);
SVGViewElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGViewElementWrappingImplementation._wrap$ctor.prototype = SVGViewElementWrappingImplementation.prototype;
function SVGViewElementWrappingImplementation() {}
SVGViewElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGZoomAndPanWrappingImplementation **************
$inherits(SVGZoomAndPanWrappingImplementation, DOMWrapperBase);
SVGZoomAndPanWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SVGZoomAndPanWrappingImplementation._wrap$ctor.prototype = SVGZoomAndPanWrappingImplementation.prototype;
function SVGZoomAndPanWrappingImplementation() {}
// ********** Code for SVGViewSpecWrappingImplementation **************
$inherits(SVGViewSpecWrappingImplementation, SVGZoomAndPanWrappingImplementation);
SVGViewSpecWrappingImplementation._wrap$ctor = function(ptr) {
  SVGZoomAndPanWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGViewSpecWrappingImplementation._wrap$ctor.prototype = SVGViewSpecWrappingImplementation.prototype;
function SVGViewSpecWrappingImplementation() {}
// ********** Code for UIEventWrappingImplementation **************
$inherits(UIEventWrappingImplementation, EventWrappingImplementation);
UIEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
UIEventWrappingImplementation._wrap$ctor.prototype = UIEventWrappingImplementation.prototype;
function UIEventWrappingImplementation() {}
// ********** Code for SVGZoomEventWrappingImplementation **************
$inherits(SVGZoomEventWrappingImplementation, UIEventWrappingImplementation);
SVGZoomEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGZoomEventWrappingImplementation._wrap$ctor.prototype = SVGZoomEventWrappingImplementation.prototype;
function SVGZoomEventWrappingImplementation() {}
// ********** Code for ScreenWrappingImplementation **************
$inherits(ScreenWrappingImplementation, DOMWrapperBase);
ScreenWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ScreenWrappingImplementation._wrap$ctor.prototype = ScreenWrappingImplementation.prototype;
function ScreenWrappingImplementation() {}
// ********** Code for ScriptElementWrappingImplementation **************
$inherits(ScriptElementWrappingImplementation, ElementWrappingImplementation);
ScriptElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ScriptElementWrappingImplementation._wrap$ctor.prototype = ScriptElementWrappingImplementation.prototype;
function ScriptElementWrappingImplementation() {}
ScriptElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ScriptElementWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$text();
}
ScriptElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for SelectElementWrappingImplementation **************
$inherits(SelectElementWrappingImplementation, ElementWrappingImplementation);
SelectElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SelectElementWrappingImplementation._wrap$ctor.prototype = SelectElementWrappingImplementation.prototype;
function SelectElementWrappingImplementation() {}
SelectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SelectElementWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
SelectElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
SelectElementWrappingImplementation.prototype.add = function(element, before) {
  this._ptr.add$2(LevelDom.unwrap(element), LevelDom.unwrap(before));
  return;
}
SelectElementWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapNode(this._ptr.item(index));
}
SelectElementWrappingImplementation.prototype.add$2 = SelectElementWrappingImplementation.prototype.add;
// ********** Code for SourceElementWrappingImplementation **************
$inherits(SourceElementWrappingImplementation, ElementWrappingImplementation);
SourceElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SourceElementWrappingImplementation._wrap$ctor.prototype = SourceElementWrappingImplementation.prototype;
function SourceElementWrappingImplementation() {}
SourceElementWrappingImplementation.prototype.is$html_Element = function(){return true};
SourceElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for SpanElementWrappingImplementation **************
$inherits(SpanElementWrappingImplementation, ElementWrappingImplementation);
SpanElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SpanElementWrappingImplementation._wrap$ctor.prototype = SpanElementWrappingImplementation.prototype;
function SpanElementWrappingImplementation() {}
SpanElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SpeechInputEventWrappingImplementation **************
$inherits(SpeechInputEventWrappingImplementation, EventWrappingImplementation);
SpeechInputEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
SpeechInputEventWrappingImplementation._wrap$ctor.prototype = SpeechInputEventWrappingImplementation.prototype;
function SpeechInputEventWrappingImplementation() {}
// ********** Code for SpeechInputResultListWrappingImplementation **************
$inherits(SpeechInputResultListWrappingImplementation, DOMWrapperBase);
SpeechInputResultListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SpeechInputResultListWrappingImplementation._wrap$ctor.prototype = SpeechInputResultListWrappingImplementation.prototype;
function SpeechInputResultListWrappingImplementation() {}
SpeechInputResultListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
SpeechInputResultListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapSpeechInputResult(this._ptr.item(index));
}
// ********** Code for SpeechInputResultWrappingImplementation **************
$inherits(SpeechInputResultWrappingImplementation, DOMWrapperBase);
SpeechInputResultWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
SpeechInputResultWrappingImplementation._wrap$ctor.prototype = SpeechInputResultWrappingImplementation.prototype;
function SpeechInputResultWrappingImplementation() {}
// ********** Code for StorageInfoWrappingImplementation **************
$inherits(StorageInfoWrappingImplementation, DOMWrapperBase);
StorageInfoWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
StorageInfoWrappingImplementation._wrap$ctor.prototype = StorageInfoWrappingImplementation.prototype;
function StorageInfoWrappingImplementation() {}
// ********** Code for StorageWrappingImplementation **************
$inherits(StorageWrappingImplementation, DOMWrapperBase);
StorageWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
StorageWrappingImplementation._wrap$ctor.prototype = StorageWrappingImplementation.prototype;
function StorageWrappingImplementation() {}
StorageWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
StorageWrappingImplementation.prototype.clear = function() {
  this._ptr.clear$0();
  return;
}
StorageWrappingImplementation.prototype.clear$0 = StorageWrappingImplementation.prototype.clear;
// ********** Code for StyleElementWrappingImplementation **************
$inherits(StyleElementWrappingImplementation, ElementWrappingImplementation);
StyleElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
StyleElementWrappingImplementation._wrap$ctor.prototype = StyleElementWrappingImplementation.prototype;
function StyleElementWrappingImplementation() {}
StyleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
StyleElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for StyleMediaWrappingImplementation **************
$inherits(StyleMediaWrappingImplementation, DOMWrapperBase);
StyleMediaWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
StyleMediaWrappingImplementation._wrap$ctor.prototype = StyleMediaWrappingImplementation.prototype;
function StyleMediaWrappingImplementation() {}
StyleMediaWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for StyleSheetListWrappingImplementation **************
$inherits(StyleSheetListWrappingImplementation, DOMWrapperBase);
StyleSheetListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
StyleSheetListWrappingImplementation._wrap$ctor.prototype = StyleSheetListWrappingImplementation.prototype;
function StyleSheetListWrappingImplementation() {}
StyleSheetListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
StyleSheetListWrappingImplementation.prototype.$index = function(index) {
  return LevelDom.wrapStyleSheet(this._ptr.$index(index));
}
StyleSheetListWrappingImplementation.prototype.$setindex = function(index, value) {
  this._ptr.$setindex(index, LevelDom.unwrap(value));
}
StyleSheetListWrappingImplementation.prototype.add = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
StyleSheetListWrappingImplementation.prototype.addAll = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
StyleSheetListWrappingImplementation.prototype.clear = function() {
  $throw(new UnsupportedOperationException("Cannot clear immutable List."));
}
StyleSheetListWrappingImplementation.prototype.forEach = function(f) {
  _Collections.forEach(this, f);
}
StyleSheetListWrappingImplementation.prototype.filter = function(f) {
  return _Collections.filter(this, new Array(), f);
}
StyleSheetListWrappingImplementation.prototype.iterator = function() {
  return new _FixedSizeListIterator_html_StyleSheet(this);
}
StyleSheetListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapStyleSheet(this._ptr.item(index));
}
StyleSheetListWrappingImplementation.prototype.add$1 = StyleSheetListWrappingImplementation.prototype.add;
StyleSheetListWrappingImplementation.prototype.clear$0 = StyleSheetListWrappingImplementation.prototype.clear;
StyleSheetListWrappingImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
StyleSheetListWrappingImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for TableCaptionElementWrappingImplementation **************
$inherits(TableCaptionElementWrappingImplementation, ElementWrappingImplementation);
TableCaptionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCaptionElementWrappingImplementation._wrap$ctor.prototype = TableCaptionElementWrappingImplementation.prototype;
function TableCaptionElementWrappingImplementation() {}
TableCaptionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableCellElementWrappingImplementation **************
$inherits(TableCellElementWrappingImplementation, ElementWrappingImplementation);
TableCellElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableCellElementWrappingImplementation._wrap$ctor.prototype = TableCellElementWrappingImplementation.prototype;
function TableCellElementWrappingImplementation() {}
TableCellElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableColElementWrappingImplementation **************
$inherits(TableColElementWrappingImplementation, ElementWrappingImplementation);
TableColElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableColElementWrappingImplementation._wrap$ctor.prototype = TableColElementWrappingImplementation.prototype;
function TableColElementWrappingImplementation() {}
TableColElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableElementWrappingImplementation **************
$inherits(TableElementWrappingImplementation, ElementWrappingImplementation);
TableElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableElementWrappingImplementation._wrap$ctor.prototype = TableElementWrappingImplementation.prototype;
function TableElementWrappingImplementation() {}
TableElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableRowElementWrappingImplementation **************
$inherits(TableRowElementWrappingImplementation, ElementWrappingImplementation);
TableRowElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableRowElementWrappingImplementation._wrap$ctor.prototype = TableRowElementWrappingImplementation.prototype;
function TableRowElementWrappingImplementation() {}
TableRowElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TableSectionElementWrappingImplementation **************
$inherits(TableSectionElementWrappingImplementation, ElementWrappingImplementation);
TableSectionElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TableSectionElementWrappingImplementation._wrap$ctor.prototype = TableSectionElementWrappingImplementation.prototype;
function TableSectionElementWrappingImplementation() {}
TableSectionElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TextAreaElementWrappingImplementation **************
$inherits(TextAreaElementWrappingImplementation, ElementWrappingImplementation);
TextAreaElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextAreaElementWrappingImplementation._wrap$ctor.prototype = TextAreaElementWrappingImplementation.prototype;
function TextAreaElementWrappingImplementation() {}
TextAreaElementWrappingImplementation.prototype.is$html_Element = function(){return true};
TextAreaElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for TextMetricsWrappingImplementation **************
$inherits(TextMetricsWrappingImplementation, DOMWrapperBase);
TextMetricsWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TextMetricsWrappingImplementation._wrap$ctor.prototype = TextMetricsWrappingImplementation.prototype;
function TextMetricsWrappingImplementation() {}
// ********** Code for TextTrackCueListWrappingImplementation **************
$inherits(TextTrackCueListWrappingImplementation, DOMWrapperBase);
TextTrackCueListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TextTrackCueListWrappingImplementation._wrap$ctor.prototype = TextTrackCueListWrappingImplementation.prototype;
function TextTrackCueListWrappingImplementation() {}
TextTrackCueListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
TextTrackCueListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapTextTrackCue(this._ptr.item(index));
}
// ********** Code for TextTrackCueWrappingImplementation **************
$inherits(TextTrackCueWrappingImplementation, DOMWrapperBase);
TextTrackCueWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TextTrackCueWrappingImplementation._wrap$ctor.prototype = TextTrackCueWrappingImplementation.prototype;
function TextTrackCueWrappingImplementation() {}
// ********** Code for TextTrackWrappingImplementation **************
$inherits(TextTrackWrappingImplementation, DOMWrapperBase);
TextTrackWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TextTrackWrappingImplementation._wrap$ctor.prototype = TextTrackWrappingImplementation.prototype;
function TextTrackWrappingImplementation() {}
// ********** Code for TimeRangesWrappingImplementation **************
$inherits(TimeRangesWrappingImplementation, DOMWrapperBase);
TimeRangesWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TimeRangesWrappingImplementation._wrap$ctor.prototype = TimeRangesWrappingImplementation.prototype;
function TimeRangesWrappingImplementation() {}
TimeRangesWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for TitleElementWrappingImplementation **************
$inherits(TitleElementWrappingImplementation, ElementWrappingImplementation);
TitleElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TitleElementWrappingImplementation._wrap$ctor.prototype = TitleElementWrappingImplementation.prototype;
function TitleElementWrappingImplementation() {}
TitleElementWrappingImplementation.prototype.is$html_Element = function(){return true};
TitleElementWrappingImplementation.prototype.get$text = function() {
  return this._ptr.get$text();
}
// ********** Code for TouchListWrappingImplementation **************
$inherits(TouchListWrappingImplementation, DOMWrapperBase);
TouchListWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TouchListWrappingImplementation._wrap$ctor.prototype = TouchListWrappingImplementation.prototype;
function TouchListWrappingImplementation() {}
TouchListWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
TouchListWrappingImplementation.prototype.$index = function(index) {
  return LevelDom.wrapTouch(this._ptr.$index(index));
}
TouchListWrappingImplementation.prototype.$setindex = function(index, value) {
  this._ptr.$setindex(index, LevelDom.unwrap(value));
}
TouchListWrappingImplementation.prototype.add = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
TouchListWrappingImplementation.prototype.addAll = function(collection) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
TouchListWrappingImplementation.prototype.clear = function() {
  $throw(new UnsupportedOperationException("Cannot clear immutable List."));
}
TouchListWrappingImplementation.prototype.forEach = function(f) {
  _Collections.forEach(this, f);
}
TouchListWrappingImplementation.prototype.filter = function(f) {
  return _Collections.filter(this, new Array(), f);
}
TouchListWrappingImplementation.prototype.iterator = function() {
  return new _FixedSizeListIterator_html_Touch(this);
}
TouchListWrappingImplementation.prototype.item = function(index) {
  return LevelDom.wrapTouch(this._ptr.item(index));
}
TouchListWrappingImplementation.prototype.add$1 = TouchListWrappingImplementation.prototype.add;
TouchListWrappingImplementation.prototype.clear$0 = TouchListWrappingImplementation.prototype.clear;
TouchListWrappingImplementation.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
TouchListWrappingImplementation.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for TouchWrappingImplementation **************
$inherits(TouchWrappingImplementation, DOMWrapperBase);
TouchWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
TouchWrappingImplementation._wrap$ctor.prototype = TouchWrappingImplementation.prototype;
function TouchWrappingImplementation() {}
// ********** Code for TrackElementWrappingImplementation **************
$inherits(TrackElementWrappingImplementation, ElementWrappingImplementation);
TrackElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
TrackElementWrappingImplementation._wrap$ctor.prototype = TrackElementWrappingImplementation.prototype;
function TrackElementWrappingImplementation() {}
TrackElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for UListElementWrappingImplementation **************
$inherits(UListElementWrappingImplementation, ElementWrappingImplementation);
UListElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UListElementWrappingImplementation._wrap$ctor.prototype = UListElementWrappingImplementation.prototype;
function UListElementWrappingImplementation() {}
UListElementWrappingImplementation.prototype.is$html_Element = function(){return true};
UListElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for UnknownElementWrappingImplementation **************
$inherits(UnknownElementWrappingImplementation, ElementWrappingImplementation);
UnknownElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
UnknownElementWrappingImplementation._wrap$ctor.prototype = UnknownElementWrappingImplementation.prototype;
function UnknownElementWrappingImplementation() {}
UnknownElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for ValidityStateWrappingImplementation **************
$inherits(ValidityStateWrappingImplementation, DOMWrapperBase);
ValidityStateWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
ValidityStateWrappingImplementation._wrap$ctor.prototype = ValidityStateWrappingImplementation.prototype;
function ValidityStateWrappingImplementation() {}
// ********** Code for VideoElementWrappingImplementation **************
$inherits(VideoElementWrappingImplementation, MediaElementWrappingImplementation);
VideoElementWrappingImplementation._wrap$ctor = function(ptr) {
  MediaElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
VideoElementWrappingImplementation._wrap$ctor.prototype = VideoElementWrappingImplementation.prototype;
function VideoElementWrappingImplementation() {}
VideoElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for VoidCallbackWrappingImplementation **************
$inherits(VoidCallbackWrappingImplementation, DOMWrapperBase);
VoidCallbackWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
VoidCallbackWrappingImplementation._wrap$ctor.prototype = VoidCallbackWrappingImplementation.prototype;
function VoidCallbackWrappingImplementation() {}
// ********** Code for WaveShaperNodeWrappingImplementation **************
$inherits(WaveShaperNodeWrappingImplementation, AudioNodeWrappingImplementation);
WaveShaperNodeWrappingImplementation._wrap$ctor = function(ptr) {
  AudioNodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
WaveShaperNodeWrappingImplementation._wrap$ctor.prototype = WaveShaperNodeWrappingImplementation.prototype;
function WaveShaperNodeWrappingImplementation() {}
// ********** Code for WebGLActiveInfoWrappingImplementation **************
$inherits(WebGLActiveInfoWrappingImplementation, DOMWrapperBase);
WebGLActiveInfoWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLActiveInfoWrappingImplementation._wrap$ctor.prototype = WebGLActiveInfoWrappingImplementation.prototype;
function WebGLActiveInfoWrappingImplementation() {}
WebGLActiveInfoWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for WebGLBufferWrappingImplementation **************
$inherits(WebGLBufferWrappingImplementation, DOMWrapperBase);
WebGLBufferWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLBufferWrappingImplementation._wrap$ctor.prototype = WebGLBufferWrappingImplementation.prototype;
function WebGLBufferWrappingImplementation() {}
// ********** Code for WebGLContextAttributesWrappingImplementation **************
$inherits(WebGLContextAttributesWrappingImplementation, DOMWrapperBase);
WebGLContextAttributesWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLContextAttributesWrappingImplementation._wrap$ctor.prototype = WebGLContextAttributesWrappingImplementation.prototype;
function WebGLContextAttributesWrappingImplementation() {}
// ********** Code for WebGLContextEventWrappingImplementation **************
$inherits(WebGLContextEventWrappingImplementation, EventWrappingImplementation);
WebGLContextEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebGLContextEventWrappingImplementation._wrap$ctor.prototype = WebGLContextEventWrappingImplementation.prototype;
function WebGLContextEventWrappingImplementation() {}
// ********** Code for WebGLDebugRendererInfoWrappingImplementation **************
$inherits(WebGLDebugRendererInfoWrappingImplementation, DOMWrapperBase);
WebGLDebugRendererInfoWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLDebugRendererInfoWrappingImplementation._wrap$ctor.prototype = WebGLDebugRendererInfoWrappingImplementation.prototype;
function WebGLDebugRendererInfoWrappingImplementation() {}
// ********** Code for WebGLDebugShadersWrappingImplementation **************
$inherits(WebGLDebugShadersWrappingImplementation, DOMWrapperBase);
WebGLDebugShadersWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLDebugShadersWrappingImplementation._wrap$ctor.prototype = WebGLDebugShadersWrappingImplementation.prototype;
function WebGLDebugShadersWrappingImplementation() {}
// ********** Code for WebGLFramebufferWrappingImplementation **************
$inherits(WebGLFramebufferWrappingImplementation, DOMWrapperBase);
WebGLFramebufferWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLFramebufferWrappingImplementation._wrap$ctor.prototype = WebGLFramebufferWrappingImplementation.prototype;
function WebGLFramebufferWrappingImplementation() {}
// ********** Code for WebGLProgramWrappingImplementation **************
$inherits(WebGLProgramWrappingImplementation, DOMWrapperBase);
WebGLProgramWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLProgramWrappingImplementation._wrap$ctor.prototype = WebGLProgramWrappingImplementation.prototype;
function WebGLProgramWrappingImplementation() {}
// ********** Code for WebGLRenderbufferWrappingImplementation **************
$inherits(WebGLRenderbufferWrappingImplementation, DOMWrapperBase);
WebGLRenderbufferWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLRenderbufferWrappingImplementation._wrap$ctor.prototype = WebGLRenderbufferWrappingImplementation.prototype;
function WebGLRenderbufferWrappingImplementation() {}
// ********** Code for WebGLRenderingContextWrappingImplementation **************
$inherits(WebGLRenderingContextWrappingImplementation, CanvasRenderingContextWrappingImplementation);
WebGLRenderingContextWrappingImplementation._wrap$ctor = function(ptr) {
  CanvasRenderingContextWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebGLRenderingContextWrappingImplementation._wrap$ctor.prototype = WebGLRenderingContextWrappingImplementation.prototype;
function WebGLRenderingContextWrappingImplementation() {}
WebGLRenderingContextWrappingImplementation.prototype.createShader = function(type) {
  return LevelDom.wrapWebGLShader(this._ptr.createShader(type));
}
WebGLRenderingContextWrappingImplementation.prototype.getShaderParameter = function(shader, pname) {
  return LevelDom.wrapObject(this._ptr.getShaderParameter(LevelDom.unwrap(shader), pname));
}
WebGLRenderingContextWrappingImplementation.prototype.shaderSource = function(shader, string) {
  this._ptr.shaderSource(LevelDom.unwrap(shader), string);
  return;
}
// ********** Code for WebGLShaderWrappingImplementation **************
$inherits(WebGLShaderWrappingImplementation, DOMWrapperBase);
WebGLShaderWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLShaderWrappingImplementation._wrap$ctor.prototype = WebGLShaderWrappingImplementation.prototype;
function WebGLShaderWrappingImplementation() {}
// ********** Code for WebGLTextureWrappingImplementation **************
$inherits(WebGLTextureWrappingImplementation, DOMWrapperBase);
WebGLTextureWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLTextureWrappingImplementation._wrap$ctor.prototype = WebGLTextureWrappingImplementation.prototype;
function WebGLTextureWrappingImplementation() {}
// ********** Code for WebGLUniformLocationWrappingImplementation **************
$inherits(WebGLUniformLocationWrappingImplementation, DOMWrapperBase);
WebGLUniformLocationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLUniformLocationWrappingImplementation._wrap$ctor.prototype = WebGLUniformLocationWrappingImplementation.prototype;
function WebGLUniformLocationWrappingImplementation() {}
// ********** Code for WebGLVertexArrayObjectOESWrappingImplementation **************
$inherits(WebGLVertexArrayObjectOESWrappingImplementation, DOMWrapperBase);
WebGLVertexArrayObjectOESWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebGLVertexArrayObjectOESWrappingImplementation._wrap$ctor.prototype = WebGLVertexArrayObjectOESWrappingImplementation.prototype;
function WebGLVertexArrayObjectOESWrappingImplementation() {}
// ********** Code for WebKitCSSFilterValueWrappingImplementation **************
$inherits(WebKitCSSFilterValueWrappingImplementation, CSSValueListWrappingImplementation);
WebKitCSSFilterValueWrappingImplementation._wrap$ctor = function(ptr) {
  CSSValueListWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebKitCSSFilterValueWrappingImplementation._wrap$ctor.prototype = WebKitCSSFilterValueWrappingImplementation.prototype;
function WebKitCSSFilterValueWrappingImplementation() {}
// ********** Code for WebKitMutationObserverWrappingImplementation **************
$inherits(WebKitMutationObserverWrappingImplementation, DOMWrapperBase);
WebKitMutationObserverWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
WebKitMutationObserverWrappingImplementation._wrap$ctor.prototype = WebKitMutationObserverWrappingImplementation.prototype;
function WebKitMutationObserverWrappingImplementation() {}
// ********** Code for XMLHttpRequestExceptionWrappingImplementation **************
$inherits(XMLHttpRequestExceptionWrappingImplementation, DOMWrapperBase);
XMLHttpRequestExceptionWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
XMLHttpRequestExceptionWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestExceptionWrappingImplementation.prototype;
function XMLHttpRequestExceptionWrappingImplementation() {}
XMLHttpRequestExceptionWrappingImplementation.prototype.toString = function() {
  return this._ptr.toString();
}
// ********** Code for LevelDom **************
function LevelDom() {}
LevelDom.wrapAnimation = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new AnimationWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapCSSRule = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "CSSCharsetRule":

      return new CSSCharsetRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSFontFaceRule":

      return new CSSFontFaceRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSImportRule":

      return new CSSImportRuleWrappingImplementation._wrap$ctor(raw);

    case "WebKitCSSKeyframeRule":

      return new CSSKeyframeRuleWrappingImplementation._wrap$ctor(raw);

    case "WebKitCSSKeyframesRule":

      return new CSSKeyframesRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSMediaRule":

      return new CSSMediaRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSPageRule":

      return new CSSPageRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSRule":

      return new CSSRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSStyleRule":

      return new CSSStyleRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSUnknownRule":

      return new CSSUnknownRuleWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapCSSValue = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "CSSPrimitiveValue":

      return new CSSPrimitiveValueWrappingImplementation._wrap$ctor(raw);

    case "WebKitCSSTransformValue":

      return new CSSTransformValueWrappingImplementation._wrap$ctor(raw);

    case "CSSValue":

      return new CSSValueWrappingImplementation._wrap$ctor(raw);

    case "CSSValueList":

      return new CSSValueListWrappingImplementation._wrap$ctor(raw);

    case "SVGColor":

      return new SVGColorWrappingImplementation._wrap$ctor(raw);

    case "SVGPaint":

      return new SVGPaintWrappingImplementation._wrap$ctor(raw);

    case "WebKitCSSFilterValue":

      return new WebKitCSSFilterValueWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapCanvasRenderingContext = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "CanvasRenderingContext":

      return new CanvasRenderingContextWrappingImplementation._wrap$ctor(raw);

    case "CanvasRenderingContext2D":

      return new CanvasRenderingContext2DWrappingImplementation._wrap$ctor(raw);

    case "WebGLRenderingContext":

      return new WebGLRenderingContextWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapClientRect = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new ClientRectWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapDOMMimeType = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new DOMMimeTypeWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapDOMPlugin = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new DOMPluginWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapDataTransferItem = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new DataTransferItemWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapDocument = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapElement = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapEntry = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "DirectoryEntry":

      return new DirectoryEntryWrappingImplementation._wrap$ctor(raw);

    case "Entry":

      return new EntryWrappingImplementation._wrap$ctor(raw);

    case "FileEntry":

      return new FileEntryWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapEntrySync = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "DirectoryEntrySync":

      return new DirectoryEntrySyncWrappingImplementation._wrap$ctor(raw);

    case "EntrySync":

      return new EntrySyncWrappingImplementation._wrap$ctor(raw);

    case "FileEntrySync":

      return new FileEntrySyncWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapFile = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new FileWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapIDBRequest = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "IDBRequest":

      return new IDBRequestWrappingImplementation._wrap$ctor(raw);

    case "IDBVersionChangeRequest":

      return new IDBVersionChangeRequestWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapNode = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "CDATASection":

      return new CDATASectionWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "CharacterData":

      return new CharacterDataWrappingImplementation._wrap$ctor(raw);

    case "Comment":

      return new CommentWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "DocumentFragment":

      return new DocumentFragmentWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "Entity":

      return new EntityWrappingImplementation._wrap$ctor(raw);

    case "EntityReference":

      return new EntityReferenceWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "Node":

      return new NodeWrappingImplementation._wrap$ctor(raw);

    case "Notation":

      return new NotationWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "ProcessingInstruction":

      return new ProcessingInstructionWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "Text":

      return new TextWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapSVGAnimatedEnumeration = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGAnimatedEnumerationWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGElementInstance = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGElementInstanceWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSVGElementInstanceList = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SVGElementInstanceListWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapSpeechInputResult = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new SpeechInputResultWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapStyleSheet = function(raw) {
  if (null == raw) {
    return null;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "CSSStyleSheet":

      return new CSSStyleSheetWrappingImplementation._wrap$ctor(raw);

    case "StyleSheet":

      return new StyleSheetWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.wrapTextTrackCue = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new TextTrackCueWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapTouch = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new TouchWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapWebGLShader = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new WebGLShaderWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapWindow = function(raw) {
  return null == raw ? null : null != raw.get$dartObjectLocalStorage() ? raw.get$dartObjectLocalStorage() : new WindowWrappingImplementation._wrap$ctor(raw);
}
LevelDom.wrapObject = function(raw) {
  if (null == raw || (typeof(raw) == 'string') || (typeof(raw) == 'number') || !!(raw && raw.is$Date())) {
    return raw;
  }
  if (null != raw.get$dartObjectLocalStorage()) {
    return raw.get$dartObjectLocalStorage();
  }
  switch (raw.get$typeName()) {
    case "HTMLAnchorElement":

      return new AnchorElementWrappingImplementation._wrap$ctor(raw);

    case "WebKitAnimation":

      return new AnimationWrappingImplementation._wrap$ctor(raw);

    case "WebKitAnimationEvent":

      return new AnimationEventWrappingImplementation._wrap$ctor(raw);

    case "WebKitAnimationList":

      return new AnimationListWrappingImplementation._wrap$ctor(raw);

    case "HTMLAreaElement":

      return new AreaElementWrappingImplementation._wrap$ctor(raw);

    case "ArrayBuffer":

      return new ArrayBufferWrappingImplementation._wrap$ctor(raw);

    case "ArrayBufferView":

      return new ArrayBufferViewWrappingImplementation._wrap$ctor(raw);

    case "AudioBuffer":

      return new AudioBufferWrappingImplementation._wrap$ctor(raw);

    case "AudioBufferSourceNode":

      return new AudioBufferSourceNodeWrappingImplementation._wrap$ctor(raw);

    case "AudioChannelMerger":

      return new AudioChannelMergerWrappingImplementation._wrap$ctor(raw);

    case "AudioChannelSplitter":

      return new AudioChannelSplitterWrappingImplementation._wrap$ctor(raw);

    case "AudioContext":

      return new AudioContextWrappingImplementation._wrap$ctor(raw);

    case "AudioDestinationNode":

      return new AudioDestinationNodeWrappingImplementation._wrap$ctor(raw);

    case "HTMLAudioElement":

      return new AudioElementWrappingImplementation._wrap$ctor(raw);

    case "AudioGain":

      return new AudioGainWrappingImplementation._wrap$ctor(raw);

    case "AudioGainNode":

      return new AudioGainNodeWrappingImplementation._wrap$ctor(raw);

    case "AudioListener":

      return new AudioListenerWrappingImplementation._wrap$ctor(raw);

    case "AudioNode":

      return new AudioNodeWrappingImplementation._wrap$ctor(raw);

    case "AudioPannerNode":

      return new AudioPannerNodeWrappingImplementation._wrap$ctor(raw);

    case "AudioParam":

      return new AudioParamWrappingImplementation._wrap$ctor(raw);

    case "AudioProcessingEvent":

      return new AudioProcessingEventWrappingImplementation._wrap$ctor(raw);

    case "AudioSourceNode":

      return new AudioSourceNodeWrappingImplementation._wrap$ctor(raw);

    case "HTMLBRElement":

      return new BRElementWrappingImplementation._wrap$ctor(raw);

    case "BarInfo":

      return new BarInfoWrappingImplementation._wrap$ctor(raw);

    case "HTMLBaseElement":

      return new BaseElementWrappingImplementation._wrap$ctor(raw);

    case "BeforeLoadEvent":

      return new BeforeLoadEventWrappingImplementation._wrap$ctor(raw);

    case "BiquadFilterNode":

      return new BiquadFilterNodeWrappingImplementation._wrap$ctor(raw);

    case "Blob":

      return new BlobWrappingImplementation._wrap$ctor(raw);

    case "WebKitBlobBuilder":

      return new BlobBuilderWrappingImplementation._wrap$ctor(raw);

    case "HTMLBodyElement":

      return new BodyElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLButtonElement":

      return new ButtonElementWrappingImplementation._wrap$ctor(raw);

    case "CDATASection":

      return new CDATASectionWrappingImplementation._wrap$ctor(raw);

    case "CSSCharsetRule":

      return new CSSCharsetRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSFontFaceRule":

      return new CSSFontFaceRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSImportRule":

      return new CSSImportRuleWrappingImplementation._wrap$ctor(raw);

    case "WebKitCSSKeyframeRule":

      return new CSSKeyframeRuleWrappingImplementation._wrap$ctor(raw);

    case "WebKitCSSKeyframesRule":

      return new CSSKeyframesRuleWrappingImplementation._wrap$ctor(raw);

    case "WebKitCSSMatrix":

      return new CSSMatrixWrappingImplementation._wrap$ctor(raw);

    case "CSSMediaRule":

      return new CSSMediaRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSPageRule":

      return new CSSPageRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSPrimitiveValue":

      return new CSSPrimitiveValueWrappingImplementation._wrap$ctor(raw);

    case "CSSRule":

      return new CSSRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSRuleList":

      return new CSSRuleListWrappingImplementation._wrap$ctor(raw);

    case "CSSStyleDeclaration":

      return new CSSStyleDeclarationWrappingImplementation._wrap$ctor(raw);

    case "CSSStyleRule":

      return new CSSStyleRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSStyleSheet":

      return new CSSStyleSheetWrappingImplementation._wrap$ctor(raw);

    case "WebKitCSSTransformValue":

      return new CSSTransformValueWrappingImplementation._wrap$ctor(raw);

    case "CSSUnknownRule":

      return new CSSUnknownRuleWrappingImplementation._wrap$ctor(raw);

    case "CSSValue":

      return new CSSValueWrappingImplementation._wrap$ctor(raw);

    case "CSSValueList":

      return new CSSValueListWrappingImplementation._wrap$ctor(raw);

    case "HTMLCanvasElement":

      return new CanvasElementWrappingImplementation._wrap$ctor(raw);

    case "CanvasGradient":

      return new CanvasGradientWrappingImplementation._wrap$ctor(raw);

    case "CanvasPattern":

      return new CanvasPatternWrappingImplementation._wrap$ctor(raw);

    case "CanvasPixelArray":

      return new CanvasPixelArrayWrappingImplementation._wrap$ctor(raw);

    case "CanvasRenderingContext":

      return new CanvasRenderingContextWrappingImplementation._wrap$ctor(raw);

    case "CanvasRenderingContext2D":

      return new CanvasRenderingContext2DWrappingImplementation._wrap$ctor(raw);

    case "CharacterData":

      return new CharacterDataWrappingImplementation._wrap$ctor(raw);

    case "ClientRect":

      return new ClientRectWrappingImplementation._wrap$ctor(raw);

    case "ClientRectList":

      return new ClientRectListWrappingImplementation._wrap$ctor(raw);

    case "Clipboard":

      return new ClipboardWrappingImplementation._wrap$ctor(raw);

    case "CloseEvent":

      return new CloseEventWrappingImplementation._wrap$ctor(raw);

    case "Comment":

      return new CommentWrappingImplementation._wrap$ctor(raw);

    case "CompositionEvent":

      return new CompositionEventWrappingImplementation._wrap$ctor(raw);

    case "Console":

      return new ConsoleWrappingImplementation._wrap$ctor(raw);

    case "ConvolverNode":

      return new ConvolverNodeWrappingImplementation._wrap$ctor(raw);

    case "Coordinates":

      return new CoordinatesWrappingImplementation._wrap$ctor(raw);

    case "Counter":

      return new CounterWrappingImplementation._wrap$ctor(raw);

    case "Crypto":

      return new CryptoWrappingImplementation._wrap$ctor(raw);

    case "CustomEvent":

      return new CustomEventWrappingImplementation._wrap$ctor(raw);

    case "HTMLDListElement":

      return new DListElementWrappingImplementation._wrap$ctor(raw);

    case "DOMApplicationCache":

      return new DOMApplicationCacheWrappingImplementation._wrap$ctor(raw);

    case "DOMException":

      return new DOMExceptionWrappingImplementation._wrap$ctor(raw);

    case "DOMFileSystem":

      return new DOMFileSystemWrappingImplementation._wrap$ctor(raw);

    case "DOMFileSystemSync":

      return new DOMFileSystemSyncWrappingImplementation._wrap$ctor(raw);

    case "DOMFormData":

      return new DOMFormDataWrappingImplementation._wrap$ctor(raw);

    case "DOMMimeType":

      return new DOMMimeTypeWrappingImplementation._wrap$ctor(raw);

    case "DOMMimeTypeArray":

      return new DOMMimeTypeArrayWrappingImplementation._wrap$ctor(raw);

    case "DOMParser":

      return new DOMParserWrappingImplementation._wrap$ctor(raw);

    case "DOMPlugin":

      return new DOMPluginWrappingImplementation._wrap$ctor(raw);

    case "DOMPluginArray":

      return new DOMPluginArrayWrappingImplementation._wrap$ctor(raw);

    case "DOMSelection":

      return new DOMSelectionWrappingImplementation._wrap$ctor(raw);

    case "DOMSettableTokenList":

      return new DOMSettableTokenListWrappingImplementation._wrap$ctor(raw);

    case "DOMTokenList":

      return new DOMTokenListWrappingImplementation._wrap$ctor(raw);

    case "DOMURL":

      return new DOMURLWrappingImplementation._wrap$ctor(raw);

    case "HTMLDataListElement":

      return new DataListElementWrappingImplementation._wrap$ctor(raw);

    case "DataTransferItem":

      return new DataTransferItemWrappingImplementation._wrap$ctor(raw);

    case "DataTransferItemList":

      return new DataTransferItemListWrappingImplementation._wrap$ctor(raw);

    case "DataView":

      return new DataViewWrappingImplementation._wrap$ctor(raw);

    case "DelayNode":

      return new DelayNodeWrappingImplementation._wrap$ctor(raw);

    case "HTMLDetailsElement":

      return new DetailsElementWrappingImplementation._wrap$ctor(raw);

    case "DeviceMotionEvent":

      return new DeviceMotionEventWrappingImplementation._wrap$ctor(raw);

    case "DeviceOrientationEvent":

      return new DeviceOrientationEventWrappingImplementation._wrap$ctor(raw);

    case "DirectoryEntry":

      return new DirectoryEntryWrappingImplementation._wrap$ctor(raw);

    case "DirectoryEntrySync":

      return new DirectoryEntrySyncWrappingImplementation._wrap$ctor(raw);

    case "DirectoryReader":

      return new DirectoryReaderWrappingImplementation._wrap$ctor(raw);

    case "DirectoryReaderSync":

      return new DirectoryReaderSyncWrappingImplementation._wrap$ctor(raw);

    case "HTMLDivElement":

      return new DivElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLDocument":

      return new DocumentWrappingImplementation._wrap$ctor(raw, raw.get$documentElement());

    case "DocumentFragment":

      return new DocumentFragmentWrappingImplementation._wrap$ctor(raw);

    case "DynamicsCompressorNode":

      return new DynamicsCompressorNodeWrappingImplementation._wrap$ctor(raw);

    case "HTMLElement":

      return new ElementWrappingImplementation._wrap$ctor(raw);

    case "ElementTimeControl":

      return new ElementTimeControlWrappingImplementation._wrap$ctor(raw);

    case "HTMLEmbedElement":

      return new EmbedElementWrappingImplementation._wrap$ctor(raw);

    case "Entity":

      return new EntityWrappingImplementation._wrap$ctor(raw);

    case "EntityReference":

      return new EntityReferenceWrappingImplementation._wrap$ctor(raw);

    case "Entry":

      return new EntryWrappingImplementation._wrap$ctor(raw);

    case "EntryArray":

      return new EntryArrayWrappingImplementation._wrap$ctor(raw);

    case "EntryArraySync":

      return new EntryArraySyncWrappingImplementation._wrap$ctor(raw);

    case "EntrySync":

      return new EntrySyncWrappingImplementation._wrap$ctor(raw);

    case "ErrorEvent":

      return new ErrorEventWrappingImplementation._wrap$ctor(raw);

    case "Event":

      return new EventWrappingImplementation._wrap$ctor(raw);

    case "EventException":

      return new EventExceptionWrappingImplementation._wrap$ctor(raw);

    case "EventSource":

      return new EventSourceWrappingImplementation._wrap$ctor(raw);

    case "EventTarget":

      return new EventTargetWrappingImplementation._wrap$ctor(raw);

    case "HTMLFieldSetElement":

      return new FieldSetElementWrappingImplementation._wrap$ctor(raw);

    case "File":

      return new FileWrappingImplementation._wrap$ctor(raw);

    case "FileEntry":

      return new FileEntryWrappingImplementation._wrap$ctor(raw);

    case "FileEntrySync":

      return new FileEntrySyncWrappingImplementation._wrap$ctor(raw);

    case "FileError":

      return new FileErrorWrappingImplementation._wrap$ctor(raw);

    case "FileException":

      return new FileExceptionWrappingImplementation._wrap$ctor(raw);

    case "FileList":

      return new FileListWrappingImplementation._wrap$ctor(raw);

    case "FileReader":

      return new FileReaderWrappingImplementation._wrap$ctor(raw);

    case "FileReaderSync":

      return new FileReaderSyncWrappingImplementation._wrap$ctor(raw);

    case "FileWriter":

      return new FileWriterWrappingImplementation._wrap$ctor(raw);

    case "FileWriterSync":

      return new FileWriterSyncWrappingImplementation._wrap$ctor(raw);

    case "WebKitFlags":

      return new FlagsWrappingImplementation._wrap$ctor(raw);

    case "Float32Array":

      return new Float32ArrayWrappingImplementation._wrap$ctor(raw);

    case "Float64Array":

      return new Float64ArrayWrappingImplementation._wrap$ctor(raw);

    case "HTMLFontElement":

      return new FontElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLFormElement":

      return new FormElementWrappingImplementation._wrap$ctor(raw);

    case "Geolocation":

      return new GeolocationWrappingImplementation._wrap$ctor(raw);

    case "Geoposition":

      return new GeopositionWrappingImplementation._wrap$ctor(raw);

    case "HTMLHRElement":

      return new HRElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLAllCollection":

      return new HTMLAllCollectionWrappingImplementation._wrap$ctor(raw);

    case "HashChangeEvent":

      return new HashChangeEventWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadElement":

      return new HeadElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLHeadingElement":

      return new HeadingElementWrappingImplementation._wrap$ctor(raw);

    case "HighPass2FilterNode":

      return new HighPass2FilterNodeWrappingImplementation._wrap$ctor(raw);

    case "History":

      return new HistoryWrappingImplementation._wrap$ctor(raw);

    case "HTMLHtmlElement":

      return new DocumentWrappingImplementation._wrap$ctor(raw.get$parentNode(), raw);

    case "IDBAny":

      return new IDBAnyWrappingImplementation._wrap$ctor(raw);

    case "IDBCursor":

      return new IDBCursorWrappingImplementation._wrap$ctor(raw);

    case "IDBCursorWithValue":

      return new IDBCursorWithValueWrappingImplementation._wrap$ctor(raw);

    case "IDBDatabase":

      return new IDBDatabaseWrappingImplementation._wrap$ctor(raw);

    case "IDBDatabaseError":

      return new IDBDatabaseErrorWrappingImplementation._wrap$ctor(raw);

    case "IDBDatabaseException":

      return new IDBDatabaseExceptionWrappingImplementation._wrap$ctor(raw);

    case "IDBFactory":

      return new IDBFactoryWrappingImplementation._wrap$ctor(raw);

    case "IDBIndex":

      return new IDBIndexWrappingImplementation._wrap$ctor(raw);

    case "IDBKey":

      return new IDBKeyWrappingImplementation._wrap$ctor(raw);

    case "IDBKeyRange":

      return new IDBKeyRangeWrappingImplementation._wrap$ctor(raw);

    case "IDBObjectStore":

      return new IDBObjectStoreWrappingImplementation._wrap$ctor(raw);

    case "IDBRequest":

      return new IDBRequestWrappingImplementation._wrap$ctor(raw);

    case "IDBTransaction":

      return new IDBTransactionWrappingImplementation._wrap$ctor(raw);

    case "IDBVersionChangeEvent":

      return new IDBVersionChangeEventWrappingImplementation._wrap$ctor(raw);

    case "IDBVersionChangeRequest":

      return new IDBVersionChangeRequestWrappingImplementation._wrap$ctor(raw);

    case "HTMLIFrameElement":

      return new IFrameElementWrappingImplementation._wrap$ctor(raw);

    case "ImageData":

      return new ImageDataWrappingImplementation._wrap$ctor(raw);

    case "HTMLImageElement":

      return new ImageElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLInputElement":

      return new InputElementWrappingImplementation._wrap$ctor(raw);

    case "Int16Array":

      return new Int16ArrayWrappingImplementation._wrap$ctor(raw);

    case "Int32Array":

      return new Int32ArrayWrappingImplementation._wrap$ctor(raw);

    case "Int8Array":

      return new Int8ArrayWrappingImplementation._wrap$ctor(raw);

    case "JavaScriptAudioNode":

      return new JavaScriptAudioNodeWrappingImplementation._wrap$ctor(raw);

    case "KeyboardEvent":

      return new KeyboardEventWrappingImplementation._wrap$ctor(raw);

    case "HTMLKeygenElement":

      return new KeygenElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLIElement":

      return new LIElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLabelElement":

      return new LabelElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLegendElement":

      return new LegendElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLLinkElement":

      return new LinkElementWrappingImplementation._wrap$ctor(raw);

    case "Location":

      return new LocationWrappingImplementation._wrap$ctor(raw);

    case "WebKitLoseContext":

      return new LoseContextWrappingImplementation._wrap$ctor(raw);

    case "LowPass2FilterNode":

      return new LowPass2FilterNodeWrappingImplementation._wrap$ctor(raw);

    case "HTMLMapElement":

      return new MapElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMarqueeElement":

      return new MarqueeElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLMediaElement":

      return new MediaElementWrappingImplementation._wrap$ctor(raw);

    case "MediaElementAudioSourceNode":

      return new MediaElementAudioSourceNodeWrappingImplementation._wrap$ctor(raw);

    case "MediaError":

      return new MediaErrorWrappingImplementation._wrap$ctor(raw);

    case "MediaList":

      return new MediaListWrappingImplementation._wrap$ctor(raw);

    case "MediaQueryList":

      return new MediaQueryListWrappingImplementation._wrap$ctor(raw);

    case "MediaQueryListListener":

      return new MediaQueryListListenerWrappingImplementation._wrap$ctor(raw);

    case "HTMLMenuElement":

      return new MenuElementWrappingImplementation._wrap$ctor(raw);

    case "MessageChannel":

      return new MessageChannelWrappingImplementation._wrap$ctor(raw);

    case "MessageEvent":

      return new MessageEventWrappingImplementation._wrap$ctor(raw);

    case "MessagePort":

      return new MessagePortWrappingImplementation._wrap$ctor(raw);

    case "HTMLMetaElement":

      return new MetaElementWrappingImplementation._wrap$ctor(raw);

    case "Metadata":

      return new MetadataWrappingImplementation._wrap$ctor(raw);

    case "HTMLMeterElement":

      return new MeterElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLModElement":

      return new ModElementWrappingImplementation._wrap$ctor(raw);

    case "MouseEvent":

      return new MouseEventWrappingImplementation._wrap$ctor(raw);

    case "MutationCallback":

      return new MutationCallbackWrappingImplementation._wrap$ctor(raw);

    case "MutationEvent":

      return new MutationEventWrappingImplementation._wrap$ctor(raw);

    case "MutationRecord":

      return new MutationRecordWrappingImplementation._wrap$ctor(raw);

    case "Navigator":

      return new NavigatorWrappingImplementation._wrap$ctor(raw);

    case "NavigatorUserMediaError":

      return new NavigatorUserMediaErrorWrappingImplementation._wrap$ctor(raw);

    case "NavigatorUserMediaSuccessCallback":

      return new NavigatorUserMediaSuccessCallbackWrappingImplementation._wrap$ctor(raw);

    case "Node":

      return new NodeWrappingImplementation._wrap$ctor(raw);

    case "Notation":

      return new NotationWrappingImplementation._wrap$ctor(raw);

    case "Notification":

      return new NotificationWrappingImplementation._wrap$ctor(raw);

    case "NotificationCenter":

      return new NotificationCenterWrappingImplementation._wrap$ctor(raw);

    case "OESStandardDerivatives":

      return new OESStandardDerivativesWrappingImplementation._wrap$ctor(raw);

    case "OESTextureFloat":

      return new OESTextureFloatWrappingImplementation._wrap$ctor(raw);

    case "OESVertexArrayObject":

      return new OESVertexArrayObjectWrappingImplementation._wrap$ctor(raw);

    case "HTMLOListElement":

      return new OListElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLObjectElement":

      return new ObjectElementWrappingImplementation._wrap$ctor(raw);

    case "OfflineAudioCompletionEvent":

      return new OfflineAudioCompletionEventWrappingImplementation._wrap$ctor(raw);

    case "OperationNotAllowedException":

      return new OperationNotAllowedExceptionWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptGroupElement":

      return new OptGroupElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOptionElement":

      return new OptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLOutputElement":

      return new OutputElementWrappingImplementation._wrap$ctor(raw);

    case "OverflowEvent":

      return new OverflowEventWrappingImplementation._wrap$ctor(raw);

    case "PageTransitionEvent":

      return new PageTransitionEventWrappingImplementation._wrap$ctor(raw);

    case "HTMLParagraphElement":

      return new ParagraphElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLParamElement":

      return new ParamElementWrappingImplementation._wrap$ctor(raw);

    case "WebKitPoint":

      return new PointWrappingImplementation._wrap$ctor(raw);

    case "PopStateEvent":

      return new PopStateEventWrappingImplementation._wrap$ctor(raw);

    case "PositionError":

      return new PositionErrorWrappingImplementation._wrap$ctor(raw);

    case "HTMLPreElement":

      return new PreElementWrappingImplementation._wrap$ctor(raw);

    case "ProcessingInstruction":

      return new ProcessingInstructionWrappingImplementation._wrap$ctor(raw);

    case "HTMLProgressElement":

      return new ProgressElementWrappingImplementation._wrap$ctor(raw);

    case "ProgressEvent":

      return new ProgressEventWrappingImplementation._wrap$ctor(raw);

    case "HTMLQuoteElement":

      return new QuoteElementWrappingImplementation._wrap$ctor(raw);

    case "RGBColor":

      return new RGBColorWrappingImplementation._wrap$ctor(raw);

    case "Range":

      return new RangeWrappingImplementation._wrap$ctor(raw);

    case "RangeException":

      return new RangeExceptionWrappingImplementation._wrap$ctor(raw);

    case "RealtimeAnalyserNode":

      return new RealtimeAnalyserNodeWrappingImplementation._wrap$ctor(raw);

    case "Rect":

      return new RectWrappingImplementation._wrap$ctor(raw);

    case "SVGAElement":

      return new SVGAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphDefElement":

      return new SVGAltGlyphDefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphElement":

      return new SVGAltGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAltGlyphItemElement":

      return new SVGAltGlyphItemElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAngle":

      return new SVGAngleWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateColorElement":

      return new SVGAnimateColorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateElement":

      return new SVGAnimateElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateMotionElement":

      return new SVGAnimateMotionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimateTransformElement":

      return new SVGAnimateTransformElementWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedAngle":

      return new SVGAnimatedAngleWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedBoolean":

      return new SVGAnimatedBooleanWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedEnumeration":

      return new SVGAnimatedEnumerationWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedInteger":

      return new SVGAnimatedIntegerWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedLength":

      return new SVGAnimatedLengthWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedLengthList":

      return new SVGAnimatedLengthListWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedNumber":

      return new SVGAnimatedNumberWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedNumberList":

      return new SVGAnimatedNumberListWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedPreserveAspectRatio":

      return new SVGAnimatedPreserveAspectRatioWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedRect":

      return new SVGAnimatedRectWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedString":

      return new SVGAnimatedStringWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimatedTransformList":

      return new SVGAnimatedTransformListWrappingImplementation._wrap$ctor(raw);

    case "SVGAnimationElement":

      return new SVGAnimationElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCircleElement":

      return new SVGCircleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGClipPathElement":

      return new SVGClipPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGColor":

      return new SVGColorWrappingImplementation._wrap$ctor(raw);

    case "SVGComponentTransferFunctionElement":

      return new SVGComponentTransferFunctionElementWrappingImplementation._wrap$ctor(raw);

    case "SVGCursorElement":

      return new SVGCursorElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDefsElement":

      return new SVGDefsElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDescElement":

      return new SVGDescElementWrappingImplementation._wrap$ctor(raw);

    case "SVGDocument":

      return new SVGDocumentWrappingImplementation._wrap$ctor(raw);

    case "SVGElement":

      return new SVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGElementInstance":

      return new SVGElementInstanceWrappingImplementation._wrap$ctor(raw);

    case "SVGElementInstanceList":

      return new SVGElementInstanceListWrappingImplementation._wrap$ctor(raw);

    case "SVGEllipseElement":

      return new SVGEllipseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGException":

      return new SVGExceptionWrappingImplementation._wrap$ctor(raw);

    case "SVGExternalResourcesRequired":

      return new SVGExternalResourcesRequiredWrappingImplementation._wrap$ctor(raw);

    case "SVGFEBlendElement":

      return new SVGFEBlendElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEColorMatrixElement":

      return new SVGFEColorMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEComponentTransferElement":

      return new SVGFEComponentTransferElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEConvolveMatrixElement":

      return new SVGFEConvolveMatrixElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDiffuseLightingElement":

      return new SVGFEDiffuseLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDisplacementMapElement":

      return new SVGFEDisplacementMapElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDistantLightElement":

      return new SVGFEDistantLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEDropShadowElement":

      return new SVGFEDropShadowElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFloodElement":

      return new SVGFEFloodElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncAElement":

      return new SVGFEFuncAElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncBElement":

      return new SVGFEFuncBElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncGElement":

      return new SVGFEFuncGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEFuncRElement":

      return new SVGFEFuncRElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEGaussianBlurElement":

      return new SVGFEGaussianBlurElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEImageElement":

      return new SVGFEImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeElement":

      return new SVGFEMergeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEMergeNodeElement":

      return new SVGFEMergeNodeElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEOffsetElement":

      return new SVGFEOffsetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFEPointLightElement":

      return new SVGFEPointLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpecularLightingElement":

      return new SVGFESpecularLightingElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFESpotLightElement":

      return new SVGFESpotLightElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETileElement":

      return new SVGFETileElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFETurbulenceElement":

      return new SVGFETurbulenceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterElement":

      return new SVGFilterElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFilterPrimitiveStandardAttributes":

      return new SVGFilterPrimitiveStandardAttributesWrappingImplementation._wrap$ctor(raw);

    case "SVGFitToViewBox":

      return new SVGFitToViewBoxWrappingImplementation._wrap$ctor(raw);

    case "SVGFontElement":

      return new SVGFontElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceElement":

      return new SVGFontFaceElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceFormatElement":

      return new SVGFontFaceFormatElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceNameElement":

      return new SVGFontFaceNameElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceSrcElement":

      return new SVGFontFaceSrcElementWrappingImplementation._wrap$ctor(raw);

    case "SVGFontFaceUriElement":

      return new SVGFontFaceUriElementWrappingImplementation._wrap$ctor(raw);

    case "SVGForeignObjectElement":

      return new SVGForeignObjectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGElement":

      return new SVGGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphElement":

      return new SVGGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGlyphRefElement":

      return new SVGGlyphRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGGradientElement":

      return new SVGGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGHKernElement":

      return new SVGHKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGImageElement":

      return new SVGImageElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLangSpace":

      return new SVGLangSpaceWrappingImplementation._wrap$ctor(raw);

    case "SVGLength":

      return new SVGLengthWrappingImplementation._wrap$ctor(raw);

    case "SVGLengthList":

      return new SVGLengthListWrappingImplementation._wrap$ctor(raw);

    case "SVGLineElement":

      return new SVGLineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLinearGradientElement":

      return new SVGLinearGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGLocatable":

      return new SVGLocatableWrappingImplementation._wrap$ctor(raw);

    case "SVGMPathElement":

      return new SVGMPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMarkerElement":

      return new SVGMarkerElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMaskElement":

      return new SVGMaskElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMatrix":

      return new SVGMatrixWrappingImplementation._wrap$ctor(raw);

    case "SVGMetadataElement":

      return new SVGMetadataElementWrappingImplementation._wrap$ctor(raw);

    case "SVGMissingGlyphElement":

      return new SVGMissingGlyphElementWrappingImplementation._wrap$ctor(raw);

    case "SVGNumber":

      return new SVGNumberWrappingImplementation._wrap$ctor(raw);

    case "SVGNumberList":

      return new SVGNumberListWrappingImplementation._wrap$ctor(raw);

    case "SVGPaint":

      return new SVGPaintWrappingImplementation._wrap$ctor(raw);

    case "SVGPathElement":

      return new SVGPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSeg":

      return new SVGPathSegWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegArcAbs":

      return new SVGPathSegArcAbsWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegArcRel":

      return new SVGPathSegArcRelWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegClosePath":

      return new SVGPathSegClosePathWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegCurvetoCubicAbs":

      return new SVGPathSegCurvetoCubicAbsWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegCurvetoCubicRel":

      return new SVGPathSegCurvetoCubicRelWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegCurvetoCubicSmoothAbs":

      return new SVGPathSegCurvetoCubicSmoothAbsWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegCurvetoCubicSmoothRel":

      return new SVGPathSegCurvetoCubicSmoothRelWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegCurvetoQuadraticAbs":

      return new SVGPathSegCurvetoQuadraticAbsWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegCurvetoQuadraticRel":

      return new SVGPathSegCurvetoQuadraticRelWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegCurvetoQuadraticSmoothAbs":

      return new SVGPathSegCurvetoQuadraticSmoothAbsWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegCurvetoQuadraticSmoothRel":

      return new SVGPathSegCurvetoQuadraticSmoothRelWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegLinetoAbs":

      return new SVGPathSegLinetoAbsWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegLinetoHorizontalAbs":

      return new SVGPathSegLinetoHorizontalAbsWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegLinetoHorizontalRel":

      return new SVGPathSegLinetoHorizontalRelWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegLinetoRel":

      return new SVGPathSegLinetoRelWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegLinetoVerticalAbs":

      return new SVGPathSegLinetoVerticalAbsWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegLinetoVerticalRel":

      return new SVGPathSegLinetoVerticalRelWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegList":

      return new SVGPathSegListWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegMovetoAbs":

      return new SVGPathSegMovetoAbsWrappingImplementation._wrap$ctor(raw);

    case "SVGPathSegMovetoRel":

      return new SVGPathSegMovetoRelWrappingImplementation._wrap$ctor(raw);

    case "SVGPatternElement":

      return new SVGPatternElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPoint":

      return new SVGPointWrappingImplementation._wrap$ctor(raw);

    case "SVGPointList":

      return new SVGPointListWrappingImplementation._wrap$ctor(raw);

    case "SVGPolygonElement":

      return new SVGPolygonElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPolylineElement":

      return new SVGPolylineElementWrappingImplementation._wrap$ctor(raw);

    case "SVGPreserveAspectRatio":

      return new SVGPreserveAspectRatioWrappingImplementation._wrap$ctor(raw);

    case "SVGRadialGradientElement":

      return new SVGRadialGradientElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRect":

      return new SVGRectWrappingImplementation._wrap$ctor(raw);

    case "SVGRectElement":

      return new SVGRectElementWrappingImplementation._wrap$ctor(raw);

    case "SVGRenderingIntent":

      return new SVGRenderingIntentWrappingImplementation._wrap$ctor(raw);

    case "SVGSVGElement":

      return new SVGSVGElementWrappingImplementation._wrap$ctor(raw);

    case "SVGScriptElement":

      return new SVGScriptElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSetElement":

      return new SVGSetElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStopElement":

      return new SVGStopElementWrappingImplementation._wrap$ctor(raw);

    case "SVGStringList":

      return new SVGStringListWrappingImplementation._wrap$ctor(raw);

    case "SVGStylable":

      return new SVGStylableWrappingImplementation._wrap$ctor(raw);

    case "SVGStyleElement":

      return new SVGStyleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSwitchElement":

      return new SVGSwitchElementWrappingImplementation._wrap$ctor(raw);

    case "SVGSymbolElement":

      return new SVGSymbolElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTRefElement":

      return new SVGTRefElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTSpanElement":

      return new SVGTSpanElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTests":

      return new SVGTestsWrappingImplementation._wrap$ctor(raw);

    case "SVGTextContentElement":

      return new SVGTextContentElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextElement":

      return new SVGTextElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPathElement":

      return new SVGTextPathElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTextPositioningElement":

      return new SVGTextPositioningElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTitleElement":

      return new SVGTitleElementWrappingImplementation._wrap$ctor(raw);

    case "SVGTransform":

      return new SVGTransformWrappingImplementation._wrap$ctor(raw);

    case "SVGTransformList":

      return new SVGTransformListWrappingImplementation._wrap$ctor(raw);

    case "SVGTransformable":

      return new SVGTransformableWrappingImplementation._wrap$ctor(raw);

    case "SVGURIReference":

      return new SVGURIReferenceWrappingImplementation._wrap$ctor(raw);

    case "SVGUnitTypes":

      return new SVGUnitTypesWrappingImplementation._wrap$ctor(raw);

    case "SVGUseElement":

      return new SVGUseElementWrappingImplementation._wrap$ctor(raw);

    case "SVGVKernElement":

      return new SVGVKernElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewElement":

      return new SVGViewElementWrappingImplementation._wrap$ctor(raw);

    case "SVGViewSpec":

      return new SVGViewSpecWrappingImplementation._wrap$ctor(raw);

    case "SVGZoomAndPan":

      return new SVGZoomAndPanWrappingImplementation._wrap$ctor(raw);

    case "SVGZoomEvent":

      return new SVGZoomEventWrappingImplementation._wrap$ctor(raw);

    case "Screen":

      return new ScreenWrappingImplementation._wrap$ctor(raw);

    case "HTMLScriptElement":

      return new ScriptElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSelectElement":

      return new SelectElementWrappingImplementation._wrap$ctor(raw);

    case "SharedWorker":

      return new SharedWorkerWrappingImplementation._wrap$ctor(raw);

    case "HTMLSourceElement":

      return new SourceElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLSpanElement":

      return new SpanElementWrappingImplementation._wrap$ctor(raw);

    case "SpeechInputEvent":

      return new SpeechInputEventWrappingImplementation._wrap$ctor(raw);

    case "SpeechInputResult":

      return new SpeechInputResultWrappingImplementation._wrap$ctor(raw);

    case "SpeechInputResultList":

      return new SpeechInputResultListWrappingImplementation._wrap$ctor(raw);

    case "Storage":

      return new StorageWrappingImplementation._wrap$ctor(raw);

    case "StorageEvent":

      return new StorageEventWrappingImplementation._wrap$ctor(raw);

    case "StorageInfo":

      return new StorageInfoWrappingImplementation._wrap$ctor(raw);

    case "HTMLStyleElement":

      return new StyleElementWrappingImplementation._wrap$ctor(raw);

    case "StyleMedia":

      return new StyleMediaWrappingImplementation._wrap$ctor(raw);

    case "StyleSheet":

      return new StyleSheetWrappingImplementation._wrap$ctor(raw);

    case "StyleSheetList":

      return new StyleSheetListWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCaptionElement":

      return new TableCaptionElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableCellElement":

      return new TableCellElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableColElement":

      return new TableColElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableElement":

      return new TableElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableRowElement":

      return new TableRowElementWrappingImplementation._wrap$ctor(raw);

    case "HTMLTableSectionElement":

      return new TableSectionElementWrappingImplementation._wrap$ctor(raw);

    case "Text":

      return new TextWrappingImplementation._wrap$ctor(raw);

    case "HTMLTextAreaElement":

      return new TextAreaElementWrappingImplementation._wrap$ctor(raw);

    case "TextEvent":

      return new TextEventWrappingImplementation._wrap$ctor(raw);

    case "TextMetrics":

      return new TextMetricsWrappingImplementation._wrap$ctor(raw);

    case "TextTrack":

      return new TextTrackWrappingImplementation._wrap$ctor(raw);

    case "TextTrackCue":

      return new TextTrackCueWrappingImplementation._wrap$ctor(raw);

    case "TextTrackCueList":

      return new TextTrackCueListWrappingImplementation._wrap$ctor(raw);

    case "TimeRanges":

      return new TimeRangesWrappingImplementation._wrap$ctor(raw);

    case "HTMLTitleElement":

      return new TitleElementWrappingImplementation._wrap$ctor(raw);

    case "Touch":

      return new TouchWrappingImplementation._wrap$ctor(raw);

    case "TouchEvent":

      return new TouchEventWrappingImplementation._wrap$ctor(raw);

    case "TouchList":

      return new TouchListWrappingImplementation._wrap$ctor(raw);

    case "HTMLTrackElement":

      return new TrackElementWrappingImplementation._wrap$ctor(raw);

    case "WebKitTransitionEvent":

      return new TransitionEventWrappingImplementation._wrap$ctor(raw);

    case "UIEvent":

      return new UIEventWrappingImplementation._wrap$ctor(raw);

    case "HTMLUListElement":

      return new UListElementWrappingImplementation._wrap$ctor(raw);

    case "Uint16Array":

      return new Uint16ArrayWrappingImplementation._wrap$ctor(raw);

    case "Uint32Array":

      return new Uint32ArrayWrappingImplementation._wrap$ctor(raw);

    case "Uint8Array":

      return new Uint8ArrayWrappingImplementation._wrap$ctor(raw);

    case "HTMLUnknownElement":

      return new UnknownElementWrappingImplementation._wrap$ctor(raw);

    case "ValidityState":

      return new ValidityStateWrappingImplementation._wrap$ctor(raw);

    case "HTMLVideoElement":

      return new VideoElementWrappingImplementation._wrap$ctor(raw);

    case "VoidCallback":

      return new VoidCallbackWrappingImplementation._wrap$ctor(raw);

    case "WaveShaperNode":

      return new WaveShaperNodeWrappingImplementation._wrap$ctor(raw);

    case "WebGLActiveInfo":

      return new WebGLActiveInfoWrappingImplementation._wrap$ctor(raw);

    case "WebGLBuffer":

      return new WebGLBufferWrappingImplementation._wrap$ctor(raw);

    case "WebGLContextAttributes":

      return new WebGLContextAttributesWrappingImplementation._wrap$ctor(raw);

    case "WebGLContextEvent":

      return new WebGLContextEventWrappingImplementation._wrap$ctor(raw);

    case "WebGLDebugRendererInfo":

      return new WebGLDebugRendererInfoWrappingImplementation._wrap$ctor(raw);

    case "WebGLDebugShaders":

      return new WebGLDebugShadersWrappingImplementation._wrap$ctor(raw);

    case "WebGLFramebuffer":

      return new WebGLFramebufferWrappingImplementation._wrap$ctor(raw);

    case "WebGLProgram":

      return new WebGLProgramWrappingImplementation._wrap$ctor(raw);

    case "WebGLRenderbuffer":

      return new WebGLRenderbufferWrappingImplementation._wrap$ctor(raw);

    case "WebGLRenderingContext":

      return new WebGLRenderingContextWrappingImplementation._wrap$ctor(raw);

    case "WebGLShader":

      return new WebGLShaderWrappingImplementation._wrap$ctor(raw);

    case "WebGLTexture":

      return new WebGLTextureWrappingImplementation._wrap$ctor(raw);

    case "WebGLUniformLocation":

      return new WebGLUniformLocationWrappingImplementation._wrap$ctor(raw);

    case "WebGLVertexArrayObjectOES":

      return new WebGLVertexArrayObjectOESWrappingImplementation._wrap$ctor(raw);

    case "WebKitCSSFilterValue":

      return new WebKitCSSFilterValueWrappingImplementation._wrap$ctor(raw);

    case "WebKitMutationObserver":

      return new WebKitMutationObserverWrappingImplementation._wrap$ctor(raw);

    case "WebSocket":

      return new WebSocketWrappingImplementation._wrap$ctor(raw);

    case "WheelEvent":

      return new WheelEventWrappingImplementation._wrap$ctor(raw);

    case "Window":

      return new WindowWrappingImplementation._wrap$ctor(raw);

    case "Worker":

      return new WorkerWrappingImplementation._wrap$ctor(raw);

    case "XMLHttpRequest":

      return new XMLHttpRequestWrappingImplementation._wrap$ctor(raw);

    case "XMLHttpRequestException":

      return new XMLHttpRequestExceptionWrappingImplementation._wrap$ctor(raw);

    case "XMLHttpRequestProgressEvent":

      return new XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor(raw);

    case "XMLHttpRequestUpload":

      return new XMLHttpRequestUploadWrappingImplementation._wrap$ctor(raw);

    default:

      $throw(new UnsupportedOperationException($add("Unknown type:", raw.toString())));

  }
}
LevelDom.unwrap = function(raw) {
  return null == raw ? null : raw.get$_ptr();
}
LevelDom.initialize = function() {
  $globals.secretWindow = LevelDom.wrapWindow(get$window());
  $globals.secretDocument = LevelDom.wrapDocument(get$document());
}
// ********** Code for _Collections **************
function _Collections() {}
_Collections.forEach = function(iterable, f) {
  for (var $$i = iterable.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    f(e);
  }
}
_Collections.filter = function(source, destination, f) {
  for (var $$i = source.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (f(e)) destination.add(e);
  }
  return destination;
}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._htmlimpl_list.get$length() > this._htmlimpl_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  return this._htmlimpl_list.$index(this._htmlimpl_pos++);
}
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._htmlimpl_length > this._htmlimpl_pos;
}
// ********** Code for _VariableSizeListIterator_dart_core_String **************
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(list) {
  this._htmlimpl_list = list;
  this._htmlimpl_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dart_core_String **************
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(list) {
  this._htmlimpl_length = list.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, list);
}
// ********** Code for _VariableSizeListIterator_int **************
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(list) {
  this._htmlimpl_list = list;
  this._htmlimpl_pos = (0);
}
// ********** Code for _FixedSizeListIterator_int **************
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(list) {
  this._htmlimpl_length = list.get$length();
  _VariableSizeListIterator_int.call(this, list);
}
// ********** Code for _VariableSizeListIterator_html_StyleSheet **************
$inherits(_VariableSizeListIterator_html_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_html_StyleSheet(list) {
  this._htmlimpl_list = list;
  this._htmlimpl_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_StyleSheet **************
$inherits(_FixedSizeListIterator_html_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_html_StyleSheet(list) {
  this._htmlimpl_length = list.get$length();
  _VariableSizeListIterator_html_StyleSheet.call(this, list);
}
// ********** Code for _VariableSizeListIterator_html_Touch **************
$inherits(_VariableSizeListIterator_html_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_html_Touch(list) {
  this._htmlimpl_list = list;
  this._htmlimpl_pos = (0);
}
// ********** Code for _FixedSizeListIterator_html_Touch **************
$inherits(_FixedSizeListIterator_html_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_html_Touch(list) {
  this._htmlimpl_length = list.get$length();
  _VariableSizeListIterator_html_Touch.call(this, list);
}
// ********** Code for AbstractWorkerWrappingImplementation **************
$inherits(AbstractWorkerWrappingImplementation, EventTargetWrappingImplementation);
AbstractWorkerWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
AbstractWorkerWrappingImplementation._wrap$ctor.prototype = AbstractWorkerWrappingImplementation.prototype;
function AbstractWorkerWrappingImplementation() {}
// ********** Code for AnimationEventWrappingImplementation **************
$inherits(AnimationEventWrappingImplementation, EventWrappingImplementation);
AnimationEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
AnimationEventWrappingImplementation._wrap$ctor.prototype = AnimationEventWrappingImplementation.prototype;
function AnimationEventWrappingImplementation() {}
// ********** Code for BeforeLoadEventWrappingImplementation **************
$inherits(BeforeLoadEventWrappingImplementation, EventWrappingImplementation);
BeforeLoadEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
BeforeLoadEventWrappingImplementation._wrap$ctor.prototype = BeforeLoadEventWrappingImplementation.prototype;
function BeforeLoadEventWrappingImplementation() {}
// ********** Code for BodyElementWrappingImplementation **************
$inherits(BodyElementWrappingImplementation, ElementWrappingImplementation);
BodyElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
BodyElementWrappingImplementation._wrap$ctor.prototype = BodyElementWrappingImplementation.prototype;
function BodyElementWrappingImplementation() {}
BodyElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for CloseEventWrappingImplementation **************
$inherits(CloseEventWrappingImplementation, EventWrappingImplementation);
CloseEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CloseEventWrappingImplementation._wrap$ctor.prototype = CloseEventWrappingImplementation.prototype;
function CloseEventWrappingImplementation() {}
// ********** Code for CompositionEventWrappingImplementation **************
$inherits(CompositionEventWrappingImplementation, UIEventWrappingImplementation);
CompositionEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CompositionEventWrappingImplementation._wrap$ctor.prototype = CompositionEventWrappingImplementation.prototype;
function CompositionEventWrappingImplementation() {}
// ********** Code for CSSStyleDeclarationWrappingImplementation **************
$inherits(CSSStyleDeclarationWrappingImplementation, DOMWrapperBase);
CSSStyleDeclarationWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
CSSStyleDeclarationWrappingImplementation._wrap$ctor.prototype = CSSStyleDeclarationWrappingImplementation.prototype;
function CSSStyleDeclarationWrappingImplementation() {}
CSSStyleDeclarationWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
CSSStyleDeclarationWrappingImplementation.prototype.item = function(index) {
  return this._ptr.item(index);
}
CSSStyleDeclarationWrappingImplementation.prototype.get$typeName = function() {
  return "CSSStyleDeclaration";
}
// ********** Code for CustomEventWrappingImplementation **************
$inherits(CustomEventWrappingImplementation, EventWrappingImplementation);
CustomEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
CustomEventWrappingImplementation._wrap$ctor.prototype = CustomEventWrappingImplementation.prototype;
function CustomEventWrappingImplementation() {}
// ********** Code for DeviceMotionEventWrappingImplementation **************
$inherits(DeviceMotionEventWrappingImplementation, EventWrappingImplementation);
DeviceMotionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
DeviceMotionEventWrappingImplementation._wrap$ctor.prototype = DeviceMotionEventWrappingImplementation.prototype;
function DeviceMotionEventWrappingImplementation() {}
// ********** Code for DeviceOrientationEventWrappingImplementation **************
$inherits(DeviceOrientationEventWrappingImplementation, EventWrappingImplementation);
DeviceOrientationEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
DeviceOrientationEventWrappingImplementation._wrap$ctor.prototype = DeviceOrientationEventWrappingImplementation.prototype;
function DeviceOrientationEventWrappingImplementation() {}
// ********** Code for FilteredElementList **************
function FilteredElementList(node) {
  this._node = node;
  this._childNodes = node.get$nodes();
}
FilteredElementList.prototype.get$_filtered = function() {
  return ListFactory.ListFactory$from$factory(this._childNodes.filter((function (n) {
    return !!(n && n.is$html_Element());
  })
  ));
}
FilteredElementList.prototype.get$first = function() {
  var $$list = this._childNodes;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var node = $$i.next();
    if (!!(node && node.is$html_Element())) {
      return node;
    }
  }
  return null;
}
FilteredElementList.prototype.forEach = function(f) {
  this.get$_filtered().forEach(f);
}
FilteredElementList.prototype.$setindex = function(index, value) {
  this.$index(index).replaceWith(value);
}
FilteredElementList.prototype.add = function(value) {
  this._childNodes.add(value);
}
FilteredElementList.prototype.get$add = function() {
  return this.add.bind(this);
}
FilteredElementList.prototype.addAll = function(collection) {
  collection.forEach(this.get$add());
}
FilteredElementList.prototype.clear = function() {
  this._childNodes.clear();
}
FilteredElementList.prototype.filter = function(f) {
  return this.get$_filtered().filter$1(f);
}
FilteredElementList.prototype.get$length = function() {
  return this.get$_filtered().get$length();
}
FilteredElementList.prototype.$index = function(index) {
  return this.get$_filtered().$index(index);
}
FilteredElementList.prototype.iterator = function() {
  return this.get$_filtered().iterator();
}
FilteredElementList.prototype.add$1 = FilteredElementList.prototype.add;
FilteredElementList.prototype.clear$0 = FilteredElementList.prototype.clear;
FilteredElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
FilteredElementList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for DocumentFragmentWrappingImplementation **************
$inherits(DocumentFragmentWrappingImplementation, NodeWrappingImplementation);
DocumentFragmentWrappingImplementation._wrap$ctor = function(ptr) {
  NodeWrappingImplementation._wrap$ctor.call(this, ptr);
}
DocumentFragmentWrappingImplementation._wrap$ctor.prototype = DocumentFragmentWrappingImplementation.prototype;
function DocumentFragmentWrappingImplementation() {}
DocumentFragmentWrappingImplementation.prototype.is$html_Element = function(){return true};
DocumentFragmentWrappingImplementation.prototype.get$elements = function() {
  if (this._elements == null) {
    this._elements = new FilteredElementList(this);
  }
  return this._elements;
}
DocumentFragmentWrappingImplementation.prototype.set$innerHTML = function(value) {
  this.get$nodes().clear();
  var e = ElementWrappingImplementation.ElementWrappingImplementation$tag$factory("div");
  e.set$innerHTML(value);
  var nodes = ListFactory.ListFactory$from$factory(e.get$nodes());
  this.get$nodes().addAll(nodes);
}
DocumentFragmentWrappingImplementation.prototype.query = function(selectors) {
  return LevelDom.wrapElement(this._ptr.querySelector(selectors));
}
DocumentFragmentWrappingImplementation.prototype.get$firstElementChild = function() {
  return this.get$elements().first();
}
// ********** Code for DocumentWrappingImplementation **************
$inherits(DocumentWrappingImplementation, ElementWrappingImplementation);
DocumentWrappingImplementation._wrap$ctor = function(_documentPtr, ptr) {
  this._documentPtr = _documentPtr;
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
  this._documentPtr.get$dynamic().set$dartObjectLocalStorage(this);
}
DocumentWrappingImplementation._wrap$ctor.prototype = DocumentWrappingImplementation.prototype;
function DocumentWrappingImplementation() {}
DocumentWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for DOMApplicationCacheWrappingImplementation **************
$inherits(DOMApplicationCacheWrappingImplementation, EventTargetWrappingImplementation);
DOMApplicationCacheWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
DOMApplicationCacheWrappingImplementation._wrap$ctor.prototype = DOMApplicationCacheWrappingImplementation.prototype;
function DOMApplicationCacheWrappingImplementation() {}
// ********** Code for _ChildrenElementList **************
_ChildrenElementList._wrap$ctor = function(element) {
  this._childElements = element.get$children();
  this._element = element;
}
_ChildrenElementList._wrap$ctor.prototype = _ChildrenElementList.prototype;
function _ChildrenElementList() {}
_ChildrenElementList.prototype._toList = function() {
  var output = new Array(this._childElements.get$length());
  for (var i = (0), len = this._childElements.get$length();
   i < len; i++) {
    output.$setindex(i, LevelDom.wrapElement(this._childElements.$index(i)));
  }
  return output;
}
_ChildrenElementList.prototype.get$first = function() {
  return LevelDom.wrapElement(this._element.get$firstElementChild());
}
_ChildrenElementList.prototype.forEach = function(f) {
  return this._toList().forEach$1(f);
}
_ChildrenElementList.prototype.filter = function(f) {
  return new _ElementList(this._toList().filter$1(f));
}
_ChildrenElementList.prototype.get$length = function() {
  return this._childElements.get$length();
}
_ChildrenElementList.prototype.$index = function(index) {
  return LevelDom.wrapElement(this._childElements.$index(index));
}
_ChildrenElementList.prototype.$setindex = function(index, value) {
  this._element.replaceChild(LevelDom.unwrap(value), this._childElements.item(index));
}
_ChildrenElementList.prototype.add = function(value) {
  this._element.appendChild(LevelDom.unwrap(value));
  return value;
}
_ChildrenElementList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenElementList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var element = $$i.next();
    this._element.appendChild(LevelDom.unwrap(element));
  }
}
_ChildrenElementList.prototype.clear = function() {
  this._element.set$textContent("");
}
_ChildrenElementList.prototype.add$1 = _ChildrenElementList.prototype.add;
_ChildrenElementList.prototype.clear$0 = _ChildrenElementList.prototype.clear;
_ChildrenElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ChildrenElementList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ListWrapper **************
function _ListWrapper() {}
_ListWrapper.prototype.iterator = function() {
  return this._list.iterator();
}
_ListWrapper.prototype.forEach = function(f) {
  return this._list.forEach(f);
}
_ListWrapper.prototype.filter = function(f) {
  return this._list.filter(f);
}
_ListWrapper.prototype.get$length = function() {
  return this._list.get$length();
}
_ListWrapper.prototype.$index = function(index) {
  return this._list.$index(index);
}
_ListWrapper.prototype.$setindex = function(index, value) {
  this._list.$setindex(index, value);
}
_ListWrapper.prototype.add = function(value) {
  return this._list.add(value);
}
_ListWrapper.prototype.addAll = function(collection) {
  return this._list.addAll(collection);
}
_ListWrapper.prototype.clear = function() {
  return this._list.clear();
}
_ListWrapper.prototype.get$first = function() {
  return this._list.$index((0));
}
_ListWrapper.prototype.add$1 = _ListWrapper.prototype.add;
_ListWrapper.prototype.clear$0 = _ListWrapper.prototype.clear;
_ListWrapper.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ListWrapper_Element **************
$inherits(_ListWrapper_Element, _ListWrapper);
function _ListWrapper_Element(_list) {
  this._list = _list;
}
_ListWrapper_Element.prototype.add$1 = _ListWrapper_Element.prototype.add;
_ListWrapper_Element.prototype.clear$0 = _ListWrapper_Element.prototype.clear;
_ListWrapper_Element.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_Element.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ElementList **************
$inherits(_ElementList, _ListWrapper_Element);
function _ElementList(list) {
  _ListWrapper_Element.call(this, list);
}
_ElementList.prototype.filter = function(f) {
  return new _ElementList(_ListWrapper_Element.prototype.filter.call(this, f));
}
_ElementList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for ErrorEventWrappingImplementation **************
$inherits(ErrorEventWrappingImplementation, EventWrappingImplementation);
ErrorEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
ErrorEventWrappingImplementation._wrap$ctor.prototype = ErrorEventWrappingImplementation.prototype;
function ErrorEventWrappingImplementation() {}
// ********** Code for EventSourceWrappingImplementation **************
$inherits(EventSourceWrappingImplementation, EventTargetWrappingImplementation);
EventSourceWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
EventSourceWrappingImplementation._wrap$ctor.prototype = EventSourceWrappingImplementation.prototype;
function EventSourceWrappingImplementation() {}
// ********** Code for Float32ArrayWrappingImplementation **************
$inherits(Float32ArrayWrappingImplementation, ArrayBufferViewWrappingImplementation);
Float32ArrayWrappingImplementation._wrap$ctor = function(ptr) {
  ArrayBufferViewWrappingImplementation._wrap$ctor.call(this, ptr);
}
Float32ArrayWrappingImplementation._wrap$ctor.prototype = Float32ArrayWrappingImplementation.prototype;
function Float32ArrayWrappingImplementation() {}
Float32ArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for Float64ArrayWrappingImplementation **************
$inherits(Float64ArrayWrappingImplementation, ArrayBufferViewWrappingImplementation);
Float64ArrayWrappingImplementation._wrap$ctor = function(ptr) {
  ArrayBufferViewWrappingImplementation._wrap$ctor.call(this, ptr);
}
Float64ArrayWrappingImplementation._wrap$ctor.prototype = Float64ArrayWrappingImplementation.prototype;
function Float64ArrayWrappingImplementation() {}
Float64ArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for HashChangeEventWrappingImplementation **************
$inherits(HashChangeEventWrappingImplementation, EventWrappingImplementation);
HashChangeEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
HashChangeEventWrappingImplementation._wrap$ctor.prototype = HashChangeEventWrappingImplementation.prototype;
function HashChangeEventWrappingImplementation() {}
// ********** Code for Int16ArrayWrappingImplementation **************
$inherits(Int16ArrayWrappingImplementation, ArrayBufferViewWrappingImplementation);
Int16ArrayWrappingImplementation._wrap$ctor = function(ptr) {
  ArrayBufferViewWrappingImplementation._wrap$ctor.call(this, ptr);
}
Int16ArrayWrappingImplementation._wrap$ctor.prototype = Int16ArrayWrappingImplementation.prototype;
function Int16ArrayWrappingImplementation() {}
Int16ArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for Int32ArrayWrappingImplementation **************
$inherits(Int32ArrayWrappingImplementation, ArrayBufferViewWrappingImplementation);
Int32ArrayWrappingImplementation._wrap$ctor = function(ptr) {
  ArrayBufferViewWrappingImplementation._wrap$ctor.call(this, ptr);
}
Int32ArrayWrappingImplementation._wrap$ctor.prototype = Int32ArrayWrappingImplementation.prototype;
function Int32ArrayWrappingImplementation() {}
Int32ArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for Int8ArrayWrappingImplementation **************
$inherits(Int8ArrayWrappingImplementation, ArrayBufferViewWrappingImplementation);
Int8ArrayWrappingImplementation._wrap$ctor = function(ptr) {
  ArrayBufferViewWrappingImplementation._wrap$ctor.call(this, ptr);
}
Int8ArrayWrappingImplementation._wrap$ctor.prototype = Int8ArrayWrappingImplementation.prototype;
function Int8ArrayWrappingImplementation() {}
Int8ArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for KeyboardEventWrappingImplementation **************
$inherits(KeyboardEventWrappingImplementation, UIEventWrappingImplementation);
KeyboardEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
KeyboardEventWrappingImplementation._wrap$ctor.prototype = KeyboardEventWrappingImplementation.prototype;
function KeyboardEventWrappingImplementation() {}
// ********** Code for LoseContextWrappingImplementation **************
$inherits(LoseContextWrappingImplementation, DOMWrapperBase);
LoseContextWrappingImplementation._wrap$ctor = function(ptr) {
  DOMWrapperBase._wrap$ctor.call(this, ptr);
}
LoseContextWrappingImplementation._wrap$ctor.prototype = LoseContextWrappingImplementation.prototype;
function LoseContextWrappingImplementation() {}
// ********** Code for MessageEventWrappingImplementation **************
$inherits(MessageEventWrappingImplementation, EventWrappingImplementation);
MessageEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MessageEventWrappingImplementation._wrap$ctor.prototype = MessageEventWrappingImplementation.prototype;
function MessageEventWrappingImplementation() {}
// ********** Code for MessagePortWrappingImplementation **************
$inherits(MessagePortWrappingImplementation, EventTargetWrappingImplementation);
MessagePortWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
MessagePortWrappingImplementation._wrap$ctor.prototype = MessagePortWrappingImplementation.prototype;
function MessagePortWrappingImplementation() {}
// ********** Code for MouseEventWrappingImplementation **************
$inherits(MouseEventWrappingImplementation, UIEventWrappingImplementation);
MouseEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MouseEventWrappingImplementation._wrap$ctor.prototype = MouseEventWrappingImplementation.prototype;
function MouseEventWrappingImplementation() {}
// ********** Code for MutationEventWrappingImplementation **************
$inherits(MutationEventWrappingImplementation, EventWrappingImplementation);
MutationEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
MutationEventWrappingImplementation._wrap$ctor.prototype = MutationEventWrappingImplementation.prototype;
function MutationEventWrappingImplementation() {}
// ********** Code for _ChildrenNodeList **************
_ChildrenNodeList._wrap$ctor = function(node) {
  this._node = node;
  this._childNodes = node.get$childNodes();
}
_ChildrenNodeList._wrap$ctor.prototype = _ChildrenNodeList.prototype;
function _ChildrenNodeList() {}
_ChildrenNodeList.prototype._toList = function() {
  var output = new Array(this._childNodes.get$length());
  for (var i = (0), len = this._childNodes.get$length();
   i < len; i++) {
    output.$setindex(i, LevelDom.wrapNode(this._childNodes.$index(i)));
  }
  return output;
}
_ChildrenNodeList.prototype.get$first = function() {
  return LevelDom.wrapNode(this._node.get$firstChild());
}
_ChildrenNodeList.prototype.forEach = function(f) {
  return this._toList().forEach$1(f);
}
_ChildrenNodeList.prototype.filter = function(f) {
  return new _NodeList(this._toList().filter$1(f));
}
_ChildrenNodeList.prototype.get$length = function() {
  return this._childNodes.get$length();
}
_ChildrenNodeList.prototype.$index = function(index) {
  return LevelDom.wrapNode(this._childNodes.$index(index));
}
_ChildrenNodeList.prototype.$setindex = function(index, value) {
  this._node.replaceChild(LevelDom.unwrap(value), this._childNodes.$index(index));
}
_ChildrenNodeList.prototype.add = function(value) {
  this._node.appendChild(LevelDom.unwrap(value));
  return value;
}
_ChildrenNodeList.prototype.iterator = function() {
  return this._toList().iterator();
}
_ChildrenNodeList.prototype.addAll = function(collection) {
  for (var $$i = collection.iterator(); $$i.hasNext(); ) {
    var node = $$i.next();
    this._node.appendChild(LevelDom.unwrap(node));
  }
}
_ChildrenNodeList.prototype.clear = function() {
  this._node.set$textContent("");
}
_ChildrenNodeList.prototype.add$1 = _ChildrenNodeList.prototype.add;
_ChildrenNodeList.prototype.clear$0 = _ChildrenNodeList.prototype.clear;
_ChildrenNodeList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ChildrenNodeList.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _ListWrapper_Node **************
$inherits(_ListWrapper_Node, _ListWrapper);
function _ListWrapper_Node(_list) {
  this._list = _list;
}
_ListWrapper_Node.prototype.add$1 = _ListWrapper_Node.prototype.add;
_ListWrapper_Node.prototype.clear$0 = _ListWrapper_Node.prototype.clear;
_ListWrapper_Node.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
_ListWrapper_Node.prototype.forEach$1 = function($0) {
  return this.forEach(to$call$1($0));
};
// ********** Code for _NodeList **************
$inherits(_NodeList, _ListWrapper_Node);
function _NodeList(list) {
  _ListWrapper_Node.call(this, list);
}
_NodeList.prototype.filter = function(f) {
  return new _NodeList(_ListWrapper_Node.prototype.filter.call(this, f));
}
_NodeList.prototype.filter$1 = function($0) {
  return this.filter(to$call$1($0));
};
// ********** Code for NotificationWrappingImplementation **************
$inherits(NotificationWrappingImplementation, EventTargetWrappingImplementation);
NotificationWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
NotificationWrappingImplementation._wrap$ctor.prototype = NotificationWrappingImplementation.prototype;
function NotificationWrappingImplementation() {}
NotificationWrappingImplementation.prototype.get$typeName = function() {
  return "Notification";
}
// ********** Code for ObjectElementWrappingImplementation **************
$inherits(ObjectElementWrappingImplementation, ElementWrappingImplementation);
ObjectElementWrappingImplementation._wrap$ctor = function(ptr) {
  ElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
ObjectElementWrappingImplementation._wrap$ctor.prototype = ObjectElementWrappingImplementation.prototype;
function ObjectElementWrappingImplementation() {}
ObjectElementWrappingImplementation.prototype.is$html_Element = function(){return true};
ObjectElementWrappingImplementation.prototype.get$type = function() {
  return this._ptr.get$type();
}
// ********** Code for OverflowEventWrappingImplementation **************
$inherits(OverflowEventWrappingImplementation, EventWrappingImplementation);
OverflowEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
OverflowEventWrappingImplementation._wrap$ctor.prototype = OverflowEventWrappingImplementation.prototype;
function OverflowEventWrappingImplementation() {}
// ********** Code for PageTransitionEventWrappingImplementation **************
$inherits(PageTransitionEventWrappingImplementation, EventWrappingImplementation);
PageTransitionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
PageTransitionEventWrappingImplementation._wrap$ctor.prototype = PageTransitionEventWrappingImplementation.prototype;
function PageTransitionEventWrappingImplementation() {}
// ********** Code for PopStateEventWrappingImplementation **************
$inherits(PopStateEventWrappingImplementation, EventWrappingImplementation);
PopStateEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
PopStateEventWrappingImplementation._wrap$ctor.prototype = PopStateEventWrappingImplementation.prototype;
function PopStateEventWrappingImplementation() {}
// ********** Code for ProgressEventWrappingImplementation **************
$inherits(ProgressEventWrappingImplementation, EventWrappingImplementation);
ProgressEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
ProgressEventWrappingImplementation._wrap$ctor.prototype = ProgressEventWrappingImplementation.prototype;
function ProgressEventWrappingImplementation() {}
// ********** Code for SharedWorkerWrappingImplementation **************
$inherits(SharedWorkerWrappingImplementation, AbstractWorkerWrappingImplementation);
SharedWorkerWrappingImplementation._wrap$ctor = function(ptr) {
  AbstractWorkerWrappingImplementation._wrap$ctor.call(this, ptr);
}
SharedWorkerWrappingImplementation._wrap$ctor.prototype = SharedWorkerWrappingImplementation.prototype;
function SharedWorkerWrappingImplementation() {}
// ********** Code for StorageEventWrappingImplementation **************
$inherits(StorageEventWrappingImplementation, EventWrappingImplementation);
StorageEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
StorageEventWrappingImplementation._wrap$ctor.prototype = StorageEventWrappingImplementation.prototype;
function StorageEventWrappingImplementation() {}
// ********** Code for SVGDocumentWrappingImplementation **************
$inherits(SVGDocumentWrappingImplementation, DocumentWrappingImplementation);
SVGDocumentWrappingImplementation._wrap$ctor = function(ptr) {
  DocumentWrappingImplementation._wrap$ctor.call(this, ptr, ptr.rootElement);
}
SVGDocumentWrappingImplementation._wrap$ctor.prototype = SVGDocumentWrappingImplementation.prototype;
function SVGDocumentWrappingImplementation() {}
SVGDocumentWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for SVGElementInstanceWrappingImplementation **************
$inherits(SVGElementInstanceWrappingImplementation, EventTargetWrappingImplementation);
SVGElementInstanceWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGElementInstanceWrappingImplementation._wrap$ctor.prototype = SVGElementInstanceWrappingImplementation.prototype;
function SVGElementInstanceWrappingImplementation() {}
SVGElementInstanceWrappingImplementation.prototype.get$childNodes = function() {
  return LevelDom.wrapSVGElementInstanceList(this._ptr.get$childNodes());
}
SVGElementInstanceWrappingImplementation.prototype.get$firstChild = function() {
  return LevelDom.wrapSVGElementInstance(this._ptr.get$firstChild());
}
SVGElementInstanceWrappingImplementation.prototype.get$parentNode = function() {
  return LevelDom.wrapSVGElementInstance(this._ptr.get$parentNode());
}
// ********** Code for SVGSVGElementWrappingImplementation **************
$inherits(SVGSVGElementWrappingImplementation, SVGElementWrappingImplementation);
SVGSVGElementWrappingImplementation._wrap$ctor = function(ptr) {
  SVGElementWrappingImplementation._wrap$ctor.call(this, ptr);
}
SVGSVGElementWrappingImplementation._wrap$ctor.prototype = SVGSVGElementWrappingImplementation.prototype;
function SVGSVGElementWrappingImplementation() {}
SVGSVGElementWrappingImplementation.prototype.is$html_Element = function(){return true};
// ********** Code for TextEventWrappingImplementation **************
$inherits(TextEventWrappingImplementation, UIEventWrappingImplementation);
TextEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TextEventWrappingImplementation._wrap$ctor.prototype = TextEventWrappingImplementation.prototype;
function TextEventWrappingImplementation() {}
// ********** Code for TouchEventWrappingImplementation **************
$inherits(TouchEventWrappingImplementation, UIEventWrappingImplementation);
TouchEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TouchEventWrappingImplementation._wrap$ctor.prototype = TouchEventWrappingImplementation.prototype;
function TouchEventWrappingImplementation() {}
// ********** Code for TransitionEventWrappingImplementation **************
$inherits(TransitionEventWrappingImplementation, EventWrappingImplementation);
TransitionEventWrappingImplementation._wrap$ctor = function(ptr) {
  EventWrappingImplementation._wrap$ctor.call(this, ptr);
}
TransitionEventWrappingImplementation._wrap$ctor.prototype = TransitionEventWrappingImplementation.prototype;
function TransitionEventWrappingImplementation() {}
// ********** Code for Uint16ArrayWrappingImplementation **************
$inherits(Uint16ArrayWrappingImplementation, ArrayBufferViewWrappingImplementation);
Uint16ArrayWrappingImplementation._wrap$ctor = function(ptr) {
  ArrayBufferViewWrappingImplementation._wrap$ctor.call(this, ptr);
}
Uint16ArrayWrappingImplementation._wrap$ctor.prototype = Uint16ArrayWrappingImplementation.prototype;
function Uint16ArrayWrappingImplementation() {}
Uint16ArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for Uint32ArrayWrappingImplementation **************
$inherits(Uint32ArrayWrappingImplementation, ArrayBufferViewWrappingImplementation);
Uint32ArrayWrappingImplementation._wrap$ctor = function(ptr) {
  ArrayBufferViewWrappingImplementation._wrap$ctor.call(this, ptr);
}
Uint32ArrayWrappingImplementation._wrap$ctor.prototype = Uint32ArrayWrappingImplementation.prototype;
function Uint32ArrayWrappingImplementation() {}
Uint32ArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for Uint8ArrayWrappingImplementation **************
$inherits(Uint8ArrayWrappingImplementation, ArrayBufferViewWrappingImplementation);
Uint8ArrayWrappingImplementation._wrap$ctor = function(ptr) {
  ArrayBufferViewWrappingImplementation._wrap$ctor.call(this, ptr);
}
Uint8ArrayWrappingImplementation._wrap$ctor.prototype = Uint8ArrayWrappingImplementation.prototype;
function Uint8ArrayWrappingImplementation() {}
Uint8ArrayWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for WebSocketWrappingImplementation **************
$inherits(WebSocketWrappingImplementation, EventTargetWrappingImplementation);
WebSocketWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WebSocketWrappingImplementation._wrap$ctor.prototype = WebSocketWrappingImplementation.prototype;
function WebSocketWrappingImplementation() {}
WebSocketWrappingImplementation.prototype.get$typeName = function() {
  return "WebSocket";
}
// ********** Code for WheelEventWrappingImplementation **************
$inherits(WheelEventWrappingImplementation, UIEventWrappingImplementation);
WheelEventWrappingImplementation._wrap$ctor = function(ptr) {
  UIEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
WheelEventWrappingImplementation._wrap$ctor.prototype = WheelEventWrappingImplementation.prototype;
function WheelEventWrappingImplementation() {}
// ********** Code for WindowWrappingImplementation **************
$inherits(WindowWrappingImplementation, EventTargetWrappingImplementation);
WindowWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WindowWrappingImplementation._wrap$ctor.prototype = WindowWrappingImplementation.prototype;
function WindowWrappingImplementation() {}
WindowWrappingImplementation.prototype.get$length = function() {
  return this._ptr.get$length();
}
// ********** Code for WorkerWrappingImplementation **************
$inherits(WorkerWrappingImplementation, EventTargetWrappingImplementation);
WorkerWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
WorkerWrappingImplementation._wrap$ctor.prototype = WorkerWrappingImplementation.prototype;
function WorkerWrappingImplementation() {}
// ********** Code for XMLHttpRequestProgressEventWrappingImplementation **************
$inherits(XMLHttpRequestProgressEventWrappingImplementation, ProgressEventWrappingImplementation);
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor = function(ptr) {
  ProgressEventWrappingImplementation._wrap$ctor.call(this, ptr);
}
XMLHttpRequestProgressEventWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestProgressEventWrappingImplementation.prototype;
function XMLHttpRequestProgressEventWrappingImplementation() {}
// ********** Code for XMLHttpRequestUploadWrappingImplementation **************
$inherits(XMLHttpRequestUploadWrappingImplementation, EventTargetWrappingImplementation);
XMLHttpRequestUploadWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
XMLHttpRequestUploadWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestUploadWrappingImplementation.prototype;
function XMLHttpRequestUploadWrappingImplementation() {}
// ********** Code for XMLHttpRequestWrappingImplementation **************
$inherits(XMLHttpRequestWrappingImplementation, EventTargetWrappingImplementation);
XMLHttpRequestWrappingImplementation._wrap$ctor = function(ptr) {
  EventTargetWrappingImplementation._wrap$ctor.call(this, ptr);
}
XMLHttpRequestWrappingImplementation._wrap$ctor.prototype = XMLHttpRequestWrappingImplementation.prototype;
function XMLHttpRequestWrappingImplementation() {}
// ********** Code for top level **************
var _pendingRequests;
var _pendingMeasurementFrameCallbacks;
//  ********** Library html **************
// ********** Code for top level **************
var secretWindow;
var secretDocument;
function html_get$document() {
  if (null == $globals.secretWindow) {
    LevelDom.initialize();
  }
  return $globals.secretDocument;
}
//  ********** Library webglFundamentals **************
// ********** Code for webglFundamentals **************
function webglFundamentals() {
  this.DEBUG = true;
}
webglFundamentals.prototype.debugPrint = function(p) {
  if (this.DEBUG) {
    dart_core_print(p);
  }
}
webglFundamentals.prototype.loadShader = function(gl, shaderSource, shaderType) {
  var shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  var compiled = gl.getShaderParameter(shader, (35713));
  this.debugPrint(("compiled = " + compiled));
}
webglFundamentals.prototype.createShaderFromScriptElement = function(gl, id) {
  var shaderScript = html_get$document().query(id);
  var shaderSource = shaderScript.get$text();
  var shaderType;
  if (shaderScript.get$type() == "x-shader/x-vertex") {
    shaderType = (35633);
  }
  else if (shaderScript.get$type() == "x-shader/x-fragment") {
    shaderType = (35632);
  }
  else {
    $throw(new ExceptionImplementation("*** Error: unknown shader type"));
  }
  return this.loadShader(gl, shaderSource, shaderType);
}
webglFundamentals.prototype.getWebGLContext = function(canvas) {
  return canvas.getContext("experimental-webgl");
}
webglFundamentals.prototype.run = function() {
  var canvas = html_get$document().query("canvas");
  if (!(canvas && canvas.is$CanvasElement())) {
    this.write("Failed to load canvas");
    return;
  }
  var gl = this.getWebGLContext(canvas);
  var vertexShader = this.createShaderFromScriptElement(gl, "#v2d-vertex-shader");
  var fragmentShader = this.createShaderFromScriptElement(gl, "#f2d-fragment-shader");
  this.write("Ran webgl fundamental sample");
}
webglFundamentals.prototype.write = function(message) {
  html_get$document().query("#status").set$innerHTML(message);
}
// ********** Code for top level **************
function main() {
  new webglFundamentals().run();
}
// 100 dynamic types.
// 494 types
// 43 !leaf
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
  var v0/*HTMLInputElement*/ = 'HTMLInputElement|HTMLIsIndexElement';
  var v1/*HTMLElement*/ = [v0/*HTMLInputElement*/,'HTMLElement|HTMLAnchorElement|HTMLAppletElement|HTMLAreaElement|HTMLBRElement|HTMLBaseElement|HTMLBaseFontElement|HTMLBodyElement|HTMLButtonElement|HTMLCanvasElement|HTMLDListElement|HTMLDetailsElement|HTMLDirectoryElement|HTMLDivElement|HTMLEmbedElement|HTMLFieldSetElement|HTMLFontElement|HTMLFormElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLIFrameElement|HTMLImageElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMediaElement|HTMLAudioElement|HTMLVideoElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLObjectElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLSelectElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement'].join('|');
  var v2/*SVGComponentTransferFunctionElement*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement';
  var v3/*CharacterData*/ = 'CharacterData|Comment|Text|CDATASection';
  var v4/*Document*/ = 'Document|HTMLDocument|SVGDocument';
  var v5/*Element*/ = [v1/*HTMLElement*/,v2/*SVGComponentTransferFunctionElement*/,'Element|SVGElement|SVGAElement|SVGAltGlyphDefElement|SVGAltGlyphItemElement|SVGAnimationElement|SVGAnimateColorElement|SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGSetElement|SVGCircleElement|SVGClipPathElement|SVGCursorElement|SVGDefsElement|SVGDescElement|SVGEllipseElement|SVGFEBlendElement|SVGFEColorMatrixElement|SVGFEComponentTransferElement|SVGFECompositeElement|SVGFEConvolveMatrixElement|SVGFEDiffuseLightingElement|SVGFEDisplacementMapElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFloodElement|SVGFEGaussianBlurElement|SVGFEImageElement|SVGFEMergeElement|SVGFEMergeNodeElement|SVGFEMorphologyElement|SVGFEOffsetElement|SVGFEPointLightElement|SVGFESpecularLightingElement|SVGFESpotLightElement|SVGFETileElement|SVGFETurbulenceElement|SVGFilterElement|SVGFontElement|SVGFontFaceElement|SVGFontFaceFormatElement|SVGFontFaceNameElement|SVGFontFaceSrcElement|SVGFontFaceUriElement|SVGForeignObjectElement|SVGGElement|SVGGlyphElement|SVGGlyphRefElement|SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGHKernElement|SVGImageElement|SVGLineElement|SVGMPathElement|SVGMarkerElement|SVGMaskElement|SVGMetadataElement|SVGMissingGlyphElement|SVGPathElement|SVGPatternElement|SVGPolygonElement|SVGPolylineElement|SVGRectElement|SVGSVGElement|SVGScriptElement|SVGStopElement|SVGStyleElement|SVGSwitchElement|SVGSymbolElement|SVGTextContentElement|SVGTextPathElement|SVGTextPositioningElement|SVGAltGlyphElement|SVGTRefElement|SVGTSpanElement|SVGTextElement|SVGTitleElement|SVGUseElement|SVGVKernElement|SVGViewElement'].join('|');
  var v6/*Uint8Array*/ = 'Uint8Array|Uint8ClampedArray';
  var v7/*Blob*/ = 'Blob|File';
  var v8/*CSSRule*/ = 'CSSRule|CSSCharsetRule|CSSFontFaceRule|CSSImportRule|CSSMediaRule|CSSPageRule|CSSStyleRule|CSSUnknownRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule|WebKitCSSRegionRule';
  var v9/*CSSValueList*/ = 'CSSValueList|WebKitCSSTransformValue';
  var v10/*DOMTokenList*/ = 'DOMTokenList|DOMSettableTokenList';
  var v11/*Event*/ = 'Event|AudioProcessingEvent|BeforeLoadEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|HashChangeEvent|IDBVersionChangeEvent|MessageEvent|MutationEvent|OfflineAudioCompletionEvent|OverflowEvent|PageTransitionEvent|PopStateEvent|ProgressEvent|XMLHttpRequestProgressEvent|SpeechInputEvent|StorageEvent|TrackEvent|UIEvent|CompositionEvent|KeyboardEvent|MouseEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent|WebGLContextEvent|WebKitAnimationEvent|WebKitTransitionEvent';
  var v12/*Node*/ = [v3/*CharacterData*/,v4/*Document*/,v5/*Element*/,'Node|Attr|DocumentFragment|DocumentType|Entity|EntityReference|Notation|ProcessingInstruction'].join('|');
  var v13/*HTMLCollection*/ = 'HTMLCollection|HTMLOptionsCollection';
  var v14/*StyleSheet*/ = 'StyleSheet|CSSStyleSheet';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['Blob', v7/*Blob*/]
    , ['CSSRule', v8/*CSSRule*/]
    , ['CSSValueList', v9/*CSSValueList*/]
    , ['CharacterData', v3/*CharacterData*/]
    , ['DOMTokenList', v10/*DOMTokenList*/]
    , ['Document', v4/*Document*/]
    , ['HTMLInputElement', v0/*HTMLInputElement*/]
    , ['HTMLElement', v1/*HTMLElement*/]
    , ['SVGComponentTransferFunctionElement', v2/*SVGComponentTransferFunctionElement*/]
    , ['Element', v5/*Element*/]
    , ['Event', v11/*Event*/]
    , ['HTMLCollection', v13/*HTMLCollection*/]
    , ['Node', v12/*Node*/]
    , ['StyleSheet', v14/*StyleSheet*/]
    , ['Uint8Array', v6/*Uint8Array*/]
    , ['DOMType', [v6/*Uint8Array*/,v7/*Blob*/,v8/*CSSRule*/,v9/*CSSValueList*/,v10/*DOMTokenList*/,v11/*Event*/,v12/*Node*/,v13/*HTMLCollection*/,v14/*StyleSheet*/,'DOMType|ArrayBuffer|ArrayBufferView|DataView|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|AudioBuffer|AudioContext|AudioListener|AudioNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|AudioSourceNode|AudioBufferSourceNode|MediaElementAudioSourceNode|BiquadFilterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|HighPass2FilterNode|JavaScriptAudioNode|LowPass2FilterNode|RealtimeAnalyserNode|WaveShaperNode|AudioParam|AudioGain|BarInfo|CSSRuleList|CSSStyleDeclaration|CSSValue|CSSPrimitiveValue|SVGColor|SVGPaint|CanvasGradient|CanvasPattern|CanvasPixelArray|CanvasRenderingContext|CanvasRenderingContext2D|WebGLRenderingContext|ClientRect|ClientRectList|Clipboard|Coordinates|Counter|Crypto|DOMException|DOMFileSystem|DOMFileSystemSync|DOMFormData|DOMImplementation|DOMMimeType|DOMMimeTypeArray|DOMParser|DOMPlugin|DOMPluginArray|DOMSelection|DOMURL|DataTransferItem|DataTransferItemList|Database|DatabaseSync|DirectoryReader|DirectoryReaderSync|ElementTimeControl|ElementTraversal|Entry|DirectoryEntry|FileEntry|EntryArray|EntryArraySync|EntrySync|DirectoryEntrySync|FileEntrySync|EventException|EventTarget|AbstractWorker|SharedWorker|Worker|DOMApplicationCache|DOMWindow|EventSource|MessagePort|Notification|SVGElementInstance|WebSocket|XMLHttpRequest|XMLHttpRequestUpload|FileError|FileException|FileList|FileReader|FileReaderSync|FileWriter|FileWriterSync|Geolocation|Geoposition|HTMLAllCollection|History|IDBAny|IDBCursor|IDBCursorWithValue|IDBDatabase|IDBDatabaseError|IDBDatabaseException|IDBFactory|IDBIndex|IDBKey|IDBKeyRange|IDBObjectStore|IDBRequest|IDBVersionChangeRequest|IDBTransaction|ImageData|JavaScriptCallFrame|Location|MediaController|MediaError|MediaList|MediaQueryList|MediaQueryListListener|MemoryInfo|MessageChannel|Metadata|NamedNodeMap|Navigator|NodeFilter|NodeIterator|NodeList|NodeSelector|NotificationCenter|OESStandardDerivatives|OESTextureFloat|OESVertexArrayObject|OperationNotAllowedException|Performance|PerformanceNavigation|PerformanceTiming|PositionError|RGBColor|Range|RangeException|Rect|SQLError|SQLException|SQLResultSet|SQLResultSetRowList|SQLTransaction|SQLTransactionSync|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGElementInstanceList|SVGException|SVGExternalResourcesRequired|SVGFitToViewBox|SVGLangSpace|SVGLength|SVGLengthList|SVGLocatable|SVGTransformable|SVGMatrix|SVGNumber|SVGNumberList|SVGPathSeg|SVGPathSegArcAbs|SVGPathSegArcRel|SVGPathSegClosePath|SVGPathSegCurvetoCubicAbs|SVGPathSegCurvetoCubicRel|SVGPathSegCurvetoCubicSmoothAbs|SVGPathSegCurvetoCubicSmoothRel|SVGPathSegCurvetoQuadraticAbs|SVGPathSegCurvetoQuadraticRel|SVGPathSegCurvetoQuadraticSmoothAbs|SVGPathSegCurvetoQuadraticSmoothRel|SVGPathSegLinetoAbs|SVGPathSegLinetoHorizontalAbs|SVGPathSegLinetoHorizontalRel|SVGPathSegLinetoRel|SVGPathSegLinetoVerticalAbs|SVGPathSegLinetoVerticalRel|SVGPathSegMovetoAbs|SVGPathSegMovetoRel|SVGPathSegList|SVGPoint|SVGPointList|SVGPreserveAspectRatio|SVGRect|SVGRenderingIntent|SVGStringList|SVGStylable|SVGFilterPrimitiveStandardAttributes|SVGTests|SVGTransform|SVGTransformList|SVGURIReference|SVGUnitTypes|SVGZoomAndPan|SVGViewSpec|Screen|ScriptProfile|ScriptProfileNode|SpeechInputResult|SpeechInputResultList|Storage|StorageInfo|StyleMedia|StyleSheetList|TextMetrics|TextTrack|TextTrackCue|TextTrackCueList|TextTrackList|TimeRanges|Touch|TouchList|TreeWalker|ValidityState|WebGLActiveInfo|WebGLBuffer|WebGLCompressedTextures|WebGLContextAttributes|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLRenderbuffer|WebGLShader|WebGLTexture|WebGLUniformLocation|WebGLVertexArrayObjectOES|WebKitAnimation|WebKitAnimationList|WebKitBlobBuilder|WebKitCSSMatrix|WebKitNamedFlow|WebKitPoint|WorkerContext|DedicatedWorkerContext|SharedWorkerContext|WorkerLocation|WorkerNavigator|XMLHttpRequestException|XMLSerializer|XPathEvaluator|XPathException|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor'].join('|')]
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
}
var const$0000 = Object.create(NoMoreElementsException.prototype, {});
var const$0001 = Object.create(_DeletedKeySentinel.prototype, {});
var const$0002 = Object.create(EmptyQueueException.prototype, {});
var $globals = {};
$static_init();
main();
