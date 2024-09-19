<template>
    <div>
        <div v-if="filteredCountries.length === 0" class="text-center py-10">
            <p class="text-gray-700 dark:text-gray-300">No countries found matching your search.</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <div v-for="country in visibleCountries" :key="country.cca3"
                class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                <LazyImage :src="country.flags.svg" :alt="`Flag of ${country.name.common}`"
                    class="w-full h-40 object-cover" />
                <div class="p-4">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ country.name.common }}</h2>
                    <p class="text-gray-600 dark:text-gray-300"><strong>Capital:</strong> {{ country.capital?.[0] ||
                        'N/A' }}</p>
                    <p class="text-gray-600 dark:text-gray-300"><strong>Population:</strong> {{
                        formatPopulation(country.population) }}</p>
                    <p class="text-gray-600 dark:text-gray-300"><strong>Region:</strong> {{ country.region }}</p>
                    <router-link :to="`/country/${country.cca3}`"
                        class="mt-4 block w-full bg-blue-500 hover:bg-blue-600 text-white text-center font-semibold py-2 px-4 rounded-md transition duration-200">
                        Learn More
                    </router-link>
                </div>
            </div>
        </div>
        <div ref="loadMoreTrigger" class="h-10 mt-4" v-if="visibleCountries.length < filteredCountries.length"></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import LazyImage from './LazyImage.vue'

const props = defineProps({
    searchTerm: {
        type: String,
        default: ''
    },
    darkMode: {
        type: Boolean,
        default: false
    }
})

const countries = ref([])
const visibleCount = ref(12)
const loadMoreTrigger = ref(null)

const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all')
    if (!response.ok) {
        throw new Error('Failed to fetch countries')
    }
    return await response.json()
}

const filteredCountries = computed(() => {
    return countries.value.filter(country =>
        country.name.common.toLowerCase().includes(props.searchTerm.toLowerCase())
    )
})

const visibleCountries = computed(() => {
    return filteredCountries.value.slice(0, visibleCount.value)
})

const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population)
}

onMounted(async () => {
    countries.value = await fetchCountries()
})

useIntersectionObserver(loadMoreTrigger, ([{ isIntersecting }]) => {
    if (isIntersecting) {
        visibleCount.value += 12
    }
})

watch(() => props.searchTerm, () => {
    visibleCount.value = 12
    nextTick(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
})
</script>