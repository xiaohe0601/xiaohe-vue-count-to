<template>
  <slot :value="tweened"></slot>
</template>

<script lang="ts" setup>
import type { TransitionOptions } from "xiaohe-transition";
import { BezierCurvePreset, Transition } from "xiaohe-transition";
import { computed, onUnmounted, ref, watch } from "vue";
import type { NumberLike } from "../../types.ts";
import type { CountToEmits, CountToProps, CountToSlots } from "./types.ts";

defineOptions({
  name: "CountTo"
});

const props = withDefaults(defineProps<CountToProps>(), {
  value: 0,
  decimals: 0,
  duration: 2000,
  preset: BezierCurvePreset.LINEAR,
  delay: 0,
  fps: -1
});

const emit = defineEmits<CountToEmits>();

defineSlots<CountToSlots>();

const tweened = ref<NumberLike>(0);

const options = computed<TransitionOptions>(() => {
  return {
    duration: Number(props.duration),
    preset: props.preset as BezierCurvePreset,
    bezier: props.bezier,
    delay: Number(props.delay),
    fps: Number(props.fps),
    started(instance) {
      emit("started", instance);
    },
    paused(instance) {
      emit("paused", instance);
    },
    resumed(instance) {
      emit("resumed", instance);
    },
    stopped(instance) {
      emit("stopped", instance);
    },
    completed(instance) {
      emit("completed", instance);
    }
  };
});

const transition: Transition = new Transition(options.value, (value) => {
  tweened.value = value.toFixed(Number(props.decimals)) as NumberLike;
});

watch(options, (value) => {
  transition.options(value);
});

watch(() => props.value, (value, oldValue) => {
  transition.start({
    start: Number(oldValue),
    target: Number(value)
  });
});

onUnmounted(() => {
  transition.destroy();
});

defineExpose({
  transition
});
</script>

<style lang="scss" scoped>

</style>