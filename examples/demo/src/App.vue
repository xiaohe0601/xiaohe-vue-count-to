<template>
  <count-to ref="counter" :value="pandora" @inited="onInited">
    <template #default="{ value }">
      <span>{{ value }}</span>
    </template>
  </count-to>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import type { Transition } from "xiaohe-transition";
import type { CountToInst } from "xiaohe-vue-count-to";
import { CountTo } from "xiaohe-vue-count-to";
import type { NullableObject } from "./types";

const counter = ref<NullableObject<CountToInst>>(null);

const pandora = ref<number>(0);

function onInited(instance: Transition): void {
  // eslint-disable-next-line no-console
  console.log(instance);
}

onMounted(() => {
  // eslint-disable-next-line no-console
  console.log(counter.value);

  setTimeout(() => {
    pandora.value = 20000;
  }, 100);
});
</script>

<style lang="scss" scoped>

</style>