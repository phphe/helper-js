// ## base functions
// ## 基础方法

/**
 * get global, such as window in browser.
 * 返回顶级全局变量. 例如浏览器的`window`
 * @returns
 */
export function glb(): typeof globalThis {
  try {
    // `this` !== global or window because of build tool. So you can't use `this` to get `global`
    return window;
  } catch (error) {
    return global;
  }
}

/**
 * detect if global variable `document` existing.
 * 判断全局变量`document`是否存在
 * @returns
 */
export function isDocumentExisted() {
  try {
    let t = document;
  } catch (e) {
    return false;
  }
  return true;
}

export function isArray<T>(v: unknown): v is any[] {
  return Object.prototype.toString.call(v) === "[object Array]";
}
export function isBool(v: unknown): v is boolean {
  return Object.prototype.toString.call(v) === "[object Boolean]";
}
export function isNumber(v: unknown): v is number {
  return Object.prototype.toString.call(v) === "[object Number]";
}
export function isNumeric(v: unknown): v is string {
  try {
    // @ts-ignore
    return isFinite(v) && !isNaN(parseFloat(v));
  } catch (error) {
    return false;
  }
}
export function isString(v: unknown): v is string {
  return Object.prototype.toString.call(v) === "[object String]";
}
export function isObject(v: unknown): v is object {
  return Object.prototype.toString.call(v) === "[object Object]";
}
export function isFunction(v: unknown): v is Function {
  return typeof v === "function";
}
export function isPromise(v: unknown): v is Promise<any> {
  return Object.prototype.toString.call(v) === "[object Promise]";
}

/**
 * detect if argumrnt is null, undefined, empty array, empty string, false, NaN, empty object
 * 检查是否是null, undefined, 空数组, 空字符串, false, NaN, 空对象
 * @param v
 * @returns
 */
export function empty(
  v: null | undefined | boolean | number | object | unknown[]
) {
  if (v == null) {
    return true;
  } else if (v["length"] != null) {
    return v["length"] === 0;
  } else if (isBool(v)) {
    return false;
  } else if (isNumber(v)) {
    return isNaN(v);
  } else if (isObject(v)) {
    return Object.keys(v).length === 0;
  }
}

/**
 * rand int in range, including min and max
 * 返回指定范围随机整数, 包括范围起始值和终止值
 * @param min
 * @param max
 * @returns
 */
export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * rand item in array
 * 返回数组随机一项
 * @param arr
 * @returns
 */
export function randChoice<T>(arr: string | T[]): string | T {
  return arr[randInt(0, arr.length - 1)] as T;
}

/**
 * Pad a string to a certain length with another string
 * 左边补充指定字符, 使其达到指定长度
 * @param str
 * @param n
 * @param padString
 * @returns
 */
export function strPad(str: number | string, n: number, padString = "0") {
  let r = str.toString();
  let len = str.toString().length;
  while (len < n) {
    r = padString + r;
    len++;
  }
  if (r.length > n) {
    r = r.substring(r.length - n);
  }
  return str;
}

/**
 * If n less than `min`, return `min`, else n.
 * 如果n小于min, 返回min, 否则n.
 * @param n
 * @param min
 * @returns
 */
export function notLessThan<T>(n: T, min: T) {
  return n < min ? min : n;
}

/**
 * If n greater than `max`, return `max`, else n.
 * 如果n大于max, 返回max, 否则n.
 * @param n
 * @param max
 * @returns
 */
export function notGreaterThan<T>(n: T, max: T) {
  return n < max ? n : max;
}

/**
 * limit min and max of value.
 * 限制值的最小和最大值.
 * @param n
 * @param min
 * @param max
 * @returns
 */
export function between<T>(n: T, min: T, max: T) {
  return notGreaterThan(notLessThan(n, min), max);
}

// ## string
// ## 字符串

/**
 * 'abc abc' to 'Abc abc'
 * @param str
 * @returns
 */
export function studlyCase(str: string) {
  return str && str[0].toUpperCase() + str.substring(1);
}

/**
 * To lower case and use `-` as delimiter. example: '-ABC abc_def camelCase-- helloMyFriend' to 'a-b-c-abc-def-camel-case-hello-my-friend'
 * @param str
 * @returns
 */
export function kebabCase(str: string) {
  return str
    .replace(/ /g, "-")
    .replace(/_/g, "-")
    .replace(/(?<=[a-z])([A-Z])/g, "-$1")
    .replace(/--+/g, "-")
    .replace(/^-|-$|/g, "")
    .toLowerCase();
}

/**
 * To lower case and use `_` as delimiter.
 * @param str
 * @returns
 */
export function snakeCase(str: string) {
  return kebabCase(str).replace(/-/g, "_");
}

/**
 * 'abc-abc-abc_abc' to 'AbcAbcAbcAbc'
 * @param str
 * @returns
 */
export function camelCase(str: string) {
  const temp = kebabCase(str).split("-");
  for (let i = 1; i < temp.length; i++) {
    temp[i] = studlyCase(temp[i]);
  }
  return temp.join("");
}

/**
 * 'AbcAbcAbcAbc' to ['Abc', 'Abc', 'Abc', 'Abc']
 * @param str
 * @returns
 */
export function camelToWords(str: string) {
  return str.split(/(?<=[a-z])(?=[A-Z])/g);
}

/**
 * 'abcAbc' to 'Abc Abc'
 * @param str
 * @returns
 */
export function titleCase(str: string) {
  return camelToWords(studlyCase(camelCase(str))).join(" ");
}

/**
 * generate random string
 * 随机字符串
 * @param len default 8
 * @param seeds
 * @returns
 */
export function randString(
  len = 8,
  seeds:
    | string
    | string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
) {
  let r = "";
  for (let i = 0; i < len; i++) {
    r += randChoice(seeds);
  }
  return r;
}

/**
 * reverse a string
 * @param str
 * @returns
 */
export function reverseString(str: string) {
  return str.split("").reverse().join("");
}

// ## Array
// ## 数组

/**
 * remove item from array. return removed count
 * 从数组删除项. 返回删除计数
 * @param arr
 * @param v
 * @returns
 */
export function arrayRemove(arr: any[], v: any) {
  let index;
  let count = 0;
  while ((index = arr.indexOf(v)) > -1) {
    arr.splice(index, 1);
    count++;
  }
  return count;
}

/**
 * remove items from array by sorted indexes. indexes example: [0, 2, 6, 8, 9]
 * 通过有序的索引集删除数组项. 索引集例子: [0, 2, 6, 8, 9]
 * @param arr
 * @param sortedIndexes
 */
export function arrayRemoveBySortedIndexes(
  arr: any[],
  sortedIndexes: number[]
) {
  for (let i = sortedIndexes.length - 1; i >= 0; i--) {
    const index = sortedIndexes[i];
    arr.splice(index, 1);
  }
}

/**
 * get item from array by index. index can be negative number
 * 通过索引获取数组一项. 支持负值索引.
 * @param arr
 * @param n
 * @returns
 */
export function arrayAt<T>(arr: T[], n: number) {
  return arr[n >= 0 ? n : arr.length + n];
}

/**
 * get first or array
 * 返回数组首项
 * @param arr
 * @returns
 */
export function arrayFirst<T>(arr: T[]) {
  return arr[0];
}

/**
 * get last of array
 * 返回数组末项
 * @param arr
 * @returns
 */
export function arrayLast<T>(arr: T[]) {
  return arr[arr.length - 1];
}

/**
 *
 * @param arr1
 * @param arr2
 * @returns [diff1, diff2] diff1: in arr1 not in arr2. diff2: in arr2 not in arr1
 */
export function arrayDiff<T>(arr1: T[], arr2: T[]): [T[], T[]] {
  const m1 = new Map<T, number>();
  const m2 = new Map<T, number>();
  for (const item of arr1) {
    const count = m1.has(item) ? m1.get(item) : 0;
    m1.set(item, count + 1);
  }
  for (const item of arr2) {
    const count = m2.has(item) ? m2.get(item) : 0;
    m2.set(item, count + 1);
  }
  const r1 = [];
  const r2 = [];
  m1.forEach((count, item) => {
    const diff = count - (m2.has(item) ? m2.get(item) : 0);
    if (diff > 0) {
      diff === 1 ? r1.push(item) : r1.push(...new Array(diff).fill(item));
    }
  });
  m2.forEach((count, item) => {
    const diff = count - (m1.has(item) ? m1.get(item) : 0);
    if (diff > 0) {
      diff === 2 ? r2.push(item) : r2.push(...new Array(diff).fill(item));
    }
  });
  return [r1, r2];
}

/**
 * like indexOf, get all indexes
 * @param strOrArr
 * @param item
 * @returns
 */
export function indexesOf(strOrArr: string | any[], item: any) {
  let i = 0;
  const indexes: number[] = [];
  while (i < strOrArr.length) {
    const index = strOrArr.indexOf(item, i);
    if (index === -1) {
      break;
    } else {
      indexes.push(index);
      if (typeof strOrArr === "string") {
        i = index + (item + "").length;
      } else {
        i = index + 1;
      }
    }
  }
  return indexes;
}

/**
 * get array item siblings. Example: getArrayItemSiblings(arr, item, [-1, 1]), get previous and next sibling
 * 获得数组项的多个同级. 例: getArrayItemSiblings(arr, item, [-1, 1]), 获得前一个和后一个
 * @param arr
 * @param item
 * @param offsets
 * @returns
 */
export function getArrayItemSiblingsByOffsets<T>(
  arr: T[],
  item: any,
  offsets: number[]
) {
  const index = arr.indexOf(item);
  if (index === -1) {
    throw "item is not in array";
  }
  return offsets.map((v) => arr[index + v]);
}

export function toArrayIfNot<T>(arrOrNot: T | T[]): T[] {
  return isArray(arrOrNot) ? arrOrNot : [arrOrNot];
}

/**
 * Split array every n. n can be getter, which argument is the times.
 * 每n个拆分数组. n可以是方法, 参数是第几次分块
 * @param arr
 * @param n
 * @returns
 */
export function splitArray<T>(
  arr: T[],
  n: number | ((times: number) => number)
): T[][] {
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
      const end = i + <number>n;
      r.push(arr.slice(i, end));
      i = end;
    }
  }
  return r;
}

/**
 * group array by mark
 * 计算每项的标识, 通过标识将数组项分组.
 * @param arr
 * @param getMark
 * @returns
 */
export function groupArray<T, R>(arr: T[], getMark: (item: T) => R) {
  const groups = new Map<R, T[]>();
  arr.forEach((v) => {
    const mark = getMark(v);
    if (!groups.has(mark)) {
      groups.set(mark, []);
    }
    groups.get(mark).push(v);
  });
  return groups;
}

/**
 * Each item in the new array is unique.
 * 新数组每项唯一.
 * @param arr
 * @param getMark
 * @returns
 */
export function arrayDistinct<T>(
  arr: T[],
  getMark?: (item: T, index: number) => unknown
) {
  const t = new Set();
  return arr.filter((v, i) => {
    const mark = getMark ? getMark(v, i) : v;
    if (!t.has(mark)) {
      t.add(mark);
      return true;
    }
  });
}

/**
 * get items from array between 2 indeies. index can be negative
 * 从数组获得一个范围内的项. 范围可以为负.
 * @param arr
 * @param index
 * @param endIndex
 * @returns
 */
export function arrayBetween<T>(arr: T[], index: number, endIndex: number) {
  if (index < 0) {
    index += arr.length;
  }
  if (endIndex < 0) {
    endIndex += arr.length;
  }
  return arr.slice(index, endIndex - index + 1);
}

/**
 * return new array excluding n items from end
 * 返回新数组排除末尾n项
 * @param arr
 * @param n
 * @returns
 */
export function arrayWithoutEnd<T>(arr: T[], n: number = 1) {
  return arr.slice(0, arr.length - n);
}

/**
 * get one-dimensional array from multidimensional array
 * 从多维数组获取一维数组
 * @param arr
 * @param depth
 * @returns
 */
export function arrayFlat<T>(arr: any[], depth = 10): T[] {
  const r = [];
  const rec = (arr, curentDepth) => {
    for (const item of arr) {
      if (isArray(item) && curentDepth < depth) {
        rec(item, curentDepth + 1);
      } else {
        r.push(item);
      }
    }
  };
  rec(arr, 0);
  return r;
}

/**
 * simplified array.filter()
 * e.g.: arrayFilter(arr, [null, undefined]) equal to arr.filter(v => v!== null && v!== undefined)
 * @param arr
 * @param without
 * @returns
 */
export function arrayFilter<T extends ArrayLike<any>>(
  arr: T,
  without: any[]
): T {
  // @ts-ignore
  return arr.filter((v) => without.indexOf(v) > -1);
}
/**
 * alias of arrayFilter
 */
export const arrayWithout = arrayFilter;

// ## Object
// ## 对象

/**
 * return JSON.parse(JSON.stringify(obj))
 * @param obj
 * @returns
 */
export function cloneObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
/**
 * like Array.map
 * @param obj
 * @param handler
 * @returns
 */
export function objectMap(
  obj: object,
  handler: (value: any, key: string, index: number) => any
): object {
  const r = {};
  let i = 0;
  for (const key in obj) {
    r[key] = handler(obj[key], key, i);
    i++;
  }
  return r;
}

export function objectOnly(obj: object, keys: string[]): object {
  let keysSet = new Set(keys);
  const r = {};
  keysSet.forEach((key) => {
    r[key] = obj[key];
  });
  return r;
}

export function objectExcept(obj: object, keys: string[]): object {
  let keysSet = new Set(keys);
  const r = {};
  for (const key in obj) {
    if (!keysSet.has(key)) {
      r[key] = obj[key];
    }
  }
  return r;
}

// loop for Array, Object, NodeList, String
export type IterateAllOptions = {
  reverse?: boolean;
  exclude?: (
    info: { value: any; index: number } | { value: any; key: string }
  ) => boolean;
};
export function* iterateAll<T>(
  val: string | any[] | object | NodeList | HTMLCollection,
  opt: IterateAllOptions = {}
): Generator<{ value: T; index?: number; key?: string }> {
  // opt: {reverse, exclude}
  if (!opt.reverse) {
    // @ts-ignore
    if (val.length != null) {
      // @ts-ignore
      for (let i = 0; i < val.length; i++) {
        const info = { value: val[i], index: i };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else if (isObject(val)) {
      for (const key of Object.keys(val)) {
        const info = { value: val[key], key };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else {
      throw "Unsupported type";
    }
  } else {
    // @ts-ignore
    if (val.length != null) {
      // @ts-ignore
      for (let i = val.length - 1; i >= 0; i--) {
        const info = { value: val[i], index: i };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else if (isObject(val)) {
      const keys = Object.keys(val);
      keys.reverse();
      for (const key of keys) {
        const info = { value: val[key], key };
        if (!opt.exclude || !opt.exclude(info)) {
          yield info;
        }
      }
    } else {
      throw "Unsupported type";
    }
  }
}

export type FindAllCallback = (value: any, index: number) => void | boolean;
/**
 * like Array.find
 * @param list
 * @param callback
 * @param options
 * @returns
 */
export function findAll(
  list: Parameters<typeof iterateAll>[0],
  callback: FindAllCallback,
  options?: Parameters<typeof iterateAll>[1]
) {
  for (const { value, index } of iterateAll(list, options)) {
    if (callback(value, index)) {
      return value as HTMLElement;
    }
  }
}

// example: objectGet(window, 'document.body.children.0') . source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
// 例: objectGet(window, 'document.body.children.0') . 参考: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
/**
 * example: dotGet(window, 'document.body.children.0')
 * @param obj
 * @param path
 * @param throwError
 * @returns
 */
export function dotGet(
  obj: object,
  path: string | string[],
  throwError?: boolean
): any {
  const paths = isArray(path) ? path : path.split(".");
  let current = obj;
  try {
    for (const key of paths) {
      current = current[key];
    }
  } catch (e) {
    if (throwError) {
      throw "Path does not exist";
    }
  }
  return current;
}

/**
 * example: dotSet(window, 'document.body.children.0', vaue)
 */
export function dotSet(obj: object, path: string | string[], value: any) {
  const paths = isArray(path) ? path : path.split(".");
  const lastKey = arrayLast(paths);
  const parent = dotGet(obj, paths.slice(0, paths.length - 1));
  if (!parent) {
    throw "Path does not exist";
  }
  parent[lastKey] = value;
}

/**
 * try to delete obj[prop]
 * @param obj
 * @param prop
 * @returns
 */
export function unset(obj: object, prop: string) {
  try {
    delete obj[prop];
    return true;
  } catch (e) {
    return false;
  }
}

export function assignIfNoKey(obj: object, key: string, val: any) {
  if (!obj.hasOwnProperty(key)) {
    obj[key] = val;
  }
}
export function assignIfKeyNull(obj: object, key: string, val: any) {
  if (obj[key] == null) {
    obj[key] = val;
  }
}
/**
 * Assign if value different. For assign sensitive, such as Vue.watch.
 * @param obj
 * @param key
 * @param val
 */
export function assignIfDiff(obj: object, key: string, val: any) {
  if (obj[key] !== val) {
    obj[key] = val;
  }
}
export function objectAssignIfNoKey<T extends object>(obj1: T, obj2: object) {
  Object.keys(obj2).forEach((key) => {
    assignIfNoKey(obj1, key, obj2[key]);
  });
  return obj1;
}
export function objectAssignIfKeyNull<T extends object>(obj1: T, obj2: object) {
  Object.keys(obj2).forEach((key) => {
    assignIfKeyNull(obj1, key, obj2[key]);
  });
  return obj1;
}
export function objectAssignIfDiff<T extends object>(obj1: T, obj2: object) {
  Object.keys(obj2).forEach((key) => {
    assignIfDiff(obj1, key, obj2[key]);
  });
  return obj1;
}

export function withoutUndefined<T extends object>(obj: T) {
  // @ts-ignore
  const r: T = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      r[key] = obj[key];
    }
  });
  return r;
}

/**
 * proxy a property to another key of this or another object
 * @param targetObj
 * @param targetKey
 * @param sourceObj
 * @param sourceKey
 */
export function objectDefineProxyProperty(
  targetObj: object,
  targetKey: string,
  sourceObj: object,
  sourceKey: string
) {
  const info = Object.getOwnPropertyDescriptor(sourceObj, sourceKey);
  Object.defineProperty(targetObj, targetKey, {
    get() {
      return sourceObj[sourceKey];
    },
    set(value) {
      sourceObj[sourceKey] = value;
    },
    configurable: true,
    enumerable: info.enumerable,
  });
}

export type MapObjectTreeHandler = (
  value: any,
  key: string | number,
  parent: object | any[],
  newParent: object | any[]
) =>
  | void
  | null
  | undefined
  | {
      key?: string;
      delete?: boolean;
      value?: any;
      skip?: boolean; // skip children
      stop?: boolean;
    };
/**
 * walk object and change key, value, delete key. return cloned new object.
 * 深度遍历对象, 可以改变key, value, 删除key. 返回克隆的新对象.
 * @param obj
 * @param handler
 * return null: don't change anything
 * return {delete: true}: delete
 * return {key: newKey}: change key
 * return {value: newValue}: change value
 * return {skip: true}: skip children
 * return {stop: true}: stop
 * @param limit to prevent circular reference.
 * @returns
 */
export function mapObjectTree(
  obj: object,
  handler: MapObjectTreeHandler,
  limit = 10000
): object {
  let r;
  let count = 0;
  const stack = [{ value: obj }];
  while (stack.length > 0) {
    if (count >= limit) {
      throw `mapObjectTree: limit(${limit}) reached, object may has circular reference`;
    }
    count++;
    // @ts-ignore
    const { value, key, parent, newParent } = stack.shift();
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
      }
      // value may changed
      return value;
    };
    let newVal, val, toDelete, stop, skip;
    if (!t) {
      // no change
      val = value;
      // @ts-ignore
      newVal = assign(value, key);
    } else {
      const { key: key2, value } = t;
      val = value;
      // @ts-ignore
      if (t.delete || key2 === false) {
        // del
        toDelete = true;
      } else if (key2 == null) {
        // don't change key
        newVal = assign(value, key, true);
      } else if (t.hasOwnProperty("value")) {
        // @ts-ignore
        newVal = assign(value, key2);
      }
      ({ stop, skip } = t);
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
        // @ts-ignore
        stack.push({ value: val[i], key: i, parent: val, newParent: newVal });
      }
    } else if (isObject(val)) {
      Object.keys(val).forEach((key) => {
        // @ts-ignore
        stack.push({ value: val[key], key, parent: val, newParent: newVal });
      });
    }
  }
  return r;
}

/**
 * [{id: 1}, {id: 2}] to {'1':{id: 1}, '2': {id: 2}}
 * @param arr
 * @param idKey
 * @returns
 */
export function mapObjects<T>(
  arr: T[],
  idKey: string | ((item: T, index: number) => string)
): { [key: string]: T } {
  const r = {};
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const item = arr[i];
    // @ts-ignore
    const id = isFunction(idKey) ? idKey(item, i) : item[idKey];
    r[id] = item;
  }
  return r;
}

/**
 * example: pairRows(users, userProfiles, 'id', 'user_id')
 * @param rows1
 * @param rows2
 * @param key1
 * @param key2
 * @returns [{row1|null, row2|null},...]
 */
export function joinRows<T, Y>(
  rows1: T[],
  rows2: Y[],
  key1: string | ((row: T, index: number) => any),
  key2?: string,
  ignoreUnmatched?: boolean
): [T | null, Y | null][] {
  if (key2 == null) {
    // @ts-ignore
    key2 = key1;
  }
  const m1 = new Map<unknown, T>();
  const m2 = new Map<unknown, Y>();
  const r = [];
  rows2.forEach((row, index) => {
    // @ts-ignore
    const key = typeof key2 === "function" ? key2(row, index) : row[key2];
    m2.set(key, row);
  });
  const usedRows2 = new Set();
  rows1.forEach((row, index) => {
    // @ts-ignore
    const key = typeof key1 === "function" ? key1(row, index) : row[key1];
    m1.set(key, row);
    let row2 = m2.has(key) ? m2.get(key) : null;
    if (m2.has(key) || !ignoreUnmatched) {
      r.push([row, row2]);
      usedRows2.add(row2);
    }
  });
  if (!ignoreUnmatched) {
    rows2.forEach((row, index) => {
      // @ts-ignore
      const key = typeof key2 === "function" ? key2(row, index) : row[key2];
      if (!usedRows2.has(row)) {
        r.push([null, row]);
      }
    });
  }
  return r;
}

export type TreeDataPath = number[];
export type WalkTreeDataHandler<T> = (
  node: T,
  index: number,
  parent: T | null,
  path: TreeDataPath
) => void | false | "skip children" | "skip siblings";
export type WalkTreeDataOptions = {
  childrenKey?: string;
  reverse?: boolean;
  childFirst?: boolean;
};
/**
 * walk tree data by with depth first search. tree data example: `[{children: [{}, {}]}]`
 * 深度优先遍历树形数据. 树形数据示例: `[{children: [{}, {}]}]`
 * @param obj
 * @param handler
 * @param opt
 */
export function walkTreeData<T>(
  obj: T | T[],
  handler: WalkTreeDataHandler<T>,
  opt: WalkTreeDataOptions = {}
) {
  opt = objectAssignIfNoKey(
    { ...opt },
    {
      childrenKey: "children",
    }
  );
  const { childrenKey } = opt;
  const rootChildren = isArray(obj) ? obj : [obj];
  //
  class StopException {}
  const func = (children, parent, parentPath) => {
    if (opt.reverse) {
      children = children.slice();
      children.reverse();
    }
    const len = children.length;
    for (let i = 0; i < len; i++) {
      const item = children[i];
      const index = opt.reverse ? len - i - 1 : i;
      const path = parentPath ? [...parentPath, index] : [];
      let childReturn;
      if (opt.childFirst) {
        if (item[childrenKey] != null) {
          childReturn = func(item[childrenKey], item, path);
        }
      }
      const r = handler(item, index, parent, path);
      if (r === false) {
        // stop
        throw new StopException();
      } else if (r === "skip children") {
        continue;
      } else if (r === "skip siblings") {
        break;
      }
      if (!opt.childFirst) {
        if (item[childrenKey] != null) {
          func(item[childrenKey], item, path);
        }
      }
    }
  };
  try {
    func(rootChildren, null, isArray(obj) ? [] : null);
  } catch (e) {
    if (e instanceof StopException) {
      // stop
    } else {
      throw e;
    }
  }
}
export type TreeDataNodeInfo<T> = {
  node: T;
  index: number;
  parent: T | null;
  path: TreeDataPath;
};
/**
 * like Array.find
 * @param obj
 * @param handler return true when found.
 * @param opt
 * @returns
 */
export function findInfoInTreeData<T>(
  obj: T | T[],
  handler: FindTreeDataHandler<T>,
  opt: FindTreeDataOptions = {}
): TreeDataNodeInfo<T> | undefined {
  let r: TreeDataNodeInfo<T>;
  walkTreeData(
    obj,
    (...args) => {
      if (handler(...args)) {
        r = {
          node: args[0],
          index: args[1],
          parent: args[2],
          path: args[3],
        };
        return false;
      }
    },
    opt
  );
  return r;
}

/**
 * like Array.find
 * @param obj
 * @param handler return true when found.
 * @param opt
 * @returns
 */
export function findTreeData<T>(
  obj: T | T[],
  handler: FindTreeDataHandler<T>,
  opt: FindTreeDataOptions = {}
): T | undefined {
  const r = findInfoInTreeData(obj, handler, opt);
  return r?.node;
}
export type FindTreeDataHandler<T> = ReplaceReturnType<
  WalkTreeDataHandler<T>,
  any
>;
export type FindTreeDataOptions = WalkTreeDataOptions;

export function cloneTreeData<T>(
  root: T,
  options?: { childrenKey?: string; nodeHandler?: CloneTreeNodeHandler<any> }
) {
  const opt: typeof options = {
    childrenKey: "children",
  };
  if (options) {
    Object.assign(opt, options);
  }
  const { childrenKey, nodeHandler } = opt;
  const td = new TreeData();
  td.childrenKey = childrenKey;
  walkTreeData(
    root,
    (node, index, parent, path) => {
      let newNode = Object.assign({}, node);
      if (newNode[childrenKey]) {
        newNode[childrenKey] = [];
      }
      if (nodeHandler) {
        newNode = nodeHandler(newNode, { oldNode: node, index, parent, path });
      }
      td.set(path, newNode);
    },
    { childrenKey }
  );
  return td.data as T;
}

export type CloneTreeNodeHandler<T> = (
  node: T,
  info: {
    oldNode: T;
    index: number;
    parent: T | null;
    path: TreeDataPath;
  }
) => T;

// tree data helpers
export class TreeData<Node> {
  data: Node | Node[];
  childrenKey = "children";
  // data = null;
  constructor(data: Node | Node[] = []) {
    this.data = data;
  }
  get rootChildren(): Node[] {
    const { childrenKey } = this;
    const { data } = this;
    return isArray(data) ? data : data[childrenKey];
  }
  *iteratePath(
    path: TreeDataPath,
    opt: { reverse?: boolean } = {}
  ): IterableIterator<{ path: TreeDataPath; node: Node }> {
    const { childrenKey, rootChildren } = this;
    if (!opt.reverse) {
      let prevPath: number[] = [];
      let prevNode;
      let prevChildren = rootChildren;
      for (const index of path) {
        const currentPath = [...prevPath, index];
        const currentNode = prevChildren[index];
        yield { path: currentPath, node: currentNode };
        prevPath = currentPath;
        prevNode = currentNode;
        prevChildren = currentNode[childrenKey];
      }
    } else {
      const list = [...this.iteratePath(path, { ...opt, reverse: false })];
      list.reverse();
      for (const { path: path0, node } of list) {
        const path = <TreeDataPath>path0;
        yield { path, node };
      }
    }
  }
  getFamily(path: TreeDataPath) {
    const all: Node[] = [];
    for (const { node } of this.iteratePath(path)) {
      all.push(node);
    }
    return all;
  }
  get(path: TreeDataPath): Node {
    return arrayLast(this.getFamily(path));
  }
  getParentAndIndex(path: TreeDataPath) {
    const parentPath = path.slice();
    const index = parentPath.pop();
    return { parent: this.get(parentPath), index, parentPath };
  }
  getParent(path: TreeDataPath) {
    return this.getParentAndIndex(path).parent;
  }
  set(path: TreeDataPath, node: Node) {
    if (path == null || path.length === 0) {
      this.data = node;
    } else {
      const { childrenKey } = this;
      let { rootChildren } = this;
      const { parent, index } = this.getParentAndIndex(path);
      let parentChildren;
      if (path.length === 1) {
        // fix data
        if (!rootChildren) {
          if (this.data) {
            this.data[childrenKey] = [];
          } else {
            this.data = [];
          }
        }
        parentChildren = rootChildren;
      } else {
        if (!parent[childrenKey]) {
          parent[childrenKey] = [];
        }
        parentChildren = parent[childrenKey];
      }
      parentChildren[index] = node;
    }
  }
  delete(path: TreeDataPath): Node | undefined {
    const { childrenKey, rootChildren } = this;
    const { parent, index } = this.getParentAndIndex(path);
    const parentChildren =
      path.length === 1 ? rootChildren : parent[childrenKey];
    const node = parentChildren[index];
    parentChildren.splice(index, 1);
    return node;
  }
  walk(handler: WalkTreeDataHandler<Node>, opt?: { reverse?: boolean }) {
    const { childrenKey, data } = this;
    // @ts-ignore
    return walkTreeData(data, handler, childrenKey, opt);
  }
  clone(
    opt: {
      nodeHandler?: CloneTreeNodeHandler<Node>;
    } = {}
  ) {
    cloneTreeData;
    return (
      cloneTreeData(this.data),
      withoutUndefined({
        childrenKey: this.childrenKey,
        nodeHandler: opt.nodeHandler || undefined,
      })
    );
  }
}

// ## function
// ## 函数

/**
 * if it is function, return result, else return it directly.
 * @param valueOrGetter
 * @param args
 * @returns
 */
export function resolveValueOrGettter(valueOrGetter, args = []) {
  if (isFunction(valueOrGetter)) {
    return valueOrGetter(...args);
  } else {
    return valueOrGetter;
  }
}

/**
 * add executed count as first argument of func
 * 增加执行次数作为方法的第一个参数
 * @param func
 * @returns
 */
export function executeWithCount<T>(func: T) {
  let count = 0;
  function wrapper(...args) {
    // @ts-ignore
    return func.call(this, count++, ...args);
  }
  return wrapper as OmitFirstParameter<T>;
}

/**
 * (getVal, handler) => update . when execute update, call getVal and check if changed.
 * (getVal, handler) => update . 执行update时, 调用getVal并检查结果是否改变.
 * @param getVal
 * @param handler
 * @returns
 */
export function watchChange<T>(
  getVal: ReplaceReturnType<OmitFirstParameter<T>, any>,
  handler: T
) {
  let oldVal;
  const update = (...args) => {
    // @ts-ignore
    const newVal = getVal(...args);
    if (oldVal !== newVal) {
      // @ts-ignore
      handler(newVal, ...args);
    }
    oldVal = newVal;
  };
  return update as OmitFirstParameter<T>;
}

export function debounceTrailing<T>(action: T, wait = 0) {
  let t;
  let lastArgs; // when trailing, use last args
  let resolves = [];
  let rejects = [];
  const wrappedAction = function (...args) {
    return new Promise((resolve, reject) => {
      resolves.push(resolve);
      rejects.push(reject);
      //
      lastArgs = args;
      if (t) {
        clearTimeout(t);
      }
      t = setTimeout(() => {
        // @ts-ignore
        const result = action.call(this, ...lastArgs);
        t = null;
        resolves.forEach((resolve) => resolve(result));
        resolves = [];
        rejects = [];
      }, wait);
    });
  };
  const stop = () => {
    if (t) {
      clearTimeout(t);
      t = null;
    }
    resolves = [];
    rejects.forEach((reject) => reject());
    rejects = [];
  };
  // @ts-ignore
  return { action: wrappedAction as T, stop };
}

export function debounceImmediate<T>(action: T, wait = 0) {
  let t;
  let delaying;
  let result;
  const wrappedAction = function (...args) {
    return new Promise((resolve, reject) => {
      if (delaying) {
        resolve(result);
      } else {
        delaying = true;
        // @ts-ignore
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
  const stop = () => {
    if (t) {
      clearTimeout(t);
      t = null;
    }
    delaying = false;
  };
  // @ts-ignore
  return { action: wrappedAction as T, stop };
}

/**
 * the returned function only accept one argument
 * @param funcs
 * @returns
 */
export function joinFunctionsByResult(funcs: any[]) {
  let wrappedFunc = funcs[0];
  for (let i = 1; i < funcs.length; i++) {
    wrappedFunc = join2func(wrappedFunc, funcs[i]);
  }
  return wrappedFunc;
  function join2func(func1, func2) {
    return function (arg) {
      const result1 = func1(arg);
      return func2(result1);
    };
  }
}

/**
 * apply finally function to a function, execute it after target return, event it error
 * 在目标方法结束或出错后执行另一方法
 * @param func
 * @param finallyFunc
 * @returns
 */
export function applyFinally<T extends Function, Y extends Function>(
  func: T,
  finallyFunc: Y
) {
  const wrapped = function (...args) {
    let r, e;
    try {
      r = func(...args);
    } catch (error) {
      e = error;
    } finally {
      finallyFunc();
    }
    if (!e) {
      return r;
    } else {
      throw e;
    }
  };
  // @ts-ignore
  return wrapped as T;
}

/**
 * must pass arguments to `next` manually
 * @param funcs
 * @returns
 */
export function joinFunctionsByNext(funcs: any[]) {
  let next = () => {};
  for (const { value: func } of iterateAll(funcs, { reverse: true })) {
    const currentNext = next;
    next = wrapFuncWithNext(func, currentNext);
  }
  return next;
  function wrapFuncWithNext(func, next) {
    return function (...args) {
      return func(next, ...args);
    };
  }
}

/**
 * wrap function, bind context(this).
 * @param action
 * @param context
 * @returns
 */
export function bindContext<T extends Function>(action: T, context: any): T {
  const wrapped = function (...args: any) {
    return action.apply(context, args);
  };
  // @ts-ignore
  return wrapped;
}

/**
 * Cache function return by arguments
 * @param func
 * @returns
 */
export function cacheFunction<T extends Function>(
  func: T,
  options: { capacity?: number } = {}
) {
  const cachedArgsArr = [];
  let map: ArrayKeyMap<any>;
  const defaultValue = {};
  let noArgsCache = defaultValue;
  const wrapped = function (...args: any[]) {
    if (args.length === 0) {
      if (noArgsCache === defaultValue) {
        noArgsCache = func();
      }
      return noArgsCache;
    }
    if (!map) {
      map = new ArrayKeyMap();
    }
    if (!map.has(args)) {
      map.set(args, func(...args));
      if (options.capacity != null) {
        cachedArgsArr.push(args);
        const removed = cachedArgsArr.splice(
          0,
          cachedArgsArr.length - options.capacity
        );
        for (const args of removed) {
          map.delete(args);
        }
      }
    }
    return map.get(args);
  };
  const clearCache = () => {
    map = null;
    cachedArgsArr.splice(0, cachedArgsArr.length);
  };
  return {
    // @ts-ignore
    action: wrapped as T,
    clearCache,
  };
}

// ## promise

/**
 * execute promise in sequence
 * @param getters
 * @param concurrent
 * @returns
 */
export function executePromiseGetters(getters: (() => any)[], concurrent = 1) {
  let stopped;
  const promise = new Promise(async function (resolve, reject) {
    const chunks = splitArray(getters, concurrent);
    const promises = [];
    for (const chunk of chunks) {
      const chunkPromises = chunk.map((v) => v());
      promises.push(...chunkPromises);
      await Promise.all(chunkPromises);
      if (stopped) {
        break;
      }
    }
    Promise.all(promises).then((...args) => {
      resolve(...args);
    });
  });
  return {
    promise,
    stop() {
      stopped = true;
    },
  };
}

export function promiseTimeout<T>(promise: Promise<T>, timeout: number) {
  return new Promise((resolve, reject) => {
    let t, rejected;
    promise.then(
      (...args) => {
        clearTimeout(t);
        resolve(...args);
      },
      (...args) => {
        if (!rejected) {
          clearTimeout(t);
          reject(...args);
        }
      }
    );
    t = setTimeout(() => {
      rejected = true;
      const e = new Error("Promise timeout!");
      e.name = "timeout";
      reject(e);
    }, timeout);
  });
}

export function promisePin<T, E>() {
  let resolve: (arg: T) => void, reject: (error: E) => void;
  const promise = new Promise<T>((resolve2, reject2) => {
    resolve = resolve2;
    reject = reject2;
  });
  return { promise, resolve, reject };
}

/**
 * warp continuous Promise method, such as mousemove handler
 * @param method
 * @param opt. strategy 'last': the wrapped method return empty if skipped
 */
export function continuous<
  T extends (
    info: { count: number; currentCount: { value: number } },
    ...args: any[]
  ) => any
>(method: T, opt?: { strategy: "every" | "last"; resetCount?: boolean }) {
  // default options
  if (!opt) {
    // @ts-ignore
    opt = {};
  }
  objectAssignIfNoKey(opt, {
    strategy: "every",
  });
  //
  type Args = ParametersWithoutFirst<T>;
  const queue: {
    count: number;
    args: Args;
    done: ReturnType<typeof promisePin>;
    skipped?: boolean;
  }[] = [];
  let working = false;
  const currentCount = { value: 0 };
  return async function (...args: Args) {
    currentCount.value++;
    const count = currentCount.value;
    const done = promisePin();
    queue.push({ count, args, done });
    if (!working) {
      working = true;
      task();
    }
    return done.promise as Promise<ReturnType<T> | void>;
  };
  async function task() {
    if (opt.strategy === "every") {
      while (queue.length > 0) {
        const { count, args, done } = queue.shift();
        let r = method({ count, currentCount }, ...args);
        try {
          await r;
        } catch (error) {
        } finally {
          done.resolve(r);
        }
      }
    } else if (opt.strategy === "last") {
      let currentIndex = -1;
      while (
        queue.length > 0 &&
        (currentIndex === -1 || queue.length - 1 > currentIndex)
      ) {
        currentIndex = queue.length - 1;
        const item = queue[currentIndex];
        const { count, args, done } = item;
        let r = method({ count, currentCount }, ...args);
        try {
          await r;
        } catch (error) {
        } finally {
          done.resolve(r);
          item.skipped = false;
        }
      }
      for (let index = currentIndex - 1; index >= 0; index--) {
        const item = queue[index];
        // skip before last
        if (!item || item.skipped != null) {
          continue;
        } else {
          item.skipped = true;
          // @ts-ignore
          item.done.resolve();
        }
      }
      queue.splice(0, queue.length);
    }
    if (opt.resetCount) {
      currentCount.value = 0;
    }
    working = false;
  }
}
export const promiseContinuous = continuous;

// ## url

export function getUrlParam(par: string) {
  // 获取当前URL
  var local_url = document.location.href;
  // 获取要取得的get参数位置
  var get = local_url.indexOf(par + "=");
  if (get == -1) {
    return false;
  }
  // 截取字符串
  var get_par = local_url.slice(par.length + get + 1);
  // 判断截取后的字符串是否还有其他get参数
  var nextPar = get_par.indexOf("&");
  if (nextPar != -1) {
    get_par = get_par.slice(0, nextPar);
  }
  return get_par;
}

export function pathJoin(p1: string, p2: string) {
  if (!p2) {
    return p1;
  }
  if (!p1 || p2.match(/^\w+:/)) {
    return p2;
  }
  if (p1 && !p1.endsWith("/")) {
    p1 = p1 + "/";
  }
  if (p1 && p2.startsWith("/")) {
    p2 = p2.substring(1);
  }
  return p1 + p2;
}

// ## dom

/**
 * return NodeList if there are multiple top-level nodes
 * @param htmlString
 * @returns
 */
export function createElementFromHTML(htmlString: string) {
  var div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  if (div.childNodes.length > 1) {
    return div.childNodes;
  } else {
    return div.childNodes[0];
  }
}

/**
 * NOT RECOMMEND. Use Node.contains instead.
 */
export function isDescendantOf(el: Node, parent: Node) {
  while (true) {
    if (el.parentNode == null) {
      return false;
    } else if (el.parentNode === parent) {
      return true;
    } else {
      el = el.parentNode;
    }
  }
}

export function pointIn(x: number, y: number, element: Element | Node) {
  const rect = getBoundingClientRect(element as Element);
  return (
    x >= rect.x &&
    x <= rect.x + rect.width &&
    y >= rect.y &&
    y <= rect.y + rect.height
  );
}

export function removeEl(el: Node | Node) {
  if (el.parentNode !== null) {
    return el.parentNode.removeChild(el);
  }
}

/**
 * get page root scroll(body or documentElement). refer: https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
 * @returns
 */
export function getScroll() {
  if (typeof pageYOffset != "undefined") {
    //most browsers except IE before #9
    return {
      top: pageYOffset,
      left: pageXOffset,
    };
  } else {
    var B = document.body; //IE 'quirks'
    var D = document.documentElement; //IE with doctype
    D = D.clientHeight ? D : B;
    return {
      top: D.scrollTop,
      left: D.scrollLeft,
    };
  }
}

/**
 * relative to page root element(document.documentElement). refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1
 * 相对于页面根元素.(document.documentElement)
 * @param el
 * @returns
 */
export function getOffset(el: Element) {
  const rect = getBoundingClientRect(el);
  const t = getBoundingClientRect(document.documentElement);

  return {
    x: rect.left - t.left,
    y: rect.top - t.top,
  };
}

/**
 * there is some trap in el.offsetParent, so use this func to fix
 * @param el
 * @returns
 */
export function getOffsetParent(el: HTMLElement) {
  let offsetParent = el.offsetParent;
  if (
    !offsetParent ||
    (offsetParent === document.body &&
      getComputedStyle(document.body).position === "static")
  ) {
    offsetParent = document.body.parentElement;
  }
  return offsetParent as HTMLElement;
}

/**
 * get el current position. like jQuery.position. The position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.
 * 相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.
 * @param el
 * @returns
 */
export function getPosition(el: HTMLElement) {
  const offsetParent = getOffsetParent(el);
  const ps = { x: el.offsetLeft, y: el.offsetTop };
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
}

/**
 * like jQuery.offset(x, y), but it just return cmputed position, don't update style
 * 类似 jQuery.offset的设置功能, 但是它只返回计算的position, 不改变元素样式.
 * @param el
 * @param of
 * @returns
 */
export function getPositionFromOffset(
  el: HTMLElement,
  of: { x: number; y: number }
) {
  const offsetParent = getOffsetParent(el);
  const parentOf = getOffset(offsetParent);
  return {
    x: of.x - parentOf.x,
    y: of.y - parentOf.y,
  };
}

/**
 * relative to viewport. like position fixed. alias getViewportPosition
 * 相对于视口. 类似 position fixed. 别名 getViewportPosition
 * @param el
 * @returns
 */
export function getBoundingClientRect(el: Element) {
  // refer: http://www.51xuediannao.com/javascript/getBoundingClientRect.html
  let xy = el.getBoundingClientRect();
  if (document.documentElement.clientTop > 0) {
    const top = xy.top - document.documentElement.clientTop, //document.documentElement.clientTop 在IE67中始终为2，其他高级点的浏览器为0
      bottom = xy.bottom,
      left = xy.left - document.documentElement.clientLeft, //document.documentElement.clientLeft 在IE67中始终为2，其他高级点的浏览器为0
      right = xy.right,
      width = xy.width || right - left, //IE67不存在width 使用right - left获得
      height = xy.height || bottom - top;
    const x = left;
    const y = top;
    const json = { top, right, bottom, left, width, height, x, y };
    xy = { ...json, toJSON: () => json };
  }
  return xy;
}

// refer [getBoundingClientRect](#getBoundingClientRect)
export const getViewportPosition = getBoundingClientRect;
export type ViewportPosition = ReturnType<typeof getViewportPosition>;

/**
 * position fixed is not always related to viewport.
 * position fixed不总是相对于视口.
 * 参考/Check: https://developer.mozilla.org/en-US/docs/Web/CSS/position
 * @param el
 * @param viewportPosition
 */
export function viewportPositionToFixed(
  el: Node,
  viewportPosition: { x: number; y: number }
) {
  const div = document.createElement("div");
  Object.assign(div.style, {
    position: "fixed",
    visibility: "hidden",
    top: "0px",
    left: "0px",
  });
  insertAfter(div, el);
  const divVP = getViewportPosition(div);
  const offset = { x: 0 - divVP.x, y: 0 - divVP.y };
  return {
    x: viewportPosition.x + offset.x,
    y: viewportPosition.x + offset.y,
  };
}

export function findParent<T extends Element>(
  el: T,
  callback: (parentEl: Element) => boolean | "break" | undefined | void,
  opt: { withSelf?: boolean; until?: Element; withUntil?: boolean } = {}
) {
  let cur = opt && opt.withSelf ? el : el.parentElement;
  while (cur) {
    const shouldBreak = opt.until && cur === opt.until;
    if (shouldBreak && !opt.withUntil) {
      return;
    }
    const r = callback(cur);
    if (r === "break") {
      return;
    } else if (r) {
      return cur;
    } else if (shouldBreak) {
      return;
    } else {
      cur = cur.parentElement;
    }
  }
}

export function backupAttr(el: Element, name: string) {
  const key = `original_${name}`;
  el[key] = el.getAttribute(name);
}

export function restoreAttr(el: Element, name: string) {
  const key = `original_${name}`;
  const value = el[key];
  if (value == null) {
    el.removeAttribute(name);
  } else {
    el.setAttribute(name, value);
  }
}

// source: http://youmightnotneedjquery.com/
export function hasClass(el: Element, className: string) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
  }
}

/**
 * has all classNames
 * @param el
 * @param classNames
 */
export function hasClasses(el: Element, classNames: string[]) {
  for (const className of classNames) {
    if (!hasClass(el, className)) {
      return false;
    }
  }
  return true;
}

/**
 * has any class in classNames
 * @param el
 * @param classNames
 * @returns
 */
export function hasClassIn(el: Element, classNames: string[]) {
  for (const className of classNames) {
    if (hasClass(el, className)) {
      return true;
    }
  }
  return false;
}

// source: http://youmightnotneedjquery.com/
export function addClass(el: Element, className: string | string[]) {
  const t = toArrayIfNot(className);
  for (const className of t) {
    if (!hasClass(el, className)) {
      if (el.classList) {
        el.classList.add(className);
      } else {
        el.className += " " + className;
      }
    }
  }
}

// source: http://youmightnotneedjquery.com/
export function removeClass(el: Element, className: string | string[]) {
  const t = toArrayIfNot(className);
  for (const className of t) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
    }
  }
}

export function getElSizeEvenInvisible(el: HTMLElement) {
  backupAttr(el, "style");
  el.style.display = "block";
  const t = getBoundingClientRect(el);
  const size = {
    width: t.width,
    height: t.height,
  };
  restoreAttr(el, "style");
  return size;
}

/**
 * [isOffsetInEl]
 * @param {Number} x
 * @param {Number} y
 * @param {Object} el HTML Element
 */
export function isOffsetInEl(x: number, y: number, el: HTMLElement) {
  const offset = getOffset(el);
  return (
    offset.x <= x &&
    offset.x + el.offsetWidth >= x &&
    offset.y <= y &&
    offset.y + el.offsetHeight >= y
  );
}

export function setElChildByIndex(el: Node, child: Node, index: number) {
  // @ts-ignore
  child.childComponentIndex = index;
  const len = el.childNodes.length;
  if (len === 0) {
    el.appendChild(child);
  } else if (index === 0) {
    el.insertBefore(child, el.childNodes[0]);
  } else {
    const {
      index: nearestIndex,
      value: nearest,
      greater,
    } = binarySearch(
      // @ts-ignore
      el.childNodes,
      (el) => {
        return el["childComponentIndex"] - index;
      },
      {
        start: 0,
        end: notGreaterThan(index, len - 1),
        returnNearestIfNoHit: true,
      }
    );
    if (greater) {
      // @ts-ignore
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
}

/**
 * listen event on element
 * @param el
 * @param name
 * @param handler
 * @param options
 */
export function on<T extends Event>(
  el: Node | Window | Document,
  name: string,
  handler: (event: T) => void,
  options?: boolean | AddEventListenerOptions
) {
  if (el.addEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.addEventListener(name, handler, options);
    // @ts-ignore
  } else if (el.attachEvent) {
    // IE 8 及更早 IE 版本
    // @ts-ignore
    el.attachEvent(`on${name}`, handler, options);
  }
}

/**
 * cancel event lisitener on element
 * @param el
 * @param name
 * @param handler
 * @param options
 */
export function off<T extends Event>(
  el: Node | Window | Document,
  name: string,
  handler: (event: T) => void,
  options?: boolean | AddEventListenerOptions
) {
  if (el.removeEventListener) {
    // 所有主流浏览器，除了 IE 8 及更早 IE版本
    el.removeEventListener(name, handler, options);
    // @ts-ignore
  } else if (el.detachEvent) {
    // IE 8 及更早 IE 版本
    // @ts-ignore
    el.detachEvent(`on${name}`, handler, options);
  }
}

/**
 * listen event on element once. return destroy function
 * @param el
 * @param name
 * @param handler
 * @param options
 * @returns destroy
 */
export function once<T extends Event>(
  el: Node | Window | Document,
  name: string,
  handler: (event: T) => void,
  options?: boolean | AddEventListenerOptions
) {
  const onceHandler = function (...args) {
    // @ts-ignore
    let r = handler.call(this, ...args); // prettier-ignore
    destroy();
    return r;
  };
  on(el, name, onceHandler, options);
  let destroied = false;
  const destroy = () => {
    if (!destroied) {
      off(el, name, onceHandler, options);
    }
    destroied = true;
  };
  return destroy;
}

/**
 * lisiten multi events, and can stop and resume them
 * @param info
 * @returns
 */
export function extendedListen(
  info: [
    element: Element | Window | Document,
    name: string,
    handler: (event: any) => void,
    options?: boolean | AddEventListenerOptions
  ][]
) {
  let destroyFuncs = [];
  const listenAll = () => {
    if (r.listening) {
      return;
    }
    for (const item of info) {
      on.apply(this, item);
      const destroy = () => off.apply(this, item);
      destroyFuncs.push(destroy);
    }
    r.listening = true;
  };
  const destroyAll = () => {
    if (!r.listening) {
      return;
    }
    for (const destroy of destroyFuncs) {
      destroy();
    }
    destroyFuncs = [];
    r.listening = false;
  };
  const r = {
    listening: false,
    stop: destroyAll,
    resume: listenAll,
  };
  return r;
}

export function getImageSizeByUrl(url: string) {
  const image = document.createElement("img");
  return new Promise<{ width: number; height: number }>(function (
    resolve,
    reject
  ) {
    on(image, "load", () => {
      resolve({ width: image.width, height: image.height });
    });
    on(image, "error", (e) => {
      reject(e);
    });
    image.src = url;
  });
}

export function elementsFromPoint(x: number, y: number): Element[] {
  const args = [x, y];
  const func =
    document.elementsFromPoint ||
    // @ts-ignore
    document.msElementsFromPoint ||
    elementsFromPoint;
  return func.apply(document, args);
  function elementsFromPoint(x, y) {
    const parents = [];
    let parent = void 0;
    do {
      if (parent !== document.elementFromPoint(x, y)) {
        parent = document.elementFromPoint(x, y);
        parents.push(parent);
        parent.style.pointerEvents = "none";
        parent["_pointerEvents_backup"] = parent.style.pointerEvents;
      } else {
        parent = false;
      }
    } while (parent);
    parents.forEach(function (parent) {
      return (parent.style.pointerEvents = parent["_pointerEvents_backup"]);
    });
    return parents;
  }
}

export function getOuterAttachedHeight(
  el: Element,
  opt: { margin?: boolean; border?: boolean } = {}
) {
  opt = {
    margin: true,
    border: true,
    ...opt,
  };
  const stl = getComputedStyle(el);
  let r = 0;
  const arr = [];
  if (opt.margin) {
    arr.push("margin-top", "margin-bottom");
  }
  if (opt.border) {
    arr.push("border-top-width", "border-bottom-width");
  }
  arr.forEach((key) => {
    r += parseFloat(stl[key]);
  });
  return r;
}

export function getOuterAttachedWidth(
  el: Element,
  opt: { margin?: boolean; border?: boolean } = {}
) {
  opt = {
    margin: true,
    border: true,
    ...opt,
  };
  const stl = getComputedStyle(el);
  let r = 0;
  const arr = [];
  if (opt.margin) {
    arr.push("margin-left", "margin-right");
  }
  if (opt.border) {
    arr.push("border-left-width", "border-right-width");
  }
  arr.forEach((key) => {
    r += parseFloat(stl[key]);
  });
  return r;
}
/**
 * like jquery $(el).css(), but only can read
 * @param el
 * @param name
 * @returns
 */
export function css(el: Element, name: string): string | undefined {
  const stl = getComputedStyle(el);
  return stl[name];
}

export function cssNumber(el: Element, name: string) {
  return parseFloat(css(el, name));
}

export function isScrollable(el: Element, direction: "x" | "y") {
  const key = "overflow" + direction.toUpperCase();
  const values = ["auto", "scroll", "overlay"];
  if (el === document.scrollingElement) {
    values.push("visible");
  }
  return values.includes(css(el, key));
}

/**
 * scrollLeft, scrollRight, scrollTop, scrollBottom.
 * IMPORTANT! The min value of  scrollRight and scrollBottom may be a float less than 1, not zero.
 * 重要! scrollRight和scrollBottom的最小值可能是小于1的小数, 而不是0.
 * @param el
 * @param direction
 * @returns
 */
export function getScrollSpace(
  el: Element,
  direction: "left" | "right" | "top" | "bottom"
) {
  let space: number;
  if (direction === "left") {
    space = el.scrollLeft;
  } else if (direction === "top") {
    space = el.scrollTop;
  } else {
    if (direction === "right") {
      space = el.scrollWidth - el.clientWidth - el.scrollLeft;
    } else {
      // bottom
      space = el.scrollHeight - el.clientHeight - el.scrollTop;
    }
  }
  return space;
}

/* scroll to a positon with duration
from https://gist.github.com/andjosh/6764939
interface options{
  x: number // nullable. don't scroll horizontally when null
  y: number // nullable. don't scroll vertically when null
  duration: number // default 0
  element: Node // default is the top scrollable element.
  beforeEveryFrame: (count: number) => boolean|void // call before requestAnimationFrame execution. return false to stop
}
return stop
*/
export function scrollTo(options: {
  x?: number;
  y?: number;
  duration?: number;
  element?: Element;
  beforeEveryFrame?: (count: number) => boolean | void; // return false to stop
}) {
  if (!options.element) {
    options.element = document.scrollingElement || document.documentElement;
  }
  if (options.duration == null) {
    options.duration = 0;
  }
  const { x, y, duration, element } = options;
  let requestAnimationFrameId;
  let count = 0;
  const startY = element.scrollTop,
    changeY = y - startY,
    startX = element.scrollLeft,
    changeX = x - startX,
    startDate = +new Date(),
    animateScroll = function () {
      if (
        options.beforeEveryFrame &&
        options.beforeEveryFrame(count) === false
      ) {
        return;
      }
      const currentDate = new Date().getTime();
      const changedTime = currentDate - startDate;
      if (y != null) {
        element.scrollTop = parseInt(
          calc(startY, changeY, changedTime, duration)
        );
      }
      if (x != null) {
        element.scrollLeft = parseInt(
          calc(startX, changeX, changedTime, duration)
        );
      }
      if (changedTime < duration) {
        requestAnimationFrameId = requestAnimationFrame(animateScroll);
      } else {
        if (y != null) {
          element.scrollTop = y;
        }
        if (x != null) {
          element.scrollLeft = x;
        }
      }
      count++;
    };
  const stop = () => {
    cancelAnimationFrame(requestAnimationFrameId);
  };
  animateScroll();
  // return stop
  return stop;
  function calc(startValue, changeInValue, changedTime, duration) {
    return startValue + changeInValue * (changedTime / duration);
  }
}

// ### DOM structure
export function insertBefore(el: Node, target: Node) {
  target.parentElement.insertBefore(el, target);
}
export function insertAfter(el: Node, target: Node) {
  target.parentElement.insertBefore(el, target.nextSibling);
}
export function prependTo(el: Node, target: Node) {
  target.insertBefore(el, target.firstChild);
}
export function appendTo(el: Node, target: Node) {
  target.appendChild(el);
}

// ## Date

export function cloneDate(dateObj: Date) {
  return new Date(dateObj.getTime());
}

// day and date is same
export function addDate(
  dateObj: Date,
  n: number,
  type:
    | "year"
    | "month"
    | "day"
    | "date"
    | "hour"
    | "minute"
    | "second"
    | "millisecond"
) {
  if (!["year", "month", "day", "date"].includes(type)) {
    type += "s";
  }
  let type2 = studlyCase(type);
  if (type2 === "Day") {
    type2 = "Date";
  }
  var setFuncName = "set" + type2;
  var getFuncName = "get" + type2;
  dateObj[setFuncName](dateObj[getFuncName]() + n);
  return dateObj;
}

export function getMonthStart(dateObj: Date) {
  const clonedObj = cloneDate(dateObj);
  clonedObj.setDate(1);
  return clonedObj;
}

export function getMonthEnd(dateObj: Date) {
  const r = cloneDate(dateObj);
  addDate(r, 1, "month");
  r.setDate(0);
  return r;
}

export type GetCalendarDay = {
  year: number;
  month: number;
  date: number;
  text: number;
  prevMonth?: boolean;
  currentMonth?: boolean;
  nextMonth?: boolean;
};
/**
 * startWeekDay: 0 is Sunday
 * @param year
 * @param month
 * @param startWeekDay
 * @returns [GetCalendarDay x 7][]
 */
export function getCalendar(
  year: number,
  month: number,
  startWeekDay = 0
): GetCalendarDay[][] {
  const results = [];
  const date = new Date(year, month - 1);
  year = date.getFullYear();
  month = date.getMonth() + 1;
  const monthStart = getMonthStart(date);
  const monthStartDay = monthStart.getDay();
  const calendarStart = addDate(
    cloneDate(monthStart),
    -(monthStartDay + startWeekDay),
    "day"
  );
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
        prevMonth: true,
      });
    }
  }
  //
  const monthEnd = getMonthEnd(date);
  const monthEndtDate = monthEnd.getDate();
  for (let i = 1; i <= monthEndtDate; i++) {
    const date = i;
    results.push({
      year: year,
      month: month,
      date,
      text: date,
      currentMonth: true,
    });
  }
  //
  const monthEndDay = monthEnd.getDay();
  const endWeekDay = 6 - startWeekDay;
  if (monthEndDay < endWeekDay) {
    const nextMonth = addDate(cloneDate(date), 1, "month");
    const year = nextMonth.getFullYear();
    const month = nextMonth.getMonth() + 1;
    for (let i = monthEndDay + 1, date = 1; i <= endWeekDay; i++, date++) {
      results.push({
        year: year,
        month: month,
        date: date,
        text: date,
        nextMonth: true,
      });
    }
  }
  //
  return splitArray(results, 7);
}

/**
 * timezone must be UTC. eg: 2018-09-07T03:38:37.888Z
 * @param str
 * @returns
 */
export function isIsoFormat(str: string) {
  return Boolean(
    str.length > 15 && str.length < 30 && str.match(/^\d{4}-\d{2}-\d{2}T.*Z$/)
  );
}

/**
 *
 * @param timestamp eg: 2018-09-07T03:38:37.888Z
 * @returns
 */
export function parseISO(timestamp: string) {
  const [datePart, timePart] = timestamp.split("T");
  let y,
    m,
    d,
    h = 0,
    min = 0,
    s = 0;
  [y, m, d] = datePart.split("-").map((v) => parseInt(v));
  m = m - 1;
  if (timePart) {
    const t = timePart.split(":").map((v) => parseFloat(v));
    h = t[0];
    if (t[1] != null) {
      min = t[1];
    }
    if (t[2] != null) {
      s = t[2];
    }
  }
  const dt = new Date();
  dt.setUTCFullYear(y);
  dt.setUTCMonth(m);
  dt.setUTCDate(d);
  dt.setUTCHours(h);
  dt.setUTCMinutes(min);
  dt.setUTCSeconds(s);
  return dt;
}

// ## advanced

export type BinarySearchReturn<T> = {
  index: number;
  value: T;
  count: number;
  hit: boolean;
  greater?: boolean;
} | null;
export interface BinarySearchOptions {
  start?: number;
  end?: number;
  returnNearestIfNoHit?: boolean;
  maxTimes?: number;
}
/**
 * binarySearch, 二分查找
 * @param arr
 * @param callback return `mid - your_value` for ascending array
 * @param opt
 * @returns
 */
export function binarySearch<T>(
  arr: T[],
  callback: (mid: T, index: number, count: number) => number,
  opt: BinarySearchOptions = {}
): BinarySearchReturn<T> {
  opt = {
    start: 0,
    end: arr.length - 1,
    maxTimes: 1000,
    ...opt,
  };
  let { start, end } = opt;
  const { returnNearestIfNoHit, maxTimes } = opt;
  let midNum;
  let mid;
  if (start == null) {
    start = 0;
    end = arr.length - 1;
  }
  let i = 0;
  let r;
  while (start >= 0 && start <= end) {
    if (i >= maxTimes) {
      throw Error(
        `binarySearch: loop times is over ${maxTimes}, you can increase the limit.`
      );
    }
    midNum = Math.floor((end - start) / 2 + start);
    mid = arr[midNum];
    const count = i + 1;
    r = callback(mid, midNum, count);
    if (r > 0) {
      end = midNum - 1;
    } else if (r < 0) {
      start = midNum + 1;
    } else {
      return { index: midNum as number, value: mid as T, count, hit: true };
    }
    i++;
  }
  return returnNearestIfNoHit
    ? {
        index: midNum as number,
        value: mid as T,
        count: i + 1,
        hit: false,
        greater: r > 0,
      }
    : null;
}

//
export function windowLoaded() {
  return new Promise<void>(function (resolve, reject) {
    if (document && document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", function once() {
        resolve();
        window.removeEventListener("load", once);
      });
    }
  });
}

export function waitTime(milliseconds: number, callback?: () => void) {
  return new Promise<void>(function (resolve, reject) {
    setTimeout(function () {
      callback && callback();
      resolve();
    }, milliseconds);
  });
}

export function waitFor(condition: () => boolean, time = 100, maxTimes = 1000) {
  let interval;
  const promise = new Promise<void>(function (resolve, reject) {
    let count = 0;
    function judge() {
      if (count <= maxTimes) {
        if (condition()) {
          stop();
          resolve();
        }
      } else {
        stop();
        reject(new Error("waitFor: Limit is reached"));
      }
      count++;
    }
    interval = setInterval(function () {
      judge();
    }, time);
    judge();
  });
  return { promise, stop };
  function stop() {
    clearInterval(interval);
  }
}

export async function retry(action: any, limitTimes = 3) {
  for (let index = 1; index <= limitTimes; index++) {
    try {
      // @ts-ignore
      return await action();
    } catch (error) {
      if (index === limitTimes) {
        throw error;
      }
    }
  }
}

/**
 * Copy to text to clipboard. Async not supported. Recommend clipboard-polyfill.
 * 复制文字到剪贴板. 仅限于简单使用, 不支持异步. 复杂环境推荐clipboard-polyfill
 * @param text
 * @returns
 */
export function copyTextToClipboard(text: string) {
  try {
    // use latest api
    navigator.clipboard.writeText(text);
    return;
  } catch (e) {}
  var textArea = document.createElement("textarea");

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
  textArea.style.position = "fixed";
  textArea.style.top = "0";
  textArea.style.left = "0";

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = "2em";
  textArea.style.height = "2em";

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = "0";

  // Clean up any borders.
  textArea.style.border = "none";
  textArea.style.outline = "none";
  textArea.style.boxShadow = "none";

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = "transparent";

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Copying text command was " + msg);
  } catch (err) {
    console.log("Oops, unable to copy");
  }

  document.body.removeChild(textArea);
}

export function isWindowDefined() {
  try {
    return window && true;
  } catch (error) {
    return false;
  }
}

export function isNode() {
  // @ts-ignore
  return Boolean(typeof glb().module !== "undefined" && glb().module.exports);
}

export function isIE() {
  // @ts-ignore
  return Boolean(window.ActiveXObject || "ActiveXObject" in window);
}

/*
https://developer.mozilla.org/docs/Web/API/Window/open
http://www.w3school.com.cn/htmldom/met_win_open.asp#windowfeatures
*/
export function openWindow(url: string, name: string, opt: any = {}) {
  window.open(
    url,
    name,
    Object.keys(opt)
      .map((k) => `${k}=${opt[k]}`)
      .join(",")
  );
}

export function openCenterWindow(
  url: string,
  name: string,
  width: number,
  height: number,
  opt: any = {}
) {
  const t = {
    width,
    height,
    top: (window.screen.availHeight - 30 - height) / 2,
    left: (window.screen.availWidth - 30 - width) / 2,
  };
  Object.assign(t, opt);
  openWindow(url, name, t);
}

export function openPreviewWindow(
  previewUrl: string,
  name = "preview",
  width = 1000,
  height = 800
) {
  return openCenterWindow(previewUrl, name, width, height, {
    directories: "no",
    titlebar: "no",
    toolbar: "no",
    location: "no",
    status: "no",
    menubar: "no",
  });
}

export class URLHelper {
  baseUrl = ""; // protocol, hostname, port, pastname
  search: { [key: string]: string } = {};
  constructor(baseUrl: string) {
    let t = decodeURI(baseUrl).split("?");
    this.baseUrl = t[0];
    if (t[1]) {
      t[1].split("&").forEach((v) => {
        let t2 = v.split("=");
        this.search[t2[0]] = t2[1] == null ? "" : decodeURIComponent(t2[1]);
      });
    }
  }
  getHref() {
    const t = [this.baseUrl];
    let searchStr = Object.keys(this.search)
      .map((k) => `${k}=${encodeURIComponent(this.search[k])}`)
      .join("&");
    if (searchStr) {
      t.push(searchStr);
    }
    return t.join("?");
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
export function resolveArgsByType(args: any[], types: any[]) {
  let argIndex = 0;
  return types.map((v) => {
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
        rule = (x) => Object.prototype.toString.call(x) === `[object ${t}]`;
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
}

export function makeStorageHelper<T extends Storage>(storage: T) {
  return {
    storage: storage as T,
    set(name: string, value: any, minutes: number) {
      // set null can remove a item
      if (value == null) {
        this.storage.removeItem(name);
      } else {
        this.storage.setItem(
          name,
          JSON.stringify({
            value,
            expired_at: minutes
              ? new Date().getTime() + minutes * 60 * 1000
              : null,
          })
        );
      }
    },
    get(name: string) {
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
    },
  };
}

export const extendedLocalStorage = cacheFunction(function () {
  return makeStorageHelper(localStorage);
});

export const extendedSessionStorage = cacheFunction(function () {
  return makeStorageHelper(sessionStorage);
});

/**
 * Base event process. like event bus
 * 事件处理. 类似event bus
 */
export class EventProcessor {
  eventStore = [];
  on(name: string, handler: any) {
    this.eventStore.push({ name, handler });
  }
  once(name: string, handler: any) {
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
  onceTimeout(name: string, handler: any, timeout: number) {
    let off;
    const promise = new Promise<void>((resolve, reject) => {
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
    return { off: off2, promise };
  }
  off(name: string, handler: any) {
    const indexes = []; // to remove indexes; reverse; 倒序的
    const len = this.eventStore.length;
    for (let i = 0; i < len; i++) {
      const item = this.eventStore[i];
      if (item.name === name && item.handler === handler) {
        indexes.unshift(i);
      }
    }
    for (const index of indexes) {
      this.eventStore.splice(index, 1);
    }
  }
  emit(name: string, ...args: any[]) {
    // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
    const items = [];
    for (const item of this.eventStore) {
      if (item.name === name) {
        items.push(item);
      }
    }
    for (const item of items) {
      item.handler(...args);
    }
  }
}

/**
 * Pass event cross window
 */
export class CrossWindowEventProcessor extends EventProcessor {
  storageName = "_crossWindow";
  windows = [];
  timeout = 200;
  id: string;
  ready: Promise<void>;
  // id
  constructor(opt: { timeout?: number }) {
    super();
    if (opt) {
      Object.assign(this, opt);
    }
    on(window, "storage", (ev: StorageEvent) => {
      if (ev.key === this.storageName) {
        const event = JSON.parse(ev.newValue);
        if (!event.targets || event.targets.includes(this.id)) {
          this.emitLocal(event.name, ...event.args);
        }
      }
    });
    // social parts 集体部分
    // join
    this.id = randString();
    this.windows = [this.id];
    this.ready = new Promise((resolve, reject) => {
      this.onceTimeout(
        "_windows_updated",
        ({ windows }) => {
          this.windows = windows;
        },
        this.timeout
      ).promise.then(
        () => {
          resolve();
          // responsed 被响应
        },
        () => {
          // no response 无响应
          resolve();
        }
      );
      this.broadcast("_join", this.id);
    });
    this.ready.then(() => {
      // on join
      this.on("_join", (id) => {
        this.windows.push(id);
        if (this.isMain()) {
          this.broadcast("_windows_updated", {
            windows: this.windows,
            type: "join",
            id,
          });
        }
      });
      // on _windows_updated
      this.on("_windows_updated", ({ windows }) => {
        this.windows = windows;
      });
      // on exit
      this.on("_exit", (id) => {
        const oldMain = this.windows[0];
        arrayRemove(this.windows, id);
        if (this.isMain()) {
          this.emit("_windows_updated", {
            windows: this.windows,
            type: "exit",
            id,
          });
          if (oldMain != this.id) {
            this.emit("_main_updated", {
              windows: this.windows,
              old: oldMain,
              new: this.id,
            });
          }
        }
      });
      on(window, "beforeunload", () => {
        this.exitGroup();
      });
    });
  }
  isMain() {
    return this.id === this.windows[0];
  }
  BROADCAST = "__BROADCAST__";
  emitTo(name: string, targets, ...args) {
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
    glb().localStorage.setItem(
      this.storageName,
      JSON.stringify({
        name,
        targets,
        args,
        // use random make storage event triggered every time
        // 加入随机保证触发storage事件
        random: Math.random(),
      })
    );
  }
  emitLocal(name: string, ...args) {
    this.emitTo(name, this.id, ...args);
  }
  broadcast(name: string, ...args) {
    this.emitTo(name, this.BROADCAST, ...args);
  }
  emit(name: string, ...args) {
    this.emitTo(name, this.windows, ...args);
  }
  exitGroup() {
    this.broadcast("_exit", this.id);
  }
}

/**
 * on continuous input. return destroy
 * 监听连续输入事件. 返回取消监听函数. 例如监听用户输入aa
 * @param handler
 * @param opt
 * @returns
 */
export function onContinuousInput(
  handler: (input: string) => void,
  opt: { timeout?: number } = {}
) {
  opt = {
    timeout: 1000,
    ...opt,
  };
  let input = "";
  let timeoutId;
  const keydownHandler = (e) => {
    if (e.key && e.key.length === 1) {
      input = `${input}${e.key}`;
      handler(input);
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      timeoutId = setTimeout(() => {
        input = "";
      }, opt.timeout);
    }
  };
  on(document, "keydown", keydownHandler);
  return () => {
    off(document, "keydown", keydownHandler);
  };
}

// refer [onContinuousInput](#onContinuousInput)
export const onQuickKeydown = onContinuousInput;

export function getUserLanguage(): string {
  return navigator.language || navigator["userLanguage"];
}

export class Cache {
  store = {};
  has(name: string) {
    return this.store.hasOwnProperty(name);
  }
  remember(name: string, getter: () => any) {
    if (!this.has(name)) {
      this.store[name] = {
        value: getter(),
      };
    }
    return this.store[name].value;
  }
  forget(name: string) {
    if (name) {
      if (this.has(name)) {
        delete this.store[name];
      }
    } else {
      this.store = {};
    }
  }
}

// attach cached getters to an object; can attach to self
export function attachCache(obj: any, toCache: object, cache = new Cache()) {
  for (const key in toCache) {
    const getter = toCache[key];
    Object.defineProperty(obj, key, {
      get() {
        return cache.remember(key, () => getter.call(this));
      },
    });
  }
}

// for animation
export function easeInOutQuad(
  startValue: number,
  changeInValue: number,
  changedTime: number,
  duration: number
) {
  let t = changedTime,
    d = duration,
    b = startValue,
    c = changeInValue;
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

// others
export function isMobile() {
  var isMobile = false; //initiate as false
  // device detection
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substring(0, 4)
    )
  ) {
    isMobile = true;
  }
  return isMobile;
}

export class Accumulate<T> {
  arr: T[] = [];
  cache: number[] = [];
  constructor(arr: T[]) {
    this.arr = arr;
  }
  getValue(item: T): number {
    // @ts-ignore
    return item;
  }
  sum(index: number) {
    if (this.cache[index] == null) {
      let prev = index > 0 ? this.sum(index - 1) : 0;
      this.cache[index] = this.getValue(this.arr[index]) + prev;
    }
    return this.cache[index];
  }
}
/**
 * from https://www.zhangxinxu.com/wordpress/2018/08/css-svg-background-image-base64-encode/
 * @param svgCode
 * @returns
 */
export function svgToDataURL(svgCode: string) {
  return (
    "data:image/svg+xml," +
    svgCode
      .replace(/"/g, "'")
      .replace(/%/g, "%25")
      .replace(/#/g, "%23")
      .replace(/{/g, "%7B")
      .replace(/}/g, "%7D")
      .replace(/</g, "%3C")
      .replace(/>/g, "%3E")
  );
}

export function genRandomLightColor() {
  var letters = "BCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}
/**
 * Like Map, support array as key. array order is used.
 */
export class ArrayKeyMap<T> {
  _map = new Map<any, [string, number]>();
  _values: Record<string, [any[], T]> = {};
  _objCount = 0;
  _keysToString(keys: any[]): string | null {
    const { _map } = this;
    let t = [];
    for (const key of keys) {
      if (!_map.has(key)) {
        return null;
      }
      t.push(_map.get(key)[0]);
    }
    return t.toString();
  }
  has(keys: any[]) {
    if (this._keysToString(keys) == null) {
      return false;
    }
    return true;
  }
  /**
   * throw error if not found
   * @param keys
   * @returns
   */
  get(keys: any[]) {
    const { _values } = this;
    const key2 = this._keysToString(keys);
    if (key2 == null) {
      throw "Value not found by specified keys";
    }
    return _values[key2][1];
  }
  set(keys: any[], value: T) {
    const { _map, _values } = this;
    let t = [];
    for (const key of keys) {
      let str: string;
      let count = 1;
      if (_map.has(key)) {
        [str, count] = _map.get(key);
        count++;
      } else {
        this._objCount++;
        str = this._objCount.toString();
      }
      _map.set(key, [str, count]);
      t.push(str);
    }
    _values[t.toString()] = [keys.slice(), value];
  }
  delete(keys: any[]) {
    const { _values, _map } = this;
    const key2 = this._keysToString(keys);
    if (key2 == null) {
      throw "Value not found by specified keys";
    }
    delete _values[key2];
    for (const key of keys) {
      let [str, count] = _map.get(key);
      count--;
      if (count === 0) {
        _map.delete(key);
      } else {
        _map.set(key, [str, count]);
      }
    }
  }
  clear() {
    this._map.clear();
    this._values = {};
  }
  *entries() {
    const { _values } = this;
    for (const key in _values) {
      const [keys, value] = _values[key];
      yield [keys, value];
    }
  }
  count() {
    return [...this.entries()].length;
  }
}

// typescript
export type ParametersWithoutFirst<T extends (...args: any) => any> =
  T extends (first: any, ...args: infer P) => any ? P : never;

/**
 * Remove function's first parameter
 */
export type OmitFirstParameter<F> = F extends (
  x: any,
  ...args: infer P
) => infer R
  ? (...args: P) => R
  : never;

export type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (
  ...a: Parameters<T>
) => TNewReturn;

export type Nullable<T> = T | null;
