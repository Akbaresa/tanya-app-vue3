<template>
    <div>
      <img :src="url" alt="" class="max-w-sm">
    </div>
  </template>
  
  <script setup>
  import { onMounted , defineProps } from "vue";
  import { storage } from "@/api/firebase";
  import { getDownloadURL, ref } from "firebase/storage";
  
 const props = defineProps({
    path : String
 });
  const url = ref('https://placehold.co/200');
  
  onMounted(() => {
    getDownloadURL(ref(storage, props.path))
      .then((download_url) => {
        console.log(download_url)
        url.value = download_url;
      })
      .catch((error) => {
        console.error('Error fetching download URL:', error);
      });
  });
  </script>
  
  <style  scoped>
  </style>
  