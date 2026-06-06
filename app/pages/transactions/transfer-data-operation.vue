<script setup>
import OperationStepper from "../../layouts/OperationStepper.vue";
import AppButton from "~/components/ui/AppButton.vue";
import ImgTransfer from "../../../assets/images/img_tranfer.png";
import HeaderOperations from "~/layouts/HeaderOperations.vue";
import { useDataTranfer } from "../../stores/dataTransfer";
import { useOnboardingStore } from "../../stores/onboarding";
import { useDataCalculatorStore } from "../../stores/dataCalculator";

const dataTransferStore = useDataTranfer();
const dataOnboardingStore = useOnboardingStore();
const dataCalculatorStore = useDataCalculatorStore();
const updateTime = computed(() => {
  const date = new Date();

  date.setMinutes(date.getMinutes() + 5);

  return date.toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
});
</script>

<template>
  <HeaderOperations>
    <OperationStepper :current-step="2" />
  </HeaderOperations>
  <div class="flex justify-center px-4 pt-2 pb-10 md:min-h-screen md:py-10">
    <div class="w-full max-w-md">
      <p class="mb-8 text-center text-sm text-gray-500">
        El tipo de cambio podría actualizarse a las:
        <strong>{{ updateTime }}</strong>
      </p>

      <div class="rounded-xl border-2 bg-white p-8 shadow-sm">
        <!-- Icon -->
        <div class="mb-6 flex justify-center">
          <img :src="ImgTransfer" alt="img_tranfer" />
        </div>

        <!-- Title -->
        <h1 class="mb-3 text-center text-3xl font-bold text-[#09142E]">
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
        <div class="rounded-lg border-2 border-gray-200">
          <div
            class="flex flex-col md:flex-row md:justify-between px-4 py-2 text-sm"
          >
            <span>Banco</span>
            <strong class="mt-1 ml-4 md:ml-0 md:mt-0">{{
              dataTransferStore.senderBank
            }}</strong>
          </div>

          <div
            class="flex flex-col md:flex-row md:justify-between px-4 py-2 text-sm"
          >
            <span>Monto</span>
            <strong class="mt-1 ml-4 md:ml-0 md:mt-0">{{
              dataCalculatorStore.amountSent
            }}</strong>
          </div>

          <div
            class="flex flex-col md:flex-row md:justify-between px-4 py-2 text-sm"
          >
            <span>Número de cuenta</span>

            <div class="flex items-center gap-2">
              <strong class="mt-1 ml-4 md:ml-0 md:mt-0">
                {{ dataTransferStore.accountNumber }}
              </strong>

              <button class="text-gray-500 hover:text-black">📋</button>
            </div>
          </div>

          <div
            class="flex flex-col md:flex-row md:justify-between px-4 py-2 text-sm"
          >
            <span>{{ dataOnboardingStore.typeDocument }}</span>
            <strong class="mt-1 ml-4 md:ml-0 md:mt-0">{{
              dataOnboardingStore.documentNumber
            }}</strong>
          </div>

          <div
            class="flex flex-col md:flex-row md:justify-between px-4 py-2 text-sm"
          >
            <span>Titular de la cuenta</span>
            <strong class="mt-1 ml-4 md:ml-0 md:mt-0">
              {{ dataOnboardingStore.fullName }}
            </strong>
          </div>

          <div
            class="flex flex-col md:flex-row md:justify-between px-4 py-2 text-sm"
          >
            <span>Tipo de cuenta</span>
            <strong class="mt-1 ml-4 md:ml-0 md:mt-0">
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
          @click="navigateTo('/transactions/send-proof')"
        />
      </div>
    </div>
  </div>
</template>
