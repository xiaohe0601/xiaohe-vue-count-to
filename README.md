<div align="center">
  <h1>xiaohe-vue-count-to</h1>
  <span>⏱️ 一个实现数字平滑变化的Vue小组件</span>
</div>

<br>

[![github stars][github-stars-src]][github-stars-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

小何同学 / [github@xiaohe0601](https://github.com/xiaohe0601) / [gitee@xiaohe0601](https://gitee.com/xiaohe0601)

### 🎉 特性

- 🍜 支持非线性动画
- 🍟 支持中途打断动画
- 🐼 支持Vue 2/3
- 🧀 支持TypeScript
- 🍳 支持免费商用
- 🥗 更多特性等你发掘...

### 🚁 安装

#### PNPM

``` shell
pnpm add xiaohe-vue-count-to
```

#### YARN

``` shell
yarn add xiaohe-vue-count-to
```

#### NPM

``` shell
npm install xiaohe-vue-count-to
```

#### 另外

> 如果 `Vue` 版本小于 `2.7`，还需要安装 `@vue/composition-api`

``` shell
pnpm add @vue/composition-api
```

### 🛹 使用

#### 简单使用

``` vue
<template>
  <count-to :value="pandora">
    <template #default="{ value }">
      <span>{{ value }}</span>
    </template>
  </count-to>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { CountTo } from "xiaohe-vue-count-to";

const pandora = ref<number>(0);

onMounted(() => {
  setTimeout(() => {
    pandora.value = 20000;
  }, 100);
});
</script>
```

#### 属性（Props）

|参数|说明|类型|可选值|默认值|
|---|---|---|---|---|
|value|数值|`NumberLike`|-|0|
|decimals|小数位数|`NumberLike`|-|0|
|duration|动画时长（单位: ms）|`NumberLike`|-|2000|
|preset|预设曲线|`BezierCurvePresetLike`|linear/ease/ease-in/ease-out/ease-in-out|linear|
|bezier|自定义曲线（优先级高于preset）|`BezierCurve`|-|-|
|delay|延迟开始时间（单位: ms）|`NumberLike`|-|0|
|fps|帧率|`NumberLike`|-|-1|

#### 事件（Events）

|事件|说明|回调参数|
|---|---|---|
|inited|`transition` 初始化完成|(instance: `Transition`)|
|change|数值变化|(value: `NumberLike`, instance: `Transition`)|
|started|动画开始|(instance: `Transition`)|
|paused|动画暂停|(instance: `Transition`)|
|resumed|动画继续|(instance: `Transition`)|
|stopped|动画停止|(instance: `Transition`)|
|completed|动画完成|(instance: `Transition`)|

#### 插槽（Slots）

|名称|说明|类型|
|---|---|---|
|default|默认内容|{ value: `NumberLike`; }|

#### 实例（Inst）

|属性|说明|类型|
|---|---|---|
|transition|`xiaohe-transition` 实例|`Transition`|

#### 类型定义

> 请查看 [jsdocs.io](https://www.jsdocs.io/package/xiaohe-vue-count-to)

### 🛸 链接

- [xiaohe-transition](https://github.com/xiaohe0601/xiaohe-transition) 🏀 一个简单易用的贝塞尔曲线过渡动画工具

### 🐶 讨论交流

- ❓：若有疑问或BUG反馈，可提交[issues](https://github.com/xiaohe0601/xiaohe-vue-count-to/issues)
- 📫：[HeDianGeng0601@outlook.com](mailto:HeDianGeng0601@outlook.com)
- 🐧：暂未开通

### 🏆 开源协议

- MIT [LICENSE](./LICENSE)

<!-- Badges -->

[github-stars-src]: https://img.shields.io/github/stars/xiaohe0601/xiaohe-vue-count-to?style=flat&colorA=080f12&colorB=1fa669&logo=GitHub
[github-stars-href]: https://github.com/xiaohe0601/xiaohe-vue-count-to
[npm-version-src]: https://img.shields.io/npm/v/xiaohe-vue-count-to?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/xiaohe-vue-count-to
[npm-downloads-src]: https://img.shields.io/npm/dm/xiaohe-vue-count-to?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/xiaohe-vue-count-to
[bundle-src]: https://img.shields.io/bundlephobia/minzip/xiaohe-vue-count-to?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=xiaohe-vue-count-to
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/xiaohe-vue-count-to
[license-src]: https://img.shields.io/github/license/xiaohe0601/xiaohe-vue-count-to.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/xiaohe0601/xiaohe-vue-count-to/blob/main/LICENSE