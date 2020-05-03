<template>
  <el-row :gutter="32" class="d-flex align-stretch">
    <el-col :span="8">
      <el-card class="profile-card t-align-center">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <el-avatar v-if="photoURL" :size="size" :src="photoURL" />
          <el-avatar v-else :size="size" icon="el-icon-plus" style="font-size: 50px" />
        </el-upload>

        <!-- TODO: Translate with i18n -->
        <div class="bold">
          <!-- TODO: Add main color -->
          <p>Prénom Nom</p>
          <p>User role</p>
        </div>

        <p class="uppercase">Organization</p>

        <div>
          <p class="bold">Title</p>
          <p>CEO</p>
        </div>

        <div>
          <p>Member since</p>
          <p class="bold">24/09/2019</p>
        </div>
      </el-card>
    </el-col>

    <el-col :span="16">
      <el-card class="profile-card full-height">
        <div class="form-group">
          <!-- TODO: Translate with i18n -->
          <label for="email">Email</label>
          <el-input id="email" placeholder="Email" v-model="userEmail" clearable />
        </div>
        <div class="form-group form-group--reduced">
          <!-- TODO: Translate with i18n -->
          <label for="email">Phone</label>
          <el-input placeholder="Phone" v-model="userPhone" clearable />
        </div>
        <div class="form-group">
          <!-- TODO: Translate with i18n -->
          <label for="email">Location</label>
          <el-input placeholder="Location" v-model="userLocation" clearable />
        </div>
        <div class="form-group form-group--reduced">
          <!-- TODO: Translate with i18n -->
          <label for="email">Timezone</label>
          <el-select placeholder="Select" v-model="userTimezone" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "profile-view",
  data() {
    return {
      photoURL: this.$store.getters.user.photoURL,
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
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.photoURL = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!');
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
  .profile-card {
    padding: applySpace(x-large);

    & > div > * {
      margin-bottom: applySpace(x-large);
    }
  }

  .form-group {
    @extend .d-flex;
    @extend .flex-column;
    max-width: 70%;

    &:last-of-type {
      margin-bottom: 0;
    }

    &--reduced {
      max-width: 45%;
    }

    label {
      @extend .bold;
      margin-bottom: applySpace(small);
    }
  }
</style>
