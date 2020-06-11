<template>
  <el-dialog
    :append-to-body="true"
    :title="$t('users-view.dialog.update.title', { email: user.email })"
    :visible="show"
    width="80%"
    @close="$emit('close')"
    :before-close="beforeClose"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col>
          <el-form-item :label="$t('users-view.form.email')" prop="email">
            <el-input v-model="form.email" readonly disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            :label="$t('users-view.form.displayName')"
            prop="displayName"
          >
            <el-input v-model="form.displayName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('users-view.form.password')" prop="password">
            <el-input type="password" v-model="form.password" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item
            :label="$t('users-view.form.role.name')"
            prop="role"
            class="role--container"
          >
            <el-select
              v-model="form.role"
              :placeholder="$t('users-view.form.role.placeholder')"
            >
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <user-account-role-list v-model="form.accountsRole" />
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button :loading="isLoading" @click="$emit('close')">{{
        $t("global.cancel")
      }}</el-button>
      <el-button :loading="isLoading" type="primary" @click="submitForm">{{
        $t("global.confirm")
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ROLES } from "@/constants";
import UserAccountRoleList from "@/components/account/UserAccountRoleList";

export default {
  name: "update-user-dialog",
  components: { UserAccountRoleList },
  props: {
    isLoading: { type: Boolean, default: false },
    user: { type: Object, required: true },
    show: { type: Boolean, required: true },
    beforeClose: { type: Function, required: false }
  },
  computed: {
    roles() {
      const $t = this.$t.bind(this);
      return Object.entries(ROLES).map(entry => ({
        label: $t(entry[1].name),
        value: entry[1].code
      }));
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid && !this.isLoading) {
          this.$emit("submit", this.form);
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
        role: [
          {
            required: true,
            message: $t("users-view.form.rules.role.blank"),
            trigger: ["blur"]
          }
        ],
        displayName: [
          {
            required: true,
            message: $t("users-view.form.rules.displayName.blank"),
            trigger: ["blur"]
          }
        ],
        password: [
          {
            required: false,
            trigger: ["blur"]
          },
          {
            min: 6,
            message: $t("users-view.form.rules.password.min", { nb: 6 })
          }
        ]
      },
      form: {
        uid: this.user.uid,
        accountsRole: [],
        email: this.user.email,
        emailVerified: false,
        photoURL: this.user.photoURL,
        displayName: this.user.displayName,
        password: "",
        role: this.user.customClaims?.role ?? null
      }
    };
  }
};
</script>

<style scoped lang="scss">
.role--container {
  display: flex;
  flex-direction: column;
  &::v-deep label {
    text-align: left;
  }
}
</style>
