import { beforeEach, describe, expect, it } from "vitest";
import mockReport from './mocks/credit-response.json'
import { SDUIService } from "./sdui-service";

describe('SDUIService', () => {
  let sduiService: SDUIService;

  beforeEach(() => {
    sduiService = new SDUIService();
  });

  describe('determineStatus', () => {
    describe('Public info', () => {
      describe('If there is any information within the personal.publicInfo.courtAndInsolvencies[] array, they have CCJ or insolvency.', () => {
        it('If the user has any CCJ or insolvencies, then they are considered to be off track.', () => {
          const schema = sduiService.generateSchema(mockReport)
          const publicInfo = schema.elements.filter(element => element.category === 'public_info')
          const status = publicInfo[0].elements.find(element => element.type === 'status')
          expect(status?.value).toBe('off_track')
        })

        it('If the user has no CCJ or insolvencies, then they are considered to be on track.', () => {
          const report = {
            ...mockReport,
            personal: {
              ...mockReport.personal,
              publicInfo: {
                ...mockReport.personal.publicInfo,
                courtAndInsolvencies: []
              }
            }
          }
          const schema = sduiService.generateSchema(report)
          const publicInfo = schema.elements.filter(element => element.category === 'public_info')
          const status = publicInfo[0].elements.find(element => element.type === 'status')
          expect(status?.value).toBe('on_track')
        })
      })
    })

    describe('Credit utilisation', () => {
      describe('An account it considered to be a credit card when accounts[].accountCategory is credit_cards', () => {
        it('If the user has any credit card balance 50% or more of their limit, they are considered off track', () => {
          const report = {
            ...mockReport,
            accounts: [
              ...mockReport.accounts,
              {
                ...mockReport.accounts[0],
                accountCategory: 'credit_cards',
                overview: {
                  ...mockReport.accounts[0].overview,
                  balance: {
                    ...mockReport.accounts[0].overview.balance,
                    amount: 3250
                  },
                  limit: {
                    ...mockReport.accounts[0].overview.limit,
                    amount: 6500
                  }
                }
              }
            ]
          }
          const schema = sduiService.generateSchema(report)
          const creditUtilisation = schema.elements.filter(element => element.category === 'credit_usage')
          const status = creditUtilisation[0].elements.find(element => element.type === 'status')
          expect(status?.value).toBe('off_track')
        })

        it('If the user has no credit card balance 50% or more of their limit, they are considered on track', () => {
          const schema = sduiService.generateSchema(mockReport)
          const creditUtilisation = schema.elements.filter(element => element.category === 'credit_usage')
          const status = creditUtilisation[0].elements.find(element => element.type === 'status')
          expect(status?.value).toBe('on_track')
        })
      })
    })

    describe('Electoral roll', () => {
      it('If the user is not on an electoral roll, they are considered to be off track', () => {
        const report = {
          ...mockReport,
          personal: {
            ...mockReport.personal,
            electoralRoll: [
              {
                ...mockReport.personal.electoralRoll[0],
                current: false
              }
            ]
          }
        }
        const schema = sduiService.generateSchema(report)
        const electoralRoll = schema.elements.filter(element => element.category === 'electoral_roll')
        const status = electoralRoll[0].elements.find(element => element.type === 'status')
        expect(status?.value).toBe('off_track')
      })
    })

    it('If the user has no public info, credit utilisation or electoral roll, they are considered to be off track', () => {
      const schema = sduiService.generateSchema(mockReport)
      const electoralRoll = schema.elements.filter(element => element.category === 'electoral_roll')
      const status = electoralRoll[0].elements.find(element => element.type === 'status')
      expect(status?.value).toBe('on_track')
    })
  })
})
