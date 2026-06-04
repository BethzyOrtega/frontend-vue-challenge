<script setup lang="ts">
import BankAccounts from "../../../mocks/bankAccounts.json";
import AppButton from "../ui/AppButton.vue";
import AppSelect from "../ui/AppSelect.vue";
import { TYPE_ACCOUNT } from "~/constants";

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
  owner: false,
});

const bankOptions = BankAccounts.map((bank) => ({
  value: bank.alias,
  label: bank.alias,
}));

const saveAccount = () => {
  emit("save", {
    id: crypto.randomUUID(),
    ...form,
  });
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

          <AppSelect
            v-model="form.bank"
            :options="bankOptions"
            placeholder="Selecciona"
          />

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

          <input
            v-model="form.alias"
            placeholder="Alias"
            class="rounded border p-3"
          />

          <label class="flex gap-2 text-sm">
            <input v-model="form.owner" type="checkbox" />

            *Es obligatorio que la cuenta esté a tu nombre para que el cambio
            sea exitoso
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
