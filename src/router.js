import { createRouter, createWebHistory } from 'vue-router'
import CountryInfo from './components/CountryInfo.vue'
import CountryDetails from './components/CountryDetails.vue'

const routes = [
    { path: '/', component: CountryInfo },
    { path: '/country/:code', component: CountryDetails },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router