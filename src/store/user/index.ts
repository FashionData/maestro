import { User } from "@/types";

type State = {
  user: User;
  isAuthenticated: boolean;
};

export const userStore = {
  state: {
    user: {},
    isAuthenticated: false
  },
  getters: {
    user: (state: State) => state.user,
    isAuthenticated: (state: State) => state.isAuthenticated
  },
  mutations: {
    setUser: (state: State, user: User) => {
      state.user = user
    },
    authenticateUser(state: State) {
      state.isAuthenticated = true;
    },
    logout(state: State) {
      state.isAuthenticated = false;
    }
  },
  actions: {
    // TODO: Type
    setCurrentUser: ({ commit }: any, user: User) => {
      commit('setUser', user)
    },
    // TODO: Type
    authenticateUser ({ commit, dispatch }: any, user: User) {
      return new Promise((resolve, reject) => {
        commit("authenticateUser");
        dispatch("setCurrentUser", user);
        resolve()
      });
    },
    // TODO: Type
    logout({ commit }: any) {
      return new Promise((resolve, reject) => {
        commit("logout");
        resolve()
      });
    }
  }
};
