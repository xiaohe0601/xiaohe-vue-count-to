<template>
  <count-to :value="pandora">
    <template #default="{ value }">
      <span>{{ value }}</span>
    </template>
  </count-to>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { CountTo } from "../../src/index.ts";

const pandora = ref<number>(0);

onMounted(() => {
  setTimeout(() => {
    pandora.value = 20000;
  }, 100);
});
</script>

<style lang="scss" scoped>

</style>