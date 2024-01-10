<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink , useRouter } from 'vue-router';
import { ref , onMounted } from 'vue'
import { logout } from '@/api/cookie';

const props = defineProps(['show' , 'username'])
const route = useRouter()
const nama = ref('')

const keluar = async () => {
    logout()
    route.push('/login')
}

onMounted(async () => {
    setTimeout(() => {
        nama.value = props.username 
    },300)
})
</script>

<template>
    <div v-if="show"
    class="z-10 fixed w-[140px] top-12 text-gray-400  divide-y divide-gray-100 rounded-lg shadow w-[calc(100% - 2rem)] bg-gray-700 divide-gray-600 border-2 border-gray-600">
    <ul class="py-2 text-sm text-gray-200">
        <li>
            <RouterLink to="/profile">
                <div class="border-b-2 border-gray-600">
                    <a class="block px-4 py-2 hover:bg-gray-600 hover:text-gray-200">
                        <img src="/image/esa.png" alt="" class="w-12 mb-1 h-12 rounded-full">
                        {{  nama }}
                    </a>
                </div>
            </RouterLink>
        </li>
        <li>
            <a
                class="block px-4 py-2 font-light hover:bg-gray-600 hover:cursor-pointer hover-text-gray-200">Setting</a>
        </li>
        <li>
            <a type="button" @click="keluar"
                class="block px-4 py-2 font-light hover:bg-gray-600 hover:cursor-pointer hover-text-gray-200">Keluar</a>

        </li>
    </ul>
</div>
</template>