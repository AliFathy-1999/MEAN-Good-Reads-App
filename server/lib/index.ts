import { ErrorRequestHandler } from 'express';
const asycnWrapper = (promise:Promise<void>)=> 
    promise.then((data:any)=>[undefined,data])
    .catch((err:any)=>[err]);

module.exports = asycnWrapper;