import {IdentityMonad} from '../src/identityMonad';

// for test
const add = (n: number) => (m: number) => n + m;

describe('IdentityMonad', () => {
  describe('local functions', () => {
    it('add', () => {
      expect(add(1)(2)).toBe(3);
    });
  });

  describe('Monad Laws', () => {
    it('Left Identity', () => {
      const x: number = 1;
      const f = add(1);

      const l: number = IdentityMonad
        .of<number>(x)
        .bind(f);

      const r: number = f(x);

      expect(l).toBe(r);
    });

    it('Right Identity', () => {
      const x: number = 1;

      const l: IdentityMonad<number> = IdentityMonad
        .of<number>(
          IdentityMonad
            .of<number>(x)
            .join
        );

      const r: IdentityMonad<number> = IdentityMonad
        .of<number>(x);

      expect(JSON.stringify((l))).toEqual(JSON.stringify(r));
    });

    it('Associativity', () => {
      const x: number = 1;

      const add1 = add(1);
      const add10 = add(10);

      const l: number = IdentityMonad
        .of<number>(
          IdentityMonad
            .of<number>(x)
            .bind(add1)
        )
        .bind(add10);

      const r: number = IdentityMonad
        .of<number>(
          IdentityMonad
            .of<number>(add1(x))
            .bind(add10)
        )
        .join;

      expect(l).toBe(r);
    });
  });
});
