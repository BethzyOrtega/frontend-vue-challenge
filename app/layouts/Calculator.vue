<script setup lang="ts">
import AppButton from "~/components/ui/AppButton.vue";
import { useExchange } from "../composables/useExchange";
import ExchangeTabs from "~/components/exchange/ExchangeTabs.vue";
import ExchangeAmountCard from "~/components/exchange/ExchangeAmountCard.vue";
import { useDataCalculatorStore } from "../stores/dataCalculator";

const dataCalculatorStore = useDataCalculatorStore();

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

const handleSubmit = () => {
  dataCalculatorStore.setDataCalculator({
    amountSent: amountSent.value,
    amountReceived: amountReceived.value,
    rate: exchangeRate.value,
    coupon: coupon.value,
  });

  navigateTo("/transactions/complete-data-operation");
};
</script>

<template>
  <div class="flex justify-center py-16 flex flex-col grid gap-6">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow">
      <ExchangeTabs
        v-model:operation-type="operationType"
        :bid="bid"
        :ask="ask"
      />

      <ExchangeAmountCard
        label="¿Cuánto envías?"
        :amount="amountSent"
        :currency="operationType === 'buy' ? 'Soles' : 'Dólares'"
        @update:amount="amountSent = $event"
      />

      <button
        class="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gray-200 shadow"
        @click="operationType = operationType === 'buy' ? 'sell' : 'buy'"
      >
        ↻
      </button>

      <ExchangeAmountCard
        label="Entonces recibes"
        :amount="amountReceived"
        :currency="operationType === 'buy' ? 'Dólares' : 'Soles'"
        readonly
      />

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

      <div class="mb-6 flex border border-gray-300 rounded-xl">
        <input
          v-model="coupon"
          placeholder="Ingresa tu cupón"
          class="flex-1 rounded-xl border p-3"
        />

        <button class="rounded-r bg-[#09142E] px-5 text-white">Aplicar</button>
      </div>
    </div>
    <AppButton
      label="INICIAR OPERACIÓN"
      type="button"
      variant="primary"
      @click="handleSubmit"
    />
  </div>
</template>
