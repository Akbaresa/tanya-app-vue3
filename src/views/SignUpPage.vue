<script setup>
import { signup } from '../api/signup'
import { ref } from 'vue';
import Notification from '../components/Notification.vue'

const formData = ref({
  username : '',
  email : '',
  password : '',
  confirmPassword : '',
  terms : false
})

const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');


const postData = async () => {
    if(!formData.value.username || !formData.value.email || !formData.value.password || !formData.value.confirmPassword){
      return notif("form data harus terisi" , "error")
    }
    else if (formData.value.password.length > 6 || formData.value.password.length > 6){
      return notif("panjang password maksimal 6" , "error")
    }
    else if(formData.value.password !== formData.value.confirmPassword ){
      return notif("password harus sama" , "error")
    }
    else if(!formData.value.terms ){
      return notif("terms dan kondisi harus di ceklist" , "error")
    }
    const data = ({
      username : formData.value.username ,
      password : formData.value.password,
      email : formData.value.email 
    })
    await signup(data)
    .then(response => {
      console.log(response)
      notif('pengguna berhasil terdaftar' , 'success')
      
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
  <meta name="google-signin-client_id"
  content="1006870554827-sgofe1fj6gdjmqq8ir1ga1nf5ivba604.apps.googleusercontent.com">
  <Notification
  :show="showNotification"
  :message="notificationMessage"
  :type="notificationType"
  />

  <section class=" bg-gray-900 body h-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
        <img class="w-8 h-8 mr-2" src="/image/tanya.png" alt="logo">
      </a>
      <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white signup">
            Buat sebuah akun
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="postData">
            <div>
              <label for="username" class="block mb-2 text-sm font-medium text-white">Username</label>
              <input v-model="formData.username" type="text" name="username" id="username"
                class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                placeholder="masukkan username" >
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
              <input v-model="formData.email" type="email" name="email" id="email"
                class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                placeholder="nama@gmail.com" >
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
              <input v-model="formData.password" type="password" name="password" id="password" placeholder="••••••••"
                class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                >
            </div>
            <div>
              <label for="confirm" class="block mb-2 text-sm font-medium text-white">Konfirmasi Password</label>
              <input v-model="formData.confirmPassword" type="password" name="confirm" id="confirm" placeholder="••••••••"
                class=" border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white "
                >
            </div>
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input v-model="formData.terms" id="terms" aria-describedby="terms" type="checkbox"
                  class="w-4 h-4 border cursor-pointer rounded focus:ring-3  bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                  >
              </div>
              <div class="ml-3 text-sm ">
                <label for="terms" class="font-light text-gray-500 ">Saya menerima <a
                    class="font-small cursor-pointer text-blue-600 hover:underline" href="#">Ketentuan dan
                    Kondisi</a></label>
              </div>
            </div>
            <button type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 ">Buat
              Akun</button>
          <p class="text-sm font-light text-gray-500 ">
            Sudah mempunyai Akun? <a href="/login" class="font-small text-blue-600 hover:underline ">Sini Login</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
</template>


<style lang="scss" scoped></style>