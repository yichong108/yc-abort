import { createAbortAsyncFn } from '../lib/main';

async function fetchData(data): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 0);
  });
}

let abortAsyncFn = createAbortAsyncFn(fetchData);

abortAsyncFn(0).then(res => {
  console.log(res);
}).catch((e) => {
  console.error('error 0', e);
});

setTimeout(() => {
  abortAsyncFn(1).then(res => {
    console.log(res);
  }).catch((e) => {
    console.error('error 1', e);
  });
}, 1000);

setTimeout(() => {
  abortAsyncFn(2).then(res => {
    console.log(res);
  }).catch((e) => {
    console.error('error 2', e);
  });
}, 2000);

setTimeout(() => {
  abortAsyncFn(3).then(res => {
    console.log(res);
  });
}, 3000);
