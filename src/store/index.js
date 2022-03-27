import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos_list: [],
  },
  getters: {},
  mutations: {
    RESET_TODOS(state) {
      state.todos_list = [];
    },
    SET_TODOS(state, todos_list) {
      state.todos_list.push(...todos_list);
    },
  },
  actions: {
    async fetch_todos_list({ commit }, page) {
      await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}`)
        .then((response) => response.json())
        .then((response) => {
          commit("SET_TODOS", response);
        });
    },
  },
});
