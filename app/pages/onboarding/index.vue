<script setup lang="ts">
import PersonalDataForm from "../../components/onboarding/PersonalDataForm.vue";
import LogoKambista from "../../../assets/images/logo_Kambista.png";
</script>

<template>
  <div class="min-h-screen bg-[#F8F8F8]">

    <header
      class="flex items-center justify-between border-b bg-white px-8 py-4"
    >
      <img
        :src="LogoKambista"
        alt="Kambista"
        class="h-8"
      />

      <NuxtLink
        to="/login"
        class="text-sm text-gray-700"
      >
        ← Volver
      </NuxtLink>
    </header>

    <main
      class="flex min-h-screen justify-center bg-[#F5F5F7] px-4 pt-8 md:pt-0 md:items-center"
    >
      <PersonalDataForm />
    </main>
  </div>
</template>