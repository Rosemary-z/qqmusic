import Vue from 'vue'
import Vuex from 'vuex'
import player from './player'
import getHotSongList from './getHotSongList'
Vue.use(Vuex)



export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    player,
    getHotSongList
  }
})