import mutationsTypes from "@/store/mutations-types";
const currentMutationTypes = mutationsTypes.install;
const state = {
  title: "install",
  data1: {},
  data2: {}
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
    state.data2 = data;
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
