import mutationsTypes from "@/store/mutations-types";
const currentMutationTypes = mutationsTypes.home;
const state = {
  title: "web home",
  content: "home"
};

const getters = {
  title: state => state.title,
  content: state => state.content
};
const mutations = {
  [currentMutationTypes.SET_TITLE](state, data) {
    state.title = data;
  },
  [currentMutationTypes.SET_CONTENT](state, data) {
    state.content = data;
  }
};
const actions = {
  setTitle({ commit }, data) {
    commit(currentMutationTypes.SET_TITLE, data);
  },
  setContent({ commit }, data) {
    commit(currentMutationTypes.SET_CONTENT, data);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
