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
    :allow_add="scope.includes('notification:create')"
    tableName="Notifications"
    :columns="headers"
    :dataList="dataList"
    :actions="actions"
    />
    <DeleteModal message="Sure to delete notification" v-model="deleteModal" @delete="deleteNotification" />
</template>

<script>
import DataTable from '@/components/DataTable'
import NotificationService from '@/services/NotificationService'
import DeleteModal from '@/components/DeleteModal'
import {inject} from 'vue'

export default {
    name: "Notifications",
    components:{
        DataTable,
        DeleteModal
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
        }
    },
    async mounted() {
        const response = await NotificationService.getNotifications(this.user_id) 
        this.loader=false
        this.dataList = response.data
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
        }
    }

}
</script>

<style>

</style>