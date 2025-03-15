import { STATUS_CODES } from "./status-code";

class BaseErros extends Error{
    public readonly name: string;
    public readonly status: number;
    public readonly message: string

    constructor(name: string ,status: number,description:string){
        super(description);
        this.name=name;
        this.status=status;
        this.message=description;
        Object.setPrototypeOf(this,new.target.prototype);
        Error.captureStackTrace(this)
    }
}


//500 Internal Erros
export class APIError extends BaseErros{
    constructor(description='api error'){
        super(
            'api internal server error',
            STATUS_CODES.INTERNAL_ERROR,
            description
        )
    }
}

//400 validatation error
export class ValidationError extends BaseErros{
    constructor(description='bad request'){
        super(
            'bad request',
            STATUS_CODES.BAD_REQUEST,
            description
        )
    }
}

// 403 Authorize error
export class AuthorizeError extends BaseErros {
    constructor(description = "access denied") {
      super("access denied", STATUS_CODES.UN_AUTHORISED, description);
    }
  }
  
  // 404 Not Found
  export class NotFoundError extends BaseErros {
    constructor(description = "not found") {
      super(description, STATUS_CODES.NOT_FOUND, description);
    }
  }

