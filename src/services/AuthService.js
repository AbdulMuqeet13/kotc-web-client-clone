import axios from 'axios'

const apiCLient = axios.create({
    baseURL:'http://192.168.100.212:3000/',
    withCredentials:false,
    headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
    }
})

export default{
    async signIn(data){
        var token = (await apiCLient.post('auth/sign-in', data)).data
        localStorage.setItem('token', 'bearer ' + token.access_token)
    },
    getProfile(){
        
        return apiCLient.get('auth/profile', {headers:{authorization: localStorage.getItem('token')}})
    }
}