"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRecord = exports.createTuple = void 0;
function isMutableArray(val) {
    return Array.isArray(val);
}
function isMutableObject(val) {
    return val && typeof val === "object";
}
function freeze(object) {
    return Object.freeze(object);
}
function insert(arr, index, value) {
    arr.splice(index, 1, value);
}
function createTuple(array) {
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
    return freeze(tuple);
}
exports.createTuple = createTuple;
function createRecord(object) {
    const record = {};
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
    return freeze(record);
}
exports.createRecord = createRecord;
