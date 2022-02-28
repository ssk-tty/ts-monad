export class PurelyFunctions {
  /**
   * identity function
   */
  static id = <T>(v: T): T => v;

  static removeKey = <T, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
    const {[key]: _removed, ...res} = obj
    return res as Omit<T, K>;
  }

  /**
   * regenerate object
   * if a key is found in value, it will be replaced with newValue
   */
  // @ts-ignore
  static regenerate = <T>(key: keyof T, newValue: Partial<T>) => (obj: T): T => ({
    [key]: newValue[key] ?? obj[key],
    ...PurelyFunctions.removeKey<T, typeof key>(obj, key),
  });
}
