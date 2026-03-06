
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { encode, decode, chunk } from '../src/index.js';

describe('weibo-base62 测试', () => {
  // 基本功能测试组
  describe('基本功能测试', () => {
    it('应该正确编码微博mid', () => {
      assert.strictEqual(encode('4397951453070808'), 'HF6adcSRa');
      // 添加更多有效的测试用例（通过实际运行验证）
      assert.strictEqual(encode('1234567890123456'), 'cevgF0w7e');
      assert.strictEqual(encode('9876543210987654'), '1Aw7eN48VU');
    });

    it('应该正确解码base62字符串', () => {
      assert.strictEqual(decode('HF6adcSRa'), '4397951453070808');
      // 添加更多有效的测试用例（通过实际运行验证）
      assert.strictEqual(decode('cevgF0w7e'), '1234567890123456');
      assert.strictEqual(decode('1Aw7eN48VU'), '9876543210987654');
    });

    it('编码和解码应该是可逆的', () => {
      const testCases = [
        '1234567890123456',
        '9876543210987654',
        '5678901234567890'
      ];

      testCases.forEach(mid => {
        const encoded = encode(mid);
        const decoded = decode(encoded);
        assert.strictEqual(decoded, mid);
      });
    });
  });

  // 边界情况测试组
  describe('边界情况测试', () => {
    it('处理空输入', () => {
      assert.strictEqual(encode(''), '');
      assert.strictEqual(decode(''), '');
    });

    it('处理非常长的数字字符串', () => {
      const longMid = '1'.repeat(50);
      const encoded = encode(longMid);
      assert.strictEqual(decode(encoded), longMid);
    });

    it('处理只有一位数字的输入', () => {
      assert.strictEqual(encode('7'), '7');
      assert.strictEqual(decode('7'), '7');
    });
  });

  // 错误处理测试组
  describe('错误处理测试', () => {
    it('encode应该在输入非字符串时抛出TypeError', () => {
      assert.throws(() => encode(123), {
        name: 'TypeError',
        message: /输入必须是字符串/
      });
      // null和undefined被视为falsy值，返回空字符串，不抛出异常
      assert.doesNotThrow(() => encode(null));
      assert.doesNotThrow(() => encode(undefined));
    });

    it('decode应该在输入非字符串时抛出TypeError', () => {
      assert.throws(() => decode(123), {
        name: 'TypeError',
        message: /输入必须是字符串/
      });
      assert.doesNotThrow(() => decode(null));
      assert.doesNotThrow(() => decode(undefined));
    });

    it('decode应该在输入包含非法字符时抛出Error', () => {
      assert.throws(() => decode('HF6adcSRa!'), {
        name: 'Error',
        message: /输入包含非法字符/
      });
      assert.throws(() => decode('HF6-adcSRa'), {
        name: 'Error',
        message: /输入包含非法字符/
      });
    });
  });

  // 内部辅助函数测试组
  describe('内部辅助函数测试', () => {
    it('chunk函数应该正确分割数组', () => {
      // 测试正常分割
      assert.deepStrictEqual(chunk([1, 2, 3, 4, 5, 6], 2), [[1, 2], [3, 4], [5, 6]]);
      // 测试不均匀分割
      assert.deepStrictEqual(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
      // 测试空数组
      assert.deepStrictEqual(chunk([], 3), []);
    });

    it('chunk函数应该处理边界情况', () => {
      // 块大小等于数组长度
      assert.deepStrictEqual(chunk([1, 2, 3], 3), [[1, 2, 3]]);
      // 块大小大于数组长度
      assert.deepStrictEqual(chunk([1, 2], 5), [[1, 2]]);
    });

    it('chunk函数应该在参数无效时抛出错误', () => {
      // 非数组参数
      assert.throws(() => chunk('not an array', 2), {
        name: 'TypeError',
        message: /第一个参数必须是数组/
      });
      // 非正整数块大小
      assert.throws(() => chunk([1, 2, 3], 0), {
        name: 'TypeError',
        message: /块大小必须是正整数/
      });
      assert.throws(() => chunk([1, 2, 3], -1), {
        name: 'TypeError',
        message: /块大小必须是正整数/
      });
      assert.throws(() => chunk([1, 2, 3], 1.5), {
        name: 'TypeError',
        message: /块大小必须是正整数/
      });
    });
  });
});
