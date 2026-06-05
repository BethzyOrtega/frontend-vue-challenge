<script setup lang="ts">
import AppButton from "../ui/AppButton.vue";
import AppInput from "../ui/AppInput.vue";
import AppSelect from "../ui/AppSelect.vue";
import AlertMessage from "../ui/AlertMessage.vue";
import AppTermsAndConditions from "../ui/AppTerms.vue";
import { DOC_TYPES } from "../../constants.js";
import { useOnboardingStore } from "~/stores/onboarding.js";
const onboardingStore = useOnboardingStore();
import { usePersonalDataValidation } from "~/composables/usePersonalDataValidation";
const {
  errors,
  validateForm,
  validateFullname,
  validateDocumentType,
  validateDocumentNumber,
  validatePhone,
  validateBirthDate,
  validateTerms,
  validatePrivacy,
} = usePersonalDataValidation();

const submitted = ref(false);

const form = reactive({
  fullname: "",
  documentType: "",
  documentNumber: "",
  phone: "",
  birthDate: "",
  acceptTerms: false,
  acceptPrivacy: false,
});

const handleFullname = (value: string) => {
  form.fullname = value.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

watch(
  () => form.fullname,
  (value) => {
    if (submitted.value) {
      validateFullname(value);
    }

    errors.fullname = "";
    return true;
  },
);

watch(
  () => form.documentType,
  (value) => {
    if (submitted.value) {
      validateDocumentType(value);
      validateDocumentNumber(value, form.documentNumber);
    }

    errors.documentType = "";
    return true;
  },
);

watch(
  () => form.documentNumber,
  (value) => {
    if (submitted.value) {
      validateDocumentNumber(form.documentType, value);
    }
    errors.documentType = "";
    return true;
  },
);

watch(
  () => form.phone,
  (value) => {
    if (submitted.value) {
      validatePhone(value);
    }

    errors.phone = "";
    return true;
  },
);

watch(
  () => form.birthDate,
  (value) => {
    if (submitted.value) {
      validateBirthDate(value);
    }
    errors.birthDate = "";
    return true;
  },
);

watch(
  () => form.acceptTerms,
  (value) => {
    if (submitted.value) {
      validateTerms(value);
    }

    errors.acceptTerms = "";
    return true;
  },
);

watch(
  () => form.acceptPrivacy,
  (value) => {
    if (submitted.value) {
      validatePrivacy(value);
    }

    errors.acceptPrivacy = "";
    return true;
  },
);

const handleSubmit = () => {
  const submitted = ref(false);
  if (!validateForm(form)) {
    return;
  }

  onboardingStore.setPersonalData({
    fullName: form.fullname,
    typeDocument: form.documentType,
    documentNumber: form.documentNumber,
  });

  navigateTo("/onboarding/success");
};
</script>

<template>
  <div class="w-full max-w-md rounded-xl bg-white p-8 shadow-sm">
    <h1 class="mb-8 text-center text-2xl font-bold text-[#1D2433]">
      Completa tus datos
    </h1>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <!-- Nombre -->
      <AppInput
        v-model="form.fullname"
        @update:model-value="handleFullname"
        label="Nombres completos"
        placeholder="Escribe tus nombres y apellidos"
        :maxlength="80"
        inputmode="text"
        :error="errors.fullname"
      />

      <!-- Documento -->
      <div>
        <label class="label">Documento</label>

        <div class="flex gap-2">
          <div class="flex-1">
            <AppSelect
              v-model="form.documentType"
              :options="DOC_TYPES"
              placeholder="Tipo"
              :error="errors.documentType"
            />
          </div>

          <div class="flex-1">
            <AppInput
              v-model="form.documentNumber"
              placeholder="Nº de documento"
              :error="errors.documentNumber"
            />
          </div>
        </div>
      </div>

      <AlertMessage type="info">
        Tu documento de identidad debe coincidir con tus datos para evitar
        inconvenientes al momento de hacer una primera operación
      </AlertMessage>

      <AppInput
        v-model="form.phone"
        label="Celular"
        placeholder="Nº de celular"
        :maxlength="9"
        inputmode="numeric"
        :error="errors.phone"
      />

      <!-- Fecha -->
      <div>
        <label class="mb-2 block text-sm text-gray-600">
          Fecha de nacimiento
        </label>

        <input
          v-model="form.birthDate"
          type="date"
          class="w-full rounded-md border border-gray-200 px-4 py-3"
          :class="form.birthDate ? 'text-[#060F26]' : 'text-[#A7A7A7]'"
        />
      </div>
      <p v-if="errors.birthDate" class="mt-1 text-xs text-red-500">
        {{ errors.birthDate }}
      </p>

      <AppTermsAndConditions
        v-model:accept-terms="form.acceptTerms"
        v-model:accept-privacy="form.acceptPrivacy"
        :terms-error="errors.acceptTerms"
        :privacy-error="errors.acceptPrivacy"
      />

      <AppButton
        label="CONTINUAR"
        type="submit"
        variant="primary"
        @click="handleSubmit"
      />
    </form>
  </div>
</template>
