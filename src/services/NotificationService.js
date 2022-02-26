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
    getNotifications(id){
        return apiCLient.get('notifications/person/'+id)
    },
    updateNotification(id, data){
        return apiCLient.patch('notifications/'+id, data)
    },
    addNotification(data){
        return apiCLient.post('notifications', data)
    },
    getNotification(id){
        return apiCLient.get('notifications/'+id)
    },
    deleteNotification(id){
        return apiCLient.delete('notifications/'+id)
    }
}