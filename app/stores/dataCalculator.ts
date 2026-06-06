import { defineStore } from 'pinia'

export const useDataCalculatorStore = defineStore('dataCalculator', {
  state: () => ({
    amountSent: 0,
    amountReceived: 0,
    coupon: '', 
    rate: 0,
    currency: ""
  }),

  persist: true,

  actions:{
    setDataCalculator(data: {
      amountSent: number,
      amountReceived: number,
      coupon: string,
      rate: number,
      currency: string
    }) {
      this.amountSent = data.amountSent
      this.amountReceived = data.amountReceived
      this.coupon = data.coupon
      this.rate = data.rate
      this.currency = data.currency
    }
  }
})







