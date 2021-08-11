export declare const store: Store;
interface Store {
    glb: Window;
    uniqueId: {
        [id: string]: true;
    };
    localStorage2?: ReturnType<typeof makeStorageHelper>;
    sessionStorage2?: ReturnType<typeof makeStorageHelper>;
}
export declare function glb(): Window;
export declare function isDocumentExisted(): boolean;
export declare function isArray(v: any): v is any[];
export declare function isBool(v: any): v is boolean;
export declare function isNumber(v: any): v is number;
export declare function isNumeric(v: any): boolean;
export declare function isString(v: any): v is string;
export declare function isObject(v: any): v is object;
export declare function isFunction(v: any): v is Function;
export declare function isPromise(v: any): v is Promise<any>;
export declare function empty(v: any): boolean;
export declare function randInt(min: number, max: number): number;
export declare function randChoice(arr: string | any[]): any;
export declare function strPad(str: number | string, n: number, padString?: string): string | number;
export declare function notLessThan(n: number, min: number): number;
export declare function notGreaterThan(n: number, max: number): number;
export declare function studlyCase(str: string): string;
export declare function kebabCase(str: string): string;
export declare function snakeCase(str: string): string;
export declare function camelCase(str: string): string;
export declare function camelToWords(str: string): string[];
export declare function titleCase(str: string): string;
export declare function randString(len?: number, seeds?: string | string[]): string;
export declare function arrayRemove(arr: any[], v: any): number;
export declare function arrayRemoveBySortedIndexes(arr: any[], sortedIndexes: number[]): void;
export declare function newArrayExcludingIndexes(arr: any[], indexes: number[]): any[];
export declare function arrayAt(arr: any[], n: number): any;
export declare function arrayFirst(arr: any[]): any;
export declare function arrayLast(arr: any[]): any;
export declare function arraySubtract(arr1: any[], arr2: any[]): any[];
export declare function getArrayItemSibling(arr: any[], item: any, offset: number): any;
export declare function getArrayItemSiblings(arr: any[], item: any, offsets: number[]): any[];
export declare function toArrayIfNot<T>(arrOrNot: T): T | T[];
declare type Arg_n_function_splitArray = (times: number) => number;
export declare function splitArray(arr: any[], n: number | Arg_n_function_splitArray): any[];
export declare function groupArray(arr: any[], getMark: (item: any) => any): Map<any, any>;
export declare function arrayDistinct(arr: any[]): any[];
export declare function arrayGetRange(arr: any[], index: number, endIndex: number): any;
export declare function arrayWithoutEnd(arr: any[], n: number): any[];
export declare function arrayFlat(arr: any[], depth?: number): any[];
export declare function assignIfDifferent(obj: object, key: string, val: any): void;
export declare function objectMap(obj: object, handler: (value: any, key: string, index: number) => any): object;
export declare function objectOnly(obj: object, keys: string[]): object;
export declare function objectExcept(obj: object, keys: string[]): object;
declare type iterateAll_Options = {
    reverse?: boolean;
    exclude?: (info: {
        value: any;
        index: number;
    } | {
        value: any;
        key: string;
    }) => boolean;
};
export declare function iterateAll(val: string | any[] | object | NodeList, opt?: iterateAll_Options): Generator<{
    value: any;
    index?: number;
    key?: string;
}>;
export declare function objectGet(obj: object, path: string | string[], throwError?: boolean): any;
export declare function objectSet(obj: object, path: string | string[], value: any): void;
export declare function unset(obj: object, prop: string): void;
export declare function objectAssignIfKeyNull(obj1: object, obj2: object): void;
declare type mapObjectTree_Handler = (value: any, key: string | number, parent: object | any[], newParent: object | any[]) => void | null | undefined | {
    key?: string;
    delete?: boolean;
    value?: any;
    skip?: boolean;
    stop?: boolean;
};
export declare function mapObjectTree(obj: object, handler: mapObjectTree_Handler, limit?: number): object;
declare type mapObjects_idKey_function = (item: any, index: number) => string;
export declare function mapObjects(arr: any[], idKey: string | mapObjects_idKey_function): object;
export declare function pairRows(rows1: any[], rows2: any[], key1: string, key2?: string): [any, any][];
declare type TreeDataPath = number[];
declare type depthFirstSearch_Handler = (item: any, index: number, parent: null | any, path: TreeDataPath) => void | false | "skip children" | "skip siblings";
declare type depthFirstSearch_Options = {
    reverse?: boolean;
};
export declare function depthFirstSearch(obj: object | any[], handler: depthFirstSearch_Handler, childrenKey?: string, opt?: depthFirstSearch_Options): void;
export declare const walkTreeData: typeof depthFirstSearch;
export declare class TreeData<Node> {
    data: Node | Node[];
    childrenKey: string;
    constructor(data?: Node | Node[]);
    get rootChildren(): Node[];
    iteratePath(path: TreeDataPath, opt?: {
        reverse?: boolean;
    }): IterableIterator<{
        path: TreeDataPath;
        node: Node;
    }>;
    getAllNodes(path: TreeDataPath): Node[];
    getNode(path: TreeDataPath): Node;
    getNodeIndexAndParent(path: TreeDataPath): {
        parent: Node;
        index: number;
        parentPath: number[];
    };
    getNodeParent(path: TreeDataPath): Node;
    setPathNode(path: TreeDataPath, node: Node): void;
    removeNode(path: TreeDataPath): Node | undefined;
    walk(handler: depthFirstSearch_Handler, opt?: depthFirstSearch_Options): void;
    clone(opt?: {
        afterNodeCreated?: (newNode: Node, info: {
            oldNode: Node;
            index: number;
            parent: Node | undefined;
            path: TreeDataPath;
        }) => void;
    }): Node[];
}
export declare function resolveValueOrGettter(valueOrGetter: any, args?: any[]): any;
declare type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
export declare function executeWithCount<T>(func: T): OmitFirstArg<T>;
declare type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;
export declare function watchChange<T>(getVal: ReplaceReturnType<OmitFirstArg<T>, any>, handler: T): OmitFirstArg<T>;
export declare function debounceTrailing<T>(action: T, wait?: number): {
    action: T;
    stop: () => void;
};
export declare function debounceImmediate<T>(action: T, wait?: number): {
    action: T;
    stop: () => void;
};
export declare function joinFunctionsByResult(funcs: any[]): any;
export declare function joinFunctionsByNext(funcs: any[]): () => void;
export declare function executePromiseGetters(getters: (() => any)[], concurrent?: number): {
    promise: Promise<unknown>;
    stop(): void;
};
export declare function promiseTimeout<T>(promise: Promise<T>, timeout: number): Promise<unknown>;
export declare function getUrlParam(par: string): string | false;
export declare function createElementFromHTML(htmlString: string): ChildNode | NodeListOf<ChildNode>;
export declare function uniqueId(prefix?: string): string;
export declare function isDescendantOf(el: HTMLElement, parent: HTMLElement): boolean;
export declare function removeEl(el: HTMLElement | Node): Node | HTMLElement;
export declare function getScroll(): {
    top: number;
    left: number;
};
export declare function getOffset(el: HTMLElement): {
    x: number;
    y: number;
};
export declare function getOffsetParent(el: HTMLElement): Element;
export declare function getPosition(el: HTMLElement): {
    x: number;
    y: number;
};
export declare function getPositionFromOffset(el: HTMLElement, of: {
    x: number;
    y: number;
}): {
    x: number;
    y: number;
};
export declare function getBoundingClientRect(el: HTMLElement): {
    top: number;
    right: number;
    bottom: number;
    left: number;
    width: number;
    height: number;
    x: number;
    y: number;
};
export declare const getViewportPosition: typeof getBoundingClientRect;
export declare function viewportPositionToOffset(position: {
    x: number;
    y: number;
}): {
    x: number;
    y: number;
};
export declare function offsetToViewportPosition(offset: {
    x: number;
    y: number;
}): {
    x: number;
    y: number;
};
declare type findParent_Callback = (parentEl: HTMLElement) => boolean | "break";
export declare function findParent(el: HTMLElement, callback: findParent_Callback, opt?: {
    withSelf?: boolean;
}): HTMLElement;
export declare function backupAttr(el: HTMLElement, name: string): void;
export declare function restoreAttr(el: HTMLElement, name: string): void;
export declare function hasClass(el: HTMLElement, className: string): boolean;
export declare function addClass(el: HTMLElement, className: string): void;
export declare function removeClass(el: HTMLElement, className: string): void;
export declare function getElSizeEvenInvisible(el: HTMLElement): {
    width: number;
    height: number;
};
/**
 * [isOffsetInEl]
 * @param {Number} x
 * @param {Number} y
 * @param {Object} el HTML Element
 */
export declare function isOffsetInEl(x: number, y: number, el: HTMLElement): boolean;
export declare function getBorder(el: HTMLElement): {
    left: number;
    right: number;
    top: number;
    bottom: number;
};
export declare function setElChildByIndex(el: HTMLElement, child: HTMLElement, index: number): void;
declare type EventHandler = (Event: any) => void;
export declare function onDOM(el: HTMLElement | Window | Document, name: string, handler: EventHandler, ...args: any[]): void;
export declare function offDOM(el: HTMLElement | Window | Document, name: string, handler: EventHandler, ...args: any[]): void;
export declare function onDOMMany(els: (HTMLElement | Window | Document)[], names: string[], handler: EventHandler, ...args: any[]): () => void;
export declare function getImageSizeByUrl(url: string): Promise<{
    width: number;
    height: number;
}>;
declare type findNodeList_Callback = (el: HTMLElement, index: number) => void | boolean;
export declare function findNodeList(list: NodeList, callback: findNodeList_Callback, opt?: {
    reverse?: boolean;
}): HTMLElement;
export declare function findNodeListReverse(list: NodeList, callback: findNodeList_Callback): HTMLElement;
export declare function elementsFromPoint(x: number, y: number): Element[];
export declare function getOuterAttachedHeight(el: Element, opt?: {
    margin?: boolean;
    border?: boolean;
}): number;
export declare function getOuterAttachedWidth(el: Element, opt?: {
    margin?: boolean;
    border?: boolean;
}): number;
export declare function scrollTo(options: {
    x?: number;
    y?: number;
    duration?: number;
    element?: Element;
    beforeEveryFrame?: (count: number) => boolean | void;
}): () => void;
export declare function insertBefore(el: Element, target: Element): void;
export declare function insertAfter(el: Element, target: Element): void;
export declare function prependTo(el: Element, target: Element): void;
export declare function appendTo(el: Element, target: Element): void;
export declare function cloneDate(dateObj: Date): Date;
export declare function addDate(dateObj: Date, n: number, type: "year" | "month" | "day" | "date" | "hour" | "minute" | "second" | "millisecond"): Date;
export declare function getMonthStart(dateObj: Date): Date;
export declare function getMonthEnd(dateObj: Date): Date;
declare type getCalendar_Day = {
    year: number;
    month: number;
    date: number;
    text: number;
    prevMonth?: boolean;
    currentMonth?: boolean;
    nextMonth?: boolean;
};
export declare function getCalendar(year: number, month: number, startWeekDay?: number): getCalendar_Day[][];
export declare function isIsoFormat(str: string): boolean;
export declare function parseISO(timestamp: string): Date;
declare type binarySearch_Callback = (mid: any, index: number) => number;
declare type binarySearch_Return = {
    index: number;
    value: any;
    count: number;
    hit: boolean;
    greater?: boolean;
} | null;
declare type binarySearch_Options = {
    start?: number;
    end?: number;
    returnNearestIfNoHit?: boolean;
    maxTimes?: number;
};
export declare function binarySearch(arr: any[] | NodeList, callback: binarySearch_Callback, opt?: binarySearch_Options): binarySearch_Return;
export declare function windowLoaded(): Promise<void>;
export declare function waitTime(milliseconds: number, callback?: () => void): Promise<void>;
export declare function waitFor(condition: () => boolean, time?: number, maxTimes?: number): {
    promise: Promise<void>;
    stop: () => void;
};
export declare function retry(action: any, limitTimes?: number): Promise<any>;
export declare function copyTextToClipboard(text: string): void;
export declare function isWindowDefined(): boolean;
export declare function isNode(): boolean;
export declare function isIE(): boolean;
export declare function openWindow(url: string, name: string, opt?: any): void;
export declare function openCenterWindow(url: string, name: string, width: number, height: number, opt?: any): void;
export declare class URLHelper {
    baseUrl: string;
    search: {
        [key: string]: string;
    };
    constructor(baseUrl: string);
    getHref(): string;
}
export declare function resolveArgsByType(args: any[], types: any[]): any[];
export declare function makeStorageHelper<T>(storage: T): {
    storage: T;
    set(name: string, value: any, minutes: number): void;
    get(name: string): any;
    clear(): void;
};
export declare function getLocalStorage2(): {
    storage: unknown;
    set(name: string, value: any, minutes: number): void;
    get(name: string): any;
    clear(): void;
};
export declare function getSessionStorage2(): {
    storage: unknown;
    set(name: string, value: any, minutes: number): void;
    get(name: string): any;
    clear(): void;
};
export declare class EventProcessor {
    eventStore: any[];
    on(name: string, handler: any): void;
    once(name: string, handler: any): () => void;
    onceTimeout(name: string, handler: any, timeout: number): {
        off: () => void;
        promise: Promise<void>;
    };
    off(name: string, handler: any): void;
    emit(name: string, ...args: any[]): void;
}
export declare class CrossWindowEventProcessor extends EventProcessor {
    storageName: string;
    windows: any[];
    timeout: number;
    id: string;
    ready: Promise<void>;
    constructor(opt: {
        timeout?: number;
    });
    isMain(): boolean;
    BROADCAST: string;
    emitTo(name: string, targets: any, ...args: any[]): void;
    emitLocal(name: string, ...args: any[]): void;
    broadcast(name: string, ...args: any[]): void;
    emit(name: string, ...args: any[]): void;
    exitGroup(): void;
}
export declare const CrossWindow: typeof CrossWindowEventProcessor;
export declare function onContinuousInput(handler: (input: string) => void, opt?: {
    timeout?: number;
}): () => void;
export declare const onQuickKeydown: typeof onContinuousInput;
export declare function getUserLanguage(): any;
export declare class Cache {
    store: {};
    has(name: string): boolean;
    remember(name: string, getter: () => any): any;
    forget(name: string): void;
}
export declare function attachCache(obj: any, toCache: object, cache?: Cache): void;
export declare function easeInOutQuad(startValue: any, changeInValue: any, changedTime: any, duration: any): any;
export {};
