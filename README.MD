# helper-js
js functions, just import needed functions.   
js 方法库, 按需使用   

```sh
// install
npm install helper-js -S
```
### usage 使用
```
import {function1, function2} from'helper-js

```
### some functions. pls check source to get more 常用方法, 请查看源码获取更多方法
###### glb()   // get global cross environment
###### isset   
typeof v !== 'undefined'
###### isArray   
Object.prototype.toString.call(v) === '[object Array]'
###### isBool   
###### isNumber   
###### isNumeric   
###### isString   
###### isObject   
###### isFunction   
###### isPromise   
###### numRand   (min, max) // get a rand integer, include min and max
###### numPad(num, n)
(10, 3) => '010', (2, 4) => '0002'
###### min(n, min)
(1, 10) => 10, (11, 10) => 11
###### max(n, max)
(1, 10) => 1, (11, 10) => 10
###### studlyCase
hello => Hello
###### kebabCase   
helloWorld nice => hello-world-nice
###### snakeCase
helloWorld nice => hello_world_nice
###### camelCase   
helloWorld nice => helloWorldNice
###### camelToWords   
helloWorldNice => hello World nice
###### titleCase   
helloWorldNice => Hello World Nice
###### strRand   (len = 8, prefix = '')
###### replaceMultiple (mapObj, str)
({'1': '2', '3': '4'}, 'abcd1234') => 'abcd2244'
###### arrayRemove   (arr, item) // remove any === item
###### newArrayRemoveAt   (arr, index/indexes) // remove by index or indexes, return new array
###### arrayAt(n)   // n can less than 0  
###### arrayFirst   
###### arrayLast(arr)   
###### arrayDiff  (arr1, arr2) // return items in arr2 but not in arr1
###### arraySibling  (arr, item, Number/Array offset) // return sibling or siblings relative to item
###### toArrayIfNot   
###### splitArray(arr, n) // n can be getter(number of times); n可以是方法, 参数1是第几次分块
###### groupArray(arr, getMark)
###### arrayDistinct(arr)
###### assignIfDifferent(obj, key, val)   
###### objectMerge (obj1, obj2) // merge obj2 to obj1, and merge obj2 chldren to obj1 if it is object
###### objectMap   (obj, func)
###### objectOnly   (obj, keys) // return new object
###### objectExcept   (obj, keys) // return new object
###### forAll(val, handler) // loop array, object or integer, return false in handler can break loop
handler(item, index/key)
###### objectGet   (obj, path, throwError = false) // get by dot path
({a:{b:1}}, 'a.b') => 1
###### objectSet   (obj, path, value)
###### unset (obj, prop)
###### cloneObj  (obj, exclude) // can clone one-level object. exclude: array or function
###### mapObjectTree(obj, handler, limit=10000) // can clone whole object tree, can traverse every node, can exclude nodes
```
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
```
###### mapObjects(arr, idKey) // idKey can be function which return a key
```
idKey(item, i)
eg: mapObjects([{id: 1}, {id:2}], 'id') -> {'1':{id:1},'2':{id:2}}
eg: mapObjects([{id: 1}, {id:2}], (item, i) => item.id + 100 ) -> {'101':{id:1},'102':{id:2}}
```
###### pairRows(rows1, rows2, key1, key2 = key1)
###### executeWithCount (func, context = null) // wrap function, the first arg of func is excuted count
###### watchChange   (getVal, handler) // wrap getter function, when use getter to get value, it will check value if changed
###### executeOnceInScopeByName   (name, action, scope = store_executeOnceInScopeByName, storeResult)
###### debounce(action, wait = 0, opt = {}) // return newAction, newAction's scope is same with action, its arguments will be passed to action. newAction.stop: function, to stop timeout
```js
opt: {
  immediate: false,
}
```
###### debounceTrailing(action, wait = 0)
###### debounceImmediate(action, wait = 0)
###### joinMethods(methods, mode = 'value') // mode: value, pipline
###### executePromiseGetters(getters, concurrent = 1) // return {promise, destroy}
###### promiseTimeout(promise, timeout) // timeout unit is millisecond. return a new promise, which throw error named 'timeout' if timeout
###### getUrlParam   // get current url param by name
##3 DOM
###### uniqueId  (prefix = 'id_') // html element id
###### isDescendantOf (el, parent)  // if el === parent or is descendant of parent
###### removeEl (el)
###### getScroll // return {left, top}
###### getOffset(el) // offset is relative to top element, return {x, y}   
###### getOffsetParent (el) // there is some trap in el.offsetParent, so use this func to fix
###### getPosition (el) // get el current position. like jQuery.position
###### getPositionFromOffset (el, offset) // get position of a el if its offset is given. like jQuery.offset.
###### findParent (el, callback)
###### backupAttr   (el, name)
###### restoreAttr   (el, name)
###### hasClass   (el, className)
###### addClass   (el, className)
###### removeClass   (el, className)
###### getElSize   (el)
###### isOffsetInEl   (x, y, el)
###### getBorder   (el) // return {left, top, right, bottom}
###### setElChildByIndex  
###### getCss3Prefix(opt) // return -webkit-, -moz-, -o-, -ms-, ''
```js
opt: {
  noCache: false,
}
```
###### onDOM (el, name, handler, ...args)   // addEventListener
###### offDOM (el, name, handler, ...args)   // removeEventListener
###### onDOMMany(els, names, handler, ...args)   // return destroy
###### binarySearch   (arr, callback, start, end, returnNearestIfNoHit, max = 1000) // binary search 二分查找
###### windowLoaded   // return a promise
###### waitTime(milliseconds, [callback: optional]) // return a promise
###### waitFor   (name, condition, time = 100, maxCount = 1000)
###### retry   (func, limitTimes = 3)
###### copyTextToClipboard   (text) // tested in chrome
### jquery
###### jqFixedSize   
###### jqMakeCarousel
###### openWindow(url, name, opt = {})
###### openCenterWindow(url, name, width, height, opt = {})
###### class URLHelper // now just for generate url
##### [recommend]resolveArgsByType(args, types) // for function overload
```
types eg: ['Object', (i) => i > 3, ['Number', default] ]
resolveArgsByType([1,'str'], ['Number', 'Boolean' ,'String']) -> [1, null, 'str']
resolveArgsByType([1,'str'], ['Number', ['Boolean', true] ,'String']) -> [1, true, 'str']
check source code to learn more
```
###### makeStorageHelper(storage) // make localStorage or sessionStorage can use json as value and has expiry
###### getLocalStorage2 //
###### getSessionStorage2 //
###### class EventProcessor
###### class CrossWindow // cross window(same domain) event processor
