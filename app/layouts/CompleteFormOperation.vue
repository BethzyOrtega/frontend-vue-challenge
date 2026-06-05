<script setup lang="ts">
import AppSelect from "~/components/ui/AppSelect.vue";
import BankAccounts from "../../mocks/bankAccounts.json";
import SourceFunds from "../../mocks/sourceFunds.json";
import AlertMessage from "~/components/ui/AlertMessage.vue";
import AppButton from "~/components/ui/AppButton.vue";
import AccountSelector from "~/components/account/AccountSelector.vue";
import AccountsModal from "~/components/account/AccountsModal.vue";
import CreateAccountDrawer from "~/components/account/AccountDrawer.vue";
import { useDataCalculatorStore } from "../stores/dataCalculator";
import type { Account } from "~/types/account";
import { useValidationDataOperation } from "../composables/useValidationDataOperation";
import { useDataTranfer } from "../stores/dataTransfer";

const dataTransferStore = useDataTranfer();
const dataCalculatorStore = useDataCalculatorStore();
const { errors, validate } = useValidationDataOperation();
const showAlertInfo = ref(true);
const showAlertWar = ref(true);
const accounts = ref<Account[]>([
  {
    id: "1",
    alias: "BCP",
    accountNumber: 444444444444444,
    bank: "BCP",
    currency: "PEN",
    accountType: "Ahorro",
  },
]);

const selectedAccount = ref<Account | null>(null);

const showAccountsModal = ref(false);
const showCreateAccountDrawer = ref(false);

const selectAccount = (account: Account) => {
  selectedAccount.value = account;
  showAccountsModal.value = false;
};

const addAccount = (account: Account) => {
  accounts.value.push(account);

  selectedAccount.value = account;

  showCreateAccountDrawer.value = false;
  showAccountsModal.value = false;
};

const BANK_OPTIONS = BankAccounts.map((bank) => ({
  value: bank.id,
  label: bank.alias,
}));
const SOURCE_FUNDS_OPTIONS = SourceFunds.map((source) => ({
  value: source._id,
  label: source.name,
}));
const form = reactive({
  bank: "",
  account: "",
  sourceFunds: "",
});

watch(
  () => form.bank,
  (value) => {
    if (value) {
      errors.bank = "";
    }
  },
);

watch(
  () => form.sourceFunds,
  (value) => {
    if (value) {
      errors.sourceFunds = "";
    }
  },
);

watch(selectedAccount, (value) => {
  if (value) {
    errors.account = "";
  }
});

const handleSubmit = () => {
  const isValid = validate(form.bank, form.sourceFunds, selectedAccount.value);

  if (!isValid) return;

  const senderBank = BANK_OPTIONS.find(
    (bank) => String(bank.value) === String(form.bank),
  );

  const sourceFund = SOURCE_FUNDS_OPTIONS.find(
    (source) => String(source.value) === String(form.sourceFunds),
  );

  dataTransferStore.setDataTransfer({
    senderBank: selectedAccount.value?.bank ?? "",
    accountType: sourceFund?.label ?? "",
    accountNumber: selectedAccount.value?.accountNumber ?? 0,
  });

  console.log("Banco origen:", senderBank?.label);

  console.log("Origen de fondos:", sourceFund?.label);

  console.log("Cuenta destino:", {
    banco: selectedAccount.value?.bank,
    alias: selectedAccount.value?.alias,
    numeroCuenta: selectedAccount.value?.accountNumber,
    moneda: selectedAccount.value?.currency,
    tipoCuenta: selectedAccount.value?.accountType,
  });

  navigateTo("/transactions/transfer-data-operation");
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md rounded-xl">
      <h1 class="mb-8 text-center text-2xl font-bold text-[#1D2433]">
        Completa los datos de tu operación
      </h1>

      <div class="mb-6 rounded-md bg-white p-4 shadow-sm">
        <div class="flex justify-between">
          <label>Tu envías</label>
          <label>{{ dataCalculatorStore.amountSent }}</label>
        </div>
        <div class="flex justify-between">
          <label>Recibes</label>
          <label>S/ {{ dataCalculatorStore.amountReceived }}</label>
        </div>
        <div class="flex justify-between">
          <label>Cupon aplicado</label>
          <label>{{ dataCalculatorStore.coupon || "-" }}</label>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <label>Tipo de cambio</label>
          <label>{{ dataCalculatorStore.rate }}</label>
        </div>
      </div>

      <AlertMessage
        @dismiss="showAlertInfo = false"
        type="info"
        :visible="showAlertInfo"
        closable
      >
        Tiempo estimado de espera
        <strong>BCP, Interbank, BanBif y Pichincha</strong> : 15 minutos (Aplica
        para cualquier monto). Otros bancos 1 día útil.
      </AlertMessage>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <p class="pt-4">¿Desde qué banco nos envías tu dinero?</p>
        <AppSelect
          v-model="form.bank"
          :options="BANK_OPTIONS"
          placeholder="Selecciona"
        />
        <p v-if="errors.bank" class="mt-1 text-xs text-red-500">
          {{ errors.bank }}
        </p>

        <label class="label">¿En qué cuenta deseas recibir tu dinero?</label>

        <AccountSelector
          :account="selectedAccount"
          @click="showAccountsModal = true"
        />
        <p v-if="errors.account" class="mt-1 text-xs text-red-500">
          {{ errors.account }}
        </p>

        <AlertMessage
          @dismiss="showAlertWar = false"
          type="warning"
          :visible="showAlertWar"
          closable
        >
          Recuerda que las cuentas deben
          <strong>estar a tu nombre.</strong> Kambista
          <strong>no transfiere a cuentas de terceros.</strong>
        </AlertMessage>

        <p class="pt-[2px]">Origen de fondos</p>
        <AppSelect
          v-model="form.sourceFunds"
          :options="SOURCE_FUNDS_OPTIONS"
          placeholder="Selecciona"
        />
        <p v-if="errors.sourceFunds" class="mt-1 text-xs text-red-500">
          {{ errors.sourceFunds }}
        </p>

        <AppButton label="CONTINUAR" type="submit" variant="primary" />
      </form>
    </div>
  </div>
  <AccountsModal
    :open="showAccountsModal"
    :accounts="accounts"
    @close="showAccountsModal = false"
    @select="selectAccount"
    @add="
      showAccountsModal = false;
      showCreateAccountDrawer = true;
    "
  />

  <CreateAccountDrawer
    :open="showCreateAccountDrawer"
    @close="showCreateAccountDrawer = false"
    @save="addAccount"
  />
</template>
