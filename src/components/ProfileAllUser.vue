<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';

const router = getCurrentInstance().appContext.config.globalProperties.$router;
const username = ref('');

onMounted(() => {
  // Pastikan bahwa route.params.username sudah terdefinisi sebelum mengaksesnya
  if (router.currentRoute.value.params.username) {
    username.value = router.currentRoute.value.params.username;
  }
});
</script>

<template>
    <div>
        <h1>{{ username }}</h1>
    </div>
</template>