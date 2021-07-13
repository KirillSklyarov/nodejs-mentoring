import { Request } from 'express';
import cloneDeep from 'lodash-ts/cloneDeep';
import { Service } from 'typedi';

@Service()
export class RequestHelper {
  copy(request: Request): Pick<Request, 'method' | 'path' | 'body' | 'params' | 'query'> {
    const requestCopy = {
      method: cloneDeep(request.method),
      body: cloneDeep(request.body),
      path: cloneDeep(request.path),
      params: cloneDeep(request.params),
      query: cloneDeep(request.query),
    };
    delete requestCopy.body?.password;

    return requestCopy;
  }
}
