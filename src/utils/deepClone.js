/*
 * @name 深克隆
 * @param initalObj:Object/Array
 * @return obj:Object/Array
 */
const deepClone = initalObj => {
  if (!initalObj) {
    return initalObj;
  }
  let obj = Array.isArray(initalObj) ? [] : {};
  if (initalObj && typeof initalObj === "object") {
    for (let i in initalObj) {
      const prop = initalObj[i];
      // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
      if (prop === obj) {
        continue;
      }
      if (typeof prop === "object") {
        obj[i] = deepClone(prop);
      } else {
        obj[i] = prop;
      }
    }
  } else {
    obj = initalObj;
  }
  return obj;
};
export default deepClone;
