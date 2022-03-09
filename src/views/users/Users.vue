<template>
<v-progress-linear
      indeterminate
      color="cyan"
      v-if="loader"
    ></v-progress-linear>
    <DataTable 
    :allow_add="scope.includes('user:create')"
    @addNew="addNew"
    @update="update"
    @search="search"
    @delete="delete_modal"
    @pageNum="updatePageNum"
    @updateCurrentPage="updatePageNum"
    tableName="Users"
    :columns="headers" 
    :dataList="dataList"
    :actions="actions"
    :pages="pages"
    />
    <DeleteModal message="Sure to delete user" v-model="deleteModal" @delete="deleteUser" />
    <error-dialog :reload="true" @value="closeError" v-model="error" :error="errorVal"/>
</template>

<script>
import DataTable from '@/components/DataTable'
import UserService from '@/services/UserService'
import DeleteModal from '@/components/DeleteModal'
import ErrorDialog from '@/components/ErrorDialog'
import {inject} from 'vue'

export default {
    name: "Users",
    components:{
        DataTable,
        DeleteModal,
        ErrorDialog
    },
    setup(){
        const scope = inject('scope')
        // console.log("tree", scope)
        var actions = []
        if ( scope.includes("user:edit") ) {
            actions.push("edit")
        }
        if ( scope.includes("user:delete") ) {
            actions.push("delete")
        }
        return{
            scope,
            actions
        }
    },
    data(){
        return {
            headers: [
                {
                    text: 'Name',
                    value: 'first_name',
                },
                {
                    text: 'Is Verified',
                    value: 'is_verified',
                }
            ],
            dataList: [],
            user_id: '',
            loader: true,
            deleteModal: false,
            errorVal: {},
            error: false,
            pages: 1,
            page: 1
        }
    },
    async beforeMount() {
        try {
            let page = 1
            const response = await UserService.getUsers(page)
            this.dataList = response.data.users
            this.pages = response.data.total_pages
            this.loader = false    
        } catch (error) {
            console.log(error)
            this.error = true;
            this.errorVal = {
                title: 'Error while Fetching Data',
                description: 'Check Your Connection'
            };
            this.loader = false
        }
        
    },
    methods: {
        addNew() {
            this.$router.push('/user-form');
        },
        update(e){
            this.$router.push(`/user-form?id=${e._id}`)
        },
        delete_modal(e){
            this.deleteModal=true
            this.user_id = e._id
        },
        async deleteUser(){
            this.loader=true
            await UserService.delete(this.user_id)
                .then((res) => {
                    this.dataList.forEach(element => {
                        if (element._id === res.data._id) {
                            this.dataList.splice(this.dataList.indexOf(element), 1)
                        }    
                    });
                }).catch((err) => {
                    console.log(err)
                });
            this.deleteModal=false
            this.loader = false
        },
        async search(e){
            this.loader = true
            let data = {}
            data.name = e
            data.page = this.page
            await UserService.searchUser(data)
                .then((response)=>{
                    console.log('iuahNA',response)
                    this.dataList = response.data.users
                    this.loader = false
                }).catch((err)=>{
                    console.log(err)
                    this.error = true;
                    this.errorVal = {
                        title: 'Error while Fetching Data',
                        description: 'Check Your Connection'
                    };
                    this.loader = false
            })
        },
        async updatePageNum(e){
            this.page = e
            try {
                const response = await UserService.getUsers(this.page)
                this.dataList = response.data.users
                this.pages = response.data.total_pages
                this.loader = false    
            } catch (error) {
                console.log(error)
                this.error = true;
                this.errorVal = {
                    title: 'Error while Fetching Data',
                    description: 'Check Your Connection'
                };
                this.loader = false
            }
        }
    }

}
</script>

<style>

</style>