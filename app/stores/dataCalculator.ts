import { defineStore } from 'pinia'

export const useDataCalculatorStore = defineStore('dataCalculator', {
  state: () => ({
    amountSent: 0,
    amountReceived: 0,
    coupon: '', 
  }),

  actions:{
    setDataCalculator(data: {
      amountSent: number,
      amountReceived: number,
      coupon: string
    }) {
      this.amountSent = data.amountSent
      this.amountReceived = data.amountReceived
      this.coupon = data.coupon
    }
  }
})







