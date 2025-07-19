import { ref } from 'vue'

const API_BASE_URL = 'https://restcountries.com/v3.1'

export function useCountries() {
    const loading = ref(false)
    const error = ref(null)

    const fetchCountries = async (fields = 'name,flags,cca3,capital,population,region') => {
        loading.value = true
        error.value = null
        
        try {
            // Use a CORS proxy to bypass CORS restrictions
            const proxyUrl = 'https://api.allorigins.win/raw?url='
            const targetUrl = `${API_BASE_URL}/all?fields=${fields}`
            const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`)
            
            if (!response.ok) {
                throw new Error('Failed to fetch countries')
            }
            return await response.json()
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    const fetchCountryByCode = async (code) => {
        loading.value = true
        error.value = null
        
        try {
            // Use a CORS proxy to bypass CORS restrictions
            const proxyUrl = 'https://api.allorigins.win/raw?url='
            const targetUrl = `${API_BASE_URL}/alpha/${code}`
            const response = await fetch(`${proxyUrl}${encodeURIComponent(targetUrl)}`)
            
            if (!response.ok) {
                throw new Error('Failed to fetch country details')
            }
            const data = await response.json()
            return data[0]
        } catch (err) {
            error.value = err.message
            throw err
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        fetchCountries,
        fetchCountryByCode
    }
} 