<template>
  <el-row class="install">
    <el-col :xs="24" :sm="6" :md="6" :lg="4" class="left-panel">
      <el-scrollbar class="left-panel-wrap page-scrollbar">
        <slot name="tap-tool"></slot>
        <!-- 安装组件 -->
        <c-drag-panel
          :rootPanelId="dragPanelId"
          :dragList="dragList"
          :selectedType="selectedType"
          :selectFun="selectFun"
          :installStartFun="installStartFun"
          :removeAllowDropFun="removeAllowDropFun"
          :removeDropFun="removeDropFun"
        ></c-drag-panel>
      </el-scrollbar>
    </el-col>
    <el-col :xs="24" :sm="18" :md="18" :lg="20" class="main-panel">
      <el-scrollbar class="main-panel-wrap page-scrollbar">
        <!-- 被安装组件 -->
        <c-drop-panel
          :rootPanelId="dropPanelId"
          :dropList="dropList"
          :lineList="lineList"
          :addLineFun="addLineFun"
          :removeLineFun="removeLineFun"
          :selectedType="selectedType"
          :installAllowDropFun="installAllowDropFun"
          :installDropFun="installDropFun"
          :removeStartFun="removeStartFun"
        ></c-drop-panel>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script>
import CDragPanel from "@/components/install/DragPanel.vue";
import CDropPanel from "@/components/install/DropPanel.vue";

export default {
  name: "install-panel",
  data() {
    return {
      selectedType: "", //选择模块类型
      installingType: "", //安装中模块类型
      removingModuleObj: null, //删除中模块对象
      removingFatherModuleObj: null, //删除中模块的父对象
      dragList: [
        //安装模块列表
        {
          id: "origin-module-array-1",
          title: "module-array-1",
          list: [
            {
              id: "origin-module-A",
              title: "module-A",
              type: "A",
              icon: "el-icon-video-camera",
              draggable: true,
              selectable: false
            },
            {
              id: "origin-module-B",
              title: "module-B",
              type: "B",
              icon: "el-icon-headset",
              draggable: true,
              selectable: false
            }
          ]
        },
        {
          id: "origin-module-array-2",
          title: "module-array-2",
          list: [
            {
              id: "origin-module-C",
              title: "module-C",
              type: "C",
              icon: "el-icon-umbrella",
              draggable: true,
              selectable: false
            },
            {
              id: "origin-module-D",
              title: "module-D",
              type: "D",
              icon: "el-icon-phone-outline",
              draggable: true,
              selectable: false
            }
          ]
        },
        {
          id: "origin-module-array-3",
          title: "module-array-3",
          list: [
            {
              id: "origin-module-E",
              title: "module-E",
              type: "E",
              icon: "el-icon-right",
              draggable: false,
              selectable: true
            },
            {
              id: "origin-module-F",
              title: "module-F",
              type: "F",
              icon: "el-icon-d-arrow-right",
              draggable: false,
              selectable: true
            },
            {
              id: "origin-module-G",
              title: "module-G",
              type: "G",
              icon: "el-icon-minus",
              draggable: false,
              selectable: true
            }
          ]
        }
      ],
      dropList: [
        //被安装布局列表
        {
          id: "module-D",
          title: "module-D",
          layout: {
            theme: "theme-2",
            span: 6
          },
          list: [
            {
              id: "module-D1",
              title: "module-D1",
              type: "D",
              icon: "el-icon-phone-outline",
              installed: false,
              linkType: "F"
            },
            {
              id: "module-D2",
              title: "module-D2",
              type: "D",
              icon: "el-icon-phone-outline",
              installed: false,
              linkType: "F"
            },
            {
              id: "module-D3",
              title: "module-D3",
              type: "D",
              icon: "el-icon-phone-outline",
              installed: false,
              linkType: "F"
            },
            {
              id: "module-D4",
              title: "module-D4",
              type: "D",
              icon: "el-icon-phone-outline",
              installed: false,
              linkType: "F"
            }
          ]
        },
        {
          id: "module-A",
          title: "module-A",
          layout: {
            theme: "theme-1",
            span: 12
          },
          list: [
            {
              id: "module-A1",
              title: "module-A1",
              type: "A",
              icon: "el-icon-video-camera",
              installed: false,
              childrenInstalledCount: 0,
              children: [
                {
                  id: "module-A1-C1",
                  title: "module-A1-C1",
                  type: "C",
                  icon: "el-icon-umbrella",
                  installed: false,
                  linked: false,
                  linkType: "E"
                },
                {
                  id: "module-A1-C2",
                  title: "module-A1-C2",
                  type: "C",
                  icon: "el-icon-umbrella",
                  installed: false,
                  linked: false,
                  linkType: "E"
                }
              ]
            },
            {
              id: "module-A2",
              title: "module-A2",
              type: "A",
              icon: "el-icon-video-camera",
              installed: false,
              childrenInstalledCount: 0,
              children: [
                {
                  id: "module-A2-C1",
                  title: "module-A2-C1",
                  type: "C",
                  icon: "el-icon-umbrella",
                  installed: false,
                  linked: false,
                  linkType: "E"
                },
                {
                  id: "module-A2-C2",
                  title: "module-A2-C2",
                  type: "C",
                  icon: "el-icon-umbrella",
                  installed: false,
                  linked: false,
                  linkType: "E"
                }
              ]
            }
          ]
        },
        {
          id: "module-B",
          title: "module-B",
          layout: {
            theme: "theme-1",
            span: 12
          },
          list: [
            {
              id: "module-B1",
              title: "module-B1",
              type: "B",
              icon: "el-icon-headset",
              installed: false,
              childrenInstalledCount: 0,
              children: [
                {
                  id: "module-B1-D1",
                  title: "module-B1-D1",
                  type: "D",
                  icon: "el-icon-phone-outline",
                  installed: false,
                  linked: false,
                  linkType: "F"
                },
                {
                  id: "module-B1-D2",
                  title: "module-B1-D2",
                  type: "D",
                  icon: "el-icon-phone-outline",
                  installed: false,
                  linked: false,
                  linkType: "F"
                }
              ]
            },
            {
              id: "module-B2",
              title: "module-B2",
              type: "B",
              icon: "el-icon-headset",
              installed: false,
              childrenInstalledCount: 0,
              children: [
                {
                  id: "module-B2-D1",
                  title: "module-B2-D1",
                  type: "D",
                  icon: "el-icon-phone-outline",
                  installed: false,
                  linked: false,
                  linkType: "F"
                },
                {
                  id: "module-B2-D2",
                  title: "module-B2-D2",
                  type: "D",
                  icon: "el-icon-phone-outline",
                  installed: false,
                  linked: false,
                  linkType: "F"
                }
              ]
            }
          ]
        },
        {
          id: "module-C",
          title: "module-C",
          layout: {
            theme: "theme-2",
            span: 6
          },
          list: [
            {
              id: "module-C1",
              title: "module-C1",
              type: "C",
              icon: "el-icon-umbrella",
              installed: false,
              linkType: "E"
            },
            {
              id: "module-C2",
              title: "module-C2",
              type: "C",
              icon: "el-icon-umbrella",
              installed: false,
              linkType: "E"
            },
            {
              id: "module-C3",
              title: "module-C3",
              type: "C",
              icon: "el-icon-umbrella",
              installed: false,
              linkType: "E"
            },
            {
              id: "module-C4",
              title: "module-C4",
              type: "C",
              icon: "el-icon-umbrella",
              installed: false,
              linkType: "E"
            }
          ]
        }
      ],
      lineList: []
    };
  },
  computed: {
    dragPanelId() {
      return "install-drag-panel-" + this.panelCode;
    },
    dropPanelId() {
      return "install-drop-panel-" + this.panelCode;
    }
  },
  props: [
    "panelCode",
    "typeCode",
    "screenWidth",
    "screenHeight",
    "installData",
    "setInstallData"
  ],
  components: {
    CDragPanel,
    CDropPanel
  },
  watch: {
    typeCode: function(val) {
      //监听type标识变化
      this.lineList = [...this.lineList];
    },
    screenWidth: function(val) {
      //监听屏幕宽度变化
      this.lineList = [...this.lineList];
    },
    screenHeight: function(val) {
      //监听屏幕高度变化
      this.lineList = [...this.lineList];
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // TODO 初始化installData数据
    },
    // drag-panel选择模块
    selectFun(event, moduleObj) {
      let selectedType = moduleObj.type;
      if (this.selectedType == selectedType) {
        selectedType = null;
      }
      this.selectedType = selectedType;
    },
    // drag-panel安装开始
    installStartFun(event, moduleObj) {
      this.installingType = moduleObj.type;
    },
    // drag-panel卸载允许检测
    removeAllowDropFun(event) {
      event.preventDefault();
      // 如果正在安装模块，或者不存在删除动作
      if (this.installingType || !this.removingModuleObj) {
        event.dataTransfer.dropEffect = "none";
        return false;
      }
      event.dataTransfer.dropEffect = "link";
    },
    // drag-panel卸载
    removeDropFun(event) {
      // 非法卸载
      if (!this.removingModuleObj) {
        return false;
      }
      //模块卸载
      this.removingModuleObj.installed = false;
      //模块缓存卸载
      this.removingModuleObj = null;

      //父模块卸载
      if (this.removingFatherModuleObj) {
        this.removingFatherModuleObj.childrenInstalledCount--;
        //父模块缓存卸载
        this.removingFatherModuleObj = null;
      }
    },
    // drop-panel安装允许检测
    installAllowDropFun(event, moduleObj, fatherModuleObj) {
      event.preventDefault();
      if (this.installingType != moduleObj.type || moduleObj.installed) {
        event.dataTransfer.dropEffect = "none";
      } else {
        event.dataTransfer.dropEffect = "copy";
      }
    },
    // drop-panel安装
    installDropFun(event, moduleObj, fatherModuleObj) {
      // 非法安装
      if (!this.installingType || !moduleObj) {
        this.installingType = null;
        return false;
      }
      //类型不同，取消安装
      if (this.installingType && this.installingType != moduleObj.type) {
        this.$message({
          message: "模块类型不同，无法安装",
          type: "error"
        });
        this.installingType = null;
        return false;
      }
      moduleObj.installed = true;
      //父模块中子模块的安装统计+1
      if (fatherModuleObj) {
        fatherModuleObj.childrenInstalledCount++;
      }
      //卸载安装类型
      this.installingType = null;
    },
    // drop-panel卸载开始
    removeStartFun(event, moduleObj, fatherModuleObj) {
      //缓存安装对象
      this.removingModuleObj = moduleObj;
      //缓存父模块安装对象
      if (fatherModuleObj) {
        this.removingFatherModuleObj = fatherModuleObj;
      }
    },
    // 添加连线
    addLineFun(line) {
      console.log('添加连线线段', line);
      
      this.lineList.push(line);
    },
    //删除连线
    removeLineFun(index) {
      this.lineList.splice(index, 1);
    }
  }
};
</script>
