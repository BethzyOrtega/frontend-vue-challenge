<script setup lang="ts">
import eyeClose from "../../../assets/icons/eye_close.png";
import eyeOpen from "../../../assets/icons/eye_open.png";
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
  error?: string
  disabled?: boolean
  autocomplete?: string
  maxlength?: number
  inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
}>(), { type: 'text' })

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const showPassword = ref(false)
const blinking = ref(false)

const inputType = computed(() => {
  if (props.type !== 'password') return props.type
  return showPassword.value ? 'text' : 'password'
})

const togglePassword = () => {
  blinking.value = true
  setTimeout(() => {
    showPassword.value = !showPassword.value
    setTimeout(() => { blinking.value = false }, 150)
  }, 120)
}
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="label">{{ label }}</label>
    <div class="relative my-2 bg-white rounded-md px-4 py-3 border border-gray-200 ">
      <input
        v-bind="$attrs"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :inputmode="inputmode"
        class="input-field w-full bg-transparent outline-none"
        :class="{ 'input-error': error, 'pr-10': type === 'password' }"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <button
        v-if="type === 'password'"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
        @click="togglePassword"
      >
  
        <img
          v-if="!showPassword"
          :src="eyeClose"
          alt="Mostrar contraseña"
          class="w-5 h-5 object-contain eye-icon"
          :class="{ blinking }"
        />
   
          <img
          v-else
          :src="eyeOpen"
          alt="Ocultar contraseña"
          class="w-5 h-5 object-contain eye-icon"
          :class="{ blinking }"
        />
      </button>
    </div>
    <p v-if="error" class="error-msg">{{ error }}</p>
  </div>
</template>

<style scoped>
.eye-icon {
  transition: transform 0.15s ease;
}

.eye-icon.blinking {
  animation: eyeBlink 0.25s ease-in-out;
}

@keyframes eyeBlink {
  0%   { transform: scaleY(1); }
  40%  { transform: scaleY(0.08); }
  100% { transform: scaleY(1); }
}

.pupil, .slash {
  transition: opacity 0.15s ease;
}

.pupil.hidden, .slash.hidden {
  opacity: 0;
}

.error-msg{
  color: red;
}
</style>