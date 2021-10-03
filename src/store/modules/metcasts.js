const namespaced = true;

const state = {
  metcasts: [],
};

const mutations = {
  setMetcastsMutation(store, metcasts) {
    state.metcasts = metcasts;
  },
};

const actions = {
  setMetcastsAction({ commit }, metcasts) {
    commit('setMetcastsMutation', metcasts);
  },
};

const getters = {
  metcastsList(store) {
    return store.metcasts;
  },
};

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
