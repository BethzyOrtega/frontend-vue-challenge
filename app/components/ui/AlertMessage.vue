<script setup lang="ts">

const props = withDefaults(defineProps<{
  type?: 'info' | 'warning' | 'error'
  visible?: boolean
}>(), {
  type: 'info',
  visible: false,
})

const classes = computed(() => ({
  info: 'flex items-start gap-2 p-3 bg-[#DFF2FF] rounded-lg text-[#336699]',
  warning: 'flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700',
  error: 'flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700',
})[props.type])

const iconColor = computed(() => {
  switch (props.type) {
    case 'warning':
      return '#FFA500'
    case 'error':
      return '#FF0000'
    default:
      return '#336699'
  }
})

const emit = defineEmits<{ dismiss: [] }>()
</script>

<template>
  <div :class="[classes, 'alert-enter', 'text-sm']" v-show="visible">
    <svg class="w-5 h-5 flex-shrink-0 self-center" :class="{ 'rotate-180': type === 'warning' }" :style="{ color: iconColor }" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" stroke-linecap="round"/>
      <line x1="12" y1="8" x2="12" y2="8" stroke-linecap="round" stroke-width="2.5"/>
      <line x1="12" y1="12" x2="12" y2="16" stroke-linecap="round"/>
    </svg>
    <div class="flex-1 leading-snug">
      <slot />
    </div>
    <button
      v-if="visible"
      type="button"
      class="flex-shrink-0 opacity-60 hover:opacity-100"
      @click="emit('dismiss')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</template>