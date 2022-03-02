import apiClient from './apiClient' 

export default{
    getUsers(){
        return apiClient.get('persons')
    },
    getUser(id){
        return apiClient.get('persons/'+id)
    },
    addUser(data){
        return apiClient.post('persons/create-user',data)
    },
    updateUser(id, data){
        return apiClient.patch('persons/'+id, data)
    },
    getCustomers(){
        return apiClient.get('persons/all-customers')
    },
    getCompanies(user_id){
        return apiClient.get('company/person/'+user_id)
    },
    delete(id){
        return apiClient.delete('/persons/'+id)
    }
}
