<script setup lang="ts">
import AppButton from "../ui/AppButton.vue";
import AppInput from "../ui/AppInput.vue";

const { form, errors, loginError, loading, login } = useLoginValidation();

const handleSubmit = async () => {
  const success = await login();

  if (success) {
    const auth = useCookie("auth");

    auth.value = "logged";
    navigateTo("/onboarding");
  }
};
</script>

<template>
  <div class="w-full max-w-sm">
    <h1 class="mb-8 text-4xl font-bold text-[#1D2433] text-center md:text-left">
      Inicia sesión
    </h1>

    <form class="w-full max-w-md space-y-4" @submit.prevent="handleSubmit">
      <AppInput
        v-model="form.email"
        label="Correo electrónico"
        placeholder="Escribe tu correo"
        type="email"
        autocomplete="email"
        :error="errors.email"
      />
      <AppInput
        v-model="form.password"
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        type="password"
        autocomplete="current-password"
        :error="errors.password"
      />

      <div class="flex justify-center py-4">
        <a href="#" class="text-xs text-gray-500 hover:text-cyan-500">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <AppButton label="INICIAR SESION" type="submit" variant="primary" />

      <p class="text-center text-sm text-gray-600">
        ¿No tienes cuenta?
        <NuxtLink to="/" class="font-semibold hover:underline">
          Regístrate aquí
        </NuxtLink>
      </p>
    </form>
  </div>
</template>
