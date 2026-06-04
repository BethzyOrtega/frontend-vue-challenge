<script setup lang="ts">
defineProps<{
  label: string
  amount: string | number
  currency: string
  readonly?: boolean
}>()

const emit = defineEmits<{
  'update:amount': [value: number]
}>()
</script>

<template>
  <div class="relative mb-4 flex">
    <div class="flex-1 rounded-l-lg bg-[#E7E7E7] p-4">
      <label class="mb-2 block text-sm font-medium">
        {{ label }}
      </label>

      <input
        :value="amount"
        :readonly="readonly"
        type="number"
        class="w-full bg-transparent text-3xl font-bold outline-none"
        @input="
          emit(
            'update:amount',
            Number(($event.target as HTMLInputElement).value)
          )
        "
      />
    </div>

    <div
      class="flex w-40 items-center justify-center rounded-r-lg bg-[#09142E] text-xl font-semibold text-white"
    >
      {{ currency }}
    </div>
  </div>
</template>