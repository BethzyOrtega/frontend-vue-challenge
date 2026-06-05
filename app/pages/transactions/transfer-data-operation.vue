<script setup>

import OperationStepper from "../../layouts/OperationStepper.vue";
import AppButton from "~/components/ui/AppButton.vue";

import { useDataTranfer } from "../../stores/dataTransfer";
import { useOnboardingStore } from "../../stores/onboarding";
import { useDataCalculatorStore } from "../../stores/dataCalculator";

const dataTransferStore = useDataTranfer();
const dataOnboardingStore = useOnboardingStore();
const dataCalculatorStore = useDataCalculatorStore();

const transferData = {
  bank: "Interbank",
  amount: "S/ 1,000.00",
  accountNumber: "201010000000000",
  ruc: "20601708141",
  accountHolder: "Kambista SAC",
  accountType: "Corriente",
};

const copyAccount = async () => {
  await navigator.clipboard.writeText(
    transferData.accountNumber
  );
};
</script>

<template>
    <OperationStepper />
  <div class="flex min-h-screen justify-center px-4 py-10">
    <div class="w-full max-w-md">
      <p class="mb-8 text-center text-sm text-gray-500">
        El tipo de cambio podría actualizarse a las:
        <strong>13:15</strong>
      </p>

      <div class="rounded-xl border bg-white p-8 shadow-sm">
        <!-- Icon -->
        <div class="mb-6 flex justify-center">
          <div
            class="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8F8F4]"
          >
            💸
          </div>
        </div>

        <!-- Title -->
        <h1
          class="mb-3 text-center text-3xl font-bold text-[#09142E]"
        >
          Transfiere a Kambista
        </h1>

        <!-- Subtitle -->
        <p class="mb-8 text-center text-gray-500">
          Transfiere desde tu app bancaria y guarda el
          <span class="font-semibold underline">
            número o código de operación
          </span>
          para el siguiente paso.
        </p>

        <!-- Table -->
        <div class="rounded-lg border border-gray-200">
          <div
            class="flex justify-between border-b px-4 py-3 text-sm"
          >
            <span>Banco</span>
            <strong>{{ dataTransferStore.senderBank }}</strong>
          </div>

          <div
            class="flex justify-between border-b px-4 py-3 text-sm"
          >
            <span>Monto</span>
            <strong>{{ dataCalculatorStore.amountSent }}</strong>
          </div>

          <div
            class="flex justify-between border-b px-4 py-3 text-sm"
          >
            <span>Número de cuenta</span>

            <div class="flex items-center gap-2">
              <strong>
                {{ dataTransferStore.accountNumber }}
              </strong>

              <button
                class="text-gray-500 hover:text-black"
                @click="copyAccount"
              >
                📋
              </button>
            </div>
          </div>

          <div
            class="flex justify-between border-b px-4 py-3 text-sm"
          >
            <span>{{ dataOnboardingStore.typeDocument }}</span>
            <strong>{{ dataOnboardingStore.documentNumber }}</strong>
          </div>

          <div
            class="flex justify-between border-b px-4 py-3 text-sm"
          >
            <span>Titular de la cuenta</span>
            <strong>
              {{ dataOnboardingStore.fullName }}
            </strong>
          </div>

          <div
            class="flex justify-between px-4 py-3 text-sm"
          >
            <span>Tipo de cuenta</span>
            <strong>
              {{ dataTransferStore.accountType }}
            </strong>
          </div>
        </div>
      </div>

      <div class="mt-8">
        <AppButton
          label="YA HICE MI TRANSFERENCIA"
          variant="primary"
          type="button"
          @click="
            navigateTo('/transactions/send-receipt')
          "
        />
      </div>
    </div>
  </div>
</template>