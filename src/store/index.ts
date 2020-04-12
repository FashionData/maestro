type State = {
  counter: number
}

export const store = {
  state: {
    counter: 0
  },
  getters: {
    counter: (state: State) => state.counter
  },
  mutations: {
    increment (state: State) {
      state.counter += 1
    }
  }
};
