# 新浪微博mid和base62互转

## 使用方法

```javascript
const base62 = require("weibo-base62");

const mid = "4397951453070808";
const code = "HF6adcSRa";

console.log("base62: ", base62.encode(mid));

console.log("mid: ", base62.decode(code));
```

## 测试
