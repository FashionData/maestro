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

        <div class="bold">
          <p class="text-highlight">{{ userSocialInformation.displayName }}</p>
          <p>User role</p>
        </div>

        <!-- TODO: Translate with i18n -->
        <div>
          <p class="uppercase">{{ userSocialInformation.organization }}</p>
        </div>

        <div class="user-title">
          <!-- TODO: Translate with i18n -->
          <p class="bold">Title</p>
          <template>
            <transition name="fade" mode="out-in">
              <!-- TODO: Translate placeholder with i18n -->
              <div v-if="editTitle" key="title-input" class="d-flex justify-center align-center">
                <el-input
                  v-model="userSocialInformation.title"
                  placeholder="Title"
                />

                <i class="el-icon-circle-check" @click="validateTitle"></i>
              </div>

              <div v-else="!editTitle" key="title-value" class="d-flex justify-center align-center">
                <p>{{ userSocialInformation.title }}</p>
                <i class="el-icon-edit" @click="editTitle = !editTitle"></i>
              </div>
            </transition>
          </template>
        </div>

        <div>
          <!-- TODO: Translate with i18n -->
          <p>Member since</p>
          <p class="bold">{{ userSocialInformation.creationTime }}</p>
        </div>
      </el-card>
    </el-col>

    <el-col :span="16">
      <el-card class="profile-card full-height">
        <div v-for="item in information" class="form-group" :class="item.class">
          <label :for="item.id">{{ item.label }}</label>
          <el-input
            v-model="userSocialInformation[item.id]"
            v-debounce:1s="(value) => saveUserInformation(item.id, value)"
            v-bind="item.props"
            :type="item.type || 'text'"
            :id="item.id"
            :placeholder="item.placeholder"
          />
        </div>

        <div class="form-group form-group--reduced">
          <!-- TODO: Translate with i18n -->
          <label for="timezone">Timezone</label>
          <el-select
            v-model="userSocialInformation.timezone"
            id="timezone"
            placeholder="Select"
            clearable
            @change="(value) => saveUserInformation('timezone', value)"
          >
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
import { Collections } from "@/constants/firebase";

export default {
  name: "profile-view",
  data() {
    return {
      userSocialInformation: {},
      editTitle: false,
      photoURL: this.$store.getters.user.photoURL,
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
    size: () => 200,
    information() {
      return [
        {
          id: 'email',
          // TODO: Translate with i18n
          label: 'Email',
          placeholder: 'Email',
          props: {
            disabled: true
          },
        },
        {
          class: 'form-group--reduced',
          id: 'phone',
          type: 'tel',
          // TODO: Translate with i18n
          label: 'Phone',
          placeholder: 'Phone',
        },
        {
          id: 'location',
          // TODO: Translate with i18n
          label: 'Location',
          placeholder: 'Location',
        },
      ]
    }
  },
  mounted() {
    this.$firebase.firestore().collection(Collections.users).doc(this.$store.getters.user.uid).get().then((res) => {
      this.userSocialInformation = res.data()
    })
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
    },
    validateTitle() {
      this.saveUserInformation('title', this.userSocialInformation.title);
      this.editTitle = !this.editTitle
    },
    saveUserInformation(key, value) {
      this.$firebase.firestore().collection(Collections.users).doc(this.$store.getters.user.uid).update({
        [key]: value
      }).then(() => {
        // TODO: Translate with i18n
        this.$message.success('Successfully updated field');
      }).catch((err) => {
        console.log('ERROR', err)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .profile-card {
    padding: applySpace(x-large);

    & > div > * {
      margin-bottom: applySpace(x-large);
    }
  }

  .user-title {
    position: relative;

    i {
      opacity: .4;
      margin-left: .8rem;
      transition: $--fade-transition;

      &:hover {
        opacity: 1;
      }

      &.el-icon-circle-check {
        transition: $--color-transition-base $--fade-transition;

        &:hover {
          color: $--color-success;
        }
      }
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
