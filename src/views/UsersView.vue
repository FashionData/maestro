<template>
  <el-card shadow="none">
    <p v-if="isLoading">{{ $t("global.loading") }}</p>

    <div v-else class="separated-blocks">
      <div class="d-flex justify--end">
        <el-button type="primary" icon="el-icon-plus" @click="showCreateModal">{{ $t("global.add") }}</el-button>
      </div>

      <el-table :data="users">
        <el-table-column prop="email" :label="$t('users-view.table.header.email')" />
        <el-table-column prop="displayName" :label="$t('users-view.table.header.displayName')" />
        <el-table-column fixed="right" :label="$t('users-view.table.header.operations')" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showEditModal(scope.row.uid)">
              {{ $t("global.edit") }}
            </el-button>

            <update-user-dialog
              :is-loading="isSubmitting"
              :key="scope.row.uid"
              :user="scope.row"
              :show="!!modals.user.edit[scope.row.uid]"
              @submit="handleUserUpdateSubmit"
              @close="closeEditModal(scope.row.uid)"
            />
          </template>
        </el-table-column>
      </el-table>

      <create-user-dialog
        :is-loading="isSubmitting"
        :show="modals.user.create"
        @submit="handleUserCreateSubmit"
        @close="modals.user.create = false"
      />
    </div>
  </el-card>
</template>

<script>
import CreateUserDialog from "@/components/dialogs/CreateUserDialog.vue";
import UpdateUserDialog from "@/components/dialogs/UpdateUserDialog";

export default {
  name: "users-view",
  components: { UpdateUserDialog, CreateUserDialog },
  data() {
    return {
      modals: {
        user: {
          edit: {},
          create: false
        }
      },
      users: [],
      isLoading: false,
      isSubmitting: false
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.isSubmitting = false;
      this.isLoading = true;

      this.users = (
        await this.$httpsCallableFunction("getAllUsers", {})
      ).data.users;
      this.isLoading = false;
    },
    showCreateModal() {
      this.modals.user.create = true;
    },
    closeCreateModal() {
      this.modals.user.create = false;
    },
    async handleUserCreateSubmit(data) {
      try {
        this.isSubmitting = true;
        await this.$httpsCallableFunction("createUser", {}, data);
        this.closeCreateModal();
        await this.fetchUsers();
      } catch (error) {
        this.isSubmitting = false;
        console.error(error);
      }
    },
    async handleUserUpdateSubmit(data) {
      try {
        this.isSubmitting = true;
        await this.$httpsCallableFunction("updateUser", {}, data);
        this.closeEditModal(data.uid);
        await this.fetchUsers();
      } catch (error) {
        this.isSubmitting = false;
        console.error(error);
      }
    },
    showEditModal(uid) {
      this.$set(this.modals.user.edit, uid, true);
    },
    closeEditModal(uid) {
      this.$set(this.modals.user.edit, uid, undefined);
    }
  }
};
</script>
