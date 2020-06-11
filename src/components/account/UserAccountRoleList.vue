<template>
  <div v-if="!isLoading && accounts && accounts.length > 0">
    <el-row v-for="(accountRole, i) in value" :key="i">
      <el-col :span="8">
        <el-select
          @change="onAccountChange(i, $event)"
          :value="accountRole.split('-')[1]"
          filterable
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
      </el-col>
      <el-col :span="16">
        <el-select
          @change="onRoleChange(i, $event)"
          :value="Number(accountRole.split('-')[0])"
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
        <i
          :class="{ visible: canAddItems }"
          class="actions el-icon-plus"
          @click="appendItem(i)"
        ></i>
        <i
          :class="{ visible: i > 0 && canRemoveItems }"
          class="actions el-icon-delete"
          @click="removeItem(i)"
        ></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Collections } from "@/constants/firebase";
import { ROLES } from "@/constants";
import { insertToArrayAt } from "@/utils/array";

export default {
  name: "user-account-role-list",
  props: {
    value: { type: Array, default: () => [] }
  },
  data() {
    return {
      isLoading: false,
      accounts: null
    };
  },
  mounted() {
    this.fetchAccounts();
  },
  computed: {
    roles() {
      const $t = this.$t.bind(this);
      return Object.entries(ROLES).map(entry => ({
        label: $t(entry[1].name),
        value: entry[1].code
      }));
    },
    canAddItems() {
      return this.value.length < this.accounts.length;
    },
    canRemoveItems() {
      return this.value.length > 1;
    },
    options() {
      if (!this.accounts) return [];
      return this.accounts.map(account => ({
        label: account.name,
        value: account.identifier
      }));
    }
  },
  methods: {
    appendItem(i) {
      if (!this.canAddItems) return;
      const clone = [...this.value];
      const newAccountIdentifier = `0-${this.options[0].value}`;
      this.$emit("input", insertToArrayAt(clone, i + 1, newAccountIdentifier));
    },
    removeItem(i) {
      if (!this.canRemoveItems) return;
      const clone = [...this.value];
      clone.splice(i, 1);
      this.$emit("input", clone);
    },
    onAccountChange(index, newAccount) {
      const clone = [...this.value];
      const role = clone[index].split("-")[0];
      clone[index] = `${role}-${newAccount}`;
      this.$emit("input", clone);
    },
    onRoleChange(index, newRole) {
      const clone = [...this.value];
      const account = clone[index].split("-")[1];
      clone[index] = `${newRole}-${account}`;
      this.$emit("input", clone);
    },
    async fetchAccounts() {
      this.isLoading = true;
      const snapshot = await this.$firebase
        .firestore()
        .collection(Collections.accounts)
        .get();
      this.accounts = snapshot.docs.map(doc => doc.data());
      if (this.value.length === 0 && this.accounts.length > 0) {
        this.value.push(`0-${this.accounts[0].identifier}`);
      }
      this.isLoading = false;
    }
  }
};
</script>

<style scoped lang="scss">
.actions {
  font-size: 2rem;
  margin-left: 1rem;
  opacity: 0.5;
  pointer-events: none;
  &.visible {
    opacity: 1;
    pointer-events: all;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
