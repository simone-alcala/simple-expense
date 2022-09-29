type ErrorTypes = 
  'conflict'      | 
  'not_found'     | 
  'unauthorized'  | 
  'wrong_schema'  | 
  'bad_request'   ;

enum StatusCode {
  bad_request   = 400,
  unauthorized  = 401,
  not_found     = 404,
  conflict      = 409,
  wrong_schema  = 422
}

export interface AppError {
  type:       ErrorTypes;
  statusCode: StatusCode;
  message?:   string;
}

export function isAppError(error: any) {
  return error.statusCode !== undefined;
}

export function badRequest(message?: string): AppError {
  return { type: 'bad_request', message, statusCode: StatusCode.bad_request };
}

export function unauthorized(message?: string): AppError {
  return { type: 'unauthorized', message, statusCode: StatusCode.unauthorized };
}

export function notFound(message?: string): AppError {
  return { type: 'not_found', message, statusCode: StatusCode.not_found };
}

export function conflict(message?: string): AppError {
  return { type: 'conflict', message, statusCode: StatusCode.conflict };
}

export function wrongSchema(message?: string): AppError {
  return { type: 'wrong_schema', message, statusCode: StatusCode.wrong_schema };
}