/**
 * create async function that can abort previous running promise, that meaning
 * it always the last execution for the function.
 * @param asyncFn
 */
function createAbortAsyncFn(asyncFn) {
  let abort;

  return async function (...args) {
    if (abort) {
      abort();
    }

    const abortPromise = new Promise((_, reject) => {
      abort = () => reject(new Error('async function was aborted'));
    });

    let ps = asyncFn(...args);

    return Promise.race([ps, abortPromise]);
  }
}

export {
  createAbortAsyncFn,
}

function startAsyncTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Task completed');
    }, 5000);
  });
}