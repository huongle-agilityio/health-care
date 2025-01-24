import { BASE_API, ERROR_MESSAGES } from '@/constants';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface RequestInitExtended extends Omit<RequestInit, 'body'> {
  baseUrl?: string;
}

interface IApiClient<T> {
  endpoint: string;
  method: string;
  body?: T;
  token?: string;
  options?: RequestInitExtended;
}

interface ApiProps<T> {
  endpoint: string;
  body: T;
  token?: string;
  options?: RequestInitExtended;
}

class HttpService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = BASE_API || '';
  }

  /**
   * Performs an HTTP request and returns the response as a promise.
   *
   * @template TResponse - The type of the response.
   * @template TPayload - The type of the request body.
   * @param {IApiClient<TPayload>} options - The options for the request.
   * @param {string} options.endpoint - The API endpoint to request.
   * @param {string} options.method - The HTTP method to use.
   * @param {TPayload} [options.body] - The request body.
   * @param {string} [options.token] - The authentication token to include in the request.
   * @param {RequestInit} [options.options] - Additional request options.
   * @returns {Promise<TResponse>} The response from the API.
   * @throws If the response is not ok.
   */
  private async createRequest<TResponse, TPayload = undefined>({
    endpoint,
    method,
    body,
    token,
    options,
  }: IApiClient<TPayload>): Promise<TResponse> {
    const baseUrl = options?.baseUrl || this.apiUrl;
    const initOptions: RequestInit = {
      method,
      headers: {
        ...(token && { Authorization: token }),
        'Content-Type': 'application/json',
      },
      ...options,
    };

    if (body) {
      initOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${baseUrl}api/${endpoint}`, initOptions);

      if (!response.ok) {
        const error = await response.json();

        if (Array.isArray(error)) {
          throw new Error(
            error.length > 1
              ? `Invalid fields: ${error.map((err) => err.path[1]).join(', ')}`
              : `Invalid field: ${error[0].path[1]}`,
          );
        }

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

  /**
   * Sends a GET request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {string} [token] - Optional authorization token for the request.
   * @param {RequestInit} [options] - Optional additional request options.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async get<TResponse>({
    endpoint,
    token,
    options,
  }: Omit<ApiProps<TResponse>, 'body'>): Promise<TResponse> {
    return this.createRequest<TResponse>({
      endpoint,
      method: HttpMethod.GET,
      token,
      options,
    });
  }

  /**
   * Sends a POST request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @template TPayload - The type of data to send in the request body.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to include in the request body.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async post<TResponse, TPayload>({
    endpoint,
    body,
    token,
    options,
  }: ApiProps<TPayload>): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      method: HttpMethod.POST,
      body,
      token,
      options,
    });
  }

  /**
   * Sends a PUT request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @template TPayload - The type of the payload to send with the request.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to send with the request.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async put<TResponse, TPayload>({
    endpoint,
    body,
    token,
    options,
  }: ApiProps<TPayload>): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      method: HttpMethod.PUT,
      body,
      token,
      options,
    });
  }

  /**
   * Sends a PATCH request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to include in the PATCH request.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async patch<TResponse, TPayload>({
    endpoint,
    body,
    token,
    options,
  }: ApiProps<TPayload>): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      method: HttpMethod.PATCH,
      body,
      token,
      options,
    });
  }

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to include in the DELETE request.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
  async delete<TResponse, TPayload>({
    endpoint,
    body,
    token,
    options,
  }: ApiProps<TPayload>): Promise<TResponse> {
    return this.createRequest<TResponse, TPayload>({
      endpoint,
      body,
      method: HttpMethod.DELETE,
      token,
      options,
    });
  }
}

export const httpClient = new HttpService();
