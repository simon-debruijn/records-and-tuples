# Records and tuples

Utilities to create deep immutable objects and arrays.

We make it possible to use immutable datastructures similar to this tc39 proposal:
https://github.com/tc39/proposal-record-tuple

We export 2 factory functions `createRecord` and `createTuple` which create a record and tuple respectively.

This package does not concern itself with equality. Comparing with the `===` operator will still use the basic equality by reference for objects and arrays.

## Examples

### Record

```typescript
import { createRecord } from "records-and-tuples";

const me = createRecord({
  name: "Michael",
  friends: ["Jim", "Pam"],
});

me.name = "Steve"; // Will throw a runtime error

me.friends.push("Dwight"); // Will throw a runtime error
```

### Tuple

```typescript
import { createTuple } from "records-and-tuples";

const hobbies = createTuple(["Art & Craft", "Business", "Dance"]);

hobbies = []; // Will throw a runtime error

hobbies.push("soccer"); // Will throw a runtime error
```
