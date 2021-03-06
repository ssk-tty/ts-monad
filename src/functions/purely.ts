export class PurelyFunctions {
  /**
   * identity function
   */
  static id = <T>(v: T): T => v;

  /**
   * remove a key-value pair from obj
   */
  static removeKey = <T, K extends keyof T>(obj: T, key: K): Omit<T, K> => {
    const {[key]: _removed, ...res} = obj;

    return res as Omit<T, K>;
  };

  /**
   * regenerate object
   * if a key is found in obj, the value will be replaced with newValue
   */
  static regenerate = <T>(key: keyof T, newValue: Partial<T>) => (obj: T): T => ({
    ...{[key]: newValue[key] ?? obj[key]} as Pick<T, keyof T>,
    ...PurelyFunctions.removeKey<T, typeof key>(obj, key),
  } );
}
