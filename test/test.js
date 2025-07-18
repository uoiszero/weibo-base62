/**
 * weibo-base62 测试文件
 * 测试微博mid和base62编码之间的转换功能
 */
import { decode, encode, chunk } from "../src/index.js";
import should from "should";

describe("weibo-base62 测试", () => {
  // 基本功能测试组
  describe("基本功能测试", () => {
    it("应该正确编码微博mid", () => {
      should(encode("4397951453070808")).equal("HF6adcSRa");
      // 添加更多有效的测试用例（通过实际运行验证）
      should(encode("1234567890123456")).equal("cevgF0w7e");
      should(encode("9876543210987654")).equal("1Aw7eN48VU");
    });

    it("应该正确解码base62字符串", () => {
      should(decode("HF6adcSRa")).equal("4397951453070808");
      // 添加更多有效的测试用例（通过实际运行验证）
      should(decode("cevgF0w7e")).equal("1234567890123456");
      should(decode("1Aw7eN48VU")).equal("9876543210987654");
    });

    it("编码和解码应该是可逆的", () => {
      const testCases = [
        "1234567890123456",
        "9876543210987654",
        "5678901234567890"
      ];
      
      testCases.forEach(mid => {
        const encoded = encode(mid);
        const decoded = decode(encoded);
        should(decoded).equal(mid);
      });
    });
  });

  // 边界情况测试组
  describe("边界情况测试", () => {
    it("处理空输入", () => {
      should(encode("")).equal("");
      should(decode("")).equal("");
    });

    it("处理非常长的数字字符串", () => {
      const longMid = "1".repeat(50);
      const encoded = encode(longMid);
      should(decode(encoded)).equal(longMid);
    });

    it("处理只有一位数字的输入", () => {
      should(encode("7")).equal("7");
      should(decode("7")).equal("7");
    });
  });

  // 错误处理测试组
  describe("错误处理测试", () => {
    it("encode应该在输入非字符串时抛出TypeError", () => {
      should(() => encode(123)).throw(TypeError, { message: /输入必须是字符串/ });
      should(() => encode(null)).not.throw(); // null被视为falsy值，返回空字符串
      should(() => encode(undefined)).not.throw(); // undefined被视为falsy值，返回空字符串
    });

    it("decode应该在输入非字符串时抛出TypeError", () => {
      should(() => decode(123)).throw(TypeError, { message: /输入必须是字符串/ });
      should(() => decode(null)).not.throw(); // null被视为falsy值，返回空字符串
      should(() => decode(undefined)).not.throw(); // undefined被视为falsy值，返回空字符串
    });

    it("decode应该在输入包含非法字符时抛出Error", () => {
      should(() => decode("HF6adcSRa!")).throw(Error, { message: /输入包含非法字符/ });
      should(() => decode("HF6-adcSRa")).throw(Error, { message: /输入包含非法字符/ });
    });
  });

  // 内部辅助函数测试组
  describe("内部辅助函数测试", () => {
    it("chunk函数应该正确分割数组", () => {
      // 测试正常分割
      should(chunk([1, 2, 3, 4, 5, 6], 2)).deepEqual([[1, 2], [3, 4], [5, 6]]);
      // 测试不均匀分割
      should(chunk([1, 2, 3, 4, 5], 2)).deepEqual([[1, 2], [3, 4], [5]]);
      // 测试空数组
      should(chunk([], 3)).deepEqual([]);
    });

    it("chunk函数应该处理边界情况", () => {
      // 块大小等于数组长度
      should(chunk([1, 2, 3], 3)).deepEqual([[1, 2, 3]]);
      // 块大小大于数组长度
      should(chunk([1, 2], 5)).deepEqual([[1, 2]]);
    });

    it("chunk函数应该在参数无效时抛出错误", () => {
      // 非数组参数
      should(() => chunk("not an array", 2)).throw(TypeError, { message: /第一个参数必须是数组/ });
      // 非正整数块大小
      should(() => chunk([1, 2, 3], 0)).throw(TypeError, { message: /块大小必须是正整数/ });
      should(() => chunk([1, 2, 3], -1)).throw(TypeError, { message: /块大小必须是正整数/ });
      should(() => chunk([1, 2, 3], 1.5)).throw(TypeError, { message: /块大小必须是正整数/ });
    });
  });
});