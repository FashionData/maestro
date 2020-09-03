<template>
  <el-dialog
    :append-to-body="editMode"
    :title="
      editMode
        ? $t('accounts-view.dialog.update.title')
        : $t('accounts-view.dialog.create.title')
    "
    :visible="show"
    width="80%"
    @close="$emit('close')"
    :before-close="beforeClose"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="Informations" name="informations">
          <el-form-item
            :label="$t('accounts-view.form.identifier')"
            prop="identifier"
          >
            <el-input
              :disabled="editMode"
              :readonly="editMode"
              type="age"
              v-model="form.identifier"
            />
          </el-form-item>
          <el-form-item :label="$t('accounts-view.form.name')" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            :label="$t('accounts-view.form.status.name')"
            prop="status"
          >
            <el-select
              v-model="form.status"
              :placeholder="$t('accounts-view.form.status.placeholder')"
            >
              <el-option
                v-for="item in statuses"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('accounts-view.form.description')"
            prop="description"
          >
            <el-input v-model="form.description" />
          </el-form-item>
          <el-form-item
            :label="$t('accounts-view.form.website')"
            prop="website"
          >
            <el-input v-model="form.website" />
          </el-form-item>
          <el-form-item
            :label="$t('accounts-view.form.contact')"
            prop="contact"
          >
            <el-input v-model="form.contact" />
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('accounts-view.dialog.big-query.label')"
          name="big-query"
        >
          <el-form-item
            :label="
              $t('accounts-view.dialog.big-query.account')
            "
            prop="bigQuery.account"
          >
            <el-input v-model="form.bigQuery.account" />
          </el-form-item>
          <el-form-item
            :label="$t('accounts-view.dialog.big-query.dataset')"
            prop="bigQuery.dataset"
          >
            <el-input v-model="form.bigQuery.dataset" />
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
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
import { AccountStatus, STATUSES } from "@/constants/accounts";

export default {
  name: "account-dialog-form",
  props: {
    isLoading: { type: Boolean, default: false },
    account: { type: Object, required: false },
    show: { type: Boolean, required: true },
    beforeClose: { type: Function, required: false }
  },

  data() {
    const $t = this.$t.bind(this);
    const editMode = !!(this.account && this.account.uid);
    return {
      editMode,
      activeTab: "informations",
      rules: {
        identifier: [
          {
            required: !editMode,
            message: $t("accounts-view.form.rules.identifier.blank"),
            trigger: ["blur"]
          },
          {
            max: 6,
            message: $t("accounts-view.form.rules.identifier.max", { nb: 6 })
          }
        ],
        name: [
          {
            required: true,
            message: $t("accounts-view.form.rules.name.blank"),
            trigger: ["blur"]
          }
        ],
        status: [
          {
            required: true,
            message: $t("accounts-view.form.rules.status.blank"),
            trigger: ["blur"]
          }
        ]
      },
      form: editMode
        ? {
          uid: this.account.uid,
          identifier: this.account.identifier,
          name: this.account.name,
          status: this.account.status,
          description: this.account.description,
          website: this.account.website,
          contact: this.account.contact,
          bigQuery: {
            account: this.account.queries?.account ?? "",
            dataset: this.account.queries?.dataset ?? ""
          }
        }
        : {
          identifier: null,
          name: "",
          status: AccountStatus.Active,
          description: "",
          website: "",
          contact: "",
          bigQuery: {
            account: "",
            dataset: ""
          }
        }
    };
  },
  computed: {
    statuses() {
      const $t = this.$t.bind(this);
      return Object.entries(STATUSES).map(entry => ({
        label: $t(entry[1].name),
        value: entry[1].value
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
  }
};
</script>

<style scoped lang="scss"></style>
