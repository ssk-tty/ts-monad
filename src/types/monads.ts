export interface Monad<T> {
  /**
   * apply a function to v
   */
  fmap : <U>(f: (v: T) => U ) => Monad<U>,

  /**
   * eliminate nesting
   */
  join: T,

  /**
   * fmap and join
   */
  bind: (f: (v: T) => T) => T,
}
