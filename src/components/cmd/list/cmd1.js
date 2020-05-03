const cmds = [
  {
    id: "CMD-1-1",
    label: "CMD-1-1",
    items: [
      {
        id: "CMD-1-1-1",
        label: "糕点",
        type: "select",
        value: "",
        defaultValue: "2",
        isRequired: true,
        rules: [{ required: true, message: "请选择糕点", trigger: "change" }],
        options: [
          {
            value: "1",
            label: "黄金糕"
          },
          {
            value: "2",
            label: "双皮奶"
          },
          {
            value: "3",
            label: "蚵仔煎"
          },
          {
            value: "4",
            label: "龙须面"
          },
          {
            value: "5",
            label: "北京烤鸭"
          }
        ]
      },
      {
        id: "CMD-1-1-2",
        label: "单价(元)",
        type: "number",
        value: "",
        defaultValue: "1",
        isRequired: true,
        attributes: {
          minlength: 1,
          maxlength: 3
        },
        rules: [
          { required: true, message: "请输入单价", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error());
                return;
              }

              if (!/^[0-9]{1,3}$/.test(value)) {
                callback(new Error());
                return;
              }
              callback();
            },
            message: "请输入1-3位有效数字",
            trigger: "blur"
          }
        ]
      },

      {
        id: "CMD-1-1-3",
        label: "数量",
        type: "number",
        value: "",
        defaultValue: "",
        isRequired: true,
        attributes: {
          minlength: 0,
          maxlength: 3
        },
        rules: [
          { required: true, message: "请输入数量", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error());
                return;
              }

              if (!/^[0-9]{1,3}$/.test(value)) {
                callback(new Error("请输入1-3位有效数字"));
                return;
              }
              callback();
            },
            trigger: "blur"
          }
        ]
      },
      {
        id: "CMD-1-1-4",
        label: "折扣(折)",
        type: "input",
        value: "",
        defaultValue: "",
        recommendedValue: "9",
        isRequired: false,
        attributes: {
          minlength: 0,
          maxlength: 3
        },
        disabled: false,
        hidden: true,
        rules: [
          { required: false, message: "请输入折扣", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback();
                return;
              }
              if (!/^[1-9]{1}|[1-9]{1}.[0-9]*$/.test(value)) {
                callback(new Error("请输入1.0到9.9之间的有效数字"));
              }
              callback();
            },
            trigger: "blur"
          }
        ]
      }
    ],
    // 扩展清洗规则
    extendFilters: [
      // {
      //   // 受影响字段
      //   prop: "CMD-1-1-4",
      //   // 关联字段，三者校验全部通过方可
      //   relationProps: ["CMD-1-1-1", "CMD-1-1-2", "CMD-1-1-3"]
      // },
      {
        // 受影响字段
        prop: "CMD-1-1-4",
        // 自定义校验规则
        validator: fromData => {
          if (fromData["CMD-1-1-3"] > 2) {
            return true;
          }
          return false;
        }
      }
    ]
  },
  {
    id: "CMD-1-2",
    label: "CMD-1-2",
    items: [
      {
        id: "CMD-1-2-1",
        label: "CMD-1-2-1",
        type: "input",
        value: "",
        defaultValue: "1",
        isRequired: true,
        attributes: {
          minlength: 1,
          maxlength: 10
        },
        rules: [
          { required: true, message: "请输入字母", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!/^[a-zA-Z]{1,10}$/.test(value)) {
                callback(new Error());
              }
            },
            message: "请输入1~10位字母",
            trigger: "blur"
          }
        ]
      },
      {
        id: "CMD-1-2-2",
        label: "CMD-1-2-2",
        type: "input",
        value: "",
        defaultValue: "1",
        isRequired: false,
        attributes: {
          minlength: 1,
          maxlength: 10
        },
        rules: [
          { required: false, message: "请输入名称", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback();
                return;
              }
              if (!/^[0-9a-zA-Z]{1,10}$/.test(value)) {
                callback(new Error());
              }
            },
            message: "请输入1~10位字母或数字",
            trigger: "blur"
          }
        ]
      }
    ]
  }
];

export default {
  id: "CMD-1",
  label: "CMD-1",
  children: [...cmds]
};
