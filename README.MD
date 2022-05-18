# helper-js

js functions, import on demand. TypeScript supported. [API](https://phphe.github.io/helper-js/)

js 方法库, 按需引入. 支持 TypeScript. [API 详细文档](https://phphe.github.io/helper-js/)

## Install / 安装

```sh
npm install helper-js --save
```

## Usage / 使用

```js
import {createElementFromHTML} from 'helper-js'
// or
import * as hp from 'helper-js'
hp.createElementFromHTML(...)
```

## API

[Type Document](https://phphe.github.io/helper-js/)

## Include in browser directly / 浏览器直接引入

Import `dist/index.iife.js`. Access functions by global variable `helperJs`. e.g.: `helperJs.createElementFromHTML(...)`.

引入 `dist/index.iife.js`. 通过全局变量`helperJs`访问子方法. 例: `helperJs.createElementFromHTML(...)`.
