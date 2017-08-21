/*!
 * helper-js v1.0.17
 * phphe <phphe@outlook.com> (https://github.com/phphe)
 * https://github.com/phphe/helper-js.git
 * Released under the MIT License.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.helperJs = global.helperJs || {})));
}(this, (function (exports) { 'use strict';

// local store
var store = {};
// is 各种判断
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
  var num = parseFloat(v);
  return !isNaN(num) && isNumber(num);
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
}
// num
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
}
// str 字符
function studlyCase(str) {
  return str && str[0].toUpperCase() + str.substr(1);
}
function snakeCase(str) {
  return str.replace(/ /g, '-').replace(/_/g, '-').replace(/([^A-Z])([A-Z])/g, '$1-$2').replace(/--+/g, '-').replace(/^-|-$|/g, '').toLowerCase();
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
}
// array
function arrayRemove(arr, v) {
  var index = void 0;
  var count = 0;
  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1);
    count++;
  }
  return count;
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
}
function toArrayIfNot(arrOrNot) {
  return isArray(arrOrNot) ? arrOrNot : [arrOrNot];
}

// object
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
}
// source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
function objectGet(obj, path) {
  var paths = path.split('.');
  var current = obj;

  for (var i = 0; i < paths.length; i++) {
    if (current[paths[i]] == null) {
      return null;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}

function objectSet(obj, path, value) {
  var lastDotIndex = path.lastIndexOf('.');
  var parent = void 0,
      lastKey = void 0;
  if (lastDotIndex === -1) {
    parent = obj;
    lastKey = path;
  } else {
    parent = objectGet(obj, path.substring(0, lastDotIndex));
    lastKey = path.substr(lastDotIndex);
  }
  parent[lastKey] = value;
}

function unset(obj, prop) {
  obj[prop] = undefined;
  try {
    delete obj[prop];
  } catch (e) {}
}
// url
/* eslint-disable */
function getUrlParam(par) {
  // 获取当前URL
  var local_url = document.location.href;
  // 获取要取得的get参数位置
  var get = local_url.indexOf(par + '=');
  if (get == -1) {
    return false;
  }
  // 截取字符串
  var get_par = local_url.slice(par.length + get + 1);
  // 判断截取后的字符串是否还有其他get参数
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
function getOffset(el) {
  return doGetOffset(el);
  function doGetOffset(el) {
    var elOffset = {
      x: el.offsetLeft,
      y: el.offsetTop
    };
    var parentOffset = { x: 0, y: 0 };
    if (el.offsetParent != null) parentOffset = doGetOffset(el.offsetParent);
    return {
      x: elOffset.x + parentOffset.x,
      y: elOffset.y + parentOffset.y
    };
  }
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

// source: http://youmightnotneedjquery.com/
function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}

// source: http://youmightnotneedjquery.com/
function addClass(el, className) {
  if (!hasClass(el, className)) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }
}
// source: http://youmightnotneedjquery.com/
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
}
// get border
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
    bottom: body.offsetHeight < window.innerHeight ? window.innerHeight : body.offsetHeight
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
}
// dom event
function onDOM(el, name, handler) {
  if (el.addEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.addEventListener(name, handler);
  } else if (el.attachEvent) {
    // IE 8 及更早 IE 版本
    el.attachEvent('on' + name, handler);
  }
}
function offDOM(el, name, handler) {
  if (el.removeEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.removeEventListener(name, handler);
  } else if (el.detachEvent) {
    // IE 8 及更早 IE 版本
    el.detachEvent('on' + name, handler);
  }
}
// advance
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
  var r = void 0;
  while (start >= 0 && start <= end) {
    if (i >= max) {
      throw Error('binarySearch: loop times is over ' + max + ', you can increase the limit.');
    }
    midNum = Math.floor((end - start) / 2 + start);
    mid = arr[midNum];
    r = callback(mid, i);
    if (r > 0) {
      end = midNum - 1;
    } else if (r < 0) {
      start = midNum + 1;
    } else {
      return { index: midNum, value: mid, count: i + 1 };
    }
    i++;
  }
  return returnNearestIfNoHit ? { index: midNum, value: mid, count: i + 1, bigger: r > 0 } : null;
}
//
function windowLoaded() {
  return new Promise(function (resolve, reject) {
    if (document && document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', function once() {
        resolve();
        window.removeEventListener('load', once);
      });
    }
  });
}
// overload waitFor(condition, time = 100, maxCount = 1000))
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
    window.clearInterval(waits[name]);
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
          window.clearInterval(waits[name]);
          delete waits[name];
        } else {
          window.clearInterval(interval);
        }
      }
    }
    var interval = window.setInterval(function () {
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
}

exports.store = store;
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
exports.snakeCase = snakeCase;
exports.camelCase = camelCase;
exports.camelToWords = camelToWords;
exports.titleCase = titleCase;
exports.strRand = strRand;
exports.replaceMultiple = replaceMultiple;
exports.arrayRemove = arrayRemove;
exports.arrayFirst = arrayFirst;
exports.arrayLast = arrayLast;
exports.arrayDiff = arrayDiff;
exports.toArrayIfNot = toArrayIfNot;
exports.assignIfDifferent = assignIfDifferent;
exports.objectMerge = objectMerge;
exports.objectMap = objectMap;
exports.objectOnly = objectOnly;
exports.objectExcept = objectExcept;
exports.objectGet = objectGet;
exports.objectSet = objectSet;
exports.unset = unset;
exports.getUrlParam = getUrlParam;
exports.uniqueId = uniqueId;
exports.isDescendantOf = isDescendantOf;
exports.getOffset = getOffset;
exports.findParent = findParent;
exports.hasClass = hasClass;
exports.addClass = addClass;
exports.removeClass = removeClass;
exports.getElSize = getElSize;
exports.isOffsetInEl = isOffsetInEl;
exports.getBorder = getBorder;
exports.setElChildByIndex = setElChildByIndex;
exports.onDOM = onDOM;
exports.offDOM = offDOM;
exports.binarySearch = binarySearch;
exports.windowLoaded = windowLoaded;
exports.waitFor = waitFor;
exports.retry = retry;

Object.defineProperty(exports, '__esModule', { value: true });

})));
