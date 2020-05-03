<template>
  <el-tree
    class="tree-wrap"
    :ref="treeRefName"
    v-bind="treeConfig"
    :data="cmdTree"
    :props="treeDefaultProps"
    @node-click="handleNodeClick"
  ></el-tree>
</template>
<script>
export default {
  name: "cmd-tree-panel",
  data() {
    return {
      treeRefName: "cmd-tree-ref-" + new Date().getTime() + Math.random(), // 树形控件ref，添加随机数，防止组件被重复调用时数据混乱
      treeConfig: {
        highlightCurrent: true,
        defaultExpandAll: true,
        showCheckbox: false,
        nodeKey: "id"
      },
      treeDefaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  props: ["cmdTree", "cmdMap", "cmdRestaurants", "cmdData", "setCmdData"],
  computed: {
    selectedCmd: {
      get() {
        return this.cmdData.selectedCmd || null;
      },
      set(val) {
        this.setCmdData({
          selectedCmd: val
        });
      }
    },
    cmdValue: {
      get() {
        return this.cmdData.cmdValue || null;
      },
      set(val) {
        this.setCmdData({
          cmdValue: val
        });
      }
    }
  },
  watch: {
    // 监听选中的cmd
    selectedCmd(newVal, oldVal) {
      const treeNode = this.$refs[this.treeRefName];
      if (!treeNode) {
        return false;
      }
      // 当前cmd
      const currentCmd = newVal;
      const cmdMap = this.cmdMap;
      if (currentCmd && currentCmd.id) {
        // 在树形控件中选中当前节点
        treeNode.setCurrentKey(currentCmd.id);
        // 搜索map集合，查询当前节点的数据
        const currentNode = treeNode.getNode(currentCmd.id);
        // 如果父节点ID存在，则展开树形控件中的父节点
        if (currentNode && currentNode.parent) {
          // 如果父节点存在，展开父节点
          currentNode.parent.expanded = true;
        }
      } else {
        // 取消选中控件节点
        treeNode.setCurrentKey(null);
      }
    }
  },
  mounted() {},
  methods: {
    // 点击节点，根据清空填充建议值
    handleNodeClick(data) {
      const treeRefName = this.treeRefName;
      // const id = data.id ? data.id : null;
      const currentKey = this.$refs[treeRefName].getCurrentKey();
      // 如果参数为空、当前key为空、当前节点有子节点，终止操作
      if (!data || !currentKey || data.children) {
        return false;
      }
      // 根据选中的key搜索建议值
      const cmdRestaurants = this.cmdRestaurants;
      const selectedCmd = cmdRestaurants.find(item => {
        return item.id == currentKey;
      });
      // 选中cmd
      if (selectedCmd) {
        this.cmdValue = selectedCmd.id;
        this.selectedCmd = selectedCmd;
      }
    }
  }
};
</script>
