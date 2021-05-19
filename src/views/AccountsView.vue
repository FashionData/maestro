<template>
  <el-card shadow="none">
    <p v-if="isLoading">{{ $t("global.loading") }}</p>

    <div v-else class="separated-blocks">
      <account-dialog-form
        :is-loading="isSubmitting"
        :show="modals.account.create"
        @submit="handleAccountCreateSubmit"
        @close="modals.account.create = false"
      />

      <div class="d-flex justify--end">
        <el-button type="primary" icon="el-icon-plus" @click="showCreateModal">{{ $t("global.add") }}</el-button>
      </div>

      <el-table :data="accounts" style="width: 100%">
        <el-table-column prop="identifier" :label="$t('accounts-view.table.header.identifier')" />
        <el-table-column prop="name" :label="$t('accounts-view.table.header.name')" />
        <el-table-column prop="status" :label="$t('accounts-view.table.header.status')">
          <template slot-scope="scope">
            {{ $t(statuses[scope.row.status].name) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('accounts-view.table.header.operations')" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showEditModal(scope.row.uid)">
              {{ $t("global.edit") }}
            </el-button>

            <account-dialog-form
              :is-loading="isSubmitting"
              :key="scope.row.uid"
              :account="scope.row"
              :show="!!modals.account.edit[scope.row.uid]"
              @submit="handleUserUpdateSubmit"
              @close="closeEditModal(scope.row.uid)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
import { STATUSES } from "@/constants/accounts";
import AccountDialogForm from "@/components/dialogs/AccountDialogForm";

export default {
  name: "accounts-view",
  components: { AccountDialogForm },
  data() {
    return {
      modals: {
        account: {
          edit: {},
          create: false
        }
      },
      accounts: [],
      isLoading: false,
      isSubmitting: false
    };
  },
  computed: {
    statuses() {
      return STATUSES;
    }
  },
  mounted() {
    this.fetchAccounts();
  },
  methods: {
    async fetchAccounts() {
      this.isSubmitting = false;
      this.isLoading = true;

      this.accounts = (
        await this.$httpsCallableFunction("getAllAccounts", {})
      ).data;
      this.isLoading = false;
    },
    showCreateModal() {
      this.modals.account.create = true;
    },
    closeCreateModal() {
      this.modals.account.create = false;
    },
    async handleAccountCreateSubmit(data) {
      try {
        this.isSubmitting = true;
        await this.$httpsCallableFunction("createAccount", {}, data);
        this.closeCreateModal();
        await this.fetchAccounts();
      } catch (error) {
        this.isSubmitting = false;
        console.error(error);
      }
    },
    async handleUserUpdateSubmit(data) {
      try {
        this.isSubmitting = true;
        await this.$httpsCallableFunction("updateAccount", {}, data);
        this.closeEditModal(data.uid);
        await this.fetchAccounts();
      } catch (error) {
        this.isSubmitting = false;
        console.error(error);
      }
    },
    showEditModal(uid) {
      this.$set(this.modals.account.edit, uid, true);
    },
    closeEditModal(uid) {
      this.$set(this.modals.account.edit, uid, undefined);
    }
  }
};
</script>
