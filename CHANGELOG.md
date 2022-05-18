# Change Log

## [Unreleased]

## [3.0.0] - 2022-03-08

Complete some functions' type declarations.

### Added

- add `assignIfNoKey`
- add `assignIfKeyNull`
- add `objectAssignIfNoKey`
- add `objectAssignIfDiff`
- add `arrayDiff`
- add `css`
- add `cssNumber`
- add `pathJoin`
- add `isMobile`
- add `promisePin`
- add `Accumulate`
- add `svgToDataURL`
- add `genRandomLightColor`
- add `openPreviewWindow`
- add `continuous`
- add `promiseContinuous`
- add `isScrollable`
- add `getScrollSpace`
- add `bindContext`
- add `hasClasses`
- add `hasClassIn`
- add `hasClassIn`
- add `cloneObject`
- add `withoutUndefined`
- add `cloneTreeData`
- add `findInfoInTreeData`
- add `findTreeData`
- add `once`
- add `pointIn`
- add `between`
- add `extendedListen`
- add `objectDefineProxyProperty`
- add `applyFinally`
- add `findAll`

### Changed

- changed `binarySearch`: the second param `callback` changed to `callback(mid, index, count)`
- changed `joinRows`
- changed `depthFirstSearch`, `walkTreeData`: move the third param `childrenKey` into the 4th param `opt`.
- changed `addClass`, `removeClass`: the second param `className` can be `string[]`

### Renamed

- rename `getArrayItemSiblings` to `getArrayItemSiblingsByOffsets`
- rename `arrayGetRange` to `arrayBetween`
- rename `objectGet` to `dotGet`
- rename `objectSet` to `dotSet`
- rename `pairRows` to `joinRows`
- rename `executePromiseGetters` to `promiseExecuteGetters`
- rename `assignIfDifferent` to `assignIfDiff`
- rename `getLocalStorage2` to `extendedLocalStorage`
- rename `onDOM` to `on`
- rename `offDOM` to `off`

### Removed

- remove `newArrayExcludingIndexes`
- remove `getArrayItemSibling`
- remove `arraySubtract`
- remove `viewportPositionToOffset`
- remove `offsetToViewportPosition`
- remove `getBorder`
- remove `uniqueId`
- remove `store`
- remove `depthFirstSearch`
- remove `onDOMMany`
- remove `findNodeList`, `findNodeListReverse`

## [2.0.0] - 2020-06-10

### Features

- Reconstruct with Typescript

### Renamed

- rename `numRand` to `randInt`
- rename `numPad` to `strPad`
- rename `min` to `notLessThan`
- rename `max` to `notGreaterThan`
- rename `strRand` to `randString`
- rename `arrayDiff` to `arraySubtract`
- rename `newArrayRemoveAt` to `newArrayExcludingIndexes`
- rename `arraySibling` to `getArrayItemSibling`
- rename `arrayGet` to `arrayGetRange`
- rename `getElSize` to `getElSizeEvenInvisible`

### Removed

- remove `isset`
- remove `replaceMultiple`
- remove `objectMerge`
- remove `forAll`
- remove `iterateALL`
- remove `cloneObj`
- remove `store_executeOnceInScopeByName`
- remove `executeOnceInScopeByName`
- remove `debounce`
- remove `joinMethods`
- remove `getCss3Prefix`
- remove `jqMakeCarousel`

### Added

- add `randChoice`
- add `getArrayItemSiblings`
- add `scrollTo`
- add `easeInOutQuad`

### Changed

- changed `groupArray`: return Map instead of Array
- changed `objectMap`: argumrnt `handler`'s third argument changed to index from obj
- changed `depthFirstSearch` argumrnt `reverse` changed to `opt`
- changed `debounceTrailing` return {action, stop}
- changed `debounceImmediate` return {action, stop}
- changed `setElChildByIndex` arguments order changed
- changed `findNodeListReverse` remove argument `opt`
- changed `binarySearch` arguments
- changed `waitFor` remove argument `name`; return `{promise, stop}`
