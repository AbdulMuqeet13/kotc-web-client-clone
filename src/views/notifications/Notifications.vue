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
    :allow_add="true"
    tableName="Notifications"
    :columns="headers"
    :dataList="dataList"
    actions="edit,delete"
    />

    <v-dialog v-model="deleteModal">
        <v-card style="padding: 40px">
            <p class="span-2 form__title mb-0">You Sure, Want to delete this Item</p>
            <div class="d-flex justify-space-around">
                <v-btn @click="deleteNotification" text-color="white" color="red">Yes</v-btn>
                <v-btn @click="deleteModal = false" text-color="white" color="green">No</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import DataTable from '@/components/DataTable'
import NotificationService from '@/services/NotificationService'

export default {
    name: "Notifications",
    components:{
        DataTable,
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
            user_id: '62131db58a096bd7f39970bb',
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