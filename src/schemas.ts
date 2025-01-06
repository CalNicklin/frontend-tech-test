import { z } from 'zod';

export const CreditReportSchema = z.object({
  accounts: z.array(
    z.union([
      z.object({
        accountCategory: z.string(),
        accountNumber: z.string(),
        address: z.object({
          buildingName: z.string(),
          format: z.string(),
          postcode: z.string(),
          street: z.string(),
          town: z.string(),
        }),
        contentKey: z.string(),
        displayName: z.string(),
        key: z.string(),
        name: z.string(),
        overview: z.object({
          lastUpdated: z.string(),
          utilization: z.number(),
          balance: z.object({ amount: z.number(), currency: z.string() }),
          frequency: z.string(),
          limit: z.object({ amount: z.number(), currency: z.string() }),
          accountOpened: z.string(),
        }),
        paymentHistory: z.array(
          z.object({
            month: z.number(),
            paymentStatus: z.string(),
            year: z.number(),
          }),
        ),
        status: z.string(),
        supplierName: z.string(),
      }),
      z.object({
        accountCategory: z.string(),
        accountNumber: z.string(),
        address: z.object({
          buildingName: z.string(),
          format: z.string(),
          postcode: z.string(),
          street: z.string(),
          town: z.string(),
        }),
        contentKey: z.string(),
        displayName: z.string(),
        key: z.string(),
        name: z.string(),
        overview: z.object({
          lastUpdated: z.string(),
          balance: z.object({ amount: z.number(), currency: z.string() }),
          frequency: z.string(),
          accountOpened: z.string(),
        }),
        paymentHistory: z.array(
          z.object({
            month: z.number(),
            paymentStatus: z.string(),
            year: z.number(),
          }),
        ),
        status: z.string(),
        supplierName: z.string(),
      }),
    ]),
  ),
  personal: z.object({
    electoralRoll: z.array(
      z.object({
        address: z.object({
          buildingName: z.string(),
          format: z.string(),
          postcode: z.string(),
          street: z.string(),
          town: z.string(),
        }),
        contextKey: z.string(),
        current: z.boolean(),
        endDateString: z.string(),
        name: z.string(),
        startDateString: z.string(),
        supplied: z.string(),
      }),
    ),
    publicInfo: z.object({
      courtAndInsolvencies: z.array(
        z.union([
          z.object({
            name: z.string(),
            dob: z.string(),
            courtName: z.string(),
            contextKey: z.string(),
            dischargeDate: z.string(),
            caseReference: z.string(),
            amount: z.object({ amount: z.number(), currency: z.string() }),
            address: z.object({
              buildingName: z.string(),
              format: z.string(),
              postcode: z.string(),
              street: z.string(),
              town: z.string(),
            }),
            type: z.object({
              code: z.string(),
              details: z.object({ catDesc: z.string() }),
            }),
            startDate: z.string(),
          }),
          z.object({
            name: z.string(),
            dob: z.string(),
            courtName: z.string(),
            contextKey: z.string(),
            caseReference: z.string(),
            amount: z.object({ amount: z.number(), currency: z.string() }),
            address: z.object({
              buildingName: z.string(),
              format: z.string(),
              postcode: z.string(),
              street: z.string(),
              town: z.string(),
            }),
            type: z.object({
              code: z.string(),
              details: z.object({ catDesc: z.string() }),
            }),
            startDate: z.string(),
          }),
          z.object({
            name: z.string(),
            dob: z.string(),
            courtName: z.string(),
            contextKey: z.string(),
            dischargeDate: z.string(),
            caseReference: z.string(),
            amount: z.object({ amount: z.number(), currency: z.string() }),
            address: z.object({
              buildingName: z.string(),
              format: z.string(),
              postcode: z.string(),
              street: z.string(),
              town: z.string(),
            }),
            type: z.object({ code: z.string() }),
            startDate: z.string(),
          }),
        ]),
      ),
    }),
  }),
});

export const ElectoralRollInsightSchema =
  CreditReportSchema.shape.personal.shape.electoralRoll;

export const PublicInfoInsightSchema =
  CreditReportSchema.shape.personal.shape.publicInfo.shape.courtAndInsolvencies;

export const CreditUsageInsightSchema = CreditReportSchema.shape.accounts;

export const InsightsReportSchema = z.object({
  title: z.string(),
  onTrackDescription: z.string(),
  offTrackDescription: z.string(),
  details: z.array(z.object({ title: z.string(), description: z.string() })),
});
