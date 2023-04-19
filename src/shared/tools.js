/**
 * 使用对象映射key+修改对象引用来生成树形数据
 * @param {Array} data
 * @param {Object} option
 * @param {Number|String} option.root
 * @param {String} option.id
 * @param {String} option.pid
 * @param {String} option.children
 * @returns {Array}
 */
export const getTree = function(data, option) {
  const options = Object.assign(
    {
      root: 0,
      id: "id",
      pid: "pid",
      children: "children",
    },
    option
  );
  const source = JSON.parse(JSON.stringify(data));
  const { root, id, pid, children } = options;
  const dataMap = {};
  const res = [];
  let itemId, itemPid;
  for (let item of source) {
    itemId = item[id];
    itemPid = item[pid];
    if (!dataMap[itemId]) {
      dataMap[itemId] = item;
    }
    if (itemPid === root) {
      res.push(item);
      continue;
    }
    if (!dataMap[itemPid]) {
      dataMap[itemPid] = {};
    }
    if (!dataMap[itemPid][children]) {
      dataMap[itemPid][children] = [];
    }
    dataMap[itemPid][children].push(item);
  }

  return res;
};

/**
 * 随机获取数组中的某一项目
 * @param {any[]} arr
 * @returns {number}
 */
export const randomInArray = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

/**
 * 获取随机渐变背景颜色
 * @returns {String}
 */
export function getRandomBgColor() {
  const dirs = ["left", "right", "top", "bottom"];
  const colors = [
    "#a8c0ff, #3f2b96",
    "#4e54c8, #8f94fb",
    "#355c7d, #6c5b7b, #c06c84",
    "#fc5c7d, #6a82fb",
    "#108dc7, #ef8e38",
  ];
  const dir = randomInArray(dirs);
  const color = randomInArray(colors);
  return `linear-gradient(to ${dir}, ${color})`;
}

/**
 * 缓存获取数据的函数,不要每次都重新获取
 * @param {Function} fn
 * @param {Function} makeKey
 * @returns {any}
 */
export function memoize(fn, makeKey = JSON.stringify) {
  const mem = async function(...args) {
    const key = makeKey(args);
    const cache = mem.cache;
    if (!cache.has(key)) {
      const res = await fn.apply(this, args);
      cache.set(key, res);
    }
    return cache.get(key);
  };
  mem.cache = new Map();
  return mem;
}

/**
 * 将日期字符串处理为 2022年12月23日 12:24 这种格式
 * @param {string} str
 * @returns {string}
 */
export function dateFormat(str) {
  const fillZero = (val) => (val < 10 ? `0${val}` : val);
  const date = new Date(str);
  const y = date.getFullYear();
  const m = fillZero(date.getMonth() + 1);
  const d = fillZero(date.getDate());
  const h = fillZero(date.getHours());
  const i = fillZero(date.getMinutes());
  // const s = fillZero(date.getSeconds());
  return `${y}-${m}-${d} ${h}:${i}`;
}
