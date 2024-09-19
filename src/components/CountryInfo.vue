<template>
  <div :class="{ 'dark': darkMode }" class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Globe class="mr-2 h-6 w-6" /> World Countries
        </h1>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search for a country..."
              class="pl-8 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <Search class="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 h-5 w-5" />
          </div>
          <button
            @click="toggleTheme"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle theme"
          >
            <Sun v-if="darkMode" class="h-5 w-5 text-gray-600 dark:text-gray-300" />
            <Moon v-else class="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </header>
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <ErrorBoundary>
        <Suspense>
          <template #default>
            <CountryList :search-term="debouncedSearchTerm" :dark-mode="darkMode" />
          </template>
          <template #fallback>
            <div class="text-center py-10">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
              <p class="mt-2 text-gray-700 dark:text-gray-300">Loading countries...</p>
            </div>
          </template>
        </Suspense>
      </ErrorBoundary>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Globe, Search, Sun, Moon } from 'lucide-vue-next'
import { useDebounce } from '@vueuse/core'
import CountryList from './CountryList.vue'
import ErrorBoundary from './ErrorBoundry.vue'

const searchTerm = ref('')
const debouncedSearchTerm = useDebounce(searchTerm, 300)
const darkMode = ref(false)

const toggleTheme = () => {
  darkMode.value = !darkMode.value
  localStorage.setItem('theme', darkMode.value ? 'dark' : 'light')
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  darkMode.value = savedTheme === 'dark'
})

watch(darkMode, (newValue) => {
  document.documentElement.classList.toggle('dark', newValue)
})
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Additional styles can be added here if needed */
</style>