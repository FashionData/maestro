<template>
  <div class="account__chooser">
    <div v-if="userAccountsRole.length === 0">
      <h2>
        <!-- TODO(@liinkiing): i18n -->
        Sorry, you are not associated to an account. Please contact your
        administrator
      </h2>
    </div>
    <div v-else>
      <h2>Select your account</h2>
      <el-form
        @submit.native.prevent="onSubmit"
        ref="form"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="account">
          <el-select
            v-model="form.account"
            filterable
            class="account__role--account"
            placeholder="Select"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button
            :disabled="form.account === null"
            type="primary"
            native-type="submit"
            >Confirm</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "account-chooser",
  computed: {
    userAccountsRole() {
      return "accountsRole" in this.$store.getters.user
        ? this.$store.getters.user.accountsRole
        : [];
    },
    options() {
      return this.userAccountsRole.map(account => ({
        label: account.name,
        value: account.identifier
      }));
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch("chooseAccount", this.form.account);
        } else {
          return false;
        }
      });
    }
  },
  data() {
    const $t = this.$t.bind(this);
    return {
      rules: {
        account: [
          {
            required: true,
            message: $t("global.form.required"),
            trigger: ["blur"]
          }
        ]
      },
      form: {
        account: null
      }
    };
  }
};
</script>

<style scoped lang="scss">
.account__chooser {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  & h2 {
    text-align: center;
  }
}
</style>
