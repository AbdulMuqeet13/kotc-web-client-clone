<template>
<v-progress-linear
      indeterminate
      color="cyan"
      v-if="loader"
    ></v-progress-linear>
  <DataTable 
  :allow_add="true"
  @addNew="addNew"
  @update="update"
  @delete="delete_modal"
  tableName="Users"
  :columns="headers" 
  :dataList="dataList"
  actions="edit,delete"
   />

   <v-dialog v-model="deleteModal">
        <v-card style="padding: 40px">
            <p class="span-2 form__title mb-0">You Sure, Want to delete this Item</p>
            <div class="d-flex justify-space-around">
                <v-btn @click="deleteUser" text-color="white" color="red">Yes</v-btn>
                <v-btn @click="deleteModal = false" text-color="white" color="green">No</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import DataTable from '@/components/DataTable'
import UserService from '@/services/UserService'

export default {
    name: "Users",
    components:{
        DataTable
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
            actions: ''
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