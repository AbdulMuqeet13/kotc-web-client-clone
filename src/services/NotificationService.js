import apiClient from './apiClient' 

export default{
    getNotifications(id,page){
        return apiClient.get('notification-templates/person/'+id)
    },
    updateNotification(id, data){
        return apiClient.patch('notification-templates/'+id, data)
    },
    addNotification(data){
        return apiClient.post('notification-templates', data)
    },
    getNotification(id){
        return apiClient.get('notification-templates/'+id)
    },
    deleteNotification(id){
        return apiClient.delete('notification-templates/'+id)
    },
    search(data){
        return apiClient.post('notification-templates/search',data)
    }
}