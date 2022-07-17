import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    counter:10,
    user:null,
    isAuthenticated:false,
    users: [],
    selectedTemplate: 0
  },
  getters: {
  },
  mutations: {
    setUser(state,user){
      state.user = user
    },
    setIsAuthenticated(state,isAuthenticated){
      state.isAuthenticated = isAuthenticated
    },
    addUser(state,user){
      state.users.push(user)
    },
    setUsers(state,users){
      state.users = users
    },
    setSelectedTemplate(state, selectedTemplate){
      state.selectedTemplate = selectedTemplate
    }
  },
  actions: {
  },
  modules: {
  }
})
