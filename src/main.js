import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Note: Removed preload due to CORS restrictions
// The API calls now use a CORS proxy

// Initialize app
const app = createApp(App)

// Global error handler
app.config.errorHandler = (err, vm, info) => {
  console.error('Global error:', err, info)
}

app.use(router)

// Mount the app
app.mount('#app')