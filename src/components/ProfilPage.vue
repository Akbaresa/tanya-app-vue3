<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { profil } from '@/api/profil'
import { getPekerjaan } from '@/api/pekerjaan'
import { getPendidikan } from '@/api/pendidikan'
import ModalPekerjaan from './ModalPekerjaan.vue'
import ModalPendidikan from './ModalPendidikan.vue'
import TabPertanyaan from './TabPertanyaan.vue'
import TabKomentar from './TabKomentar.vue'
import { getPertanyaan } from '@/api/pertanyaan';


const activeTab = ref('pertanyaan')
const isiTab = ref(false)
const username = ref('')
const email = ref('')
const loading = ref(true)
const showModalPekerjaan = ref(false)
const showModalPendidikan = ref(false)
const adaPertanyaan = ref(false)
const iyaPekerjaan = ref('')
const iyaPendidikan = ref('')

const pekerjaan = ref({
    id: '' , 
    posisi : '',
    perusahaan : '',
    tahunMulai : '',
    tahunSelesai : '' , 
})

const pendidikan = ref({
    id: '' , 
    sekolah : '',
    jurusan : '',
    jenisGelar : '',
    tahunLulus : '' , 
})

const setActiveTab = (tab) => {
  activeTab.value = tab; 
  if(tab === 'komentar'){
    adaPertanyaan.value = false
  }
}

// const getActiveTab = activeTab.value

const getUser = async () => {
    await profil()
    .then(response => {
        loading.value = true
        pekerjaan.value.id = response.data.username
        username.value = response.data.username
        email.value = response.data.email
        getPekerjaanLokal(username.value)
        getPendidikanLokal(username.value)
        getPertanyaanByUsername(username.value)
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
const openModalPendidikan = async () => {
  showModalPendidikan.value = true
}
const closeModalPendidikan = async () => {
  showModalPendidikan.value = false
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

const getPendidikanLokal = async (username) => {
  await getPendidikan(username)
  .then(response => {
    pendidikan.value.sekolah = response.data.sekolah
    pendidikan.value.jurusan = response.data.jurusan
    pendidikan.value.jenisGelar = response.data.jenisGelar
    pendidikan.value.tahunLulus = response.data.tahunLulus
    pendidikan.value.id = response.data.idKredPendidikan
    iyaPendidikan.value = 'ada'
  })
  .catch(
    iyaPendidikan.value = 'gaada'
  )
}

const getPertanyaanByUsername = async (name) => {
  await getPertanyaan(name)
    .then(async(response) =>{
      // console.log(response.data.data.length);
      console.log("mass")
      adaPertanyaan.value = response.data.data.length >= 3 ? true : false  
      isiTab.value = true
    })
    .catch(error => {
      console.log(error)
      adaPertanyaan.value = false,
      isiTab.value = false
    });
};

onMounted(() => {
  getUser()
  console.log(username.value + "ini orang")

})

const height = computed(() =>{
  return {
    'h-full' : adaPertanyaan.value,
    'h-screen' : !adaPertanyaan.value ,
  }
})

watch(pekerjaan, () => {
  console.log('Data pekerjaan telah berubah:', pekerjaan.value);
})
</script>

<template>
    <div>
        <div class=" bg-gray-700" :class="height"> 
              <div class="flex flex-row justify-between mt-11 ml-20 mr-20 flex-none pt-20">
                <div class="flex container w-3/5">
                  <div
                    class="w-36 h-36 relative flex-none overflow-hidden rounded-full hover:cursor-pointer">
                    <div>
                      <img src="/image/esa.png" class="rounded-md" alt="" style="margin-top: -20px;" />
                    </div>  
                    <div class="absolute top-0 left-0 w-full h-full  items-center justify-center hidden" id="imgSwap">
                      <img alt="" src="" class="w-16 h-16 cursor-pointer" />
                    </div>
                  </div>
        
                  <div class="font-medium ml-5 w-full relative">
                    <div class="flex">
                      <div class="flex-none">
                        <div class="text-white text-3xl">{{ username }}</div>
                      </div>
                    </div>
                    <button
                      class=" absolute w-7 h-7 top-0 left-[70%]  rounded-full overflow-hidden">
                      <img src="/image/share_2.png" alt="" class="object-center mx-auto w-5 h-auto">
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
                        <img src="/image/pen_2.png" alt="" class="w-[12%] ml-[30%]">
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
        
        
                      <button @click="openModalPendidikan" v-if="iyaPendidikan === 'gaada'" class="text-base mt-2 flex hover:underline text-blue-500 gap-2"><img
                          src="/image/mortarboard_2.png" alt="icon pekerjaan" class="w-5 h-5 mr-1 mt-0.5">Tambahkan Kredensial
                        Pendidikan</button>
                        
                        <button @click="openModalPendidikan"  v-else type="button" href="" class="text-base mt-2 flex text-blue-500 gap-2"><img src="/image/mortarboard_2.png"
                          alt="icon pekerjaan" class="w-5 h-5 mr-1 mt-0.5" ><p class=" text-white no-underline">{{ pendidikan.sekolah }} dengan {{pendidikan.jurusan }} dan {{pendidikan.jenisGelar }} sampai {{ pendidikan.tahunLulus }}</p>  <p class=" hover:underline">edit</p> </button>
                        <!-- <ModalPendidikan :closeModal="closeModalPendidikan" :showModal="showModalPendidikan"></ModalPendidikan> -->
                      
                        <ModalPendidikan
                        :tutup-modal="closeModalPendidikan"
                        :show-modal="showModalPendidikan"
                        :data="pendidikan"
                        ></ModalPendidikan>

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
                        <button @click.prevent="setActiveTab('pertanyaan')"
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
                      <!-- <Loading v-if="loading">
                        
                      </Loading> -->

                      <TabPertanyaan
                      :active-tab="activeTab"
                      :isi-tab="isiTab"
                      :nama="username"
                      ></TabPertanyaan>

                      <TabKomentar
                      :active-tab="activeTab"
                      :isi-tab="isiTab"
                      :nama="username"
                      >

                      </TabKomentar>

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
</template>

<style scoped>

</style>