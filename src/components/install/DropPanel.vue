<template>
  <div class="drop-wrap" :id="rootPanelId">
    <!-- 被安装分类容器 -->
    <div
      class="drop-panel"
      v-for="(item, index) in dropList"
      :key="index"
      :id="item.id"
    >
      <div class="panel-title">{{ item.title }}</div>
      <el-row :gutter="20" class="panel-content" v-if="item.list">
        <!-- 被安装模块容器 -->
        <el-col
          v-for="(moduleObj, moduleIndex) in item.list"
          :key="moduleIndex"
          :span="item.layout.span"
          :class="['drop-box', item.layout.theme]"
        >
          <div class="drop-box-wrap">
            <div
              :class="{
                'box-content': true,
                installed: moduleObj.installed,
                'remove-disabled': moduleObj.childrenInstalledCount,
                linking:
                  drawLineFromObj &&
                  drawLineFromObj.moduleObj.id == moduleObj.id,
                linked: moduleObj.linked,
              }"
              :data-id="moduleObj.id"
              :data-type="moduleObj.type"
              :data-installed="moduleObj.installed"
              :draggable="
                moduleObj.installed && !moduleObj.childrenInstalledCount
              "
              @dragstart="removeStartEvent($event, moduleObj)"
              @dragover="installAllowDropEvent($event, moduleObj)"
              @drop="installDropEvent($event, moduleObj)"
              @click="
                selectedType &&
                !moduleObj.children &&
                moduleObj.linkType &&
                moduleObj.installed &&
                !moduleObj.linked
                  ? drawLineEvent($event, moduleObj, [index, moduleIndex])
                  : false
              "
            >
              <i :class="['box-icon', moduleObj.icon]"></i>
            </div>

            <template v-if="moduleObj.installed && moduleObj.children">
              <!-- 被安装子容器 -->
              <div class="box-children-content">
                <div
                  v-for="(moduleChildObj,
                  moduleChildIndex) in moduleObj.children"
                  :key="moduleChildIndex"
                  :class="{
                    'box-child': true,
                    installed: moduleChildObj.installed,
                    linking:
                      drawLineFromObj &&
                      drawLineFromObj.moduleObj.id == moduleChildObj.id,
                    linked: moduleChildObj.linked,
                  }"
                  :data-id="moduleChildObj.id"
                  :data-type="moduleChildObj.type"
                  :data-installed="moduleChildObj.installed"
                  :draggable="moduleChildObj.installed"
                  @dragstart="
                    removeStartEvent($event, moduleChildObj, moduleObj)
                  "
                  @dragover="
                    installAllowDropEvent($event, moduleChildObj, moduleObj)
                  "
                  @drop="installDropEvent($event, moduleChildObj, moduleObj)"
                  @click="
                    selectedType &&
                    moduleChildObj.linkType &&
                    moduleChildObj.installed &&
                    !moduleChildObj.linked
                      ? drawLineEvent($event, moduleChildObj, [
                          index,
                          moduleIndex,
                          moduleChildIndex,
                        ])
                      : false
                  "
                >
                  <i :class="['box-icon', moduleChildObj.icon]"></i>
                </div>
              </div>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 连线组件 -->
    <c-draw-line
      :options="drawLines.options"
      :linesArray="drawLines.array"
      :removeLineEvent="removeLineEvent"
    />
  </div>
</template>

<script>
import CDrawLine from "@/components/install/DrawLine.vue";

export default {
  name: "install-drop-panel",
  data() {
    return {
      drawLineFromObj: null, //连线起点接口对象
    };
  },
  computed: {
    drawLines() {
      const linesOptions = {
        width: 6,
      };
      const originLineList = this.lineList;
      console.log("连线集合", JSON.stringify(originLineList));

      const linesArray = [];
      originLineList.forEach((item, index) => {
        // 缓存当前连线对象
        const line = item;
        //缓存起点对象
        const fromPointObj = line.from;
        // 终点对象
        const toPointObj = line.to;
        // 被安装模块列表
        const dropList = this.dropList;
        console.log("dropList", dropList);
        // 起点所属顶级模块对象
        const fromPointTopObj =
          fromPointObj.indexArray && dropList[fromPointObj.indexArray[0]]
            ? dropList[fromPointObj.indexArray[0]]
            : [];
        // 终点所属顶级模块对象
        const toPointTopObj =
          toPointObj.indexArray && dropList[toPointObj.indexArray[0]]
            ? dropList[toPointObj.indexArray[0]]
            : [];

        // 起点所属顶级模块theme
        const fromPointTheme = fromPointTopObj.layout.theme
          ? fromPointTopObj.layout.theme
          : "";
        // 终点所属顶级模块theme
        const toPointTheme = toPointTopObj.layout.theme
          ? toPointTopObj.layout.theme
          : "";
        console.log(
          "顶级模块",
          fromPointTopObj,
          toPointTopObj,
          fromPointTheme,
          toPointTheme
        );

        // 起点父容器index
        const fromPointFatherIndex = fromPointObj.indexArray[1];
        // 终点父容器index
        const toPointFatherIndex = toPointObj.indexArray[1];

        // 起点父容器模块
        const fromPointFatherObj = fromPointTopObj.list[fromPointFatherIndex];
        // 终点父容器模块
        const toPointFatherObj = toPointTopObj.list[toPointFatherIndex];
        console.log(
          "父容器",
          fromPointFatherIndex,
          toPointFatherIndex,
          fromPointFatherObj,
          toPointFatherObj
        );

        // 缓存容器ID
        const rootPanelId = this.rootPanelId;
        // 缓存起点容器ID
        const fromPointId = fromPointObj.moduleObj.id;
        // 缓存终点容器ID
        const toPointId = toPointObj.moduleObj.id;
        // 缓存起点父容器ID
        const fromPointFatherId = fromPointFatherObj.id;
        // 缓存终点父容器ID
        const toPointFatherId = toPointFatherObj.id;
        console.log(
          "容器id",
          rootPanelId,
          fromPointId,
          toPointId,
          fromPointFatherId,
          toPointFatherId
        );

        //缓存top容器元素对象
        const $rootPanelEl = document.getElementById(rootPanelId);

        // 获取top容器坐标
        const rootPanelPosition = {
          x: $rootPanelEl.getBoundingClientRect().width / 2,
          y: $rootPanelEl.getBoundingClientRect().height / 2,
          left: 10,
          right: $rootPanelEl.getBoundingClientRect().width,
          top: 0,
          bottom: $rootPanelEl.getBoundingClientRect().height,
          width: $rootPanelEl.getBoundingClientRect().width,
          height: $rootPanelEl.getBoundingClientRect().height,
        };
        console.log("rootpanel容器坐标", rootPanelPosition);

        // 获取起点父容器坐标
        const fromPointFatherPosition = this.getElPosition(
          fromPointFatherId,
          rootPanelId
        );
        // 获取终点父容器坐标
        const toPointFatherPosition = this.getElPosition(
          toPointFatherId,
          rootPanelId
        );
        console.log(
          "父容器坐标",
          fromPointFatherPosition,
          toPointFatherPosition
        );

        // 获取起点坐标
        const fromPointPosition = this.getElPosition(fromPointId, rootPanelId);
        // 获取终点坐标
        const toPointPosition = this.getElPosition(toPointId, rootPanelId);
        // 赋值连线路径坐标集合
        console.log("起终点坐标", fromPointPosition, toPointPosition);

        // 路径坐标集合
        let points = [];
        // 添加起点坐标
        points.push(fromPointPosition.x);
        points.push(fromPointPosition.y);
        // 获取起点坐标一侧中间坐标集合
        const fromPointMiddlePoints = this.getLinePathMiddlePoints({
          fromPointPosition: fromPointPosition,
          toPointPosition: toPointPosition,
          fromPointTheme: fromPointTheme,
          fromPointFatherIndex: fromPointFatherIndex,
          fromPointFatherPosition: fromPointFatherPosition,
          rootPanelPosition: rootPanelPosition,
        });
        // 获取终点坐标一侧中间坐标集合
        const toPointMiddlePoints = this.getLinePathMiddlePoints({
          fromPointPosition: toPointPosition,
          toPointPosition: fromPointPosition,
          fromPointTheme: toPointTheme,
          fromPointFatherIndex: toPointFatherIndex,
          fromPointFatherPosition: toPointFatherPosition,
          rootPanelPosition: rootPanelPosition,
          reverse: true, //反转坐标集合
        });

        // 拼接坐标集合
        points = [...points, ...fromPointMiddlePoints, ...toPointMiddlePoints];

        // 添加终点坐标
        points.push(toPointPosition.x);
        points.push(toPointPosition.y);
        // 赋值坐标集合到连线
        line.points = points;
        // 添加连线到连线集合
        linesArray.push(line);
      });
      // 返回连线配置和集合
      return {
        options: linesOptions,
        array: linesArray,
      };
    },
  },
  props: [
    "rootPanelId", //当前panel的根ID，用于区分和查询子元素
    "dropList",
    "lineList",
    "addLineFun",
    "removeLineFun",
    "selectedType",
    "installAllowDropFun",
    "installDropFun",
    "removeStartFun",
  ],
  watch: {
    selectedType(newVal, oldVal) {
      // 切换selectedType，卸载连线起点缓存
      this.drawLineFromObj = null;
    },
  },
  components: {
    CDrawLine,
  },
  mounted() {},
  methods: {
    // 安装-drop-允许状态确认-事件
    installAllowDropEvent(event, moduleObj, fatherModuleObj) {
      if (
        this.installAllowDropFun &&
        typeof this.installAllowDropFun == "function"
      ) {
        this.installAllowDropFun(event, moduleObj, fatherModuleObj);
      }
    },
    // 安装-drop-事件
    installDropEvent(event, moduleObj, fatherModuleObj) {
      if (this.installDropFun && typeof this.installDropFun == "function") {
        this.installDropFun(event, moduleObj, fatherModuleObj);
      }
    },
    // 卸载-start-事件
    removeStartEvent(event, moduleObj, fatherModuleObj) {
      // 如果接口已连线。禁止卸载
      if (moduleObj.linked) {
        event.preventDefault();
        return false;
      }
      // 如果接口尚未安装，禁止卸载
      if (!moduleObj.installed) {
        event.preventDefault();
        return false;
      }
      // 执行卸载事件
      if (this.removeStartFun && typeof this.removeStartFun == "function") {
        this.removeStartFun(event, moduleObj, fatherModuleObj);
      }
    },
    // 连线-安装-事件
    drawLineEvent(event, moduleObj, indexArray = []) {
      // 参数错误
      if (!event || !moduleObj || !moduleObj.linkType) {
        this.$message({
          message: "非法操作",
          type: "error",
        });
        return false;
      }
      // 连线类型未选择
      if (!this.selectedType) {
        this.$message({
          message: "请选择连线类型",
          type: "error",
        });
        return false;
      }
      // 当前模块未安装
      if (!moduleObj.installed) {
        this.$message({
          message: "当前模块未安装",
          type: "error",
        });
        return false;
      }
      // 当前接口已连线
      if (moduleObj.linked) {
        this.$message({
          message: "当前模块已连线",
          type: "error",
        });
        return false;
      }
      // 当前接口连线类型错误
      if (this.selectedType != moduleObj.linkType) {
        this.$message({
          message: "当前模块连线类型错误",
          type: "error",
        });
        return false;
      }
      // 如果是第一次点击接口，缓存该接口
      if (!this.drawLineFromObj) {
        this.drawLineFromObj = {
          moduleObj: moduleObj,
          indexArray: indexArray,
        };
        return false;
      }

      // 如果重复点击相同接口，取消连线
      if (
        this.drawLineFromObj &&
        this.drawLineFromObj.moduleObj.id == moduleObj.id
      ) {
        this.drawLineFromObj = null;
        return false;
      }

      // 如果点击了相同模块下的接口，取消连线
      if (
        this.drawLineFromObj &&
        this.drawLineFromObj.indexArray[0] == indexArray[0]
      ) {
        this.$message({
          message: "同一个模块下的接口之间无法连线",
          type: "error",
        });
        return false;
      }
      this.drawLineFromObj.moduleObj.linked = true;
      moduleObj.linked = true;
      // 添加连线到父组件
      if (this.addLineFun && typeof this.addLineFun == "function") {
        this.addLineFun({
          width: 6,
          class: this.selectedType == "F" ? "primary" : "custom",
          from: {
            moduleObj: this.drawLineFromObj.moduleObj,
            indexArray: this.drawLineFromObj.indexArray,
          },
          to: {
            moduleObj: moduleObj,
            indexArray: indexArray,
          },
        });
      }
      // 清空接口缓存
      this.drawLineFromObj = null;
      this.$message({
        message: "连线成功",
        type: "success",
      });
    },
    // 连线-卸载-事件
    removeLineEvent(event, line, index) {
      const $rootPanel = document.getElementById(this.rootPanelId);
      console.log(event.x, $rootPanel.getBoundingClientRect().left);
      console.log(event.y, $rootPanel.getBoundingClientRect().top);

      // 如果鼠标焦点未曾超出父容器范围，取消拖拽
      if (
        !$rootPanel ||
        (event.x >= $rootPanel.getBoundingClientRect().left &&
          event.y >= $rootPanel.getBoundingClientRect().top)
      ) {
        return false;
      }
      // 卸载接口连线状态
      line.from.moduleObj.linked = false;
      line.to.moduleObj.linked = false;
      if (this.removeLineFun && typeof this.removeLineFun == "function") {
        this.removeLineFun(index);
      }
    },
    // 获取元素相对topPanel的position
    getElPosition(elId, rootPanelId) {
      const $rootPanelEl = document.getElementById(rootPanelId);
      // 通过data-id查找子元素
      const $el = $rootPanelEl.querySelector(`[data-id=${elId}]`);
      const rootClientRect = $rootPanelEl.getBoundingClientRect();
      const elClientRect = $el.getBoundingClientRect();
      console.log('获取元素相对TopPanel位置',rootClientRect,elClientRect);
      return {
        x:
          elClientRect.left +
          elClientRect.width / 2 +
          $rootPanelEl.scrollLeft -
          rootClientRect.left,
        y:
          elClientRect.top +
          elClientRect.height / 2 +
          $rootPanelEl.scrollTop -
          rootClientRect.top,
        width: elClientRect.width,
        height: elClientRect.height,
        left: elClientRect.left + $rootPanelEl.scrollLeft - rootClientRect.left,
        right:
          elClientRect.left +
          $rootPanelEl.scrollLeft -
          rootClientRect.left +
          elClientRect.width,
        top: elClientRect.top + $rootPanelEl.scrollTop - rootClientRect.top,
        bottom:
          elClientRect.top +
          $rootPanelEl.scrollTop -
          rootClientRect.top +
          elClientRect.height,
      };
    },
    // 获取连线路径相对topPanel取值的中间点集合
    getLinePathMiddlePoints(params = {}) {
      const {
        fromPointPosition,
        toPointPosition,
        fromPointTheme,
        fromPointFatherIndex,
        fromPointFatherPosition,
        rootPanelPosition,
        reverse,
      } = params;

      const pointsArray = [];
      // 添加起点拐角坐标
      switch (fromPointTheme) {
        case "theme-1":
          // 如果所属父模块index为0,增加1个点
          if (fromPointFatherIndex < 1) {
            // 点1-左拐至rootPanel容器左侧
            pointsArray.push([rootPanelPosition.left, fromPointPosition.y]);
          } else {
            // 如果所属父模块index大于0，增加3个点
            // 点1-从起点正数-左拐
            pointsArray.push([
              fromPointFatherPosition.left,
              fromPointPosition.y,
            ]);

            // 如果起点y小于终点y
            if (fromPointPosition.y < toPointPosition.y) {
              // 点2-从起点正数-向下
              pointsArray.push([
                fromPointFatherPosition.left,
                fromPointFatherPosition.bottom,
              ]);
              // 点3-从起点正数-左拐至rootPanel容器左侧
              pointsArray.push([
                rootPanelPosition.left,
                fromPointFatherPosition.bottom,
              ]);
            } else {
              // 点2-从起点正数-向上
              pointsArray.push([
                fromPointFatherPosition.left,
                fromPointFatherPosition.top,
              ]);
              // 点3-从起点正数-左拐至相对top容器位移为0
              pointsArray.push([
                rootPanelPosition.left,
                fromPointFatherPosition.top,
              ]);
            }
          }
          break;
        case "theme-2":
          // 点1-从起点正数-向下
          pointsArray.push([
            fromPointPosition.x,
            fromPointFatherPosition.bottom,
          ]);
          // 点2-从起点正数-左拐至rootPanel容器左侧
          pointsArray.push([
            rootPanelPosition.left,
            fromPointFatherPosition.bottom,
          ]);
          break;
        default:
          break;
      }

      // 反转中间点集合（用于终点作为起始取值）
      if (pointsArray && reverse) {
        pointsArray.sort((a, b) => -1);
      }
      //展开所有嵌套数组，二维数组变一维数组
      const points = pointsArray.reduce((prev, cur) => {
        return prev.concat(cur);
      });
      return points;
    },
  },
};
</script>
