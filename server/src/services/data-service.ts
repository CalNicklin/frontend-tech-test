import { ZodError } from "zod";
import { env } from "@server/env";
import { CreditReportSchema } from "@shared/schemas";
import { APIError } from "@server/src/services/error";
import type { CreditReport } from "@shared/types";

export class DataService {
  private cache = new Map<string, unknown>();
  private pollInterval = 30 * 1000; // 30 seconds
  private isPolling = false;

  async init(): Promise<void> {
    if (this.isPolling) return;

    await this.fetchCreditReport();

    this.isPolling = true;
    this.startPolling();
  }

  private startPolling(): void {
    setInterval(() => {
      void this.fetchCreditReport();
    }, this.pollInterval);
  }

  private getBackoffDelay(attempt: number): number {
    // 1000ms, 2000ms, 4000ms
    // Exponential backoff
    return Math.pow(2, attempt) * 1000;
  }

  private async fetchWithRetry(url: string, retries = 3): Promise<Response> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url);
        if (response.ok) return response;

        if (i === retries - 1) {
          throw new APIError(`Failed to fetch credit report: ${response.statusText}`, response.status);
        }
      } catch (error) {
        if (i === retries - 1) throw error;
      }

      // Wait before retrying with exponential backoff
      await new Promise<void>(resolve => {
        setTimeout(resolve, this.getBackoffDelay(i));
      });
    }

    throw new APIError('Failed to fetch credit report', 500);
  }

  private async fetchCreditReport(): Promise<void> {
    try {
      const response = await this.fetchWithRetry(env.CREDIT_REPORT_API_URL);
      const data = await response.json() as unknown;
      const parsedData = CreditReportSchema.parse(data);
      this.cache.set('creditReport', parsedData);
    } catch (error) {
      if (error instanceof APIError || error instanceof ZodError) {
        throw error;
      }
      throw new APIError('Failed to fetch credit report', 500);
    }
  }

  public getCreditReport(): CreditReport | undefined {

    return this.cache.get('creditReport') as CreditReport
  }
}

export const dataService = new DataService();
