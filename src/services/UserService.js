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
    getUsers(){
        return apiCLient.get('persons')
    },
    getUser(id){
        return apiCLient.get('persons/'+id)
    },
    addUser(data){
        return apiCLient.post('persons/create-user',data)
    },
    updateUser(id, data){
        return apiCLient.patch('persons/'+id, data)
    },
    getCustomers(){
        return apiCLient.get('persons')
    },
    delete(id){
        return apiCLient.delete('/persons/'+id)
    }
}
