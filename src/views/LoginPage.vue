<script setup>
import {ref} from 'vue'
import {login} from '../api/login'
import Notification from '@/components/Notification.vue';
import { useRouter } from 'vue-router';
import { setCookie  } from '@/api/cookie';
const route = useRouter()
const formData = ref({
    username : '',
    password : ''
})

const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');
 
const postData = async () => {
    if(!formData.value.username || !formData.value.password){
        return notif('form data harus terisi ', 'error')
    }
    await login(formData.value)
    .then(response => {
        const token = response.data.token
        setCookie(token)
        console.log(response)
        notif('pengguna berhasil login' , 'success')
        setTimeout(() => {        
            route.push('/')
        }, 1000)
    })
    .catch(error => {
        console.log(error)
        if (error.response) {
            const errors = error.response.data.errors; 
            notif(errors, 'error')
          }
    })
}

const notif = async ( message , type) => {
  showNotification.value = true;
  notificationMessage.value = message;
  notificationType.value = type;
  setTimeout(() => {
    showNotification.value = false;
  }, 2000)
};
</script>

<template>
    <div>
        <Notification 
        :show="showNotification"
        :message="notificationMessage"
        :type="notificationType"
        />
        <section class=" bg-gray-900 h-screen">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
                <img class="w-12 h-12 mr-2" src="/image/tanya.png" alt="logo">
              </a>
              <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white signup">
                    Login
                  </h1>
                  <form class="space-y-4 md:space-y-6" @submit.prevent="postData">
                    <div>
                      <label for="username" class="block cursor-auto mb-2 text-sm font-medium text-white">Username</label>
                      <input v-model="formData.username" type="text" name="username" id="username"
                        class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                        placeholder="masukkan username" >
                    </div>
                    <div>
                      <label for="password" class="block mb-2 cursor-auto text-sm font-medium text-white">Password</label>
                      <input v-model="formData.password" type="password" name="password" id="password" placeholder="••••••••"
                        class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                        >
                    </div>
        
                    <button type="submit"
                      class="w-full text-white bg-blue-600 cursor-pointer hover:bg-blue-700 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800">Login</button>
                    <p class="text-sm font-light text-gray-500 ">
                      Belum mempunyai Akun? <a href="/signup" class="font-small text-blue-600 hover:underline ">Daftar dulu</a>
                    </p>
                    <!-- Add Google Sign In button here -->
                    <button onclick="signInWithGoogle" id="my-signin2" type="button"
                      class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  hover-bg-red-700 ">
                      Login dengan Google
                    </button>
        
                  </form>
                </div>
              </div>
            </div>
          </section>
    </div>
</template>