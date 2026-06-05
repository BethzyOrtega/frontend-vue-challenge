import { reactive } from "vue";
import type { st } from "vue-router/dist/index-BQLwgiyK.js";

export const useValidateDataDrawer = () => {
  const errors = reactive({
    accountType: "",
    bank: "",
    accountNumber: "",
    alias: "",
    currency: "PEN",
    owner: "",
  });

  const validate = (
    accountType: string,
    bank: string,
    accountNumber: string,
    alias: string,
    owner: string,
  ) => {
    errors.accountType = "";
    errors.bank = "";
    errors.alias = "";
    errors.accountNumber = "";
    errors.owner = "";

    let isValid = true;

    if (!accountType) {
      errors.accountType = "Sellecciona tipo de cuenta";
      isValid = false;
    }

    if (!bank) {
      errors.bank = "Selecciona un banco";
      isValid = false;
    }

    if (!accountNumber) {
      errors.accountNumber = "Ingresa un número de cuenta";
      isValid = false;
    } else if (!/^\d+$/.test(accountNumber)) {
      errors.accountNumber = "Solo se permiten números";
      isValid = false;
    }

    if (!alias.trim()) {
      errors.alias = "Ingresa un alias";
      isValid = false;
    }

    if (!owner) {
      errors.owner = "Este campo es obligatorio";
      isValid = false;
    }
    return isValid;
  };
  return {
    errors,
    validate,
  };
};
