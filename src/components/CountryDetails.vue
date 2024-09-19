<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <button @click="$router.back()"
                class="mb-6 flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft class="mr-2" />
                Back
            </button>
            <div v-if="loading" class="text-center py-10">
                <div
                    class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-white">
                </div>
                <p class="mt-2 text-gray-700 dark:text-gray-300">Loading country details...</p>
            </div>
            <div v-else-if="error" class="text-center py-10">
                <AlertCircle class="mx-auto h-12 w-12 text-red-500" />
                <p class="mt-2 text-red-600 dark:text-red-400">{{ error }}</p>
            </div>
            <div v-else-if="country" class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ country.name.common }}</h1>
                    <img :src="country.flags.svg" :alt="`Flag of ${country.name.common}`"
                        class="h-16 w-24 object-cover" />
                </div>
                <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200 sm:dark:divide-gray-700">
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Population</dt>
                            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{
                                formatPopulation(country.population) }}</dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Region</dt>
                            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{
                                country.region }}</dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Sub Region</dt>
                            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{
                                country.subregion }}</dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Capital</dt>
                            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{
                                country.capital?.[0] || 'N/A' }}</dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Top Level Domain</dt>
                            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{{
                                country.tld?.[0] || 'N/A' }}</dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Currencies</dt>
                            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {{ Object.values(country.currencies || {}).map(c => c.name).join(', ') || 'N/A' }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Languages</dt>
                            <dd class="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                                {{ Object.values(country.languages || {}).join(', ') || 'N/A' }}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div class="px-4 py-5 sm:px-6">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Border Countries:</h2>
                    <div v-if="country.borders" class="flex flex-wrap gap-2">
                        <router-link v-for="border in country.borders" :key="border"
                            :to="`/country/${border}`"
                            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200">
                            {{ getBorderCountryName(border) }}
                        </router-link>
                    </div>
                    <h1 v-else class=" text-base font-medium text-gray-500 dark:text-gray-400">{{ country.name.common }} has no borders</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, AlertCircle } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const country = ref(null)
const loading = ref(true)
const error = ref(null)
const allCountries = ref([])

const formatPopulation = (population) => {
    return new Intl.NumberFormat().format(population)
}

const getBorderCountryName = (code) => {
    const borderCountry = allCountries.value.find(c => c.cca3 === code)
    return borderCountry ? borderCountry.name.common : code
}

const fetchCountryDetails = async (code) => {
    try {
        loading.value = true
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        if (!response.ok) {
            throw new Error('Failed to fetch country details')
        }
        const data = await response.json()
        country.value = data[0]
        loading.value = false
    } catch (err) {
        error.value = 'An error occurred while fetching country details. Please try again later.'
        loading.value = false
    }
}

const fetchAllCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        if (!response.ok) {
            throw new Error('Failed to fetch countries')
        }
        allCountries.value = await response.json()
    } catch (err) {
        console.error('Error fetching all countries:', err)
    }
}

onMounted(() => {
    fetchCountryDetails(route.params.code)
    fetchAllCountries()
})

watch(() => route.params.code, (newCode) => {
    fetchCountryDetails(newCode)
})
</script>