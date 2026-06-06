<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useOnboardingStore } from "../stores/onboarding";
import menuList from "../../mocks/menuNav.json";

const onboardingStore = useOnboardingStore();
const route = useRoute();
const router = useRouter();

const isOpen = ref(false);

const pageTitle = computed(() => {
  const current = menuList.find((item) => item.path === route.path);
  return current?.name ?? "Inicio";
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const logout = () => {
  const auth = useCookie("auth");
  auth.value = null;

  onboardingStore.$reset?.();

  isOpen.value = false;

  router.push("/login");
};
</script>

<template>
  <header class="flex  items-center justify-between border-b bg-white px-8 py-4 relative">
    
    <h1 class="text-xl font-semibold">{{ pageTitle }}</h1>

  
    <div class="relative">
      <button
        @click="toggleMenu"
        class="text-sm text-gray-500 flex items-center gap-1"
      >
        {{ onboardingStore.fullName.trim().split(" ")[0]?.toUpperCase() }}
        <span>▼</span>
      </button>

      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md"
      >
        <button
          @click="logout"
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
        >
          Cerrar sesión
        </button>
      </div>
    </div>

  </header>
</template>
