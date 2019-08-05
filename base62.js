const characterSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  characterDict = {};

characterSet.split("").forEach((val, index) => {
  characterDict[val] = index;
})

exports.decode = decode;
exports.encode = encode;

/**
 * mid to base62
 * @param mid
 * @returns {string}
 */
function encode(mid) {
  if (!mid) {
    return "";
  }
  let slices = [];
  let pad = "0000000";
  mid = pad.substring(0, pad.length - (mid.length % 7)) + mid;
  let index = 0;
  let length = mid.length;
  while (index * 7 < length) {
    let start = index * 7;
    slices.push(mid.substring(start, start + 7));
    ++index;
  }
  length = slices.length;
  index = length - 1;
  let arr = [];
  while (index >= 0) {
    let s = "";
    let num = parseInt(slices[index--]);
    while (num > 0) {
      let remain = num % 62;
      s = characterSet[remain] + s;
      num = (num - remain) / 62;
    }

    arr.push(s.padStart(4, "0"));
  }
  return arr.reverse().join("").replace(/^0+/, "");
}

/**
 * base62 to mid
 * @param str
 */
function decode(str) {
  if (!str) {
    return "";
  }
  let slices = chunk(str.split("").reverse(), 4).reverse();
  let mid = "";
  slices.forEach(function (item) {
    let num = 0;
    item.reverse().forEach(function (obj) {
      let val = characterDict[obj];
      num = num * 62 + val;
    });
    let str = num.toString();
    str = "0".repeat(7 - str.length) + str;
    mid += str;
  });
  mid = mid.replace(/^0+/, "");
  return mid;
}

function chunk(arr, size) {
  let len = arr.length;
  let temp = [];
  for (let i = 0; i < len; i += size) {
    temp.push(arr.slice(i, i + size));
  }
  return temp;
}
