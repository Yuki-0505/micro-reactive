export type Getter<T> = () => T
export type Setter<T> = (value: T) => void

export type Accessor<T> = {
  get: Getter<T>
  set: Setter<T>
}

export interface Signal<T> {
  (): T
  (value: T): void
  (value: Partial<T>, patch: boolean): void
}

export type Reactive<T> = Signal<T> &
  (T extends object
    ? { readonly [key in keyof T]: Reactive<T[key]> } & Readonly<T>
    : {})

export type ReadonlyReactive<T> = Getter<T> &
  (T extends object
    ? { readonly [key in keyof T]: ReadonlyReactive<T[key]> } & Readonly<T>
    : {})

export type ReactiveMap<T> = Map<keyof T, Reactive<T[keyof T]>>

export type EffectFunction<T extends any[] = [], R = void> = (...args: T) => R

export type Option<T> = {
  reactiveMap: ReactiveMap<T>
  parent: Option<T> | null
  effects: Set<EffectFunction>
  path: string
  get: Getter<T>
  set: Setter<T> | ((value: Partial<T>, patch: boolean) => void)
}

export type ReactiveType<T> =
  T extends Reactive<infer V> ? V : never

export type DependenciesType<T> =
  T extends [infer F, ...infer N]
  ? [ReactiveType<F>, ...DependenciesType<N>]
  : []

export type Getters<T = Record<string | symbol, any>> = {
  [key in keyof T]: Getter<T[key]>
}

export type Actions = {
  [key: string]: (...args: any[]) => void
}

export type Options<
  Id extends string,
  S extends Record<string | symbol, any>,
  G extends Getters,
  A extends Actions,
  > = {
    id: Id
    state: S
    getters: G & ThisType<Store<Id, S, G, {}>>
    actions: A & ThisType<Store<Id, S, G, A>>
  }

export type Computes<T extends Getters<Record<string | symbol, any>>> = {
  readonly [key in keyof T]: () => ReturnType<T[key]>
}

export type Store<
  Id extends string,
  S extends Record<string | symbol, any>,
  G extends Getters,
  A extends Actions,
  > = { $id: Id }
  & Reactive<S>
  & Computes<G>
  & Readonly<A>
