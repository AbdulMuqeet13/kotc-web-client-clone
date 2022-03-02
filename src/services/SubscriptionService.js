import apiClient from './apiClient' 

export default {
    extendSubscription(data){
        return apiClient.post('stripe/extend-trial',data)
    }
}