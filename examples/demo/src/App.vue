<template>
  <n-config-provider abstract inline-theme-disabled>
    <n-scrollbar class="h-full">
      <n-flex class="app-container" vertical>
        <n-flex class="h-140px" align="center" justify="center" vertical>
          <span class="text-40px font-bold">xiaohe-vue-count-to</span>
          <span class="text-20px text-black/60">⏱️ 一个实现数字平滑变化的Vue小组件</span>
        </n-flex>

        <n-card>
          <n-flex justify="center">
            <count-to ref="counter"
                      :value="pandora"
                      :decimals="state.decimals"
                      :duration="state.duration"
                      :preset="state.preset"
                      :delay="state.delay"
                      :fps="state.fps">
              <template #default="{ value }">
                <span class="text-60px text-blue">{{ value }}</span>
              </template>
            </count-to>
          </n-flex>

          <template #footer>
            <n-descriptions bordered>
              <n-descriptions-item label="数值">
                <n-input-number v-model:value="pandora" :step="100"></n-input-number>
              </n-descriptions-item>

              <n-descriptions-item label="小数位数">
                <n-input-number v-model:value="state.decimals" :min="0" :max="15"></n-input-number>
              </n-descriptions-item>

              <n-descriptions-item label="持续时长">
                <n-input-number v-model:value="state.duration" :min="0" :step="100">
                  <template #suffix>毫秒</template>
                </n-input-number>
              </n-descriptions-item>

              <n-descriptions-item label="动画曲线">
                <n-select v-model:value="state.preset" :options="presets"></n-select>
              </n-descriptions-item>

              <n-descriptions-item label="延迟时间">
                <n-input-number v-model:value="state.delay" :min="0" :step="100">
                  <template #suffix>毫秒</template>
                </n-input-number>
              </n-descriptions-item>

              <n-descriptions-item label="帧率">
                <n-input-number v-model:value="state.fps" :min="-1" :max="120"></n-input-number>
              </n-descriptions-item>

              <n-descriptions-item label="控制">
                <n-flex>
                  <n-button type="warning" size="small" @click="pause">暂停</n-button>
                  <n-button type="success" size="small" @click="resume">继续</n-button>
                </n-flex>
              </n-descriptions-item>
            </n-descriptions>
          </template>
        </n-card>
      </n-flex>
    </n-scrollbar>
  </n-config-provider>
</template>

<script lang="ts" setup>
import type { SelectOption } from "naive-ui";
import { NButton, NCard, NConfigProvider, NDescriptions, NDescriptionsItem, NFlex, NInputNumber, NScrollbar, NSelect } from "naive-ui";
import { BezierCurvePreset } from "xiaohe-transition";
import type { CountToInst, CountToProps } from "xiaohe-vue-count-to";
import { CountTo } from "xiaohe-vue-count-to";
import { ref } from "vue";
import type { NullableObject } from "./types";

const counter = ref<NullableObject<CountToInst>>(null);

const pandora = ref<number>(0);

const state = ref<Pick<CountToProps, "decimals" | "duration" | "preset" | "delay" | "fps">>({
  decimals: 0,
  duration: 2000,
  preset: BezierCurvePreset.LINEAR,
  delay: 0,
  fps: -1
});

const presets = ref<SelectOption[]>([
  { label: "匀速（linear）", value: "linear" },
  { label: "缓动（ease）", value: "ease" },
  { label: "缓入（ease-in）", value: "ease-in" },
  { label: "缓出（ease-out）", value: "ease-out" },
  { label: "缓入缓出（ease-in-out）", value: "ease-in-out" }
]);

function pause(): void {
  counter.value?.transition.pause();
}

function resume(): void {
  counter.value?.transition.resume();
}
</script>

<style lang="scss">
@use "style" as *;
</style>