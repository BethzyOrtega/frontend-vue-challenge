
<script setup lang="ts">
import logo  from "../../../assets/images/logo_Kambista.png"
import  menuList from "../../mocks/menuNav.json"
</script>
<template>
<aside class="w-64 border-r bg-white">
      <div class="border-b p-6">
        <img
          :src="logo"
          alt="Kambista"
          class="h-8"
        />
      </div>

      <nav class="p-4">
        <ul class="space-y-2">
          <li v-for="value in menuList" :key="value.id" class="rounded-lg border-2 border-transparent px-4 py-2 text-sm text-gray-600 hover:border-[#EFF0F6] hover:bg-[#EFF0F6] hover:text-[#000000]">
            <NuxtLink
            :to="value.path"
            class="block rounded-lg border-2 border-transparent px-4 py-2 text-sm text-gray-600 hover:border-[#EFF0F6] hover:bg-[#EFF0F6] hover:text-black"
          >
            {{ value.name }}
          </NuxtLink>
          </li>

          
        </ul>
      </nav>
    </aside>
</template>

