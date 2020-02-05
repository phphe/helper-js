/*!
 * helper-js v1.4.29
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// local store
var store = {}; // get global
// `this` !== global or window because of build tool

function glb() {
  if (store.glb) {
    return store.glb;
  } else {
    // resolve global
    var _t;

    try {
      _t = global;
    } catch (e) {
      _t = window;
    }

    store.glb = _t;
    return _t;
  }
}
function isDocumentExisted() {
  try {
    t = document;
  } catch (e) {
    return false;
  }

  return true;
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

  for (var index of indexes) {
    mapping[index] = true;
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
    return offset.map(v => arr[index + v]);
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
  arr.forEach(v => {
    var mark = getMark(v);

    if (!groups.has(mark)) {
      groups.set(mark, []);
    }

    groups.get(mark).push(v);
  });
  var r = [];
  groups.forEach((value, key) => {
    r.push([key, value]);
  });
  return r;
}
function arrayDistinct(arr) {
  if (glb().Set) {
    return [...new Set(arr)];
  } else {
    return arr.filter((v, i, a) => a.indexOf(v) === i);
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
      for (var key of Object.keys(val)) {
        if (handler(val[key], key) === false) {
          break;
        }
      }
    } else if (Number.isInteger(val)) {
      for (var _i2 = 0; _i2 < val; _i2++) {
        if (handler(_i2, _i2) === false) {
          break;
        }
      }
    }
  } else {
    if (isArray(val) || isString(val) || val.hasOwnProperty('length')) {
      for (var _i3 = val.length - 1; _i3 >= 0; _i3--) {
        if (handler(val[_i3], _i3) === false) {
          break;
        }
      }
    } else if (isObject(val)) {
      var keys = Object.keys(val);
      keys.reverse();

      for (var _key of keys) {
        if (handler(val[_key], _key) === false) {
          break;
        }
      }
    } else if (Number.isInteger(val)) {
      for (var _i4 = val - 1; _i4 >= 0; _i4--) {
        if (handler(_i4, _i4) === false) {
          break;
        }
      }
    }
  }
} // loop for Array, Object, NodeList, String

function* iterateAll(val) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // opt: {reverse, exclude}
  if (!opt.reverse) {
    if (val.length != null) {
      for (var i = 0; i < val.length; i++) {
        var info = {
          value: val[i],
          index: i
        };

        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else if (isObject(val)) {
      for (var key of Object.keys(val)) {
        var _info = {
          value: val[key],
          key
        };

        if (!opt.exclude || !opt.exclude(_info)) {
          yield _info;
        }
      }
    } else {
      throw 'Unsupported type';
    }
  } else {
    if (val.length != null) {
      for (var _i5 = val.length - 1; _i5 >= 0; _i5--) {
        var _info2 = {
          value: val[_i5],
          index: _i5
        };

        if (!opt.exclude || !opt.exclude(_info2)) {
          yield _info2;
        }
      }
    } else if (isObject(val)) {
      var keys = Object.keys(val);
      keys.reverse();

      for (var _key2 of keys) {
        var _info3 = {
          value: val[_key2],
          key: _key2
        };

        if (!opt.exclude || !opt.exclude(_info3)) {
          yield _info3;
        }
      }
    } else {
      throw 'Unsupported type';
    }
  }
} // Deprecated in next version

var iterateALL = iterateAll; // source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string

function objectGet(obj, path, throwError) {
  var paths = isArray(path) ? path : path.split('.');
  var current = obj;

  try {
    for (var key of paths) {
      current = current[key];
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
  var type = typeof obj;

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

        for (var item of obj) {
          r.push(cloneObj(item, exclude));
        }
      } else {
        r = {};

        for (var key of Object.keys(obj)) {
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
    var {
      value,
      key,
      parent,
      newParent
    } = stack.shift();
    var t = handler(value, key, parent, newParent);

    var assign = (value, key, canPush) => {
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
      var {
        key: key2,
        value: _value
      } = t;
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

      ({
        stop,
        skip
      } = t);
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
      Object.keys(val).forEach(key => {
        stack.push({
          value: val[key],
          key,
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
  return rows1.map(row1 => [row1, map[row1[key1]]]);
} // 深度优先遍历
// Depth-First-Search
// todo change args in next version

function depthFirstSearch(obj, handler) {
  var childrenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'children';
  var reverse = arguments.length > 3 ? arguments[3] : undefined;
  var rootChildren = isArray(obj) ? obj : [obj]; //

  class StopException {}

  var func = (children, parent, parentPath) => {
    if (reverse) {
      children = children.slice();
      children.reverse();
    }

    var len = children.length;

    for (var i = 0; i < len; i++) {
      var item = children[i];
      var index = reverse ? len - i - 1 : i;
      var path = parentPath ? [...parentPath, index] : []; // todo change args in next version

      var r = handler(item, index, parent, path);

      if (r === false) {
        // stop
        throw new StopException();
      } else if (r === 'skip children') {
        continue;
      } else if (r === 'skip siblings') {
        break;
      }

      if (item[childrenKey] != null) {
        func(item[childrenKey], item, path);
      }
    }
  };

  try {
    func(rootChildren, null, isArray(obj) ? [] : null);
  } catch (e) {
    if (e instanceof StopException) ; else {
      throw e;
    }
  }
}
var walkTreeData = depthFirstSearch;
class TreeData {
  // data = null;
  constructor(data) {
    this.childrenKey = 'children';
    this.data = data;
  }

  get rootChildren() {
    var {
      childrenKey
    } = this;

    if (!this.data) {
      this.data = [];
    }

    var {
      data
    } = this;
    return isArray(data) ? data : data[childrenKey];
  }

  *iteratePath(path) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      childrenKey,
      rootChildren
    } = this;

    if (!opt.reverse) {
      var prevPath = [];
      var prevChildren = rootChildren;

      for (var index of path) {
        var currentPath = [...prevPath, index];
        var currentNode = prevChildren[index];
        yield {
          path: currentPath,
          node: currentNode
        };
        prevPath = currentPath;
        prevChildren = currentNode[childrenKey];
      }
    } else {
      var list = [...this.iteratePath(path, _objectSpread({}, opt, {
        reverse: false
      }))];
      list.reverse();

      for (var {
        path: _path,
        node
      } of list) {
        yield {
          path: _path,
          node
        };
      }
    }
  }

  getAllNodes(path) {
    var all = [];

    for (var {
      node
    } of this.iteratePath(path)) {
      all.push(node);
    }

    return all;
  }

  getNode(path) {
    return arrayLast(this.getAllNodes(path));
  }

  getNodeIndexAndParent(path) {
    var parentPath = path.slice();
    var index = parentPath.pop();
    return {
      parent: this.getNode(parentPath),
      index,
      parentPath
    };
  }

  getNodeParent(path) {
    return this.getNodeIndexAndParent(path).parent;
  }

  setPathNode(path, node) {
    if (path == null || path.length === 0) {
      this.data = node;
    } else {
      var {
        childrenKey,
        rootChildren
      } = this;
      var {
        parent,
        index
      } = this.getNodeIndexAndParent(path);
      var parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
      parentChildren[index] = node;
    }
  }

  removeNode(path) {
    var {
      childrenKey,
      rootChildren
    } = this;
    var {
      parent,
      index
    } = this.getNodeIndexAndParent(path);
    var parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
    var node = parentChildren[index];
    parentChildren.splice(index, 1);
    return node;
  }

  walk(handler) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var {
      childrenKey,
      data
    } = this; // todo change args in next version

    return walkTreeData(data, handler, childrenKey, opt.reverse);
  }

  clone() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // opt.afterNodeCreated(newNode, {oldNode: node, index, parent, path})
    // todo change args in next version
    var {
      childrenKey
    } = this;
    var td = new TreeData();
    this.walk((node, index, parent, path) => {
      var newNode = Object.assign({}, node);

      if (newNode[childrenKey]) {
        newNode[childrenKey] = [];
      }

      if (opt.afterNodeCreated) {
        opt.afterNodeCreated(newNode, {
          oldNode: node,
          index,
          parent,
          path
        });
      }

      td.setPathNode(path, newNode);
    });
    return td.data;
  }

} // function helper | method helper ============================

function resolveValueOrGettter(valueOrGetter) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (isFunction(valueOrGetter)) {
    return valueOrGetter(...args);
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

    return func.call(this, count++, ...args);
  };
}
function watchChange(getVal, handler) {
  var oldVal;

  var update = function update() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key4 = 0; _key4 < _len2; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var newVal = getVal(...args);

    if (oldVal !== newVal) {
      handler(newVal, ...args);
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

    var destroy = () => {
      delete scope[name];
    };

    scope[name] = {
      destroy
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
    for (var _len3 = arguments.length, args = new Array(_len3), _key5 = 0; _key5 < _len3; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return new Promise((resolve, reject) => {
      resolves.push(resolve);
      rejects.push(reject); //

      lastArgs = args;

      if (!delaying) {
        delaying = true;
        t = setTimeout(() => {
          var result = action.call(this, ...lastArgs);
          t = null;
          delaying = false;
          resolves.forEach(resolve => resolve(result));
          resolves = [];
          rejects = [];
        }, wait);
      }
    });
  };

  wrappedAction.stop = () => {
    if (t) {
      clearTimeout(t);
      t = null;
    }

    delaying = false;
    resolves = [];
    rejects.forEach(reject => reject());
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
    return new Promise((resolve, reject) => {
      if (delaying) {
        resolve(result);
      } else {
        delaying = true;
        result = action.call(this, ...lastArgs);
        resolve(result);
        t = setTimeout(() => {
          t = null;
          delaying = false;
          result = null;
        }, wait);
      }
    });
  };

  wrappedAction.stop = () => {
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

  var _loop3 = function _loop3(method) {
    var old = simpleJoinedMethod;

    if (old) {
      simpleJoinedMethod = function simpleJoinedMethod() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key6 = 0; _key6 < _len4; _key6++) {
          args[_key6] = arguments[_key6];
        }

        return method.call(this, mode === 'value' ? old.call(this, ...args) : old, ...args);
      };
    } else {
      simpleJoinedMethod = method;
    }
  };

  for (var method of methods) {
    _loop3(method);
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
  var next = () => {};

  for (var {
    value: func
  } of iterateAll(funcs, {
    reverse: true
  })) {
    var currentNext = next;
    next = wrapFuncWithNext(func, currentNext);
  }

  return next;

  function wrapFuncWithNext(func, next) {
    return function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key7 = 0; _key7 < _len5; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return func(next, ...args);
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
    chunks.forEach(chunk => {
      promise = promise.then(result => {
        if (result) {
          r.push(...result);
        }

        if (stopped) {
          reject('stopped');
        } else {
          return Promise.all(chunk.map(v => v()));
        }
      });
    });
    promise.then(result => {
      r.push(...result);
      resolve(r);
    });
  });
  return {
    promise,

    destroy() {
      stopped = true;
    }

  };
}
function promiseTimeout(promise, timeout) {
  return new Promise((resolve, reject) => {
    var t, rejected;
    promise.then(function () {
      clearTimeout(t);
      resolve(...arguments);
    }, function () {
      if (!rejected) {
        clearTimeout(t);
        reject(...arguments);
      }
    });
    t = setTimeout(() => {
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
    top,
    right,
    bottom,
    left,
    width,
    height,
    x,
    y
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
  var workArea = findParent(el, v => hasClass(v, 'work-area'));
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
    var {
      index: nearestIndex,
      value: nearest,
      bigger
    } = binarySearch(el.childNodes, el => {
      return el.childComponentIndex - index;
    }, 0, max(index, len - 1), true);

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
    el.addEventListener(name, handler, ...args);
  } else if (el.attachEvent) {
    // IE 8 及更早 IE 版本
    el.attachEvent("on".concat(name), handler, ...args);
  }
}
function offDOM(el, name, handler) {
  for (var _len7 = arguments.length, args = new Array(_len7 > 3 ? _len7 - 3 : 0), _key9 = 3; _key9 < _len7; _key9++) {
    args[_key9 - 3] = arguments[_key9];
  }

  if (el.removeEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.removeEventListener(name, handler, ...args);
  } else if (el.detachEvent) {
    // IE 8 及更早 IE 版本
    el.detachEvent("on".concat(name), handler, ...args);
  }
}
function onDOMMany(els, names, handler) {
  els = toArrayIfNot(els);
  names = toArrayIfNot(names);

  for (var _len8 = arguments.length, args = new Array(_len8 > 3 ? _len8 - 3 : 0), _key10 = 3; _key10 < _len8; _key10++) {
    args[_key10 - 3] = arguments[_key10];
  }

  for (var el of els) {
    for (var name of names) {
      onDOM(el, name, handler, ...args);
    }
  }

  var destroy = () => {
    for (var _el of els) {
      for (var _name of names) {
        offDOM(_el, _name, handler);
      }
    }
  };

  return destroy;
}
function getImageSizeByUrl(url) {
  var image = document.createElement('img');
  return new Promise(function (resolve, reject) {
    onDOM(image, 'load', () => {
      resolve({
        width: image.width,
        height: image.height
      });
    });
    onDOM(image, 'error', e => {
      reject(e);
    });
    image.src = url;
  });
}
function findNodeList(list, callback) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var iterator = iterateAll(list, {
    reverse: opt.reverse
  });

  for (var {
    value,
    index
  } of iterator) {
    if (callback(value, index)) {
      return value;
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

  arr.forEach(key => {
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

  arr.forEach(key => {
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
} // Date ===================================

function cloneDate(dateObj) {
  return new Date(dateObj.getTime());
}
function addDate(dateObj, n, type) {
  if (!['year', 'month', 'day'].includes(type)) {
    type += 's';
  }

  type = studlyCase(type);
  var setFuncName = 'set' + type;
  var getFuncName = 'get' + type;
  dateObj[setFuncName](dateObj[getFuncName]() + n);
  return dateObj;
}
function getMonthStart(dateObj) {
  var clonedObj = cloneDate(dateObj);
  clonedObj.setDate(1);
  return clonedObj;
}
function getMonthEnd(dateObj) {
  var r = cloneDate(dateObj);
  addDate(r, 1, 'month');
  r.setDate(0);
  return r;
}
/**
 * [getCalendar description]
 * @param  {[type]} year         [description]
 * @param  {[type]} month        [description]
 * @param  {Number} [startWeekDay=0] [0 is sunday]
 * @return {[type]}              [description]
 */

function getCalendar(year, month) {
  var startWeekDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var results = [];
  var date = new Date(year, month - 1);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  var monthStart = getMonthStart(date);
  var monthStartDay = monthStart.getDay();
  var calendarStart = addDate(clone(monthStart), monthStartDay + startWeekDay, 'day');

  if (monthStartDay > startWeekDay) {
    var startDate = calendarStart.getDate();

    var _year = calendarStart.getFullYear();

    var _month = calendarStart.getMonth() + 1;

    for (var i = startWeekDay; i < monthStartDay; i++) {
      var _date = startDate + i;

      results.push({
        year: _year,
        month: _month,
        date: _date,
        text: _date,
        prevMonth: true
      });
    }
  } //


  var monthEnd = getMonthEnd(date);
  var monthEndtDate = monthEnd.getDate();

  for (var _i6 = 1; _i6 <= monthEndtDate; _i6++) {
    var _date2 = _i6;
    results.push({
      year: year,
      month: month,
      date: _date2,
      text: _date2,
      currentMonth: true
    });
  } //


  var monthEndDay = monthEnd.getDay();
  var endWeekDay = 6 - startWeekDay;

  if (monthEndDay < endWeekDay) {
    var nextMonth = addDate(clone(date), 1, 'month');

    var _year2 = nextMonth.getFullYear();

    var _month2 = nextMonth.getMonth() + 1;

    for (var _i7 = monthEndDay + 1, _date3 = 1; _i7 <= endWeekDay; _i7++, _date3++) {
      results.push({
        year: _year2,
        month: _month2,
        date: _date3,
        text: _date3,
        nextMonth: true
      });
    }
  } //


  return hp.splitArray(results, 7);
} // eg: 2018-09-07T03:38:37.888Z
// timezone must be UTC

function isIsoFormat(str) {
  return str.length > 15 && str.length < 30 && str.match(/^\d{4}-\d{2}-\d{2}T.*Z$/);
} // timestamp eg: 2018-09-07T03:38:37.888Z

function parseISO(timestamp) {
  var [datePart, timePart] = timestamp.split('T');
  var y,
      m,
      d,
      h = 0,
      min = 0,
      s = 0;
  [y, m, d] = datePart.split('-').map(v => parseInt(v));
  m = m - 1;

  if (timePart) {
    var _t2 = timePart.split('-').map(v => parseFloat(v));

    h = _t2[0];

    if (_t2[1] != null) {
      min = _t2[1];
    }

    if (_t2[2] != null) {
      s = _t2[2];
    }
  }

  var dt = new Date(y, m, d, h, min, s); // the dt timezone is current, so reset hour with setUTCHours

  dt.setUTCHours(h);
  return dt;
} // advance =================================
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
    return func(arg1, arg2, arg3).then(data => {
      delete counters[name];
      return data;
    }).catch(e => {
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
    top
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
    }, speed, 'linear', () => {
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
  glb().open(url, name, Object.keys(opt).map(k => "".concat(k, "=").concat(opt[k])).join(','));
}
function openCenterWindow(url, name, width, height) {
  var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var t = {
    width,
    height,
    top: (glb().screen.availHeight - 30 - height) / 2,
    left: (glb().screen.availWidth - 30 - width) / 2
  };
  Object.assign(t, opt);
  openWindow(url, name, t);
}
class URLHelper {
  // protocol, hostname, port, pastname
  constructor(baseUrl) {
    this.baseUrl = '';
    this.search = {};
    var t = decodeURI(baseUrl).split('?');
    this.baseUrl = t[0];

    if (t[1]) {
      t[1].split('&').forEach(v => {
        var t2 = v.split('=');
        this.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
      });
    }
  }

  getHref() {
    var t = [this.baseUrl];
    var searchStr = Object.keys(this.search).map(k => "".concat(k, "=").concat(encodeURIComponent(this.search[k]))).join('&');

    if (searchStr) {
      t.push(searchStr);
    }

    return t.join('?');
  }

} // 解析函数参数, 帮助重载
// types eg: ['Object', (i) => i > 3, ['Number', default], null ]
// null represent all types of argument

function resolveArgsByType(args, types) {
  var argIndex = 0;
  return types.map(v => {
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
        rule = () => true;
      } else {
        var _t3 = rule;

        rule = x => Object.prototype.toString.call(x) === "[object ".concat(_t3, "]");
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
    storage,

    set(name, value, minutes) {
      if (value == null) {
        this.storage.removeItem(name);
      } else {
        this.storage.setItem(name, JSON.stringify({
          value,
          expired_at: minutes ? new Date().getTime() + minutes * 60 * 1000 : null
        }));
      }
    },

    get(name) {
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

    clear() {
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

class EventProcessor {
  constructor() {
    this.eventStore = [];
  }

  on(name, handler) {
    this.eventStore.push({
      name,
      handler
    });
  }

  once(name, handler) {
    var off = () => {
      this.off(name, wrappedHandler);
    };

    var wrappedHandler = function wrappedHandler() {
      handler(...arguments);
      off();
    };

    this.on(name, wrappedHandler);
    return off;
  }

  onceTimeout(name, handler, timeout) {
    var off;
    var promise = new Promise((resolve, reject) => {
      var wrappedHandler = function wrappedHandler() {
        handler(...arguments);
        resolve();
      };

      off = this.once(name, wrappedHandler);
      waitTime(timeout).then(() => {
        off();
        reject();
      });
    });

    var off2 = () => {
      off && off();
    };

    return {
      off: off2,
      promise
    };
  }

  off(name, handler) {
    var indexes = []; // to remove indexes; reverse; 倒序的

    var len = this.eventStore.length;

    for (var i = 0; i < len; i++) {
      var item = this.eventStore[i];

      if (item.name === name && item.handler === handler) {
        indexes.unshift(i);
      }
    }

    for (var index of indexes) {
      this.eventStore.splice(index, 1);
    }
  }

  emit(name) {
    // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
    var items = [];

    for (var item of this.eventStore) {
      if (item.name === name) {
        items.push(item);
      }
    }

    for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key12 = 1; _key12 < _len10; _key12++) {
      args[_key12 - 1] = arguments[_key12];
    }

    for (var _item of items) {
      _item.handler(...args);
    }
  }

}
class CrossWindowEventProcessor extends EventProcessor {
  // id
  constructor(opt) {
    super();
    this.storageName = '_crossWindow';
    this.windows = [];
    this.timeout = 200;
    this.BROADCAST = '__BROADCAST__';

    if (opt) {
      Object.assign(this, opt);
    }

    onDOM(window, 'storage', ev => {
      if (ev.key === this.storageName) {
        var event = JSON.parse(ev.newValue);

        if (!event.targets || event.targets.includes(this.id)) {
          this.emitLocal(event.name, ...event.args);
        }
      }
    }); // social parts 集体部分
    // join

    this.id = strRand();
    this.windows = [this.id];
    this.ready = new Promise((resolve, reject) => {
      this.onceTimeout('_windows_updated', (_ref) => {
        var {
          windows
        } = _ref;
        this.windows = windows;
      }, this.timeout).promise.then(() => {
        resolve(); // responsed 被响应
      }, () => {
        // no response 无响应
        resolve();
      });
      this.broadcast('_join', this.id);
    });
    this.ready.then(() => {
      // on join
      this.on('_join', id => {
        this.windows.push(id);

        if (this.isMain()) {
          this.broadcast('_windows_updated', {
            windows: this.windows,
            type: 'join',
            id
          });
        }
      }); // on _windows_updated

      this.on('_windows_updated', (_ref2) => {
        var {
          windows
        } = _ref2;
        this.windows = windows;
      }); // on exit

      this.on('_exit', id => {
        var oldMain = this.windows[0];
        arrayRemove(this.windows, id);

        if (this.isMain()) {
          this.emit('_windows_updated', {
            windows: this.windows,
            type: 'exit',
            id
          });

          if (oldMain != this.id) {
            this.emit('_main_updated', {
              windows: this.windows,
              old: oldMain,
              'new': this.id
            });
          }
        }
      });
      onDOM(window, 'beforeunload', () => {
        this.exitGroup();
      });
    });
  }

  isMain() {
    return this.id === this.windows[0];
  }

  emitTo(name, targets) {
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
        super.emit(name, ...args); // emit to current window
      }
    }

    glb().localStorage.setItem(this.storageName, JSON.stringify({
      name,
      targets,
      args,
      // use random make storage event triggered every time
      // 加入随机保证触发storage事件
      random: Math.random()
    }));
  }

  emitLocal(name) {
    for (var _len12 = arguments.length, args = new Array(_len12 > 1 ? _len12 - 1 : 0), _key14 = 1; _key14 < _len12; _key14++) {
      args[_key14 - 1] = arguments[_key14];
    }

    this.emitTo(name, this.id, ...args);
  }

  broadcast(name) {
    for (var _len13 = arguments.length, args = new Array(_len13 > 1 ? _len13 - 1 : 0), _key15 = 1; _key15 < _len13; _key15++) {
      args[_key15 - 1] = arguments[_key15];
    }

    this.emitTo(name, this.BROADCAST, ...args);
  }

  emit(name) {
    for (var _len14 = arguments.length, args = new Array(_len14 > 1 ? _len14 - 1 : 0), _key16 = 1; _key16 < _len14; _key16++) {
      args[_key16 - 1] = arguments[_key16];
    }

    this.emitTo(name, this.windows, ...args);
  }

  exitGroup() {
    this.broadcast('_exit', this.id);
  }

} // Deprecated in next version

var CrossWindow = CrossWindowEventProcessor;
function onQuickKeydown(handler) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  opt = _objectSpread({
    timeout: 1000
  }, opt);
  var input = '';
  var timeoutId;

  var keydownHandler = e => {
    if (e.key && e.key.length === 1) {
      input = "".concat(input).concat(e.key);
      handler(input);

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      timeoutId = setTimeout(() => {
        input = '';
      }, opt.timeout);
    }
  };

  onDOM(document, 'keydown', keydownHandler);
  return () => {
    offDOM(document, 'keydown', keydownHandler);
  };
}
function getUserLanguage() {
  return navigator.language || navigator.userLanguage;
}
class Cache {
  constructor() {
    this.store = {};
  }

  has(name) {
    return this.store.hasOwnProperty(name);
  }

  remember(name, getter) {
    if (!this.has(name)) {
      this.store[name] = {
        value: getter()
      };
    }

    return this.store[name].value;
  }

  forget(name) {
    if (name) {
      if (this.has(name)) {
        delete this.store[name];
      }
    } else {
      this.store = {};
    }
  }

} // attach cached getters to an object; can attach to self

function attachCache(obj, toCache) {
  var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Cache();

  var _loop4 = function _loop4(key) {
    var getter = toCache[key];
    Object.defineProperty(obj, key, {
      get() {
        return cache.remember(key, () => getter.call(this));
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
exports.TreeData = TreeData;
exports.URLHelper = URLHelper;
exports.addClass = addClass;
exports.addDate = addDate;
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
exports.cloneDate = cloneDate;
exports.cloneObj = cloneObj;
exports.copyTextToClipboard = copyTextToClipboard;
exports.createElementFromHTML = createElementFromHTML;
exports.debounce = debounce;
exports.debounceImmediate = debounceImmediate;
exports.debounceTrailing = debounceTrailing;
exports.depthFirstSearch = depthFirstSearch;
exports.elementsFromPoint = elementsFromPoint;
exports.empty = empty;
exports.executeOnceInScopeByName = executeOnceInScopeByName;
exports.executePromiseGetters = executePromiseGetters;
exports.executeWithCount = executeWithCount;
exports.findNodeList = findNodeList;
exports.findNodeListReverse = findNodeListReverse;
exports.findParent = findParent;
exports.forAll = forAll;
exports.getBorder = getBorder;
exports.getBoundingClientRect = getBoundingClientRect;
exports.getCalendar = getCalendar;
exports.getCss3Prefix = getCss3Prefix;
exports.getElSize = getElSize;
exports.getElSizeEvenInvisible = getElSizeEvenInvisible;
exports.getImageSizeByUrl = getImageSizeByUrl;
exports.getLocalStorage2 = getLocalStorage2;
exports.getMonthEnd = getMonthEnd;
exports.getMonthStart = getMonthStart;
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
exports.isDocumentExisted = isDocumentExisted;
exports.isFunction = isFunction;
exports.isIsoFormat = isIsoFormat;
exports.isNumber = isNumber;
exports.isNumeric = isNumeric;
exports.isObject = isObject;
exports.isOffsetInEl = isOffsetInEl;
exports.isPromise = isPromise;
exports.isString = isString;
exports.isset = isset;
exports.iterateALL = iterateALL;
exports.iterateAll = iterateAll;
exports.joinFunctionsByNext = joinFunctionsByNext;
exports.joinFunctionsByResult = joinFunctionsByResult;
exports.joinMethods = joinMethods;
exports.jqFixedSize = jqFixedSize;
exports.jqMakeCarousel = jqMakeCarousel;
exports.kebabCase = kebabCase;
exports.makeStorageHelper = makeStorageHelper;
exports.mapObjectTree = mapObjectTree;
exports.mapObjects = mapObjects;
exports.max = max;
exports.min = min;
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
exports.parseISO = parseISO;
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
