<script setup lang="ts">
import AppButton from "../ui/AppButton.vue";

const form = reactive({
  fullName: '',
  documentType: '',
  documentNumber: '',
  phone: '',
  birthDate: '',
  acceptTerms: false,
  acceptPrivacy: false
})

const handleSubmit = () => {
  console.log(form)
  navigateTo('/onboarding/success')
}
</script>

<template>
  <div
    class="w-full max-w-md rounded-xl bg-white p-8 shadow-sm"
  >
    <h1
      class="mb-8 text-center text-2xl font-bold text-[#1D2433]"
    >
      Completa tus datos
    </h1>

    <form
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <!-- Nombre -->
      <div>
        <label class="mb-2 block text-sm text-gray-600">
          Nombres completos
        </label>

        <input
          v-model="form.fullName"
          type="text"
          placeholder="Escribe tus nombres y apellidos"
          class="w-full rounded-md border border-gray-200 px-4 py-3"
        />
      </div>

      <!-- Documento -->
      <div>
        <label class="mb-2 block text-sm text-gray-600">
          Documento
        </label>

        <div class="flex gap-2">
          <select
            v-model="form.documentType"
            class="w-32 rounded-md border border-gray-200 px-3 py-3"
          >
            <option value="">
              Tipo
            </option>
            <option value="DNI">
              DNI
            </option>
            <option value="CE">
              CE
            </option>
            <option value="PASAPORTE">
              Pasaporte
            </option>
          </select>

          <input
            v-model="form.documentNumber"
            type="text"
            placeholder="N° de documento"
            class="flex-1 rounded-md border border-gray-200 px-4 py-3"
          />
        </div>
      </div>

      <!-- Mensaje -->
      <div
        class="rounded-md bg-[#DFF2FF] p-3 text-xs text-[#336699]"
      >
        Tu documento de identidad debe coincidir con
        tus datos personales para evitar inconvenientes
        al momento de hacer una primera operación.
      </div>

      <!-- Celular -->
      <div>
        <label class="mb-2 block text-sm text-gray-600">
          Celular
        </label>

        <input
          v-model="form.phone"
          type="text"
          placeholder="N° de celular"
          class="w-full rounded-md border border-gray-200 px-4 py-3"
        />
      </div>

      <!-- Fecha -->
      <div>
        <label class="mb-2 block text-sm text-gray-600">
          Fecha de nacimiento
        </label>

        <input
          v-model="form.birthDate"
          type="date"
          class="w-full rounded-md border border-gray-200 px-4 py-3"
        />
      </div>

      <!-- Términos -->
      <div class="space-y-3">
        <label class="flex items-start gap-2 text-xs">
          <input
            v-model="form.acceptTerms"
            type="checkbox"
            class="mt-1"
          />

          <span>
            He leído y acepto los
            <strong>Términos y condiciones</strong>
          </span>
        </label>

        <label class="flex items-start gap-2 text-xs">
          <input
            v-model="form.acceptPrivacy"
            type="checkbox"
            class="mt-1"
          />

          <span>
            Acepto el manejo expreso e informado de la
            <strong>
              Política de Tratamiento de datos
              personales de Kambista
            </strong>
          </span>
        </label>
      </div>

      <AppButton
        label="CONTINUAR"
        type="submit"
        variant="primary"
        
        @click="handleSubmit"
      />

    </form>
  </div>
</template>