<template>
  <div class="separated-blocks">
    <div>
      <h1>Sizes</h1>
      <m-img :src="src" alt="Alt text" size="small" class="mr-8" />
      <m-img :src="src" alt="Alt text" size="medium" class="mr-8" />
      <m-img :src="src" alt="Alt text" size="large" class="mr-8" />
      <m-img :src="src" alt="Alt text" size="extra-large" />
    </div>

    <div>
      <h1>Custom width</h1>
      <m-img src="" alt="Alt text" width="45rem" />
    </div>

    <div>
      <h1>Not loading</h1>
      <m-img src="" alt="Alt text" />
    </div>

    <div>
      <h1>Border radius</h1>
      <m-img :src="src" alt="Alt text" border-radius="2rem" />
    </div>

    <div>
      <h1>Rounded</h1>
      <m-img :src="src" alt="Alt text" rounded />
    </div>
  </div>
</template>

<script lang="ts">
import MImg from "../../src/components/m-img";

export default {
  name: "img-view",
  components: { MImg },
  computed: {
    src() {
      return 'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80';
    }
  }
};
</script>
