/*!
 * helper-js v1.0.33
 * phphe <phphe@outlook.com> (https://github.com/phphe)
 * https://github.com/phphe/helper-js.git
 * Released under the MIT License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var paths = path.split('.');
  var current = obj;
  var parent = null;

  for (var i = 0; i < paths.length; i++) {
    if (current[paths[i]] == null) {
      return defaultValue;
    } else {
      parent = current;
      current = current[paths[i]];
    }
  }

  var lastPath = arrayLast(paths);
  return parent.hasOwnProperty(lastPath) ? current : defaultValue;
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
    lastKey = path.substr(lastDotIndex + 1);
  }
  parent[lastKey] = value;
}

function unset(obj, prop) {
  obj[prop] = undefined;
  try {
    delete obj[prop];
  } catch (e) {}
}

// exclude: array or function
function cloneObj(obj, exclude) {
  var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
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
      var r = void 0;
      if (isArray(obj)) {
        r = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = obj[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            r.push(cloneObj(item, exclude));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else {
        r = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.keys(obj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var key = _step2.value;

            if (!exclude || isArray(exclude) && !exclude.includes(key) || !exclude(key, obj[key], obj)) {
              r[key] = cloneObj(obj[key], exclude);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
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
// function
function executeWithCount(func, context) {
  var count = 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.unshift(count++);
    return func.apply(context, args);
  };
}
function watchChange(getVal, handler) {
  var oldVal = void 0;
  var update = function update() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var newVal = getVal.apply(undefined, args);
    if (oldVal !== newVal) {
      handler.apply(undefined, [newVal].concat(args));
    }
    oldVal = newVal;
  };
  return update;
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

function getOffsetWithoutScroll(el) {
  var elOffset = {
    x: el.offsetLeft,
    y: el.offsetTop
  };
  var parentOffset = { x: 0, y: 0 };
  if (el.offsetParent != null) parentOffset = getOffsetWithoutScroll(el.offsetParent);
  return {
    x: elOffset.x + parentOffset.x,
    y: elOffset.y + parentOffset.y
  };
}

function getOffset(el) {
  var offfset = getOffsetWithoutScroll(el);
  var el2 = el;
  var body = document.body;
  while (el2 && el2 !== body) {
    offfset.x -= el2.scrollLeft;
    offfset.y -= el2.scrollTop;
    el2 = el2.parentElement;
  }
  return offfset;
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
  var key = 'original_' + name;
  el[key] = el.getAttribute(name);
}

function restoreAttr(el, name) {
  var key = 'original_' + name;
  el.setAttribute(name, el[key]);
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
      return { index: midNum, value: mid, count: i + 1, hit: true };
    }
    i++;
  }
  return returnNearestIfNoHit ? { index: midNum, value: mid, count: i + 1, hit: false, bigger: r > 0 } : null;
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
// 复制文字到剪贴板
function copyTextToClipboard(text) {
  var textArea = document.createElement('textarea');

  //
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
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
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

// jquery
function jqFixedSize(sel) {
  var $ = window.jQuery;
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
  var $ = window.jQuery;
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
      left: left + 'px'
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
}
// https://developer.mozilla.org/docs/Web/API/Window/open
// http://www.w3school.com.cn/htmldom/met_win_open.asp#windowfeatures
function openWindow(url, name) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  window.open(url, name, Object.keys(opt).map(function (k) {
    return k + '=' + opt[k];
  }).join(','));
}

function openCenterWindow(url, name, width, height) {
  var opt = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  openWindow(url, name, _extends({
    width: width,
    height: height,
    top: (window.screen.availHeight - 30 - height) / 2,
    left: (window.screen.availWidth - 30 - width) / 2
  }, opt));
}
var URLHelper = function () {
  function URLHelper(baseUrl) {
    var _this = this;

    _classCallCheck(this, URLHelper);

    this.baseUrl = '';
    this.search = {};

    var t = decodeURI(baseUrl).split('?');
    this.baseUrl = t[0];
    if (t[1]) {
      t[1].split('&').forEach(function (v) {
        var t2 = v.split('=');
        _this.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
      });
    }
  } // protocol, hostname, port, pastname


  _createClass(URLHelper, [{
    key: 'getHref',
    value: function getHref() {
      var _this2 = this;

      var t = [this.baseUrl];
      var searchStr = Object.keys(this.search).map(function (k) {
        return k + '=' + encodeURIComponent(_this2.search[k]);
      }).join('&');
      if (searchStr) {
        t.push(searchStr);
      }
      return t.join('?');
    }
  }]);

  return URLHelper;
}();

// 解析函数参数, 帮助重载
// types eg: ['Object', (i) => i > 3, ['Number', default] ]
function resolveArgsByType(args, types) {
  var argIndex = 0;
  return types.map(function (v) {
    // make rule
    var rule = void 0,
        dft = void 0;
    if (isArray(v)) {
      rule = v[0];
      dft = v[1];
    } else {
      rule = v;
      dft = null;
    }
    if (!isFunction(rule)) {
      if (rule == null) {
        rule = function rule() {
          return true;
        };
      } else {
        var t = rule;
        rule = function rule(x) {
          return Object.prototype.toString.call(x) === '[object ' + t + ']';
        };
      }
    }
    var arg = args[argIndex];
    if (rule(arg)) {
      argIndex++;
    }
    return arg || dft;
  });
}

// set null can remove a item
function makeStorageHelper(storage) {
  return {
    storage: storage,
    set: function set(name, value, minutes) {
      if (value == null) {
        this.storage.removeItem(name);
      } else {
        this.storage.setItem(name, JSON.stringify({
          value: value,
          expired_at: minutes && new Date().getTime() / 1000 + minutes * 60
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
var localStorage2 = makeStorageHelper(window.localStorage);
var sessionStorage2 = makeStorageHelper(window.sessionStorage);

// 事件处理
var EventProcessor = function () {
  function EventProcessor() {
    _classCallCheck(this, EventProcessor);

    this.eventStore = [];
  }

  _createClass(EventProcessor, [{
    key: 'on',
    value: function on(name, handler) {
      this.eventStore.push({ name: name, handler: handler });
    }
  }, {
    key: 'once',
    value: function once(name, handler) {
      var _this3 = this;

      var off = function off() {
        _this3.off(name, wrappedHandler);
      };
      var wrappedHandler = function wrappedHandler() {
        handler();
        off();
      };
      this.on(name, wrappedHandler);
      return off;
    }
  }, {
    key: 'off',
    value: function off(name, handler) {
      var indexes = []; // to remove indexes; reverse; 倒序的
      var len = this.eventStore.length;
      for (var i = 0; i < len; i++) {
        var item = this.eventStore[i];
        if (item.name === name && item.handler === handler) {
          indexes.unshift(i);
        }
      }
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = indexes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var index = _step3.value;

          this.eventStore.splice(index, 1);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }, {
    key: 'emit',
    value: function emit(name) {
      // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
      var items = [];
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.eventStore[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var item = _step4.value;

          if (item.name === name) {
            items.push(item);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _item = _step5.value;

          _item.handler.apply(_item, args);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
  }]);

  return EventProcessor;
}();

var CrossWindow = function (_EventProcessor) {
  _inherits(CrossWindow, _EventProcessor);

  function CrossWindow() {
    _classCallCheck(this, CrossWindow);

    var _this4 = _possibleConstructorReturn(this, (CrossWindow.__proto__ || Object.getPrototypeOf(CrossWindow)).call(this));

    _this4.storageName = '_crossWindow';

    var cls = CrossWindow;
    if (!cls._listen) {
      cls._listen = true;
      onDOM(window, 'storage', function (ev) {
        if (ev.key === _this4.storageName) {
          var _get2;

          var event = JSON.parse(ev.newValue);
          (_get2 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), 'emit', _this4)).call.apply(_get2, [_this4, event.name].concat(_toConsumableArray(event.args)));
        }
      });
    }
    return _this4;
  }

  _createClass(CrossWindow, [{
    key: 'emit',
    value: function emit(name) {
      var _get3;

      for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }

      (_get3 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), 'emit', this)).call.apply(_get3, [this, name].concat(args));
      window.localStorage.setItem(this.storageName, JSON.stringify({
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

// arr, idKey/getId
function mapObjects(arr, idKey) {
  var r = {};
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    var item = arr[i];
    var id = isFunction(idKey) ? idKey(item, i) : item[idKey];
    r[id] = item;
  }
  return r;
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
exports.kebabCase = kebabCase;
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
exports.cloneObj = cloneObj;
exports.executeWithCount = executeWithCount;
exports.watchChange = watchChange;
exports.getUrlParam = getUrlParam;
exports.uniqueId = uniqueId;
exports.isDescendantOf = isDescendantOf;
exports.getOffsetWithoutScroll = getOffsetWithoutScroll;
exports.getOffset = getOffset;
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
exports.onDOM = onDOM;
exports.offDOM = offDOM;
exports.binarySearch = binarySearch;
exports.windowLoaded = windowLoaded;
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
exports.localStorage2 = localStorage2;
exports.sessionStorage2 = sessionStorage2;
exports.EventProcessor = EventProcessor;
exports.CrossWindow = CrossWindow;
exports.mapObjects = mapObjects;
