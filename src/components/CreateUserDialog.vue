<template>
  <!-- TODO: i18n -->
  <el-dialog
    title="Add a user"
    :visible="show"
    width="80%"
    :before-close="beforeClose"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col>
          <el-form-item label="Email" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Display Name" prop="displayName">
            <el-input v-model="form.displayName" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="form.password" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="Role" prop="role" class="role--container">
            <el-select v-model="form.role" placeholder="Select a role">
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
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">Cancel</el-button>
      <el-button type="primary" @click="submitForm">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { ROLES, Roles } from "@/constants";

export default {
  name: "create-user-dialog",
  props: {
    show: { type: Boolean, required: true },
    beforeClose: { type: Function, required: false }
  },
  computed: {
    roles() {
      return Object.entries(ROLES).map(entry => ({
        label: entry[1].name,
        value: entry[1].code
      }));
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("submit", this.form);
        } else {
          return false;
        }
      });
    }
  },
  data() {
    return {
      rules: {
        email: [
          {
            required: true,
            message: "Email cannot be blank",
            trigger: ["blur"]
          },
          {
            type: "email",
            message: "Please enter a valid email address",
            trigger: ["blur", "change"]
          }
        ],
        role: [
          {
            required: true,
            message: "Role cannot be blank",
            trigger: ["blur"]
          }
        ],
        displayName: [
          {
            required: true,
            message: "Display name cannot be blank",
            trigger: ["blur"]
          }
        ],
        password: [
          {
            required: true,
            message: "Password cannot be blank",
            trigger: ["blur"]
          },
          {
            min: 4,
            message: "Your password must contains at least 4 characters"
          }
        ]
      },
      form: {
        email: "",
        displayName: "",
        password: "",
        role: Roles.Suspended
      }
    };
  }
};
</script>

<style scoped lang="scss">
.role--container {
  display: flex;
  flex-direction: column;
  & >>> label {
    text-align: left;
  }
}
</style>
