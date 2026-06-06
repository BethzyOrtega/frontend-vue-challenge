<script setup lang="ts">
interface Props {
  currentStep: 1 | 2 | 3;
}

defineProps<Props>();

const steps = ["Completa", "Transfiere", "Envía constancia"];
</script>

<template>
  <div class="flex items-start justify-between md:items-center md:justify-start md:gap-0 px-2 w-full">
    <template v-for="(step, index) in steps" :key="step">
      <div class="flex flex-col items-center flex-1 md:flex-none min-w-[60px]">
        <div
          class="h-3 w-3 rounded-full"
          :class="index + 1 <= currentStep ? 'bg-black' : 'bg-gray-300'"
        />

        <span
          class="mt-2 text-[10px] md:text-xs text-center"
          :class="
            index + 1 <= currentStep
              ? 'font-medium text-black'
              : 'text-gray-400'
          "
        >
          {{ step }}
        </span>
      </div>

      <div
        v-if="index < steps.length - 1"
        class="h-[1px] flex-1 mx-1 self-center"
        :class="index + 1 < currentStep ? 'bg-black' : 'bg-gray-300'"
      />
    </template>
  </div>
</template>