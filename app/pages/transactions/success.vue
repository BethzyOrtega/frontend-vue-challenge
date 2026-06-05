<script setup lang="ts">
import AppButton from "~/components/ui/AppButton.vue";
import { useDataCalculatorStore } from "~/stores/dataCalculator";
import succesImg from "../../../assets/images/success_img.png";
import bannerImg from "../../../assets/images/banner_succes.png";

const dataCalculatorStore = useDataCalculatorStore();

const kambistaCode = "km20ttfff";
const estimatedTime = "20h 15min";

const goHome = () => {
  navigateTo("/transactions");
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-[#F5F5F7] px-4">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div
        class="mb-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <!-- Image -->
        <div class="mb-6 flex justify-center">
          <img
            :src="succesImg"
            alt="Constancia enviada"
            class="h-24 w-24 object-contain"
          />
        </div>

        <!-- Title -->
        <h1 class="mb-6 text-center text-3xl font-bold text-[#09142E]">
          ¡Constancia enviada!
        </h1>

        <!-- Info -->
        <div class="space-y-4">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500"> Código Kambista </span>

            <span class="font-semibold">
              {{ kambistaCode }}
            </span>
          </div>

          <p class="text-xs text-gray-500">
            *Usa tu código para dar seguimiento a tu operación.
          </p>

          <div class="flex justify-between">
            <span class="font-medium"> Monto a recibir </span>

            <span class="font-bold text-[#09142E]">
              S/ {{ Number(dataCalculatorStore.amountReceived).toFixed(2) }}
            </span>
          </div>

          <div class="flex justify-between">
            <span class="font-medium"> Tiempo estimado de espera </span>

            <span class="font-bold text-[#09142E]">
              {{ estimatedTime }}
            </span>
          </div>
        </div>
      </div>

      <!-- Banner -->
      <div
        class="flex items-center justify-between rounded-xl w-full py-4"
      >
        <img :src="bannerImg" alt="Banner" class="object-contain" />
      </div>

        <!-- Message -->
        <p class="mb-8 text-center text-sm text-gray-600">
          Verificaremos tu operación. Puedes ver su estado en
          <strong>"Mis operaciones"</strong>.
        </p>

        <!-- Button -->
        <AppButton
          label="VOLVER A INICIO"
          type="button"
          variant="primary"
          @click="goHome"
        />
      </div>
    </div>
  
</template>
