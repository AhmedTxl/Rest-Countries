<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <button @click="$router.back()" 
                class="mb-6 flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <ArrowLeft class="mr-2" />
                Back
            </button>

            <!-- Loading State -->
            <div v-if="loading" class="text-center py-10">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                <p class="mt-2 text-gray-700 dark:text-gray-300">Loading country details...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-10">
                <AlertCircle class="mx-auto h-12 w-12 text-red-500" />
                <p class="mt-2 text-red-600 dark:text-red-400">{{ error }}</p>
            </div>

            <!-- Country Details -->
            <div v-else-if="country" class="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ country.name.common }}</h1>
                    <img :src="country.flags.svg" :alt="`Flag of ${country.name.common}`" class="h-16 w-24 object-cover" />
                </div>

                <div class="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200 sm:dark:divide-gray-700">
                        <InfoRow label="Population" :value="formatPopulation(country.population)" />
                        <InfoRow label="Region" :value="country.region" />
                        <InfoRow label="Sub Region" :value="country.subregion" />
                        <InfoRow label="Capital" :value="formatCapital(country.capital)" />
                        <InfoRow label="Top Level Domain" :value="formatTopLevelDomain(country.tld)" />
                        <InfoRow label="Currencies" :value="formatCurrency(country.currencies)" />
                        <InfoRow label="Languages" :value="formatLanguages(country.languages)" />
                    </dl>
                </div>

                <!-- Border Countries -->
                <div class="px-4 py-5 sm:px-6">
                    <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Border Countries:</h2>
                    <div v-if="country.borders?.length" class="flex flex-wrap gap-2">
                        <router-link 
                            v-for="border in borderCountries" :key="border.cca3" 
                            :to="`/country/${border.cca3}`"
                            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200">
                            {{ border.name.common }}
                        </router-link>
                    </div>
                    <p v-else class="text-base font-medium text-gray-500 dark:text-gray-400">
                        {{ country.name.common }} has no borders.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, AlertCircle } from 'lucide-vue-next'
import InfoRow from '../components/InfoRow.vue'
import { useCountries } from '../composables/useCountries'
import { formatPopulation, formatCurrency, formatLanguages, formatCapital, formatTopLevelDomain } from '../utils/formatters'

const route = useRoute()
const router = useRouter()

const { fetchCountryByCode, fetchCountries } = useCountries()
const country = ref(null)
const loading = ref(true)
const error = ref(null)
const allCountries = ref([])

// Fetch country details
const fetchCountryDetails = async (code) => {
    loading.value = true
    country.value = null
    error.value = null

    try {
        country.value = await fetchCountryByCode(code)
    } catch (err) {
        error.value = 'An error occurred while fetching country details. Please try again later.'
    } finally {
        loading.value = false
    }
}

// Fetch all countries (only if not already fetched)
const fetchAllCountries = async () => {
    if (allCountries.value.length) return

    try {
        allCountries.value = await fetchCountries('name,flags,cca3')
    } catch (err) {
        console.error('Error fetching all countries:', err)
    }
}

// Computed properties for optimized rendering

// Find border countries efficiently
const borderCountries = computed(() => 
    country.value?.borders?.map(code => allCountries.value.find(c => c.cca3 === code)).filter(Boolean) || []
)

// Fetch data on mount
onMounted(() => {
    fetchCountryDetails(route.params.code)
    fetchAllCountries()
})

// Watch route changes
watch(() => route.params.code, (newCode) => {
    fetchCountryDetails(newCode)
})
</script>
