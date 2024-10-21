import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import axios from 'axios'
import { getSession, getToken } from './cookie'
import { server_url } from './config'


window.axios = axios;

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.baseURL = server_url;

// axios.defaults.withCredentials = true;

// axios.defaults.withXSRFToken = true;

if(getToken()){
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
}


const unprotected = [
    '/login'
]

router.beforeEach(async (to, from) => {
    const session = await getSession()

    // Nprogress.start()

    console.log(session)

    if(session === null && !unprotected.includes(to.path)) {
        return { path : '/login'}
    }

    if(session !== null && unprotected.includes(to.path)){
        return { path : '/' }
    }

})

router.afterEach((to, from) => {
    // Nprogress.done()
})

createApp(App)
    .use(router)
    .mount('#app')
