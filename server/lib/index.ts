import { ErrorRequestHandler } from 'express';
import { handleResponseError } from './handlingErrors';
import { AppError } from './appError';

const asycnWrapper = (promise: Promise<void>) => promise.then((data: any) => [undefined, data]).catch((err) => [err]);

export { asycnWrapper, AppError, handleResponseError };
