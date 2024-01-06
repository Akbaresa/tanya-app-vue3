<script setup>
import {ref , onMounted , watch} from 'vue'
import { profil } from '@/api/profil'
import { getPekerjaan } from '@/api/pekerjaan'
import ModalPekerjaan from './ModalPekerjaan.vue'


const activeTab = ref('pertanyaan')
const isiTab = ref(false)
const username = ref('')
const email = ref('')
const showModalPekerjaan = ref(false)
const iyaPekerjaan = ref('')

const pekerjaan = ref({
    id: '' , 
    posisi : '',
    perusahaan : '',
    tahunMulai : '',
    tahunSelesai : '' , 
})

const setActiveTab = (tab , isi) => {
  activeTab.value = tab;
  isiTab.value = isi
  console.log(isi)
}

// const getActiveTab = activeTab.value

const getUser = async () => {
    await profil()
    .then(response => {
        pekerjaan.value.id = response.data.username
        username.value = response.data.username
        email.value = response.data.email
        getPekerjaanLokal(username.value)
    })
    .catch(error => {
        console.log(error)
        console.log('orang salah')
    })
}

const closeModalPekerjaan = async () => {
  showModalPekerjaan.value = false
}
const openModalPekerjaan = async () => {
  showModalPekerjaan.value = true
}
const getPekerjaanLokal = async (username) => {
  await getPekerjaan(username)
  .then(response => {
    pekerjaan.value.posisi = response.data.posisi
    pekerjaan.value.perusahaan = response.data.perusahaan
    pekerjaan.value.tahunMulai = response.data.tahunMulai
    pekerjaan.value.tahunSelesai = response.data.tahunSelesai
    pekerjaan.value.id = response.data.idKredpekerjaan
    iyaPekerjaan.value = 'ada'
  })
  .catch(
    iyaPekerjaan.value = 'error',
    console.log(iyaPekerjaan.value)
  )
}

onMounted(() => {
  getUser()
})

watch(pekerjaan, () => {
  console.log('Data pekerjaan telah berubah:', pekerjaan.value);
})
</script>

<template>
    <div>
        <div class="h-screen bg-gray-700">
            <div class="mt-10">
              <div class="flex flex-row justify-between ml-20 mr-20 flex-none pt-20">
                <div class="flex container w-3/5">
                  <div
                    class="w-36 h-36 relative flex-none overflow-hidden rounded-full hover:cursor-pointer">
                    <div>
                      <img src="/image/esa.png" alt="" style="margin-top: -20px;" />
                    </div>  
                    <div class="absolute top-0 left-0 w-full h-full  items-center justify-center hidden" id="imgSwap">
                      <img alt="" src="" class="w-16 h-16 cursor-pointer" />
                    </div>
                  </div>
        
                  <div class="font-medium ml-5 w-full relativfe">
                    <div class="flex">
                      <div class="flex-none">
                        <div class="text-white text-3xl">{{ username }}</div>
                      </div>
                    </div>
                    <button
                      class="outline-2 absolute w-7 h-7 top-0 left-[70%] outline outline-gray-500 rounded-full overflow-hidden">
                      <img src="" alt="" class="object-center mx-auto w-5 h-auto">
                    </button>
        
                    <a href="#" class="text-sm text-white text-grey-500 hover:underline">Tambahkan Kredensial Profile</a>
                    <div class="">
                      <a href="#" class="font-light text-white hover:underline">0 Pengikut</a>
                      <a href="#" class="font-light text-white hover:underline ml-2">0 Mengikuti</a>
                    </div>
                  </div>
                </div>
        
                <div class="flex container w-2/5">
                  <div>
                    <div class="flex">
                      <div class="text-white w-[200%]">Kredensial & Sorotan</div>
                      <button>
                        <img src="/image/share_2.png" alt="" class="w-[15%] ml-[30%]">
                      </button>
                    </div>
        
                    <div class="border-b-2 w-[82%] mt-3"></div>
        
                    <div class="flex-none mt-5">
                      <button @click="openModalPekerjaan" v-if="iyaPekerjaan === 'error'" type="button" href="" class="text-base mt-2 flex hover:underline text-blue-500 gap-2"><img src="/image/briefcase.png"
                            alt="icon pekerjaan" class="w-5 h-5 mr-1 mt-0.5" >Tambahkan Kredensial Pekerjaan</button>

                      <button @click="openModalPekerjaan"  v-else type="button" href="" class="text-base mt-2 flex text-blue-500 gap-2"><img src="/image/briefcase.png"
                          alt="icon pekerjaan" class="w-5 h-5 mr-1 mt-0.5" ><p class=" text-white no-underline">{{ pekerjaan.posisi }} di {{pekerjaan.perusahaan }} dari {{pekerjaan.tahunMulai }} sampai {{ pekerjaan.tahunSelesai }}</p>  <p class=" hover:underline">edit</p> </button>
                          
                        <ModalPekerjaan 
                        :tutup-modal="closeModalPekerjaan" 
                        :show-modal="showModalPekerjaan"
                        :data="pekerjaan"
                        ></ModalPekerjaan>
        
        
                      <button @click="openModalPendidikan" class="text-base mt-2 flex hover:underline text-blue-500 gap-2"><img
                          src="/image/mortarboard_2.png" alt="icon pekerjaan" class="w-5 h-5 mr-1 mt-0.5">Tambahkan Kredensial
                        Pendidikan</button>
        
                        <!-- <ModalPendidikan :closeModal="closeModalPendidikan" :showModal="showModalPendidikan"></ModalPendidikan> -->
        
                      <button @click="openModalLokasi" class="text-base mt-2 flex hover:underline text-blue-500 gap-2"><img src="/image/location_2.png"
                          alt="icon pekerjaan" class="w-5 h-5 mr-1 mt-0.5">Tambahkan Kredensial Lokasi</button>
                          <!-- <ModalLokasi :showModal="showModalLokasi" :closeModal="closeModalLokasi"></ModalLokasi> -->
                    </div>
                  </div>
                </div>
              </div>
        
        
              <div class="flex ml-20 mr-20">
                <div class="flex container w-3/5 ">
                  <div class="ml-5 text-sm font-medium text-start grid-rows-2  border-b text-white border-gray-700">
                    <a href="#" class="font-medium text-grey-600 text-grey-500 hover:underline">{{ email }}</a>
                    <ul class="flex flex-wrap -mb -px">
                      <li class="mr-2">
                        <button @click.prevent="setActiveTab('pertanyaan' , true)"
                          :class="{ 'text-blue-400': activeTab === 'pertanyaan', 'border-blue-700': activeTab === 'pertanyaan' }"
                          id="pertanyaan-tab" :aria-selected="activeTab === 'pertanyaan'" type="button" role="tab"
                          data-tabs-button="#pertanyaan"
                          class="inline-block p-4 border-b-2 hover:text-blue-400 hover:border-blue-700 rounded-t-lg">pertanyaan
                        </button>

                      </li>
                      <li class="mr-2">
                        <button @click.prevent="setActiveTab('komentar')"
                          :class="{ 'text-blue-400': activeTab === 'komentar', 'border-blue-700': activeTab === 'komentar' }"
                          id="komentar-tab" :aria-selected="activeTab === 'komentar'" type="button" role="tab"
                          data-tabs-button="#komentar"
                          class="inline-block p-4 border-b-2 hover:text-blue-400 hover:border-blue-700 rounded-t-lg">komentar
                        </button>
                      </li>
                      <li class="mr-2">
                        <button @click.prevent="setActiveTab('contacts')"
                          :class="{ 'text-blue-400': activeTab === 'contacts', 'border-blue-700': activeTab === 'contacts' }"
                          id="contacts-tab" :aria-selected="activeTab === 'contacts'" type="button" role="tab"
                          data-tabs-button="#contacts"
                          class="inline-block p-4 border-b-2 hover:text-blue-400 hover:border-blue-700 rounded-t-lg">contacts
                        </button>
                      </li>
                      <li class="mr-2">
                        <button @click.prevent="setActiveTab('pengikut', true)"
                          :class="{ 'text-blue-400': activeTab === 'pengikut', 'border-blue-700': activeTab === 'pengikut' }"
                          id="pengikut-tab" :aria-selected="activeTab === 'pengikut'" type="button" role="tab"
                          data-tabs-button="#pengikut"
                          class="inline-block p-4 border-b-2 hover:text-blue-400 hover:border-blue-700 rounded-t-lg">pengikut
                        </button>
                      </li>
                      <li class="mr-2">
                        <button @click.prevent="setActiveTab('mengikuti')"
                          :class="{ 'text-blue-400': activeTab === 'mengikuti', 'border-blue-700': activeTab === 'mengikuti' }"
                          id="mengikuti-tab" :aria-selected="activeTab === 'mengikuti'" type="button" role="tab"
                          data-tabs-button="#mengikuti"
                          class="inline-block p-4 border-b-2 hover:text-blue-400 hover:border-blue-700 rounded-t-lg">mengikuti
                        </button>
                      </li>
                    </ul>
                    <div class="mt-3">
                      <div v-if="activeTab === 'pertanyaan' && isiTab === true"
                      class="block mt-2 rounded-lg  shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] bg-gray-800 w-[60%]">
                          <div class="border-b-2 px-6 flex py-3 border-gray-800 ">
                          <img class="w-10 h-10 rounded-full ml-2 mt-2 mr-3" src="/image/profil1.png" alt="Rounded avatar">
                              <div>
                                  <a type="button" class="flex items-center mt-1 hover:underline cursor-pointer text-teal-400">orang </a>
                                  <p class="text-sm text-gray-400">1202102</p>
                              </div>
                          </div>
                          <div class="pl-6 mr-3 ml-3 text-white flex pb-3">
                              <div class="px-2">
                                  <p class="font-semibold">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, reiciendis!</p>
                                  <p class="mb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dignissimos consequuntur esse quidem commodi, nisi modi, pariatur expedita beatae voluptates blanditiis. Autem beatae inventore dolor quam sint debitis voluptatem, incidunt hic asperiores commodi placeat tenetur ducimus id minima illum. Minus fugiat porro aliquam facilis ab dolores minima quibusdam facere commodi tempora fugit laboriosam, nesciunt illum? Eligendi temporibus, quia harum cum consequuntur nemo incidunt impedit veniam tempora corporis et molestias nobis laboriosam laborum dignissimos eos natus praesentium quisquam aliquid, non in. Quia minima ullam quos delectus? Ea eaque, quod minima iusto asperiores tenetur, delectus optio, repellendus laboriosam laborum illum consectetur temporibus!</p>
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
                                  <p class=" ml-3">11</p>
                                  </button>
                                  <button type="button"
                                  @click="lihatKomen(pertanyaan.id)"
                                  class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center hs-accordion-toggle hs-accordion-active:text-blue-600 group   gap-x-3  transition  dark:hs-accordion-active:text-blue-600 dark:text-gray-200 dark:hover:text-gray-400"
                                  aria-controls="hs-basic-collapse-one">
                                  <img src="/image/Chat.png" class="w-5" style="width: 20px;" alt="">
                                  <p class="px-3"> 11 </p>
                                  </button>
                              </div>
          
            
                          </div>
                      </div>
                      <div v-else class="">
                        <img src="/image/mail.webp" class=" w-32 " alt="">
                        <p>tidak ada pertanyaan </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex container w-2/5 mt-5">
                  <div class="w-[100%]">
                    <div class="flex w-[100%] gap-[58%]">
                      <div class="text-white ">Tahu Tentang</div>
                      <button>
                        <img src="" alt="" class="w-6 m l-[30%]">
                      </button>
                    </div>
        
                    <div class="border-b-2 w-[82%] mt-3" alt="garis"></div>
        
                    <div class="mt-5 items-center">
                      <div class="flex flex-col gap-y-3 ">
                        <a href="/oke" class="flex flex-row gap-x-2 items-center text-white">
                          <div class="w-9 h-9 border-blue-400 overflow-hidden">
                            <img src="/image/indo_flag.jpg" alt="" class="w-full h-full object-cover">
                          </div>
                          <h1 class="hover:underline underline-offset-2">Bahasa Indonesia</h1>
        
                        </a>
                        <a href="/oke" class="flex flex-row gap-x-2 items-center text-white">
                          <div class="w-9 h-9 border-blue-400 overflow-hidden">
                            <img src="/image/bahasa_inggris.jpg" alt="" class="w-full h-full object-cover">
                          </div>
                          <h1 class="hover:underline underline-offset-2">Bahasa Inggris</h1>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>

<style scoped>

</style>