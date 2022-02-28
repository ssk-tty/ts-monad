export class IdentityMonad<T> {
  constructor(
    private readonly _value: T,
  ) {
  }

  static of = <T>(v: T) => new IdentityMonad<T>(v);

  map = <U>(f: (v: T) => U): IdentityMonad<U> => IdentityMonad.of<U>(f(this._value));

  get join(): T {
    return this._value;
  };

  bind = (f: (v: T) => T): T => this.map<T>(f).join;
}

