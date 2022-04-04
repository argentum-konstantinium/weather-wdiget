import Vue from 'vue';
import Vuex from 'vuex';
import locations from './modules/locations';
import metcasts from './modules/metcasts';
import widget from './modules/widget';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    widget,
    locations,
    metcasts,
  },
});
