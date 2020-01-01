/*!
 * helper-js v1.4.18-beta
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.helperJs = {}));
}(this, (function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.11' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode:  'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$1 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$1
	};

	var f$2 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$2
	};

	// all object keys, includes non-enumerable and symbols



	var Reflect$1 = _global.Reflect;
	var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
	  var keys = _objectGopn.f(_anObject(it));
	  var getSymbols = _objectGops.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

	var f$3 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$3
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$4 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$4
	};

	var _createProperty = function (object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
	  else object[index] = value;
	};

	// https://github.com/tc39/proposal-object-getownpropertydescriptors






	_export(_export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = _toIobject(object);
	    var getDesc = _objectGopd.f;
	    var keys = _ownKeys(O);
	    var result = {};
	    var i = 0;
	    var key, desc;
	    while (keys.length > i) {
	      desc = getDesc(O, key = keys[i++]);
	      if (desc !== undefined) _createProperty(result, key, desc);
	    }
	    return result;
	  }
	});

	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf(object);
	    if (object === null) break;
	  }

	  return object;
	}

	var superPropBase = _superPropBase;

	var get = createCommonjsModule(function (module) {
	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    module.exports = _get = Reflect.get;
	  } else {
	    module.exports = _get = function _get(target, property, receiver) {
	      var base = superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	module.exports = _get;
	});

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf(subClass, superClass);
	}

	var inherits = _inherits;

	// 7.2.9 SameValue(x, y)
	var _sameValue = Object.is || function is(x, y) {
	  // eslint-disable-next-line no-self-compare
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var SPECIES = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	// @@search logic
	_fixReWks('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
	  return [
	    // `String.prototype.search` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.search
	    function search(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[SEARCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	    },
	    // `RegExp.prototype[@@search]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
	    function (regexp) {
	      var res = maybeCallNative($search, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      var previousLastIndex = rx.lastIndex;
	      if (!_sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
	      var result = _regexpExecAbstract(rx, S);
	      if (!_sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
	      return result === null ? -1 : result.index;
	    }
	  ];
	});

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 7.2.2 IsArray(argument)

	var _isArray = Array.isArray || function isArray(arg) {
	  return _cof(arg) == 'Array';
	};

	var SPECIES$1 = _wks('species');

	var _arraySpeciesConstructor = function (original) {
	  var C;
	  if (_isArray(original)) {
	    C = original.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
	    if (_isObject(C)) {
	      C = C[SPECIES$1];
	      if (C === null) C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


	var _arraySpeciesCreate = function (original, length) {
	  return new (_arraySpeciesConstructor(original))(length);
	};

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex





	var _arrayMethods = function (TYPE, $create) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  var create = $create || _arraySpeciesCreate;
	  return function ($this, callbackfn, that) {
	    var O = _toObject($this);
	    var self = _iobject(O);
	    var f = _ctx(callbackfn, that, 3);
	    var length = _toLength(self.length);
	    var index = 0;
	    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var val, res;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      val = self[index];
	      res = f(val, index, O);
	      if (TYPE) {
	        if (IS_MAP) result[index] = res;   // map
	        else if (res) switch (TYPE) {
	          case 3: return true;             // some
	          case 5: return val;              // find
	          case 6: return index;            // findIndex
	          case 2: result.push(val);        // filter
	        } else if (IS_EVERY) return false; // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

	var $find = _arrayMethods(5);
	var KEY = 'find';
	var forced = true;
	// Shouldn't skip holes
	if (KEY in []) Array(1)[KEY](function () { forced = false; });
	_export(_export.P + _export.F * forced, 'Array', {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	_addToUnscopables(KEY);

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = defined(this);
	      var fn = regexp == undefined ? undefined : regexp[MATCH];
	      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative($match, regexp, this);
	      if (res.done) return res.value;
	      var rx = _anObject(regexp);
	      var S = String(this);
	      if (!rx.global) return _regexpExecAbstract(rx, S);
	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = _regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty = _defineProperty;

	var dP$1 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// 19.2.4.2 name
	NAME in FProto || _descriptors && dP$1(FProto, NAME, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var _anInstance = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

	// call something on iterator step with safe closing on error

	var _iterCall = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	var _iterators = {};

	// check on default Array iterator

	var ITERATOR = _wks('iterator');
	var ArrayProto$1 = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR] === it);
	};

	var ITERATOR$1 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var _forOf = createCommonjsModule(function (module) {
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
	  var f = _ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
	    result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = _iterCall(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;
	});

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$2 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$2]) == undefined ? D : _aFunction(S);
	};

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	var _invoke = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	var process = _global.process;
	var setTask = _global.setImmediate;
	var clearTask = _global.clearImmediate;
	var MessageChannel = _global.MessageChannel;
	var Dispatch = _global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      _invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (_cof(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(_ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(_ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = _ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
	    defer = function (id) {
	      _global.postMessage(id + '', '*');
	    };
	    _global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in _domCreate('script')) {
	    defer = function (id) {
	      _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
	        _html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(_ctx(run, id, 1), 0);
	    };
	  }
	}
	var _task = {
	  set: setTask,
	  clear: clearTask
	};

	var macrotask = _task.set;
	var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
	var process$1 = _global.process;
	var Promise$1 = _global.Promise;
	var isNode = _cof(process$1) == 'process';

	var _microtask = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process$1.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process$1.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise$1.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(_global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};

	// 25.4.1.5 NewPromiseCapability(C)


	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = _aFunction(resolve);
	  this.reject = _aFunction(reject);
	}

	var f$5 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$5
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator$1 = _global.navigator;

	var _userAgent = navigator$1 && navigator$1.userAgent || '';

	var _promiseResolve = function (C, x) {
	  _anObject(C);
	  if (_isObject(x) && x.constructor === C) return x;
	  var promiseCapability = _newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var _redefineAll = function (target, src, safe) {
	  for (var key in src) _redefine(target, key, src[key], safe);
	  return target;
	};

	var def = _objectDp.f;

	var TAG$1 = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
	};

	var SPECIES$3 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$3]) _objectDp.f(C, SPECIES$3, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var ITERATOR$2 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$2]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$2]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$2] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};

	var task = _task.set;
	var microtask = _microtask();




	var PROMISE = 'Promise';
	var TypeError$1 = _global.TypeError;
	var process$2 = _global.process;
	var versions = process$2 && process$2.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = _global[PROMISE];
	var isNode$1 = _classof(process$2) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode$1 || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && _userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(_global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = _perform(function () {
	        if (isNode$1) {
	          process$2.emit('unhandledRejection', value, promise);
	        } else if (handler = _global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = _global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(_global, function () {
	    var handler;
	    if (isNode$1) {
	      process$2.emit('rejectionHandled', promise);
	    } else if (handler = _global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    _anInstance(this, $Promise, PROMISE, '_h');
	    _aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = _redefineAll($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode$1 ? process$2.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = _ctx($resolve, promise, 1);
	    this.reject = _ctx($reject, promise, 1);
	  };
	  _newPromiseCapability.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
	_setToStringTag($Promise, PROMISE);
	_setSpecies(PROMISE);
	Wrapper = _core[PROMISE];

	// statics
	_export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	_export(_export.S + _export.F * ( !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return _promiseResolve( this, x);
	  }
	});
	_export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = _perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      _forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = _perform(function () {
	      _forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});

	// https://github.com/tc39/Array.prototype.includes

	var $includes = _arrayIncludes(true);

	_export(_export.P, 'Array', {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	_addToUnscopables('includes');

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var INCLUDES = 'includes';

	_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~_stringContext(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	var regenerator = runtime_1;

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	var setPrototypeOf$1 = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf$1) {
	    setPrototypeOf$1(that, P);
	  } return that;
	};

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var gOPN = _objectGopn.f;
	var gOPD$1 = _objectGopd.f;
	var dP$2 = _objectDp.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = _descriptors ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (_has(Base, key = keys[j]) && !_has($Number, key)) {
	      dP$2($Number, key, gOPD$1(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

	// 20.1.2.3 Number.isInteger(number)

	var floor$1 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export(_export.S, 'Number', { isInteger: _isInteger });

	// 19.1.2.1 Object.assign(target, source, ...)






	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!_descriptors || isEnum.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var _strictMethod = function (method, arg) {
	  return !!method && _fails(function () {
	    // eslint-disable-next-line no-useless-call
	    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
	  });
	};

	var $filter = _arrayMethods(2);

	_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR$3 = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if ( typeof IteratorPrototype[ITERATOR$3] != 'function') _hide(IteratorPrototype, ITERATOR$3, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ( (BUGGY || VALUES_BUG || !proto[ITERATOR$3])) {
	    _hide(proto, ITERATOR$3, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _meta = createCommonjsModule(function (module) {
	var META = _uid('meta');


	var setDesc = _objectDp.f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !_fails(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!_has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};
	});
	var _meta_1 = _meta.KEY;
	var _meta_2 = _meta.NEED;
	var _meta_3 = _meta.fastKey;
	var _meta_4 = _meta.getWeak;
	var _meta_5 = _meta.onFreeze;

	var _validateCollection = function (it, TYPE) {
	  if (!_isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
	  return it;
	};

	var dP$3 = _objectDp.f;









	var fastKey = _meta.fastKey;

	var SIZE = _descriptors ? '_s' : 'size';

	var getEntry = function (that, key) {
	  // fast case
	  var index = fastKey(key);
	  var entry;
	  if (index !== 'F') return that._i[index];
	  // frozen object case
	  for (entry = that._f; entry; entry = entry.n) {
	    if (entry.k == key) return entry;
	  }
	};

	var _collectionStrong = {
	  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      _anInstance(that, C, NAME, '_i');
	      that._t = NAME;         // collection type
	      that._i = _objectCreate(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    _redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        for (var that = _validateCollection(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
	          entry.r = true;
	          if (entry.p) entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = _validateCollection(this, NAME);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.n;
	          var prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if (prev) prev.n = next;
	          if (next) next.p = prev;
	          if (that._f == entry) that._f = next;
	          if (that._l == entry) that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        _validateCollection(this, NAME);
	        var f = _ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.n : this._f) {
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while (entry && entry.r) entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(_validateCollection(this, NAME), key);
	      }
	    });
	    if (_descriptors) dP$3(C.prototype, 'size', {
	      get: function () {
	        return _validateCollection(this, NAME)[SIZE];
	      }
	    });
	    return C;
	  },
	  def: function (that, key, value) {
	    var entry = getEntry(that, key);
	    var prev, index;
	    // change existing entry
	    if (entry) {
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if (!that._f) that._f = entry;
	      if (prev) prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if (index !== 'F') that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function (C, NAME, IS_MAP) {
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    _iterDefine(C, NAME, function (iterated, kind) {
	      this._t = _validateCollection(iterated, NAME); // target
	      this._k = kind;                     // kind
	      this._l = undefined;                // previous
	    }, function () {
	      var that = this;
	      var kind = that._k;
	      var entry = that._l;
	      // revert to the last existing entry
	      while (entry && entry.r) entry = entry.p;
	      // get next entry
	      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
	        // or finish the iteration
	        that._t = undefined;
	        return _iterStep(1);
	      }
	      // return step by kind
	      if (kind == 'keys') return _iterStep(0, entry.k);
	      if (kind == 'values') return _iterStep(0, entry.v);
	      return _iterStep(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    _setSpecies(NAME);
	  }
	};

	var _collection = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
	  var Base = _global[NAME];
	  var C = Base;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var proto = C && C.prototype;
	  var O = {};
	  var fixMethod = function (KEY) {
	    var fn = proto[KEY];
	    _redefine(proto, KEY,
	      KEY == 'delete' ? function (a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a) {
	        return IS_WEAK && !_isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a) {
	        return IS_WEAK && !_isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !_fails(function () {
	    new C().entries().next();
	  }))) {
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    _redefineAll(C.prototype, methods);
	    _meta.NEED = true;
	  } else {
	    var instance = new C();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = _fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    var ACCEPT_ITERABLES = _iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && _fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new C();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });
	    if (!ACCEPT_ITERABLES) {
	      C = wrapper(function (target, iterable) {
	        _anInstance(target, C, NAME);
	        var that = _inheritIfRequired(new Base(), target, C);
	        if (iterable != undefined) _forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if (IS_WEAK && proto.clear) delete proto.clear;
	  }

	  _setToStringTag(C, NAME);

	  O[NAME] = C;
	  _export(_export.G + _export.W + _export.F * (C != Base), O);

	  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

	var SET = 'Set';

	// 23.2 Set Objects
	var es6_set = _collection(SET, function (get) {
	  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value) {
	    return _collectionStrong.def(_validateCollection(this, SET), value = value === 0 ? 0 : value, value);
	  }
	}, _collectionStrong);

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  }
	}

	var arrayWithoutHoles = _arrayWithoutHoles;

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	var iterableToArray = _iterableToArray;

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	var nonIterableSpread = _nonIterableSpread;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
	}

	var toConsumableArray = _toConsumableArray;

	var $forEach = _arrayMethods(0);
	var STRICT = _strictMethod([].forEach, true);

	_export(_export.P + _export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */) {
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	var MAP = 'Map';

	// 23.1 Map Objects
	var es6_map = _collection(MAP, function (get) {
	  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key) {
	    var entry = _collectionStrong.getEntry(_validateCollection(this, MAP), key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value) {
	    return _collectionStrong.def(_validateCollection(this, MAP), key === 0 ? 0 : key, value);
	  }
	}, _collectionStrong, true);

	var $map = _arrayMethods(1);

	_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

	var f$6 = _wks;

	var _wksExt = {
		f: f$6
	};

	var defineProperty$1 = _objectDp.f;
	var _wksDefine = function (name) {
	  var $Symbol = _core.Symbol || (_core.Symbol =  _global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$1($Symbol, name, { value: _wksExt.f(name) });
	};

	_wksDefine('asyncIterator');

	// all enumerable object keys, includes symbols



	var _enumKeys = function (it) {
	  var result = _objectKeys(it);
	  var getSymbols = _objectGops.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = _objectPie.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

	var gOPN$1 = _objectGopn.f;
	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN$1(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	var f$7 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject(it));
	};

	var _objectGopnExt = {
		f: f$7
	};

	// ECMAScript 6 symbols shim





	var META = _meta.KEY;





















	var gOPD$2 = _objectGopd.f;
	var dP$4 = _objectDp.f;
	var gOPN$2 = _objectGopnExt.f;
	var $Symbol = _global.Symbol;
	var $JSON = _global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE$2 = 'prototype';
	var HIDDEN = _wks('_hidden');
	var TO_PRIMITIVE = _wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = _shared('symbol-registry');
	var AllSymbols = _shared('symbols');
	var OPSymbols = _shared('op-symbols');
	var ObjectProto$1 = Object[PROTOTYPE$2];
	var USE_NATIVE$1 = typeof $Symbol == 'function' && !!_objectGops.f;
	var QObject = _global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = _descriptors && _fails(function () {
	  return _objectCreate(dP$4({}, 'a', {
	    get: function () { return dP$4(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD$2(ObjectProto$1, key);
	  if (protoDesc) delete ObjectProto$1[key];
	  dP$4(it, key, D);
	  if (protoDesc && it !== ObjectProto$1) dP$4(ObjectProto$1, key, protoDesc);
	} : dP$4;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE$1 && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
	  _anObject(it);
	  key = _toPrimitive(key, true);
	  _anObject(D);
	  if (_has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!_has(it, HIDDEN)) dP$4(it, HIDDEN, _propertyDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _objectCreate(D, { enumerable: _propertyDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP$4(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  _anObject(it);
	  var keys = _enumKeys(P = _toIobject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = _toPrimitive(key, true));
	  if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
	  return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = _toIobject(it);
	  key = _toPrimitive(key, true);
	  if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
	  var D = gOPD$2(it, key);
	  if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN$2(_toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto$1;
	  var names = gOPN$2(IS_OP ? OPSymbols : _toIobject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE$1) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto$1) $set.call(OPSymbols, value);
	      if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, _propertyDesc(1, value));
	    };
	    if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return this._k;
	  });

	  _objectGopd.f = $getOwnPropertyDescriptor;
	  _objectDp.f = $defineProperty;
	  _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
	  _objectPie.f = $propertyIsEnumerable;
	  _objectGops.f = $getOwnPropertySymbols;

	  if (_descriptors && !_library) {
	    _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  _wksExt.f = function (name) {
	    return wrap(_wks(name));
	  };
	}

	_export(_export.G + _export.W + _export.F * !USE_NATIVE$1, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j$1 = 0; es6Symbols.length > j$1;)_wks(es6Symbols[j$1++]);

	for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return _has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	_export(_export.S + _export.F * !USE_NATIVE$1, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = _fails(function () { _objectGops.f(1); });

	_export(_export.S + _export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return _objectGops.f(_toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && _export(_export.S + _export.F * (!USE_NATIVE$1 || _fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!_isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	_setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	_setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	_setToStringTag(_global.JSON, 'JSON', true);

	var $indexOf = _arrayIncludes(false);
	var $native = [].indexOf;
	var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

	_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

	var dP$5 = _objectDp.f;
	var gOPN$3 = _objectGopn.f;


	var $RegExp = _global.RegExp;
	var Base$1 = $RegExp;
	var proto$1 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wks('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : _inheritIfRequired(CORRECT_NEW
	        ? new Base$1(piRE && !fiU ? p.source : p, f)
	        : Base$1((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
	      , tiRE ? this : proto$1, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$5($RegExp, key, {
	      configurable: true,
	      get: function () { return Base$1[key]; },
	      set: function (it) { Base$1[key] = it; }
	    });
	  };
	  for (var keys$1 = gOPN$3(Base$1), i = 0; keys$1.length > i;) proxy(keys$1[i++]);
	  proto$1.constructor = $RegExp;
	  $RegExp.prototype = proto$1;
	  _redefine(_global, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	// 21.1.3.25 String.prototype.trim()
	_stringTrim('trim', function ($trim) {
	  return function trim() {
	    return $trim(this, 3);
	  };
	});

	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX$1 = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !_fails(function () { RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX$1];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var C = _speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = _advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$2 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = _regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$2(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	var ITERATOR$4 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i$1 = 0; i$1 < collections.length; i$1++) {
	  var NAME$1 = collections[i$1];
	  var explicit = DOMIterables[NAME$1];
	  var Collection = _global[NAME$1];
	  var proto$2 = Collection && Collection.prototype;
	  var key$1;
	  if (proto$2) {
	    if (!proto$2[ITERATOR$4]) _hide(proto$2, ITERATOR$4, ArrayValues);
	    if (!proto$2[TO_STRING_TAG]) _hide(proto$2, TO_STRING_TAG, NAME$1);
	    _iterators[NAME$1] = ArrayValues;
	    if (explicit) for (key$1 in es6_array_iterator) if (!proto$2[key$1]) _redefine(proto$2, key$1, es6_array_iterator[key$1], true);
	  }
	}

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING$1 = 'toString';
	var $toString$1 = DateProto[TO_STRING$1];
	var getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefine(DateProto, TO_STRING$1, function toString() {
	    var value = getTime.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString$1.call(this) : INVALID_DATE;
	  });
	}

	// 19.1.3.6 Object.prototype.toString()

	var test = {};
	test[_wks('toStringTag')] = 'z';
	if (test + '' != '[object z]') {
	  _redefine(Object.prototype, 'toString', function toString() {
	    return '[object ' + _classof(this) + ']';
	  }, true);
	}

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var _marked =
	/*#__PURE__*/
	regenerator.mark(iterateALL);

	// local store
	var store = {}; // get global
	// `this` !== global or window because of build tool

	function glb() {
	  if (store.glb) {
	    return store.glb;
	  } else {
	    // resolve global
	    var t;

	    try {
	      t = global;
	    } catch (e) {
	      t = window;
	    }

	    store.glb = t;
	    return t;
	  }
	} // is 各种判断

	function isset(v) {
	  return typeof v !== 'undefined';
	}
	function isArray(v) {
	  return Object.prototype.toString.call(v) === '[object Array]';
	}
	function isBool(v) {
	  return Object.prototype.toString.call(v) === '[object Boolean]';
	}
	function isNumber(v) {
	  return Object.prototype.toString.call(v) === '[object Number]';
	}
	function isNumeric(v) {
	  return isFinite(v) && !isNaN(parseFloat(v));
	}
	function isString(v) {
	  return Object.prototype.toString.call(v) === '[object String]';
	}
	function isObject(v) {
	  return Object.prototype.toString.call(v) === '[object Object]';
	}
	function isFunction(v) {
	  return typeof v === 'function';
	}
	function isPromise(v) {
	  return Object.prototype.toString.call(v) === '[object Promise]';
	}
	function empty$1(v) {
	  if (v == null) {
	    return true;
	  } else if (v.length != null) {
	    return v.length === 0;
	  } else if (isBool(v)) {
	    return false;
	  } else if (isNumber(v)) {
	    return isNaN(v);
	  } else if (isObject(v)) {
	    return Object.keys(v).length === 0;
	  }
	} // num

	function numRand(min, max) {
	  if (arguments.length === 1) {
	    max = min;
	    min = 0;
	  }

	  return Math.floor(Math.random() * (max - min + 1) + min);
	}
	function numPad(num, n) {
	  var len = num.toString().length;

	  while (len < n) {
	    num = '0' + num;
	    len++;
	  }

	  return num;
	}
	function min$3(n, min) {
	  return n < min ? min : n;
	}
	function max$2(n, max) {
	  return n < max ? n : max;
	} // str 字符

	function studlyCase(str) {
	  return str && str[0].toUpperCase() + str.substr(1);
	}
	function kebabCase(str) {
	  return str.replace(/ /g, '-').replace(/_/g, '-').replace(/([A-Z])/g, '-$1').replace(/--+/g, '-').replace(/^-|-$|/g, '').toLowerCase();
	}
	function snakeCase(str) {
	  return kebabCase(str).replace(/-/g, '_');
	}
	function camelCase(str) {
	  var temp = str.toString().split(/[-_]/);

	  for (var i = 1; i < temp.length; i++) {
	    temp[i] = studlyCase(temp[i]);
	  }

	  return temp.join('');
	}
	function camelToWords(str) {
	  return str.toString().trim().split(/(?=[A-Z])/);
	}
	function titleCase(str) {
	  return camelToWords(studlyCase(camelCase(str))).join(' ').replace(/\bid\b/ig, 'ID');
	}
	function strRand() {
	  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
	  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var r = '';
	  var seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	  for (var i = 0; i < len; i++) {
	    r += seeds[numRand(seeds.length - 1)];
	  }

	  return prefix + r;
	}
	function replaceMultiple(mapObj, str) {
	  var reg = new RegExp(Object.keys(mapObj).join('|'), 'g');
	  return str.replace(reg, function (matchedKey) {
	    return mapObj[matchedKey];
	  });
	} // array

	function arrayRemove(arr, v) {
	  var index;
	  var count = 0;

	  while ((index = arr.indexOf(v)) > -1) {
	    arr.splice(index, 1);
	    count++;
	  }

	  return count;
	}
	function arrayRemoveBySortedIndexes(arr, sortedIndexes) {
	  for (var i = sortedIndexes.length - 1; i >= 0; i--) {
	    var index = sortedIndexes[i];
	    arr.splice(index, 1);
	  }
	}
	function newArrayRemoveAt(arr, indexes) {
	  indexes = toArrayIfNot(indexes);
	  var mapping = {};
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = indexes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var index = _step.value;
	      mapping[index] = true;
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
	        _iterator["return"]();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  var newArr = [];
	  var len = arr.length;

	  for (var i = 0; i < len; i++) {
	    if (!mapping[i]) {
	      newArr.push(arr[i]);
	    }
	  }

	  return newArr;
	}
	function arrayAt(arr, n) {
	  return arr[n >= 0 ? n : arr.length + n];
	}
	function arrayFirst(arr) {
	  return arr[0];
	}
	function arrayLast(arr) {
	  return arr[arr.length - 1];
	}
	function arrayDiff(arr1, arr2) {
	  var len = arr1.length;
	  var arr = [];

	  while (len--) {
	    if (arr2.indexOf(arr1[len]) < 0) {
	      arr.push(arr1[len]);
	    }
	  }

	  return arr;
	} // offset can be many

	function arraySibling(arr, item, offset) {
	  var index = arr.indexOf(item);

	  if (index === -1) {
	    throw 'item is not in array';
	  }

	  if (isArray(offset)) {
	    return offset.map(function (v) {
	      return arr[index + v];
	    });
	  }

	  return arr[index + offset];
	}
	function toArrayIfNot(arrOrNot) {
	  return isArray(arrOrNot) ? arrOrNot : [arrOrNot];
	} // n can be getter(number of times)
	// n可以是方法, 参数1是第几次分块

	function splitArray(arr, n) {
	  var r = [];

	  if (isFunction(n)) {
	    var getChunkLength = n;
	    var times = 1;
	    var i = 0;

	    while (i < arr.length) {
	      var _n = getChunkLength(times);

	      var end = i + _n;
	      r.push(arr.slice(i, end));
	      i = end;
	      times++;
	    }
	  } else {
	    var _i = 0;

	    while (_i < arr.length) {
	      var _end = _i + n;

	      r.push(arr.slice(_i, _end));
	      _i = _end;
	    }
	  }

	  return r;
	}
	function groupArray(arr, getMark) {
	  var groups = new Map();
	  arr.forEach(function (v) {
	    var mark = getMark(v);

	    if (!groups.has(mark)) {
	      groups.set(mark, []);
	    }

	    groups.get(mark).push(v);
	  });
	  var r = [];
	  groups.forEach(function (value, key) {
	    r.push([key, value]);
	  });
	  return r;
	}
	function arrayDistinct(arr) {
	  if (glb().Set) {
	    return toConsumableArray(new Set(arr));
	  } else {
	    return arr.filter(function (v, i, a) {
	      return a.indexOf(v) === i;
	    });
	  }
	}
	function arrayGet(arr, index, endIndex) {
	  if (index < 0) {
	    index += arr.length;
	  }

	  if (endIndex == null) {
	    return arr[index];
	  } else {
	    if (endIndex < 0) {
	      endIndex += arr.length;
	    }

	    return arr.slice(index, endIndex - index + 1);
	  }
	}
	function arrayWithoutEnd(arr, len) {
	  return arr.slice(0, arr.length - len);
	} // object

	function assignIfDifferent(obj, key, val) {
	  if (obj[key] !== val) {
	    obj[key] = val;
	  }
	}
	function objectMerge(o1, o2) {
	  for (var k in o2) {
	    if (!o1.hasOwnProperty(k)) {
	      o1[k] = o2[k];
	    } else if (isObject(o1[k]) && isObject(o2[k])) {
	      Object.assign(o1[k], o2[k]);
	    } else {
	      o1[k] = o2[k];
	    }
	  }

	  return o1;
	}
	function objectMap(obj, func) {
	  var r = {};

	  for (var key in obj) {
	    r[key] = func(obj[key], key, obj);
	  }

	  return r;
	}
	function objectOnly(obj, keys) {
	  var r = {};

	  for (var key in obj) {
	    if (keys.indexOf(key) > -1) {
	      r[key] = obj[key];
	    }
	  }

	  return r;
	}
	function objectExcept(obj, keys) {
	  var r = {};

	  for (var key in obj) {
	    if (keys.indexOf(key) === -1) {
	      r[key] = obj[key];
	    }
	  }

	  return r;
	} // loop for all type
	// todo change reverse to opt in next version

	function forAll(val, handler, reverse) {
	  if (!reverse) {
	    if (isArray(val) || isString(val) || val.hasOwnProperty('length')) {
	      for (var i = 0; i < val.length; i++) {
	        if (handler(val[i], i) === false) {
	          break;
	        }
	      }
	    } else if (isObject(val)) {
	      for (var _i2 = 0, _Object$keys = Object.keys(val); _i2 < _Object$keys.length; _i2++) {
	        var key = _Object$keys[_i2];

	        if (handler(val[key], key) === false) {
	          break;
	        }
	      }
	    } else if (Number.isInteger(val)) {
	      for (var _i3 = 0; _i3 < val; _i3++) {
	        if (handler(_i3, _i3) === false) {
	          break;
	        }
	      }
	    }
	  } else {
	    if (isArray(val) || isString(val) || val.hasOwnProperty('length')) {
	      for (var _i4 = val.length - 1; _i4 >= 0; _i4--) {
	        if (handler(val[_i4], _i4) === false) {
	          break;
	        }
	      }
	    } else if (isObject(val)) {
	      var keys = Object.keys(val);
	      keys.reverse();

	      for (var _i5 = 0, _keys = keys; _i5 < _keys.length; _i5++) {
	        var _key = _keys[_i5];

	        if (handler(val[_key], _key) === false) {
	          break;
	        }
	      }
	    } else if (Number.isInteger(val)) {
	      for (var _i6 = val - 1; _i6 >= 0; _i6--) {
	        if (handler(_i6, _i6) === false) {
	          break;
	        }
	      }
	    }
	  }
	} // loop for Array, Object, NodeList, String

	function iterateALL(val) {
	  var opt,
	      i,
	      info,
	      _i7,
	      _Object$keys2,
	      key,
	      _info,
	      _i8,
	      _info2,
	      keys,
	      _i9,
	      _keys2,
	      _key2,
	      _info3,
	      _args = arguments;

	  return regenerator.wrap(function iterateALL$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          opt = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

	          if (opt.reverse) {
	            _context.next = 30;
	            break;
	          }

	          if (!(val.length != null)) {
	            _context.next = 14;
	            break;
	          }

	          i = 0;

	        case 4:
	          if (!(i < val.length)) {
	            _context.next = 12;
	            break;
	          }

	          info = {
	            value: val[i],
	            index: i
	          };

	          if (!(!opt.exclude || !opt.exclude(info))) {
	            _context.next = 9;
	            break;
	          }

	          _context.next = 9;
	          return info;

	        case 9:
	          i++;
	          _context.next = 4;
	          break;

	        case 12:
	          _context.next = 28;
	          break;

	        case 14:
	          if (!isObject(val)) {
	            _context.next = 27;
	            break;
	          }

	          _i7 = 0, _Object$keys2 = Object.keys(val);

	        case 16:
	          if (!(_i7 < _Object$keys2.length)) {
	            _context.next = 25;
	            break;
	          }

	          key = _Object$keys2[_i7];
	          _info = {
	            value: val[key],
	            key: key
	          };

	          if (!(!opt.exclude || !opt.exclude(_info))) {
	            _context.next = 22;
	            break;
	          }

	          _context.next = 22;
	          return _info;

	        case 22:
	          _i7++;
	          _context.next = 16;
	          break;

	        case 25:
	          _context.next = 28;
	          break;

	        case 27:
	          throw 'Unsupported type';

	        case 28:
	          _context.next = 58;
	          break;

	        case 30:
	          if (!(val.length != null)) {
	            _context.next = 42;
	            break;
	          }

	          _i8 = val.length - 1;

	        case 32:
	          if (!(_i8 >= 0)) {
	            _context.next = 40;
	            break;
	          }

	          _info2 = {
	            value: val[_i8],
	            index: _i8
	          };

	          if (!(!opt.exclude || !opt.exclude(_info2))) {
	            _context.next = 37;
	            break;
	          }

	          _context.next = 37;
	          return _info2;

	        case 37:
	          _i8--;
	          _context.next = 32;
	          break;

	        case 40:
	          _context.next = 58;
	          break;

	        case 42:
	          if (!isObject(val)) {
	            _context.next = 57;
	            break;
	          }

	          keys = Object.keys(val);
	          keys.reverse();
	          _i9 = 0, _keys2 = keys;

	        case 46:
	          if (!(_i9 < _keys2.length)) {
	            _context.next = 55;
	            break;
	          }

	          _key2 = _keys2[_i9];
	          _info3 = {
	            value: val[_key2],
	            key: _key2
	          };

	          if (!(!opt.exclude || !opt.exclude(_info3))) {
	            _context.next = 52;
	            break;
	          }

	          _context.next = 52;
	          return _info3;

	        case 52:
	          _i9++;
	          _context.next = 46;
	          break;

	        case 55:
	          _context.next = 58;
	          break;

	        case 57:
	          throw 'Unsupported type';

	        case 58:
	        case "end":
	          return _context.stop();
	      }
	    }
	  }, _marked);
	} // source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string

	function objectGet(obj, path, throwError) {
	  var paths = isArray(path) ? path : path.split('.');
	  var current = obj;

	  try {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = paths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var key = _step2.value;
	        current = current[key];
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
	          _iterator2["return"]();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }
	  } catch (e) {
	    if (throwError) {
	      throw "Path does not exist";
	    }
	  }

	  return current;
	}
	function objectSet(obj, path, value) {
	  var paths = isArray(path) ? path : path.split('.');
	  var lastKey = arrayLast(paths);
	  var parent = objectGet(obj, paths.slice(0, paths.length - 1));

	  if (!parent) {
	    throw "Path does not exist";
	  }

	  parent[lastKey] = value;
	}
	function unset(obj, prop) {
	  obj[prop] = undefined;

	  try {
	    delete obj[prop];
	  } catch (e) {}
	} // exclude: array or function

	function cloneObj(obj, exclude) {
	  var type = _typeof_1(obj);

	  switch (type) {
	    case 'undefined':
	    case 'boolean':
	    case 'nuber':
	    case 'string':
	    case 'function':
	      return obj;

	    case 'object':
	      if (obj === null) {
	        // null is object
	        return obj;
	      }

	      var r;

	      if (isArray(obj)) {
	        r = [];
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = obj[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var item = _step3.value;
	            r.push(cloneObj(item, exclude));
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
	              _iterator3["return"]();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	      } else {
	        r = {};

	        for (var _i10 = 0, _Object$keys3 = Object.keys(obj); _i10 < _Object$keys3.length; _i10++) {
	          var key = _Object$keys3[_i10];

	          if (!exclude || isArray(exclude) && !exclude.includes(key) || !exclude(key, obj[key], obj)) {
	            r[key] = cloneObj(obj[key], exclude);
	          }
	        }
	      }

	      return r;

	    default:
	      return obj;
	  }
	}
	/*
	return cloned obj
	handler(value, key, parent, newParent)
	handler can return null or an object.
	null: don't change anything
	object{
	  key: false, // delete. Deprecated, this will be removed in future, please use `delete` instead of it.
	  key: new key, // use a new key instead of old key. if key == null, the old key will be detected
	  delete,
	  value, // new value. if value not gived, the old value will be detected
	  skip, // skip children
	  stop,
	}
	{key: false}: delete
	{value}: change value
	{key, value}. change key and value
	limit: to prevent circular reference.
	 */

	function mapObjectTree(obj, handler) {
	  var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
	  var r;
	  var count = 0;
	  var stack = [{
	    value: obj
	  }];

	  var _loop2 = function _loop2() {
	    if (count >= limit) {
	      throw "mapObjectTree: limit(".concat(limit, ") reached, object may has circular reference");
	    }

	    count++;

	    var _stack$shift = stack.shift(),
	        value = _stack$shift.value,
	        key = _stack$shift.key,
	        parent = _stack$shift.parent,
	        newParent = _stack$shift.newParent;

	    var t = handler(value, key, parent, newParent);

	    var assign = function assign(value, key, canPush) {
	      if (isArray(value)) {
	        value = [];
	      } else if (isObject(value)) {
	        value = {};
	      }

	      if (parent) {
	        if (isArray(newParent) && canPush) {
	          newParent.push(value);
	        } else {
	          newParent[key] = value;
	        }
	      } else {
	        r = value;
	      } // value may changed


	      return value;
	    };

	    var newVal = void 0,
	        val = void 0,
	        toDelete = void 0,
	        stop = void 0,
	        skip = void 0;

	    if (!t) {
	      // no change
	      val = value;
	      newVal = assign(value, key);
	    } else {
	      var key2 = t.key,
	          _value = t.value;
	      val = _value;

	      if (t["delete"] || key2 === false) {
	        // del
	        toDelete = true;
	      } else if (key2 == null) {
	        // don't change key
	        newVal = assign(_value, key, true);
	      } else if (t.hasOwnProperty('value')) {
	        newVal = assign(_value, key2);
	      }

	      stop = t.stop;
	      skip = t.skip;
	    }

	    if (toDelete) {
	      return "continue";
	    }

	    if (skip) {
	      return "continue";
	    }

	    if (stop) {
	      return "break";
	    }

	    if (isArray(val)) {
	      var len = val.length;

	      for (var i = 0; i < len; i++) {
	        stack.push({
	          value: val[i],
	          key: i,
	          parent: val,
	          newParent: newVal
	        });
	      }
	    } else if (isObject(val)) {
	      Object.keys(val).forEach(function (key) {
	        stack.push({
	          value: val[key],
	          key: key,
	          parent: val,
	          newParent: newVal
	        });
	      });
	    }
	  };

	  _loop: while (stack.length > 0) {
	    var _ret = _loop2();

	    switch (_ret) {
	      case "continue":
	        continue;

	      case "break":
	        break _loop;
	    }
	  }

	  return r;
	} // arr, idKey/getId

	function mapObjects(arr, idKey) {
	  var r = {};
	  var len = arr.length;

	  for (var i = 0; i < len; i++) {
	    var item = arr[i];
	    var id = isFunction(idKey) ? idKey(item, i) : item[idKey];
	    r[id] = item;
	  }

	  return r;
	} //

	function pairRows(rows1, rows2, key1, key2) {
	  if (!key2) {
	    key2 = key1;
	  }

	  var map = mapObjects(rows2, key2);
	  return rows1.map(function (row1) {
	    return [row1, map[row1[key1]]];
	  });
	} // 深度优先遍历
	// Depth-First-Search

	function depthFirstSearch(obj, handler) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
	  var reverse = arguments.length > 3 ? arguments[3] : undefined;
	  var rootChildren = hp.isArray(obj) ? obj : [obj]; //

	  var StopException = function StopException() {};

	  var func = function func(children, parent) {
	    if (reverse) {
	      children = children.slice();
	      children.reverse();
	    }

	    var len = children.length;

	    for (var i = 0; i < len; i++) {
	      var item = children[i];
	      var r = handler(item, i, parent);

	      if (r === false) {
	        // stop
	        throw new StopException();
	      } else if (r === 'skip children') {
	        continue;
	      } else if (r === 'skip siblings') {
	        break;
	      }

	      if (item[childrenKey] != null) {
	        func(item[childrenKey], item);
	      }
	    }
	  };

	  try {
	    func(rootChildren);
	  } catch (e) {
	    if (e instanceof StopException) ; else {
	      throw e;
	    }
	  }
	}
	var walkTreeData = depthFirstSearch; // rootData: Array

	function getNodeByPathFromTreeData(indexes, rootData) {
	  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
	  var cur;
	  var children = rootData;
	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;

	  try {
	    for (var _iterator4 = indexes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var index = _step4.value;
	      cur = children[index];
	      children = cur[childrenKey];
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
	        _iterator4["return"]();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
	  }

	  return cur;
	} // function helper | method helper ============================

	function resolveValueOrGettter(valueOrGetter) {
	  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	  if (isFunction(valueOrGetter)) {
	    return valueOrGetter.apply(void 0, toConsumableArray(args));
	  } else {
	    return valueOrGetter;
	  }
	}
	function executeWithCount(func) {
	  var count = 0;
	  return function () {
	    for (var _len = arguments.length, args = new Array(_len), _key3 = 0; _key3 < _len; _key3++) {
	      args[_key3] = arguments[_key3];
	    }

	    return func.call.apply(func, [this, count++].concat(args));
	  };
	}
	function watchChange(getVal, handler) {
	  var oldVal;

	  var update = function update() {
	    for (var _len2 = arguments.length, args = new Array(_len2), _key4 = 0; _key4 < _len2; _key4++) {
	      args[_key4] = arguments[_key4];
	    }

	    var newVal = getVal.apply(void 0, args);

	    if (oldVal !== newVal) {
	      handler.apply(void 0, [newVal].concat(args));
	    }

	    oldVal = newVal;
	  };

	  return update;
	}
	var store_executeOnceInScopeByName = {};
	function executeOnceInScopeByName(name, action) {
	  var scope = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : scope_executeOnceInScopeByName;
	  var storeResult = arguments.length > 3 ? arguments[3] : undefined;
	  name = "executeOnceInScopeByName_".concat(name);

	  if (!scope[name]) {
	    var value = action();

	    var destroy = function destroy() {
	      delete scope[name];
	    };

	    scope[name] = {
	      destroy: destroy
	    };

	    if (storeResult) {
	      scope[name].value = value;
	    }
	  }

	  return scope[name];
	}
	function debounceTrailing(action) {
	  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var t;
	  var delaying;
	  var lastArgs; // when trailing, use last args

	  var resolves = [];
	  var rejects = [];

	  var wrappedAction = function wrappedAction() {
	    var _this = this;

	    for (var _len3 = arguments.length, args = new Array(_len3), _key5 = 0; _key5 < _len3; _key5++) {
	      args[_key5] = arguments[_key5];
	    }

	    return new Promise(function (resolve, reject) {
	      resolves.push(resolve);
	      rejects.push(reject); //

	      lastArgs = args;

	      if (!delaying) {
	        delaying = true;
	        t = setTimeout(function () {
	          var result = action.call.apply(action, [_this].concat(toConsumableArray(lastArgs)));
	          t = null;
	          delaying = false;
	          resolves.forEach(function (resolve) {
	            return resolve(result);
	          });
	          resolves = [];
	          rejects = [];
	        }, wait);
	      }
	    });
	  };

	  wrappedAction.stop = function () {
	    if (t) {
	      clearTimeout(t);
	      t = null;
	    }

	    delaying = false;
	    resolves = [];
	    rejects.forEach(function (reject) {
	      return reject();
	    });
	    rejects = [];
	  };

	  return wrappedAction;
	}
	function debounceImmediate(action) {
	  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var t;
	  var delaying;
	  var result;

	  var wrappedAction = function wrappedAction() {
	    var _this2 = this;

	    return new Promise(function (resolve, reject) {
	      if (delaying) {
	        resolve(result);
	      } else {
	        delaying = true;
	        result = action.call.apply(action, [_this2].concat(toConsumableArray(lastArgs)));
	        resolve(result);
	        t = setTimeout(function () {
	          t = null;
	          delaying = false;
	          result = null;
	        }, wait);
	      }
	    });
	  };

	  wrappedAction.stop = function () {
	    if (t) {
	      clearTimeout(t);
	      t = null;
	    }

	    delaying = false;
	  };

	  return wrappedAction;
	}
	function debounce(action) {
	  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  if (opt.immediate) {
	    return debounceImmediate(action, wait);
	  } else {
	    return debounceTrailing(action, wait);
	  }
	}
	/**
	 * [joinMethods description]
	 * @param  {[Function[]]} methods        [description]
	 * @param  {String} [mode='value'] [value, pipeline]
	 * @return {[Function]}                [description]
	 */

	function joinMethods(methods) {
	  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'value';
	  var simpleJoinedMethod;
	  var _iteratorNormalCompletion5 = true;
	  var _didIteratorError5 = false;
	  var _iteratorError5 = undefined;

	  try {
	    var _loop3 = function _loop3() {
	      var method = _step5.value;
	      var old = simpleJoinedMethod;

	      if (old) {
	        simpleJoinedMethod = function simpleJoinedMethod() {
	          for (var _len4 = arguments.length, args = new Array(_len4), _key6 = 0; _key6 < _len4; _key6++) {
	            args[_key6] = arguments[_key6];
	          }

	          return method.call.apply(method, [this, mode === 'value' ? old.call.apply(old, [this].concat(args)) : old].concat(args));
	        };
	      } else {
	        simpleJoinedMethod = method;
	      }
	    };

	    for (var _iterator5 = methods[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	      _loop3();
	    }
	  } catch (err) {
	    _didIteratorError5 = true;
	    _iteratorError5 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
	        _iterator5["return"]();
	      }
	    } finally {
	      if (_didIteratorError5) {
	        throw _iteratorError5;
	      }
	    }
	  }

	  return simpleJoinedMethod;
	} // the returned function only accept one argument

	function joinFunctionsByResult(funcs) {
	  var wrappedFunc = funcs[0];

	  for (var i = 1; i < funcs.length; i++) {
	    wrappedFunc = join2func(wrappedFunc, funcs[i]);
	  }

	  return wrappedFunc;

	  function join2func(func1, func2) {
	    return function (arg) {
	      var result = args;
	      var result1 = func1(arg);
	      return func2(result1);
	    };
	  }
	} // must pass arguments to `next` manually

	function joinFunctionsByNext(funcs) {
	  var next = function next() {};

	  var _iteratorNormalCompletion6 = true;
	  var _didIteratorError6 = false;
	  var _iteratorError6 = undefined;

	  try {
	    for (var _iterator6 = iterateALL(funcs, {
	      reverse: true
	    })[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	      var func = _step6.value.value;
	      var currentNext = next;
	      next = wrapFuncWithNext(func, currentNext);
	    }
	  } catch (err) {
	    _didIteratorError6 = true;
	    _iteratorError6 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
	        _iterator6["return"]();
	      }
	    } finally {
	      if (_didIteratorError6) {
	        throw _iteratorError6;
	      }
	    }
	  }

	  return next;

	  function wrapFuncWithNext(func, next) {
	    return function () {
	      for (var _len5 = arguments.length, args = new Array(_len5), _key7 = 0; _key7 < _len5; _key7++) {
	        args[_key7] = arguments[_key7];
	      }

	      return func.apply(void 0, [next].concat(args));
	    };
	  }
	} // promise
	// execute promise in sequence

	function executePromiseGetters(getters) {
	  var concurrent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	  var stopped;
	  var promise = new Promise(function (resolve, reject) {
	    var r = [];
	    var chunks = splitArray(getters, concurrent);
	    var promise = Promise.resolve();
	    chunks.forEach(function (chunk) {
	      promise = promise.then(function (result) {
	        if (result) {
	          r.push.apply(r, toConsumableArray(result));
	        }

	        if (stopped) {
	          reject('stopped');
	        } else {
	          return Promise.all(chunk.map(function (v) {
	            return v();
	          }));
	        }
	      });
	    });
	    promise.then(function (result) {
	      r.push.apply(r, toConsumableArray(result));
	      resolve(r);
	    });
	  });
	  return {
	    promise: promise,
	    destroy: function destroy() {
	      stopped = true;
	    }
	  };
	}
	function promiseTimeout(promise, timeout) {
	  return new Promise(function (resolve, reject) {
	    var t, rejected;
	    promise.then(function () {
	      clearTimeout(t);
	      resolve.apply(void 0, arguments);
	    }, function () {
	      if (!rejected) {
	        clearTimeout(t);
	        reject.apply(void 0, arguments);
	      }
	    });
	    t = setTimeout(function () {
	      rejected = true;
	      var e = new Error('Promise timeout!');
	      e.name = 'timeout';
	      reject(e);
	    }, timeout);
	  });
	} // url

	/* eslint-disable */

	function getUrlParam(par) {
	  // 获取当前URL
	  var local_url = document.location.href; // 获取要取得的get参数位置

	  var get = local_url.indexOf(par + '=');

	  if (get == -1) {
	    return false;
	  } // 截取字符串


	  var get_par = local_url.slice(par.length + get + 1); // 判断截取后的字符串是否还有其他get参数

	  var nextPar = get_par.indexOf('&');

	  if (nextPar != -1) {
	    get_par = get_par.slice(0, nextPar);
	  }

	  return get_par;
	}
	/* eslint-enable */
	// dom =====================================================
	// return NodeList if there are multiple top-level nodes

	function createElementFromHTML(htmlString) {
	  var div = document.createElement('div');
	  div.innerHTML = htmlString.trim();

	  if (div.childNodes.length > 1) {
	    return div.childNodes;
	  } else {
	    return div.childNodes[0];
	  }
	}
	function uniqueId() {
	  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id_';
	  var id = prefix + strRand();
	  if (!store.uniqueId) store.uniqueId = {};
	  var generatedIds = store.uniqueId;

	  if (document.getElementById(id) || generatedIds[id]) {
	    return uniqueId(prefix);
	  } else {
	    generatedIds[id] = true;
	    return id;
	  }
	}
	function isDescendantOf(el, parent) {
	  while (true) {
	    if (el.parentElement == null) {
	      return false;
	    } else if (el.parentElement === parent) {
	      return true;
	    } else {
	      el = el.parentElement;
	    }
	  }
	}
	function removeEl(el) {
	  if (el.parentNode !== null) {
	    return el.parentNode.removeChild(el);
	  }
	} // refer: https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window

	function getScroll() {
	  if (typeof pageYOffset != 'undefined') {
	    //most browsers except IE before #9
	    return {
	      top: pageYOffset,
	      left: pageXOffset
	    };
	  } else {
	    var B = document.body; //IE 'quirks'

	    var D = document.documentElement; //IE with doctype

	    D = D.clientHeight ? D : B;
	    return {
	      top: D.scrollTop,
	      left: D.scrollLeft
	    };
	  }
	} // refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1

	function getOffset(el) {
	  var rect = getBoundingClientRect(el);
	  var scroll = getScroll();
	  return {
	    x: rect.left + scroll.left,
	    y: rect.top + scroll.top
	  };
	} // there is some trap in el.offsetParent, so use this func to fix

	function getOffsetParent(el) {
	  var offsetParent = el.offsetParent;

	  if (!offsetParent || offsetParent === document.body && getComputedStyle(document.body).position === 'static') {
	    offsetParent = document.body.parentElement;
	  }

	  return offsetParent;
	} // get el current position. like jQuery.position
	// the position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.
	// 相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.

	function getPosition(el) {
	  var offsetParent = getOffsetParent(el);
	  var ps = {
	    x: el.offsetLeft,
	    y: el.offsetTop
	  };
	  var parent = el;

	  while (true) {
	    parent = parent.parentElement;

	    if (parent === offsetParent || !parent) {
	      break;
	    }

	    ps.x -= parent.scrollLeft;
	    ps.y -= parent.scrollTop;
	  }

	  return ps;
	} // get position of a el if its offset is given. like jQuery.offset.
	// 类似 jQuery.offset的设置功能, 但是它只返回计算的position, 不改变元素样式.

	function getPositionFromOffset(el, of) {
	  var offsetParent = getOffsetParent(el);
	  var parentOf = getOffset(offsetParent);
	  return {
	    x: of.x - parentOf.x,
	    y: of.y - parentOf.y
	  };
	}
	function getBoundingClientRect(el) {
	  // refer: http://www.51xuediannao.com/javascript/getBoundingClientRect.html
	  var xy = el.getBoundingClientRect();
	  var top = xy.top - document.documentElement.clientTop,
	      //document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
	  bottom = xy.bottom,
	      left = xy.left - document.documentElement.clientLeft,
	      //document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
	  right = xy.right,
	      width = xy.width || right - left,
	      //IE67不存在width 使用right - left获得
	  height = xy.height || bottom - top;
	  var x = left;
	  var y = top;
	  return {
	    top: top,
	    right: right,
	    bottom: bottom,
	    left: left,
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}
	var getViewportPosition = getBoundingClientRect; // todo not tested

	function viewportPositionToOffset(position) {
	  var body = document.body;
	  var bodyOf = getOffset(body);
	  var bodyVP = getViewportPosition(body);
	  return {
	    x: position.x + bodyOf.x - bodyVP.x,
	    y: position.y + bodyOf.y - bodyVP.y
	  };
	} // todo not tested

	function offsetToViewportPosition(offset) {
	  var body = document.body;
	  var bodyOf = getOffset(body);
	  var bodyVP = getViewportPosition(body);
	  return {
	    x: offset.x + bodyVP.x - bodyOf.x,
	    y: offset.y + bodyVP.y - bodyOf.y
	  };
	}
	function findParent(el, callback, opt) {
	  var cur = opt && opt.withSelf ? el : el.parentElement;

	  while (cur) {
	    var r = callback(cur);

	    if (r === 'break') {
	      return;
	    } else if (r) {
	      return cur;
	    } else {
	      cur = cur.parentElement;
	    }
	  }
	}
	function backupAttr(el, name) {
	  var key = "original_".concat(name);
	  el[key] = el.getAttribute(name);
	}
	function restoreAttr(el, name) {
	  var key = "original_".concat(name);
	  el.setAttribute(name, el[key]);
	} // source: http://youmightnotneedjquery.com/

	function hasClass(el, className) {
	  if (el.classList) {
	    return el.classList.contains(className);
	  } else {
	    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	  }
	} // source: http://youmightnotneedjquery.com/

	function addClass(el, className) {
	  if (!hasClass(el, className)) {
	    if (el.classList) {
	      el.classList.add(className);
	    } else {
	      el.className += ' ' + className;
	    }
	  }
	} // source: http://youmightnotneedjquery.com/

	function removeClass(el, className) {
	  if (el.classList) {
	    el.classList.remove(className);
	  } else {
	    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	  }
	} // todo rename to getElSizeEvenInvisible in next version

	function getElSize(el) {
	  backupAttr(el, 'style');
	  el.style.display = 'block';
	  var t = getBoundingClientRect(el);
	  var size = {
	    width: t.width,
	    height: t.height
	  };
	  restoreAttr(el, 'style');
	  return size;
	}
	var getElSizeEvenInvisible = getElSize;
	/**
	 * [isOffsetInEl]
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Object} el HTML Element
	 */

	function isOffsetInEl(x, y, el) {
	  var offset = getOffset(el);
	  return offset.x <= x && offset.x + el.offsetWidth >= x && offset.y <= y && offset.y + el.offsetHeight >= y;
	} // get border

	function getBorder(el) {
	  var body = document.body;
	  var workArea = findParent(el, function (v) {
	    return hasClass(v, 'work-area');
	  });
	  var of = getOffset(workArea);
	  return {
	    left: of.x,
	    right: of.x + workArea.offsetWidth,
	    top: of.y + 50,
	    bottom: body.offsetHeight < glb().innerHeight ? glb().innerHeight : body.offsetHeight
	  };
	}
	function setElChildByIndex(el, index, child) {
	  child.childComponentIndex = index;
	  var len = el.childNodes.length;

	  if (len === 0) {
	    el.appendChild(child);
	  } else if (index === 0) {
	    el.insertBefore(child, el.childNodes[0]);
	  } else {
	    var _binarySearch = binarySearch(el.childNodes, function (el) {
	      return el.childComponentIndex - index;
	    }, 0, max$2(index, len - 1), true),
	        nearestIndex = _binarySearch.index,
	        nearest = _binarySearch.value,
	        bigger = _binarySearch.bigger;

	    if (bigger) {
	      el.insertBefore(child, nearest);
	    } else {
	      var next = el.childNodes[nearestIndex + 1];

	      if (next) {
	        el.insertBefore(child, next);
	      } else {
	        el.appendChild(child);
	      }
	    }
	  }
	} // from https://blog.csdn.net/qq_30100043/article/details/74719534

	function getCss3Prefix() {
	  var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  if (opt.noCache || store.css3Prefix == null) {
	    store.css3Prefix = reget();
	  }

	  return store.css3Prefix;

	  function reget() {
	    var div = document.createElement('div');
	    var cssText = '-webkit-transition:all .1s; -moz-transition:all .1s; -o-transition:all .1s; -ms-transition:all .1s; transition:all .1s;';
	    div.style.cssText = cssText;
	    var style = div.style;

	    if (style.webkitTransition) {
	      return '-webkit-';
	    }

	    if (style.MozTransition) {
	      return '-moz-';
	    }

	    if (style.oTransition) {
	      return '-o-';
	    }

	    if (style.msTransition) {
	      return '-ms-';
	    }

	    return '';
	  }
	} // dom event

	function onDOM(el, name, handler) {
	  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key8 = 3; _key8 < _len6; _key8++) {
	    args[_key8 - 3] = arguments[_key8];
	  }

	  if (el.addEventListener) {
	    // 所有主流浏览器，除了 IE 8 及更早 IE版本
	    el.addEventListener.apply(el, [name, handler].concat(args));
	  } else if (el.attachEvent) {
	    // IE 8 及更早 IE 版本
	    el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
	  }
	}
	function offDOM(el, name, handler) {
	  for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key9 = 3; _key9 < _len7; _key9++) {
	    args[_key9 - 3] = arguments[_key9];
	  }

	  if (el.removeEventListener) {
	    // 所有主流浏览器，除了 IE 8 及更早 IE版本
	    el.removeEventListener.apply(el, [name, handler].concat(args));
	  } else if (el.detachEvent) {
	    // IE 8 及更早 IE 版本
	    el.detachEvent.apply(el, ["on".concat(name), handler].concat(args));
	  }
	}
	function onDOMMany(els, names, handler) {
	  els = toArrayIfNot(els);
	  names = toArrayIfNot(names);

	  for (var _len8 = arguments.length, args = new Array(_len8 > 3 ? _len8 - 3 : 0), _key10 = 3; _key10 < _len8; _key10++) {
	    args[_key10 - 3] = arguments[_key10];
	  }

	  var _iteratorNormalCompletion7 = true;
	  var _didIteratorError7 = false;
	  var _iteratorError7 = undefined;

	  try {
	    for (var _iterator7 = els[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	      var el = _step7.value;
	      var _iteratorNormalCompletion10 = true;
	      var _didIteratorError10 = false;
	      var _iteratorError10 = undefined;

	      try {
	        for (var _iterator10 = names[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	          var name = _step10.value;
	          onDOM.apply(void 0, [el, name, handler].concat(args));
	        }
	      } catch (err) {
	        _didIteratorError10 = true;
	        _iteratorError10 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
	            _iterator10["return"]();
	          }
	        } finally {
	          if (_didIteratorError10) {
	            throw _iteratorError10;
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError7 = true;
	    _iteratorError7 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
	        _iterator7["return"]();
	      }
	    } finally {
	      if (_didIteratorError7) {
	        throw _iteratorError7;
	      }
	    }
	  }

	  var destroy = function destroy() {
	    var _iteratorNormalCompletion8 = true;
	    var _didIteratorError8 = false;
	    var _iteratorError8 = undefined;

	    try {
	      for (var _iterator8 = els[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	        var el = _step8.value;
	        var _iteratorNormalCompletion9 = true;
	        var _didIteratorError9 = false;
	        var _iteratorError9 = undefined;

	        try {
	          for (var _iterator9 = names[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	            var name = _step9.value;
	            offDOM(el, name, handler);
	          }
	        } catch (err) {
	          _didIteratorError9 = true;
	          _iteratorError9 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
	              _iterator9["return"]();
	            }
	          } finally {
	            if (_didIteratorError9) {
	              throw _iteratorError9;
	            }
	          }
	        }
	      }
	    } catch (err) {
	      _didIteratorError8 = true;
	      _iteratorError8 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
	          _iterator8["return"]();
	        }
	      } finally {
	        if (_didIteratorError8) {
	          throw _iteratorError8;
	        }
	      }
	    }
	  };

	  return destroy;
	}
	function getImageSizeByUrl(url) {
	  var image = document.createElement('img');
	  return new Promise(function (resolve, reject) {
	    onDOM(image, 'load', function () {
	      resolve({
	        width: image.width,
	        height: image.height
	      });
	    });
	    onDOM(image, 'error', function (e) {
	      reject(e);
	    });
	    image.src = url;
	  });
	}
	function findNodeList(list, callback) {
	  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var iterator = iterateALL(list, {
	    reverse: opt.reverse
	  });
	  var _iteratorNormalCompletion11 = true;
	  var _didIteratorError11 = false;
	  var _iteratorError11 = undefined;

	  try {
	    for (var _iterator11 = iterator[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	      var _step11$value = _step11.value,
	          value = _step11$value.value,
	          index = _step11$value.index;

	      if (callback(value, index)) {
	        return value;
	      }
	    }
	  } catch (err) {
	    _didIteratorError11 = true;
	    _iteratorError11 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
	        _iterator11["return"]();
	      }
	    } finally {
	      if (_didIteratorError11) {
	        throw _iteratorError11;
	      }
	    }
	  }
	}
	function findNodeListReverse(list, callback) {
	  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  opt.reverse = true;
	  return findNodeList(list, callback, opt);
	}
	function elementsFromPoint() {
	  var func = document.elementsFromPoint || document.msElementsFromPoint || elementsFromPoint;

	  for (var _len9 = arguments.length, args = new Array(_len9), _key11 = 0; _key11 < _len9; _key11++) {
	    args[_key11] = arguments[_key11];
	  }

	  return func.apply(document, args);

	  function elementsFromPoint(x, y) {
	    var parents = [];
	    var parent = void 0;

	    do {
	      if (parent !== document.elementFromPoint(x, y)) {
	        parent = document.elementFromPoint(x, y);
	        parents.push(parent);
	        parent.style.pointerEvents = 'none';
	      } else {
	        parent = false;
	      }
	    } while (parent);

	    parents.forEach(function (parent) {
	      return parent.style.pointerEvents = 'all';
	    });
	    return parents;
	  }
	}
	function getOuterAttachedHeight(el) {
	  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  opt = _objectSpread({
	    margin: true,
	    border: true
	  }, opt);
	  var stl = getComputedStyle(el);
	  var r = 0;
	  var arr = [];

	  if (opt.margin) {
	    arr.push('margin-top', 'margin-bottom');
	  }

	  if (opt.border) {
	    arr.push('border-top-width', 'border-bottom-width');
	  }

	  arr.forEach(function (key) {
	    r += parseFloat(stl[key]);
	  });
	  return r;
	}
	function getOuterAttachedWidth(el) {
	  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  opt = _objectSpread({
	    margin: true,
	    border: true
	  }, opt);
	  var stl = getComputedStyle(el);
	  var r = 0;
	  var arr = [];

	  if (opt.margin) {
	    arr.push('margin-left', 'margin-right');
	  }

	  if (opt.border) {
	    arr.push('border-left-width', 'border-right-width');
	  }

	  arr.forEach(function (key) {
	    r += parseFloat(stl[key]);
	  });
	  return r;
	} // DOM structure

	function insertBefore(el, target) {
	  target.parentElement.insertBefore(el, target);
	}
	function insertAfter(el, target) {
	  target.parentElement.insertBefore(el, target.nextSibling);
	}
	function prependTo(el, target) {
	  target.insertBefore(el, target.firstChild);
	}
	function appendTo(el, target) {
	  target.appendChild(el);
	} // advance
	// binarySearch 二分查找
	// callback(mid, i) should return mid - your_value

	function binarySearch(arr, callback, start, end, returnNearestIfNoHit) {
	  var max = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1000;
	  var midNum;
	  var mid;

	  if (start == null) {
	    start = 0;
	    end = arr.length - 1;
	  }

	  var i = 0;
	  var r;

	  while (start >= 0 && start <= end) {
	    if (i >= max) {
	      throw Error("binarySearch: loop times is over ".concat(max, ", you can increase the limit."));
	    }

	    midNum = Math.floor((end - start) / 2 + start);
	    mid = arr[midNum];
	    r = callback(mid, i);

	    if (r > 0) {
	      end = midNum - 1;
	    } else if (r < 0) {
	      start = midNum + 1;
	    } else {
	      return {
	        index: midNum,
	        value: mid,
	        count: i + 1,
	        hit: true
	      };
	    }

	    i++;
	  }

	  return returnNearestIfNoHit ? {
	    index: midNum,
	    value: mid,
	    count: i + 1,
	    hit: false,
	    bigger: r > 0
	  } : null;
	} //

	function windowLoaded() {
	  return new Promise(function (resolve, reject) {
	    if (document && document.readyState === 'complete') {
	      resolve();
	    } else {
	      glb().addEventListener('load', function once() {
	        resolve();
	        glb().removeEventListener('load', once);
	      });
	    }
	  });
	}
	function waitTime(milliseconds, callback) {
	  return new Promise(function (resolve, reject) {
	    setTimeout(function () {
	      callback && callback();
	      resolve();
	    }, milliseconds);
	  });
	} // overload waitFor(condition, time = 100, maxCount = 1000))

	function waitFor(name, condition) {
	  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
	  var maxCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;

	  if (isFunction(name)) {
	    maxCount = time;
	    time = isNumeric(condition) ? condition : 100;
	    condition = name;
	    name = null;
	  }

	  if (!store.waitFor) store.waitFor = {};
	  var waits = store.waitFor;

	  if (name && isset(waits[name])) {
	    glb().clearInterval(waits[name]);
	    delete waits[name];
	  }

	  return new Promise(function (resolve, reject) {
	    var count = 0;

	    function judge(interval) {
	      if (count <= maxCount) {
	        if (condition()) {
	          stop(interval, name);
	          resolve();
	        }
	      } else {
	        stop(interval, name);
	        reject(new Error('waitFor: Limit is reached'));
	      }

	      count++;
	    }

	    function stop(interval, name) {
	      if (interval) {
	        if (name && isset(waits[name])) {
	          glb().clearInterval(waits[name]);
	          delete waits[name];
	        } else {
	          glb().clearInterval(interval);
	        }
	      }
	    }

	    var interval = glb().setInterval(function () {
	      judge(interval);
	    }, time);

	    if (name) {
	      waits[name] = interval;
	    }

	    judge();
	  });
	}
	function retry(func) {
	  var limitTimes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
	  if (!store.retry) store.retry = {};
	  var counters = retry;
	  var name = generateName();
	  counters[name] = 0;
	  return doFunc;

	  function doFunc(arg1, arg2, arg3) {
	    return func(arg1, arg2, arg3).then(function (data) {
	      delete counters[name];
	      return data;
	    })["catch"](function (e) {
	      counters[name]++;

	      if (counters[name] >= limitTimes) {
	        delete counters[name];
	        return Promise.reject(e);
	      } else {
	        return doFunc(arg1, arg2, arg3);
	      }
	    });
	  }

	  function generateName() {
	    var name = Math.random() + '';

	    if (counters[name]) {
	      return generateName();
	    } else {
	      return name;
	    }
	  }
	} // 复制文字到剪贴板

	function copyTextToClipboard(text) {
	  try {
	    // use latest api
	    navigator.clipboard.writeText(text);
	    return;
	  } catch (e) {}

	  var textArea = document.createElement('textarea'); //
	  // *** This styling is an extra step which is likely not required. ***
	  //
	  // Why is it here? To ensure:
	  // 1. the element is able to have focus and selection.
	  // 2. if element was to flash render it has minimal visual impact.
	  // 3. less flakyness with selection and copying which **might** occur if
	  //    the textarea element is not visible.
	  //
	  // The likelihood is the element won't even render, not even a flash,
	  // so some of these are just precautions. However in IE the element
	  // is visible whilst the popup box asking the user for permission for
	  // the web page to copy to the clipboard.
	  //
	  // Place in top-left corner of screen regardless of scroll position.

	  textArea.style.position = 'fixed';
	  textArea.style.top = 0;
	  textArea.style.left = 0; // Ensure it has a small width and height. Setting to 1px / 1em
	  // doesn't work as this gives a negative w/h on some browsers.

	  textArea.style.width = '2em';
	  textArea.style.height = '2em'; // We don't need padding, reducing the size if it does flash render.

	  textArea.style.padding = 0; // Clean up any borders.

	  textArea.style.border = 'none';
	  textArea.style.outline = 'none';
	  textArea.style.boxShadow = 'none'; // Avoid flash of white box if rendered for any reason.

	  textArea.style.background = 'transparent';
	  textArea.value = text;
	  document.body.appendChild(textArea);
	  textArea.select();

	  try {
	    var successful = document.execCommand('copy');
	    var msg = successful ? 'successful' : 'unsuccessful';
	    console.log('Copying text command was ' + msg);
	  } catch (err) {
	    console.log('Oops, unable to copy');
	  }

	  document.body.removeChild(textArea);
	} // jquery

	function jqFixedSize(sel) {
	  var $ = glb().jQuery;
	  $(sel).each(function () {
	    var t = $(this);
	    t.css({
	      width: t.width() + 'px',
	      height: t.height() + 'px'
	    });
	  });
	}
	function jqMakeCarousel(wrapperSel, listSel, itemSel) {
	  var speed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
	  var space = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 16;
	  var dir = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'left';
	  var top = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;

	  if (space.toString().match(/^\d+$/)) {
	    space = space + 'px';
	  }

	  var spaceNumber = parseFloat(space);
	  var $ = glb().jQuery;
	  var wrapper = $(wrapperSel);
	  var list = wrapper.find(listSel);
	  wrapper.css({
	    position: 'relative',
	    height: wrapper.height() + 'px'
	  });
	  var items0 = list.find(itemSel);
	  items0.css({
	    margin: '0',
	    marginRight: space
	  });
	  var width = (Math.ceil(items0.width()) + spaceNumber) * items0.length;
	  list.css({
	    position: 'absolute',
	    margin: '0',
	    width: width + 'px'
	  });
	  var height = list.height();
	  var list2 = list.clone();
	  var list3 = list.clone();
	  list.css({
	    left: 0
	  });
	  list2.css({
	    left: width + 'px'
	  });
	  list3.css({
	    left: width * 2 + 'px'
	  });
	  var lists = $('<div></div>');
	  lists.css({
	    position: 'absolute',
	    width: width * 3 + 'px',
	    height: height + 'px',
	    left: 0,
	    top: top
	  });
	  lists.append(list).append(list2).append(list3);
	  wrapper.append(lists);
	  var left = 0;

	  function animateLoop() {
	    if (dir === 'left') {
	      left -= 100;
	    } else {
	      left += 100;
	    }

	    lists.animate({
	      left: "".concat(left, "px")
	    }, speed, 'linear', function () {
	      if (Math.abs(left) > width) {
	        if (dir === 'left') {
	          left += width;
	        } else {
	          left -= width;
	        }

	        lists.css({
	          left: left + 'px'
	        });
	      }

	      animateLoop();
	    });
	  }

	  animateLoop();
	} // https://developer.mozilla.org/docs/Web/API/Window/open
	// http://www.w3school.com.cn/htmldom/met_win_open.asp#windowfeatures

	function openWindow(url, name) {
	  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  glb().open(url, name, Object.keys(opt).map(function (k) {
	    return "".concat(k, "=").concat(opt[k]);
	  }).join(','));
	}
	function openCenterWindow(url, name, width, height) {
	  var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	  var t = {
	    width: width,
	    height: height,
	    top: (glb().screen.availHeight - 30 - height) / 2,
	    left: (glb().screen.availWidth - 30 - width) / 2
	  };
	  Object.assign(t, opt);
	  openWindow(url, name, t);
	}
	var URLHelper =
	/*#__PURE__*/
	function () {
	  // protocol, hostname, port, pastname
	  function URLHelper(baseUrl) {
	    var _this3 = this;

	    classCallCheck(this, URLHelper);

	    this.baseUrl = '';
	    this.search = {};
	    var t = decodeURI(baseUrl).split('?');
	    this.baseUrl = t[0];

	    if (t[1]) {
	      t[1].split('&').forEach(function (v) {
	        var t2 = v.split('=');
	        _this3.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
	      });
	    }
	  }

	  createClass(URLHelper, [{
	    key: "getHref",
	    value: function getHref() {
	      var _this4 = this;

	      var t = [this.baseUrl];
	      var searchStr = Object.keys(this.search).map(function (k) {
	        return "".concat(k, "=").concat(encodeURIComponent(_this4.search[k]));
	      }).join('&');

	      if (searchStr) {
	        t.push(searchStr);
	      }

	      return t.join('?');
	    }
	  }]);

	  return URLHelper;
	}(); // 解析函数参数, 帮助重载
	// types eg: ['Object', (i) => i > 3, ['Number', default], null ]
	// null represent all types of argument

	function resolveArgsByType(args, types) {
	  var argIndex = 0;
	  return types.map(function (v) {
	    // make rule
	    var rule, dft;

	    if (isArray(v)) {
	      rule = v[0];
	      dft = v[1];
	    } else {
	      rule = v;
	      dft = undefined;
	    }

	    if (!isFunction(rule)) {
	      if (rule == null) {
	        rule = function rule() {
	          return true;
	        };
	      } else {
	        var t = rule;

	        rule = function rule(x) {
	          return Object.prototype.toString.call(x) === "[object ".concat(t, "]");
	        };
	      }
	    }

	    var arg = args[argIndex];

	    if (rule(arg)) {
	      argIndex++;
	      return arg;
	    } else {
	      return dft;
	    }
	  });
	} // set null can remove a item

	function makeStorageHelper(storage) {
	  return {
	    storage: storage,
	    set: function set(name, value, minutes) {
	      if (value == null) {
	        this.storage.removeItem(name);
	      } else {
	        this.storage.setItem(name, JSON.stringify({
	          value: value,
	          expired_at: minutes ? new Date().getTime() + minutes * 60 * 1000 : null
	        }));
	      }
	    },
	    get: function get(name) {
	      var t = this.storage.getItem(name);

	      if (t) {
	        t = JSON.parse(t);

	        if (!t.expired_at || t.expired_at > new Date().getTime()) {
	          return t.value;
	        } else {
	          this.storage.removeItem(name);
	        }
	      }

	      return null;
	    },
	    clear: function clear() {
	      this.storage.clear();
	    }
	  };
	}
	function getLocalStorage2() {
	  if (!store.localStorage2) {
	    store.localStorage2 = makeStorageHelper(glb().localStorage);
	  }

	  return store.localStorage2;
	}
	function getSessionStorage2() {
	  if (!store.sessionStorage2) {
	    store.sessionStorage2 = makeStorageHelper(glb().sessionStorage);
	  }

	  return store.sessionStorage2;
	} // 事件处理

	var EventProcessor =
	/*#__PURE__*/
	function () {
	  function EventProcessor() {
	    classCallCheck(this, EventProcessor);

	    this.eventStore = [];
	  }

	  createClass(EventProcessor, [{
	    key: "on",
	    value: function on(name, handler) {
	      this.eventStore.push({
	        name: name,
	        handler: handler
	      });
	    }
	  }, {
	    key: "once",
	    value: function once(name, handler) {
	      var _this5 = this;

	      var off = function off() {
	        _this5.off(name, wrappedHandler);
	      };

	      var wrappedHandler = function wrappedHandler() {
	        handler.apply(void 0, arguments);
	        off();
	      };

	      this.on(name, wrappedHandler);
	      return off;
	    }
	  }, {
	    key: "onceTimeout",
	    value: function onceTimeout(name, handler, timeout) {
	      var _this6 = this;

	      var off;
	      var promise = new Promise(function (resolve, reject) {
	        var wrappedHandler = function wrappedHandler() {
	          handler.apply(void 0, arguments);
	          resolve();
	        };

	        off = _this6.once(name, wrappedHandler);
	        waitTime(timeout).then(function () {
	          off();
	          reject();
	        });
	      });

	      var off2 = function off2() {
	        off && off();
	      };

	      return {
	        off: off2,
	        promise: promise
	      };
	    }
	  }, {
	    key: "off",
	    value: function off(name, handler) {
	      var indexes = []; // to remove indexes; reverse; 倒序的

	      var len = this.eventStore.length;

	      for (var i = 0; i < len; i++) {
	        var item = this.eventStore[i];

	        if (item.name === name && item.handler === handler) {
	          indexes.unshift(i);
	        }
	      }

	      for (var _i11 = 0, _indexes = indexes; _i11 < _indexes.length; _i11++) {
	        var index = _indexes[_i11];
	        this.eventStore.splice(index, 1);
	      }
	    }
	  }, {
	    key: "emit",
	    value: function emit(name) {
	      // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
	      var items = [];
	      var _iteratorNormalCompletion12 = true;
	      var _didIteratorError12 = false;
	      var _iteratorError12 = undefined;

	      try {
	        for (var _iterator12 = this.eventStore[Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	          var item = _step12.value;

	          if (item.name === name) {
	            items.push(item);
	          }
	        }
	      } catch (err) {
	        _didIteratorError12 = true;
	        _iteratorError12 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
	            _iterator12["return"]();
	          }
	        } finally {
	          if (_didIteratorError12) {
	            throw _iteratorError12;
	          }
	        }
	      }

	      for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key12 = 1; _key12 < _len10; _key12++) {
	        args[_key12 - 1] = arguments[_key12];
	      }

	      for (var _i12 = 0, _items = items; _i12 < _items.length; _i12++) {
	        var _item = _items[_i12];

	        _item.handler.apply(_item, args);
	      }
	    }
	  }]);

	  return EventProcessor;
	}();
	var CrossWindowEventProcessor =
	/*#__PURE__*/
	function (_EventProcessor) {
	  inherits(CrossWindowEventProcessor, _EventProcessor);

	  // id
	  function CrossWindowEventProcessor(opt) {
	    var _this7;

	    classCallCheck(this, CrossWindowEventProcessor);

	    _this7 = possibleConstructorReturn(this, getPrototypeOf(CrossWindowEventProcessor).call(this));
	    _this7.storageName = '_crossWindow';
	    _this7.windows = [];
	    _this7.timeout = 200;
	    _this7.BROADCAST = '__BROADCAST__';

	    if (opt) {
	      Object.assign(assertThisInitialized(_this7), opt);
	    }

	    onDOM(window, 'storage', function (ev) {
	      if (ev.key === _this7.storageName) {
	        var event = JSON.parse(ev.newValue);

	        if (!event.targets || event.targets.includes(_this7.id)) {
	          var _this8;

	          (_this8 = _this7).emitLocal.apply(_this8, [event.name].concat(toConsumableArray(event.args)));
	        }
	      }
	    }); // social parts 集体部分
	    // join

	    _this7.id = strRand();
	    _this7.windows = [_this7.id];
	    _this7.ready = new Promise(function (resolve, reject) {
	      _this7.onceTimeout('_windows_updated', function (_ref) {
	        var windows = _ref.windows;
	        _this7.windows = windows;
	      }, _this7.timeout).promise.then(function () {
	        resolve(); // responsed 被响应
	      }, function () {
	        // no response 无响应
	        resolve();
	      });

	      _this7.broadcast('_join', _this7.id);
	    });

	    _this7.ready.then(function () {
	      // on join
	      _this7.on('_join', function (id) {
	        _this7.windows.push(id);

	        if (_this7.isMain()) {
	          _this7.broadcast('_windows_updated', {
	            windows: _this7.windows,
	            type: 'join',
	            id: id
	          });
	        }
	      }); // on _windows_updated


	      _this7.on('_windows_updated', function (_ref2) {
	        var windows = _ref2.windows;
	        _this7.windows = windows;
	      }); // on exit


	      _this7.on('_exit', function (id) {
	        var oldMain = _this7.windows[0];
	        arrayRemove(_this7.windows, id);

	        if (_this7.isMain()) {
	          _this7.emit('_windows_updated', {
	            windows: _this7.windows,
	            type: 'exit',
	            id: id
	          });

	          if (oldMain != _this7.id) {
	            console.log('_main_updated');

	            _this7.emit('_main_updated', {
	              windows: _this7.windows,
	              old: oldMain,
	              'new': _this7.id
	            });
	          }
	        }
	      });

	      onDOM(window, 'beforeunload', function () {
	        _this7.exitGroup();
	      });
	    });

	    return _this7;
	  }

	  createClass(CrossWindowEventProcessor, [{
	    key: "isMain",
	    value: function isMain() {
	      return this.id === this.windows[0];
	    }
	  }, {
	    key: "emitTo",
	    value: function emitTo(name, targets) {
	      for (var _len11 = arguments.length, args = new Array(_len11 > 2 ? _len11 - 2 : 0), _key13 = 2; _key13 < _len11; _key13++) {
	        args[_key13 - 2] = arguments[_key13];
	      }

	      if (targets === this.BROADCAST) {
	        targets = null;
	      } else {
	        if (targets && !isArray(targets)) {
	          targets = [targets];
	        }

	        if (targets.includes(this.id)) {
	          var _get2;

	          (_get2 = get(getPrototypeOf(CrossWindowEventProcessor.prototype), "emit", this)).call.apply(_get2, [this, name].concat(args)); // emit to current window

	        }
	      }

	      glb().localStorage.setItem(this.storageName, JSON.stringify({
	        name: name,
	        targets: targets,
	        args: args,
	        // use random make storage event triggered every time
	        // 加入随机保证触发storage事件
	        random: Math.random()
	      }));
	    }
	  }, {
	    key: "emitLocal",
	    value: function emitLocal(name) {
	      for (var _len12 = arguments.length, args = new Array(_len12 > 1 ? _len12 - 1 : 0), _key14 = 1; _key14 < _len12; _key14++) {
	        args[_key14 - 1] = arguments[_key14];
	      }

	      this.emitTo.apply(this, [name, this.id].concat(args));
	    }
	  }, {
	    key: "broadcast",
	    value: function broadcast(name) {
	      for (var _len13 = arguments.length, args = new Array(_len13 > 1 ? _len13 - 1 : 0), _key15 = 1; _key15 < _len13; _key15++) {
	        args[_key15 - 1] = arguments[_key15];
	      }

	      this.emitTo.apply(this, [name, this.BROADCAST].concat(args));
	    }
	  }, {
	    key: "emit",
	    value: function emit(name) {
	      for (var _len14 = arguments.length, args = new Array(_len14 > 1 ? _len14 - 1 : 0), _key16 = 1; _key16 < _len14; _key16++) {
	        args[_key16 - 1] = arguments[_key16];
	      }

	      this.emitTo.apply(this, [name, this.windows].concat(args));
	    }
	  }, {
	    key: "exitGroup",
	    value: function exitGroup() {
	      this.broadcast('_exit', this.id);
	    }
	  }]);

	  return CrossWindowEventProcessor;
	}(EventProcessor); // Deprecated in next version

	var CrossWindow = CrossWindowEventProcessor;
	function onQuickKeydown(handler) {
	  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  opt = _objectSpread({
	    timeout: 1000
	  }, opt);
	  var input = '';
	  var timeoutId;

	  var keydownHandler = function keydownHandler(e) {
	    if (e.key && e.key.length === 1) {
	      input = "".concat(input).concat(e.key);
	      handler(input);

	      if (timeoutId) {
	        clearTimeout(timeoutId);
	        timeoutId = null;
	      }

	      setTimeout(function () {
	        input = '';
	      }, opt.timeout);
	    }
	  };

	  onDOM(document, 'keydown', keydownHandler);
	  return function () {
	    offDOM(document, 'keydown', keydownHandler);
	  };
	}
	function getUserLanguage() {
	  return navigator.language || navigator.userLanguage;
	}
	var Cache =
	/*#__PURE__*/
	function () {
	  function Cache() {
	    classCallCheck(this, Cache);

	    this.store = {};
	  }

	  createClass(Cache, [{
	    key: "has",
	    value: function has(name) {
	      return this.store.hasOwnProperty(name);
	    }
	  }, {
	    key: "remember",
	    value: function remember(name, getter) {
	      if (!this.has(name)) {
	        this.store[name] = {
	          value: getter()
	        };
	      }

	      return this.store[name].value;
	    }
	  }, {
	    key: "forget",
	    value: function forget(name) {
	      if (name) {
	        if (this.has(name)) {
	          delete this.store[name];
	        }
	      } else {
	        this.store = {};
	      }
	    }
	  }]);

	  return Cache;
	}(); // attach cached getters to an object; can attach to self

	function attachCache(obj, toCache) {
	  var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Cache();

	  var _loop4 = function _loop4(key) {
	    var getter = toCache[key];
	    Object.defineProperty(obj, key, {
	      get: function get() {
	        var _this9 = this;

	        return cache.remember(key, function () {
	          return getter.call(_this9);
	        });
	      }
	    });
	  };

	  for (var key in toCache) {
	    _loop4(key);
	  }
	}

	exports.Cache = Cache;
	exports.CrossWindow = CrossWindow;
	exports.CrossWindowEventProcessor = CrossWindowEventProcessor;
	exports.EventProcessor = EventProcessor;
	exports.URLHelper = URLHelper;
	exports.addClass = addClass;
	exports.appendTo = appendTo;
	exports.arrayAt = arrayAt;
	exports.arrayDiff = arrayDiff;
	exports.arrayDistinct = arrayDistinct;
	exports.arrayFirst = arrayFirst;
	exports.arrayGet = arrayGet;
	exports.arrayLast = arrayLast;
	exports.arrayRemove = arrayRemove;
	exports.arrayRemoveBySortedIndexes = arrayRemoveBySortedIndexes;
	exports.arraySibling = arraySibling;
	exports.arrayWithoutEnd = arrayWithoutEnd;
	exports.assignIfDifferent = assignIfDifferent;
	exports.attachCache = attachCache;
	exports.backupAttr = backupAttr;
	exports.binarySearch = binarySearch;
	exports.camelCase = camelCase;
	exports.camelToWords = camelToWords;
	exports.cloneObj = cloneObj;
	exports.copyTextToClipboard = copyTextToClipboard;
	exports.createElementFromHTML = createElementFromHTML;
	exports.debounce = debounce;
	exports.debounceImmediate = debounceImmediate;
	exports.debounceTrailing = debounceTrailing;
	exports.depthFirstSearch = depthFirstSearch;
	exports.elementsFromPoint = elementsFromPoint;
	exports.empty = empty$1;
	exports.executeOnceInScopeByName = executeOnceInScopeByName;
	exports.executePromiseGetters = executePromiseGetters;
	exports.executeWithCount = executeWithCount;
	exports.findNodeList = findNodeList;
	exports.findNodeListReverse = findNodeListReverse;
	exports.findParent = findParent;
	exports.forAll = forAll;
	exports.getBorder = getBorder;
	exports.getBoundingClientRect = getBoundingClientRect;
	exports.getCss3Prefix = getCss3Prefix;
	exports.getElSize = getElSize;
	exports.getElSizeEvenInvisible = getElSizeEvenInvisible;
	exports.getImageSizeByUrl = getImageSizeByUrl;
	exports.getLocalStorage2 = getLocalStorage2;
	exports.getNodeByPathFromTreeData = getNodeByPathFromTreeData;
	exports.getOffset = getOffset;
	exports.getOffsetParent = getOffsetParent;
	exports.getOuterAttachedHeight = getOuterAttachedHeight;
	exports.getOuterAttachedWidth = getOuterAttachedWidth;
	exports.getPosition = getPosition;
	exports.getPositionFromOffset = getPositionFromOffset;
	exports.getScroll = getScroll;
	exports.getSessionStorage2 = getSessionStorage2;
	exports.getUrlParam = getUrlParam;
	exports.getUserLanguage = getUserLanguage;
	exports.getViewportPosition = getViewportPosition;
	exports.glb = glb;
	exports.groupArray = groupArray;
	exports.hasClass = hasClass;
	exports.insertAfter = insertAfter;
	exports.insertBefore = insertBefore;
	exports.isArray = isArray;
	exports.isBool = isBool;
	exports.isDescendantOf = isDescendantOf;
	exports.isFunction = isFunction;
	exports.isNumber = isNumber;
	exports.isNumeric = isNumeric;
	exports.isObject = isObject;
	exports.isOffsetInEl = isOffsetInEl;
	exports.isPromise = isPromise;
	exports.isString = isString;
	exports.isset = isset;
	exports.iterateALL = iterateALL;
	exports.joinFunctionsByNext = joinFunctionsByNext;
	exports.joinFunctionsByResult = joinFunctionsByResult;
	exports.joinMethods = joinMethods;
	exports.jqFixedSize = jqFixedSize;
	exports.jqMakeCarousel = jqMakeCarousel;
	exports.kebabCase = kebabCase;
	exports.makeStorageHelper = makeStorageHelper;
	exports.mapObjectTree = mapObjectTree;
	exports.mapObjects = mapObjects;
	exports.max = max$2;
	exports.min = min$3;
	exports.newArrayRemoveAt = newArrayRemoveAt;
	exports.numPad = numPad;
	exports.numRand = numRand;
	exports.objectExcept = objectExcept;
	exports.objectGet = objectGet;
	exports.objectMap = objectMap;
	exports.objectMerge = objectMerge;
	exports.objectOnly = objectOnly;
	exports.objectSet = objectSet;
	exports.offDOM = offDOM;
	exports.offsetToViewportPosition = offsetToViewportPosition;
	exports.onDOM = onDOM;
	exports.onDOMMany = onDOMMany;
	exports.onQuickKeydown = onQuickKeydown;
	exports.openCenterWindow = openCenterWindow;
	exports.openWindow = openWindow;
	exports.pairRows = pairRows;
	exports.prependTo = prependTo;
	exports.promiseTimeout = promiseTimeout;
	exports.removeClass = removeClass;
	exports.removeEl = removeEl;
	exports.replaceMultiple = replaceMultiple;
	exports.resolveArgsByType = resolveArgsByType;
	exports.resolveValueOrGettter = resolveValueOrGettter;
	exports.restoreAttr = restoreAttr;
	exports.retry = retry;
	exports.setElChildByIndex = setElChildByIndex;
	exports.snakeCase = snakeCase;
	exports.splitArray = splitArray;
	exports.store = store;
	exports.store_executeOnceInScopeByName = store_executeOnceInScopeByName;
	exports.strRand = strRand;
	exports.studlyCase = studlyCase;
	exports.titleCase = titleCase;
	exports.toArrayIfNot = toArrayIfNot;
	exports.uniqueId = uniqueId;
	exports.unset = unset;
	exports.viewportPositionToOffset = viewportPositionToOffset;
	exports.waitFor = waitFor;
	exports.waitTime = waitTime;
	exports.walkTreeData = walkTreeData;
	exports.watchChange = watchChange;
	exports.windowLoaded = windowLoaded;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
