const _ = require("lodash")
  , characterSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  , characterDict = _.zipObject(characterSet.split(""), _.range(62));

exports.from = fromBase62;
exports.to = toBase62;

/**
 * mid转base62
 * @param mid
 * @returns {string}
 */
function toBase62(mid) {
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

    arr.push(_.padStart(s, 4, "0"));
  }
  return _.trimStart(arr.reverse().join(""), "0");
}

/**
 * base62转mid
 * @param str
 */
function fromBase62(str) {
  let slices = _.chunk(str.split("").reverse(), 4).reverse();
  let mid = "";
  _.each(slices, function (item) {
    let num = 0;
    _.each(item.reverse(), function (obj) {
      let val = characterDict[obj];
      num = num * 62 + val;
    });
    let str = num.toString();
    str = _.repeat("0", 7 - str.length) + str;
    mid += str;
  });
  mid = mid.replace(/^0+/, "");
  return mid;
}