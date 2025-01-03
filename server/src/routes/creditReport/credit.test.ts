import { describe, it, expect, vi, beforeEach } from 'vitest';
import { testClient } from 'hono/testing';
import mockReport from '@server/src/services/mocks/credit-response.json';
import { dataService } from '@server/src/services/data-service';
import { sduiService } from '@server/src/services/sdui-service';
import { createApp } from '../../lib/create-app';
import router from './credit.index';

vi.mock('@server/src/services/data-service', () => ({
  dataService: {
    getCreditReport: vi.fn(),
    init: () => Promise.resolve(),
  },
}));

vi.mock('@server/src/services/sdui-service', () => ({
  sduiService: {
    generateSchema: vi.fn(),
  },
}));

const client = testClient(createApp().route('/', router));

describe('Credit Report Router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a 200 status code and a SDUI schema when report is available', async () => {
    const mockSchema = { type: 'screen' as const, elements: [] };
    vi.spyOn(dataService, 'getCreditReport').mockReturnValue(mockReport);
    vi.spyOn(sduiService, 'generateSchema').mockReturnValue(mockSchema);

    const response = await client.credit.$get();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockSchema);
    // eslint-disable-next-line @typescript-eslint/unbound-method -- this is a mock
    expect(sduiService.generateSchema).toHaveBeenCalledWith(mockReport);
  });

  it('should return a 503 status code when report is not available', async () => {
    vi.spyOn(dataService, 'getCreditReport').mockReturnValue(undefined);

    const response = await client.credit.$get();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      message: 'Report not available',
    });
  });

  it('should return a 503 status code when data service returns an error', async () => {
    vi.spyOn(dataService, 'getCreditReport').mockReturnValue(
      new Error('Failed to fetch credit report'),
    );

    const response = await client.credit.$get();

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      message: 'Report not available',
    });
  });
});
