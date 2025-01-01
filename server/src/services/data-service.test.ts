import { describe, it, expect, beforeEach, vi, beforeAll, afterAll } from 'vitest';
import { env } from '@/server/env';
import { dataService } from './data-service';

// Reset mocks between tests
beforeEach(() => {
  vi.clearAllMocks();
});

describe('DataService', () => {
  const originalFetch = global.fetch;

  beforeAll(() => {
    vi.spyOn(global, 'fetch');
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });
  
  it('should fetch data every 30 seconds', async () => {
    vi.useFakeTimers();

    const mockResponse = {
      creditScore: 100,
      insight: 'This is a test insight',
    };

    // Better fetch mock implementation
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    await dataService.init();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(env.CREDIT_REPORT_API_URL);

    await vi.advanceTimersByTimeAsync(30000);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(30000);
    expect(global.fetch).toHaveBeenCalledTimes(3);

    vi.useRealTimers();
  });

  it.todo('should cache data');

  it.todo('should return cached data if available');

  it.todo('should fetch valid credit score data');

  it.todo('should fetch valid insight data');

  it.todo('should fetch new data if not cached');

  it.todo('should return an error if the data cannot be fetched');

  it.todo('should return a zod error if the data cannot be parsed');

  it.todo('should return an undefined value if the cache is empty');
});
