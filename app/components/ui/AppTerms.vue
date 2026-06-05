<script setup lang="ts">
defineProps<{
  acceptTerms: boolean;
  acceptPrivacy: boolean;
  termsError?: string;
  privacyError?: string;
}>();

const emit = defineEmits<{
  "update:acceptTerms": [value: boolean];
  "update:acceptPrivacy": [value: boolean];
}>();
</script>

<template>
  <div class="space-y-3">
    <label class="flex items-start gap-2 text-xs">
      <input
        :checked="acceptTerms"
        type="checkbox"
        class="mt-1 h-4 w-4 rounded border border-gray-300"
        @change="
          emit(
            'update:acceptTerms',
            ($event.target as HTMLInputElement).checked,
          )
        "
      />

      <span :class="termsError ? 'text-red-500' : 'text-gray-700'">
        He leído y acepto los
        <strong>Términos y condiciones</strong>
      </span>
    </label>

    <label class="flex items-start gap-2 text-xs">
      <input
        :checked="acceptPrivacy"
        type="checkbox"
        class="mt-1 h-4 w-4 rounded border border-gray-300"
        @change="
          emit(
            'update:acceptPrivacy',
            ($event.target as HTMLInputElement).checked,
          )
        "
      />

      <span :class="privacyError ? 'text-red-500' : 'text-gray-700'">
        Acepto el manejo expreso e informado de la
        <strong>
          Política de Tratamiento de datos personales de Kambista
        </strong>
      </span>
    </label>
  </div>
</template>
