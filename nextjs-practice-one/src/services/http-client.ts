import { BASE_API, ERROR_MESSAGES } from '@/constants';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface IApiClient<T> {
  endpoint: string;
  method: string;
  body?: T;
  token?: string;
  options?: RequestInit;
}

class HttpService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = BASE_API || '';
  }

  private async createRequest<TResponse, TPayload = undefined>({
    endpoint,
    method,
    body,
    token,
    options,
  }: IApiClient<TPayload>): Promise<TResponse> {
    const initOptions: RequestInit = {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (body) {
      initOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(
        `${this.apiUrl}api/${endpoint}`,
        initOptions,
      );

      if (!response.ok) {
        const error = await response.json();

        throw new Error(
          error.error.message ||
            `Error: ${response.status} - ${response.statusText}`,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new Error(ERROR_MESSAGES.DEFAULT_API_ERROR);
    }
  }

  // GET method
  async get<TResponse>(
    endpoint: string,
    token?: string,
    options?: RequestInit,
  ): Promise<TResponse> {
    return this.createRequest<TResponse>({
      endpoint,
      method: HttpMethod.GET,
      token,
      options,
    });
  }

  // POST method
  async post<TResponse, TPayload>(
    endpoint: string,
    body: TPayload,
    token?: string,
  ): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      method: HttpMethod.POST,
      body,
      token,
    });
  }

  // PUT method
  async put<TResponse, TPayload>(
    endpoint: string,
    body: TPayload,
    token?: string,
  ): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      method: HttpMethod.PUT,
      body,
      token,
    });
  }

  // PATCH method
  async patch<TResponse, TPayload>(
    endpoint: string,
    body: TPayload,
    token?: string,
  ): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      method: HttpMethod.PATCH,
      body,
      token,
    });
  }

  // DELETE method
  async delete<TResponse, TPayload>(
    endpoint: string,
    body: TPayload,
    token?: string,
  ): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      body,
      method: HttpMethod.DELETE,
      token,
    });
  }
}

export const httpClient = new HttpService();
