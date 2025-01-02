import { describe, it, expect, vi, beforeEach } from "vitest"
import { testClient } from "hono/testing";
import mockReport from "@server/src/services/mocks/credit-response.json";
import { dataService } from "@server/src/services/data-service";
import { createApp } from "../../lib/create-app";
import router from "./credit.index";

vi.mock("@server/src/services/data-service", () => ({
  dataService: {
    getCreditReport: () => undefined,  // Default return value
    init: () => Promise.resolve(),
  }
}));

const client = testClient(createApp().route("/", router));

describe('Credit Report Router', () => {
  beforeEach(() => {
    vi.spyOn(dataService, 'getCreditReport').mockReset();
  });

  it('should return a 200 status code and a credit report when data service is initialized', async () => {
    vi.spyOn(dataService, 'getCreditReport').mockReturnValue(mockReport);

    const response = await client.credit.$get();

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(mockReport);
  });

  it('should return a 500 status code when data service returns an error', async () => {
    vi.spyOn(dataService, 'getCreditReport').mockReturnValue(new Error('Failed to fetch credit report'));

    const response = await client.credit.$get();

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: 'Failed to fetch credit report'
    });
  });

  it('should return a 404 status code when data service returns undefined', async () => {
    vi.spyOn(dataService, 'getCreditReport').mockReturnValue(undefined);

    const response = await client.credit.$get();

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      message: 'No report found'
    });
  });
});
