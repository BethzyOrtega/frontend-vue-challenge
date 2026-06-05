import { reactive } from "vue";
import type { Account } from "~/types/account";
export const useValidationDataOperation = () => {
  const errors = reactive({
    bank: "",
    account: "",
    sourceFunds: "",
  });

  const validate = (
    bank: string,
    sourceFunds: string,
    selectedAccount: Account | null,
  ) => {
    errors.bank = "";
    errors.account = "";
    errors.sourceFunds = "";

    let isValid = true;

    if (!bank) {
      errors.bank = "Selecciona un Banco";
      isValid = false;
    }
    if (!selectedAccount) {
      errors.account = "Selecciona una cuenta";
      isValid = false;
    }

    if (!sourceFunds) {
      errors.sourceFunds = "Selecciona un origen de fondos";
      isValid = false;
    }
    return isValid;
  };

  return {
    errors,
    validate,
  };
};
