
import { createRouter, createWebHistory } from 'vue-router';
import Movie from "@/components/Movie.vue";
import Home from "@/components/Home.vue"
import Detail from "@/components/Detail.vue";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/movie',
        component: Movie
    },
    {
        path: '/details/:id',
        name: 'details',
        component: Detail
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
