<script setup>
import { defineProps, onMounted , ref } from 'vue';
import { getPertanyaan } from '@/api/pertanyaan';

const props = defineProps(['activeTab' , 'isiTab' , 'nama'])

const username = ref(props.nama)
const pertanyaanList = ref([]);

const getPertanyaanByUsername = async (usename) => {
  await getPertanyaan(usename)
    .then(async (response) => {
      const responseData = response.data.data;

      // Clear the existing data in pertanyaanList
      pertanyaanList.value = [];

      for (const item of responseData) {
        const tanggalValue = await formatDate(item['tanggal']);
        const pertanyaanItem = {
            id: item['id'],
            deskripsi: item['deskripsi'],
            header: item['header'],
            suka: item['suka'],
            tanggal: tanggalValue,
        };

        // Push each pertanyaanItem as a single object into pertanyaanList
        pertanyaanList.value.push(pertanyaanItem);
      }

      console.log(pertanyaanList);
      return response;
    })
    .catch((error) => {
      return error;
    });
};

const formatDate = async(data) => {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}


onMounted(() => {
    console.log(props.isiTab + "isitab mas")
    console.log(formatDate("2024-01-08T08:03:21.000+00:00"))
    setTimeout(() => {
        if(props.nama !== ''){
            username.value = props.nama
            console.log(username.value + "orang username")
            getPertanyaanByUsername(username.value)
        }
    }, 200)
        // console.log(props.nama)
        // console.log(getPertanyaanByUsername())
})
</script>

<template>
    <div class="h-full" v-if="activeTab === 'pertanyaan' && isiTab === true">
        <div
          v-for="(pertanyaan, index) in pertanyaanList"
          :key="index"
          class="block mt-2 rounded-lg shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-gray-800 w-[60%] "
        >
          <div class="pl-6 mx-3 text-white flex pb-3">
            <div class="px-2 mt-3">
              <p class="font-semibold mb-2">{{ pertanyaan.tanggal }}</p>
              <p class="font-semibold">{{ pertanyaan.header }}</p>
              <p class="mb-2">{{ pertanyaan.deskripsi }}</p>
            </div>
          </div>
          <div class="w-[90%] mx-auto flex flex-col gap-y-5">
            <div class="flex flex-row gap-x-3 pb-2">
              <button
                type="button"
                class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"
                  />
                </svg>
                <p class="ml-3">{{ pertanyaan.suka }}</p>
                <span class="sr-only">Icon description</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    <div v-if="activeTab === 'pertanyaan' && isiTab === false" class="">
      <img src="/image/mail.webp" class=" w-32 " alt="">
      <p>tidak ada pertanyaan </p>
    </div>
</template>