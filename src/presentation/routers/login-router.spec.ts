interface IHttpRequest {
  body?: {
    email?: string;
    password?: string;
  };
}

class LoginRouter {
  route(httpRequest?: IHttpRequest) {
    if (!httpRequest) {
      return {
        statusCode: 500,
      };
    }

    if (!httpRequest.body) {
      return {
        statusCode: 500,
      };
    }

    const { email, password } = httpRequest.body;
    if (!email || !password) {
      return {
        statusCode: 400,
      };
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
