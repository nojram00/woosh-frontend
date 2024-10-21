import { server_url } from "./config";

export function setToken(value, expires = 60){

    localStorage.setItem('token', value)

}

export function getToken(){
    return localStorage.getItem('token')
}

export function clearToken(){
    localStorage.removeItem('token')
}

export async function getSession(){
    const token = getToken();

    try {
        if (token){
            const res = await axios.get( server_url + "/user", {
                headers : {
                    'Authorization' : `Bearer ${token}`
                }
            })

            if(res.status === 404){
                return null
            }

            return res.data
        }

        return null
    } catch (error) {
        return null
    }

}
