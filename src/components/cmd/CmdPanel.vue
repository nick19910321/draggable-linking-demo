<template>
  <el-row class="cmd">
    <el-col :xs="24" :sm="6" :md="6" :lg="4" class="left-panel">
      <el-scrollbar class="left-panel-wrap page-scrollbar">
        <slot name="tap-tool"></slot>
        <c-tree-panel
          :cmdTree="cmdTree"
          :cmdMap="cmdMap"
          :cmdRestaurants="cmdRestaurants"
          :cmdData="cmdData"
          :setCmdData="setCmdData"
        ></c-tree-panel>
      </el-scrollbar>
    </el-col>
    <el-col :xs="24" :sm="18" :md="18" :lg="20" class="main-panel">
      <el-scrollbar class="main-panel-wrap page-scrollbar">
        <c-tabs-panel>
          <c-info-panel slot="tab-info" :cmdData="cmdData"></c-info-panel>
          <c-action-panel slot="tab-action"></c-action-panel>
          <c-description-panel slot="tab-description"></c-description-panel>
        </c-tabs-panel>
        <c-show-panel :cmdData="cmdData"></c-show-panel>
        <c-execute-panel
          :cmdRestaurants="cmdRestaurants"
          :cmdData="cmdData"
          :setCmdData="setCmdData"
        ></c-execute-panel>
        <c-form-panel
          v-if="cmdData && cmdData.formInitData"
          :cmdData="cmdData"
          :setCmdData="setCmdData"
        ></c-form-panel>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script>
import CTreePanel from "@/components/cmd/TreePanel.vue";
import CTabsPanel from "@/components/cmd/TabsPanel.vue";
import CInfoPanel from "@/components/cmd/InfoPanel.vue";
import CActionPanel from "@/components/cmd/ActionPanel.vue";
import CDescriptionPanel from "@/components/cmd/DescriptionPanel.vue";
import CShowPanel from "@/components/cmd/ShowPanel.vue";
import CExecutePanel from "@/components/cmd/ExecutePanel.vue";
import CFormPanel from "@/components/cmd/FormPanel.vue";

import CmdList from "@/components/cmd/list";
export default {
  data() {
    return {
      title: "cmd-panel",
      cmdTree: null,
      cmdRestaurants: null,
      cmdMap: null
    };
  },
  computed: {},
  props: ["cmdData", "setCmdData"],
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 绑定tree数据
      this.cmdTree = new CmdList().getCmdTree();
      // 绑定execute建议列表数据
      this.cmdRestaurants = new CmdList().getCmdRestaurants();
      // 绑定cmd的Map数据
      this.cmdMap = new CmdList().getCmdMap();
    }
  },
  components: {
    CTreePanel,
    CTabsPanel,
    CInfoPanel,
    CActionPanel,
    CDescriptionPanel,
    CShowPanel,
    CExecutePanel,
    CFormPanel
  }
};
</script>
