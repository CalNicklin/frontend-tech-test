import { env } from "@/server/env";

export class DataService {
  private cache = new Map<string, unknown>();
  private pollInterval = 30 * 1000; // 30 seconds
  private isPolling = false;

  async init(): Promise<void> {
    if (this.isPolling) return;

    // Initial fetch
    await this.fetchCreditReport();

    // Start polling
    this.isPolling = true;
    this.startPolling();
  }

  private startPolling(): void {
    setInterval(() => {
      void this.fetchCreditReport()
    }, this.pollInterval);
  }

  private async fetchCreditReport(): Promise<void> {
    try {
      const response = await fetch(env.CREDIT_REPORT_API_URL);
      const data = await response.json() as z.infer<typeof CreditReportSchema>;
      const parsedData = CreditReportSchema.parse(data);
      this.cache.set('creditReport', parsedData);
    } catch (error) {
      console.error(error);
    }
  }

  public getCreditReport() {
    return this.cache.get('creditReport') as z.infer<typeof CreditReportSchema> | undefined;
  }
}

export const dataService = new DataService();
