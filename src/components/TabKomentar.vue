<script setup>
import { defineProps } from 'vue';
defineProps(['activeTab' , 'isiTab' , 'nama'])
</script>

<template>
    <div class="h-full" v-if="activeTab === 'komentar' && isiTab === true">
        <div
          class="block mt-2 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-gray-800 w-[60%] "
        >
          <div class="pl-6 mx-3 text-white flex pb-3">
            <div class="px-2 mt-3">
              <p class="font-semibold mb-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem consequatur cum cupiditate laborum placeat? Labore molestiae at aperiam dicta est saepe error atque quos enim deserunt? Quos ab a corporis!</p>
              <p class="font-semibold"></p>
              <p class="mb-2"></p>
            </div>
          </div>
          <div class="w-[90%] mx-auto flex flex-col gap-y-5">
            <div class="flex flex-row gap-x-3 pb-2">
            </div>
          </div>
        </div>
      </div>

    <div v-if="activeTab === 'komentar' && isiTab === false" class="">
      <img src="/image/mail.webp" class=" w-32 " alt="">
      <p>tidak ada komentar </p>
    </div>
</template>

<style scoped>

</style>