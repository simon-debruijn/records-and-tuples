type MutableObject<T> = {
    [P in keyof T]: T[P];
};
type ImmutableObject<T> = Readonly<MutableObject<T>>;
type MutableArray<T> = Array<T>;
type ImmutableArray<T> = Readonly<MutableArray<T>>;
export declare function createTuple<T>(array: MutableArray<T>): ImmutableArray<T>;
export declare function createRecord<K extends string, T>(object: MutableObject<T>): ImmutableObject<T>;
declare const _default: {
    createRecord: typeof createRecord;
    createTuple: typeof createTuple;
};
export default _default;
