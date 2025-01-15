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

  /**
   * Sends a GET request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {string} [token] - Optional authorization token for the request.
   * @param {RequestInit} [options] - Optional additional request options.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
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

  /**
   * Sends a PATCH request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to include in the PATCH request.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
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

  /**
   * Sends a DELETE request to the specified endpoint.
   *
   * @template TResponse - The expected response type.
   * @param {string} endpoint - The API endpoint to send the request to.
   * @param {TPayload} body - The payload to include in the DELETE request.
   * @param {string} [token] - Optional authorization token for the request.
   * @returns {Promise<TResponse>} - A promise that resolves to the response data.
   */
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
