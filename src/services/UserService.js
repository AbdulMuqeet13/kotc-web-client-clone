import axios from 'axios'

const appCLient = axios.create({
    baseURL:'https://my-json-server.typicode.com/AbdulMuqeet13/vue_demo_2',
    withCredentials:false,
    headers:{
        Accept: 'application/json',
        'Content-Type':'application/json'
    }
})

export default{
    getUsers(){
        return apiclient.get('/persons')
    }
}