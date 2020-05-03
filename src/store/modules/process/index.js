import mutationsTypes from "@/store/mutations-types";
const currentMutationTypes = mutationsTypes.process;
const state = {
  title: "process",
  // 工作流数据对象:Object
  currentProcess: {
    name: "",
    type: 0,
    step: 0,
    // 工作流步骤数据
    stepsData: null
  }
};
const getters = {
  currentProcess: state => {
    return state.currentProcess;
  },
  currentStep: state => {
    const currentProcess = state.currentProcess;
    const currentStep =
      currentProcess && currentProcess.step ? currentProcess.step : 0;
    return currentStep;
  },
  currentStepsData: state => {
    const currentProcess = state.currentProcess;
    const currentStepsData =
      currentProcess && currentProcess.stepsData
        ? currentProcess.stepsData
        : null;
    return currentStepsData;
  }
};

const mutations = {
  [currentMutationTypes.SET_TITLE](state, data) {
    state.title = data;
  },
  [currentMutationTypes.SET_CURRENT_PROCESS](state, data) {
    state.currentProcess = data;
  },
  [currentMutationTypes.SET_CURRENT_STEP](state, step) {
    const currentProcess = state.currentProcess;
    const newCurrentProcess = Object.assign({}, currentProcess, {
      step: step || 0
    });
    state.currentProcess = newCurrentProcess;
  },
  [currentMutationTypes.SET_CURRENT_STEPS_DATA](state, stepsData) {
    const currentProcess = state.currentProcess;
    const newCurrentProcess = Object.assign({}, currentProcess, {
      stepsData: stepsData || {}
    });
    state.currentProcess = newCurrentProcess;
  }
};
const actions = {
  setTitle({ commit }, data) {
    commit(currentMutationTypes.SET_TITLE, data);
  },
  setCurrentProcess({ commit }, data) {
    commit(currentMutationTypes.SET_CURRENT_PROCESS, data);
  },
  setCurrentStep({ commit }, data) {
    commit(currentMutationTypes.SET_CURRENT_STEP, data);
  },
  setCurrentStepsData({ commit }, data) {
    commit(currentMutationTypes.SET_CURRENT_STEPS_DATA, data);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
