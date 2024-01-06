<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import Profil from './ModalProfil.vue';
import ModalPertanyaan from './ModalPertanyaan.vue';
import { profil } from '@/api/profil';

const username = ref('')
const tampil = ref(false)
const tampilProfil = ref(false)

const getUser = async () => {
    await profil()
    .then(response => {
        return username.value = response.data.username
    })
    .catch(error => {
        console.log(error)
        console.log('orang salah')
    })
}
const showModal = async () => {
    tampil.value = true 
    tampilProfil.value = false 
}
const showModalProfil = async () => {
    tampilProfil.value = tampilProfil.value === false ?  true : false
    closeModal()
}
const closeModal = async () => {
    tampil.value = false
}


onMounted(() => {
    username.value = getUser()
})
</script>

<template>
    <div>
        <ModalPertanyaan :show-modal="tampil" :close-modal="closeModal" />
        <nav class=" bg-gray-900 fixed w-full h-20 z-20 top-0 left-0 border-b border-gray-600">
            <div class="w-full flex items-center justify-between md:justify-evenly py-4 ">
                <div class="basis-44 md:basis-64 lg:basis-72 flex item-center justify-center gap-x-2.5 ">
                    <img src="/image/tanya.png" class="h-8" alt="Tanya Logo" />
                    <span class="text-2xl font-semibold whitespace-nowrap text-white ">Tanya</span>
                </div>
                <div class="flex-1 flex justify-end md:justify-center">
                    <ul
                        class="flex flex-row font-medium rounded-lg overflow-hidden mr-3 gap-x-2 md:gap-x-4 lg:gap-x-8 md:bg-gray-900">
                        <li class="flex items-center justify-center">
                            <RouterLink f="#" to="/"
                                class="text-white cursor-pointer bg-blue-700 rounded md:bg-transparent md:text-blue-700"
                                aria-current="page">
                                <img src="/image/home linear.png" class="w-7 h-7" alt="">
                            </RouterLink>
                        </li>
                        <li class="flex items-center justify-end gap-x-2.5">
                            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search"
                                aria-expanded="false"
                                class="md:hidden text-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-4  focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1 ml-3">
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span class="sr-only">Search</span>
                            </button>
                            <div class="relative hidden md:block">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 " aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"                      
                                            stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                    <span class="sr-only">Search icon</span>
                                </div>
                                <div>
                                    <input type="text" id="searchInput"
                                        class="hidden md:block w-full p-2 pl-10 text-sm  border  rounded-lg  focus:ring-blue-500 text-white bg-gray-700 border-gray-600 placeholder-gray-400  focus:border-blue-500"
                                        placeholder="Cari...">
                                </div>
                            </div>
                        </li>
                        <li class="relative overflow-hidden">
                            <button id="dropdownUserAvatarButton" 
                            @click="showModalProfil"
                            data-dropdown-toggle="dropdownAvatar"
                                class="flex items-center justify-center text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-600"
                                type="button">
                                <span class="sr-only">Open user menu</span>
                                <img class="w-10 h-10 rounded-full" src="/image/esa.png" alt="user photo">
                            </button>
                            
                            <Profil :show="tampilProfil" :username="username" />

                        </li>
    
                        <button type="button"
                            class="text-white flex items-center justify-center w-10 h-10 lg:w-48 md:w-52 transition-width duration-200 ease-in-out focus:ring-4  font-medium rounded-lg text-xs md:text-sm  text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 focus:outline-none"
                            data-modal-target="authentication-modal" data-modal-toggle="authentication-modal"
                            @click="showModal">
                            <p class="hidden md:block truncate">Tambah Pertanyaan</p>
                            <img src="/image/Plus.png" class="pl-2 md:mx-0" alt="">
                        </button>
                    </ul>
                </div>
            </div>
        </nav>    
    </div>
</template>