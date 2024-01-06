<script setup>
import { ref, defineProps , onMounted } from 'vue';
import { tambahPekerjaan, updatePekerjaan } from '@/api/pekerjaan'
import Notification from './Notification.vue';

const props = defineProps({
    showModal : Boolean , 
    tutupModal: Function ,
    data: Object
})

const ada = ref(false)
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');

const posisi = ref('')
const perusahaan = ref('')
const tahunMulai = ref('')
const tahunSelesai = ref('')
const id = ref('')


const postData = async () => {
    if (!perusahaan.value || !posisi.value || !tahunMulai.value || !tahunSelesai.value){
        return notif('form data harus terisi' , 'error')
    }
    try {
        const formData = ref({
          posisi : posisi.value,
          perusahaan : perusahaan.value,
          tahunMulai : tahunMulai.value,
          tahunSelesai : tahunSelesai.value
        })
        if(ada.value){
          await updatePekerjaan(formData.value , id.value)
            .then(response => {
                posisi.value = response.data.posisi,
                perusahaan.value = response.data.perusahaan,
                tahunMulai.value = response.data.tahunMulai,
                tahunSelesai.value = response.data.tahunSelesai
                ada.value = 'ada'
                return notif('berhasil menambahkan pekerjaan' , 'success')
            })
            .catch(error => {
                if (error.response) {
                    const errors = error.response.data.errors; 
                    notif(errors, 'error')
                }
            })
          }else {
          await tambahPekerjaan(formData.value)
          .then(response => {
              posisi.value = response.data.posisi,
              perusahaan.value = response.data.perusahaan,
              tahunMulai.value = response.data.tahunMulai,
              tahunSelesai.value = response.data.tahunSelesai
              ada.value = 'ada'
              return notif('berhasil menambahkan pekerjaan' , 'success')
          })
          .catch(error => {
              if (error.response) {
                  const errors = error.response.data.errors; 
                  notif(errors, 'error')
              }
          })

        }
    }catch(error){
        console.log(error)
    }
}



const notif = async ( message , type) => {
  showNotification.value = true;
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    showNotification.value = false;
  }, 2000)
};

onMounted(() => {
  console.log(ada.value)
  setTimeout(() => {
    if (props.data.posisi !== '') {
      ada.value = true;
      console.log(ada.value + "ada")
      posisi.value = ada.value === true ? props.data.posisi : ''
      perusahaan.value = ada.value === true ? props.data.perusahaan : ''
      tahunMulai.value = ada.value === true ? props.data.tahunMulai : ''
      tahunSelesai.value = ada.value === true ? props.data.tahunSelesai : ''
      id.value = ada.value === true ? props.data.id : ''
      console.log(id.value)
    }
  }, 300);
});


</script>

<template>
    <div>
        <div>
            <Notification
                :show="showNotification"
                :message="notificationMessage"
                :type="notificationType"
                :mundur="'iya'"
            />
            <div id="authentication-modal" v-if="showModal && !ada" tabindex="-1" aria-hidden="true"
              class=" fixed overflow-hidden overflow-y-auto top-20 left-0 right-0 flex justify-center items-center  ">
              <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700  border border-gray-500">
                  <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      Tambahkan Kredensial Pekerjaan
                    </h3>
                    <button @click="tutupModal" type="button"
                      class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                  <!-- Modal body -->
                  <div class="p-4 md:p-5" >
                    <form class="space-y-4"  @submit.prevent="postData">
                      <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Posisi</label>
                        <input v-model="posisi" type="text" name="posisi"
                         id="posisi"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="posisi di perusahaan" >
                      </div>
                      <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Perusahaan</label>
                        <input v-model="perusahaan" type="text" name="perusahaan" id="perusahaan"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="nama perusahaan" >
                      </div>
                      <label class="block text-sm font-medium text-gray-900 dark:text-white">tanggal mulai</label>
                      <div class="relative max-w-sm">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                          </svg>
                        </div>
                        <input v-model="tahunMulai" ref="datepicker" type="date" id="datePickerId"
                        
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select date" />
                      </div>
                      <label class="block text-sm font-medium text-gray-900 dark:text-white">tanggal selesai</label>
                      <div class="relative max-w-sm">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                          </svg>
                        </div>
                        <input v-model="tahunSelesai" ref="datepicker" type="date"
                          class="bg-gray-50 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Select date" />
                      </div>
        
                      <div class="flex justify-between">
                        <div class="flex items-start">
                        </div>
                      </div>
                      <button type="submit"
                        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>

<style scoped>

</style>