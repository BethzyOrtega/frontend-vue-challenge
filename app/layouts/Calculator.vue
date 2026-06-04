<script setup lang="ts">
import AppButton from "~/components/ui/AppButton.vue";
import { useExchange } from "../composables/useExchange";

const {
  getCurrentExchangeRate,
  calculateExchange,
  operationType,
  amountSent,
  amountReceived,
  exchangeRate,
  coupon,
  bid,
  ask,
  savingsAmount,
  savingsCurrency,
} = useExchange();

onMounted(async () => {
  amountSent.value = 1000;

  await getCurrentExchangeRate();
  await calculateExchange();
});

watch(amountSent, async (value) => {
  if (!value) return;

  await calculateExchange();
});
watch(operationType, async () => {
  if (!amountSent.value) return;

  await calculateExchange();
});
</script>

<template>
  <div class="flex justify-center py-16 flex flex-col grid gap-6">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow">
      <!-- Tabs -->
      <div class="mb-6 flex">
        <button
          class="flex-1 py-3 font-semibold"
          :class="
            operationType === 'buy'
              ? 'bg-[#09142E] text-white'
              : 'bg-[#F3F3F3] text-gray-400'
          "
          @click="operationType = 'buy'"
        >
          Compra {{ bid }}
        </button>

        <button
          class="flex-1 py-3 font-semibold"
          :class="
            operationType === 'sell'
              ? 'bg-[#09142E] text-white'
              : 'bg-[#F3F3F3] text-gray-400'
          "
          @click="operationType = 'sell'"
        >
          Venta {{ ask }}
        </button>
      </div>

      <!-- Amount -->
      <div class="relative mb-4 flex">
        <div class="flex-1 rounded-l-lg bg-[#E7E7E7] p-4">
          <label class="mb-2 block text-sm font-medium">
            ¿Cuánto envías?
          </label>

          <input
            v-model="amountSent"
            type="number"
            class="w-full bg-transparent text-3xl font-bold outline-none"
          />
        </div>

        <div
          class="flex w-40 items-center justify-center rounded-r-lg bg-[#09142E] text-xl font-semibold text-white"
        >
          {{ operationType === "buy" ? "Soles" : "Dolares" }}
        </div>
      </div>

      <button
        class="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gray-200 shadow"
        @click="operationType = operationType === 'buy' ? 'sell' : 'buy'"
      >
        ↻
      </button>

      <!-- Result -->
      <div class="mb-4 flex">
        <div class="flex-1 rounded-l-lg bg-[#E7E7E7] p-4">
          <label class="mb-2 block text-sm font-medium">
            Entonces recibes
          </label>

          <input
            :value="amountReceived"
            readonly
            class="w-full bg-transparent text-3xl font-bold outline-none"
          />
        </div>

        <div
          class="flex w-40 items-center justify-center rounded-r-lg bg-[#09142E] text-xl font-semibold text-white"
        >
          {{ operationType === "buy" ? "Dolares" : "Soles" }}
        </div>
      </div>

      <!-- Savings -->
      <div class="mb-6 flex justify-between">
        <div>
          <p class="text-sm text-gray-500">Ahorro estimado</p>

          <p class="font-bold">{{ savingsCurrency }} {{ savingsAmount }}</p>
        </div>

        <div class="text-right">
          <p class="text-sm text-gray-500">Koinks</p>

          <p class="font-bold">10,000 🪙</p>
        </div>
      </div>

      <!-- Coupon -->
      <div class="mb-6 flex">
        <input
          placeholder="Ingresa tu cupón"
          class="flex-1 rounded-l border p-3"
        />

        <button class="rounded-r bg-[#09142E] px-5 text-white">Aplicar</button>
      </div>
    </div>
    <AppButton
      label="INICIAR OPERACIÓN"
      type="button"
      variant="primary"
      @click="() => navigateTo('/transactions/details')"
    />
  </div>
</template>
