<script setup>
import HeaderPage from "../../layouts/HeaderPage.vue";
import Sidebar from "~/layouts/Sidebar.vue";
</script>

<template>
  <div class="flex min-h-screen bg-[#F7F7F7]">

    <Sidebar />    

    <main class="flex-1">
   
        <HeaderPage />
        
    </main>
  </div>
</template>