<script setup>
import { ref , defineProps } from 'vue'
import { tambahPertanyaan } from '@/api/pertanyaan';
import Notification from './Notification.vue';
import { storage } from "@/api/firebase";
import { uploadBytes  , ref as firebaseRef } from "firebase/storage";
import { tambahGambar } from '@/api/image'
// import { axios } from 'axios'


const activeTab = ref('profile')

const props = defineProps({
    showModal: Boolean,
    closeModal : Function
})
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');

const imagePreview = ref(null);
const selectedImage = ref(null);
const postDataGambar = ref({
  namaGambar: null,
  path: null,
});
const inputElement = ref(null);
const fileInputRef = ref(null);

const notif = async ( message , type) => {
  showNotification.value = true;
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    showNotification.value = false;
  }, 2000)
};

const header = ref('')
const deskripsi = ref('')

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const postData = async () => {
    const data = ref({
        header: header.value,
        deskripsi : deskripsi.value
    })
    if(!deskripsi.value || !header.value){
        return notif('form data harus terisi ' , 'error')
    }
    await tambahPertanyaan(data.value)
    .then(async(response) => {
        // console.log(response.data.data.id)
        header.value = ''
        deskripsi.value = ''
        uploadImage(response.data.data.id)
        props.closeModal()
        return notif('pertanyaan berhasil terkirim' , 'success')

    })
    .catch(error => {
      if (error.response) {
            const errors = error.response.data.errors; 
            notif(errors, 'error')
          }
    })
}

const handleImageUpload = (event) => {
  const file = event.target.files[0];

  if (file) {
    const imageUrl = URL.createObjectURL(file);
    fileInputRef.value = event.target;
    imagePreview.value = imageUrl;
    selectedImage.value = file;
    inputElement.value = event.target
  }
};

const removeImagePreview = () => {
  imagePreview.value = null;
  selectedImage.value = null;

  if (inputElement.value) {
    inputElement.value.value = null;
  }
};

const uploadImage = async (idPertanyaan) => {
    const fileInput = fileInputRef.value.files[0];
    if (selectedImage.value) {
        const pathGambar = `folder/${idPertanyaan}.png`;
        const storageRef = firebaseRef(storage, pathGambar);

        await uploadBytes(storageRef, fileInput)
        .then((snapshot) => {
            console.log("berhasil");
            console.log(snapshot);
        });
        postDataGambar.value.namaGambar = idPertanyaan;
        postDataGambar.value.path = pathGambar;

        try {
        const response = await tambahGambar(idPertanyaan, postDataGambar.value);

        console.log('Gambar berhasil diunggah:', response.data);
        // Tambahkan logika lain yang diperlukan setelah unggah gambar berhasil
        } catch (error) {
        console.error('Error mengunggah gambar:', error);
        // Tambahkan logika lain yang diperlukan jika terjadi kesalahan
        }
  }
};
</script>

<template>    
    <Notification
    :show="showNotification"
    :message="notificationMessage"
    :type="notificationType"
    :mundur="'iya'"
    />
    <div class="fixed overflow-hidden overflow-y-auto top-20 left-0 right-0 flex justify-center items-center"
    v-if="showModal" aria-hidden="true">
    <div
        class="relative rounded-lg shadow bg-gray-700 w-full max-w-2xl border border-solid border-gray-500 p-4">
        <button @click="closeModal" type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
            data-modal-hide="authentication-modal">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
            <h3 class="mb-4 text-xl font-medium text-white">Tambah Pertanyaan</h3>
            <form class="space-y-6" action="#" @submit.prevent="postData">
                <div class="">
                    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-white"
                        id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li class="mr-2" role="presentation">
                            <button @click="setActiveTab('profile')"
                                :class="{ 'text-blue-400': activeTab === 'profile', 'border-blue-700': activeTab === 'profile' }"
                                id="profile-tab" :aria-selected="activeTab === 'profile'"
                                class="inline-block p-4 border-b-2 hover:text-blue-400 hover:border-blue-700  rounded-t-lg "
                                data-tabs-target="#profile" type="button" role="tab">Tambah
                                Pertanyaan</button>
                        </li>
                        <li class="mr-2" role="presentation">
                            <button @click="setActiveTab('dashboard')"
                                :class="{ 'text-blue-400': activeTab === 'dashboard', 'border-blue-700': activeTab === 'dashboard' }"
                                id="dashboard-tab" role="tab"
                                :aria-selected="activeTab === 'dashboard'"
                                class="inline-block p-4 border-b-2  rounded-t-lg hover:border-blue-700 hover:text-blue-400 "
                                data-tabs-target="#dashboard" type="button">Informasi
                                Tambahan </button>
                        </li>
                    </ul>
                    <div class=" p-4 rounded-lg  bg-gray-700 " v-if="activeTab === 'profile'"
                        id="profile-content" role="tabpanel" aria-labelledby="profile-tab">
                        <input name="header" autocomplete="off" type="text"
                            v-model="header"
                            class=" mt-3 border text-gray-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 "
                            placeholder="Awali Pertanyaan Anda" >
                    </div>
                    <div class=" p-4 rounded-lg  bg-gray-700" v-if="activeTab === 'dashboard'"
                        id="dashboard-content" role="tabpanel" aria-labelledby="dashboard-tab">
                        <div
                            class="w-full mb-4 border  rounded-lg  bg-gray-700 border-gray-600">
                            <div
                                class="flex items-center justify-between px-3 py-2 border-b border-gray-600">
                                <div
                                    class="flex flex-wrap items-center  sm:divide-x divide-gray-600">
                                    <div class="flex items-center space-x-1 sm:pr-4">
                                        <button type="button"
                                            class="p-2 text-gray-500 rounded cursor-pointer  text-gray-40 hover:text-white hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 12 20">
                                                <path stroke="currentColor"
                                                    stroke-linejoin="round" stroke-width="2"
                                                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
                                            </svg>
                                            <span class="sr-only">Attach file</span>
                                        </button>
                                        <button type="button"
                                            class="p-2 text-gray-500 rounded cursor-pointer    hover:text-white hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 16 20">
                                                <path
                                                    d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                            </svg>
                                            <span class="sr-only">Embed map</span>
                                        </button>
                                        <button type="button"
                                            class="p-2 text-gray-500 rounded cursor-pointer    hover:text-white hover:bg-gray-600">
                                            <label for="imageInput"
                                                class=" text-gray-500 rounded cursor-pointer hover:text-white hover:bg-gray-600">
                                                <svg class="w-4 h-4" aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor" viewBox="0 0 16 20">
                                                    <path
                                                        d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                                                    <path
                                                        d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                                                </svg>
                                                <span class="sr-only">Upload image</span>
                                            </label>
                                            <input id="imageInput" type="file"  class="hidden"
                                                ref="imageInput" @change="handleImageUpload"
                                                accept="image/*" />
                                        </button>
                                        <button type="button"
                                            class="p-2 text-gray-500 rounded cursor-pointer    hover:text-white hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 16 20">
                                                <path
                                                    d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                                <path
                                                    d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                                            </svg>
                                            <span class="sr-only">Format code</span>
                                        </button>
                                        <button type="button"
                                            class="p-2 text-gray-500 rounded cursor-pointer    hover:text-white hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                                            </svg>
                                            <span class="sr-only">Add emoji</span>
                                        </button>
                                    </div>
                                    <div class="flex flex-wrap items-center space-x-1 sm:pl-4">
                                        <button type="button"
                                            class="p-2 text-gray-500 rounded cursor-pointer    hover:text-white hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" fill="none"
                                                viewBox="0 0 21 18">
                                                <path stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2"
                                                    d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4" />
                                            </svg>
                                            <span class="sr-only">Add list</span>
                                        </button>
                                        <button type="button"
                                            class="p-2 text-gray-500 rounded cursor-pointer    hover:text-white hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                            </svg>
                                            <span class="sr-only">Settings</span>
                                        </button>
                                        <button type="button"
                                            class="p-2 text-gray-500 rounded cursor-pointer    hover:text-white hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M18 2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2ZM2 18V7h6.7l.4-.409A4.309 4.309 0 0 1 15.753 7H18v11H2Z" />
                                                <path
                                                    d="M8.139 10.411 5.289 13.3A1 1 0 0 0 5 14v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .7-.288l2.886-2.851-3.447-3.45ZM14 8a2.463 2.463 0 0 0-3.484 0l-.971.983 3.468 3.468.987-.971A2.463 2.463 0 0 0 14 8Z" />
                                            </svg>
                                            <span class="sr-only">Timeline</span>
                                        </button>
                                        <button type="button"
                                            class="p-2 text-gray-500 rounded cursor-pointer    hover:text-white hover:bg-gray-600">
                                            <svg class="w-4 h-4" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                                <path
                                                    d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                            </svg>
                                            <span class="sr-only">Download</span>
                                        </button>
                                    </div>
                                </div>
                                <button type="button" data-tooltip-target="tooltip-fullscreen"
                                    class="p-2 text-gray-500 rounded cursor-pointer sm:ml-auto    hover:text-white hover:bg-gray-600">
                                    <svg class="w-4 h-4" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 19 19">
                                        <path stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="2"
                                            d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5" />
                                    </svg>
                                    <span class="sr-only">Full screen</span>
                                </button>
                                <div id="tooltip-fullscreen" role="tooltip"
                                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300  rounded-lg shadow-sm opacity-0 tooltip bg-gray-700">
                                    Show full screen
                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                </div>
                            </div>
                            <div class="px-4 py-2 bg-gray-800 rounded-b-lg ">

                                <textarea id="editor" rows="8" v-model="deskripsi"
                                    class="block w-full px-0 text-sm text-gray-200  border-0 bg-gray-800 focus:ring-0  placeholder-gray-400"
                                    placeholder="Tulis tambahan isi" ></textarea>

                                <div v-if="imagePreview">
                                    <img :src="imagePreview" alt="Preview"
                                        class="w-24 object-cover rounded" />
                                    <button @click="removeImagePreview"
                                        class="p-2 bg-red-500 text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                            height="16" fill="currentColor" class="bi bi-x-lg"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                                        </svg>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit"
                    class="max-w-screen-sm ml-3 text-white  hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600  focus:ring-blue-800">Tambahkan</button>
                <div class="text-sm font-medium mt-3 ">
                    <a href="#" @click="closeModal"
                        class="hover:underline text-red-500">Batal</a>
                </div>
            </form>
        </div>
    </div>
</div>
</template>