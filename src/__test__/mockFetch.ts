export const mockFetch = (mockSuccessResponse = {}) => {
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    ok: true,
    json: () => mockJsonPromise
  });
  const globalRef: any = global;
  globalRef.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
};
