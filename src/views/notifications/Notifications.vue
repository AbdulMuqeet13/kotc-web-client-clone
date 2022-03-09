<template>
<v-progress-linear
      indeterminate
      color="cyan"
      v-if="loader"
    ></v-progress-linear>
  <DataTable 
    @delete="delete_modal" 
    @addNew="addNew"
    @update="update"
    @search="search"
    @pageNum="updatePageNum"
    @updateCurrentPage="updatePageNum"
    :pages="pages"
    :allow_add="scope.includes('notification:create')"
    tableName="Notifications"
    :columns="headers"
    :dataList="dataList"
    :actions="actions"
    />
    <DeleteModal v-if="deleteModal" message="Sure to delete notification" v-model="deleteModal" @delete="deleteNotification" />
    <error-dialog :reload="true" @value="closeError" v-model="error" :error="errorVal"/>
</template>

<script>
import DataTable from '@/components/DataTable'
import NotificationService from '@/services/NotificationService'
import DeleteModal from '@/components/DeleteModal'
import ErrorDialog from '@/components/ErrorDialog'
import {inject} from 'vue'

export default {
    name: "Notifications",
    components:{
        DataTable,
        DeleteModal,
        ErrorDialog
    },
    setup(){
        const scope = inject('scope')
        var actions = []
        if (scope.includes("notification:edit")) {
            actions.push("edit")
        }
        if (scope.includes("notification:delete")) {
            actions.push("delete")
        }

        return{
            actions,
            scope
        }
    },
    data(){
        return {
            headers: [
                {
                    text: 'Title',
                    value: 'title',
                },
                {
                    text: 'Message',
                    value: 'message',
                },
            ],
            user_id: JSON.parse(localStorage.getItem('auth_user'))._id,
            notification_id: '',
            del_id: '',
            dataList: [],
            modal: false,
            deleteModal: false,
            loader: true,
            errorVal: {},
            error: false,
            page: 1,
            pages: 1,
        }
    },
    async mounted() {
        try {
            let page = 1
            const response = await NotificationService.getNotifications(this.user_id, page) 
            this.loader=false
            this.dataList = response.data
        } catch (error) {
            this.error = true;
            this.errorVal = {
                title: 'Error while Fetching Data',
                description: 'Check Your Connection'
            };
            this.loader = false
        }
        
    },
    methods:{
        addNew(){
            this.$router.push('/notification-form');
        },
        update(e) {
            this.$router.push(`/notification-form?id=${e._id}`);
        },
        delete_modal(e){
            this.deleteModal=true
            this.del_id = e._id
        },
        async deleteNotification(){
            this.loader=true
            await NotificationService.deleteNotification(this.del_id)
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
            var data= {}
            data.title = e
            data.page = this.page
            // console.log(data)
            await NotificationService.search(data)
                .then((response)=>{
                    this.dataList = response.data
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
                const response = await NotificationService.getNotifications(this.page)
                this.dataList = response.data.notifications
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