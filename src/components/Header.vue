<template lang="">
    <header>
        <nav class="navbar bg-base-200">
            <div class="flex-1">
                <a class="btn btn-ghost text-xl">Test</a>
            </div>
            <ul class="menu menu-dropdown flex-none">
                <li><button @click="logout">Logout</button></li>
            </ul>
        </nav>
    </header>
</template>
<script setup>
import { clearToken } from '@/cookie';
import router from '@/router';
import axios from 'axios';
import { server_url } from '@/config'

const logout = async () => {
    try {
        const res = await axios.post(server_url + "/logout")

        console.log(res)
        if(res.status !== 200){
            return
        }

        clearToken()
        router.push({ path : '/login'})

    } catch (error) {

    }

}
</script>
<style lang="">

</style>
