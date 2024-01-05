<template>
  <div class="hello-world">
    <span>hello world! I,m {{ props.name }}.</span>
  </div>
</template>

<script lang="ts" setup>
import type { Props } from "./types.ts";

defineOptions({
  name: "HelloWorld"
});

const props = withDefaults(defineProps<Props>(), {
  name: "xiaohe"
});
</script>

<style lang="scss" scoped>

</style>