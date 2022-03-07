import axios from 'axios'
// import router from '../router';
const apiClient = axios.create({
    baseURL: 'http://192.168.10.90:3000/',
    // baseURL: 'http://10.20.20.108:3000/',
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});
// apiClient.interceptors.request.use(function (config) {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.common["Authorization"] = 'bearer ' + token;
//     }
//     return config;
// }, function (error) {
//     console.log(error)
//     return Promise.reject(error)
// });
// apiClient.interceptors.response.use(
//     res=>{
//         if(res.status===200||res.status===201){
//             return Promise.resolve(res);
//         }
//         else{
//             return Promise.reject(res);
//         }
//     },
//     error=>{
//         if(error.response.status){
//             switch(error.response.status){
//                 case 401:
//                     localStorage.removeItem('token');
//                     localStorage.removeItem('auth_user');
//                     router.push('/auth/sign-in')
//             }
//         }
//     }
// )
export default apiClient;