import { AnyObject, User } from "@/types";
import { IVueI18n } from "vue-i18n";
import firebase from "firebase";
import { fallbackLocale, LS_LANGUAGE_KEY } from "@/init/plugins/vue-i18n";
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
      state.user = user;
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
      commit("setUser", user);
    },
    // TODO: Type + reject
    authenticateUser(
      { commit, dispatch }: any,
      { firebase, i18n, user }: { firebase: AnyObject; i18n: IVueI18n; user: User }
    ) {
      const setLocale = new Promise((resolve, reject) => {
        if (localStorage.getItem(LS_LANGUAGE_KEY)) {
          resolve();
        } else {
          firebase
            .firestore()
            .collection(Collections.users)
            .doc(user.uid)
            .get()
            .then((res: firebase.firestore.DocumentData) => {
              const language = res.data().language;
              if (language) {
                localStorage.setItem(LS_LANGUAGE_KEY, language);
                i18n.locale = language;
              } else {
                localStorage.setItem(LS_LANGUAGE_KEY, fallbackLocale);
                firebase.firestore().collection(Collections.users).doc(user.uid).update({ language: fallbackLocale });
                i18n.locale = fallbackLocale;
              }
              resolve();
            })
            .catch(() => reject());
        }
      });

      const setUser = firebase
        .firestore()
        .collection(Collections.users)
        .doc(user.uid)
        .set(
          {
            id: user.uid,
            disabled: false,
            deleted: false,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            creationTime: user.metadata.creationTime
          },
          { merge: true }
        );

      // TODO: Update collection path
      const setConnectionHistory = firebase
        .firestore()
        .collection(`${Collections.users}/${user.uid}/connections-history`)
        .doc()
        .set({
          userId: user!.uid,
          date: firebase.firestore.Timestamp.now()
        });

      return new Promise((resolve, reject) => {
        Promise.all([setLocale, setUser, setConnectionHistory])
          .then(() => {
            commit("authenticateUser");
            dispatch("setCurrentUser", user);
            resolve();
          })
          .catch(e => reject(e));
      });
    },
    // TODO: Type + reject
    logout({ commit }: any) {
      return new Promise(resolve => {
        commit("logout");
        resolve();
      });
    }
  }
};
