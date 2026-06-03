<script setup lang="ts">
defineProps<{
  acceptTerms: boolean
  acceptPrivacy: boolean
   termsError?: string
  privacyError?: string
}>()

const emit = defineEmits<{
  'update:acceptTerms': [value: boolean]
  'update:acceptPrivacy': [value: boolean]
}>()
</script>

<template>
  <div class="space-y-3">
    <label class="flex items-start gap-2 text-xs">
      <input
        :checked="acceptTerms"
        type="checkbox"
        class="mt-1 h-4 w-4 rounded border"
  :class="termsError ? 'border-red-500' : 'border-gray-300'"
        @change="emit('update:acceptTerms', ($event.target as HTMLInputElement).checked)"
      />

      <span>
        He leído y acepto los
        <strong>Términos y condiciones</strong>
      </span>
    </label>
     <p
    v-if="termsError"
    class="ml-6 mt-1 text-xs text-red-500"
  >
    {{ termsError }}
  </p>

    <label class="flex items-start gap-2 text-xs">
      <input
        :checked="acceptPrivacy"
        type="checkbox"
        class="mt-1 h-4 w-4 rounded border"
        :class="privacyError ? 'border-red-500' : 'border-gray-300'"
        @change="emit('update:acceptPrivacy', ($event.target as HTMLInputElement).checked)"
      />

      <span>
        Acepto el manejo expreso e informado de la
        <strong>Política de Tratamiento de datos personales de Kambista</strong>
      </span>
    </label>
     <p
    v-if="privacyError"
    class="ml-6 mt-1 text-xs text-red-500"
  >
    {{ privacyError }}
  </p>
  </div>
</template>