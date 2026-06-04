<script setup lang="ts">
defineProps<{
  operationType: 'buy' | 'sell'
  bid: number
  ask: number
}>()

const emit = defineEmits<{
  'update:operationType': [value: 'buy' | 'sell']
}>()
</script>

<template>
  <div class="mb-6 flex overflow-hidden rounded-lg">
    <button
      class="flex-1 py-3 font-semibold transition-colors"
      :class="
        operationType === 'buy'
          ? 'bg-[#09142E] text-white'
          : 'bg-[#F3F3F3] text-gray-400'
      "
      @click="emit('update:operationType', 'buy')"
    >
      Compra {{ bid }}
    </button>

    <button
      class="flex-1 py-3 font-semibold transition-colors"
      :class="
        operationType === 'sell'
          ? 'bg-[#09142E] text-white'
          : 'bg-[#F3F3F3] text-gray-400'
      "
      @click="emit('update:operationType', 'sell')"
    >
      Venta {{ ask }}
    </button>
  </div>
</template>