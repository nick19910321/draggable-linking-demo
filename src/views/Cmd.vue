<template>
  <div class="fullsceen">
    <!-- type为1时展示一个cmd -->
    <template v-if="currentProcess.type == 1">
      <!-- 赋值panelCode为1 -->
      <c-cmd-panel
        :panelCode="1"
        :typeCode="typeCode"
        :setTypeCode="setTypeCode"
        :cmdData="cmdData1"
        :setCmdData="setCmdData1"
      >
      </c-cmd-panel>
    </template>
    <!-- type为2时展示两个cmd -->
    <template v-if="currentProcess.type == 2">
      <!-- 赋值panelCode为1 -->
      <c-cmd-panel
        v-show="typeCode == 1"
        :panelCode="1"
        :cmdData="cmdData1"
        :setCmdData="setCmdData1"
      >
        <!-- slot插槽方式添加切换类型页组件 -->
        <c-tap-tool
          slot="tap-tool"
          :typeCode="typeCode"
          :setTypeCode="setTypeCode"
        ></c-tap-tool>
      </c-cmd-panel>
      <!-- 赋值panelCode为2 -->
      <c-cmd-panel
        v-show="typeCode == 2"
        :panelCode="2"
        :cmdData="cmdData2"
        :setCmdData="setCmdData2"
      >
        <!-- slot插槽方式添加切换类型页组件 -->
        <c-tap-tool
          slot="tap-tool"
          :typeCode="typeCode"
          :setTypeCode="setTypeCode"
        ></c-tap-tool>
      </c-cmd-panel>
    </template>
  </div>
</template>

<script>
import CCmdPanel from "@/components/cmd/CmdPanel.vue";
import CTapTool from "@/components/TapTool.vue";
import mutationsTypes from "@/store/mutations-types";
export default {
  name: "cmd",
  data() {
    return {
      typeCode: 1 // type标记，用于当前页面切换类型页
    };
  },
  computed: {
    // cmd数据1
    cmdData1: {
      get() {
        return this.$store.getters["cmd/data1"];
      },
      set(val) {
        // 实时获取变化后的数据，防止数据不同步
        const data = this.$store.getters["cmd/data1"];
        // 赋值时对原引用对象进行合并赋值，防止引用被替换而导致循环执行
        const newData = Object.assign(data, val);
        this.$store.dispatch("cmd/setData1", newData);
      }
    },
    // cmd数据2
    cmdData2: {
      get() {
        return this.$store.getters["cmd/data2"];
      },
      set(val) {
        // 实时获取变化后的数据，防止数据不同步
        const data = this.$store.getters["cmd/data2"];
        // 赋值时对原引用对象进行合并赋值，防止引用被替换而导致循环执行
        const newData = Object.assign(data, val);
        this.$store.dispatch("cmd/setData2", newData);
      }
    },
    // 工作流数据
    currentProcess: {
      get() {
        return this.$store.getters["process/currentProcess"];
      },
      set(val) {
        this.$store.dispatch("process/setCurrentProcess", val);
      }
    },
    // 工作流步骤数据
    currentStepsData: {
      get() {
        return this.$store.getters["process/currentStepsData"];
      },
      set(val) {
        this.$store.dispatch("process/currentStepsData", val);
      }
    }
  },
  props: [],
  components: {
    CCmdPanel,
    CTapTool
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const currentProcess = this.currentProcess;
      const currentStepsData = this.currentStepsData;
      if (currentProcess && currentProcess.type == 1) {
        this.cmdData1 =
          currentStepsData && currentStepsData.cmd && currentStepsData.cmd.data1
            ? currentStepsData.cmd.data1
            : null;
        return;
      }

      if (currentProcess && currentProcess.type == 2) {
        this.cmdData1 =
          currentStepsData && currentStepsData.cmd && currentStepsData.cmd.data1
            ? currentStepsData.cmd.data1
            : null;
        this.cmdData2 =
          currentStepsData && currentStepsData.cmd && currentStepsData.cmd.data2
            ? currentStepsData.cmd.data2
            : null;

        return;
      }
    },

    setTypeCode(code) {
      this.typeCode = code;
    },
    setCmdData1(data) {
      this.cmdData1 = data;
    },
    setCmdData2(data) {
      this.cmdData2 = data;
    }
  }
};
</script>
