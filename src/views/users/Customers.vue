<template>
    <DataTable :allow_add="false" tableName="Customers" :columns="headers" :dataList="dataList" />
</template>

<script>
import DataTable from '@/components/DataTable'
import UserService from '@/services/UserService'

export default {
    name: "Customers",
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
                },
            ],
            dataList: [],
        }
    },
    async beforeCreate() {
        const response = await UserService.getCustomers()
        console.log(response.data)
        this.dataList = response.data
    }

}
</script>

<style>

</style>