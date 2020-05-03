<template>
  <div :id="appId" :class="['sn-web', 'page-panel', layoutClass]">
    <div class="page-header">
      vuecli web
    </div>
    <div :class="['page-main']">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {
      appId: "app",
      layout: {
        //布局
        theme: "primary",
        size: "md"
      }
    };
  },
  computed: {
    screenWidth: {
      get() {
        return this.$store.getters.screenWidth;
      },
      set(val) {
        this.$store.dispatch("setScreenWidth", val);
      }
    },
    screenHeight: {
      get() {
        return this.$store.getters.screenHeight;
      },
      set(val) {
        this.$store.dispatch("setScreenHeight", val);
      }
    },
    layoutClass() {
      if (this.screenWidth >= 1200) {
        this.layout.size = "lg";
      }
      if (this.screenWidth < 1200) {
        this.layout.size = "md";
      }
      if (this.screenHeight >= 600) {
        this.layout.theme = "custom";
      }
      if (this.screenHeight < 600) {
        this.layout.theme = "primary";
      }
      return ["layout-" + this.layout.theme, "layout-" + this.layout.size];
    }
  },
  mounted() {
    const that = this;
    window.onresize = function() {
      // 定义窗口大小变更通知事件
      that.screenWidth = document.documentElement.clientWidth; //窗口宽度
      that.screenHeight = document.documentElement.clientHeight; //窗口高度
    };
  },
  methods: {}
};
</script>
