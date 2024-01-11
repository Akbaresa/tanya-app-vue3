<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { profil } from '@/api/profil'

const username = ref('');
const message = ref('');
const messages = ref([]);

const sendMessage = async () => {
    if(!message.value){
        return
    }
    const response = await profil()
    username.value = response.data.username
    
    axios.post('http://localhost:8082/api/messages', {
        sender: username.value,
        content: message.value,

    })
    .then(response => {
        console.log('Message sent:', response.data);
        message.value = ''
        fetchMessages();
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
};

const fetchMessages = async () => {
    const response = await profil()
    username.value = response.data.username
    axios.get('http://localhost:8082/api/messages')
    .then(response => {
        console.log('Messages received:', response.data);
        messages.value = response.data;
    })
    .catch(error => {
        console.error('Error fetching messages:', error);
    });
};
// Fetch messages on component mount
fetchMessages();
// Fetch messages periodically (for real-time updates)
setInterval(fetchMessages, 5000); // Update every 5 seconds, adjust as needed
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-gray-800">
      <!-- Sidebar -->
      <div class="w-1/4 bg-gray-800 border-r border-gray-300">
        <!-- Sidebar Header -->
        <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-gray-800 text-white">
          <h1 class="text-2xl font-semibold">Chat Web</h1>
          <div class="relative">
            <button id="menuButton" class="focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
              </svg>
            </button>
          </div>
        </header>
        
        <!-- Search List -->
        <div class="p-3">
          <input
            type="text"
            v-model="searchTerm"
            class="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none"
            placeholder="Cari kontak..."
          />
        </div>
        <!-- End Serach List -->
  
        <!-- Contact List -->
        <div class="overflow-y-auto h-screen p-5 mb-9 pb-20">
          <!-- Loop through contacts -->
          <div
            v-for="contact in filteredContacts"
            :key="contact.id"
            @click="displayMessages(contact)"
            class="flex items-center mb-4 cursor-pointer hover:bg-gray-600 p-2 rounded-md">
            <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <!-- Use contact avatar here -->
              <img :src="contact.avatar" alt="User Avatar" class="w-12 h-12 rounded-full">
            </div>
            <div class="flex-1">
              <h2 class="text-white font-semibold">{{ contact.name }}</h2>
              <p class="text-white">{{ contact.lastMessage }}</p>
            </div>
          </div>
          </div>  
        </div>
          
          <!-- Main Chat Area -->
          <div class="flex-1">
              <!-- Chat Header -->
              <header class="bg-gray-800 p-4 text-white">
                  <h1 class="text-2xl font-semibold">{{ username }}</h1>
                </header>
                <div class="border border-b border-cyan-500"></div>
              
              <!-- Chat Messages -->
              <div class="h-screen overflow-y-auto p-4 pb-36">
                 <!-- Incoming Message -->
                 <div v-for="msg in messages" :key="msg.id"  class="">
                     <div v-if="username !== msg.sender"  class="flex mb-4 cursor-pointer">
                       <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                         <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-8 h-8 rounded-full">
                       </div>
                       <div class="flex max-w-96 bg-pink-600 rounded-lg p-3 gap-3">
                         <p class="text-white"> {{ msg.content }}
                         </p>
                       </div>
                     </div>
                 
                 
               
                <div v-if="username === msg.sender" class="flex justify-end mb-4 cursor-pointer">
                    <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                      <p> {{ msg.content }}</p>
                    </div>
                    <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                      <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" class="w-8 h-8 rounded-full">
                    </div>
                  </div>
               </div>  


                 
              </div>
              
              <!-- Chat Input -->
              <footer class="bg-gray-800 border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                  <div class="flex items-center">
                      <input v-model="message" type="text" placeholder="Type a message..." class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500">
                      <button @click="sendMessage" class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                  </div>
              </footer>
          </div>
      </div>
  </template>
  