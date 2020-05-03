import Utils from "@/utils";
import cmd1 from "./cmd1";
import cmd2 from "./cmd2";
// 各cmd模块数据集合拼接成新数据集合
const cmdArray = [cmd1, cmd2];

// 对cmdArray进行数据处理
class CmdList {
  constructor() {}
  // 深拷贝，防止源数据被篡改
  cloneData() {
    return Utils.deepClone(cmdArray);
  }
  // 获取tree，用于树形展示
  getCmdTree() {
    // 克隆数据
    const newCmdArray = this.cloneData();
    // 初始化数组
    const cmdTree = [];
    // 遍历一级节点集合
    newCmdArray.forEach((obj, index) => {
      // 分离出二级节点集合
      const { children, ...newObj } = obj;
      // 初始化一级节点的子节点集合
      newObj.children = [];
      // 遍历二级节点集合
      children.forEach((childObj, childIndex) => {
        // 分离出字段集合
        const { items, ...newChildObj } = childObj;
        // 设置parentId，便于搜索二级节点数据
        newChildObj.parentId = newObj.id;
        // 将分离出字段集合的二级节点加入到一级节点的子节点集合
        newObj.children.push(newChildObj);
      });
      // 将过滤过的一级节点加入tree集合
      cmdTree.push(newObj);
    });
    return cmdTree;
  }
  // 获取建议列表，用于模糊搜索
  getCmdRestaurants() {
    // 克隆数据
    const newCmdArray = this.cloneData();
    // 初始化数组
    let cmdRestaurants = [];
    // 遍历一级节点集合，将二级节点数据拼接成数组集合
    newCmdArray.forEach(arr => {
      cmdRestaurants = cmdRestaurants.concat([...arr.children]);
    });
    return cmdRestaurants;
  }
  // 获取map，用于数据搜索
  getCmdMap() {
    // 克隆数据
    const newCmdArray = this.cloneData();
    // 初始化Map
    const cmdMap = new Map();
    // 遍历一级集合
    newCmdArray.forEach((obj, index) => {
      // 分离出二级节点集合
      const { children, ...newObj } = obj;
      // 一级节点加入map集合
      cmdMap.set(newObj.id, newObj);
      // 遍历二级节点集合
      children.forEach((childObj, childIndex) => {
        // 分离出字段集合
        const { items, ...newChildObj } = childObj;
        // 设置parentId，便于关联一级节点数据
        newChildObj.parentId = newObj.id;
        // 二级节点加入map集合
        cmdMap.set(newChildObj.id, newChildObj);
        // 遍历字段集合
        items.forEach((item, itemIndex) => {
          // 设置parentId，便于搜索二级节点数据
          item.parentId = childObj.id;
          // 字段集合加入map集合
          cmdMap.set(item.id, item);
        });
      });
    });
    return cmdMap;
  }
}
export default CmdList;
