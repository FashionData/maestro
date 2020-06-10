<template>
  <el-container style="height: 100vh;">
    <aside-component>
      <template #header-extended>
        <slot name="header-extended" />
      </template>

      <template #header-collapse>
        <slot name="header-collapse" />
      </template>
    </aside-component>

    <container-component>
      <slot name="content" />
    </container-component>
  </el-container>
</template>

<script lang="ts">
import AsideComponent from "@/components/m-layout/aside-component.vue";
import ContainerComponent from "@/components/m-layout/container-component.vue";

export default {
  name: "m-layout",
  components: { ContainerComponent, AsideComponent },
}
</script>
