// local store
export const store = {}
// get global
export function glb() {
  if (store.glb) {
    return store.glb
  } else {
    // resolve global
    let t
    try {
      t = global
    } catch (e) {
      t = window
    }
    store.glb = t
    return t
  }
}
// is 各种判断
export function isset (v) {
  return typeof v !== 'undefined'
}
export function isArray (v) {
  return Object.prototype.toString.call(v) === '[object Array]'
}
export function isBool (v) {
  return Object.prototype.toString.call(v) === '[object Boolean]'
}
export function isNumber (v) {
  return Object.prototype.toString.call(v) === '[object Number]'
}
export function isNumeric (v) {
  return isFinite(v)
}
export function isString (v) {
  return Object.prototype.toString.call(v) === '[object String]'
}
export function isObject (v) {
  return Object.prototype.toString.call(v) === '[object Object]'
}
export function isFunction (v) {
  return typeof v === 'function'
}
export function isPromise (v) {
  return Object.prototype.toString.call(v) === '[object Promise]'
}
export function empty(v) {
  if (v == null) {
    return true
  } else if (v.length != null) {
    return v.length === 0
  } else if (isBool(v)) {
    return false
  } else if (isNumber(v)) {
    return isNaN(v)
  } else if (isObject(v)) {
    return Object.keys(v).length === 0
  }
}
// num
export function numRand (min, max) {
  if (arguments.length === 1) {
    max = min
    min = 0
  }
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function numPad (num, n) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}
export function min (n, min) {
  return n < min ? min : n
}

export function max (n, max) {
  return n < max ? n : max
}

// str 字符
export function studlyCase (str) {
  return str && (str[0].toUpperCase() + str.substr(1))
}

export function kebabCase(str) {
  return str
    .replace(/ /g, '-')
    .replace(/_/g, '-')
    .replace(/([A-Z])/g, '-$1')
    .replace(/--+/g, '-')
    .replace(/^-|-$|/g, '')
    .toLowerCase()
}

export function snakeCase (str) {
  return kebabCase(str).replace(/-/g, '_')
}

export function camelCase (str) {
  const temp = str.toString().split(/[-_]/)
  for (let i = 1; i < temp.length; i++) {
    temp[i] = studlyCase(temp[i])
  }
  return temp.join('')
}
export function camelToWords (str) {
  return str.toString().trim().split(/(?=[A-Z])/)
}
export function titleCase (str) {
  return camelToWords(studlyCase(camelCase(str))).join(' ').replace(/\bid\b/ig, 'ID')
}
export function strRand (len = 8, prefix = '') {
  let r = ''
  const seeds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < len; i++) {
    r += seeds[numRand(seeds.length - 1)]
  }
  return prefix + r
}
export function replaceMultiple(mapObj, str) {
  const reg = new RegExp(Object.keys(mapObj).join('|'), 'g')
  return str.replace(reg, function (matchedKey) {
    return mapObj[matchedKey]
  })
}
// array
export function arrayRemove(arr, v) {
  let index
  let count = 0
  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1)
    count++
  }
  return count
}
export function arrayRemoveBySortedIndexes(arr, sortedIndexes) {
  for (let i = sortedIndexes.length - 1; i >= 0; i--) {
    const index = sortedIndexes[i]
    arr.splice(index, 1)
  }
}
export function newArrayRemoveAt(arr, indexes) {
  indexes = toArrayIfNot(indexes)
  const mapping = {}
  for (const index of indexes) {
    mapping[index] = true
  }
  const newArr = []
  const len = arr.length
  for (let i = 0; i < len; i++) {
    if (!mapping[i]) {
      newArr.push(arr[i])
    }
  }
  return newArr
}
export function arrayAt(arr, n) {
  return arr[n >= 0 ? n : (arr.length + n)]
}
export function arrayFirst(arr) {
  return arr[0]
}
export function arrayLast(arr) {
  return arr[arr.length - 1]
}
export function arrayDiff(arr1, arr2) {
  var len = arr1.length
  var arr = []
  while (len--) {
    if (arr2.indexOf(arr1[len]) < 0) {
      arr.push(arr1[len])
    }
  }
  return arr
}
// offset can be many
export function arraySibling(arr, item, offset) {
  const index = arr.indexOf(item)
  if (index === -1) {
    throw 'item is not in array'
  }
  if (isArray(offset)) {
    return offset.map(v => arr[index + v])
  }
  return arr[index + offset]
}
export function toArrayIfNot(arrOrNot) {
  return isArray(arrOrNot) ? arrOrNot : [arrOrNot]
}
// n can be getter(number of times)
// n可以是方法, 参数1是第几次分块
export function splitArray(arr, n) {
  const r = []
  if (isFunction(n)) {
    const getChunkLength = n
    let times = 1
    let i = 0
    while (i < arr.length) {
      const n = getChunkLength(times)
      const end = i + n
      r.push(arr.slice(i, end))
      i = end
      times++
    }
  } else {
    let i = 0
    while (i < arr.length) {
      const end = i + n
      r.push(arr.slice(i, end))
      i = end
    }
  }
  return r
}
export function groupArray(arr, getMark) {
  const groups = new Map
  arr.forEach(v => {
    const mark = getMark(v)
    if (!groups.has(mark)) {
      groups.set(mark, [])
    }
    groups.get(mark).push(v)
  })
  const r = []
  groups.forEach((value, key) => {
    r.push([key, value])
  })
  return r
}
export function arrayDistinct(arr) {
  if (glb().Set) {
    return [...new Set(arr)]
  } else {
    return arr.filter((v, i, a) => a.indexOf(v) === i)
  }
}
// object
export function assignIfDifferent(obj, key, val) {
  if (obj[key] !== val) {
    obj[key] = val
  }
}
export function objectMerge(o1, o2) {
  for (const k in o2) {
    if (!o1.hasOwnProperty(k)) {
      o1[k] = o2[k]
    } else if (isObject(o1[k]) && isObject(o2[k])) {
      Object.assign(o1[k], o2[k])
    } else {
      o1[k] = o2[k]
    }
  }
  return o1
}
export function objectMap(obj, func) {
  const r = {}
  for (const key in obj) {
    r[key] = func(obj[key], key, obj)
  }
  return r
}
export function objectOnly(obj, keys) {
  const r = {}
  for (const key in obj) {
    if (keys.indexOf(key) > -1) {
      r[key] = obj[key]
    }
  }
  return r
}
export function objectExcept(obj, keys) {
  const r = {}
  for (const key in obj) {
    if (keys.indexOf(key) === -1) {
      r[key] = obj[key]
    }
  }
  return r
}
// loop for all type
export function forAll(val, handler, reverse) {
  if (!reverse) {
    if (isArray(val) || isString(val)) {
      for (let i = 0; i < val.length; i++) {
        if (handler(val[i], i) === false) {
          break
        }
      }
    } else if (isObject(val)) {
      for (const key of Object.keys(val)) {
        if (handler(val[key], key) === false) {
          break
        }
      }
    } else if (Number.isInteger(val)) {
      for (let i = 0; i < val; i++) {
        if (handler(i, i) === false) {
          break
        }
      }
    }
  } else {
    if (isArray(val) || isString(val)) {
      for (let i = val.length - 1; i >= 0 ; i--) {
        if (handler(val[i], i) === false) {
          break
        }
      }
    } else if (isObject(val)) {
      const keys = Object.keys(val)
      keys.reverse()
      for (const key of keys) {
        if (handler(val[key], key) === false) {
          break
        }
      }
    } else if (Number.isInteger(val)) {
      for (let i = val - 1; i >= 0; i--) {
        if (handler(i, i) === false) {
          break
        }
      }
    }
  }
}

// source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
export function objectGet(obj, path, throwError) {
  const paths = isArray(path) ? path : path.split('.')
  let current = obj
  try {
    for (const key of paths) {
      current = current[key]
    }
  } catch (e) {
    if (throwError) {
      throw "Path does not exist"
    }
  }
  return current
}

export function objectSet(obj, path, value) {
  const paths = isArray(path) ? path : path.split('.')
  const lastKey = arrayLast(paths)
  const parent = objectGet(obj, paths.slice(0, paths.length - 1))
  if (!parent) {
    throw "Path does not exist"
  }
  parent[lastKey] = value
}

export function unset(obj, prop) {
  obj[prop] = undefined
  try {
    delete obj[prop]
  } catch (e) {}
}

// exclude: array or function
export function cloneObj(obj, exclude) {
  const type = typeof(obj)
  switch (type) {
    case 'undefined':
    case 'boolean':
    case 'nuber':
    case 'string':
    case 'function':
        return obj
      break;
    case 'object':
        if (obj === null) {
          // null is object
          return obj
        }
        let r
        if (isArray(obj)) {
          r = []
          for (const item of obj) {
            r.push(cloneObj(item, exclude))
          }
        } else {
          r = {}
          for (const key of Object.keys(obj)) {
            if (!exclude || (isArray(exclude) && !exclude.includes(key)) || !exclude(key, obj[key], obj)) {
              r[key] = cloneObj(obj[key], exclude)
            }
          }
        }
        return r
      break;
    default:
        return obj
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
export function mapObjectTree(obj, handler, limit=10000) {
  let r
  let count = 0
  const stack = [{value: obj}]
  while (stack.length > 0) {
    if (count >= limit) {
      throw `mapObjectTree: limit(${limit}) reached, object may has circular reference`
    }
    count++
    const {value, key, parent, newParent} = stack.shift()
    const t = handler(value, key, parent)
    const assign = (value, key, canPush) => {
      if (isArray(value)) {
        value = []
      } else if (isObject(value)) {
        value = {}
      }
      if (parent) {
        if (isArray(newParent) && canPush) {
          newParent.push(value)
        } else {
          newParent[key] = value
        }
      } else {
        r = value
      }
      // value may changed
      return value
    }
    let newVal, val, toDelete , stop, skip
    if (!t) {
      // no change
      val = value
      newVal = assign(value, key)
    } else {
      const {key: key2, value} = t
      val = value
      if (t.delete || key2 === false) {
        // del
        toDelete = true
      } else if (key2 == null) {
        // don't change key
        newVal = assign(value, key, true)
      } else if(t.hasOwnProperty('value')) {
        newVal = assign(value, key2)
      }
      ({stop, skip} = t)
    }
    if (toDelete) {
      continue
    }
    if (skip) {
      continue
    }
    if (stop) {
      break
    }
    if (isArray(val)) {
      const len = val.length
      for (let i = 0; i < len; i++) {
        stack.push({value: val[i], key: i, parent: val, newParent: newVal})
      }
    } else if (isObject(val)) {
      Object.keys(val).forEach(key => {
        stack.push({value: val[key], key, parent: val, newParent: newVal})
      })
    }
  }
  return r
}
// arr, idKey/getId
export function mapObjects(arr, idKey) {
  const r = {}
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const item = arr[i]
    const id = isFunction(idKey) ? idKey(item, i) : item[idKey]
    r[id] = item
  }
  return r
}
//
export function pairRows(rows1, rows2, key1, key2) {
  if (!key2) {
    key2 = key1
  }
  const map = mapObjects(rows2, key2)
  return rows1.map(row1 => [row1, map[row1[key1]]])
}

// function helper | method helper
export function executeWithCount(func) {
  let count = 0
  return function(...args) {
    return func.call(this, count++, ...args)
  }
}
export function watchChange(getVal, handler) {
  let oldVal
  const update = (...args) => {
    const newVal = getVal(...args)
    if (oldVal !== newVal) {
      handler(newVal, ...args)
    }
    oldVal = newVal
  }
  return update
}
export const store_executeOnceInScopeByName = {}
export function executeOnceInScopeByName(name, action, scope = scope_executeOnceInScopeByName, storeResult) {
  name = `executeOnceInScopeByName_${name}`
  if (!scope[name]) {
    const value = action()
    const destroy = () => {
      delete scope[name]
    }
    scope[name] = {destroy}
    if (storeResult) {
      scope[name].value = value
    }
  }
  return scope[name]
}
export function debounceTrailing(action, wait = 0) {
  let t
  let delaying
  let lastArgs // when trailing, use last args
  let resolves = []
  let rejects = []
  const wrappedAction = function (...args) {
    return new Promise((resolve, reject) => {
      resolves.push(resolve)
      rejects.push(reject)
      //
      lastArgs = args
      if (!delaying) {
        delaying = true
        t = setTimeout(() => {
          const result = action.call(this, ...lastArgs)
          t = null
          delaying = false
          resolves.forEach(resolve => resolve(result))
          resolves = []
          rejects = []
        }, wait)
      }
    })
  }
  wrappedAction.stop = () => {
    if (t) {
      clearTimeout(t)
      t = null
    }
    delaying = false
    resolves = []
    rejects.forEach(reject => reject())
    rejects = []
  }
  return wrappedAction
}
export function debounceImmediate(action, wait = 0) {
  let t
  let delaying
  let result
  const wrappedAction = function (...args) {
    return new Promise((resolve, reject) => {
      if (delaying) {
        resolve(result)
      } else {
        delaying = true
        result = action.call(this, ...lastArgs)
        resolve(result)
        t = setTimeout(() => {
          t = null
          delaying = false
          result = null
        }, wait)
      }
    })
  }
  wrappedAction.stop = () => {
    if (t) {
      clearTimeout(t)
      t = null
    }
    delaying = false
  }
  return wrappedAction
}
export function debounce(action, wait = 0, opt = {}) {
  if (opt.immediate) {
    return debounceImmediate(action, wait)
  } else {
    return debounceTrailing(action, wait)
  }
}
/**
 * [joinMethods description]
 * @param  {[Function[]]} methods        [description]
 * @param  {String} [mode='value'] [value, pipeline]
 * @return {[Function]}                [description]
 */
export function joinMethods(methods, mode = 'value') {
  let simpleJoinedMethod
  for (const method of methods) {
    const old = simpleJoinedMethod
    if (old) {
      simpleJoinedMethod = function (...args) {
        return method.call(this, mode === 'value' ? old.call(this, ...args) : old, ...args)
      }
    } else {
      simpleJoinedMethod = method
    }
  }
  return simpleJoinedMethod
}
// promise
// execute promise in sequence
export function executePromiseGetters(getters, concurrent = 1) {
  let stopped
  const promise = new Promise(function(resolve, reject) {
    const r = []
    const chunks = splitArray(getters, concurrent)
    let promise = Promise.resolve()
    chunks.forEach(chunk => {
      promise = promise.then(result => {
        if (result) {
          r.push(...result)
        }
        if (stopped) {
          reject('stopped')
        } else {
          return Promise.all(chunk.map(v => v()))
        }
      })
    })
    promise.then(result => {
      r.push(...result)
      resolve(r)
    })
  })
  return {
    promise,
    destroy() {
      stopped = true
    },
  }
}

export function promiseTimeout(promise, timeout) {
  return new Promise((resolve, reject) => {
    let t, rejected
    promise.then((...args) => {
      clearTimeout(t)
      resolve(...args)
    }, (...args) => {
      if (!rejected) {
        clearTimeout(t)
        reject(...args)
      }
    })
    t = setTimeout(() => {
      rejected = true
      const e = new Error('Promise timeout!')
      e.name = 'timeout'
      reject(e)
    }, timeout)
  })
}

// url
/* eslint-disable */
export function getUrlParam(par) {
    // 获取当前URL
  var local_url = document.location.href
    // 获取要取得的get参数位置
  var get = local_url.indexOf(par + '=')
  if (get == -1) {
    return false
  }
    // 截取字符串
  var get_par = local_url.slice(par.length + get + 1)
    // 判断截取后的字符串是否还有其他get参数
  var nextPar = get_par.indexOf('&')
  if (nextPar != -1) {
    get_par = get_par.slice(0, nextPar)
  }
  return get_par
}
/* eslint-enable */
// dom
export function uniqueId (prefix = 'id_') {
  const id = prefix + strRand()
  if (!store.uniqueId) store.uniqueId = {}
  const generatedIds = store.uniqueId
  if (document.getElementById(id) || generatedIds[id]) {
    return uniqueId(prefix)
  } else {
    generatedIds[id] = true
    return id
  }
}
export function isDescendantOf (el, parent) {
  while (true) {
    if (el.parentElement == null) {
      return false
    } else if (el.parentElement === parent) {
      return true
    } else {
      el = el.parentElement
    }
  }
}

export function removeEl(el) {
  if (el.parentNode !== null) {
    return el.parentNode.removeChild(el)
  }
}

// refer: https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
export function getScroll(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers except IE before #9
        return {
          top: pageYOffset,
          left: pageXOffset,
        };
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return {
          top: D.scrollTop,
          left: D.scrollLeft,
        };
    }
}
// refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1
export function getOffset(el) {
  const rect = el.getBoundingClientRect()
  const scroll = getScroll()

	return {
		x: rect.left + scroll.left,
    y: rect.top + scroll.top,
	}
}

// there is some trap in el.offsetParent, so use this func to fix
export function getOffsetParent(el) {
  let offsetParent = el.offsetParent
  if(
    !offsetParent
    || offsetParent === document.body && getComputedStyle(document.body).position === 'static'
  ) {
    offsetParent = document.body.parentElement
  }
  return offsetParent
}
// get el current position. like jQuery.position
// the position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.
// 相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.
export function getPosition(el) {
  const offsetParent = getOffsetParent(el)
  const ps = {x: el.offsetLeft, y: el.offsetTop}
  let parent = el
  while (true) {
    parent = parent.parentElement
    if (parent === offsetParent || !parent) {
      break
    }
    ps.x -= parent.scrollLeft
    ps.y -= parent.scrollTop
  }
  return ps
}

// get position of a el if its offset is given. like jQuery.offset.
// 类似 jQuery.offset的设置功能, 但是它只返回计算的position, 不改变元素样式.
export function getPositionFromOffset(el, of) {
  const offsetParent = getOffsetParent(el)
  const parentOf = getOffset(offsetParent)
  return {
    x: of.x - parentOf.x,
    y: of.y - parentOf.y,
  }
}

export function findParent(el, callback) {
  return doFindParent(el, callback)
  function doFindParent(el, callback) {
    if (el.parentElement) {
      if (callback(el.parentElement)) {
        return el.parentElement
      } else {
        return doFindParent(el.parentElement, callback)
      }
    }
  }
}
export function backupAttr(el, name) {
  const key = `original_${name}`
  el[key] = el.getAttribute(name)
}

export function restoreAttr(el, name) {
  const key = `original_${name}`
  el.setAttribute(name, el[key])
}

// source: http://youmightnotneedjquery.com/
export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
  }
}

// source: http://youmightnotneedjquery.com/
export function addClass(el, className) {
  if (!hasClass(el, className)) {
    if (el.classList)
    { el.classList.add(className) }
    else
    { el.className += ' ' + className }
  }
}
// source: http://youmightnotneedjquery.com/
export function removeClass(el, className) {
  if (el.classList)
  { el.classList.remove(className) }
  else
  { el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ') }
}
export function getElSize(el) {
  const originDisplay = el.style.display
  el.style.display = 'block'
  const size = {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
  el.style.display = originDisplay
  return size
}
/**
 * [isOffsetInEl]
 * @param {Number} x
 * @param {Number} y
 * @param {Object} el HTML Element
 */
export function isOffsetInEl(x, y, el) {
  const offset = getOffset(el)
  return offset.x <= x && offset.x + el.offsetWidth >= x && offset.y <= y && offset.y + el.offsetHeight >= y
}
// get border
export function getBorder(el) {
  const body = document.body
  const workArea = findParent(el, v => hasClass(v, 'work-area'))
  const of = getOffset(workArea)
  return {
    left: of.x,
    right: of.x + workArea.offsetWidth,
    top: of.y + 50,
    bottom: body.offsetHeight < glb().innerHeight ? glb().innerHeight : body.offsetHeight
  }
}
export function setElChildByIndex(el, index, child) {
  child.childComponentIndex = index
  const len = el.childNodes.length
  if (len === 0) {
    el.appendChild(child)
  } else if (index === 0) {
    el.insertBefore(child, el.childNodes[0])
  } else {
    const {index: nearestIndex, value: nearest, bigger} = binarySearch(el.childNodes, el => {
      return el.childComponentIndex - index
    }, 0, max(index, len - 1), true)
    if (bigger) {
      el.insertBefore(child, nearest)
    } else {
      const next = el.childNodes[nearestIndex + 1]
      if (next) {
        el.insertBefore(child, next)
      } else {
        el.appendChild(child)
      }
    }
  }
}
// from https://blog.csdn.net/qq_30100043/article/details/74719534
export function getCss3Prefix(opt = {}) {
  if (opt.noCache || store.css3Prefix == null) {
    store.css3Prefix = reget()
  }
  return store.css3Prefix
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
}
// dom event
export function onDOM(el, name, handler, ...args) {
  if (el.addEventListener) { // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.addEventListener(name, handler, ...args)
  } else if (el.attachEvent) { // IE 8 及更早 IE 版本
    el.attachEvent(`on${name}`, handler, ...args)
  }
}
export function offDOM(el, name, handler, ...args) {
  if (el.removeEventListener) { // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.removeEventListener(name, handler, ...args)
  } else if (el.detachEvent) { // IE 8 及更早 IE 版本
    el.detachEvent(`on${name}`, handler, ...args)
  }
}
export function onDOMMany(els, names, handler, ...args) {
  els = toArrayIfNot(els)
  names = toArrayIfNot(names)
  for (const el of els) {
    for (const name of names) {
      onDOM(el, name, handler, ...args)
    }
  }
  const destroy = () => {
    for (const el of els) {
      for (const name of names) {
        offDOM(el, name, handler)
      }
    }
  }
  return destroy
}
// advance
// binarySearch 二分查找
export function binarySearch(arr, callback, start, end, returnNearestIfNoHit, max = 1000) {
  let midNum
  let mid
  if (start == null) {
    start = 0
    end = arr.length - 1
  }
  let i = 0
  let r
  while (start >= 0 && start <= end) {
    if (i >= max) {
      throw Error(`binarySearch: loop times is over ${max}, you can increase the limit.`)
    }
    midNum = Math.floor((end - start) / 2 + start)
    mid = arr[midNum]
    r = callback(mid, i)
    if (r > 0) {
      end = midNum - 1
    } else if (r < 0) {
      start = midNum + 1
    } else {
      return { index: midNum, value: mid, count: i + 1, hit: true }
    }
    i++
  }
  return returnNearestIfNoHit ? { index: midNum, value: mid, count: i + 1, hit: false, bigger: r > 0 } : null
}
//
export function windowLoaded() {
  return new Promise(function(resolve, reject) {
    if (document && document.readyState === 'complete') {
      resolve()
    } else {
      glb().addEventListener('load', function once() {
        resolve()
        glb().removeEventListener('load', once)
      })
    }
  })
}

export function waitTime(milliseconds, callback) {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      callback && callback()
      resolve()
    }, milliseconds)
  })
}

// overload waitFor(condition, time = 100, maxCount = 1000))
export function waitFor(name, condition, time = 100, maxCount = 1000) {
  if (isFunction(name)) {
    maxCount = time
    time = isNumeric(condition) ? condition : 100
    condition = name
    name = null
  }
  if (!store.waitFor) store.waitFor = {}
  const waits = store.waitFor
  if (name && isset(waits[name])) {
    glb().clearInterval(waits[name])
    delete waits[name]
  }
  return new Promise(function(resolve, reject) {
    let count = 0
    function judge(interval) {
      if (count <= maxCount) {
        if (condition()) {
          stop(interval, name)
          resolve()
        }
      } else {
        stop(interval, name)
        reject(new Error('waitFor: Limit is reached'))
      }
      count++
    }
    function stop(interval, name) {
      if (interval) {
        if (name && isset(waits[name])) {
          glb().clearInterval(waits[name])
          delete waits[name]
        } else {
          glb().clearInterval(interval)
        }
      }
    }
    const interval = glb().setInterval(function () {
      judge(interval)
    }, time)
    if (name) {
      waits[name] = interval
    }
    judge()
  })
}

export function retry(func, limitTimes = 3) {
  if (!store.retry) store.retry = {}
  const counters = retry
  const name = generateName()
  counters[name] = 0
  return doFunc
  function doFunc(arg1, arg2, arg3) {
    return func(arg1, arg2, arg3).then((data) => {
      delete counters[name]
      return data
    }).catch((e) => {
      counters[name]++
      if (counters[name] >= limitTimes) {
        delete counters[name]
        return Promise.reject(e)
      } else {
        return doFunc(arg1, arg2, arg3)
      }
    })
  }
  function generateName() {
    const name = Math.random() + ''
    if (counters[name]) {
      return generateName()
    } else {
      return name
    }
  }
}
// 复制文字到剪贴板
export function copyTextToClipboard(text) {
  try {
    // use latest api
    navigator.clipboard.writeText(text)
    return
  } catch (e) {}
  var textArea = document.createElement('textarea')

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
  textArea.style.position = 'fixed'
  textArea.style.top = 0
  textArea.style.left = 0

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em'
  textArea.style.height = '2em'

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0

  // Clean up any borders.
  textArea.style.border = 'none'
  textArea.style.outline = 'none'
  textArea.style.boxShadow = 'none'

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent'

  textArea.value = text

  document.body.appendChild(textArea)

  textArea.select()

  try {
    var successful = document.execCommand('copy')
    var msg = successful ? 'successful' : 'unsuccessful'
    console.log('Copying text command was ' + msg)
  } catch (err) {
    console.log('Oops, unable to copy')
  }

  document.body.removeChild(textArea)
}

// jquery
export function jqFixedSize(sel) {
  const $ = glb().jQuery
  $(sel).each(function () {
    const t = $(this)
    t.css({
      width: t.width() + 'px',
      height: t.height() + 'px',
    })
  })
}
export function jqMakeCarousel(wrapperSel, listSel, itemSel, speed = 1000, space = 16, dir = 'left', top = 0) {
  if (space.toString().match(/^\d+$/)) {
    space = space + 'px'
  }
  const spaceNumber = parseFloat(space)
  const $ = glb().jQuery
  const wrapper = $(wrapperSel)
  const list = wrapper.find(listSel)
  wrapper.css({
    position: 'relative',
    height: wrapper.height() + 'px',
  })
  const items0 = list.find(itemSel)
  items0.css({
    margin: '0',
    marginRight: space
  })
  const width = (Math.ceil(items0.width()) + spaceNumber) * items0.length
  list.css({
    position: 'absolute',
    margin: '0',
    width: width + 'px',
  })
  const height = list.height()
  const list2 = list.clone()
  const list3 = list.clone()
  list.css({
    left: 0,
  })
  list2.css({
    left: width + 'px',
  })
  list3.css({
    left: width * 2 + 'px',
  })
  const lists = $('<div></div>')
  lists.css({
    position: 'absolute',
    width: width * 3 + 'px',
    height: height + 'px',
    left: 0,
    top,
  })
  lists.append(list).append(list2).append(list3)
  wrapper.append(lists)
  let left = 0
  function animateLoop() {
    if (dir === 'left') {
      left -= 100
    } else {
      left += 100
    }
    lists.animate({
      left: `${left}px`,
    }, speed, 'linear', () => {
      if (Math.abs(left) > width) {
        if (dir === 'left') {
          left += width
        } else {
          left -= width
        }
        lists.css({
          left: left + 'px'
        })
      }
      animateLoop()
    })
  }
  animateLoop()
}
// https://developer.mozilla.org/docs/Web/API/Window/open
// http://www.w3school.com.cn/htmldom/met_win_open.asp#windowfeatures
export function openWindow(url, name, opt = {})
{
  glb().open(url, name, Object.keys(opt).map(k => `${k}=${opt[k]}`).join(','));
}

export function openCenterWindow(url, name, width, height, opt = {})
{
  const t = {
    width,
    height,
    top: (glb().screen.availHeight-30-height) / 2,
    left: (glb().screen.availWidth-30-width) / 2,
  }
  Object.assign(t, opt)
  openWindow(url, name, t)
}
export class URLHelper {
  baseUrl = ''; // protocol, hostname, port, pastname
  search = {};
  constructor(baseUrl) {
    let t = decodeURI(baseUrl).split('?')
    this.baseUrl = t[0]
    if (t[1]) {
      t[1].split('&').forEach(v => {
        let t2 = v.split('=')
        this.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1])
      })
    }
  }
  getHref() {
    const t = [this.baseUrl]
    let searchStr = Object.keys(this.search).map(k => `${k}=${encodeURIComponent(this.search[k])}`).join('&')
    if (searchStr) {
      t.push(searchStr)
    }
    return t.join('?')
  }
}

// 解析函数参数, 帮助重载
// types eg: ['Object', (i) => i > 3, ['Number', default], null ]
// null represent all types of argument
export function resolveArgsByType(args, types) {
  let argIndex = 0
  return types.map(v => {
    // make rule
    let rule, dft
    if (isArray(v)) {
      rule = v[0]
      dft = v[1]
    } else {
      rule = v
      dft = undefined
    }
    if (!isFunction(rule)) {
      if (rule == null) {
        rule = () => true
      } else {
        const t = rule
        rule = x => Object.prototype.toString.call(x) === `[object ${t}]`
      }
    }
    const arg = args[argIndex]
    if (rule(arg)) {
      argIndex++
      return arg
    } else {
      return dft
    }
  })
}

// set null can remove a item
export function makeStorageHelper(storage) {
  return {
    storage,
    set(name, value, minutes) {
      if (value == null) {
        this.storage.removeItem(name)
      } else {
        this.storage.setItem(name, JSON.stringify({
          value,
          expired_at: minutes ? new Date().getTime() + minutes * 60 * 1000 : null,
        }))
      }
    },
    get(name) {
      let t = this.storage.getItem(name)
      if (t) {
        t = JSON.parse(t)
        if (!t.expired_at || t.expired_at > new Date().getTime()) {
          return t.value
        } else {
          this.storage.removeItem(name)
        }
      }
      return null
    },
    clear() {
      this.storage.clear()
    },
  }
}
export function getLocalStorage2() {
  if (!store.localStorage2) {
    store.localStorage2 = makeStorageHelper(glb().localStorage)
  }
  return store.localStorage2
}
export function getSessionStorage2() {
  if (!store.sessionStorage2) {
    store.sessionStorage2 = makeStorageHelper(glb().sessionStorage)
  }
  return store.sessionStorage2
}
// 事件处理
export class EventProcessor {
  eventStore = [];
  on(name, handler) {
    this.eventStore.push({ name, handler })
  }
  once(name, handler) {
    const off = () => {
      this.off(name, wrappedHandler)
    }
    const wrappedHandler = () => {
      handler()
      off()
    }
    this.on(name, wrappedHandler)
    return off
  }
  off(name, handler) {
    const indexes = [] // to remove indexes; reverse; 倒序的
    const len = this.eventStore.length
    for (let i = 0; i < len; i++) {
      const item = this.eventStore[i]
      if (item.name === name && item.handler === handler) {
        indexes.unshift(i)
      }
    }
    for (const index of indexes) {
      this.eventStore.splice(index, 1)
    }
  }
  emit(name, ...args) {
    // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
    const items = []
    for (const item of this.eventStore) {
      if (item.name === name) {
        items.push(item)
      }
    }
    for (const item of items) {
      item.handler(...args)
    }
  }
}

export class CrossWindow extends EventProcessor{
  storageName = '_crossWindow';
  constructor() {
     super()
     const cls = CrossWindow
     if (!cls._listen) {
       cls._listen = true
       onDOM(window, 'storage', (ev) => {
         if (ev.key === this.storageName) {
           const event = JSON.parse(ev.newValue)
           super.emit(event.name, ...event.args)
         }
       })
     }
  }
  emit(name, ...args) {
     super.emit(name, ...args)
     glb().localStorage.setItem(this.storageName, JSON.stringify({
       name,
       args,
       // use random make storage event triggered every time
       // 加入随机保证触发storage事件
       random: Math.random(),
     }))
  }
}
