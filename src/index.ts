type MutableObject<T> = { [P in keyof T]: T[P] };

type ImmutableObject<T> = Readonly<MutableObject<T>>;

type MutableArray<T> = Array<T>;

type ImmutableArray<T> = Readonly<MutableArray<T>>;

function isMutableArray<T>(val: any): val is MutableArray<T> {
  return Array.isArray(val);
}

function isMutableObject<T>(val: any): val is MutableObject<T> {
  return val && typeof val === "object";
}

function freeze<K extends string, T>(object: MutableObject<T>) {
  return Object.freeze(object);
}

function insert(arr: Array<unknown>, index: number, value: unknown) {
  arr.splice(index, 1, value);
}

export function createTuple<T>(array: MutableArray<T>): ImmutableArray<T> {
  const size = Object.keys(array).length;

  const tuple = new Array(size).fill(undefined);

  for (const key in array) {
    const index = parseInt(key);
    const val = array[index];

    // if it is an array
    if (isMutableArray(val)) {
      insert(array, 1, createTuple(val));
      continue;
    }
    // if it is not null and an object
    if (isMutableObject(val)) {
      insert(array, 1, createRecord(val));
      continue;
    }

    // else
    tuple.splice(index, 1, val);
  }

  return freeze(tuple) as ImmutableArray<T>;
}

export function createRecord<K extends string, T>(
  object: MutableObject<T>
): ImmutableObject<T> {
  const record = {} as Record<string, unknown>;

  for (const key in object) {
    const val = object[key];

    // if it is an array
    if (isMutableArray(val)) {
      record[key] = createTuple(val);
      continue;
    }
    // if it is an object
    if (isMutableObject(val)) {
      record[key] = createRecord(val);
      continue;
    }

    // else
    record[key] = val;
  }

  return freeze(record) as ImmutableObject<T>;
}
