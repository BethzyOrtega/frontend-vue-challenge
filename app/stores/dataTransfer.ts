import { defineStore } from "pinia";

export const useDataTranfer = defineStore("dataTransfer", {
  state: () => ({
    senderBank: "",
    accountNumber: 0,
    accountType: "",
  }),

  persist: true,

  actions: {
  setDataTransfer(
    data: {
      senderBank: string;
      accountNumber: number;
      accountType: string;
    }
  ) {
   this.senderBank = data.senderBank;
   this.accountNumber = data.accountNumber;
   this.accountType = data.accountType; 
  },
},
});
