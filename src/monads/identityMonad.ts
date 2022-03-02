import {Monad} from '../types/monads';

export class IdentityMonad<T> implements Monad<T> {
  constructor(
    private readonly _value: T,
  ) {
  }

  static of = <T>(v: T) => new IdentityMonad<T>(v);

  fmap = <U>(f: (v: T) => U): Monad<U> => IdentityMonad.of<U>(f(this._value));

  get join(): T {
    return this._value;
  };

  bind = (f: (v: T) => T): T => this.fmap<T>(f).join;
}

