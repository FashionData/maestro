import { AnyObject, User } from "@/types";
import { IVueI18n } from "vue-i18n";
import firebase from "firebase";
import { LS_LANGUAGE_KEY } from "@/init/plugins/vue-i18n";
import { Collections } from "@/constants/firebase";
import { AccountRole, Roles } from "@/constants";
import { getCustomClaims } from "@/utils/role";
import {Store} from "vuex";

type State = {
  user: User;
  selectedAccount: null | string;
  isAuthenticated: boolean;
};

const LS_ACCOUNT_KEY = "m-user-account";

export const userStore: Store<State> = {
  state: {
    // @ts-ignore
    user: {},
    selectedAccount: window?.localStorage.getItem(LS_ACCOUNT_KEY) ?? null,
    isAuthenticated: false
  },
  getters: {
    user: (state: State): User => state.user,
    userSocialInformation: (state: State) => ({
      email: state.user.email,
      displayName: state.user.displayName,
      photoURL: state.user.photoURL,
    }),
    selectedAccount: (state: State): null | AccountRole => {
      if (state.selectedAccount === null) return null;
      return (
        state.user.accountsRole.find(
          r => r.identifier === state.selectedAccount
        ) ?? null
      );
    },
    isGranted: (state: State) => (role: Roles) => state.user.role.code >= role,
    isAuthenticated: (state: State) => state.isAuthenticated
  },
  mutations: {
    setUser: (state: State, user: User) => {
      state.user = user;
    },
    setSelectedAccount: (state: State, accountIdentifier: string) => {
      state.selectedAccount = accountIdentifier;
    },
    clearSelectedAccount: (state: State) => {
      state.selectedAccount = null;
    },
    authenticateUser(state: State) {
      state.isAuthenticated = true;
    },
    logoutUser(state: State) {
      state.isAuthenticated = false;
    }
  },
  actions: {
    // TODO: Type
    setCurrentUser: ({ commit }: any, user: User) => {
      commit("setUser", user);
    },
    clearAccount: ({ commit }: any) => {
      commit("clearSelectedAccount");
      if (window.localStorage) {
        window.localStorage.removeItem(LS_ACCOUNT_KEY);
      }
    },
    // TODO: Type + reject
    chooseAccount: ({ commit }: any, accountIdentifier: string) => {
      commit("setSelectedAccount", accountIdentifier);
      if (window.localStorage) {
        window.localStorage.setItem(LS_ACCOUNT_KEY, accountIdentifier);
      }
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
        const claims = await getCustomClaims(
          firebase.firestore(),
          await user.getIdTokenResult(true)
        );
        Promise.all([setLocale, setUser, setConnectionHistory])
          .then(() => {
            commit("authenticateUser");
            dispatch("setCurrentUser", { ...user.toJSON(), ...claims });
            resolve();
          })
          .catch(e => reject(e));
      });
    },
    // TODO: Type + reject
    logout({ commit }: any) {
      return new Promise(resolve => {
        commit("logoutUser");
        resolve();
      });
    }
  }
};
