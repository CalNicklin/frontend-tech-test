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

// Atomic elements
const Typography = z.object({
  type: z.enum(['heading', 'body']),
  text: z.string(),
});

export enum Statuses {
  OnTrack = 'on_track',
  OffTrack = 'off_track',
}

export const Status = z.object({
  type: z.literal('status'),
  value: z.nativeEnum(Statuses),
});

const Impact = z.object({
  type: z.literal('impact'),
  level: z.enum(['high', 'medium', 'low']),
});

// Card elements can be composed in any order
const CardElement = z.discriminatedUnion('type', [Typography, Status, Impact]);

// A card is a collection of elements
const InsightCard = z.object({
  id: z.string(),
  type: z.literal('insightCard'),
  category: z.enum(['public_info', 'credit_usage', 'electoral_roll']),
  elements: z.array(CardElement),
  actions: z.object({
    onClick: z.optional(
      z.object({
        type: z.enum(['drawer', 'modal']),
        data: z.record(z.unknown()),
      }),
    ),
  }),
});

// The screen schema
export const SDUISchema = z.object({
  type: z.literal('screen'),
  elements: z.array(InsightCard),
});
