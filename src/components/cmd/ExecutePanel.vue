<template>
  <el-card>
    <el-row>
      <el-col :span="12">
        <el-autocomplete
          :ref="inputRefname"
          class="ime-mode-disabled"
          v-model="cmdValue"
          v-bind="autocompleteConfig"
          :fetch-suggestions="querySearch"
          @select="handleSelect"
          @clear="handleClear"
        ></el-autocomplete>
      </el-col>
      <el-col :span="6">
        <el-button @click="initFormDataEvent">获取</el-button>
      </el-col>
      <el-col :span="6">
        <el-button @click="executeFormDataEvent" :disabled="!executable"
          >执行</el-button
        >
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import Utils from "@/utils";

export default {
  name: "cmd-execute-panel",
  data() {
    return {
      inputRefname: "cmd-input-ref-" + new Date().getTime() + Math.random(), //输入框ref名称，添加随机数，防止组件被重复调用时数据混乱
      autocompleteConfig: {
        debounce: 300, //获取输入建议的去抖延时
        triggerOnFocus: false,
        valueKey: "label",
        clearable: true, //是否可清空
        placeholder: "请输入内容" //输入框占位文本
      }
    };
  },
  computed: {
    // 展示数据
    showData: {
      get: function() {
        return this.cmdData.showData;
      },
      set: function(val) {
        this.setCmdData({
          showData: val
        });
      }
    },
    // 执行禁止状态
    executable: {
      get() {
        return this.cmdData.executable;
      },
      set(val) {
        this.setCmdData({
          executable: val
        });
      }
    },
    // 执行数据
    executeData: {
      get: function() {
        return this.cmdData.executeData;
      },
      set: function(val) {
        this.setCmdData({
          executeData: val
        });
      }
    },
    // 执行结果
    executeResult: {
      get: function() {
        return this.cmdData.executeResult;
      },
      set: function(val) {
        this.setCmdData({
          executeResult: val
        });
      }
    },
    // 初始表单数据
    formInitData: {
      get() {
        return this.cmdData.formInitData || null;
      },
      set(val) {
        this.setCmdData({
          formInitData: val
        });
      }
    },
    // 选中的cmd
    selectedCmd: {
      get: function() {
        return this.cmdData.selectedCmd;
      },
      set: function(val) {
        this.setCmdData({
          selectedCmd: val
        });
      }
    },
    // 输入值
    cmdValue: {
      get: function() {
        return this.cmdData.cmdValue;
      },
      set: function(val) {
        let newVal = null;
        if (val) {
          // const newVal = val.replace(/[\u4e00-\u9fa5]/gi, "");//替换中文
          newVal = val.replace(/[^\w\-\s\/]/gi, ""); //只能输入字母、空格和横岗
          newVal = newVal.toUpperCase();
        }
        this.setCmdData({
          cmdValue: newVal
        });
      }
    }
  },
  props: ["cmdRestaurants", "cmdData", "setCmdData"],
  watch: {
    formInitData(newVal, oldVal) {
      if (!newVal) {
        // 监听表单初始化数据变化，如果该数据为空，则禁止执行
        this.executable = false;
      }
    }
  },
  components: {},
  methods: {
    // 搜索建议值
    querySearch(queryString, callback) {
      var cmdRestaurants = this.cmdRestaurants;
      var results = queryString
        ? cmdRestaurants.filter(this.createFilter(queryString))
        : cmdRestaurants;
      // 调用 callback 返回建议列表的数据
      callback(results);
    },
    // 筛选数据
    createFilter(queryString) {
      return restaurant => {
        return (
          //模糊查询
          restaurant.label.indexOf(queryString.toUpperCase()) > -1
        );
      };
    },
    // 选择建议值
    handleSelect(item) {
      if (item) {
        this.cmdValue = item.id;
        this.selectedCmd = item;
      }
    },
    // 删除建议值并清空数据（执行结果数据除外）
    handleClear() {
      //初始化数据
      this.setCmdData({
        cmdValue: null, //输入的cmd值
        selectedCmd: null, //选中的cmd对象
        showData: null, //展示数据
        executeData: null, //执行数据
        executable: false, //是否可执行
        formInitData: null //表单初始化数据
      });
      // 输入框强制失焦，防止出现输入时无法展开下拉框的现象
      this.$refs[this.inputRefname].getInput().blur();
    },
    // 初始化表单数据
    initFormDataEvent() {
      if (!this.cmdValue || !this.selectedCmd) {
        // 删除建议值并清空数据
        this.handleClear();
        return;
      }
      const formInitData = Utils.deepClone(this.selectedCmd);
      // 清空表单初始化数据
      this.formInitData = formInitData;
      // 清空执行数据
      this.executeData = null;
      // 清空展示数据
      this.showData = null;
    },
    // 执行form表单数据
    executeFormDataEvent() {
      this.executeResult = {
        state: 1,
        showData: this.showData,
        message: "执行成功",
        createTime: new Date()
      };
      // 删除建议值并清空数据
      this.handleClear();
    }
  }
};
</script>
