<script lang="ts">
import type { PropType, SlotsType } from "vue-demi";
import { computed, defineComponent, h, onUnmounted, ref, watch } from "vue-demi";
import type { BezierCurve, TransitionOptions } from "xiaohe-transition";
import { BezierCurvePreset, Transition } from "xiaohe-transition";
import type { NumberLike } from "../../types.ts";
import type { BezierCurvePresetLike } from "./types.ts";

export default defineComponent({
  name: "CountTo",
  props: {
    value: {
      type: [Number, String] as PropType<NumberLike>,
      default: 0
    },
    decimals: {
      type: [Number, String] as PropType<NumberLike>,
      default: 0
    },
    duration: {
      type: [Number, String] as PropType<NumberLike>,
      default: 2000
    },
    preset: {
      type: String as PropType<BezierCurvePresetLike>,
      default: BezierCurvePreset.LINEAR
    },
    bezier: {
      type: Object as PropType<BezierCurve>
    },
    delay: {
      type: [Number, String] as PropType<NumberLike>,
      default: 0
    },
    fps: {
      type: [Number, String] as PropType<NumberLike>,
      default: -1
    }
  },
  emits: {
    started(payload: { instance: Transition; }) {
      return payload != null;
    },
    paused(payload: { instance: Transition; }) {
      return payload != null;
    },
    resumed(payload: { instance: Transition; }) {
      return payload != null;
    },
    stopped(payload: { instance: Transition; }) {
      return payload != null;
    },
    completed(payload: { instance: Transition; }) {
      return payload != null;
    }
  },
  slots: Object as SlotsType<{
    default: { value: NumberLike; };
  }>,
  setup(props, { emit, slots, expose }) {
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

    expose?.({
      transition
    });

    return () => {
      return h(slots.default, { value: tweened.value });
    };
  }
});
</script>

<style lang="scss" scoped>

</style>