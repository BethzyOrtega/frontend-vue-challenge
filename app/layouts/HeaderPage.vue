<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useOnboardingStore } from "../stores/onboarding";
import menuList  from "../../mocks/menuNav.json";

const onboardingStore = useOnboardingStore()
const route = useRoute()
const pageTitle = computed(() => {
  const current = menuList.find(
    item => item.path === route.path
  )

  return current?.name ?? 'Inicio'
})

</script>

<template>
  <header class="flex items-center justify-between border-b bg-white px-8 py-4">
    <h1 class="text-xl font-semibold">{{ pageTitle }}</h1>

    <div class="text-sm text-gray-500">{{ onboardingStore.fullName.trim().split(" ")[0]?.toUpperCase()}} ▼</div>
  </header>
</template>
