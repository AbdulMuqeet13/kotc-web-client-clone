import apiClient from './apiClient' 

export default{
    getUsers(page){
        return apiClient.get('persons/paginated-users/'+page)
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
    getCustomers(page){
        return apiClient.get('persons/paginated/all-customers/'+page)
    },
    getCompanies(user_id){
        return apiClient.get('company/person/'+user_id)
    },
    delete(id){
        return apiClient.delete('/persons/'+id)
    },
    searchUser(data){
        return apiClient.post('persons/paginated-search',data)
    },
    searchCustomer(data){
        return apiClient.post('persons/paginated-search/all-customers',data)
    }
}
