<script setup lang="ts">
import LoginForm from "../components/forms/LoginForm.vue";
import loginBanner from "../../assets/images/home_desk.png";
</script>

<template>
  <div class="min-h-screen flex">
    <div class="hidden md:block md:w-1/2">
      <img :src="loginBanner" alt="Login" class="h-screen w-full object-cover" />
    </div>

    <div   class="flex w-full items-center justify-center bg-[#F8F8F8] px-8 md:w-1/2">
      <LoginForm />
    </div>
  </div>
</template>
