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
              :value="item.value"
            >
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
        // TODO: Use Axios to fetch API with worldwide results http://worldtimeapi.org/
        { label: "Amsterdam", value: "Europe/Amsterdam" },
        { label: "Andorra", value: "Europe/Andorra" },
        { label: "Astrakhan", value: "Europe/Astrakhan" },
        { label: "Athens", value: "Europe/Athens" },
        { label: "Belgrade", value: "Europe/Belgrade" },
        { label: "Berlin", value: "Europe/Berlin" },
        { label: "Brussels", value: "Europe/Brussels" },
        { label: "Bucharest", value: "Europe/Bucharest" },
        { label: "Budapest", value: "Europe/Budapest" },
        { label: "Chisinau", value: "Europe/Chisinau" },
        { label: "Copenhagen", value: "Europe/Copenhagen" },
        { label: "Dublin", value: "Europe/Dublin" },
        { label: "Gibraltar", value: "Europe/Gibraltar" },
        { label: "Helsinki", value: "Europe/Helsinki" },
        { label: "Istanbul", value: "Europe/Istanbul" },
        { label: "Kaliningrad", value: "Europe/Kaliningrad" },
        { label: "Kiev", value: "Europe/Kiev" },
        { label: "Kirov", value: "Europe/Kirov" },
        { label: "Lisbon", value: "Europe/Lisbon" },
        { label: "London", value: "Europe/London" },
        { label: "Luxembourg", value: "Europe/Luxembourg" },
        { label: "Madrid", value: "Europe/Madrid" },
        { label: "Malta", value: "Europe/Malta" },
        { label: "Minsk", value: "Europe/Minsk" },
        { label: "Monaco", value: "Europe/Monaco" },
        { label: "Moscow", value: "Europe/Moscow" },
        { label: "Oslo", value: "Europe/Oslo" },
        { label: "Paris", value: "Europe/Paris" },
        { label: "Prague", value: "Europe/Prague" },
        { label: "Riga", value: "Europe/Riga" },
        { label: "Rome", value: "Europe/Rome" },
        { label: "Samara", value: "Europe/Samara" },
        { label: "Saratov", value: "Europe/Saratov" },
        { label: "Simferopol", value: "Europe/Simferopol" },
        { label: "Sofia", value: "Europe/Sofia" },
        { label: "Stockholm", value: "Europe/Stockholm" },
        { label: "Tallinn", value: "Europe/Tallinn" },
        { label: "Tirane", value: "Europe/Tirane" },
        { label: "Ulyanovsk", value: "Europe/Ulyanovsk" },
        { label: "Uzhgorod", value: "Europe/Uzhgorod" },
        { label: "Vienna", value: "Europe/Vienna" },
        { label: "Vilnius", value: "Europe/Vilnius" },
        { label: "Volgograd", value: "Europe/Volgograd" },
        { label: "Warsaw", value: "Europe/Warsaw" },
        { label: "Zaporozhye", value: "Europe/Zaporozhye" },
        { label: "Zurich", value: "Europe/Zurich" }
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
