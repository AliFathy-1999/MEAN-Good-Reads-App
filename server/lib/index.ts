import { ErrorRequestHandler } from 'express';
const asycnWrapper = (promise: Promise<void>) =>
  promise.then((data: any) => [undefined, data]).catch((err) => [err]);

module.exports = asycnWrapper;
