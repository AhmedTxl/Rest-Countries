<template>
    <div>
        <slot v-if="!error"></slot>
        <div v-else class="text-center py-10">
            <AlertCircle class="mx-auto h-12 w-12 text-red-500" />
            <p class="mt-2 text-red-600 dark:text-red-400">{{ error }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue'
import { AlertCircle } from 'lucide-vue-next'

const error = ref(null)

onErrorCaptured((err) => {
    error.value = err.message
    return true
})
</script>