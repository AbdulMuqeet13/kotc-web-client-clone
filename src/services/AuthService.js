import apiClient from './apiClient' 


export default{
    async signIn(data){
        const token = (await apiClient.post('auth/sign-in', data)).data
        localStorage.setItem('token', `bearer ${token.access_token}`)
    },
    async getProfile(){
        const profile = (await apiClient.get('auth/profile', { headers: 
            { authorization: localStorage.getItem('token') } 
        })).data
        localStorage.setItem( 'auth_user', JSON.stringify(profile) )
    }
}