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
              <el-button type="text" size="small">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </template>
  </div>
</template>

<script>
import CreateUserDialog from "@/components/dialogs/CreateUserDialog.vue";
export default {
  name: "users-view",
  components: { CreateUserDialog },
  data() {
    return {
      modals: {
        user: {
          edit: false,
          create: false
        }
      },
      users: [],
      isLoading: false
    };
  },
  async mounted() {
    this.isLoading = true;

    this.users = (
      await this.$httpsCallableFunction("getAllUsers", {})
    ).data.users;
    console.log(this.users);
    this.isLoading = false;
  },
  methods: {
    showCreateModal() {
      this.modals.user.create = true;
    },
    handleUserCreateSubmit(data) {
      console.log(data);
    },
    showEditModal() {
      this.modals.user.edit = true;
    }
  }
};
</script>
