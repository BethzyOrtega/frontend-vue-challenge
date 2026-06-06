<script setup>
import CompleteFormOperation from "~/layouts/CompleteFormOperation.vue";
import OperationStepper from "../../layouts/OperationStepper.vue";
</script>

<template>
  <div class="flex min-h-screen bg-[#F7F7F7]">

    <Sidebar />    

    <main class="flex-1">
   
        <OperationStepper :current-step="1" />
        <CompleteFormOperation />
        
    </main>
  </div>
</template>