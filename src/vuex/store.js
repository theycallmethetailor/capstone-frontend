import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import { stat } from 'fs';
import moment from 'moment'
import { reject, resolve } from 'bluebird';
import state from './state/state'
import mutations from './mutations/mutations'
import { actions } from './actions/actions'
import getters from './getters/getters'



Vue.use(Vuex);
console.log("This is the store actions", actions)
export default new Vuex.Store({
  ...state,
  mutations,
  actions,
  getters,
});
