import { z } from "zod"

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
          town: z.string()
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
          accountOpened: z.string()
        }),
        paymentHistory: z.array(
          z.object({
            month: z.number(),
            paymentStatus: z.string(),
            year: z.number()
          })
        ),
        status: z.string(),
        supplierName: z.string()
      }),
      z.object({
        accountCategory: z.string(),
        accountNumber: z.string(),
        address: z.object({
          buildingName: z.string(),
          format: z.string(),
          postcode: z.string(),
          street: z.string(),
          town: z.string()
        }),
        contentKey: z.string(),
        displayName: z.string(),
        key: z.string(),
        name: z.string(),
        overview: z.object({
          lastUpdated: z.string(),
          balance: z.object({ amount: z.number(), currency: z.string() }),
          frequency: z.string(),
          accountOpened: z.string()
        }),
        paymentHistory: z.array(
          z.object({
            month: z.number(),
            paymentStatus: z.string(),
            year: z.number()
          })
        ),
        status: z.string(),
        supplierName: z.string()
      })
    ])
  ),
  personal: z.object({
    electoralRoll: z.array(
      z.object({
        address: z.object({
          buildingName: z.string(),
          format: z.string(),
          postcode: z.string(),
          street: z.string(),
          town: z.string()
        }),
        contextKey: z.string(),
        current: z.boolean(),
        endDateString: z.string(),
        name: z.string(),
        startDateString: z.string(),
        supplied: z.string()
      })
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
              town: z.string()
            }),
            type: z.object({
              code: z.string(),
              details: z.object({ catDesc: z.string() })
            }),
            startDate: z.string()
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
              town: z.string()
            }),
            type: z.object({
              code: z.string(),
              details: z.object({ catDesc: z.string() })
            }),
            startDate: z.string()
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
              town: z.string()
            }),
            type: z.object({ code: z.string() }),
            startDate: z.string()
          })
        ])
      )
    })
  })
})

export const SduiSchema = z.object({
  type: z.literal('screen'),
  title: z.string(),
  description: z.string(),
  insights: z.array(z.object({
    id: z.string(),
    type: z.literal('insightCard'),
    category: z.string(),
    title: z.string(),
    description: z.string(),
    impact: z.string()
  }))
})