<script setup lang="ts">
import type { Account } from '~/types/account'

defineProps<{
  open: boolean
  accounts: Account[]
}>()

const emit = defineEmits<{
  close: []
  select: [account: Account]
  add: []
}>()
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
  >
    <div class="w-full max-w-sm rounded-lg bg-white">
      <div
        class="flex items-center justify-between bg-[#09142E] p-4 text-white"
      >
        <div>
          <h3 class="font-semibold">
            Cuentas Soles
          </h3>

          <p class="text-xs">
            Selecciona tu cuenta de destino
          </p>
        </div>

        <button @click="emit('close')">
          ✕
        </button>
      </div>

      <div>
        <button
          v-for="account in accounts"
          :key="account.id"
          class="w-full border-b p-4 text-left hover:bg-gray-50"
          @click="emit('select', account)"
        >
          <div class="font-medium">
            {{ account.alias }}
          </div>

          <div class="text-sm text-gray-500">
            {{ account.accountNumber }}
          </div>
        </button>

        <button
          class="flex w-full items-center gap-3 p-4 hover:bg-gray-50"
          @click="emit('add')"
        >
          <span
            class="flex h-6 w-6 items-center justify-center rounded border"
          >
            +
          </span>

          Agregar cuenta
        </button>
      </div>
    </div>
  </div>
</template>