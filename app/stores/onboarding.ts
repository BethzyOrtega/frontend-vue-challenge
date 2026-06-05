import { defineStore } from 'pinia'

export const useOnboardingStore = defineStore('onboarding', {
  state: () => ({
    fullName: "",
    typeDocument:"",
    documentNumber:""
  }),

  actions: {
    setPersonalData(data: {
      fullName: string
      typeDocument: string
      documentNumber: string
    }) {
      this.fullName = data.fullName
      this.typeDocument = data.typeDocument
      this.documentNumber = data.documentNumber
    },
  },
})