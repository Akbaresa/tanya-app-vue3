<script setup>
import { ref } from 'vue'
import axios from 'axios';

const username = ref('');
const message = ref('');
const messages = ref([]);

const sendMessage = () => {
    axios.post('http://localhost:8082/api/messages', {
        sender: username.value,
        content: message.value,
    })
    .then(response => {
        console.log('Message sent:', response.data);
        fetchMessages();
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
};

const fetchMessages = () => {
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
    <div>
        <div>
            <h1>Vue.js WebSocket Chat</h1>

            <div>
                <label for="username">Username: </label>
                <input v-model="username" type="text" id="username">
            </div>

            <div>
                <label for="message">Message: </label>
                <input v-model="message" type="text" id="message">
                <button @click="sendMessage">Send</button>
            </div>

            <div>
                <h2>Messages</h2>
                <ul>
                    <li v-for="msg in messages" :key="msg.id">{{ msg.sender }}: {{ msg.content }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
