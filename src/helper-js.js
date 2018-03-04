// local store
export const store = {}
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
export function toArrayIfNot(arrOrNot) {
  return isArray(arrOrNot) ? arrOrNot : [arrOrNot]
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
export function objectGet(obj, path, defaultValue = null) {
  const paths = path.split('.')
  let current = obj
  let parent = null

  for (let i = 0; i < paths.length; i++) {
    if (current[paths[i]] == null) {
      return defaultValue
    } else {
      parent = current
      current = current[paths[i]]
    }
  }

  const lastPath = arrayLast(paths)
  return parent.hasOwnProperty(lastPath) ? current : defaultValue
}

export function objectSet(obj, path, value) {
  const lastDotIndex = path.lastIndexOf('.')
  let parent, lastKey
  if (lastDotIndex === -1) {
    parent = obj
    lastKey = path
  } else {
    parent = objectGet(obj, path.substring(0, lastDotIndex))
    lastKey = path.substr(lastDotIndex + 1)
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
// function
export function executeWithCount(func, context) {
  let count = 0
  return (...args) => {
    args.unshift(count++)
    return func.apply(context, args)
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

export function getOffsetWithoutScroll(el) {
  var elOffset = {
    x: el.offsetLeft,
    y: el.offsetTop
  }
  var parentOffset = {x: 0, y: 0}
  if (el.offsetParent != null) parentOffset = getOffsetWithoutScroll(el.offsetParent)
  return {
    x: elOffset.x + parentOffset.x,
    y: elOffset.y + parentOffset.y
  }
}

export function getOffset(el) {
  const offfset = getOffsetWithoutScroll(el)
  let el2 = el
  const body = document.body
  while (el2 && el2 !== body) {
    offfset.x -= el2.scrollLeft
    offfset.y -= el2.scrollTop
    el2 = el2.parentElement
  }
  return offfset
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
    bottom: body.offsetHeight < window.innerHeight ? window.innerHeight : body.offsetHeight
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
// dom event
export function onDOM(el, name, handler) {
  if (el.addEventListener) { // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.addEventListener(name, handler)
  } else if (el.attachEvent) { // IE 8 及更早 IE 版本
    el.attachEvent(`on${name}`, handler)
  }
}
export function offDOM(el, name, handler) {
  if (el.removeEventListener) { // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.removeEventListener(name, handler)
  } else if (el.detachEvent) { // IE 8 及更早 IE 版本
    el.detachEvent(`on${name}`, handler)
  }
}
// advance
// binarySearch 二分查找
export function binarySearch(arr, callback, start, end, returnNearestIfNoHit, max = 1000) {
  var midNum
  var mid
  if (start == null) {
    start = 0
    end = arr.length - 1
  }
  var i = 0
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
      window.addEventListener('load', function once() {
        resolve()
        window.removeEventListener('load', once)
      })
    }
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
  const $ = window.jQuery
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
  const $ = window.jQuery
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
