# 新浪微博 mid 和 base62 互转

# Sina Weibo base62 encode and decode

[![NPM](https://nodei.co/npm/weibo-base62.png)](https://www.npmjs.com/package/weibo-base62)

## 使用方法

## How to use

```javascript
const base62 = require("weibo-base62");

const mid = "4397951453070808";
const code = "HF6adcSRa";

//result: HF6adcSRa
console.log("base62: ", base62.encode(mid));

//result: 4397951453070808
console.log("mid: ", base62.decode(code));
```

## 测试

## Test

```javascript
yarn test
```
