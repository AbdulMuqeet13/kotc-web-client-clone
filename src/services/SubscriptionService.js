import axios from 'axios'

const apiCLient = axios.create({
    baseURL:'http://192.168.100.212:3000/',
    withCredentials:false,
    headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
    }
})

export default {
    extendSubscription(data){
        return apiCLient.post('stripe/extend-trial',data)
    }
}