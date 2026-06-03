<script setup lang="ts">
interface Props {
  label?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
  loading: false,
  variant: 'primary'
})

const buttonClasses = computed(() => {
  const base =
    'w-full rounded-md py-3 px-4 text-sm font-semibold transition-all duration-200'

  const variants = {
    primary:
      'bg-[#5BE2C4] text-[#686868] hover:opacity-90 disabled:opacity-50',
    secondary:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50'
  }

  return `${base} ${variants[props.variant]}`
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
  >
    <span v-if="!loading">
      {{ label }}
    </span>

    <span v-else>
      Cargando...
    </span>
  </button>
</template>