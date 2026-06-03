<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

const props = withDefaults(defineProps<{
  modelValue: string | number | null
  options: Option[]
  placeholder?: string
  label?: string
  error?: string
  disabled?: boolean
  maxVisible?: number
}>(), { maxVisible: 5 })

const emit = defineEmits<{ 'update:modelValue': [value: string | number] }>()

const isOpen = ref(false)
const container = ref<HTMLElement | null>(null)

const selectedLabel = computed(() => {
  const found = props.options.find(o => o.value === props.modelValue)
  return found?.label ?? ''
})

function select(value: string | number) {
  emit('update:modelValue', value)
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (container.value && !container.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="w-full" ref="container">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="relative relative my-2 bg-white rounded-md px-4 py-3 border border-gray-200">
      <button
        type="button"
        class="input-field flex items-center justify-between text-left"
        :class="{
          'input-error': error,
        }"
        :style="{ color: '#A7A7A7' }"
        :disabled="disabled"
        @click="isOpen = !isOpen"
      >
        <span :style="modelValue ? { color: '#A7A7A7', fontWeight: '300' } : {}">
          {{ selectedLabel || placeholder || 'Selecciona' }}
        </span>
        <svg
          class="w-4 h-4 transition-transform"
          :class="{ 'rotate-180': isOpen }"
          style="color: #A7A7A7"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <Transition name="dropdown">
        <ul
          v-if="isOpen"
          class="absolute z-50 w-full mt-1 bg-white border border-brand-gray-border rounded-lg shadow-lg overflow-y-auto hopver:scrollbar-thin scrollbar-thumb-gray-300"
          :style="{ maxHeight: `calc(${maxVisible} * 2.625rem)` }"
        >
          <li
            v-for="option in options"
            :key="option.value"
            class="px-4 py-2.5 text-sm cursor-pointer hover:bg-brand-gray transition-colors"
            :class="{ 'bg-brand-teal-light font-medium': option.value === modelValue }"
            :style="{ color: option.value === modelValue ? '#A7A7A7' : '#A7A7A7' }"
            @click="select(option.value)"
          >
            {{ option.label }}
          </li>
        </ul>
      </Transition>
    </div>
    <p v-if="error" class="error-msg">{{ error }}</p>
  </div>
</template>

<style scoped>
.error-msg{
  color: red;
}
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.15s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-4px); }
</style>