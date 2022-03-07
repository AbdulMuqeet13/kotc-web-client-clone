import apiClient from './apiClient' 

export default{ 
    getData(){
        return apiClient.get('dashboard/overall-stats')
    }
}