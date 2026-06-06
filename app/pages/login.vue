<script setup lang="ts">
import LoginForm from "../components/forms/LoginForm.vue";
import loginBanner from "../../assets/images/home_desk.png";
import logo from "../../assets/images/logo_Kambista.png";
</script>

<template>
  <div class="min-h-screen flex">
    <div class="hidden md:block md:w-1/2">
      <img
        :src="loginBanner"
        alt="Login"
        class="h-screen w-full object-cover"
      />
    </div>

    <div
      class="flex flex-col w-full items-center justify-center bg-[#F8F8F8] px-8 md:w-1/2"
    >
      <img :src="logo" class="block md:hidden w-60 mb-20" alt="Logo" />

      <div class="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
