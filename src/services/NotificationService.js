import apiClient from './apiClient' 

export default{
    getNotifications(id){
        return apiClient.get('notifications/person/'+id)
    },
    updateNotification(id, data){
        return apiClient.patch('notifications/'+id, data)
    },
    addNotification(data){
        return apiClient.post('notifications', data)
    },
    getNotification(id){
        return apiClient.get('notifications/'+id)
    },
    deleteNotification(id){
        return apiClient.delete('notifications/'+id)
    }
}