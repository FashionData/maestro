type State = {
  isAuthenticated: boolean;
};

export const userStore = {
  state: {
    isAuthenticated: false
  },
  getters: {
    isAuthenticated: (state: State) => state.isAuthenticated
  },
  mutations: {
    authenticateUser(state: State) {
      state.isAuthenticated = true;
    },
    logout(state: State) {
      state.isAuthenticated = false;
    }
  },
  actions: {
    // TODO: Type
    authenticateUser ({ commit }: any) {
      return new Promise((resolve, reject) => {
        commit("authenticateUser");
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
