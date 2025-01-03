/* eslint-disable no-console -- intentionally logging to console */
import { ZodError } from 'zod';
import { env } from '@server/env';
import { CreditReportSchema } from '@shared/schemas';
import { APIError } from '@server/src/services/error';
import type { CreditReport } from '@shared/types';

/**
 * DataService is a singleton class that fetches and caches credit report data and insights.
 * It has a simple cache that is used to store the credit report data.
 * In reality this would likely be querying a database or some other data store.
 */
export class DataService {
  private static instance: DataService | null = null;
  private cache = new Map<string, unknown>();
  private pollInterval = 30 * 1000;
  private isPolling = false;
  private error: Error | null = null;
  private isInitialized = false;

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  async init(): Promise<void> {
    if (this.isPolling) return;

    console.log('Initializing DataService...');
    try {
      await this.fetchCreditReport();
      this.isInitialized = true;
      console.log('DataService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize DataService:', error);
      throw error;
    }

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
          this.error = new APIError(
            `Failed to fetch credit report: ${response.statusText}`,
            response.status,
          );
          throw this.error;
        }
      } catch (error) {
        if (i === retries - 1) throw error;
      }

      // Wait before retrying with exponential backoff
      await new Promise<void>((resolve) => {
        setTimeout(resolve, this.getBackoffDelay(i));
      });
    }

    throw new APIError('Failed to fetch credit report', 500);
  }

  private async fetchCreditReport(): Promise<void> {
    try {
      const response = await this.fetchWithRetry(env.CREDIT_REPORT_API_URL);
      const data = (await response.json()) as unknown;
      const parsedData = CreditReportSchema.parse(data);
      this.cache.set('creditReport', parsedData);
    } catch (error) {
      if (error instanceof APIError || error instanceof ZodError) {
        this.error = error;
        throw error;
      }
      this.error = new APIError('Failed to fetch credit report', 500);
      throw this.error;
    }
  }

  public getCreditReport(): CreditReport | Error | undefined {
    if (!this.isInitialized) {
      console.warn('DataService not initialized');
      return new Error('DataService not initialized');
    }

    if (this.error) {
      console.error('DataService error:', this.error);
      return this.error;
    }

    const report = this.cache.get('creditReport') as CreditReport | undefined;
    if (!report) {
      console.warn('No credit report in cache');
    }
    return report;
  }

  // Protected method for testing purposes
  public static resetInstance(): void {
    DataService.instance = null;
  }
}
