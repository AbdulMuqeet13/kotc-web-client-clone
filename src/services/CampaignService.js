import apiClient from './apiClient' 

export default{
    getStats(){
        return apiClient.get('campaign/stats')
    }
}