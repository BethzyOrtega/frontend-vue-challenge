<script setup lang="ts">
import AppButton from "~/components/ui/AppButton.vue";
import { useExchange } from "../composables/useExchange";
import ExchangeTabs from "~/components/exchange/ExchangeTabs.vue";
import ExchangeAmountCard from "~/components/exchange/ExchangeAmountCard.vue";
import { useDataCalculatorStore } from "../stores/dataCalculator";
import coupon_cal from "../../assets/images/coupon_calculator.png";
import coin from "../../assets/icons/coin.png";
import swithIcon from "../../assets/icons/swith.png"
import startMssg from "../../assets/icons/start_mssg.png";

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

watch(amountSent, async () => {
  await calculateExchange();
});

watch(operationType, async () => {
  await getCurrentExchangeRate();
  await calculateExchange();
});

const handleSubmit = () => {

  dataCalculatorStore.setDataCalculator({
    amountSent: amountSent.value,
    amountReceived: amountReceived.value,
    rate: exchangeRate.value,
    coupon: coupon.value,
    currency: savingsCurrency.value
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

      <div class="relative">

      <ExchangeAmountCard
        label="¿Cuánto envías?"
        :amount="amountSent"
        :currency="operationType === 'buy' ? 'Soles' : 'Dólares'"
        @update:amount="amountSent = $event"
      />

      <button
        class="absolute left-1/2 top-[35%] z-10 flex h-20 w-20 -translate-x-1/2 items-center"
        @click="operationType = operationType === 'buy' ? 'sell' : 'buy'"
      >
        <img :src="swithIcon" alt="">
      </button>

      <ExchangeAmountCard
        label="Entonces recibes"
        :amount="amountReceived"
        :currency="operationType === 'buy' ? 'Dólares' : 'Soles'"
        readonly
      />

      </div>

      <!-- Savings -->
      <div class="mb-6 flex justify-between">
        <div>
          <p class="text-sm text-gray-500">Ahorro estimado</p>

          <p class="font-bold">{{ savingsCurrency }} {{ savingsAmount }}</p>
        </div>

        <div class="text-right">
          <p class="text-sm text-gray-500">Koinks</p>
          <div class="flex gap-2">
            <svg
              class="w-5 h-5 flex-shrink-0 self-center"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" stroke-linecap="round" />
              <line
                x1="12"
                y1="8"
                x2="12"
                y2="8"
                stroke-linecap="round"
                stroke-width="2.5"
              />
              <line x1="12" y1="12" x2="12" y2="16" stroke-linecap="round" />
            </svg>
            <p class="font-bold">10,000</p>
            <img :src="coin" alt="" />
          </div>
        </div>
      </div>

      <div
        class="mb-6 flex rounded-2xl border border-gray-300 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
      >
        <img :src="coupon_cal" class="px-2" />
        <input
          v-model="coupon"
          placeholder="Ingresa tu cupón"
          class="flex-1 rounded-l-2xl px-4 py-3 outline-none"
        />

        <button class="rounded-r bg-[#09142E] px-5 text-white">Aplicar</button>
      </div>
      <div class="flex items-center gap-4 p-4">
        <img :src="startMssg" alt="star_mssg" class="h-12 w-12 flex-shrink-0" />

        <div class="flex flex-col justify-center">
          <p class="text-sm text-gray-600">¿Monto mayor a $5,000 o S/18,000?</p>

          <p class="font-semibold text-[#09142E]">
            ¡Obtén un Tipo de Cambio Preferencial!
          </p>
        </div>
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
