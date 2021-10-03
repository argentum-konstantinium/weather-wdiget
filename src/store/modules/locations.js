const namespaced = true;

const state = {
  locations: [],
};

const mutations = {
  setLocationsMutation(store, locations) {
    store.locations = locations;
  },
};

const actions = {
  setLocationsAction({ commit }, locations) {
    commit('setLocationsMutation', locations);
  },
};

const getters = {
  locations(store) {
    return store.locations;
  },
};

export default {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
