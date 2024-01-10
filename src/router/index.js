import { createRouter, createWebHistory } from "vue-router";
import ProfileAllUser from '../components/ProfileAllUser.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path : '/',
            name: 'beranda',
            component: () => import ('../views/Beranda.vue')
        },
        {
            path : '/signup',
            name: 'signup',
            component:() => import ('../views/SignUpPage.vue') 
        },
        {
            path: '/login', 
            name: 'login',
            component : () => import ('../views/LoginPage.vue')
        },
        {
            path: '/profile',
            name : 'profil',
            component : () => import ('../views/ProfilView.vue')
        },
        {
            path : '/chat',
            name :'chat',
            component : () => import ('../views/ChatView.vue')
        },
        {
            path: '/profile/:username' ,
            name :'UserProfile',
            component : ProfileAllUser ,
            props:true
        }
    ]
})

export default router