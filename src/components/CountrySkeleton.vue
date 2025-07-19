<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <div v-for="n in count" :key="n" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <!-- Flag skeleton -->
            <div class="w-full h-40 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            
            <!-- Content skeleton -->
            <div class="p-4">
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div class="space-y-2">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
                <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded mt-4 animate-pulse"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    count: {
        type: Number,
        default: 12
    }
})
</script> 