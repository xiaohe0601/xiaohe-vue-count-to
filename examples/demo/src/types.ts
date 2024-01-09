export type OptionalObject<T> = T | undefined;
export type OptionalNumber = OptionalObject<number>;
export type OptionalString = OptionalObject<string>;
export type OptionalBoolean = OptionalObject<boolean>;

export type NullableObject<T> = T | null;
export type NullableNumber = NullableObject<number>;
export type NullableString = NullableObject<string>;
export type NullableBoolean = NullableObject<boolean>;

export type NumberLike = number | `${number}`;

export type Arrayable<T> = T | T[];