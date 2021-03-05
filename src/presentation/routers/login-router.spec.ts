interface IHttpRequest {
  body?: {
    email?: string;
    password?: string;
  };
}

class MissingParamError extends Error {
  constructor(paraName: string) {
    super(`Missing param: ${paraName}`);
    this.name = 'MissingParamError';
  }
}

interface IHttpResponse {
  statusCode?: number;
  body?: any;
}
class HttpResponse {
  static badRequest(paramsName: string): IHttpResponse {
    return {
      statusCode: 400,
      body: new MissingParamError(paramsName),
    };
  }

  static serverError() {
    return {
      statusCode: 500,
    };
  }
}

class LoginRouter {
  route(httpRequest?: IHttpRequest): IHttpResponse | undefined {
    if (!httpRequest) {
      return HttpResponse.serverError();
    }

    if (!httpRequest.body) {
      return HttpResponse.serverError();
    }

    const { email, password } = httpRequest.body;
    if (!email) {
      return HttpResponse.badRequest('email');
    }

    if (!password) {
      return HttpResponse.badRequest('password');
    }
  }
}

describe('Login Router', () => {
  test('should return 400 if no email is provided', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = sut.route(httpRequest);

    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('email'));
  });

  test('should return 400 if no password is provided', () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
      },
    };
    const httpResponse = sut.route(httpRequest);

    expect(httpResponse?.statusCode).toBe(400);
    expect(httpResponse?.body).toEqual(new MissingParamError('password'));
  });

  test('should return 500 if no httpRequest is provided', () => {
    const sut = new LoginRouter();
    const httpResponse = sut.route();

    expect(httpResponse?.statusCode).toBe(500);
  });

  test('should return 500 if no httpRequest has no body', () => {
    const sut = new LoginRouter();
    const httpRequest = {};
    const httpResponse = sut.route(httpRequest);

    expect(httpResponse?.statusCode).toBe(500);
  });
});
