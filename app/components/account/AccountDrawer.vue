<script setup lang="ts">
import BankAccounts from "../../../mocks/bankAccounts.json";
import AppButton from "../ui/AppButton.vue";
import AppSelect from "../ui/AppSelect.vue";
import { TYPE_ACCOUNT } from "~/constants";
import { useValidateDataDrawer } from "../../composables/useValidateDataDrawer";
import AlertMessage from "../ui/AlertMessage.vue";

const { errors, validate } = useValidateDataDrawer();

const emit = defineEmits<{
  close: [];
  save: [account: any];
}>();

defineProps<{
  open: boolean;
}>();

const showAlertInfo = ref(true);

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

  emit("save", account);

  resetForm();
};
</script>

<template>
  <Transition name="overlay">
    <div
      v-if="open"
      class="fixed inset-0 z-50 bg-black/40"
      @click.self="emit('close')"
    >
      <Transition name="drawer">
        <div
          class="absolute bottom-0 left-0 w-full h-[80vh] rounded-t-3xl bg-white shadow-lg overflow-y-auto md:top-0 md:right-0 md:left-auto md:h-full md:w-[50%] md:rounded-none"
        >
          <div class="flex justify-center py-3 md:hidden">
            <div class="h-1.5 w-12 rounded-full bg-gray-300" />
          </div>

          <!-- Header -->
          <div
            class="flex items-center justify-between border-b px-4 py-4 md:px-6"
          >
            <h2 class="text-base font-bold md:text-lg">Agregar cuenta soles</h2>

            <button @click="emit('close')" class="text-xl">✕</button>
          </div>

          <!-- Content -->
          <div class="space-y-5 p-4 md:p-6">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <!-- LEFT -->
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

                <!-- SOLO DESKTOP -->
                <div class="hidden md:block">
                  <AlertMessage
                    @dismiss="showAlertInfo = false"
                    type="info"
                    :visible="showAlertInfo"
                    closable
                  >
                    Tiempo estimado de espera
                    <strong>BCP, Interbank, BanBif y Pichincha:</strong>
                    15 minutos (Aplica para cualquier monto). Otros bancos 1 día
                    útil.
                  </AlertMessage>
                </div>

                <div class="flex gap-2">
                  <button
                    type="button"
                    class="flex-1 rounded border p-3 text-sm"
                    :class="{
                      'bg-[#09142E] text-white': form.currency === 'PEN',
                    }"
                    @click="form.currency = 'PEN'"
                  >
                    SOLES
                  </button>

                  <button
                    type="button"
                    class="flex-1 rounded border p-3 text-sm"
                    :class="{
                      'bg-[#09142E] text-white': form.currency === 'USD',
                    }"
                    @click="form.currency = 'USD'"
                  >
                    DÓLARES
                  </button>
                </div>
              </div>

              <!-- RIGHT -->
              <div class="space-y-4">
                <input
                  v-model="form.accountNumber"
                  placeholder="Número de cuenta"
                  class="w-full rounded border p-3"
                />

                <p v-if="errors.accountNumber" class="text-xs text-red-500">
                  {{ errors.accountNumber }}
                </p>

                <input
                  v-model="form.alias"
                  placeholder="Alias"
                  class="w-full rounded border p-3"
                />

                <p v-if="errors.alias" class="text-xs text-red-500">
                  {{ errors.alias }}
                </p>

                <label
                  class="flex items-start gap-2 text-sm"
                  :class="{ 'text-red-500': errors.owner }"
                >
                  <input v-model="form.owner" type="checkbox" class="mt-1" />

                  <span>
                    *Es obligatorio que la cuenta esté a tu nombre para que el
                    cambio sea exitoso
                  </span>
                </label>
                <div class="hidden md:block">
                <AppButton
                  class="w-full"
                  variant="primary"
                  label="GUARDAR CUENTA"
                  type="submit"
                  @click="saveAccount"
                />
                </div>
              </div>
            </div>

            <!-- SOLO MOBILE -->
            <div class="md:hidden">
              <AlertMessage
                @dismiss="showAlertInfo = false"
                type="info"
                :visible="showAlertInfo"
                closable
              >
                Tiempo estimado de espera
                <strong>BCP, Interbank, BanBif y Pichincha:</strong>
                15 minutos (Aplica para cualquier monto). Otros bancos 1 día
                útil.
              </AlertMessage>
            </div>

            <div class="md:hidden">

            <AppButton
              class="w-full"
              variant="primary"
              label="GUARDAR CUENTA"
              type="submit"
              @click="saveAccount"
            />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-to,
.overlay-leave-from {
  opacity: 1;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s ease;
}

/* Mobile */
.drawer-enter-from,
.drawer-leave-to {
  transform: translateY(100%);
}

.drawer-enter-to,
.drawer-leave-from {
  transform: translateY(0);
}

/* Desktop */
@media (min-width: 768px) {
  .drawer-enter-from,
  .drawer-leave-to {
    transform: translateX(100%);
  }

  .drawer-enter-to,
  .drawer-leave-from {
    transform: translateX(0);
  }
}
</style>
