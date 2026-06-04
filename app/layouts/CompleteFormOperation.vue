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

const dataCalculatorStore = useDataCalculatorStore();

const accounts = ref<Account[]>([
  {
    id: "1",
    alias: "BCP",
    accountNumber: "444444444444444",
    bank: "BCP",
    currency: "PEN",
    accountType: "saving",
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
  documentType: "",
  bank: "",
  sourceFunds: "",
});
const errors = reactive({
  documentType: "",
});
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

      <AlertMessage type="info" visible>
        Tiempo estimado de espera
        <strong>BCP, Interbank, BanBif y Pichincha</strong> : 15 minutos (Aplica
        para cualquier monto). Otros bancos 1 día útil.
      </AlertMessage>

      <form class="space-y-4">
        <label class="label">¿Desde qué banco nos envías tu dinero?</label>
        <AppSelect
          v-model="form.bank"
          :options="BANK_OPTIONS"
          placeholder="Selecciona"
        />

        <label class="label">¿En qué cuenta deseas recibir tu dinero?</label>

        <AccountSelector
          :account="selectedAccount"
          @click="showAccountsModal = true"
        />

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

        <label class="label">Origen de fondos</label>
        <AppSelect
          v-model="form.sourceFunds"
          :options="SOURCE_FUNDS_OPTIONS"
          placeholder="Selecciona"
        />

        <AppButton label="CONTINUAR" type="submit" variant="primary" />
      </form>
    </div>
  </div>
</template>
