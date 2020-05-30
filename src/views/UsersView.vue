<template>
  <div>
    <p v-if="isLoading">Loading...</p>

    <template v-else>
      <create-user-dialog
        :show="modals.user.create"
        @submit="handleUserCreateSubmit"
        @close="modals.user.create = false"
      />
      <el-row type="flex" justify="end">
        <el-button type="primary" icon="el-icon-plus" @click="showCreateModal"
          >Add</el-button
        >
      </el-row>
      <el-row>
        <el-table :data="users" style="width: 100%">
          <!-- TODO: i18n -->
          <el-table-column prop="email" label="Email"></el-table-column>
          <el-table-column prop="displayName" label="Name"></el-table-column>
          <el-table-column fixed="right" label="Operations" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="showEditModal(scope.row.uid)"
                >Edit</el-button
              >
              <update-user-dialog
                :key="scope.row.uid"
                :user="scope.row"
                :show="!!modals.user.edit[scope.row.uid]"
                @submit="handleUserUpdateSubmit"
                @close="closeEditModal(scope.row.uid)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </template>
  </div>
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
      isLoading: false
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.isLoading = true;

      this.users = (
        await this.$httpsCallableFunction("getAllUsers", {})
      ).data.users;
      console.log(this.users);
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
        await this.$httpsCallableFunction("createUser", {}, data);
        this.closeCreateModal();
        await this.fetchUsers();
      } catch {
        console.error(error);
      }
    },
    async handleUserUpdateSubmit(data) {
      try {
        await this.$httpsCallableFunction("updateUser", {}, data);
        this.closeEditModal(data.uid);
        await this.fetchUsers();
      } catch {
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
