<template>
    <div ref="imageRef" class="relative">
        <img v-if="isLoaded" :src="src" :alt="alt" class="w-full h-40 object-cover transition-opacity duration-300 ease-in-out"
            :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }" />
        <div v-show="!isLoaded" class="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        default: ''
    }
})

const isLoaded = ref(false)
const imageRef = ref(null)

const loadImage = () => {
    if (isLoaded.value) return // Prevent duplicate loading
    
    const img = new Image()
    img.src = props.src
    img.onload = () => {
        isLoaded.value = true
    }
    img.onerror = () => {
        console.error(`Failed to load image: ${props.src}`)
    }
}

onMounted(() => {
    loadImage()
})

useIntersectionObserver(imageRef, ([{ isIntersecting }]) => {
    if (isIntersecting && !isLoaded.value) {
        loadImage()
    }
})
</script>