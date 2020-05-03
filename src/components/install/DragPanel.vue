<template>
  <!-- 拖拽-列表容器 -->
  <div
    class="drag-wrap"
    @dragover="removeAllowDropEvent($event)"
    @drop="removeDropEvent($event)"
    :id="rootPanelId"
  >
    <!-- 拖拽-分类容器 -->
    <div class="drag-panel" v-for="(item, index) in dragList" :key="index" :data-id="item.id">
      <div class="panel-title">{{ item.title }}</div>
      <div class="panel-content">
        <!-- 拖拽模块容器 -->
        <div
          class="drag-box"
          v-for="(moduleObj, moduleIndex) in item.list"
          :key="moduleIndex"
          :data-type="moduleObj.type"
        >
          <!-- 拖拽模块 -->
          <div
            :class="{
              'box-content': true
            }"
            :data-id="moduleObj.id"
            :draggable="moduleObj.draggable"
            @dragstart="installStartEvent($event, moduleObj)"
            v-if="moduleObj.draggable"
          >
            <i :class="['box-icon', moduleObj.icon]"></i>
            <div class="box-title">{{ moduleObj.title }}</div>
          </div>
          <!-- 连线选择模块 -->
          <div
            :class="{
              'box-content': true,
              selected: selectedType && selectedType == moduleObj.type
            }"
            :selected="selectedType && selectedType == moduleObj.type"
            v-else-if="moduleObj.selectable"
            @click="selectEvent($event, moduleObj)"
          >
            <i :class="['box-icon', moduleObj.icon]"></i>
            <div class="box-title">{{ moduleObj.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "install-drag-panel",
  data() {
    return {};
  },
  props: [
    "rootPanelId", //当前panel的根ID，用于区分和查询子元素
    "dragList",
    "selectedType",
    "selectFun",
    "installStartFun",
    "removeAllowDropFun",
    "removeDropFun"
  ],
  methods: {
    // 安装-start-事件
    installStartEvent(event, moduleObj) {
      if (this.installStartFun && typeof this.installStartFun == "function") {
        this.installStartFun(event, moduleObj);
      }
    },
    // 选择-连线-事件
    selectEvent(event, moduleObj) {
      if (this.selectFun && typeof this.selectFun == "function") {
        this.selectFun(event, moduleObj);
      }
    },
    // 卸载-drop-允许状态确认-事件
    removeAllowDropEvent(event) {
      event.preventDefault();
      if (
        this.removeAllowDropFun &&
        typeof this.removeAllowDropFun == "function"
      ) {
        this.removeAllowDropFun(event);
      }
    },
    // 卸载-drop-事件
    removeDropEvent(event) {
      event.preventDefault();
      if (this.removeDropFun && typeof this.removeDropFun == "function") {
        this.removeDropFun(event);
      }
    }
  }
};
</script>
