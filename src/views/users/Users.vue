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
    @delete="delete_modal"
    tableName="Users"
    :columns="headers" 
    :dataList="dataList"
    :actions="actions"
    />
    <DeleteModal message="Sure to delete user" v-model="deleteModal" @delete="deleteUser" />
</template>

<script>
import DataTable from '@/components/DataTable'
import UserService from '@/services/UserService'
import DeleteModal from '@/components/DeleteModal'
import {inject} from 'vue'

export default {
    name: "Users",
    components:{
        DataTable,
        DeleteModal
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
        }
    },
    async beforeMount() {
        const response = await UserService.getUsers()
        this.dataList = response.data
        this.loader = false
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
        }
    }

}
</script>

<style>

</style>