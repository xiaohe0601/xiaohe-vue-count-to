import type { BezierCurve, BezierCurvePreset, Transition } from "xiaohe-transition";
import type { NumberLike } from "../../types.ts";

export type BezierCurvePresetLike = BezierCurvePreset | "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out";

export interface CountToProps {
  /**
   * 数值
   */
  value?: NumberLike;
  /**
   * 小数位数
   */
  decimals?: NumberLike;
  /**
   * 动画时长（单位: ms）
   */
  duration?: NumberLike;
  /**
   * 预设曲线
   */
  preset?: BezierCurvePresetLike;
  /**
   * 自定义曲线（优先级高于preset）
   */
  bezier?: BezierCurve;
  /**
   * 延迟开始时间（单位: ms）
   */
  delay?: NumberLike;
  /**
   * 帧率（即每秒回调多少次，若小于或等于0则使用requestAnimationFrame自动处理）
   */
  fps?: NumberLike;
  /**
   * 小数点
   *
   * @since 0.2.2
   */
  decimal?: string;
  /**
   * 是否启用数值分组（示例：10000000.00 -> 10,000,000.00）
   *
   * @since 0.2.2
   */
  useGroupValue?: boolean;
  /**
   * 是否使用印度风格数值分组（示例：10000000.00 -> 1,00,00,000.00）
   *
   * @since 0.2.2
   */
  useIndianStyleGroup?: boolean;
  /**
   * 分隔符
   *
   * @since 0.2.2
   */
  separator?: string;
  /**
   * 自定义数字
   *
   * @since 0.2.2
   */
  numerals?: string[];
}

export interface CountToEmits {
  /**
   * transition初始化完成
   */
  (e: "inited", instance: Transition): void;

  /**
   * 数值变化
   */
  (e: "change", value: string, instance: Transition): void;

  /**
   * 动画开始
   */
  (e: "started", instance: Transition): void;

  /**
   * 动画暂停
   */
  (e: "paused", instance: Transition): void;

  /**
   * 动画继续
   */
  (e: "resumed", instance: Transition): void;

  /**
   * 动画停止
   */
  (e: "stopped", instance: Transition): void;

  /**
   * 动画完成
   */
  (e: "completed", instance: Transition): void;
}

export interface CountToSlots {
  default(props: { value: string; }): any;
}

export interface CountToInst {
  transition: Transition;
}

export {};