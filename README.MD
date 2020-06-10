# helper-js
js functions, just import needed functions. TypeScript supported.

js 方法库, 按需使用. 支持TypeScript

## Install
```sh
npm install helper-js --save
```
## Import
```js
import {arrayLast} from 'helper-js'
// or
import * as hp from 'helper-js'
hp.arrayLast(...)
```

## Base functions

## 基础方法

#### function glb():Window {

get global, such as window in browser.

返回顶级全局变量. 例如浏览器的`window`

#### function isDocumentExisted() {

detect if global variable `document` existing.

判断全局变量`document`是否存在

#### function isArray (v): v is any[] {

#### function isBool (v): v is boolean {

#### function isNumber (v): v is number {

#### function isNumeric (v) {

#### function isString (v): v is string {

#### function isObject (v): v is object {

#### function isFunction (v) {

#### function isPromise (v) {

#### function empty(v) {

detect if argumrnt is null, undefined, empty array, empty string, false, NaN, empty object

检查是否是null, undefined, 空数组, 空字符串, false, NaN, 空对象

#### function randInt(min:number, max:number){

rand int in range, including min and max

返回指定范围随机整数, 包括范围起始值和终止值

#### function randChoice (arr: string|any[]) {

rand item in array

返回数组随机一项

#### function strPad(str:number|string, n:number, padString = '0') {

Pad a string to a certain length with another string

左边补充指定字符, 使其达到指定长度

#### function notLessThan(n:number, min:number) {

If n less than `min`, return `min`, else n.

如果n小于min, 返回min, 否则n.

#### function notGreaterThan (n:number, max:number) {

If n greater than `max`, return `max`, else n.

如果n大于max, 返回max, 否则n.

## string

## 字符串

#### function studlyCase (str:string) {

'abc abc' to 'Abc abc'

#### function kebabCase(str:string) {

To lower case and use `-` as delimiter. example: '-ABC abc_def camelCase-- helloMyFriend' to 'a-b-c-abc-def-camel-case-hello-my-friend'

#### function snakeCase (str:string) {

To lower case and use `_` as delimiter.

#### function camelCase (str:string) {

'abc-abc-abc_abc' to 'AbcAbcAbcAbc'

#### function camelToWords (str:string) {

'AbcAbcAbcAbc' to ['Abc', 'Abc', 'Abc', 'Abc']

#### function titleCase (str:string) {

'abcAbc' to 'Abc Abc'

#### function randString (len = 8, seeds:string|string[]='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {

generate random string

随机字符串

## Array

## 数组

#### function arrayRemove(arr:any[], v:any) {

remove item from array. return removed count

从数组删除项. 返回删除计数

#### function arrayRemoveBySortedIndexes(arr:any[], sortedIndexes:number[]) {

remove items from array by sorted indexes. indexes example: [0, 2, 6, 8, 9]

通过有序的索引集删除数组项. 索引集例子: [0, 2, 6, 8, 9]

#### function newArrayExcludingIndexes(arr:any[], indexes:number[]) {

return new array excluding indexes

返回新数组除了给定索引

#### function arrayAt(arr:any[], n:number) {

get item from array by index. index can be negative number

通过所以获取数组一项. 支持负值索引.

#### function arrayFirst(arr:any[]) {

get first or array

返回数组首项

#### function arrayLast(arr: any[]) {

get last of array

返回数组末项

#### function arraySubtract(arr1: any[], arr2: any[]) {

return arr1 - arr2

#### function getArrayItemSibling(arr:any[], item:any, offset:number) {

get array item sibling. Example: getArrayItemSibling(arr, item, -1), get previous sibling

获得数组项的一个同级. 例: getArrayItemSibling(arr, item, -1), 获得前一个

#### function getArrayItemSiblings(arr:any[], item:any, offsets:number[]) {

get array item siblings. Example: getArrayItemSiblings(arr, item, [-1, 1]), get previous and next sibling

获得数组项的多个同级. 例: getArrayItemSiblings(arr, item, [-1, 1]), 获得前一个和后一个

#### function toArrayIfNot<T>(arrOrNot:T): T|T[] {

#### function splitArray(arr:any[], n:number|Arg_n_function_splitArray) {

Split array every n. n can be getter, which argument is the times.

每n个拆分数组. n可以是方法, 参数是第几次分块

#### function groupArray(arr:any[], getMark:(item:any)=>any) {

Compute mark of each item, and group them by mark.

计算每项的标识, 通过标识将数组项分组.

#### function arrayDistinct(arr:any[]) {

Each item in the new array is unique.

新数组每项唯一.

#### function arrayGetRange(arr:any[], index:number, endIndex:number) {

get items from array by range. range can be negative

从数组获得一个范围内的项. 范围可以为负.

#### function arrayWithoutEnd(arr:any[], n:number) {

return new array excluding n items from end

返回新数组排除末尾n项

#### function arrayFlat(arr:any[], depth=10) {

get one-dimensional array from multidimensional array

从多维数组获取一维数组

## Object

## 对象

#### function assignIfDifferent(obj:object, key:string, val:any) {

#### function objectMap(obj:object, handler:(value:any, key:string, index: number)=>any):object {

like Array.map

#### function objectOnly(obj:object, keys:string[]):object {

#### function objectExcept(obj:object, keys:string[]):object {

#### function* iterateAll(val:string|any[]|object|NodeList, opt: iterateAll_Options = {}):Generator<{value:any, index?:number, key?:string}> {

loop for Array, Object, NodeList, String

#### function objectGet(obj:object, path:string|string[], throwError?:boolean): any {

example: objectGet(window, 'document.body.children.0') . source: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string

例: objectGet(window, 'document.body.children.0') . 参考: http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string

#### function objectSet(obj:object, path:string|string[], value:any) {

refer [objectGet](#objectget)

#### function unset(obj:object, prop:string) {

try delete obj[prop]

#### function objectAssignIfKeyNull(obj1:object, obj2:object) {

#### function mapObjectTree(obj:object, handler:mapObjectTree_Handler, limit=10000):object {

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

#### function mapObjects(arr:any[], idKey:string|mapObjects_idKey_function):object {

[{id: 1}, {id: 2}] to {'1':{id: 1}, '2': {id: 2}}

#### function pairRows(rows1:any[], rows2:any[], key1:string, key2:string=key1):[any, any][] {

example: pairRows(users, userProfiles, 'id', 'user_id')

#### function depthFirstSearch(obj:object|any[], handler:depthFirstSearch_Handler, childrenKey = 'children', opt:depthFirstSearch_Options={}) {

walk tree data by with depth first search. tree data example: `[{children: [{}, {}]}]`

深度优先遍历树形数据. 树形数据示例: `[{children: [{}, {}]}]`

#### const walkTreeData = depthFirstSearch

refer [depthFirstSearch](#depthfirstsearch)

#### class TreeData<Node> {

tree data helpers

## function

## 函数

#### function resolveValueOrGettter(valueOrGetter, args = []) {

if it is function, return result, else return it directly.

#### function executeWithCount<T>(func:T) {

add executed count as first argument of func

增加执行次数作为方法的第一个参数

#### function watchChange<T>(getVal:ReplaceReturnType<OmitFirstArg<T>, any>, handler:T) {

(getVal, handler) => update . when execute update, call getVal and check if changed.

(getVal, handler) => update . 执行update时, 调用getVal并检查结果是否改变.

#### function debounceTrailing<T>(action:T, wait = 0) {

#### function debounceImmediate<T>(action:T, wait = 0) {

#### function joinFunctionsByResult(funcs) {

the returned function only accept one argument

#### function joinFunctionsByNext(funcs) {

must pass arguments to `next` manually

## promise

#### function executePromiseGetters(getters: (()=>any)[], concurrent = 1) {

execute promise in sequence

#### function promiseTimeout(promise, timeout:number) {

## url

#### function getUrlParam(par) {

## dom

#### function createElementFromHTML(htmlString:string) {

return NodeList if there are multiple top-level nodes

#### function uniqueId (prefix = 'id_'):string {

#### function isDescendantOf (el:HTMLElement, parent:HTMLElement) {

#### function removeEl(el:HTMLElement) {

#### function getScroll(){

refer: https://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window

#### function getOffset(el: HTMLElement) {

refer: https://gist.github.com/aderaaij/89547e34617b95ac29d1

#### function getOffsetParent(el: HTMLElement) {

there is some trap in el.offsetParent, so use this func to fix

#### function getPosition(el: HTMLElement) {

get el current position. like jQuery.position. The position is relative to offsetParent viewport left top. it is for set absolute position, absolute position is relative to offsetParent viewport left top.

相对于offsetParent可视区域左上角(el.offsetLeft或top包含父元素的滚动距离, 所以要减去). position一般用于设置绝对定位的情况, 而绝对定位就是以可视区域左上角为原点.

#### function getPositionFromOffset(el:HTMLElement, of:{x:number, y:number}) {

like jQuery.offset(x, y), but it just return cmputed position, don't update style

类似 jQuery.offset的设置功能, 但是它只返回计算的position, 不改变元素样式.

#### function getBoundingClientRect(el:HTMLElement){

#### const getViewportPosition = getBoundingClientRect

refer [getBoundingClientRect](#getboundingclientrect)

#### function viewportPositionToOffset(position:{x:number, y:number}){

TODO not tested

#### function offsetToViewportPosition(offset:{x:number, y:number}){

TODO not tested

#### function findParent(el:HTMLElement, callback:findParent_Callback, opt:{withSelf?:boolean}={}) {

#### function backupAttr(el:HTMLElement, name:string) {

#### function restoreAttr(el:HTMLElement, name:string) {

#### function hasClass(el:HTMLElement, className:string) {

source: http://youmightnotneedjquery.com/

#### function addClass(el:HTMLElement, className:string) {

source: http://youmightnotneedjquery.com/

#### function removeClass(el:HTMLElement, className:string) {

source: http://youmightnotneedjquery.com/

#### function getElSizeEvenInvisible(el:HTMLElement) {

#### function isOffsetInEl(x:number, y:number, el:HTMLElement) {

*

 * [isOffsetInEl]

 * @param {Number} x

 * @param {Number} y

 * @param {Object} el HTML Element

#### function getBorder(el:HTMLElement) {

get border

#### function setElChildByIndex(el:HTMLElement, child:HTMLElement, index:number) {

#### function onDOM(el:HTMLElement|Window|Document, name:string, handler:EventHandler, ...args:any[]) {

#### function offDOM(el:HTMLElement|Window|Document, name:string, handler:EventHandler, ...args:any[]) {

#### function onDOMMany(els:(HTMLElement|Window|Document)[], names:string[], handler:EventHandler, ...args:any[]) {

#### function getImageSizeByUrl(url:string) {

#### function findNodeList(list:NodeList, callback:findNodeList_Callback, opt:{reverse?:boolean} = {}) {

#### function findNodeListReverse(list:NodeList, callback:findNodeList_Callback) {

#### function elementsFromPoint(x:number, y:number):Element[] {

#### function getOuterAttachedHeight(el:Element, opt:{margin?:boolean, border?: boolean} = {}) {

#### function getOuterAttachedWidth(el:Element, opt:{margin?:boolean, border?: boolean} = {}) {

#### function scrollTo(options:{

scroll to a positon with duration

from https://gist.github.com/andjosh/6764939

interface options{

  x: number // nullable. don't scroll horizontally when null

  y: number // nullable. don't scroll vertically when null

  duration: number // default 0

  element: Element // default is the top scrollable element.

  beforeEveryFrame: (count: number) => boolean|void // call before requestAnimationFrame execution. return false to stop

}

return stop

### DOM structure

#### function insertBefore(el:Element, target:Element) {

#### function insertAfter(el:Element, target:Element) {

#### function prependTo(el:Element, target:Element) {

#### function appendTo(el:Element, target:Element) {

## Date

#### function cloneDate(dateObj:Date) {

#### function addDate(dateObj:Date, n:number, type:'year'|'month'|'day'|'date'|'hour'|'minute'|'second'|'millisecond') {

day and date is same

#### function getMonthStart (dateObj:Date) {

#### function getMonthEnd (dateObj:Date) {

#### function getCalendar(year:number, month:number, startWeekDay = 0):getCalendar_Day[][] {

startWeekDay: 0 is Sunday

return: [getCalendar_Day x 7][]

#### function isIsoFormat(str:string) {

eg: 2018-09-07T03:38:37.888Z

timezone must be UTC

#### function parseISO(timestamp:string) {

timestamp eg: 2018-09-07T03:38:37.888Z

## advanced

#### function binarySearch(arr:any[]|NodeList, callback:binarySearch_Callback, opt:binarySearch_Options={}): binarySearch_Return {

binarySearch

callback(mid, i) return `mid - your_value` if arr is ascending, else return `your_value - mid`

二分查找

callback(mid, i) arr升序时, 返回`mid - your_value`, 否则返回`your_value - mid`

#### function windowLoaded() {



#### function waitTime(milliseconds:number, callback?:()=>void) {

#### function waitFor(condition:()=>boolean, time = 100, maxTimes = 1000) {

#### async function retry(action: any, limitTimes = 3) {

#### function copyTextToClipboard(text:string) {

clipboard-polyfill is more powerful

复制文字到剪贴板. 仅限于简单使用. 复杂环境推荐clipboard-polyfill

#### function isWindowDefined() {

#### function isNode() {

#### function isIE() {

#### function openWindow(url:string, name:string, opt:any = {})

https://developer.mozilla.org/docs/Web/API/Window/open

http://www.w3school.com.cn/htmldom/met_win_open.asp#windowfeatures

#### function openCenterWindow(url:string, name:string, width:number, height:number, opt:any = {})

#### class URLHelper {

#### function resolveArgsByType(args:any[], types:any[]) {

resolve arguments to help overload. 解析函数参数, 帮助重载

```js

types eg: ['Object', (i) => i > 3, ['Number', default], null ]

null represent all types of argument

resolveArgsByType([1,'str'], ['Number', 'Boolean' ,'String']) -> [1, null, 'str']

resolveArgsByType([1,'str'], ['Number', ['Boolean', true] ,'String']) -> [1, true, 'str']

```

#### function makeStorageHelper<T>(storage:T) {

#### function getLocalStorage2() {

#### function getSessionStorage2() {

#### class EventProcessor {

事件处理

#### class CrossWindowEventProcessor extends EventProcessor{

#### const CrossWindow = CrossWindowEventProcessor

Deprecated in next version

#### function onContinuousInput(handler:(input:string)=>void, opt:{timeout?:number}={}) {

on continuous input. return destroy

监听连续输入事件. 返回取消监听函数.

#### const onQuickKeydown = onContinuousInput

refer [onContinuousInput](#oncontinuousinput)

#### function getUserLanguage() {

#### class Cache {

#### function attachCache(obj:any, toCache:object, cache = new Cache()) {

attach cached getters to an object; can attach to self

#### function easeInOutQuad(startValue, changeInValue, changedTime, duration) {

for animation