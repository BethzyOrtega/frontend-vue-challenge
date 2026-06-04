import { defineStore } from 'pinia'

export const useOnboardingStore = defineStore('onboarding', {
  state: () => ({
    fullName: '',
  }),

  actions: {
    setPersonalData(data: {
      fullName: string
    }) {
      this.fullName = data.fullName
    },
  },
})