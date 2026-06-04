<script setup lang="ts">
import type { Account } from '../../types/account'

defineProps<{
  account: Account | null
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    class="w-full rounded-lg border border-gray-200 bg-white p-4 text-left"
    @click="emit('click')"
  >
    <template v-if="account">
      <div class="font-medium">
        {{ account.alias }}
      </div>
    </template>

    <template v-else>
      <span class="text-gray-400">
        Selecciona una cuenta
      </span>
    </template>
  </button>
</template>