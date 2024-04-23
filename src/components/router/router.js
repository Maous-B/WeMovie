
import { createRouter, createWebHistory } from 'vue-router';
import Movie from "@/components/Movie.vue";
import Home from "@/components/Home.vue"

const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/movie',
        component: Movie
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
