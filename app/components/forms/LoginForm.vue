<script setup lang="ts">
import AppButton from "../ui/AppButton.vue";

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const handleSubmit = () => {
  console.log({
    email: email.value,
    password: password.value,
  });
};
</script>

<template>
  <div class="w-full max-w-sm">
    <h1 class="mb-8 text-4xl font-bold text-[#1D2433]">Inicia sesión</h1>

    <form class="w-full max-w-md space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label class="mb-2 block text-sm text-gray-500">
          Correo electrónico
        </label>
        <input
          v-model="email"
          type="email"
          placeholder="Correo"
          class="w-full border rounded-lg p-3"
        />
      </div>
      <div>
        <label class="mb-2 block text-sm text-gray-500"> Contraseña </label>

        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Escribe tu contraseña"
            class="w-full rounded-md border border-gray-200 px-4 py-3 pr-12 outline-none focus:border-cyan-500"
          />

          <button
            type="button"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            @click="showPassword = !showPassword"
          >
            👁
          </button>
        </div>
      </div>

      <div class="flex justify-center py-4">
        <a href="#" class="text-xs text-gray-500 hover:text-cyan-500">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <AppButton label="INICIAR SESION" type="submit" variant="primary" />

      <p class="text-center text-sm text-gray-600">
        ¿No tienes cuenta?
        <NuxtLink to="/onboarding" class="font-semibold hover:underline">
          Regístrate aquí
        </NuxtLink>
      </p>
    </form>
  </div>
</template>
