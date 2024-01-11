<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { fetchLazyLoading, postKomentar } from '@/api/pertanyaan';
import SkeletonLoading from '@/components/SkeletonLoading.vue'
import CloudImage from './CloudImage.vue';
import Notification from './Notification.vue';

const loading = ref(false);
const noMoreData = ref(false);
const currentPage = ref(1);
const itemPerPage = ref(10);
const pertanyaanList = ref([]);
const komentar = ref({})


const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');

const postDataKomentar = async (pertanyaanId) => {
  try {
    console.log(komentar.value[pertanyaanId])
    if (!komentar.value[pertanyaanId]) {
      return notif('komentar harus terisi', 'error')
    }
    await postKomentar(pertanyaanId, komentar.value[pertanyaanId])
      .then(response => {
        console.log(response)
        komentar.value[pertanyaanId] = ''
        return notif('berhasil mengirim komentar', 'success')
      })
      .catch(error => {
        console.log(error)

        if (error.response) {
          const errors = error.response.data.errors;
          notif(errors, 'error')
        }
      })
  } catch (error) {
    console.log(error)
  }
}

const fetchDataLazyLoad = async () => {
  try {
    if (loading.value || noMoreData.value) {
      return;
    }

    loading.value = true;

    const newPertanyaan = await fetchLazyLoading(currentPage.value, itemPerPage.value);
    console.log(newPertanyaan)
    if (newPertanyaan.length > 0) {
      pertanyaanList.value = [
        ...pertanyaanList.value,
        ...newPertanyaan
      ];

      currentPage.value++;

      if (newPertanyaan.length < itemPerPage.value) {
        noMoreData.value = true;
        if (noMoreData.value) {
          window.removeEventListener('scroll', handleScroll);
        }
      }

    } else {
      noMoreData.value = true;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    noMoreData.value = true;
  } finally {
    loading.value = false;
  }

};

const handleScroll = () => {
  console.log('Scroll event triggered.');

  if (noMoreData.value) {
    console.log('Tidak ada data');
    return;
  }

  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop + windowHeight >= documentHeight - 100 && !loading.value) {
    console.log('Fetching more data...');
    fetchDataLazyLoad();
  }
};

const lihatKomen = (pertanyaanId) => {

  const element = document.getElementById(pertanyaanId)
  if (element.ariaValueText === "close") {
    element.classList.remove("max-h-0")
    element.ariaValueText = "open"
    element.classList.add("max-h-screen")
  } else if (element.ariaValueText === "open") {
    element.classList.remove("max-h-screen")
    element.classList.add("max-h-0")
    element.ariaValueText = "close"
  }
};




onMounted(() => {
  fetchDataLazyLoad()
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const notif = async (message, type) => {
  showNotification.value = true;
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    showNotification.value = false;
  }, 2000)
};
</script>

<template>
  <Notification :show="showNotification" :message="notificationMessage" :type="notificationType" :mundur="'iya'" />

  <div class="border-gray-200 bg-gray-700 h-[100%] text-gray-200">
    <div class="pt-20 container mx-auto rounded-lg p-12">
      <div
        class="block mx-auto rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-gray-800 w-[60%]">
        <div class="mt-4 border-b-2 px-6 flex py-3 border-gray-800 text-neutral-50">
          <img class="w-10 h-10 rounded-full ml-2 mt-2 mr-3" src="/image/esa.png" alt="Rounded avatar">
          <button type="button"
            class="py-2.5 px-5 mr-2 mb-2 mt-2 ml-1 text-sm font-medium  focus:outline-none rounded-lg border  hover:text-white focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600  hover:bg-gray-700">
            <p class="pl-2 ml-2 mr-3">Apa yang ingin anda tanyakan atau bagikan?</p>
          </button>
        </div>
        <div class="pl-6 ml-3 flex pb-3">
          <div class="px-4">
            <a href="" class="mr-3 hover:underline">Tanya</a>
            <a href="" class="hover:underline">Jawab</a>
          </div>
        </div>
        <SkeletonLoading :show="loading" />
      </div>
      <div v-for="pertanyaan in pertanyaanList" :key="pertanyaan.id"
        class="block mt-2 mx-auto rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-gray-800 w-[60%]">
        <div class="border-b-2 px-6 flex py-3 border-gray-800 ">
          <img class="w-10 h-10 rounded-full ml-2 mt-2 mr-3" src="/image/profil1.png" alt="Rounded avatar">
          <div>
            <router-link :to="{ name: 'UserProfile', params: { username: pertanyaan.username } }"
              class="flex items-center mt-1 hover:underline cursor-pointer text-teal-400">{{ pertanyaan.username
              }}</router-link>
            <p class="text-sm text-gray-400">{{ pertanyaan.tanggal }}</p>
          </div>
        </div>
        <div class="pl-6 mr-3 ml-3 text-white flex pb-3">
          <div class="px-2">
            <p class="font-semibold">{{ pertanyaan.header }}</p>
            <p class="mb-2">{{ pertanyaan.deskripsi }}</p>

            <div v-if="pertanyaan.gambarList && pertanyaan.gambarList.length > 0">
              <div v-for="gambar in pertanyaan.gambarList" :key="gambar.id" class="mb-4">
                <CloudImage :path="gambar.path" />
              </div>
            </div>
            
          </div>
        </div>
        <div class=" w-[90%] mx-auto flex flex-col gap-y-5">
          <div class="flex flex-row gap-x-3">
            <button type="button"
              class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">

              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 18 18">
                <path
                  d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
              </svg>
              <span class="sr-only">Icon description</span>
              <p class=" ml-3">{{ pertanyaan.suka }}</p>
            </button>
            <button type="button" @click="lihatKomen(pertanyaan.id)"
              class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center hs-accordion-toggle hs-accordion-active:text-blue-600 group   gap-x-3  transition  dark:hs-accordion-active:text-blue-600 dark:text-gray-200 dark:hover:text-gray-400"
              aria-controls="hs-basic-collapse-one">
              <img src="/image/Chat.png" class="w-5" style="width: 20px;" alt="">
              <p class="px-3">{{ pertanyaan.totalKomentar }}</p>
            </button>
          </div>

          <form @submit.prevent="postDataKomentar(pertanyaan.id)">
            <label for="chat" class="sr-only">Pesan Komentar</label>
            <div class="flex rounded-lg bg-gray-800 gap-x-1">
              <textarea id="chat" rows="1" v-model="komentar[pertanyaan.id]"
                class="block p-2.5 mb-3 w-full text-sm overflow-y-height rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 dark:border-gray-600 placeholder-gray-400 text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Komentar mu"></textarea>
              <button type="submit"
                class="flex items-center justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                <svg class="w-5 h-5 rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 18 20">
                  <path
                    d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span class="sr-only">Send message</span>
              </button>
            </div>
          </form>

          <div class="max-h-0 overflow-hidden overflow-y-auto transition-max-h duration-700 ease-in-out"
            v-if="pertanyaan.komentar.length > 0" aria-valuetext="close" :id="pertanyaan.id">

            <div class="flex flex-row py-2" v-for="komentar in pertanyaan.komentar" :key="komentar.idKomentar">
              <img src="/image/esa.png" alt="" class="w-10 mb-1 h-10 rounded-full">
              <div class="flex flex-col ml-3 w-full ">
                <a class=" hover:underline inline-flex cursor-pointer text-teal-400">
                  {{ komentar.nama }} <p class=" text-zinc-400 hover:no-underline text-sm ml-3 m-auto"> {{ komentar.waktu
                  }}</p>
                </a>
                <div class="border-b-2 w-full h-[1px] border-gray-600">
                </div>
                <p class=" text-gray-200 pb-3 dark:text-gray-200">
                  {{ komentar.deskripsi }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>