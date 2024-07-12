import { describe, it, expect } from 'vitest';
import { createAbortAsyncFn } from './main';

async function fetchData(data, time ): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });
}

describe('createAbortAsyncFn', () => {
  it('should get the last time res', async () => {
    let abortAsyncFn = createAbortAsyncFn(fetchData);

    let p1 = abortAsyncFn(1, 0).then(() => {
    }).catch(() => {
      expect(true).toBe(true);
    })

    let p2 = abortAsyncFn(2, 3000).then(res => {
      expect(res).toBe(2);
    })

    await Promise.all([p1, p2]);
  });
});