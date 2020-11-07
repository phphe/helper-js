// ## base functions
// ## 基础方法

// local store. store some info for some functions there.
// 为此库有需要的方法存储信息
// @ts-ignore
export const store:Store = {uniqueId: {}}
interface Store{
  glb: Window
  uniqueId: {[id:string]:true}
  localStorage2?: ReturnType<typeof makeStorageHelper>
  sessionStorage2?: ReturnType<typeof makeStorageHelper>
}
// get global, such as window in browser.
// 返回顶级全局变量. 例如浏览器的`window`
export function glb():Window {
  // `this` !== global or window because of build tool. So you can't use `this` to get `global`
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

// detect if global variable `document` existing.
// 判断全局变量`document`是否存在
export function isDocumentExisted() {
  try {
    let t = document
  } catch (e) {
    return false
  }
  return true
}

export function isArray (v): v is any[] {
  return Object.prototype.toString.call(v) === '[object Array]'
}
export function isBool (v): v is boolean {
  return Object.prototype.toString.call(v) === '[object Boolean]'
}
export function isNumber (v): v is number {
  return Object.prototype.toString.call(v) === '[object Number]'
}
export function isNumeric (v) {
  return isFinite(v) && !isNaN(parseFloat(v))
}
export function isString (v): v is string {
  return Object.prototype.toString.call(v) === '[object String]'
}
export function isObject (v): v is object {
  return Object.prototype.toString.call(v) === '[object Object]'
}
export function isFunction (v): v is Function {
  return typeof v === 'function'
}
export function isPromise (v): v is Promise<any> {
  return Object.prototype.toString.call(v) === '[object Promise]'
}
// detect if argumrnt is null, undefined, empty array, empty string, false, NaN, empty object
// 检查是否是null, undefined, 空数组, 空字符串, false, NaN, 空对象
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

// rand int in range, including min and max
// 返回指定范围随机整数, 包括范围起始值和终止值
export function randInt(min:number, max:number){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// rand item in array
// 返回数组随机一项
export function randChoice (arr: string|any[]) {
  return arr[randInt(0, arr.length - 1)]
}

// Pad a string to a certain length with another string
// 左边补充指定字符, 使其达到指定长度
export function strPad(str:number|string, n:number, padString = '0') {
  let r = str.toString()
  let len = str.toString().length
  while (len < n) {
    r = padString + r
    len++
  }
  if (r.length > n) {
    r = r.substr(r.length - n)
  }
  return str
}

// If n less than `min`, return `min`, else n.
// 如果n小于min, 返回min, 否则n.
export function notLessThan(n:number, min:number) {
  return n < min ? min : n
}

// If n greater than `max`, return `max`, else n.
// 如果n大于max, 返回max, 否则n.
export function notGreaterThan (n:number, max:number) {
  return n < max ? n : max
}

// ## string
// ## 字符串

// 'abc abc' to 'Abc abc'
export function studlyCase (str:string) {
  return str && (str[0].toUpperCase() + str.substr(1))
}

// To lower case and use `-` as delimiter. example: '-ABC abc_def camelCase-- helloMyFriend' to 'a-b-c-abc-def-camel-case-hello-my-friend'
export function kebabCase(str:string) {
  return str
    .replace(/ /g, '-')
    .replace(/_/g, '-')
    .replace(/([A-Z])/g, '-$1')
    .replace(/--+/g, '-')
    .replace(/^-|-$|/g, '')
    .toLowerCase()
}

// To lower case and use `_` as delimiter.
export function snakeCase (str:string) {
  return kebabCase(str).replace(/-/g, '_')
}

// 'abc-abc-abc_abc' to 'AbcAbcAbcAbc'
export function camelCase (str:string) {
  const temp = str.toString().split(/[-_]/)
  for (let i = 1; i < temp.length; i++) {
    temp[i] = studlyCase(temp[i])
  }
  return temp.join('')
}

// 'AbcAbcAbcAbc' to ['Abc', 'Abc', 'Abc', 'Abc']
export function camelToWords (str:string) {
  return str.toString().trim().split(/(?=[A-Z])/)
}

// 'abcAbc' to 'Abc Abc'
export function titleCase (str:string) {
  return camelToWords(studlyCase(camelCase(str))).join(' ').replace(/\bid\b/ig, 'ID')
}


// generate random string
// 随机字符串
export function randString (len = 8, seeds:string|string[]='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
  let r = ''
  for (let i = 0; i < len; i++) {
    r += randChoice(seeds)
  }
  return r
}

// ## Array
// ## 数组

// remove item from array. return removed count
// 从数组删除项. 返回删除计数
export function arrayRemove(arr:any[], v:any) {
  let index
  let count = 0
  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1)
    count++
  }
  return count
}

// remove items from array by sorted indexes. indexes example: [0, 2, 6, 8, 9]
// 通过有序的索引集删除数组项. 索引集例子: [0, 2, 6, 8, 9]
export function arrayRemoveBySortedIndexes(arr:any[], sortedIndexes:number[]) {
  for (let i = sortedIndexes.length - 1; i >= 0; i--) {
    const index = sortedIndexes[i]
    arr.splice(index, 1)
  }
}

// return new array excluding indexes
// 返回新数组除了给定索引
export function newArrayExcludingIndexes(arr:any[], indexes:number[]) {
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

// get item from array by index. index can be negative number
// 通过所以获取数组一项. 支持负值索引.
export function arrayAt(arr:any[], n:number) {
  return arr[n >= 0 ? n : (arr.length + n)]
}

// get first or array
// 返回数组首项
export function arrayFirst(arr:any[]) {
  return arr[0]
}

// get last of array
// 返回数组末项
export function arrayLast(arr: any[]) {
  return arr[arr.length - 1]
}

// return arr1 - arr2
export function arraySubtract(arr1: any[], arr2: any[]) {
  var len = arr1.length
  var arr = []
  while (len--) {
    if (arr2.indexOf(arr1[len]) < 0) {
      arr.push(arr1[len])
    }
  }
  return arr
}

// get array item sibling. Example: getArrayItemSibling(arr, item, -1), get previous sibling
// 获得数组项的一个同级. 例: getArrayItemSibling(arr, item, -1), 获得前一个
export function getArrayItemSibling(arr:any[], item:any, offset:number) {
  return getArrayItemSiblings(arr, item, [offset])[0]
}

// get array item siblings. Example: getArrayItemSiblings(arr, item, [-1, 1]), get previous and next sibling
// 获得数组项的多个同级. 例: getArrayItemSiblings(arr, item, [-1, 1]), 获得前一个和后一个
export function getArrayItemSiblings(arr:any[], item:any, offsets:number[]) {
  const index = arr.indexOf(item)
  if (index === -1) {
    throw 'item is not in array'
  }
  return offsets.map(v => arr[index + v])
}

export function toArrayIfNot<T>(arrOrNot:T): T|T[] {
  return isArray(arrOrNot) ? arrOrNot : [arrOrNot]
}

// Split array every n. n can be getter, which argument is the times.
// 每n个拆分数组. n可以是方法, 参数是第几次分块
type Arg_n_function_splitArray = (times:number)=>number
export function splitArray(arr:any[], n:number|Arg_n_function_splitArray) {
  const r = []
  if (isFunction(n)) {
    const getChunkLength = n as Arg_n_function_splitArray
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
      const end = i + <number>n
      r.push(arr.slice(i, end))
      i = end
    }
  }
  return r
}

// Compute mark of each item, and group them by mark.
// 计算每项的标识, 通过标识将数组项分组.
export function groupArray(arr:any[], getMark:(item:any)=>any) {
  const groups = new Map
  arr.forEach(v => {
    const mark = getMark(v)
    if (!groups.has(mark)) {
      groups.set(mark, [])
    }
    groups.get(mark).push(v)
  })
  return groups
}

// Each item in the new array is unique.
// 新数组每项唯一.
export function arrayDistinct(arr:any[]) {
  // @ts-ignore
  if (glb().Set) {
    return [...new Set(arr)]
  } else {
    return arr.filter((v, i, a) => a.indexOf(v) === i)
  }
}

// get items from array by range. range can be negative
// 从数组获得一个范围内的项. 范围可以为负.
export function arrayGetRange(arr:any[], index:number, endIndex:number) {
  if (index < 0) {
    index += arr.length
  }
  if (endIndex == null) {
    return arr[index]
  } else {
    if (endIndex < 0) {
      endIndex += arr.length
    }
    return arr.slice(index, endIndex - index + 1)
  }
}

// return new array excluding n items from end
// 返回新数组排除末尾n项
export function arrayWithoutEnd(arr:any[], n:number) {
  return arr.slice(0, arr.length - n)
}

// get one-dimensional array from multidimensional array
// 从多维数组获取一维数组
export function arrayFlat(arr:any[], depth=10) {
  const r = [];
  const rec = (arr, curentDepth) => {
    for (const item of arr) {
      if (isArray(item) && curentDepth < depth) {
        rec(item, curentDepth + 1)
      } else {
        r.push(item)
      }
    }
  }
  rec(arr, 0)
  return r
}

// ## Object
// ## 对象

export function assignIfDifferent(obj:object, key:string, val:any) {
  if (obj[key] !== val) {
    obj[key] = val
  }
}

// like Array.map
export function objectMap(obj:object, handler:(value:any, key:string, index: number)=>any):object {
  const r = {}
  let i = 0
  for (const key in obj) {
    r[key] = handler(obj[key], key, i)
    i++
  }
  return r
}

export function objectOnly(obj:object, keys:string[]):object {
  let keysSet = new Set(keys)
  const r = {}
  for (const key in obj) {
    if (keysSet.has(key)) {
      r[key] = obj[key]
    }
  }
  return r
}

export function objectExcept(obj:object, keys:string[]):object {
  let keysSet = new Set(keys)
  const r = {}
  for (const key in obj) {
    if (!keysSet.has(key)) {
      r[key] = obj[key]
    }
  }
  return r
}

// loop for Array, Object, NodeList, String
type iterateAll_Options = {
  reverse?: boolean
  exclude?: (info:{value:any, index:number}|{value:any, key:string}) => boolean
}
export function* iterateAll(val:string|any[]|object|NodeList, opt: iterateAll_Options = {}):Generator<{value:any, index?:number, key?:string}> {
  // opt: {reverse, exclude}
  if (!opt.reverse) {
    // @ts-ignore
    if (val.length != null) {
      // @ts-ignore
      for (let i = 0; i < val.length; i++) {
        const info = {value: val[i], index: i}
        if (!opt.exclude || !opt.exclude(info)) {
          yield info
        }
      }
    } else if (isObject(val)) {
      for (const key of Object.keys(val)) {
        const info = {value: val[key], key}
        if (!opt.exclude || !opt.exclude(info)) {
          yield info
        }
      }
    } else {
      throw 'Unsupported type'
    }
  } else {
    // @ts-ignore
    if (val.length != null) {
      // @ts-ignore
      for (let i = val.length - 1; i >= 0 ; i--) {
        const info = {value: val[i], index: i}
        if (!opt.exclude || !opt.exclude(info)) {
          yield info
        }
      }
    } else if (isObject(val)) {
      const keys = Object.keys(val)
      keys.reverse()
      for (const key of keys) {
        const info = {value: val[key], key}
        if (!opt.exclude || !opt.exclude(info)) {
          yield info
        }
      }
    } else {
      throw 'Unsupported type'
    }
  }
}

// example: objectGet(window, 'document.body.children.0') . source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
// 例: objectGet(window, 'document.body.children.0') . 参考: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
export function objectGet(obj:object, path:string|string[], throwError?:boolean): any {
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

// refer [objectGet](#objectGet)
export function objectSet(obj:object, path:string|string[], value:any) {
  const paths = isArray(path) ? path : path.split('.')
  const lastKey = arrayLast(paths)
  const parent = objectGet(obj, paths.slice(0, paths.length - 1))
  if (!parent) {
    throw "Path does not exist"
  }
  parent[lastKey] = value
}

// try delete obj[prop]
export function unset(obj:object, prop:string) {
  obj[prop] = undefined
  try {
    delete obj[prop]
  } catch (e) {}
}

export function objectAssignIfKeyNull(obj1:object, obj2:object) {
  Object.keys(obj2).forEach(key => {
    if (obj1[key] == null) {
      obj1[key] = obj2[key]
    }
  })
}

/*
walk object and change key, value, delete key. return cloned new object.
深度遍历对象, 可以改变key, value, 删除key. 返回克隆的新对象.

Arguments:
* handler:
  * return null: don't change anything
  * return {delete: true}: delete
  * return {key: newKey}: change key
  * return {value: newValue}: change value
  * return {skip: true}: skip children
  * return {stop: true}: stop
  * can return delete|((key|value)|(skip|stop))
* limit: to prevent circular reference.
 */
type mapObjectTree_Handler = (value:any, key:string|number, parent:object|any[], newParent:object|any[]) => void|null|undefined|{
  key?: string
  delete?: boolean
  value?: any
  skip?: boolean // skip children
  stop?: boolean
}
export function mapObjectTree(obj:object, handler:mapObjectTree_Handler, limit=10000):object {
  let r
  let count = 0
  const stack = [{value: obj}]
  while (stack.length > 0) {
    if (count >= limit) {
      throw `mapObjectTree: limit(${limit}) reached, object may has circular reference`
    }
    count++
    // @ts-ignore
    const {value, key, parent, newParent} = stack.shift()
    const t = handler(value, key, parent, newParent)
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
      // @ts-ignore
      newVal = assign(value, key)
    } else {
      const {key: key2, value} = t
      val = value
      // @ts-ignore
      if (t.delete || key2 === false) {
        // del
        toDelete = true
      } else if (key2 == null) {
        // don't change key
        newVal = assign(value, key, true)
      } else if(t.hasOwnProperty('value')) {
        // @ts-ignore
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
        // @ts-ignore
        stack.push({value: val[i], key: i, parent: val, newParent: newVal})
      }
    } else if (isObject(val)) {
      Object.keys(val).forEach(key => {
        // @ts-ignore
        stack.push({value: val[key], key, parent: val, newParent: newVal})
      })
    }
  }
  return r
}

// [{id: 1}, {id: 2}] to {'1':{id: 1}, '2': {id: 2}}
type mapObjects_idKey_function = (item:any, index: number) => string
export function mapObjects(arr:any[], idKey:string|mapObjects_idKey_function):object {
  const r = {}
  const len = arr.length
  for (let i = 0; i < len; i++) {
    const item = arr[i]
    // @ts-ignore
    const id = isFunction(idKey) ? idKey(item, i) : item[idKey]
    r[id] = item
  }
  return r
}

// example: pairRows(users, userProfiles, 'id', 'user_id')
export function pairRows(rows1:any[], rows2:any[], key1:string, key2:string=key1):[any, any][] {
  const map = mapObjects(rows2, key2)
  return rows1.map(row1 => [row1, map[row1[key1]]])
}

// walk tree data by with depth first search. tree data example: `[{children: [{}, {}]}]`
// 深度优先遍历树形数据. 树形数据示例: `[{children: [{}, {}]}]`
type TreeDataPath = number[]
type depthFirstSearch_Handler = (item:any, index:number, parent:null|any, path:TreeDataPath) => void|false|'skip children'|'skip siblings'
type depthFirstSearch_Options = {
  reverse?: boolean
}
export function depthFirstSearch(obj:object|any[], handler:depthFirstSearch_Handler, childrenKey = 'children', opt:depthFirstSearch_Options={}) {
  const rootChildren = isArray(obj) ? obj : [obj]
  //
  class StopException{}
  const func = (children, parent, parentPath) => {
    if (opt.reverse) {
      children = children.slice()
      children.reverse()
    }
    const len = children.length
    for (let i = 0; i < len; i++) {
      const item = children[i]
      const index = opt.reverse ? len - i - 1 : i
      const path = parentPath ? [...parentPath, index] : []
      const r = handler(item, index, parent, path)
      if (r === false) {
        // stop
        throw new StopException()
      } else if (r === 'skip children') {
        continue
      } else if (r === 'skip siblings') {
        break
      }
      if (item[childrenKey] != null) {
        func(item[childrenKey], item, path)
      }
    }
  }
  try {
    func(rootChildren, null, isArray(obj) ? [] : null)
  } catch (e) {
    if (e instanceof StopException) {
     // stop
  } else {
    throw e
  }
  }
}
// refer [depthFirstSearch](#depthFirstSearch)
export const walkTreeData = depthFirstSearch

// tree data helpers
export class TreeData<Node> {
  data: Node|Node[]
  childrenKey = 'children';
  // data = null;
  constructor(data:Node|Node[]=[]) {
    this.data = data
  }
  get rootChildren(): Node[] {
    const {childrenKey} = this
    const {data} = this
    return isArray(data) ? data : data[childrenKey]
  }
  * iteratePath(path:TreeDataPath, opt:{reverse?: boolean} = {}):IterableIterator<{path:TreeDataPath, node:Node}> {
    const {childrenKey , rootChildren} = this
    if (!opt.reverse) {
      let prevPath:number[] = []
      let prevNode
      let prevChildren = rootChildren
      for (const index of path) {
        const currentPath = [...prevPath, index]
        const currentNode = prevChildren[index]
        yield {path: currentPath, node: currentNode}
        prevPath = currentPath
        prevNode = currentNode
        prevChildren = currentNode[childrenKey]
      }
    } else {
      const list = [...this.iteratePath(path, {...opt, reverse: false})];
      list.reverse()
      for (const {path:path0, node} of list) {
        const path = <TreeDataPath>path0
        yield {path, node}
      }
    }
  }
  getAllNodes(path:TreeDataPath) {
    const all:Node[] = [];
    for (const {node} of this.iteratePath(path)) {
      all.push(node)
    }
    return all
  }
  getNode(path:TreeDataPath): Node {
    return arrayLast(this.getAllNodes(path))
  }
  getNodeIndexAndParent(path:TreeDataPath) {
    const parentPath = path.slice()
    const index = parentPath.pop()
    return {parent: this.getNode(parentPath), index, parentPath}
  }
  getNodeParent(path:TreeDataPath) {
    return this.getNodeIndexAndParent(path).parent
  }
  setPathNode(path:TreeDataPath, node:Node) {
    if (path == null || path.length === 0) {
      this.data = node
    } else {
      const {childrenKey, rootChildren} = this
      const {parent, index} = this.getNodeIndexAndParent(path)
      const parentChildren = path.length === 1 ? rootChildren : parent[childrenKey]
      parentChildren[index] = node
    }
  }
  removeNode(path:TreeDataPath): Node|undefined {
    const {childrenKey, rootChildren} = this
    const {parent, index} = this.getNodeIndexAndParent(path)
    const parentChildren = path.length === 1 ? rootChildren : parent[childrenKey]
    const node = parentChildren[index]
    parentChildren.splice(index, 1)
    return node
  }
  walk(handler:depthFirstSearch_Handler, opt?:depthFirstSearch_Options) {
    const {childrenKey, data} = this
    // @ts-ignore
    return walkTreeData(data, handler, childrenKey, opt)
  }
  clone(opt:{
    afterNodeCreated?: (newNode: Node, info:{oldNode:Node, index: number, parent: Node|undefined, path: TreeDataPath}) => void
  }={}) {
    // opt.afterNodeCreated(newNode, {oldNode: node, index, parent, path})
    const {childrenKey} = this
    const td = new TreeData()
    this.walk((node, index, parent, path) => {
      const newNode = Object.assign({}, node)
      if (newNode[childrenKey]) {
        newNode[childrenKey] = []
      }
      if (opt.afterNodeCreated) {
        opt.afterNodeCreated(newNode, {oldNode: node, index, parent, path})
      }
      td.setPathNode(path, newNode)
    })
    return td.data as Node[]
  }
}

// ## function
// ## 函数

// if it is function, return result, else return it directly.
export function resolveValueOrGettter(valueOrGetter, args = []) {
  if (isFunction(valueOrGetter)) {
    return valueOrGetter(...args)
  } else {
    return valueOrGetter
  }
}

// add executed count as first argument of func
// 增加执行次数作为方法的第一个参数
type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
export function executeWithCount<T>(func:T) {
  let count = 0
  function wrapper(...args) {
    // @ts-ignore
    return func.call(this, count++, ...args)
  }
  return wrapper as OmitFirstArg<T>
}

// (getVal, handler) => update . when execute update, call getVal and check if changed.
// (getVal, handler) => update . 执行update时, 调用getVal并检查结果是否改变.
type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;
export function watchChange<T>(getVal:ReplaceReturnType<OmitFirstArg<T>, any>, handler:T) {
  let oldVal
  const update = (...args) => {
    // @ts-ignore
    const newVal = getVal(...args)
    if (oldVal !== newVal) {
      // @ts-ignore
      handler(newVal, ...args)
    }
    oldVal = newVal
  }
  return update as OmitFirstArg<T>
}

export function debounceTrailing<T>(action:T, wait = 0) {
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
          // @ts-ignore
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
  const stop = () => {
    if (t) {
      clearTimeout(t)
      t = null
    }
    delaying = false
    resolves = []
    rejects.forEach(reject => reject())
    rejects = []
  }
  // @ts-ignore
  return {action: wrappedAction as T, stop}
}

export function debounceImmediate<T>(action:T, wait = 0) {
  let t
  let delaying
  let result
  const wrappedAction = function (...args) {
    return new Promise((resolve, reject) => {
      if (delaying) {
        resolve(result)
      } else {
        delaying = true
        // @ts-ignore
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
  const stop = () => {
    if (t) {
      clearTimeout(t)
      t = null
    }
    delaying = false
  }
  // @ts-ignore
  return {action: wrappedAction as T, stop}
}

// the returned function only accept one argument
export function joinFunctionsByResult(funcs:any[]) {
  let wrappedFunc = funcs[0]
  for (let i = 1; i < funcs.length; i++) {
    wrappedFunc = join2func(wrappedFunc, funcs[i])
  }
  return wrappedFunc
  function join2func(func1, func2) {
    return function (arg) {
      const result1 = func1(arg)
      return func2(result1)
    }
  }
}

// must pass arguments to `next` manually
export function joinFunctionsByNext(funcs:any[]) {
  let next = () => {}
  for (const {value: func} of iterateAll(funcs, {reverse: true})) {
    const currentNext = next
    next = wrapFuncWithNext(func, currentNext)
  }
  return next
  function wrapFuncWithNext(func, next) {
    return function (...args) {
      return func(next, ...args)
    }
  }
}

// ## promise

// execute promise in sequence
export function executePromiseGetters(getters: (()=>any)[], concurrent = 1) {
  let stopped
  const promise = new Promise(async function(resolve, reject) {
    const chunks = splitArray(getters, concurrent)
    const promises = []
    for (const chunk of chunks) {
      const chunkPromises = chunk.map(v => v())
      promises.push(...chunkPromises)
      await Promise.all(chunkPromises)
      if (stopped) {
        break
      }
    }
    Promise.all(promises).then((...args) => {
      resolve(...args)
    })
  })
  return {
    promise,
    stop() {
      stopped = true
    },
  }
}

export function promiseTimeout(promise, timeout:number) {
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

// ## url

export function getUrlParam(par:string) {
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

// ## dom

// return NodeList if there are multiple top-level nodes
export function createElementFromHTML(htmlString:string) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  if (div.childNodes.length > 1) {
    return div.childNodes
  } else {
    return div.childNodes[0]
  }
}

export function uniqueId (prefix = 'id_'):string {
  const id = prefix + randString()
  if (!store.uniqueId) store.uniqueId = {}
  const generatedIds = store.uniqueId
  if (document.getElementById(id) || generatedIds[id]) {
    return uniqueId(prefix)
  } else {
    generatedIds[id] = true
    return id
  }
}

export function isDescendantOf (el:HTMLElement, parent:HTMLElement) {
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

export function removeEl(el:HTMLElement|Node) {
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
export function getOffset(el: HTMLElement) {
  const rect = getBoundingClientRect(el)
  const scroll = getScroll()

	return {
		x: rect.left + scroll.left,
    y: rect.top + scroll.top,
	}
}

// there is some trap in el.offsetParent, so use this func to fix
export function getOffsetParent(el: HTMLElement) {
  let offsetParent = el.offsetParent
  if(
    !offsetParent
    || offsetParent === document.body && getComputedStyle(document.body).position === 'static'
  ) {
    offsetParent = document.body.parentElement
  }
  return offsetParent
}

// get el current position. like jQuery.position. The position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.
// 相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.
export function getPosition(el: HTMLElement) {
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

// like jQuery.offset(x, y), but it just return cmputed position, don't update style
// 类似 jQuery.offset的设置功能, 但是它只返回计算的position, 不改变元素样式.
export function getPositionFromOffset(el:HTMLElement, of:{x:number, y:number}) {
  const offsetParent = getOffsetParent(el) as HTMLElement
  const parentOf = getOffset(offsetParent)
  return {
    x: of.x - parentOf.x,
    y: of.y - parentOf.y,
  }
}

export function getBoundingClientRect(el:HTMLElement){
  // refer: http://www.51xuediannao.com/javascript/getBoundingClientRect.html
  const xy = el.getBoundingClientRect()
  const top = xy.top-document.documentElement.clientTop,//document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
      bottom = xy.bottom,
      left = xy.left-document.documentElement.clientLeft,//document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
      right = xy.right,
      width = xy.width||right - left, //IE67不存在width 使用right - left获得
      height = xy.height||bottom - top
  const x = left
  const y = top
  return {top, right, bottom, left, width, height, x, y}
}

// refer [getBoundingClientRect](#getBoundingClientRect)
export const getViewportPosition = getBoundingClientRect

// TODO not tested
export function viewportPositionToOffset(position:{x:number, y:number}){
  const body = document.body
  const bodyOf = getOffset(body)
  const bodyVP = getViewportPosition(body)
  return {x: position.x + bodyOf.x - bodyVP.x, y: position.y + bodyOf.y - bodyVP.y}
}

// TODO not tested
export function offsetToViewportPosition(offset:{x:number, y:number}){
  const body = document.body
  const bodyOf = getOffset(body)
  const bodyVP = getViewportPosition(body)
  return {x: offset.x + bodyVP.x - bodyOf.x, y: offset.y + bodyVP.y - bodyOf.y}
}

type findParent_Callback = (parentEl: HTMLElement) => boolean|'break'
export function findParent(el:HTMLElement, callback:findParent_Callback, opt:{withSelf?:boolean}={}) {
  let cur = (opt && opt.withSelf) ? el : el.parentElement
  while (cur) {
    const r = callback(cur)
    if (r === 'break') {
      return
    } else if(r) {
      return cur
    } else {
      cur = cur.parentElement
    }
  }
}

export function backupAttr(el:HTMLElement, name:string) {
  const key = `original_${name}`
  el[key] = el.getAttribute(name)
}

export function restoreAttr(el:HTMLElement, name:string) {
  const key = `original_${name}`
  const value = el[key]
  if (value == null) {
    el.removeAttribute(name)
  } else {
    el.setAttribute(name, value)
  }
}

// source: http://youmightnotneedjquery.com/
export function hasClass(el:HTMLElement, className:string) {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className)
  }
}

// source: http://youmightnotneedjquery.com/
export function addClass(el:HTMLElement, className:string) {
  if (!hasClass(el, className)) {
    if (el.classList)
    { el.classList.add(className) }
    else
    { el.className += ' ' + className }
  }
}

// source: http://youmightnotneedjquery.com/
export function removeClass(el:HTMLElement, className:string) {
  if (el.classList)
  { el.classList.remove(className) }
  else
  { el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ') }
}

export function getElSizeEvenInvisible(el:HTMLElement) {
  backupAttr(el, 'style')
  el.style.display = 'block'
  const t = getBoundingClientRect(el)
  const size = {
    width: t.width,
    height: t.height,
  }
  restoreAttr(el, 'style')
  return size
}

/**
 * [isOffsetInEl]
 * @param {Number} x
 * @param {Number} y
 * @param {Object} el HTML Element
 */
export function isOffsetInEl(x:number, y:number, el:HTMLElement) {
  const offset = getOffset(el)
  return offset.x <= x && offset.x + el.offsetWidth >= x && offset.y <= y && offset.y + el.offsetHeight >= y
}

// get border
export function getBorder(el:HTMLElement) {
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

export function setElChildByIndex(el:HTMLElement, child:HTMLElement, index:number) {
  // @ts-ignore
  child.childComponentIndex = index
  const len = el.childNodes.length
  if (len === 0) {
    el.appendChild(child)
  } else if (index === 0) {
    el.insertBefore(child, el.childNodes[0])
  } else {
    const {index: nearestIndex, value: nearest, greater} = binarySearch(el.childNodes, el => {
      return el.childComponentIndex - index
    }, {
      start: 0,
      end: notGreaterThan(index, len - 1),
      returnNearestIfNoHit: true
    })
    if (greater) {
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

type EventHandler = (Event) => void
export function onDOM(el:HTMLElement|Window|Document, name:string, handler:EventHandler, ...args:any[]) {
  if (el.addEventListener) { // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.addEventListener(name, handler, ...args)
    // @ts-ignore
  } else if (el.attachEvent) { // IE 8 及更早 IE 版本
    // @ts-ignore
    el.attachEvent(`on${name}`, handler, ...args)
  }
}

export function offDOM(el:HTMLElement|Window|Document, name:string, handler:EventHandler, ...args:any[]) {
  if (el.removeEventListener) { // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.removeEventListener(name, handler, ...args)
    // @ts-ignore
  } else if (el.detachEvent) { // IE 8 及更早 IE 版本
    // @ts-ignore
    el.detachEvent(`on${name}`, handler, ...args)
  }
}

export function onDOMMany(els:(HTMLElement|Window|Document)[], names:string[], handler:EventHandler, ...args:any[]) {
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

export function getImageSizeByUrl(url:string) {
  const image = document.createElement('img')
  return new Promise<{width:number, height:number}>(function(resolve, reject) {
    onDOM(image, 'load', () => {
      resolve({width: image.width, height: image.height})
    })
    onDOM(image, 'error', (e) => {
      reject(e)
    })
    image.src = url
  })
}

type findNodeList_Callback = (el: HTMLElement, index: number) => void|boolean
export function findNodeList(list:NodeList, callback:findNodeList_Callback, opt:{reverse?:boolean} = {}) {
  const iterator = iterateAll(list, {
    reverse: opt.reverse
  })
  for (const {value, index} of iterator) {
    if (callback(value, index)) {
      return value as HTMLElement
    }
  }
}

export function findNodeListReverse(list:NodeList, callback:findNodeList_Callback) {
  return findNodeList(list, callback, {reverse: true})
}

export function elementsFromPoint(x:number, y:number):Element[] {
  const args = [x,y]
  // @ts-ignore
  const func = document.elementsFromPoint || document.msElementsFromPoint || elementsFromPoint
  return func.apply(document, args)
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

export function getOuterAttachedHeight(el:Element, opt:{margin?:boolean, border?: boolean} = {}) {
  opt = {
    margin: true,
    border: true,
    ...opt,
  }
  const stl = getComputedStyle(el)
  let r = 0
  const arr = []
  if (opt.margin) {
    arr.push('margin-top', 'margin-bottom')
  }
  if (opt.border) {
    arr.push('border-top-width', 'border-bottom-width')
  }
  arr.forEach(key => {
    r += parseFloat(stl[key])
  })
  return r
}

export function getOuterAttachedWidth(el:Element, opt:{margin?:boolean, border?: boolean} = {}) {
  opt = {
    margin: true,
    border: true,
    ...opt,
  }
  const stl = getComputedStyle(el)
  let r = 0
  const arr = []
  if (opt.margin) {
    arr.push('margin-left', 'margin-right')
  }
  if (opt.border) {
    arr.push('border-left-width', 'border-right-width')
  }
  arr.forEach(key => {
    r += parseFloat(stl[key])
  })
  return r
}
/* scroll to a positon with duration
from https://gist.github.com/andjosh/6764939
interface options{
  x: number // nullable. don't scroll horizontally when null
  y: number // nullable. don't scroll vertically when null
  duration: number // default 0
  element: Element // default is the top scrollable element.
  beforeEveryFrame: (count: number) => boolean|void // call before requestAnimationFrame execution. return false to stop
}
return stop
*/
export function scrollTo(options:{
  x?: number,
  y?: number,
  duration?: number,
  element?: Element,
  beforeEveryFrame?: (count: number) => boolean|void, // return false to stop
}) {
  if (!options.element) {
    options.element = document.scrollingElement || document.documentElement
  }
  if (options.duration == null) {
    options.duration = 0
  }
  const {x, y, duration, element} = options
  let requestAnimationFrameId
  let count = 0
  const startY = element.scrollTop,
  changeY = y - startY,
  startX = element.scrollLeft,
  changeX = x - startX,
  startDate = + new Date(),
  animateScroll = function() {
    if (options.beforeEveryFrame && options.beforeEveryFrame(count) === false) {
      return
    }
    const currentDate = new Date().getTime()
    const changedTime = currentDate - startDate
    if (y != null) {
      element.scrollTop = parseInt(calc(startY, changeY, changedTime, duration))
    }
    if (x != null) {
      element.scrollLeft = parseInt(calc(startX, changeX, changedTime, duration))
    }
    if(changedTime < duration) {
      requestAnimationFrameId = requestAnimationFrame(animateScroll)
    } else {
      if (y != null) {
        element.scrollTop = y
      }
      if (x != null) {
        element.scrollLeft = x
      }
    }
    count++
  }
  const stop = () => {
    cancelAnimationFrame(requestAnimationFrameId)
  }
  animateScroll()
  // return stop
  return stop
  function calc(startValue, changeInValue, changedTime, duration) {
    return startValue + changeInValue * (changedTime / duration)
  }
}

// ### DOM structure

export function insertBefore(el:Element, target:Element) {
  target.parentElement.insertBefore(el, target)
}
export function insertAfter(el:Element, target:Element) {
  target.parentElement.insertBefore(el, target.nextSibling)
}
export function prependTo(el:Element, target:Element) {
  target.insertBefore(el, target.firstChild);
}
export function appendTo(el:Element, target:Element) {
  target.appendChild(el)
}

// ## Date

export function cloneDate(dateObj:Date) {
  return new Date(dateObj.getTime())
}

// day and date is same
export function addDate(dateObj:Date, n:number, type:'year'|'month'|'day'|'date'|'hour'|'minute'|'second'|'millisecond') {
  if (!['year', 'month', 'day', 'date'].includes(type)) {
    type += 's'
  }
  let type2 = studlyCase(type)
  if (type2 === 'Day') {
    type2 = 'Date'
  }
  var setFuncName = 'set' + type2
  var getFuncName = 'get' + type2
  dateObj[setFuncName](dateObj[getFuncName]() + n)
  return dateObj
}

export function getMonthStart (dateObj:Date) {
  const clonedObj = cloneDate(dateObj)
  clonedObj.setDate(1)
  return clonedObj
}

export function getMonthEnd (dateObj:Date) {
  const r = cloneDate(dateObj)
  addDate(r, 1, 'month')
  r.setDate(0)
  return r
}

/*
startWeekDay: 0 is Sunday
return: [getCalendar_Day x 7][]
*/
type getCalendar_Day = {
  year:number,
  month:number,
  date:number,
  text:number,
  prevMonth?: boolean,
  currentMonth?: boolean,
  nextMonth?: boolean,
}
export function getCalendar(year:number, month:number, startWeekDay = 0):getCalendar_Day[][] {
  const results = []
  const date = new Date(year, month - 1)
  year = date.getFullYear()
  month = date.getMonth() + 1
  const monthStart = getMonthStart(date)
  const monthStartDay = monthStart.getDay()
  const calendarStart = addDate(cloneDate(monthStart), -(monthStartDay + startWeekDay), 'day')
  if (monthStartDay > startWeekDay) {
    const startDate = calendarStart.getDate()
    const year = calendarStart.getFullYear()
    const month = calendarStart.getMonth() + 1
    for (let i = startWeekDay; i < monthStartDay; i++) {
      const date = startDate + i
      results.push({
        year,
        month,
        date: date,
        text: date,
        prevMonth: true,
      })
    }
  }
  //
  const monthEnd = getMonthEnd(date)
  const monthEndtDate = monthEnd.getDate()
  for (let i = 1; i <= monthEndtDate; i++) {
    const date = i
    results.push({
      year: year,
      month: month,
      date,
      text: date,
      currentMonth: true,
    })
  }
  //
  const monthEndDay = monthEnd.getDay()
  const endWeekDay = 6 - startWeekDay
  if (monthEndDay < endWeekDay) {
    const nextMonth = addDate(cloneDate(date), 1, 'month')
    const year = nextMonth.getFullYear()
    const month = nextMonth.getMonth() + 1
    for (let i = monthEndDay + 1, date = 1; i <= endWeekDay; i++, date++) {
      results.push({
        year: year,
        month: month,
        date: date,
        text: date,
        nextMonth: true,
      })
    }
  }
  //
  return splitArray(results, 7)
}

// eg: 2018-09-07T03:38:37.888Z
// timezone must be UTC
export function isIsoFormat(str:string) {
  return Boolean(str.length > 15 && str.length < 30 && str.match(/^\d{4}-\d{2}-\d{2}T.*Z$/))
}

// timestamp eg: 2018-09-07T03:38:37.888Z
export function parseISO(timestamp:string) {
  const [datePart, timePart] = timestamp.split('T')
  let y, m, d, h = 0, min = 0, s = 0;
  [y, m, d] = datePart.split('-').map(v => parseInt(v))
  m = m - 1
  if (timePart) {
    const t = timePart.split(':').map(v => parseFloat(v))
    h = t[0]
    if (t[1] != null) {
      min = t[1]
    }
    if (t[2] != null) {
      s = t[2]
    }
  }
  const dt = new Date()
  dt.setUTCFullYear(y)
  dt.setUTCMonth(m)
  dt.setUTCDate(d)
  dt.setUTCHours(h)
  dt.setUTCMinutes(min)
  dt.setUTCSeconds(s)
  return dt
}

// ## advanced

/* binarySearch
callback(mid, i) return `mid - your_value` if arr is ascending, else return `your_value - mid`
*/
/* 二分查找
callback(mid, i) arr升序时, 返回`mid - your_value`, 否则返回`your_value - mid`
*/
type binarySearch_Callback = (mid:any, index: number) => number
type binarySearch_Return = { index: number, value: any, count: number, hit: boolean, greater?: boolean }|null
type binarySearch_Options = {
  start?: number
  end?: number
  returnNearestIfNoHit?: boolean
  maxTimes?: number
}
export function binarySearch(arr:any[]|NodeList, callback:binarySearch_Callback, opt:binarySearch_Options={}): binarySearch_Return {
  opt = {
    start: 0,
    end: arr.length - 1,
    maxTimes: 1000,
    ...opt,
  }
  let {start, end} = opt
  const {returnNearestIfNoHit, maxTimes} = opt
  let midNum
  let mid
  if (start == null) {
    start = 0
    end = arr.length - 1
  }
  let i = 0
  let r
  while (start >= 0 && start <= end) {
    if (i >= maxTimes) {
      throw Error(`binarySearch: loop times is over ${maxTimes}, you can increase the limit.`)
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
  return returnNearestIfNoHit ? { index: midNum, value: mid, count: i + 1, hit: false, greater: r > 0 } : null
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

export function waitTime(milliseconds:number, callback?:()=>void) {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      callback && callback()
      resolve()
    }, milliseconds)
  })
}

export function waitFor(condition:()=>boolean, time = 100, maxTimes = 1000) {
  let interval
  const promise = new Promise(function(resolve, reject) {
    let count = 0
    function judge() {
      if (count <= maxTimes) {
        if (condition()) {
          stop()
          resolve()
        }
      } else {
        stop()
        reject(new Error('waitFor: Limit is reached'))
      }
      count++
    }
    interval = setInterval(function () {
      judge()
    }, time)
    judge()
  })
  return {promise, stop}
  function stop() {
    clearInterval(interval)
  }
}

export async function retry(action: any, limitTimes = 3) {
  for (let index = 1; index <= limitTimes; index++) {
    try {
      // @ts-ignore
      return await action()
    } catch (error) {
      if (index === limitTimes) {
        throw error
      }
    }
  }
}

// clipboard-polyfill is more powerful
// 复制文字到剪贴板. 仅限于简单使用. 复杂环境推荐clipboard-polyfill
export function copyTextToClipboard(text:string) {
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
  textArea.style.top = '0'
  textArea.style.left = '0'

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em'
  textArea.style.height = '2em'

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = '0'

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

export function isWindowDefined() {
  try {
    return window && true
  } catch (error) {
    return false
  }
}

export function isNode() {
  // @ts-ignore
  return Boolean(typeof glb().module !== 'undefined' && glb().module.exports)
}

export function isIE() {
  // @ts-ignore
  return Boolean(window.ActiveXObject || "ActiveXObject" in window)
}

/*
https://developer.mozilla.org/docs/Web/API/Window/open
http://www.w3school.com.cn/htmldom/met_win_open.asp#windowfeatures
*/
export function openWindow(url:string, name:string, opt:any = {})
{
  glb().open(url, name, Object.keys(opt).map(k => `${k}=${opt[k]}`).join(','));
}

export function openCenterWindow(url:string, name:string, width:number, height:number, opt:any = {})
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
  search:{[key:string]:string} = {};
  constructor(baseUrl:string) {
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

/* resolve arguments to help overload. 解析函数参数, 帮助重载
```js
types eg: ['Object', (i) => i > 3, ['Number', default], null ]
null represent all types of argument
resolveArgsByType([1,'str'], ['Number', 'Boolean' ,'String']) -> [1, null, 'str']
resolveArgsByType([1,'str'], ['Number', ['Boolean', true] ,'String']) -> [1, true, 'str']
```
*/
export function resolveArgsByType(args:any[], types:any[]) {
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

export function makeStorageHelper<T>(storage:T) {
  return {
    storage: storage as T,
    set(name:string, value:any, minutes:number) {
      // set null can remove a item
      if (value == null) {
        this.storage.removeItem(name)
      } else {
        this.storage.setItem(name, JSON.stringify({
          value,
          expired_at: minutes ? new Date().getTime() + minutes * 60 * 1000 : null,
        }))
      }
    },
    get(name:string) {
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
    store.localStorage2 = makeStorageHelper(localStorage)
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
  on(name:string, handler:any) {
    this.eventStore.push({ name, handler })
  }
  once(name:string, handler:any) {
    const off = () => {
      this.off(name, wrappedHandler)
    }
    const wrappedHandler = (...args) => {
      handler(...args)
      off()
    }
    this.on(name, wrappedHandler)
    return off
  }
  onceTimeout(name:string, handler:any, timeout:number) {
    let off
    const promise = new Promise((resolve, reject) => {
      const wrappedHandler = (...args) => {
        handler(...args)
        resolve()
      }
      off = this.once(name, wrappedHandler)
      waitTime(timeout).then(() => {
        off()
        reject()
      })
    })
    const off2 = () => {
      off && off()
    }
    return {off: off2, promise}
  }
  off(name:string, handler:any) {
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
  emit(name:string, ...args:any[]) {
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

export class CrossWindowEventProcessor extends EventProcessor{
  storageName = '_crossWindow';
  windows = [];
  timeout = 200;
  id: string
  ready: Promise<void>
  // id
  constructor(opt:{timeout?:number}) {
    super()
    if (opt) {
      Object.assign(this, opt)
    }
    onDOM(window, 'storage', (ev) => {
      if (ev.key === this.storageName) {
        const event = JSON.parse(ev.newValue)
        if (!event.targets || event.targets.includes(this.id)) {
          this.emitLocal(event.name, ...event.args)
        }
      }
    })
    // social parts 集体部分
    // join
    this.id = randString()
    this.windows = [this.id]
    this.ready = new Promise((resolve, reject) => {
      this.onceTimeout('_windows_updated', ({windows}) => {
        this.windows = windows
      }, this.timeout).promise.then(() => {
        resolve()
        // responsed 被响应
      }, () => {
        // no response 无响应
        resolve()
      })
      this.broadcast('_join', this.id)
    })
    this.ready.then(() => {
      // on join
      this.on('_join', (id) => {
        this.windows.push(id)
        if (this.isMain()) {
          this.broadcast('_windows_updated', {windows: this.windows, type: 'join', id})
        }
      })
      // on _windows_updated
      this.on('_windows_updated', ({windows}) => {
        this.windows = windows
      })
      // on exit
      this.on('_exit', (id) => {
        const oldMain = this.windows[0]
        arrayRemove(this.windows, id)
        if (this.isMain()) {
          this.emit('_windows_updated', {windows: this.windows, type: 'exit', id})
          if (oldMain != this.id) {
            this.emit('_main_updated', {windows: this.windows, old: oldMain, 'new': this.id})
          }
        }
      })
      onDOM(window, 'beforeunload', () => {
        this.exitGroup()
      })
    })
  }
  isMain() {
    return this.id === this.windows[0]
  }
  BROADCAST = '__BROADCAST__';
  emitTo(name:string, targets, ...args) {
    if (targets === this.BROADCAST) {
      targets = null
    } else {
      if (targets && !isArray(targets)) {
        targets = [targets]
      }
      if (targets.includes(this.id)) {
        super.emit(name, ...args) // emit to current window
      }
    }
    glb().localStorage.setItem(this.storageName, JSON.stringify({
      name,
      targets,
      args,
      // use random make storage event triggered every time
      // 加入随机保证触发storage事件
      random: Math.random(),
    }))
  }
  emitLocal(name:string, ...args) {
    this.emitTo(name, this.id, ...args)
  }
  broadcast(name:string, ...args) {
    this.emitTo(name, this.BROADCAST, ...args)
  }
  emit(name:string, ...args) {
    this.emitTo(name, this.windows, ...args)
  }
  exitGroup() {
    this.broadcast('_exit', this.id)
  }
}
// Deprecated in next version
export const CrossWindow = CrossWindowEventProcessor

// on continuous input. return destroy
// 监听连续输入事件. 返回取消监听函数.
export function onContinuousInput(handler:(input:string)=>void, opt:{timeout?:number}={}) {
  opt = {
    timeout: 1000,
    ...opt,
  }
  let input = ''
  let timeoutId
  const keydownHandler = (e) => {
    if (e.key && e.key.length === 1) {
      input = `${input}${e.key}`
      handler(input)
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
      timeoutId = setTimeout(() => {
        input = ''
      }, opt.timeout)
    }
  }
  onDOM(document, 'keydown', keydownHandler)
  return () => {
    offDOM(document, 'keydown', keydownHandler)
  }
}

// refer [onContinuousInput](#onContinuousInput)
export const onQuickKeydown = onContinuousInput

export function getUserLanguage() {
  // @ts-ignore
  return navigator.language || navigator.userLanguage
}

export class Cache {
  store = {};
  has(name:string) {
    return this.store.hasOwnProperty(name)
  }
  remember(name:string, getter:()=>any) {
    if (!this.has(name)) {
      this.store[name] = {
        value: getter()
      }
    }
    return this.store[name].value
  }
  forget(name:string) {
    if (name) {
      if (this.has(name)) {
        delete this.store[name]
      }
    } else {
      this.store = {}
    }
  }
}

// attach cached getters to an object; can attach to self
export function attachCache(obj:any, toCache:object, cache = new Cache()) {
  for (const key in toCache) {
    const getter = toCache[key]
    Object.defineProperty(obj, key, {
      get() {
        return cache.remember(key, () => getter.call(this))
      },
    })
  }
}

// for animation
export function easeInOutQuad(startValue, changeInValue, changedTime, duration) {
  let t = changedTime, d= duration, b = startValue, c = changeInValue
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
}