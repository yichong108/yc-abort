/**
 * create async function that can abort previous running promise, that meaning
 * it always the last execution for the function.
 * @param asyncFn
 */
declare function createAbortAsyncFn(asyncFn: any): (...args: any[]) => Promise<any>;
export { createAbortAsyncFn, };
