import 'core-js/modules/es.symbol';
import 'core-js/modules/es.symbol.description';
import 'core-js/modules/es.symbol.iterator';
import 'core-js/modules/es.array.concat';
import 'core-js/modules/es.array.filter';
import 'core-js/modules/es.array.find';
import 'core-js/modules/es.array.for-each';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.array.index-of';
import 'core-js/modules/es.array.join';
import 'core-js/modules/es.array.map';
import 'core-js/modules/es.array.reverse';
import 'core-js/modules/es.array.slice';
import 'core-js/modules/es.array.splice';
import 'core-js/modules/es.date.to-string';
import 'core-js/modules/es.function.name';
import 'core-js/modules/es.map';
import 'core-js/modules/es.number.constructor';
import 'core-js/modules/es.number.is-integer';
import 'core-js/modules/es.object.define-properties';
import 'core-js/modules/es.object.define-property';
import 'core-js/modules/es.object.get-own-property-descriptor';
import 'core-js/modules/es.object.get-own-property-descriptors';
import 'core-js/modules/es.object.keys';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.parse-float';
import 'core-js/modules/es.regexp.constructor';
import 'core-js/modules/es.regexp.exec';
import 'core-js/modules/es.regexp.to-string';
import 'core-js/modules/es.set';
import 'core-js/modules/es.string.includes';
import 'core-js/modules/es.string.iterator';
import 'core-js/modules/es.string.match';
import 'core-js/modules/es.string.replace';
import 'core-js/modules/es.string.search';
import 'core-js/modules/es.string.split';
import 'core-js/modules/es.string.trim';
import 'core-js/modules/web.dom-collections.for-each';
import 'core-js/modules/web.dom-collections.iterator';
import 'core-js/modules/web.timers';
import _possibleConstructorReturn from '../node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn';
import _assertThisInitialized from '../node_modules/@babel/runtime/helpers/esm/assertThisInitialized';
import _getPrototypeOf from '../node_modules/@babel/runtime/helpers/esm/getPrototypeOf';
import _get from '../node_modules/@babel/runtime/helpers/esm/get';
import _inherits from '../node_modules/@babel/runtime/helpers/esm/inherits';
import _classCallCheck from '../node_modules/@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '../node_modules/@babel/runtime/helpers/esm/createClass';
import _defineProperty from '../node_modules/@babel/runtime/helpers/esm/defineProperty';
import _typeof from '../node_modules/@babel/runtime/helpers/esm/typeof';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import 'regenerator-runtime/runtime';
import _toConsumableArray from '../node_modules/@babel/runtime/helpers/esm/toConsumableArray';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked =
/*#__PURE__*/
_regeneratorRuntime.mark(iterateALL);

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
    return _toConsumableArray(new Set(arr));
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

  return _regeneratorRuntime.wrap(function iterateALL$(_context) {
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
  var type = _typeof(obj);

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
    return valueOrGetter.apply(void 0, _toConsumableArray(args));
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

    _classCallCheck(this, URLHelper);

    _defineProperty(this, "baseUrl", '');

    _defineProperty(this, "search", {});

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
    _classCallCheck(this, EventProcessor);

    _defineProperty(this, "eventStore", []);
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
  _inherits(CrossWindowEventProcessor, _EventProcessor);

  // id
  function CrossWindowEventProcessor(opt) {
    var _this7;

    _classCallCheck(this, CrossWindowEventProcessor);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(CrossWindowEventProcessor).call(this));

    _defineProperty(_assertThisInitialized(_this7), "storageName", '_crossWindow');

    _defineProperty(_assertThisInitialized(_this7), "windows", []);

    _defineProperty(_assertThisInitialized(_this7), "timeout", 200);

    _defineProperty(_assertThisInitialized(_this7), "BROADCAST", '__BROADCAST__');

    if (opt) {
      Object.assign(_assertThisInitialized(_this7), opt);
    }

    onDOM(window, 'storage', function (ev) {
      if (ev.key === _this7.storageName) {
        var event = JSON.parse(ev.newValue);

        if (!event.targets || event.targets.includes(_this7.id)) {
          var _this8;

          (_this8 = _this7).emitLocal.apply(_this8, [event.name].concat(_toConsumableArray(event.args)));
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

  _createClass(CrossWindowEventProcessor, [{
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

          (_get2 = _get(_getPrototypeOf(CrossWindowEventProcessor.prototype), "emit", this)).call.apply(_get2, [this, name].concat(args)); // emit to current window

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
    _classCallCheck(this, Cache);

    _defineProperty(this, "store", {});
  }

  _createClass(Cache, [{
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

export { Cache, CrossWindow, CrossWindowEventProcessor, EventProcessor, URLHelper, addClass, appendTo, arrayAt, arrayDiff, arrayDistinct, arrayFirst, arrayGet, arrayLast, arrayRemove, arrayRemoveBySortedIndexes, arraySibling, arrayWithoutEnd, assignIfDifferent, attachCache, backupAttr, binarySearch, camelCase, camelToWords, cloneObj, copyTextToClipboard, createElementFromHTML, debounce, debounceImmediate, debounceTrailing, depthFirstSearch, elementsFromPoint, empty, executeOnceInScopeByName, executePromiseGetters, executeWithCount, findNodeList, findNodeListReverse, findParent, forAll, getBorder, getBoundingClientRect, getCss3Prefix, getElSize, getElSizeEvenInvisible, getImageSizeByUrl, getLocalStorage2, getNodeByPathFromTreeData, getOffset, getOffsetParent, getOuterAttachedHeight, getOuterAttachedWidth, getPosition, getPositionFromOffset, getScroll, getSessionStorage2, getUrlParam, getUserLanguage, getViewportPosition, glb, groupArray, hasClass, insertAfter, insertBefore, isArray, isBool, isDescendantOf, isFunction, isNumber, isNumeric, isObject, isOffsetInEl, isPromise, isString, isset, iterateALL, joinFunctionsByNext, joinFunctionsByResult, joinMethods, jqFixedSize, jqMakeCarousel, kebabCase, makeStorageHelper, mapObjectTree, mapObjects, max, min, newArrayRemoveAt, numPad, numRand, objectExcept, objectGet, objectMap, objectMerge, objectOnly, objectSet, offDOM, offsetToViewportPosition, onDOM, onDOMMany, onQuickKeydown, openCenterWindow, openWindow, pairRows, prependTo, promiseTimeout, removeClass, removeEl, replaceMultiple, resolveArgsByType, resolveValueOrGettter, restoreAttr, retry, setElChildByIndex, snakeCase, splitArray, store, store_executeOnceInScopeByName, strRand, studlyCase, titleCase, toArrayIfNot, uniqueId, unset, viewportPositionToOffset, waitFor, waitTime, walkTreeData, watchChange, windowLoaded };
