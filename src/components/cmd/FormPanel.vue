<template>
  <el-card class="form-wrap">
    <div slot="header">
      <span>{{ formInitData.label }}</span>
    </div>
    <el-form :model="formData" :ref="formRefName" v-bind="formConfig">
      <template v-for="(item, index) in formItems">
        <el-form-item
          :class="{ 'form-required': item.isRequired }"
          :prop="item.id"
          :label="item.label"
          :rules="!item.hidden ? item.rules : null"
          :key="index"
          v-show="!item.hidden"
        >
          <!-- 普通input框 -->
          <el-input
            class="form-input"
            v-if="item.type == 'input'"
            v-model="formData[item.id]"
            v-bind="item.attributes"
            :disabled="item.disabled"
            @change="handleValueChange"
          />
          <!-- nubmer类型input框 -->
          <el-input
            class="form-input"
            v-if="item.type == 'number'"
            v-model.number="formData[item.id]"
            v-bind="item.attributes"
            :disabled="item.disabled"
            @change="handleValueChange"
          />
          <!-- slect类型选择框 -->
          <el-select
            v-if="item.type == 'select'"
            v-model="formData[item.id]"
            v-bind="item.attributes"
            :disabled="item.disabled"
            @change="handleValueChange"
          >
            <template v-for="(option, optionIndex) in item.options">
              <el-option
                :key="optionIndex"
                :label="option.label"
                :value="option.value"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
      </template>
    </el-form>
  </el-card>
</template>
<script>
import Utils from "@/utils";

export default {
  name: "cmd-form-panel",
  data() {
    return {
      formRefName: "cmd-form-ref-" + new Date().getTime() + Math.random(),//表单ref，添加随机数，防止组件被重复调用时数据混乱
      formConfig: {
        labelWidth: "100px", //标签文字宽度
        hideRequiredAsterisk: true //	是否显示必填字段的标签旁边的红色星号
      },
      // 表单数据集合
      formData: {},
      // 表单字段集合
      formItems: {}
    };
  },
  watch: {
    formInitData(newVal, oldVal) {
      // 初始化数据转换为表单数据
      this.initDataToFormDataFun();
    }
  },
  computed: {
    // 初始表单数据
    formInitData() {
      return this.cmdData.formInitData || null;
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
    }
  },
  mounted() {
    // 初始化数据转换为表单数据
    this.initDataToFormDataFun();
  },
  props: ["cmdData", "setCmdData"],
  methods: {
    // 初始化数据转换为表单数据
    initDataToFormDataFun() {
      const _this = this;
      const formInitData = this.formInitData;
      let formItems = {};
      let formData = {};
      if (formInitData && formInitData.items) {
        // 遍历初始化数据并转化为表单数据
        formInitData.items.forEach(item => {
          formData[item.id] = item.defaultValue || "";
          formItems[item.id] = Utils.deepClone(item);
        });
      }
      // 表单字段集合
      this.formItems = formItems;
      // 表单数据集合
      this.formData = formData;
      // 延迟触发校验规则，防止form未渲染完成
      _this.asyncValidateForm();
    },
    //校验表单-修复element-ui校验bug
    validateForm() {
      const $form = this.$refs[this.formRefName];
      
      const promise = new Promise(function(resolve, reject) {
        let valid = true;
        let invalidFields = [];
        // 遍历表单项并校验
        $form.fields.forEach(function(field) {
          field.validate("", function(message) {
            if (message) {
              valid = false;
              invalidFields.push(field);
            }
          });
        });
        valid ? resolve(valid) : reject(invalidFields);
      });
      return promise;
    },
    //异步校验表单
    asyncValidateForm(time) {
      const _this = this;
      const _time = time || 100;
      // 延迟触发校验规则
      setTimeout(() => {
        _this
          .validateForm()
          .then(valid => {
            //执行状态设置为true
            _this.executable = true;
            // 返回可执行数据
            _this.setExecuteDataFun();
          })
          .catch(invalidFields => {
            //未通过校验，执行状态设置为false
            _this.executable = false;
          });
      }, _time);
    },
    // 向父组件传递执行数据
    setExecuteDataFun() {
      const formInitData = this.formInitData;
      const formData = this.formData;
      const formItems = this.formItems;

      let showData = `${formInitData.id}:`;
      Object.keys(formData).forEach(key => {
        const item = formItems[key];
        //如果字段隐藏，且有建议值，显示建议值
        if (item.hidden && item.recommendedValue) {
          showData += `${key}=${item.recommendedValue};`;
          return;
        }
        //如果字段隐藏，且无建议值，不展示
        if (item.hidden && !item.recommendedValue) {
          return;
        }
        // 如果字段值为空，且有建议值，显示建议值
        if (formData[key] == "" && item.recommendedValue) {
          showData += `${key}=${item.recommendedValue};`;
          return;
        }
        // 如果字段值为空，且无建议值，不显示
        if (formData[key] == "" && !item.recommendedValue) {
          return;
        }
        // 如果字段数值为空，不显示
        if (formData[key] == "") {
          return;
        }
        showData += `${key}=${formData[key]};`;
      });
      this.showData = showData;
      this.executeData = {
        formItems: formItems, // 表单字段数据
        formData: formData // 表单数据
      };
    },
    // 利用初始表单数据中的扩展方法清洗动态表单数据
    filterFormDataFun() {
      const formInitData = Utils.deepClone(this.formInitData);
      // 克隆数据，防止表单数据频繁更改而触发更新
      const formData = Utils.deepClone(this.formData);
      const formItems = Utils.deepClone(this.formItems);

      // 调用扩展清洗规则清洗数据
      if (formInitData.extendFilters) {
        // 缓存表单
        const $form = this.$refs[this.formRefName];
        formInitData.extendFilters.forEach(filter => {
          // 数据清洗
          const prop = filter.prop;
          const relationProps = filter.relationProps;
          const validator = filter.validator;
          if (filter.prop && filter.relationProps) {
            // 校验部分字段
            $form.validateField(relationProps, errorMessage => {
              if (!errorMessage) {
                // 显示字段
                formItems[prop].hidden = false;
              } else {
                // 隐藏字段
                // delete formData[prop];
                formItems[prop].hidden = true;
                formData[prop] = formItems[prop].defaultValue || "";
              }
            });
          }
          if (prop && validator && typeof validator == "function") {
            // 如果自定义校验规则通过
            if (validator(formData)) {
              // 显示字段
              formItems[prop].hidden = false;
            } else {
              // 隐藏字段
              formItems[prop].hidden = true;
              formData[prop] = formItems[prop].defaultValue || "";
            }
          }
        });
      }
      this.formItems = formItems;
      this.formData = formData;
    },
    // 监听数据改变
    handleValueChange(val) {
      const _this = this;
      // 清洗数据
      _this.filterFormDataFun();
      // 延迟触发校验规则，防止form未渲染完成
      _this.asyncValidateForm();
    }
  }
};
</script>
