<script setup lang="ts">
import { ref } from "vue";
import logo from "../../../assets/images/logo_Kambista.png";
import menuList from "../../mocks/menuNav.json";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <!-- BOTÓN MOBILE -->
  <div
    class="flex items-center justify-between border-b bg-white p-4 md:hidden"
  >
    <img :src="logo" class="h-8" />
    <button @click="toggleMenu" class="text-2xl">☰</button>
  </div>

  <!-- OVERLAY -->
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/40 md:hidden"
    @click="closeMenu"
  />

  <div
    v-if="isOpen"
    class="fixed left-0 top-0 z-50 w-64 h-screen bg-white border-r shadow-lg md:hidden"
  >
    <!-- LOGO -->
    <div class="border-b p-6 flex justify-between items-center">
      <img :src="logo" class="h-8" />

      <button @click="closeMenu" class="text-xl">✕</button>
    </div>

    <!-- MENU -->
    <nav class="p-4">
      <ul class="space-y-2">
        <li v-for="value in menuList" :key="value.id">
          <NuxtLink
            :to="value.path"
            class="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-[#EFF0F6] hover:text-black"
            @click="closeMenu"
          >
            {{ value.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>

  <!-- SIDEBAR DESKTOP -->
  <aside class="hidden md:block w-64 border-r bg-white h-screen">
    <div class="border-b p-6">
      <img :src="logo" class="h-8" />
    </div>

    <nav class="p-4">
      <ul class="space-y-2">
        <li v-for="value in menuList" :key="value.id">
          <NuxtLink
            :to="value.path"
            class="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-[#EFF0F6] hover:text-black"
          >
            {{ value.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
