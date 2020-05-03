<template>
  <el-row :gutter="32">
    <el-col :span="8">
      <el-card>
        <el-avatar v-if="$store.getters.user.photoURL" :size="size" :src="$store.getters.user.photoURL" />
        <el-avatar v-else :size="size" icon="el-icon-user-solid" style="font-size: 120px" />

        <!-- TODO: Translate with i18n -->
        <p>Prénom Nom</p>
        <p>User role</p>
        <br>
        <p>Organization</p>
        <br>
        <p>Title</p>
        <p>CEO</p>
        <br>
        <p>Member since</p>
        <p>24/09/2019</p>
      </el-card>
    </el-col>

    <el-col :span="16">
      <el-card>
        <!-- TODO: Translate with i18n -->
        <el-input placeholder="Email" v-model="userEmail" clearable />
        <!-- TODO: Translate with i18n -->
        <el-input placeholder="Phone" v-model="userPhone" clearable />
        <!-- TODO: Translate with i18n -->
        <el-input placeholder="Location" v-model="userLocation" clearable />
        <!-- TODO: Translate with i18n -->
        <el-select placeholder="Select" v-model="userTimezone" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "user-profile",
  data() {
    return {
      userEmail: '',
      userPhone: '',
      userLocation: '',
      userTimezone: '',
      options: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
    };
  },
  computed: {
    size: () => 200
  }
};
</script>
