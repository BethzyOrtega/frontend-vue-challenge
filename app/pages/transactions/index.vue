<script script setup lang="ts">
import Calculator from "~/layouts/Calculator.vue";
import HeaderPage from "../../layouts/HeaderPage.vue";
import Sidebar from "../../layouts/Sidebar.vue";
</script>

<template>
  <div class="flex min-h-screen bg-[#F7F7F7]">
    <Sidebar />

    <main class="flex-1">
      <HeaderPage />

      <Calculator />
    </main>
  </div>
</template>
