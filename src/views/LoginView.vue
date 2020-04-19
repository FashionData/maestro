<template>
  <div class="login-view">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="authenticateUser"
      >
        <el-form-item prop="username">
          <el-input
            v-model="model.username"
            placeholder="Username"
            prefix-icon="fas fa-user"
          />
        </el-form-item>
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

<script>
import { HOME } from "@/constants/router/routes-names";

export default {
  name: "login-view",
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      isLoading: false,
    };
  },
  methods: {
    successCallback(user) {
      this.$store
        .dispatch("authenticateUser", user)
        .then(() => {
          this.isLoading = false;
          this.$router.push(
            this.$route.query.redirect
              ? this.$route.query.redirect.toString()
              : { name: HOME }
          );
        })
        .catch(() => {
          // TODO: Add error message in UI
          this.isLoading = false;
        });
    },
    errorCallback() {
      this.$log("Authentication error");
    },
    authenticateUser() {
      this.$log("Authentication...");
      // TODO: Add authentication
    },
    googleAuthentication() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();

      this.isLoading = true;
      this.$firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
          this.successCallback(res.user);
        })
        .catch(() => {
          // TODO: Add error message in UI
          this.errorCallback();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  // TODO: Define height

  .login-form {
    width: 290px;
  }
}
</style>
