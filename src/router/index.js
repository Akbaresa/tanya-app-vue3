import { createRouter, createWebHistory } from "vue-router";
import ProfileAllUser from '../components/ProfileAllUser.vue'
import { getTokenCookie } from "@/api/cookie";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path : '/',
            name: 'beranda',
            component: () => import ('../views/Beranda.vue'),
            meta: { requiresAuth: true },
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
            component : () => import ('../views/ProfilView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path : '/chat',
            name :'chat',
            component : () => import ('../views/ChatView.vue') ,
            meta: { requiresAuth: true },
        },
        {
            path: '/profile/:username' ,
            name :'UserProfile',
            component : ProfileAllUser ,
            props:true ,
            meta: { requiresAuth: true },
        }
    ]
})

// Middleware untuk melindungi rute
const authMiddleware = (to, from, next) => {
    const isAuthenticated = getTokenCookie(); 
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
        next('/login');
      } else {
        next();
      }
    } else {
      next();
    }
  };


router.beforeEach(authMiddleware);

export default router
