# 新浪微博 mid 和 base62 互转

# Sina Weibo base62 encode and decode

[![NPM](https://nodei.co/npm/weibo-base62.png)](https://www.npmjs.com/package/weibo-base62)

## 使用方法

## How to use

### ESM (推荐)
```javascript
import { encode, decode } from "weibo-base62";

const mid = "4397951453070808";
const code = "HF6adcSRa";

// result: HF6adcSRa
console.log("base62: ", encode(mid));

// result: 4397951453070808
console.log("mid: ", decode(code));
```

### CommonJS
```javascript
const { encode, decode } = require("weibo-base62");

const mid = "4397951453070808";
const code = "HF6adcSRa";

// result: HF6adcSRa
console.log("base62: ", encode(mid));

// result: 4397951453070808
console.log("mid: ", decode(code));
```

## 测试

## Test

```bash
npm test
```

## 构建

## Build

```bash
npm run build
```
