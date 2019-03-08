/*!
 * helper-js v1.3.7
 * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.helperJs = {})));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  function _get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return _get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  // local store
  var store = {}; // get global

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
    return isFinite(v);
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
  function empty(v) {
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
  function min(n, min) {
    return n < min ? min : n;
  }
  function max(n, max) {
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
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
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
      return _toConsumableArray(new Set(arr));
    } else {
      return arr.filter(function (v, i, a) {
        return a.indexOf(v) === i;
      });
    }
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

  function forAll(val, handler, reverse) {
    if (!reverse) {
      if (isArray(val) || isString(val)) {
        for (var i = 0; i < val.length; i++) {
          if (handler(val[i], i) === false) {
            break;
          }
        }
      } else if (isObject(val)) {
        var _arr = Object.keys(val);

        for (var _i2 = 0; _i2 < _arr.length; _i2++) {
          var key = _arr[_i2];

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
      if (isArray(val) || isString(val)) {
        for (var _i4 = val.length - 1; _i4 >= 0; _i4--) {
          if (handler(val[_i4], _i4) === false) {
            break;
          }
        }
      } else if (isObject(val)) {
        var keys = Object.keys(val);
        keys.reverse();

        for (var _i5 = 0; _i5 < keys.length; _i5++) {
          var _key = keys[_i5];

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
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
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
    var type = _typeof(obj);

    switch (type) {
      case 'undefined':
      case 'boolean':
      case 'nuber':
      case 'string':
      case 'function':
        return obj;
        break;

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
              if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        } else {
          r = {};

          var _arr2 = Object.keys(obj);

          for (var _i7 = 0; _i7 < _arr2.length; _i7++) {
            var key = _arr2[_i7];

            if (!exclude || isArray(exclude) && !exclude.includes(key) || !exclude(key, obj[key], obj)) {
              r[key] = cloneObj(obj[key], exclude);
            }
          }
        }

        return r;
        break;

      default:
        return obj;
        break;
    }
  }
  /*
  return cloned obj
  handler(value, key, parent)
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

      var t = handler(value, key, parent);

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

        if (t.delete || key2 === false) {
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
  } // function helper | method helper

  function executeWithCount(func) {
    var count = 0;
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return func.call.apply(func, [this, count++].concat(args));
    };
  }
  function watchChange(getVal, handler) {
    var oldVal;

    var update = function update() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        args[_key3] = arguments[_key3];
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

      for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return new Promise(function (resolve, reject) {
        resolves.push(resolve);
        rejects.push(reject); //

        lastArgs = args;

        if (!delaying) {
          delaying = true;
          t = setTimeout(function () {
            var result = action.call.apply(action, [_this].concat(_toConsumableArray(lastArgs)));
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
          result = action.call.apply(action, [_this2].concat(_toConsumableArray(lastArgs)));
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
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      var _loop3 = function _loop3() {
        var method = _step4.value;
        var old = simpleJoinedMethod;

        if (old) {
          simpleJoinedMethod = function simpleJoinedMethod() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
              args[_key5] = arguments[_key5];
            }

            return method.call.apply(method, [this, mode === 'value' ? old.call.apply(old, [this].concat(args)) : old].concat(args));
          };
        } else {
          simpleJoinedMethod = method;
        }
      };

      for (var _iterator4 = methods[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        _loop3();
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    return simpleJoinedMethod;
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
            r.push.apply(r, _toConsumableArray(result));
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
        r.push.apply(r, _toConsumableArray(result));
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

    var get$$1 = local_url.indexOf(par + '=');

    if (get$$1 == -1) {
      return false;
    } // 截取字符串


    var get_par = local_url.slice(par.length + get$$1 + 1); // 判断截取后的字符串是否还有其他get参数

    var nextPar = get_par.indexOf('&');

    if (nextPar != -1) {
      get_par = get_par.slice(0, nextPar);
    }

    return get_par;
  }
  /* eslint-enable */
  // dom

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
    var rect = el.getBoundingClientRect();
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
  function findParent(el, callback) {
    return doFindParent(el, callback);

    function doFindParent(el, callback) {
      if (el.parentElement) {
        if (callback(el.parentElement)) {
          return el.parentElement;
        } else {
          return doFindParent(el.parentElement, callback);
        }
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
  }
  function getElSize(el) {
    var originDisplay = el.style.display;
    el.style.display = 'block';
    var size = {
      width: el.offsetWidth,
      height: el.offsetHeight
    };
    el.style.display = originDisplay;
    return size;
  }
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
      }, 0, max(index, len - 1), true),
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
    for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key6 = 3; _key6 < _len5; _key6++) {
      args[_key6 - 3] = arguments[_key6];
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
    for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key7 = 3; _key7 < _len6; _key7++) {
      args[_key7 - 3] = arguments[_key7];
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

    for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key8 = 3; _key8 < _len7; _key8++) {
      args[_key8 - 3] = arguments[_key8];
    }

    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = els[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var el = _step5.value;
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = names[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var name = _step8.value;
            onDOM.apply(void 0, [el, name, handler].concat(args));
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
              _iterator8.return();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
          _iterator5.return();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    var destroy = function destroy() {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = els[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var el = _step6.value;
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = names[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var name = _step7.value;
              offDOM(el, name, handler);
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return != null) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }
    };

    return destroy;
  } // advance
  // binarySearch 二分查找

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
      }).catch(function (e) {
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

      _classCallCheck(this, URLHelper);

      Object.defineProperty(this, "baseUrl", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: ''
      });
      Object.defineProperty(this, "search", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: {}
      });
      var t = decodeURI(baseUrl).split('?');
      this.baseUrl = t[0];

      if (t[1]) {
        t[1].split('&').forEach(function (v) {
          var t2 = v.split('=');
          _this3.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
        });
      }
    }

    _createClass(URLHelper, [{
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
      get: function get$$1(name) {
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
      _classCallCheck(this, EventProcessor);

      Object.defineProperty(this, "eventStore", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: []
      });
    }

    _createClass(EventProcessor, [{
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
          handler();
          off();
        };

        this.on(name, wrappedHandler);
        return off;
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

        for (var _i8 = 0; _i8 < indexes.length; _i8++) {
          var index = indexes[_i8];
          this.eventStore.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(name) {
        // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
        var items = [];
        var _iteratorNormalCompletion9 = true;
        var _didIteratorError9 = false;
        var _iteratorError9 = undefined;

        try {
          for (var _iterator9 = this.eventStore[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            var item = _step9.value;

            if (item.name === name) {
              items.push(item);
            }
          }
        } catch (err) {
          _didIteratorError9 = true;
          _iteratorError9 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion9 && _iterator9.return != null) {
              _iterator9.return();
            }
          } finally {
            if (_didIteratorError9) {
              throw _iteratorError9;
            }
          }
        }

        for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key9 = 1; _key9 < _len8; _key9++) {
          args[_key9 - 1] = arguments[_key9];
        }

        for (var _i9 = 0; _i9 < items.length; _i9++) {
          var _item = items[_i9];

          _item.handler.apply(_item, args);
        }
      }
    }]);

    return EventProcessor;
  }();
  var CrossWindow =
  /*#__PURE__*/
  function (_EventProcessor) {
    _inherits(CrossWindow, _EventProcessor);

    function CrossWindow() {
      var _this6;

      _classCallCheck(this, CrossWindow);

      _this6 = _possibleConstructorReturn(this, (CrossWindow.__proto__ || Object.getPrototypeOf(CrossWindow)).call(this));
      Object.defineProperty(_assertThisInitialized(_this6), "storageName", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: '_crossWindow'
      });
      var cls = CrossWindow;

      if (!cls._listen) {
        cls._listen = true;
        onDOM(window, 'storage', function (ev) {
          if (ev.key === _this6.storageName) {
            var _get2;

            var event = JSON.parse(ev.newValue);

            (_get2 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", _assertThisInitialized(_this6))).call.apply(_get2, [_this6, event.name].concat(_toConsumableArray(event.args)));
          }
        });
      }

      return _this6;
    }

    _createClass(CrossWindow, [{
      key: "emit",
      value: function emit(name) {
        var _get3;

        for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key10 = 1; _key10 < _len9; _key10++) {
          args[_key10 - 1] = arguments[_key10];
        }

        (_get3 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", this)).call.apply(_get3, [this, name].concat(args));

        glb().localStorage.setItem(this.storageName, JSON.stringify({
          name: name,
          args: args,
          // use random make storage event triggered every time
          // 加入随机保证触发storage事件
          random: Math.random()
        }));
      }
    }]);

    return CrossWindow;
  }(EventProcessor);

  exports.store = store;
  exports.glb = glb;
  exports.isset = isset;
  exports.isArray = isArray;
  exports.isBool = isBool;
  exports.isNumber = isNumber;
  exports.isNumeric = isNumeric;
  exports.isString = isString;
  exports.isObject = isObject;
  exports.isFunction = isFunction;
  exports.isPromise = isPromise;
  exports.empty = empty;
  exports.numRand = numRand;
  exports.numPad = numPad;
  exports.min = min;
  exports.max = max;
  exports.studlyCase = studlyCase;
  exports.kebabCase = kebabCase;
  exports.snakeCase = snakeCase;
  exports.camelCase = camelCase;
  exports.camelToWords = camelToWords;
  exports.titleCase = titleCase;
  exports.strRand = strRand;
  exports.replaceMultiple = replaceMultiple;
  exports.arrayRemove = arrayRemove;
  exports.arrayRemoveBySortedIndexes = arrayRemoveBySortedIndexes;
  exports.newArrayRemoveAt = newArrayRemoveAt;
  exports.arrayAt = arrayAt;
  exports.arrayFirst = arrayFirst;
  exports.arrayLast = arrayLast;
  exports.arrayDiff = arrayDiff;
  exports.arraySibling = arraySibling;
  exports.toArrayIfNot = toArrayIfNot;
  exports.splitArray = splitArray;
  exports.groupArray = groupArray;
  exports.arrayDistinct = arrayDistinct;
  exports.assignIfDifferent = assignIfDifferent;
  exports.objectMerge = objectMerge;
  exports.objectMap = objectMap;
  exports.objectOnly = objectOnly;
  exports.objectExcept = objectExcept;
  exports.forAll = forAll;
  exports.objectGet = objectGet;
  exports.objectSet = objectSet;
  exports.unset = unset;
  exports.cloneObj = cloneObj;
  exports.mapObjectTree = mapObjectTree;
  exports.mapObjects = mapObjects;
  exports.pairRows = pairRows;
  exports.executeWithCount = executeWithCount;
  exports.watchChange = watchChange;
  exports.store_executeOnceInScopeByName = store_executeOnceInScopeByName;
  exports.executeOnceInScopeByName = executeOnceInScopeByName;
  exports.debounceTrailing = debounceTrailing;
  exports.debounceImmediate = debounceImmediate;
  exports.debounce = debounce;
  exports.joinMethods = joinMethods;
  exports.executePromiseGetters = executePromiseGetters;
  exports.promiseTimeout = promiseTimeout;
  exports.getUrlParam = getUrlParam;
  exports.uniqueId = uniqueId;
  exports.isDescendantOf = isDescendantOf;
  exports.removeEl = removeEl;
  exports.getScroll = getScroll;
  exports.getOffset = getOffset;
  exports.getOffsetParent = getOffsetParent;
  exports.getPosition = getPosition;
  exports.getPositionFromOffset = getPositionFromOffset;
  exports.findParent = findParent;
  exports.backupAttr = backupAttr;
  exports.restoreAttr = restoreAttr;
  exports.hasClass = hasClass;
  exports.addClass = addClass;
  exports.removeClass = removeClass;
  exports.getElSize = getElSize;
  exports.isOffsetInEl = isOffsetInEl;
  exports.getBorder = getBorder;
  exports.setElChildByIndex = setElChildByIndex;
  exports.getCss3Prefix = getCss3Prefix;
  exports.onDOM = onDOM;
  exports.offDOM = offDOM;
  exports.onDOMMany = onDOMMany;
  exports.binarySearch = binarySearch;
  exports.windowLoaded = windowLoaded;
  exports.waitTime = waitTime;
  exports.waitFor = waitFor;
  exports.retry = retry;
  exports.copyTextToClipboard = copyTextToClipboard;
  exports.jqFixedSize = jqFixedSize;
  exports.jqMakeCarousel = jqMakeCarousel;
  exports.openWindow = openWindow;
  exports.openCenterWindow = openCenterWindow;
  exports.URLHelper = URLHelper;
  exports.resolveArgsByType = resolveArgsByType;
  exports.makeStorageHelper = makeStorageHelper;
  exports.getLocalStorage2 = getLocalStorage2;
  exports.getSessionStorage2 = getSessionStorage2;
  exports.EventProcessor = EventProcessor;
  exports.CrossWindow = CrossWindow;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
