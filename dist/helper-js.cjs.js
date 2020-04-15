/*!
 * helper-js v1.4.35
 * (c) phphe <phphe@outlook.com> (https://github.com/phphe)
 * Homepage: undefined
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _slicedToArray = _interopDefault(require('@babel/runtime/helpers/slicedToArray'));
var _defineProperty = _interopDefault(require('@babel/runtime/helpers/defineProperty'));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

// local store
const store = {}; // get global
// `this` !== global or window because of build tool

function glb() {
  if (store.glb) {
    return store.glb;
  } else {
    // resolve global
    let t;

    try {
      t = global;
    } catch (e) {
      t = window;
    }

    store.glb = t;
    return t;
  }
}
function isDocumentExisted() {
  try {
    let t = document;
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
  let len = num.toString().length;

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
  const temp = str.toString().split(/[-_]/);

  for (let i = 1; i < temp.length; i++) {
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
function strRand(len = 8, prefix = '') {
  let r = '';
  const seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    r += seeds[numRand(seeds.length - 1)];
  }

  return prefix + r;
}
function replaceMultiple(mapObj, str) {
  const reg = new RegExp(Object.keys(mapObj).join('|'), 'g');
  return str.replace(reg, function (matchedKey) {
    return mapObj[matchedKey];
  });
} // array

function arrayRemove(arr, v) {
  let index;
  let count = 0;

  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1);
    count++;
  }

  return count;
}
function arrayRemoveBySortedIndexes(arr, sortedIndexes) {
  for (let i = sortedIndexes.length - 1; i >= 0; i--) {
    const index = sortedIndexes[i];
    arr.splice(index, 1);
  }
}
function newArrayRemoveAt(arr, indexes) {
  indexes = toArrayIfNot(indexes);
  const mapping = {};

  var _iterator = _createForOfIteratorHelper(indexes),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      const index = _step.value;
      mapping[index] = true;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  const newArr = [];
  const len = arr.length;

  for (let i = 0; i < len; i++) {
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
  const index = arr.indexOf(item);

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
  const r = [];

  if (isFunction(n)) {
    const getChunkLength = n;
    let times = 1;
    let i = 0;

    while (i < arr.length) {
      const n = getChunkLength(times);
      const end = i + n;
      r.push(arr.slice(i, end));
      i = end;
      times++;
    }
  } else {
    let i = 0;

    while (i < arr.length) {
      const end = i + n;
      r.push(arr.slice(i, end));
      i = end;
    }
  }

  return r;
}
function groupArray(arr, getMark) {
  const groups = new Map();
  arr.forEach(v => {
    const mark = getMark(v);

    if (!groups.has(mark)) {
      groups.set(mark, []);
    }

    groups.get(mark).push(v);
  });
  const r = [];
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
  for (const k in o2) {
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
  const r = {};

  for (const key in obj) {
    r[key] = func(obj[key], key, obj);
  }

  return r;
}
function objectOnly(obj, keys) {
  const r = {};

  for (const key in obj) {
    if (keys.indexOf(key) > -1) {
      r[key] = obj[key];
    }
  }

  return r;
}
function objectExcept(obj, keys) {
  const r = {};

  for (const key in obj) {
    if (keys.indexOf(key) === -1) {
      r[key] = obj[key];
    }
  }

  return r;
} // loop for all type
// TODO change reverse to opt in next version

function forAll(val, handler, reverse) {
  if (!reverse) {
    if (isArray(val) || isString(val) || val.hasOwnProperty('length')) {
      for (let i = 0; i < val.length; i++) {
        if (handler(val[i], i) === false) {
          break;
        }
      }
    } else if (isObject(val)) {
      for (var _i = 0, _Object$keys = Object.keys(val); _i < _Object$keys.length; _i++) {
        const key = _Object$keys[_i];

        if (handler(val[key], key) === false) {
          break;
        }
      }
    } else if (Number.isInteger(val)) {
      for (let i = 0; i < val; i++) {
        if (handler(i, i) === false) {
          break;
        }
      }
    }
  } else {
    if (isArray(val) || isString(val) || val.hasOwnProperty('length')) {
      for (let i = val.length - 1; i >= 0; i--) {
        if (handler(val[i], i) === false) {
          break;
        }
      }
    } else if (isObject(val)) {
      const keys = Object.keys(val);
      keys.reverse();

      for (var _i2 = 0, _keys = keys; _i2 < _keys.length; _i2++) {
        const key = _keys[_i2];

        if (handler(val[key], key) === false) {
          break;
        }
      }
    } else if (Number.isInteger(val)) {
      for (let i = val - 1; i >= 0; i--) {
        if (handler(i, i) === false) {
          break;
        }
      }
    }
  }
} // loop for Array, Object, NodeList, String

function* iterateAll(val, opt = {}) {
  // opt: {reverse, exclude}
  if (!opt.reverse) {
    if (val.length != null) {
      for (let i = 0; i < val.length; i++) {
        const info = {
          value: val[i],
          index: i
        };

        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else if (isObject(val)) {
      for (var _i3 = 0, _Object$keys2 = Object.keys(val); _i3 < _Object$keys2.length; _i3++) {
        const key = _Object$keys2[_i3];
        const info = {
          value: val[key],
          key
        };

        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else {
      throw 'Unsupported type';
    }
  } else {
    if (val.length != null) {
      for (let i = val.length - 1; i >= 0; i--) {
        const info = {
          value: val[i],
          index: i
        };

        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else if (isObject(val)) {
      const keys = Object.keys(val);
      keys.reverse();

      for (var _i4 = 0, _keys2 = keys; _i4 < _keys2.length; _i4++) {
        const key = _keys2[_i4];
        const info = {
          value: val[key],
          key
        };

        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else {
      throw 'Unsupported type';
    }
  }
} // Deprecated in next version

const iterateALL = iterateAll; // source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string

function objectGet(obj, path, throwError) {
  const paths = isArray(path) ? path : path.split('.');
  let current = obj;

  try {
    var _iterator2 = _createForOfIteratorHelper(paths),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        const key = _step2.value;
        current = current[key];
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  } catch (e) {
    if (throwError) {
      throw "Path does not exist";
    }
  }

  return current;
}
function objectSet(obj, path, value) {
  const paths = isArray(path) ? path : path.split('.');
  const lastKey = arrayLast(paths);
  const parent = objectGet(obj, paths.slice(0, paths.length - 1));

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
  const type = typeof obj;

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

      let r;

      if (isArray(obj)) {
        r = [];

        var _iterator3 = _createForOfIteratorHelper(obj),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            const item = _step3.value;
            r.push(cloneObj(item, exclude));
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } else {
        r = {};

        for (var _i5 = 0, _Object$keys3 = Object.keys(obj); _i5 < _Object$keys3.length; _i5++) {
          const key = _Object$keys3[_i5];

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

function mapObjectTree(obj, handler, limit = 10000) {
  let r;
  let count = 0;
  const stack = [{
    value: obj
  }];

  while (stack.length > 0) {
    if (count >= limit) {
      throw `mapObjectTree: limit(${limit}) reached, object may has circular reference`;
    }

    count++;

    const _stack$shift = stack.shift(),
          value = _stack$shift.value,
          key = _stack$shift.key,
          parent = _stack$shift.parent,
          newParent = _stack$shift.newParent;

    const t = handler(value, key, parent, newParent);

    const assign = (value, key, canPush) => {
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

    let newVal, val, toDelete, stop, skip;

    if (!t) {
      // no change
      val = value;
      newVal = assign(value, key);
    } else {
      const key2 = t.key,
            value = t.value;
      val = value;

      if (t.delete || key2 === false) {
        // del
        toDelete = true;
      } else if (key2 == null) {
        // don't change key
        newVal = assign(value, key, true);
      } else if (t.hasOwnProperty('value')) {
        newVal = assign(value, key2);
      }

      stop = t.stop;
      skip = t.skip;
    }

    if (toDelete) {
      continue;
    }

    if (skip) {
      continue;
    }

    if (stop) {
      break;
    }

    if (isArray(val)) {
      const len = val.length;

      for (let i = 0; i < len; i++) {
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
  }

  return r;
} // arr, idKey/getId

function mapObjects(arr, idKey) {
  const r = {};
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    const item = arr[i];
    const id = isFunction(idKey) ? idKey(item, i) : item[idKey];
    r[id] = item;
  }

  return r;
} //

function pairRows(rows1, rows2, key1, key2) {
  if (!key2) {
    key2 = key1;
  }

  const map = mapObjects(rows2, key2);
  return rows1.map(row1 => [row1, map[row1[key1]]]);
} // 深度优先遍历
// Depth-First-Search
// TODO change args in next version

function depthFirstSearch(obj, handler, childrenKey = 'children', reverse) {
  const rootChildren = isArray(obj) ? obj : [obj]; //

  class StopException {}

  const func = (children, parent, parentPath) => {
    if (reverse) {
      children = children.slice();
      children.reverse();
    }

    const len = children.length;

    for (let i = 0; i < len; i++) {
      const item = children[i];
      const index = reverse ? len - i - 1 : i;
      const path = parentPath ? [...parentPath, index] : []; // TODO change args in next version

      const r = handler(item, index, parent, path);

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
const walkTreeData = depthFirstSearch;
class TreeData {
  // data = null;
  constructor(data) {
    this.childrenKey = 'children';
    this.data = data;
  }

  get rootChildren() {
    const childrenKey = this.childrenKey;

    if (!this.data) {
      this.data = [];
    }

    const data = this.data;
    return isArray(data) ? data : data[childrenKey];
  }

  *iteratePath(path, opt = {}) {
    const childrenKey = this.childrenKey,
          rootChildren = this.rootChildren;

    if (!opt.reverse) {
      let prevPath = [];
      let prevNode;
      let prevChildren = rootChildren;

      var _iterator4 = _createForOfIteratorHelper(path),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          const index = _step4.value;
          const currentPath = [...prevPath, index];
          const currentNode = prevChildren[index];
          yield {
            path: currentPath,
            node: currentNode
          };
          prevPath = currentPath;
          prevNode = currentNode;
          prevChildren = currentNode[childrenKey];
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    } else {
      const list = [...this.iteratePath(path, _objectSpread({}, opt, {
        reverse: false
      }))];
      list.reverse();

      for (var _i6 = 0, _list = list; _i6 < _list.length; _i6++) {
        const _list$_i = _list[_i6],
              path = _list$_i.path,
              node = _list$_i.node;
        yield {
          path,
          node
        };
      }
    }
  }

  getAllNodes(path) {
    const all = [];

    var _iterator5 = _createForOfIteratorHelper(this.iteratePath(path)),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        const node = _step5.value.node;
        all.push(node);
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    return all;
  }

  getNode(path) {
    return arrayLast(this.getAllNodes(path));
  }

  getNodeIndexAndParent(path) {
    const parentPath = path.slice();
    const index = parentPath.pop();
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
      const childrenKey = this.childrenKey,
            rootChildren = this.rootChildren;

      const _this$getNodeIndexAnd = this.getNodeIndexAndParent(path),
            parent = _this$getNodeIndexAnd.parent,
            index = _this$getNodeIndexAnd.index;

      const parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
      parentChildren[index] = node;
    }
  }

  removeNode(path) {
    const childrenKey = this.childrenKey,
          rootChildren = this.rootChildren;

    const _this$getNodeIndexAnd2 = this.getNodeIndexAndParent(path),
          parent = _this$getNodeIndexAnd2.parent,
          index = _this$getNodeIndexAnd2.index;

    const parentChildren = path.length === 1 ? rootChildren : parent[childrenKey];
    const node = parentChildren[index];
    parentChildren.splice(index, 1);
    return node;
  }

  walk(handler, opt = {}) {
    const childrenKey = this.childrenKey,
          data = this.data; // TODO change args in next version

    return walkTreeData(data, handler, childrenKey, opt.reverse);
  }

  clone(opt = {}) {
    // opt.afterNodeCreated(newNode, {oldNode: node, index, parent, path})
    // TODO change args in next version
    const childrenKey = this.childrenKey;
    const td = new TreeData();
    this.walk((node, index, parent, path) => {
      const newNode = Object.assign({}, node);

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

function resolveValueOrGettter(valueOrGetter, args = []) {
  if (isFunction(valueOrGetter)) {
    return valueOrGetter(...args);
  } else {
    return valueOrGetter;
  }
}
function executeWithCount(func) {
  let count = 0;
  return function (...args) {
    return func.call(this, count++, ...args);
  };
}
function watchChange(getVal, handler) {
  let oldVal;

  const update = (...args) => {
    const newVal = getVal(...args);

    if (oldVal !== newVal) {
      handler(newVal, ...args);
    }

    oldVal = newVal;
  };

  return update;
}
const store_executeOnceInScopeByName = {};
function executeOnceInScopeByName(name, action, scope = scope_executeOnceInScopeByName, storeResult) {
  name = `executeOnceInScopeByName_${name}`;

  if (!scope[name]) {
    const value = action();

    const destroy = () => {
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
function debounceTrailing(action, wait = 0) {
  let t;
  let delaying;
  let lastArgs; // when trailing, use last args

  let resolves = [];
  let rejects = [];

  const wrappedAction = function wrappedAction(...args) {
    return new Promise((resolve, reject) => {
      resolves.push(resolve);
      rejects.push(reject); //

      lastArgs = args;

      if (!delaying) {
        delaying = true;
        t = setTimeout(() => {
          const result = action.call(this, ...lastArgs);
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
function debounceImmediate(action, wait = 0) {
  let t;
  let delaying;
  let result;

  const wrappedAction = function wrappedAction(...args) {
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
function debounce(action, wait = 0, opt = {}) {
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

function joinMethods(methods, mode = 'value') {
  let simpleJoinedMethod;

  var _iterator6 = _createForOfIteratorHelper(methods),
      _step6;

  try {
    for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
      const method = _step6.value;
      const old = simpleJoinedMethod;

      if (old) {
        simpleJoinedMethod = function simpleJoinedMethod(...args) {
          return method.call(this, mode === 'value' ? old.call(this, ...args) : old, ...args);
        };
      } else {
        simpleJoinedMethod = method;
      }
    }
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  return simpleJoinedMethod;
} // the returned function only accept one argument

function joinFunctionsByResult(funcs) {
  let wrappedFunc = funcs[0];

  for (let i = 1; i < funcs.length; i++) {
    wrappedFunc = join2func(wrappedFunc, funcs[i]);
  }

  return wrappedFunc;

  function join2func(func1, func2) {
    return function (arg) {
      let result = args;
      const result1 = func1(arg);
      return func2(result1);
    };
  }
} // must pass arguments to `next` manually

function joinFunctionsByNext(funcs) {
  let next = () => {};

  var _iterator7 = _createForOfIteratorHelper(iterateAll(funcs, {
    reverse: true
  })),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      const func = _step7.value.value;
      const currentNext = next;
      next = wrapFuncWithNext(func, currentNext);
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }

  return next;

  function wrapFuncWithNext(func, next) {
    return function (...args) {
      return func(next, ...args);
    };
  }
} // promise
// execute promise in sequence

function executePromiseGetters(getters, concurrent = 1) {
  let stopped;
  const promise = new Promise(function (resolve, reject) {
    const r = [];
    const chunks = splitArray(getters, concurrent);
    let promise = Promise.resolve();
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
    let t, rejected;
    promise.then((...args) => {
      clearTimeout(t);
      resolve(...args);
    }, (...args) => {
      if (!rejected) {
        clearTimeout(t);
        reject(...args);
      }
    });
    t = setTimeout(() => {
      rejected = true;
      const e = new Error('Promise timeout!');
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
function uniqueId(prefix = 'id_') {
  const id = prefix + strRand();
  if (!store.uniqueId) store.uniqueId = {};
  const generatedIds = store.uniqueId;

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
  const rect = getBoundingClientRect(el);
  const scroll = getScroll();
  return {
    x: rect.left + scroll.left,
    y: rect.top + scroll.top
  };
} // there is some trap in el.offsetParent, so use this func to fix

function getOffsetParent(el) {
  let offsetParent = el.offsetParent;

  if (!offsetParent || offsetParent === document.body && getComputedStyle(document.body).position === 'static') {
    offsetParent = document.body.parentElement;
  }

  return offsetParent;
} // get el current position. like jQuery.position
// the position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.
// 相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.

function getPosition(el) {
  const offsetParent = getOffsetParent(el);
  const ps = {
    x: el.offsetLeft,
    y: el.offsetTop
  };
  let parent = el;

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
  const offsetParent = getOffsetParent(el);
  const parentOf = getOffset(offsetParent);
  return {
    x: of.x - parentOf.x,
    y: of.y - parentOf.y
  };
}
function getBoundingClientRect(el) {
  // refer: http://www.51xuediannao.com/javascript/getBoundingClientRect.html
  const xy = el.getBoundingClientRect();
  const top = xy.top - document.documentElement.clientTop,
        //document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
  bottom = xy.bottom,
        left = xy.left - document.documentElement.clientLeft,
        //document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
  right = xy.right,
        width = xy.width || right - left,
        //IE67不存在width 使用right - left获得
  height = xy.height || bottom - top;
  const x = left;
  const y = top;
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
const getViewportPosition = getBoundingClientRect; // TODO not tested

function viewportPositionToOffset(position) {
  const body = document.body;
  const bodyOf = getOffset(body);
  const bodyVP = getViewportPosition(body);
  return {
    x: position.x + bodyOf.x - bodyVP.x,
    y: position.y + bodyOf.y - bodyVP.y
  };
} // TODO not tested

function offsetToViewportPosition(offset) {
  const body = document.body;
  const bodyOf = getOffset(body);
  const bodyVP = getViewportPosition(body);
  return {
    x: offset.x + bodyVP.x - bodyOf.x,
    y: offset.y + bodyVP.y - bodyOf.y
  };
}
function findParent(el, callback, opt) {
  let cur = opt && opt.withSelf ? el : el.parentElement;

  while (cur) {
    const r = callback(cur);

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
  const key = `original_${name}`;
  el[key] = el.getAttribute(name);
}
function restoreAttr(el, name) {
  const key = `original_${name}`;
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
} // TODO rename to getElSizeEvenInvisible in next version

function getElSize(el) {
  backupAttr(el, 'style');
  el.style.display = 'block';
  const t = getBoundingClientRect(el);
  const size = {
    width: t.width,
    height: t.height
  };
  restoreAttr(el, 'style');
  return size;
}
const getElSizeEvenInvisible = getElSize;
/**
 * [isOffsetInEl]
 * @param {Number} x
 * @param {Number} y
 * @param {Object} el HTML Element
 */

function isOffsetInEl(x, y, el) {
  const offset = getOffset(el);
  return offset.x <= x && offset.x + el.offsetWidth >= x && offset.y <= y && offset.y + el.offsetHeight >= y;
} // get border

function getBorder(el) {
  const body = document.body;
  const workArea = findParent(el, v => hasClass(v, 'work-area'));
  const of = getOffset(workArea);
  return {
    left: of.x,
    right: of.x + workArea.offsetWidth,
    top: of.y + 50,
    bottom: body.offsetHeight < glb().innerHeight ? glb().innerHeight : body.offsetHeight
  };
}
function setElChildByIndex(el, index, child) {
  child.childComponentIndex = index;
  const len = el.childNodes.length;

  if (len === 0) {
    el.appendChild(child);
  } else if (index === 0) {
    el.insertBefore(child, el.childNodes[0]);
  } else {
    const _binarySearch = binarySearch(el.childNodes, el => {
      return el.childComponentIndex - index;
    }, 0, max(index, len - 1), true),
          nearestIndex = _binarySearch.index,
          nearest = _binarySearch.value,
          bigger = _binarySearch.bigger;

    if (bigger) {
      el.insertBefore(child, nearest);
    } else {
      const next = el.childNodes[nearestIndex + 1];

      if (next) {
        el.insertBefore(child, next);
      } else {
        el.appendChild(child);
      }
    }
  }
} // from https://blog.csdn.net/qq_30100043/article/details/74719534

function getCss3Prefix(opt = {}) {
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

function onDOM(el, name, handler, ...args) {
  if (el.addEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.addEventListener(name, handler, ...args);
  } else if (el.attachEvent) {
    // IE 8 及更早 IE 版本
    el.attachEvent(`on${name}`, handler, ...args);
  }
}
function offDOM(el, name, handler, ...args) {
  if (el.removeEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.removeEventListener(name, handler, ...args);
  } else if (el.detachEvent) {
    // IE 8 及更早 IE 版本
    el.detachEvent(`on${name}`, handler, ...args);
  }
}
function onDOMMany(els, names, handler, ...args) {
  els = toArrayIfNot(els);
  names = toArrayIfNot(names);

  var _iterator8 = _createForOfIteratorHelper(els),
      _step8;

  try {
    for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
      const el = _step8.value;

      var _iterator11 = _createForOfIteratorHelper(names),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          const name = _step11.value;
          onDOM(el, name, handler, ...args);
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
  } catch (err) {
    _iterator8.e(err);
  } finally {
    _iterator8.f();
  }

  const destroy = () => {
    var _iterator9 = _createForOfIteratorHelper(els),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        const el = _step9.value;

        var _iterator10 = _createForOfIteratorHelper(names),
            _step10;

        try {
          for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
            const name = _step10.value;
            offDOM(el, name, handler);
          }
        } catch (err) {
          _iterator10.e(err);
        } finally {
          _iterator10.f();
        }
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
  };

  return destroy;
}
function getImageSizeByUrl(url) {
  const image = document.createElement('img');
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
function findNodeList(list, callback, opt = {}) {
  const iterator = iterateAll(list, {
    reverse: opt.reverse
  });

  var _iterator12 = _createForOfIteratorHelper(iterator),
      _step12;

  try {
    for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
      const _step12$value = _step12.value,
            value = _step12$value.value,
            index = _step12$value.index;

      if (callback(value, index)) {
        return value;
      }
    }
  } catch (err) {
    _iterator12.e(err);
  } finally {
    _iterator12.f();
  }
}
function findNodeListReverse(list, callback, opt = {}) {
  opt.reverse = true;
  return findNodeList(list, callback, opt);
}
function elementsFromPoint(...args) {
  const func = document.elementsFromPoint || document.msElementsFromPoint || elementsFromPoint;
  return func.apply(document, args);

  function elementsFromPoint(x, y) {
    const parents = [];
    let parent = void 0;

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
function getOuterAttachedHeight(el, opt = {}) {
  opt = _objectSpread({
    margin: true,
    border: true
  }, opt);
  const stl = getComputedStyle(el);
  let r = 0;
  const arr = [];

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
function getOuterAttachedWidth(el, opt = {}) {
  opt = _objectSpread({
    margin: true,
    border: true
  }, opt);
  const stl = getComputedStyle(el);
  let r = 0;
  const arr = [];

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
  if (!['year', 'month', 'day', 'date'].includes(type)) {
    type += 's';
  }

  type = studlyCase(type);

  if (type === 'Day') {
    type = 'Date';
  }

  var setFuncName = 'set' + type;
  var getFuncName = 'get' + type;
  dateObj[setFuncName](dateObj[getFuncName]() + n);
  return dateObj;
}
function getMonthStart(dateObj) {
  const clonedObj = cloneDate(dateObj);
  clonedObj.setDate(1);
  return clonedObj;
}
function getMonthEnd(dateObj) {
  const r = cloneDate(dateObj);
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

function getCalendar(year, month, startWeekDay = 0) {
  const results = [];
  const date = new Date(year, month - 1);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  const monthStart = getMonthStart(date);
  const monthStartDay = monthStart.getDay();
  const calendarStart = addDate(cloneDate(monthStart), -(monthStartDay + startWeekDay), 'day');

  if (monthStartDay > startWeekDay) {
    const startDate = calendarStart.getDate();
    const year = calendarStart.getFullYear();
    const month = calendarStart.getMonth() + 1;

    for (let i = startWeekDay; i < monthStartDay; i++) {
      const date = startDate + i;
      results.push({
        year,
        month,
        date: date,
        text: date,
        prevMonth: true
      });
    }
  } //


  const monthEnd = getMonthEnd(date);
  const monthEndtDate = monthEnd.getDate();

  for (let i = 1; i <= monthEndtDate; i++) {
    const date = i;
    results.push({
      year: year,
      month: month,
      date,
      text: date,
      currentMonth: true
    });
  } //


  const monthEndDay = monthEnd.getDay();
  const endWeekDay = 6 - startWeekDay;

  if (monthEndDay < endWeekDay) {
    const nextMonth = addDate(cloneDate(date), 1, 'month');
    const year = nextMonth.getFullYear();
    const month = nextMonth.getMonth() + 1;

    for (let i = monthEndDay + 1, date = 1; i <= endWeekDay; i++, date++) {
      results.push({
        year: year,
        month: month,
        date: date,
        text: date,
        nextMonth: true
      });
    }
  } //


  return splitArray(results, 7);
} // eg: 2018-09-07T03:38:37.888Z
// timezone must be UTC

function isIsoFormat(str) {
  return str.length > 15 && str.length < 30 && str.match(/^\d{4}-\d{2}-\d{2}T.*Z$/);
} // timestamp eg: 2018-09-07T03:38:37.888Z

function parseISO(timestamp) {
  const _timestamp$split = timestamp.split('T'),
        _timestamp$split2 = _slicedToArray(_timestamp$split, 2),
        datePart = _timestamp$split2[0],
        timePart = _timestamp$split2[1];

  let y,
      m,
      d,
      h = 0,
      min = 0,
      s = 0;

  var _datePart$split$map = datePart.split('-').map(v => parseInt(v));

  var _datePart$split$map2 = _slicedToArray(_datePart$split$map, 3);

  y = _datePart$split$map2[0];
  m = _datePart$split$map2[1];
  d = _datePart$split$map2[2];
  m = m - 1;

  if (timePart) {
    const t = timePart.split('-').map(v => parseFloat(v));
    h = t[0];

    if (t[1] != null) {
      min = t[1];
    }

    if (t[2] != null) {
      s = t[2];
    }
  }

  const dt = new Date(y, m, d, h, min, s); // the dt timezone is current, so reset hour with setUTCHours

  dt.setUTCHours(h);
  return dt;
} // advance =================================
// binarySearch 二分查找
// callback(mid, i) should return mid - your_value

function binarySearch(arr, callback, start, end, returnNearestIfNoHit, max = 1000) {
  let midNum;
  let mid;

  if (start == null) {
    start = 0;
    end = arr.length - 1;
  }

  let i = 0;
  let r;

  while (start >= 0 && start <= end) {
    if (i >= max) {
      throw Error(`binarySearch: loop times is over ${max}, you can increase the limit.`);
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

function waitFor(name, condition, time = 100, maxCount = 1000) {
  if (isFunction(name)) {
    maxCount = time;
    time = isNumeric(condition) ? condition : 100;
    condition = name;
    name = null;
  }

  if (!store.waitFor) store.waitFor = {};
  const waits = store.waitFor;

  if (name && isset(waits[name])) {
    glb().clearInterval(waits[name]);
    delete waits[name];
  }

  return new Promise(function (resolve, reject) {
    let count = 0;

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

    const interval = glb().setInterval(function () {
      judge(interval);
    }, time);

    if (name) {
      waits[name] = interval;
    }

    judge();
  });
}
function retry(func, limitTimes = 3) {
  if (!store.retry) store.retry = {};
  const counters = retry;
  const name = generateName();
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
    const name = Math.random() + '';

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
}
function isNode() {
  return Boolean(typeof global.module !== 'undefined' && global.module.exports);
}
function isIE() {
  return Boolean(window.ActiveXObject || "ActiveXObject" in window);
} // jquery

function jqFixedSize(sel) {
  const $ = glb().jQuery;
  $(sel).each(function () {
    const t = $(this);
    t.css({
      width: t.width() + 'px',
      height: t.height() + 'px'
    });
  });
}
function jqMakeCarousel(wrapperSel, listSel, itemSel, speed = 1000, space = 16, dir = 'left', top = 0) {
  if (space.toString().match(/^\d+$/)) {
    space = space + 'px';
  }

  const spaceNumber = parseFloat(space);
  const $ = glb().jQuery;
  const wrapper = $(wrapperSel);
  const list = wrapper.find(listSel);
  wrapper.css({
    position: 'relative',
    height: wrapper.height() + 'px'
  });
  const items0 = list.find(itemSel);
  items0.css({
    margin: '0',
    marginRight: space
  });
  const width = (Math.ceil(items0.width()) + spaceNumber) * items0.length;
  list.css({
    position: 'absolute',
    margin: '0',
    width: width + 'px'
  });
  const height = list.height();
  const list2 = list.clone();
  const list3 = list.clone();
  list.css({
    left: 0
  });
  list2.css({
    left: width + 'px'
  });
  list3.css({
    left: width * 2 + 'px'
  });
  const lists = $('<div></div>');
  lists.css({
    position: 'absolute',
    width: width * 3 + 'px',
    height: height + 'px',
    left: 0,
    top
  });
  lists.append(list).append(list2).append(list3);
  wrapper.append(lists);
  let left = 0;

  function animateLoop() {
    if (dir === 'left') {
      left -= 100;
    } else {
      left += 100;
    }

    lists.animate({
      left: `${left}px`
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

function openWindow(url, name, opt = {}) {
  glb().open(url, name, Object.keys(opt).map(k => `${k}=${opt[k]}`).join(','));
}
function openCenterWindow(url, name, width, height, opt = {}) {
  const t = {
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
    let t = decodeURI(baseUrl).split('?');
    this.baseUrl = t[0];

    if (t[1]) {
      t[1].split('&').forEach(v => {
        let t2 = v.split('=');
        this.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
      });
    }
  }

  getHref() {
    const t = [this.baseUrl];
    let searchStr = Object.keys(this.search).map(k => `${k}=${encodeURIComponent(this.search[k])}`).join('&');

    if (searchStr) {
      t.push(searchStr);
    }

    return t.join('?');
  }

} // 解析函数参数, 帮助重载
// types eg: ['Object', (i) => i > 3, ['Number', default], null ]
// null represent all types of argument

function resolveArgsByType(args, types) {
  let argIndex = 0;
  return types.map(v => {
    // make rule
    let rule, dft;

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
        const t = rule;

        rule = x => Object.prototype.toString.call(x) === `[object ${t}]`;
      }
    }

    const arg = args[argIndex];

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
      let t = this.storage.getItem(name);

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
    const off = () => {
      this.off(name, wrappedHandler);
    };

    const wrappedHandler = (...args) => {
      handler(...args);
      off();
    };

    this.on(name, wrappedHandler);
    return off;
  }

  onceTimeout(name, handler, timeout) {
    let off;
    const promise = new Promise((resolve, reject) => {
      const wrappedHandler = (...args) => {
        handler(...args);
        resolve();
      };

      off = this.once(name, wrappedHandler);
      waitTime(timeout).then(() => {
        off();
        reject();
      });
    });

    const off2 = () => {
      off && off();
    };

    return {
      off: off2,
      promise
    };
  }

  off(name, handler) {
    const indexes = []; // to remove indexes; reverse; 倒序的

    const len = this.eventStore.length;

    for (let i = 0; i < len; i++) {
      const item = this.eventStore[i];

      if (item.name === name && item.handler === handler) {
        indexes.unshift(i);
      }
    }

    for (var _i7 = 0, _indexes = indexes; _i7 < _indexes.length; _i7++) {
      const index = _indexes[_i7];
      this.eventStore.splice(index, 1);
    }
  }

  emit(name, ...args) {
    // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
    const items = [];

    var _iterator13 = _createForOfIteratorHelper(this.eventStore),
        _step13;

    try {
      for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
        const item = _step13.value;

        if (item.name === name) {
          items.push(item);
        }
      }
    } catch (err) {
      _iterator13.e(err);
    } finally {
      _iterator13.f();
    }

    for (var _i8 = 0, _items = items; _i8 < _items.length; _i8++) {
      const item = _items[_i8];
      item.handler(...args);
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
        const event = JSON.parse(ev.newValue);

        if (!event.targets || event.targets.includes(this.id)) {
          this.emitLocal(event.name, ...event.args);
        }
      }
    }); // social parts 集体部分
    // join

    this.id = strRand();
    this.windows = [this.id];
    this.ready = new Promise((resolve, reject) => {
      this.onceTimeout('_windows_updated', ({
        windows
      }) => {
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

      this.on('_windows_updated', ({
        windows
      }) => {
        this.windows = windows;
      }); // on exit

      this.on('_exit', id => {
        const oldMain = this.windows[0];
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

  emitTo(name, targets, ...args) {
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

  emitLocal(name, ...args) {
    this.emitTo(name, this.id, ...args);
  }

  broadcast(name, ...args) {
    this.emitTo(name, this.BROADCAST, ...args);
  }

  emit(name, ...args) {
    this.emitTo(name, this.windows, ...args);
  }

  exitGroup() {
    this.broadcast('_exit', this.id);
  }

} // Deprecated in next version

const CrossWindow = CrossWindowEventProcessor;
function onQuickKeydown(handler, opt = {}) {
  opt = _objectSpread({
    timeout: 1000
  }, opt);
  let input = '';
  let timeoutId;

  const keydownHandler = e => {
    if (e.key && e.key.length === 1) {
      input = `${input}${e.key}`;
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

function attachCache(obj, toCache, cache = new Cache()) {
  for (const key in toCache) {
    const getter = toCache[key];
    Object.defineProperty(obj, key, {
      get() {
        return cache.remember(key, () => getter.call(this));
      }

    });
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
exports.isIE = isIE;
exports.isIsoFormat = isIsoFormat;
exports.isNode = isNode;
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
