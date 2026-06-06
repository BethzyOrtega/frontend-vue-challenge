<script setup lang="ts">
import logo from "~/../assets/images/logo_Kambista.png";

interface Props {
  showBackButton?: boolean;
}

withDefaults(defineProps<Props>(), {
  showBackButton: true,
});
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center px-8 py-6 bg-white">
    <!-- Top row en mobile / left en desktop -->
    <div class="flex items-center justify-between w-full md:w-auto">
      <img :src="logo" alt="Kambista" class="h-8" />

      <button
        v-if="showBackButton"
        class="text-sm font-medium text-gray-500 hover:text-black md:hidden"
        @click="$router.back()"
      >
        ← Volver
      </button>
    </div>

    <!-- Slot centrado -->
    <div class="w-full flex justify-center mt-4 md:mt-0">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </div>

    <!-- Back button en desktop -->
    <button
      v-if="showBackButton"
      class="hidden md:block text-sm font-medium text-gray-500 hover:text-black"
      @click="$router.back()"
    >
      ← Volver
    </button>
  </div>
</template>
