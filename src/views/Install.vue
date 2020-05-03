<template>
  <div class="fullsceen">
    <!-- type为1时展示一个cmd -->
    <template v-if="currentProcess.type == 1">
      <!-- 赋值panelCode为1 -->
      <c-install-panel
        :panelCode="1"
        :typeCode="typeCode"
        :setTypeCode="setTypeCode"
        :screenWidth="screenWidth"
        :screenHeight="screenHeight"
        :installData="installData1"
        :setInstallData="setInstallData1"
      >
      </c-install-panel>
    </template>
    <!-- type为2时展示两个cmd -->
    <template v-if="currentProcess.type == 2">
      <!-- 赋值panelCode为1 -->
      <c-install-panel
        v-show="typeCode == 1"
        :panelCode="1"
        :typeCode="typeCode"
        :screenWidth="screenWidth"
        :screenHeight="screenHeight"
        :installData="installData1"
        :setInstallData="setInstallData1"
      >
        <!-- slot插槽方式添加切换类型页组件 -->
        <c-tap-tool
          slot="tap-tool"
          :typeCode="typeCode"
          :setTypeCode="setTypeCode"
        ></c-tap-tool>
      </c-install-panel>
      <!-- 赋值panelCode为2 -->
      <c-install-panel
        v-show="typeCode == 2"
        :panelCode="2"
        :type="currentProcess.type"
        :typeCode="typeCode"
        :screenWidth="screenWidth"
        :screenHeight="screenHeight"
        :installData="installData2"
        :setInstallData="setInstallData2"
      >
        <!-- slot插槽方式添加切换类型页组件 -->
        <c-tap-tool
          slot="tap-tool"
          :typeCode="typeCode"
          :setTypeCode="setTypeCode"
        ></c-tap-tool>
      </c-install-panel>
    </template>
  </div>
</template>

<script>
import CInstallPanel from "@/components/install/InstallPanel.vue";
import CTapTool from "@/components/TapTool.vue";

export default {
  name: "install",
  data() {
    return {
      typeCode: 1 // type标记，用于当前页面切换类型页
    };
  },
  computed: {
    screenWidth() {
      return this.$store.getters.screenWidth;
    },
    screenHeight() {
      return this.$store.getters.screenHeight;
    },
    // 安装数据1
    installData1: {
      get() {
        return this.$store.getters["install/data1"];
      },
      set(val) {
        // 实时获取变化后的数据，防止数据不同步
        const data = this.$store.getters["install/data1"];
        // 赋值时对原引用对象进行合并赋值，防止引用被替换而导致循环执行
        const newData = Object.assign(data, val);
        this.$store.dispatch("install/setData1", newData);
      }
    },
    // 安装数据2
    installData2: {
      get() {
        return this.$store.getters["install/data2"];
      },
      set(val) {
        // 实时获取变化后的数据，防止数据不同步
        const data = this.$store.getters["install/data2"];
        // 赋值时对原引用对象进行合并赋值，防止引用被替换而导致循环执行
        const newData = Object.assign(data, val);
        this.$store.dispatch("install/setData2", newData);
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
    CInstallPanel,
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
        this.installData1 =
          currentStepsData &&
          currentStepsData.install &&
          currentStepsData.install.data1
            ? currentStepsData.install.data1
            : null;
        return;
      }

      if (currentProcess && currentProcess.type == 2) {
        this.installData1 =
          currentStepsData &&
          currentStepsData.install &&
          currentStepsData.install.data1
            ? currentStepsData.install.data1
            : null;
        this.installData2 =
          currentStepsData &&
          currentStepsData.install &&
          currentStepsData.install.data2
            ? currentStepsData.install.data2
            : null;

        return;
      }
    },

    setTypeCode(code) {
      this.typeCode = code;
    },
    setInstallData1(data) {
      this.installData1 = data;
    },
    setInstallData2(data) {
      this.installData2 = data;
    }
  }
};
</script>
