## **Overview**

The `createAbortAsyncFn` function creates an asynchronous function wrapper that ensures only the last execution of the wrapped function is processed. This functionality is crucial for managing asynchronous operations where you need to guarantee that only the latest request remains active.

## **Installation**

1. **Installation via npm:**

   ```bash
   npm install yc-abort
   ```

2. **Importing into your project:**

   ```javascript
   import { createAbortAsyncFn } from 'yc-abort';
   ```

## **Usage Example**

The `createAbortAsyncFn` function accepts an asynchronous function (`asyncFn`) as its parameter and returns a new function that manages the execution of `asyncFn`. Here’s an example of how to integrate and utilize it:

```javascript
import { createAbortAsyncFn } from 'yc-abort';

// Example asynchronous function to be wrapped
async function fetchData(data, time) {
  return new Promise((resolve) => {
    // Simulate an asynchronous operation with setTimeout
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

// Creating the abortable async function
const abortableFetchData = createAbortAsyncFn(fetchData);

// Example test case using vitest framework
import { describe, it, expect } from 'vitest';

describe('createAbortAsyncFn', () => {
  it('should get the last result', async () => {
    // Using the abortable function to manage asynchronous calls
    let p1 = abortableFetchData(1, 0).then(() => {
      // Handle completion or expected behavior
    }).catch(() => {
      // Handle any expected errors or conditions
      expect(true).toBe(true);
    });

    let p2 = abortableFetchData(2, 3000).then(res => {
      // Assert the expected result from the asynchronous operation
      expect(res).toBe(2);
    });

    // Waiting for both promises to settle
    await Promise.all([p1, p2]);
  });
});
```

**Explanation**

- **Function Behavior:**
  - `createAbortAsyncFn` returns a function (`abortableFetchData`) that wraps the `fetchData` function.
  - Each call to `abortableFetchData` initiates an asynchronous operation (`fetchData`) with parameters (`data` and `time`).
  - The function ensures that only the result of the last call to `abortableFetchData` is processed. Previous calls are aborted if a new call is made before completion.

- **Error Handling:**
  - If an operation is aborted (due to subsequent calls), the Promise returned by `abortableFetchData` rejects with an appropriate error message.
