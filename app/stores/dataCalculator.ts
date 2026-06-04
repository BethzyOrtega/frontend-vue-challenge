import { defineStore } from 'pinia'

export const useDataCalculatorStore = defineStore('dataCalculator', {
  state: () => ({
    amountSent: 0,
    amountReceived: 0,
    coupon: '', 
    rate: 0,
  }),

  actions:{
    setDataCalculator(data: {
      amountSent: number,
      amountReceived: number,
      coupon: string,
      rate: number,
    }) {
      this.amountSent = data.amountSent
      this.amountReceived = data.amountReceived
      this.coupon = data.coupon
      this.rate = data.rate
    }
  }
})







