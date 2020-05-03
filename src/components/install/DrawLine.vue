<template>
  <!-- 连线列表 -->
  <div class="line-list">
    <!-- 连线 -->
    <div
      class="line-panel"
      v-for="(line, index) in lineList"
      :key="index"
      :class="line.class"
      :data-type="line.type"
      :style="line.styleObj"
      draggable
      @dragstart="dragStart($event, line, index)"
      @dragend="dragEnd($event, line, index)"
    >
      <!-- 路径 -->
      <div
        class="line-path"
        v-for="(path, pathIndex) in line.paths"
        :key="pathIndex"
        :style="path.styleObj"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "install-draw-line",
  data() {
    return {
      removeLineObj: null
    };
  },
  props: ["options", "linesArray", "removeLineEvent"],
  computed: {
    // 连线配置
    lineOptions() {
      return Object.assign(
        {
          width: 4,
          class: "primary"
        },
        this.options ? this.options : {}
      );
    },
    // 连线列表
    lineList() {
      const that = this;
      const lineOptions = this.lineOptions;
      const linesArray = this.linesArray;
      const newLinesArray = [];
      linesArray.forEach((originLine, lineIndex) => {
        const newLine = Object.assign(
          {
            width: lineOptions.width,
            class: lineOptions.class,
            styleObj: {},
            paths: []
          },
          originLine
        );
        const points = originLine.points;
        // point解析
        const xArray = [];
        const yArray = [];
        const xyArray = [];
        points.forEach((item, index) => {
          if (index % 2 == 1) {
            xArray.push(points[index - 1]);
            yArray.push(points[index]);
            xyArray.push([points[index - 1], points[index]]);
          }
        });

        const lineLeft = xArray.sort((a, b) => a - b)[0];
        const lineTop = yArray.sort((a, b) => a - b)[0];

        // 位移
        newLine.layout = {
          left: lineLeft,
          top: lineTop
        };
        // 样式
        newLine.styleObj = {
          left: `${lineLeft}px`,
          top: `${lineTop}px`
        };
        // 点集合
        newLine.xyArray = xyArray;
        // 路径div
        xyArray.forEach((item, index) => {
          if (index > 0) {
            const prevPoint = xyArray[index - 1];
            const currentPoint = xyArray[index];
            const pathObj = that.getPathObj(prevPoint, currentPoint);
            pathObj.styleObj = {
              left: `${pathObj.left - lineLeft - lineOptions.width / 2}px`,
              top: `${pathObj.top - lineTop}px`,
              height: `${pathObj.path + lineOptions.width}px`,
              transform: `rotate(${pathObj.angle}deg)`,
              transformOrigin: `center ${lineOptions.width / 2}px`,
              width: `${lineOptions.width}px`,
              borderRadius: `${lineOptions.width}px`
            };
            newLine.paths.push(pathObj);
          }
        });
        newLinesArray.push(newLine);
      });
      return newLinesArray;
    }
  },
  methods: {
    dragStart(event, line, index) {},
    dragEnd(event, line, index) {
      if (this.removeLineEvent && typeof this.removeLineEvent == "function") {
        this.removeLineEvent(event, line, index);
      }
    },
    //获取路径对象
    getPathObj(prevPoint, currentPoint) {
      const [x1, y1] = prevPoint;
      const [x2, y2] = currentPoint;
      //差值
      const x = x2 - x1;
      const y = y2 - y1;
      // 斜边长
      const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      //弧度
      const radina = Math.atan2(x, y);
      //角度
      const angle = -radina * (180 / Math.PI);

      return {
        prevPoint: prevPoint,
        currentPoint: currentPoint,
        left: x1,
        top: y1,
        path: z,
        angle: angle
      };
    }
  }
};
</script>
