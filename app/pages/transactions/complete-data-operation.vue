<script setup>
import CompleteFormOperation from "~/layouts/CompleteFormOperation.vue";
import OperationStepper from "../../layouts/OperationStepper.vue";
import HeaderOperations from "~/layouts/HeaderOperations.vue";
</script>

<template>
  <div class="flex min-h-screen bg-[#F7F7F7]">
    <main class="flex-1">
      <HeaderOperations>
        <OperationStepper :current-step="1" />
      </HeaderOperations>
      <CompleteFormOperation />
    </main>
  </div>
</template>
