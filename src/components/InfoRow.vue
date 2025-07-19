<template>
    <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ label }}</dt>
        <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
            {{ value || 'N/A' }}
        </dd>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    value: String
})
</script>
