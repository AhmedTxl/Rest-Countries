import { ref, computed } from 'vue'
import { useDebounce } from '@vueuse/core'

export function useSearch(items, searchKey = 'name.common') {
    const searchTerm = ref('')
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    const filteredItems = computed(() => {
        if (!debouncedSearchTerm.value) return items.value
        
        const term = debouncedSearchTerm.value.toLowerCase()
        return items.value.filter(item => {
            const searchValue = searchKey.split('.').reduce((obj, key) => obj?.[key], item)
            return searchValue?.toLowerCase().includes(term)
        })
    })

    const clearSearch = () => {
        searchTerm.value = ''
    }

    return {
        searchTerm,
        debouncedSearchTerm,
        filteredItems,
        clearSearch
    }
} 