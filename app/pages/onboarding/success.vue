<script setup lang="ts">
import logo from "../../../assets/images/logo_Kambista.png"
import RegistrationSuccess from "../../components/onboarding/RegistrationSucces.vue";
</script>

<template>
  <div class="min-h-screen bg-[#F7F7F9]">
    <header
      class="border-b bg-white px-8 py-5"
    >
      <img
        :src="logo" 
        alt="Kambista"
        class="h-8"
      />
    </header>

    <main
      class="flex min-h-[calc(100vh-80px)] items-center justify-center px-4"
    >
      <RegistrationSuccess />
    </main>
  </div>
</template>