<script lang="ts">
import type { PropType, SlotsType } from "vue-demi";
import { computed, defineComponent, h, onUnmounted, ref, watch } from "vue-demi";
import type { BezierCurve, TransitionOptions } from "xiaohe-transition";
import { BezierCurvePreset, Transition } from "xiaohe-transition";
import type { NumberLike, OptionalString } from "../../types.ts";
import { CLASS_PREFIX } from "../../constant.ts";
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
    },
    decimal: {
      type: String,
      default: "."
    },
    useGroupValue: {
      type: Boolean,
      default: false
    },
    useIndianStyleGroup: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: ","
    },
    numerals: {
      type: Array as PropType<string[]>
    }
  },
  emits: ["inited", "change", "started", "paused", "resumed", "stopped", "completed"],
  slots: Object as SlotsType<{
    default: { value: string; };
  }>,
  setup(props, { emit, slots, expose }) {
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

    const tweened = ref<number>(Number(props.value));

    function formatValue(value: number): string {
      const negative: boolean = value < 0;

      const state: { result: string; x1: string; x2: string; x3: string; } = { result: "", x1: "", x2: "", x3: "" };

      state.result = String(Math.abs(value).toFixed(Number(props.decimals)));

      const x: string[] = state.result.split(".");
      state.x1 = x[0];
      state.x2 = x.length > 1 ? `${props.decimal}${x[1]}` : "";

      if (props.useGroupValue) {
        const length = state.x1.length;

        for (let i = 0, j = 0, factor = 3; i < length; i += 1) {
          if (props.useIndianStyleGroup && i === 4) {
            factor = 2;
            j = 1;
          }

          if (i !== 0 && (j % factor) === 0) {
            state.x3 = `${props.separator}${state.x3}`;
          }

          j += 1;

          state.x3 = `${state.x1[length - i - 1]}${state.x3}`;
        }

        state.x1 = state.x3;
      }

      if (props.numerals != null && props.numerals.length > 0) {
        state.x1 = state.x1.replace(/[0-9]/g, (w) => {
          const n: OptionalString = props.numerals![+w];
          return n === undefined ? w : n;
        });
        state.x2 = state.x2.replace(/[0-9]/g, (w) => {
          const n: OptionalString = props.numerals![+w];
          return n === undefined ? w : n;
        });
      }

      return `${negative ? "-" : ""}${state.x1}${state.x2}`;
    }

    const formatted = computed<string>(() => {
      return formatValue(tweened.value);
    });

    const transition: Transition = new Transition(options.value, (value) => {
      tweened.value = value;
    });
    emit("inited", transition);

    watch(formatted, (value) => {
      emit("change", value, transition);
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
      return h("div", { class: `${CLASS_PREFIX}-count-to` }, [slots.default?.({ value: formatted.value })]);
    };
  }
});
</script>

<style lang="scss" scoped>

</style>