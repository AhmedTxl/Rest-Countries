import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/Home.vue'; // Adjust path as necessary
import InfoPage from '@/views/Details.vue'; // Adjust path as necessary

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/info',
        name: 'info',
        component: InfoPage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
