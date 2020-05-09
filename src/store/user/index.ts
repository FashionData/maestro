import { AnyObject, User } from "@/types";
import { Collections } from "@/constants/firebase";

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
    // TODO: Type + reject
    authenticateUser ({ commit, dispatch }: any, { firebase, user }: { firebase: AnyObject, user: User }) {
      const setUser = firebase.firestore().collection(Collections.users).doc(user.uid).set({
        id: user.uid,
        disabled: false,
        deleted: false,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        creationTime: user.metadata.creationTime,
      }, { merge: true })

      // TODO: Update collection path
      const setConnectionHistory = firebase.firestore().collection(`${Collections.users}/${user.uid}/connections-history`).doc().set({
        userId: user!.uid,
        date: firebase.firestore.Timestamp.now(),
      })

      return new Promise((resolve, reject) => {

        Promise.all([setUser, setConnectionHistory])
          .then(() => {
            commit("authenticateUser");
            dispatch("setCurrentUser", user);
            resolve()
          })
          .catch((e) => reject(e))
      });
    },
    // TODO: Type + reject
    logout({ commit }: any) {
      return new Promise((resolve) => {
        commit("logout");
        resolve()
      });
    }
  }
};
