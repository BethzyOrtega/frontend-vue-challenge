<script setup lang="ts">
import successImage from "../../../assets/images/celphone.png"
import AppButton from "../ui/AppButton.vue";
const handleContinue = () => {
  navigateTo('/transactions')
}
</script>

<template>
  <div class="flex flex-col items-center">
    <img
      :src="successImage"
      alt="Registro exitoso"
      class="mb-8 w-40"
    />

    <h1
      class="mb-4 text-center text-3xl font-bold text-[#1D2433]"
    >
      ¡Felicitaciones Ejemplo, tu
      <br />
      perfil ha sido creado!
    </h1>

    <p
      class="mb-10 text-center text-gray-500"
    >
      Ya puedes empezar a Kambiar con la mejor tasa del mercado
    </p>

    <AppButton
      label="CONTINUAR"
      type="button"
      variant="primary"
      @click="handleContinue"
    />
  </div>
</template>