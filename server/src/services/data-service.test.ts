import { describe, it, expect, beforeEach, vi, afterAll } from 'vitest';
import { ZodError } from 'zod';
import { env } from '@/server/env';
import { CreditReportSchema } from '@/shared/schemas';
import { DataService } from './data-service';
import mockReport from './mocks/credit-response.json';
import { APIError } from './error';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('DataService', () => {
  let dataService: DataService;
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.clearAllMocks();
    dataService = new DataService();
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockReport),
      } as Response)
    );
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('should fetch data every 30 seconds', async () => {
    vi.useFakeTimers();

    await dataService.init();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(env.CREDIT_REPORT_API_URL);

    await vi.advanceTimersByTimeAsync(30000);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(30000);
    expect(global.fetch).toHaveBeenCalledTimes(3);

    vi.useRealTimers();
  });

  it('should cache data and return cached data if available', async () => {
    await dataService.init();

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(dataService.getCreditReport()).toEqual(mockReport);

    expect(dataService.getCreditReport()).toEqual(mockReport);
    expect(dataService.getCreditReport()).toEqual(mockReport);

    // Verify fetch wasn't called again (still just once from init)
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should fetch valid credit score data', async () => {
    await dataService.init();
    const report = dataService.getCreditReport();
    expect(CreditReportSchema.parse(report)).toBeTruthy();
  });

  it.todo('should fetch valid insight data');

  it('should return an error if the data cannot be fetched', async () => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response)
    );

    try {
      await dataService.init();
    } catch (error) {
      expect(error).toBeInstanceOf(APIError);
      expect((error as APIError).status).toBe(404);
      expect((error as APIError).message).toBe('Failed to fetch credit report: Not Found');
    }
  });

  it('should return a zod error if the data cannot be parsed', async () => {
    const mockResponse = mockReport;

    // @ts-expect-error - this is a test
    mockResponse.accounts[0].overview.balance = 'invalid';

    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockResponse),
      } as Response)
    );

    try {
      await dataService.init();
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });

  it('should return an undefined value if the cache is empty', () => {
    expect(dataService.getCreditReport()).toBeUndefined();
  });
});
