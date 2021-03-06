import {
    createMemoryHistory,
    createRouter as _createRouter,
    createWebHistory
} from 'vue-router'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('../pages/*.vue')

const routes = Object.keys(pages).map((path) => {
    // @ts-ignore
    const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase()

    return {
        path: name === '/home' ? '/' : name,
        component: pages[path], // () => import('./pages/*.vue'),
        meta: {
            title: "test"
        }
    }
})

export function createRouter() {
    const router = _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes
    })

    router.beforeEach((to, from, next) => {
        next();
    })

    return router;
}