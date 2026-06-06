<script setup lang="ts">
import logo from "~/../assets/images/logo_Kambista.png";
interface Props {
  currentStep: 1 | 2 | 3;
}

defineProps<Props>();

const steps = ["Completa", "Transfiere", "Envía constancia"];
</script>

<template>
  <div class="flex items-center justify-center px-8 py-6">
    <div>
      <img :src="logo" alt="Kambista" class="h-8" />
    </div>
    <div class="flex flex-1 items-center justify-center">
      <template v-for="(step, index) in steps" :key="step">
        <!-- Paso -->
        <div class="flex flex-col items-center">
          <div
            class="h-3 w-3 rounded-full"
            :class="index + 1 <= currentStep ? 'bg-black' : 'bg-gray-300'"
          />

          <span
            class="mt-2 text-xs"
            :class="
              index + 1 <= currentStep
                ? 'font-medium text-black'
                : 'text-gray-400'
            "
          >
            {{ step }}
          </span>
        </div>

        <!-- Línea -->
        <div
          v-if="index < steps.length - 1"
          class=" h-[1px] w-40"
          :class="index + 1 < currentStep ? 'bg-black' : 'bg-gray-300'"
        />
      </template>
    </div>
    <button
      class="text-sm font-medium text-gray-500 hover:text-black"
      @click="$router.back()"
    >
      ← Volver
    </button>
  </div>
</template>
