const namespaced = true;

const state = {
  settingsState: false,
};

const mutations = {
  setSettingsStateMutation(store, settingsState) {
    store.settingsState = settingsState;
  },
};

const actions = {
  setSettingsStateAction({ commit }, settingsState) {
    commit('setSettingsStateMutation', settingsState);
  },
};

const getters = {
  settingsState(store) {
    return store.settingsState;
  },
};

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
