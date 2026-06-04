<script setup lang="ts">
import AppSelect from "~/components/ui/AppSelect.vue";
import BankAccounts from "../../mocks/bankAccounts.json";
import SourceFunds from "../../mocks/sourceFunds.json";
import AlertMessage from "~/components/ui/AlertMessage.vue";
import AppButton from "~/components/ui/AppButton.vue";

const BANK_OPTIONS = BankAccounts.map((bank) => ({
  value: bank.id,
  label: bank.alias,
}));
const SOURCE_FUNDS_OPTIONS = SourceFunds.map((source) => ({
  value: source._id,
  label: source.name,
}));
const form = reactive({
  documentType: "",
  bank: "1",
  sourceFunds: "",
});
const errors = reactive({
  documentType: "",
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md rounded-xl">
      <h1 class="mb-8 text-center text-2xl font-bold text-[#1D2433]">
        Completa los datos de tu operación
      </h1>

      <div class="mb-6 rounded-md bg-white p-4 shadow-sm">
        <div class="flex justify-between">
          <label>Tu envías</label>
          <label>100</label>
        </div>
        <div class="flex justify-between">
          <label>Recibes</label>
          <label>S/ 380</label>
        </div>
        <div class="flex justify-between">
          <label>Cupon aplicado</label>
          <label>kjkjkj</label>
        </div>
        <hr class="my-4" />
        <div class="flex justify-between">
          <label>Tipo de cambio</label>
          <label>3.80</label>
        </div>
      </div>

      <AlertMessage type="info" visible>
        Tiempo estimado de espera
        <strong>BCP, Interbank, BanBif y Pichincha</strong> : 15 minutos (Aplica
        para cualquier monto). Otros bancos 1 día útil.
      </AlertMessage>

      <form class="space-y-4">
        <label class="label">¿Desde qué banco nos envías tu dinero?</label>
        <AppSelect
          v-model="form.bank"
          :options="BANK_OPTIONS"
          placeholder="Banco"
        />

        <label class="label">¿En qué cuenta deseas recibir tu dinero?</label>
        <AppSelect
          v-model="form.bank"
          :options="BANK_OPTIONS"
          placeholder="Banco"
        />

        <AlertMessage type="warning" visible>
          Recuerda que las cuentas deben
          <strong>estar a tu nombre.</strong> Kambista
          <strong>no transfiere a cuentas de terceros.</strong>
        </AlertMessage>

        <label class="label">Origen de fondos</label>
        <AppSelect
          v-model="form.sourceFunds"
          :options="SOURCE_FUNDS_OPTIONS"
          placeholder="Selecciona"
        />

        <AppButton label="CONTINUAR" type="submit" variant="primary" />
      </form>
    </div>
  </div>
</template>
