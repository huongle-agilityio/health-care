// Constants
import { BASE_API } from '@/constants';

// Services
import { httpClient } from '..';

global.fetch = jest.fn();

describe('HttpService', () => {
  const mockResponse = { success: true };
  const URL = `${BASE_API}api/endpoint`;
  const headers = {
    headers: expect.objectContaining({
      'Content-Type': 'application/json',
    }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should make a GET request and return the response', async () => {
    const mockResponse = { data: 'test' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await httpClient.get({ endpoint: 'endpoint' });
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      URL,
      expect.objectContaining({
        method: 'GET',
        ...headers,
      }),
    );
  });

  it('Should make a POST request and return the response', async () => {
    const mockPayload = { name: 'John' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await httpClient.post({
      endpoint: 'endpoint',
      body: mockPayload,
    });
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      URL,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(mockPayload),
        ...headers,
      }),
    );
  });

  it('Should handle errors when API returns a non-ok response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: { message: 'Something went wrong' } }),
    });

    await expect(httpClient.get({ endpoint: 'endpoint' })).rejects.toThrow(
      'Something went wrong',
    );
  });

  it('Should make a PUT request and return the response', async () => {
    const mockPayload = { name: 'Jane' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await httpClient.put({
      endpoint: 'endpoint',
      body: mockPayload,
    });
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      URL,
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(mockPayload),
        ...headers,
      }),
    );
  });

  it('Should make a PATCH request and return the response', async () => {
    const mockPayload = { name: 'Doe' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await httpClient.patch({
      endpoint: 'endpoint',
      body: mockPayload,
    });
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      URL,
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify(mockPayload),
        ...headers,
      }),
    );
  });

  it('Should make a DELETE request and return the response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });
    const response = await httpClient.delete({
      endpoint: 'endpoint',
    });

    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      URL,
      expect.objectContaining({
        method: 'DELETE',
        ...headers,
      }),
    );
  });
});
