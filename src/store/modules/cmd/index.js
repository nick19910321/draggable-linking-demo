import mutationsTypes from "@/store/mutations-types";
const currentMutationTypes = mutationsTypes.cmd;
const state = {
  title: "cmd",
  data1: {
    cmdValue: null, //输入的cmd值
    selectedCmd: null, //选中的cmd对象
    showData: null, //展示数据
    executeData: null, //执行数据
    executeResult: null, //执行结果
    executable: false, //是否可执行
    formInitData: null //表单初始化数据
  },
  data2: {
    cmdValue: null, //输入的cmd值
    selectedCmd: null, //选中的cmd对象
    showData: null, //展示数据
    executeData: null, //执行数据
    executeResult: null, //执行结果
    executable: false, //是否可执行
    formInitData: null //表单初始化数据
  }
};
const getters = {
  data1: state => {
    return state.data1;
  },
  data2: state => {
    return state.data2;
  }
};

const mutations = {
  [currentMutationTypes.SET_TITLE](state, data) {
    state.title = data;
  },
  [currentMutationTypes.SET_DATA_1](state, data) {
    state.data1 = data;
  },
  [currentMutationTypes.SET_DATA_2](state, data) {
    state.data12 = data;
  }
};
const actions = {
  setTitle({ commit }, data) {
    commit(currentMutationTypes.SET_TITLE, data);
  },
  setData1({ commit }, data) {
    commit(currentMutationTypes.SET_DATA_1, data);
  },
  setData2({ commit }, data) {
    commit(currentMutationTypes.SET_DATA_2, data);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
