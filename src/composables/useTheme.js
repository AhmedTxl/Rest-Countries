import { ref, watch, onMounted } from 'vue'

export function useTheme() {
    const darkMode = ref(false)

    const toggleTheme = () => {
        darkMode.value = !darkMode.value
        localStorage.setItem('theme', darkMode.value ? 'dark' : 'light')
    }

    const setTheme = (isDark) => {
        darkMode.value = isDark
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }

    onMounted(() => {
        const savedTheme = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        
        if (savedTheme) {
            darkMode.value = savedTheme === 'dark'
        } else {
            darkMode.value = prefersDark
        }
    })

    watch(darkMode, (newValue) => {
        document.documentElement.classList.toggle('dark', newValue)
    }, { immediate: true })

    return {
        darkMode,
        toggleTheme,
        setTheme
    }
} 