<template>
  <div class="account__chooser">
    <div v-if="userAccountsRole.length === 0">
      <h2>{{ $t("account-chooser.no-accounts") }}</h2>
    </div>

    <div v-else>
      <h2>{{ $t("account-chooser.select-account") }}</h2>
      <el-form ref="form" :model="form" :rules="rules" @submit.native.prevent="onSubmit">
        <el-form-item prop="account">
          <el-select
            v-model="form.account"
            filterable
            :placeholder="$t('account-chooser.select-placeholder')"
            class="mr-5"
          >
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>

          <el-button type="primary" native-type="submit" :disabled="form.account === null">
            {{ $t("global.confirm") }}
          </el-button>
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
    return {
      form: {
        account: null
      },
      rules: {
        account: [{ required: true, message: this.$t("global.form.required"), trigger: "blur" }]
      },
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
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    text-align: center;
  }
}
</style>
