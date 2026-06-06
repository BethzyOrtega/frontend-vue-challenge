<script setup lang="ts">
import BankAccounts from "../../../mocks/bankAccounts.json";
import AppButton from "../ui/AppButton.vue";
import AppSelect from "../ui/AppSelect.vue";
import { TYPE_ACCOUNT } from "~/constants";
import { useValidateDataDrawer } from "../../composables/useValidateDataDrawer";

const { errors, validate } = useValidateDataDrawer();

const emit = defineEmits<{
  close: [];
  save: [account: any];
}>();

defineProps<{
  open: boolean;
}>();

const form = reactive({
  accountType: "",
  bank: "",
  accountNumber: "",
  alias: "",
  currency: "PEN",
  owner: "",
});

watch(
  () => form.accountType,
  (value) => {
    if (value) {
      errors.accountType = "";
    }
  },
);

watch(
  () => form.alias,
  (value) => {
    if (value) {
      errors.alias = "";
    }
  },
);

watch(
  () => form.owner,
  (value) => {
    if (value) {
      errors.owner = "";
    }
  },
);

watch(
  () => form.accountType,
  (value) => {
    if (value) {
      errors.accountType = "";
    }
  },
);

watch(
  () => form.accountNumber,
  (value) => {
    if (value) {
      errors.accountNumber = "";
    }
  },
);

const bankOptions = BankAccounts.map((bank) => ({
  value: bank.alias,
  label: bank.alias,
}));

const resetForm = () => {
  form.accountType = "";
  form.bank = "";
  form.accountNumber = "";
  form.alias = "";
  form.currency = "PEN";
};

const saveAccount = () => {
  const isValid = validate(
    form.accountType,
    form.bank,
    form.accountNumber,
    form.alias,
    form.owner,
  );

  if (!isValid) return;

  const account = {
    id: crypto.randomUUID(),
    alias: form.alias,
    accountNumber: form.accountNumber,
    bank: form.bank,
    currency: form.currency,
    accountType: form.accountType,
  };

  console.log("Cuenta a guardar:", account);

  emit("save", account);

  resetForm();
};
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-50 bg-black/40">
    <div class="absolute right-0 top-0 w-[50%] h-full bg-white p-6 shadow-lg">
      <div class="mb-6 flex justify-between">
        <h2 class="font-bold">Agregar cuenta - Soles</h2>

        <button @click="emit('close')">✕</button>
      </div>

      <div class="grid grid-cols-2 gap-6">
        <div class="space-y-4">
          <AppSelect
            v-model="form.accountType"
            placeholder="Tipo de cuenta"
            :options="TYPE_ACCOUNT"
          />
          <p v-if="errors.accountType" class="text-xs text-red-500">
            {{ errors.accountType }}
          </p>

          <AppSelect
            v-model="form.bank"
            :options="bankOptions"
            placeholder="Selecciona"
          />
          <p v-if="errors.bank" class="text-xs text-red-500">
            {{ errors.bank }}
          </p>

          <div class="flex gap-2">
            <button
              type="button"
              class="flex-1 rounded border p-3"
              :class="{ 'bg-[#09142E] text-white': form.currency === 'PEN' }"
              @click="form.currency = 'PEN'"
            >
              Soles
            </button>

            <button
              type="button"
              class="flex-1 rounded border p-3"
              :class="{ 'bg-[#09142E] text-white': form.currency === 'USD' }"
              @click="form.currency = 'USD'"
            >
              Dólares
            </button>
          </div>
        </div>

        <div class="grid gap-4 my-2">
          <input
            v-model="form.accountNumber"
            placeholder="Número de cuenta"
            class="rounded border p-3"
          />
          <p v-if="errors.accountNumber" class="text-xs text-red-500">
            {{ errors.accountNumber }}
          </p>

          <input
            v-model="form.alias"
            placeholder="Alias"
            class="rounded border p-3"
          />
          <p v-if="errors.alias" class="text-xs text-red-500">
            {{ errors.alias }}
          </p>

          <label
            class="flex gap-2 text-sm"
            :class="{ 'text-red-500': errors.owner }"
          >
            <input v-model="form.owner" type="checkbox" />

            <span>
              *Es obligatorio que la cuenta esté a tu nombre para que el cambio
              sea exitoso
            </span>
          </label>

          <AppButton
            variant="primary"
            label="Agregar y usar"
            type="submit"
            @click="saveAccount"
          />
        </div>
      </div>
    </div>
  </div>
</template>
