import { AnyObject, User } from "@/types";
import { IVueI18n } from "vue-i18n";
import firebase from "firebase";
import { LS_LANGUAGE_KEY } from "@/init/plugins/vue-i18n";
import { Collections } from "@/constants/firebase";
import { Roles } from "@/constants";
import { getRole } from "@/utils/role";

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
    user: (state: State): User => state.user,
    isGranted: (state: State) => (role: Roles) => state.user.role.code >= role,
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
      {
        firebase,
        i18n,
        user
      }: { firebase: AnyObject; i18n: IVueI18n; user: firebase.User }
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
                localStorage.setItem(
                  LS_LANGUAGE_KEY,
                  i18n.fallbackLocale as string
                );
                firebase
                  .firestore()
                  .collection(Collections.users)
                  .doc(user.uid)
                  .update({ language: i18n.fallbackLocale });
                i18n.locale = i18n.fallbackLocale as string;
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

      return new Promise(async (resolve, reject) => {
        const role = getRole(await user.getIdTokenResult(true));
        Promise.all([setLocale, setUser, setConnectionHistory])
          .then(() => {
            commit("authenticateUser");
            dispatch("setCurrentUser", { ...user.toJSON(), role });
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
