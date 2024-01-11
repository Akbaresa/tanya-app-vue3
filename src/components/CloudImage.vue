<template>
    <img :src="url" alt="" class="max-w-sm">
</template>

<script>
import { storage } from "@/api/firebase";
import { getDownloadURL, ref } from "firebase/storage";

export default {
    props:{
        path: String
    },
    data: () => {
        return {
            url: 'https://placehold.co/200'
        }
    },
    mounted(){
        getDownloadURL(ref(storage , this.path))
        .then((download_url) => {
            this.url = (this.url = download_url)
        })
    }
}
</script>

<style scoped>

</style>
