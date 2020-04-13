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
      // TODO: Push to home or redirect via url params
    },
    logout(state: State) {
      state.isAuthenticated = false;
    }
  }
};
