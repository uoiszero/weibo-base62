/**
 * 字符集定义 - 包含数字0-9、小写字母a-z和大写字母A-Z
 * @type {string}
 */
const characterSet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * 字符映射表 - 用于快速查找字符在字符集中的索引位置
 * @type {Object<string, number>}
 */
const characterDict = Object.fromEntries(characterSet.split("").map((val, index) => [val, index]));

/**
 * 固定的填充长度
 * @type {number}
 */
const PAD_LENGTH = 7;

/**
 * 分块大小
 * @type {number}
 */
const CHUNK_SIZE = 4;

/**
 * 基数
 * @type {number}
 */
const BASE = 62;

/**
 * 将微博mid转换为base62编码
 * @param {string} mid - 微博消息ID
 * @returns {string} - base62编码后的字符串
 * @throws {TypeError} - 当输入不是字符串时抛出
 */
function encode(mid) {
  // 参数验证
  if (!mid) {
    return "";
  }
  
  if (typeof mid !== 'string') {
    throw new TypeError('输入必须是字符串');
  }
  
  // 步骤1: 对输入进行填充，确保长度是PAD_LENGTH的倍数
  const paddingNeeded = PAD_LENGTH - (mid.length % PAD_LENGTH);
  const paddedMid = paddingNeeded === PAD_LENGTH ? mid : '0'.repeat(paddingNeeded) + mid;
  
  // 步骤2: 将填充后的字符串按PAD_LENGTH长度分割成数组
  const slices = [];
  for (let i = 0; i < paddedMid.length; i += PAD_LENGTH) {
    slices.push(paddedMid.substring(i, i + PAD_LENGTH));
  }
  
  // 步骤3: 将每个分片转换为base62编码
  const encodedChunks = slices.map(slice => {
    const num = parseInt(slice, 10);
    let encoded = '';
    let remainder = num;
    
    // 将数字转换为base62
    while (remainder > 0) {
      const digit = remainder % BASE;
      encoded = characterSet[digit] + encoded;
      remainder = Math.floor(remainder / BASE);
    }
    
    // 确保每个编码块长度为CHUNK_SIZE
    return encoded.padStart(CHUNK_SIZE, '0');
  });
  
  // 步骤4: 合并编码块并移除前导零
  return encodedChunks.join('').replace(/^0+/, '');
}

/**
 * 将base62编码转换回微博mid
 * @param {string} str - base62编码的字符串
 * @returns {string} - 解码后的微博消息ID
 * @throws {TypeError} - 当输入不是字符串时抛出
 * @throws {Error} - 当输入包含非法字符时抛出
 */
function decode(str) {
  // 参数验证
  if (!str) {
    return "";
  }
  
  if (typeof str !== 'string') {
    throw new TypeError('输入必须是字符串');
  }
  
  // 检查是否包含非法字符
  if (str.split('').some(char => !characterDict.hasOwnProperty(char))) {
    throw new Error('输入包含非法字符');
  }
  
  // 步骤1: 将输入字符串分割成CHUNK_SIZE大小的块
  const slices = chunk(str.split('').reverse(), CHUNK_SIZE).reverse();
  
  // 步骤2: 将每个块从base62转换回十进制
  const decodedChunks = slices.map(item => {
    let num = 0;
    // 反转块并计算十进制值
    item.reverse().forEach(char => {
      const val = characterDict[char];
      num = num * BASE + val;
    });
    
    // 确保每个解码块长度为PAD_LENGTH
    return num.toString().padStart(PAD_LENGTH, '0');
  });
  
  // 步骤3: 合并解码块并移除前导零
  return decodedChunks.join('').replace(/^0+/, '');
}

/**
 * 将数组按指定大小分割成块
 * @param {Array} arr - 要分割的数组
 * @param {number} size - 每个块的大小
 * @returns {Array<Array>} - 分割后的二维数组
 */
function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    throw new TypeError('第一个参数必须是数组');
  }
  
  if (!Number.isInteger(size) || size <= 0) {
    throw new TypeError('块大小必须是正整数');
  }
  
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, index) => arr.slice(index * size, (index + 1) * size)
  );
}

export {
  encode,
  decode,
  chunk // 导出chunk函数以便测试
}