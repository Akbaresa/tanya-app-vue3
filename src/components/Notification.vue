<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps(
    { 
        show : Boolean, 
        message : String , 
        type : String ,
        mundur : {
          type :String,
          required : false
        }
    }
);

const notificationClasses = computed(() => {
  return {
    'overflow-hidden': true,
    'z-90' : true,
    'fixed': true,
    'top-12': true,
    'mt-9' : props.mundur === 'iya' , 
    'right-6': true,
    'space-y-4': true,
    'dark:bg-teal-800/30': props.type === 'success',
    'bg-teal-50': props.type === 'success',
    'border-t-2': props.type === 'success',
    'border-teal-500': props.type === 'success',
    'dark:bg-red-800/30': props.type === 'error',
    'bg-red-50': props.type === 'error',
    'border-s-4': props.type === 'error',
    'border-red-500': props.type === 'error',
    'rounded-lg': true,
    'p-4': true,
  };
});

const iconNamespace = computed(() => props.type === 'success' ? "http://www.w3.org/2000/svg" : "http://www.w3.org/2000/svg");
const iconStroke = computed(() => props.type === 'success' ? "currentColor" : "currentColor");

const iconPath = computed(() => props.type === 'success' ? 
"M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" : "M18 6 6 18m6 6 12 12");

const iconClasses = computed(() => {
  return {
    'inline-flex': true,
    'justify-center': true,
    'items-center': true,
    'w-8': true,
    'h-8': true,
    'rounded-full': true,
    'border-4': true,
    'dark:border-teal-900': props.type === 'success',
    'dark:bg-teal-800': props.type === 'success',
    'dark:text-teal-400': props.type === 'success',
    'border-teal-100': props.type === 'success',
    'bg-teal-200': props.type === 'success',
    'text-teal-800': props.type === 'success',
    'dark:border-red-900': props.type === 'error',
    'dark:bg-red-800': props.type === 'error',
    'dark:text-red-400': props.type === 'error',
    'border-red-100': props.type === 'error',
    'bg-red-200': props.type === 'error',
    'text-red-800': props.type === 'error',
  };
});

const titleClasses = computed(() => {
  return {
    'text-gray-800': true,
    'font-semibold': true,
    'dark:text-white': true,
  };
});

const messageClasses = computed(() => {
  return {
    'text-sm': true,
    'text-gray-700': true,
    'dark:text-gray-400': true,
  };
});



</script>

<template>
    <transition name="notification-slide">
      <div :class="notificationClasses " v-if="show" role="alert">
        <div class="flex">
          <div class="flex-shrink-0">
            <span :class="iconClasses">
              <svg class="flex-shrink-0 w-4 h-4" :xmlns="iconNamespace" width="24" height="24" viewBox="0 0 24 24" fill="none" :stroke="iconStroke" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path :d="iconPath" />
              </svg>
            </span>
          </div>
          <div class="ms-3">
            <h3 :class="titleClasses">
              {{ type }}
            </h3>
            <p :class="messageClasses">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  
  <style scoped>
  .notification-slide-enter-active, .notification-slide-leave-active {
    transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.5s ease-in-out;
  }
  .notification-slide-enter, .notification-slide-leave-to {
    transform: translateX(50%);
    opacity: 0;
  }
  </style>
  