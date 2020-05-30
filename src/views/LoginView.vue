<template>
  <div class="login-view">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        ref="form"
        @submit.native.prevent="authenticateUser"
      >
        <el-form-item prop="username">
          <!-- TODO: Translate placeholder -->
          <el-input
            v-model="model.email"
            placeholder="Email"
            prefix-icon="fa fa-user"
          />
        </el-form-item>
        <!-- TODO: Translate placeholder -->
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="fas fa-lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            type="primary"
            native-type="submit"
            block
          >
            Login
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="isLoading"
            type="primary"
            block
            @click="googleAuthentication"
          >
            Google
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { User } from "@/types";
import { HOME } from "@/constants/router/routes";
import { Messages } from "@/constants/ui";
let callback: any = null;
let metadataRef: any = null;
export default {
  name: "login-view",
  data() {
    return {
      model: {
        email: "",
        password: ""
      },
      isLoading: false
    };
  },
  methods: {
    successCallback(user: User) {
      this.$store
        .dispatch("authenticateUser", { firebase: this.$firebase, user })
        .then(() => {
          this.isLoading = false;
          this.$router.push(
            this.$route.query.redirect
              ? this.$route.query.redirect.toString()
              : { name: HOME.name }
          );
        })
        .catch(() => this.errorCallback());
    },
    errorCallback() {
      this.isLoading = false;
      this.$message({
        type: "error",
        // TODO: Add translation
        message: "Authentication failed",
        duration: Messages.duration
      });
    },
    authenticateUser() {
      const { email, password } = this.model;

      this.isLoading = true;
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => this.successCallback(user))
        .catch(() => this.errorCallback());
    },
    googleAuthentication() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().onAuthStateChanged(user => {
        console.log({ user }, "CHANGED");
        if (callback) {
          metadataRef.off("value", callback);
        }
        // On user login add new listener.
        if (user) {
          // Check if refresh is required.
          metadataRef = this.$firebase
            .database()
            .ref("metadata/" + user.uid + "/refreshTime");
          callback = _ => {
            // Force refresh to pick up the latest custom claims changes.
            // Note this is always triggered on first call. Further optimization could be
            // added to avoid the initial trigger when the token is issued and already contains
            // the latest claims.
            user.getIdToken(true);
          };
          // Subscribe new listener to changes on that node.
          metadataRef.on("value", callback);
        }
      });
      this.isLoading = true;
      this.$firebase
        .auth()
        .signInWithPopup(provider)
        .then(({ user }) => this.successCallback(user))
        .catch(() => this.errorCallback());
    }
  }
};
</script>
