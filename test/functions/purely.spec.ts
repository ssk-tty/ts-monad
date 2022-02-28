import {PurelyFunctions} from '../../src/functions/purely';

interface Test {
  val : string;
  text: string;
}

let testValue: Test;

beforeEach(() => {
  testValue = {
    val : 'value',
    text: 'text',
  };
});

describe('PurelyFunctions', () => {
  describe('methods', () => {
    describe('positive', () => {
      it('id', () => {
        expect(PurelyFunctions.id<Test>(testValue)).toStrictEqual(testValue);
      });

      it('removeKey', () => {
        const newValue = PurelyFunctions.removeKey<Test, 'val'>(testValue, 'val');

        expect(newValue).not.toStrictEqual(testValue);

        expect(newValue).not.toHaveProperty('val');
        expect(newValue).toHaveProperty('text');
      });

      it('regen has prop', () => {
        const newValue: Test = {
          val : '_value',
          text: '_text',
        };

        const fn = PurelyFunctions.regenerate<Test>('val', newValue);
        const regenerated: Test = fn(testValue);

        expect(regenerated).not.toStrictEqual(testValue);

        expect(regenerated.val).toBe('_value');
        expect(regenerated.text).toBe('text');
      });

      it('regen dont has prop', () => {
        const newValue: Partial<Test> = {
          val : '_value',
          text: undefined,
        };

        const fn = PurelyFunctions.regenerate<Test>('text', newValue);
        const regenerated: Test = fn(testValue);

        expect(regenerated).toStrictEqual(testValue);

        expect(regenerated.val).toBe('value');
        expect(regenerated.text).toBe('text');
      });
    });
  });
});
