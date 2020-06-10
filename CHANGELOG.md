# Change Log

## [Unreleased]
 
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

