<script setup lang="ts">
import AppButton from '~/components/ui/AppButton.vue';

</script>

<template>

  <div class="flex justify-center py-16 flex flex-col grid gap-6 ">
    <div class="w-full max-w-md rounded-lg bg-white p-6 shadow">
      <!-- Tabs -->
      <div class="mb-6 flex">
        <button class="flex-1 rounded-l bg-[#09142E] py-3 text-white">
          Compra 3.321
        </button>

        <button class="flex-1 rounded-r bg-gray-100 py-3 text-gray-400">
          Venta 3.321
        </button>
      </div>

      <!-- Amount -->
      <div class="mb-4 flex gap-2 bg-[#E0E0E0]">
        <div class="flex-1">
          <label class="mb-2 block text-xs text-gray-500">
            ¿Cuánto envías?
          </label>

            <input type="text" value="1000" class="w-full rounded border p-3 bg-[#E0E0E0]" />
            </div>

        <select class="w-32 rounded bg-[#09142E] px-4 text-white">
          <option>Dólares</option>
        </select>
      </div>

      <!-- Result -->
      <div class="mb-4 flex gap-2 bg-[#E0E0E0]">
        <div class="flex-1">
          <label class="mb-2 block text-xs text-gray-500">
            Entonces recibes
          </label>

          <input type="text" value="3700" class="w-full rounded border p-3 bg-[#E0E0E0]" />
        </div>

        <select class="w-32 rounded bg-[#09142E] px-4 text-white">
          <option>Soles</option>
        </select>
      </div>

      <!-- Savings -->
      <div class="mb-4 flex justify-between text-sm">
        <span>Ahorro estimado</span>

        <span class="font-semibold"> S/ 55.00 </span>
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
