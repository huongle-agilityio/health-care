import '@testing-library/jest-dom';

beforeEach(() => {
  const MockObserverInstance = {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };

  window.ResizeObserver = jest
    .fn()
    .mockImplementation(() => MockObserverInstance);
});
