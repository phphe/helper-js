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
  const num = parseFloat(v)
  return !isNaN(num) && isNumber(num)
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
// str 字符
export function studlyCase (str) {
  return str && (str[0].toUpperCase() + str.substr(1))
}
export function snakeCase (str) {
  return str
  .replace(/ /g, '-')
  .replace(/_/g, '-')
  .replace(/([^A-Z])([A-Z])/g, '$1-$2')
  .replace(/--+/g, '-')
  .replace(/^-|-$|/g, '')
  .toLowerCase()
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
  const index = arr.indexOf(v)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
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
// source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
export function objectGet(obj, path) {
  const paths = path.split('.')
  let current = obj

  for (let i = 0; i < paths.length; i++) {
    if (current[paths[i]] === undefined) {
      return undefined
    } else {
      current = current[paths[i]]
    }
  }
  return current
}
// source http://stackoverflow.com/questions/10253307/setting-a-depth-in-an-object-literal-by-a-string-of-dot-notation
export function objectSet(obj, path, value) {
  const tags = path.split('.')
  const len = tags.length - 1
  for (var i = 0; i < len; i++) {
    if (obj[tags[i]] == null) {
      obj[tags[i]] = {}
    }
    obj = obj[tags[i]]
  }
  obj[tags[len]] = value
}
export function unset(obj, prop) {
  obj[prop] = undefined
  try {
    delete obj[prop]
  } catch (e) {}
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
const _generatedIds = []
export function uniqueId (prefix = 'id_') {
  const id = prefix + strRand()
  if (document.getElementById(id) || _generatedIds.includes(id)) {
    return uniqueId(prefix)
  } else {
    _generatedIds.push(id)
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
export function getOffset(el) {
  return doGetOffset(el)
  function doGetOffset(el) {
    var elOffset = {
      x: el.offsetLeft,
      y: el.offsetTop
    }
    var parentOffset = {x: 0, y: 0}
    if (el.offsetParent != null) parentOffset = doGetOffset(el.offsetParent)
    return {
      x: elOffset.x + parentOffset.x,
      y: elOffset.y + parentOffset.y
    }
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
export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
  }
}
export function addClass(el, className) {
  if (!hasClass(el, className)) {
    if (el.classList)
      { el.classList.add(className) }
    else
    { el.className += ' ' + className }
  }
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
    bottom: body.offsetHeight < window.innerHeight ? window.innerHeight : body.offsetHeight
  }
}
// advance
// binarySearch 二分查找
export function binarySearch(arr, callback, max = 1000) {
  var midNum
  var mid
  var start = 0
  var end = arr.length - 1
  var i = 0
  while (start >= 0 && start <= end) {
    if (i >= max) {
      throw Error(`binarySearch: loop times is over ${max}, you can increase the limit.`)
    }
    midNum = Math.floor((end - start) / 2 + start)
    mid = arr[midNum]
    const r = callback(mid, arr, i)
    if (r < 0) {
      end = midNum - 1
    } else if (r > 0) {
      start = midNum + 1
    } else {
      return mid
    }
    i++
  }
  return null
}
//
export function windowLoaded() {
  return new Promise(function(resolve, reject) {
    if (document && document.readyState === 'complete') {
      resolve()
    } else {
      window.addEventListener('load', function once() {
        resolve()
        window.removeEventListener('load', once)
      })
    }
  })
}
export const storeOfWaitFor = {}
// overload waitFor(condition, time = 100, maxCount = 1000))
export function waitFor(name, condition, time = 100, maxCount = 1000) {
  if (isFunction(name)) {
    maxCount = time
    time = isNumeric(condition) ? condition : 100
    condition = name
    name = null
  }
  const waits = storeOfWaitFor
  if (name && isset(waits[name])) {
    window.clearInterval(waits[name])
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
          window.clearInterval(waits[name])
          delete waits[name]
        } else {
          window.clearInterval(interval)
        }
      }
    }
    const interval = window.setInterval(function () {
      judge(interval)
    }, time)
    if (name) {
      waits[name] = interval
    }
    judge()
  })
}
