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
        <img
          :src="logo"
          alt="Kambista"
          class="h-8"
        />
      </div>
    <div class="flex flex-1 items-center justify-center">
      <template v-for="(step, index) in steps" :key="step">
        <!-- Paso -->
        <div class="flex flex-col items-center">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full border-2"
            :class="
              index + 1 <= currentStep
                ? 'border-[#20D6C7] bg-[#20D6C7] text-white'
                : 'border-gray-300 bg-white text-gray-400'
            "
          >
            {{ index + 1 }}
          </div>

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
          class="mx-4 h-[2px] w-24"
          :class="index + 1 < currentStep ? 'bg-[#20D6C7]' : 'bg-gray-300'"
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
