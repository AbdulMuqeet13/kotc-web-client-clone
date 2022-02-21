<template>
  <data-table
        :loader="loadData"
        :headers="headers"
        title="Users"
        :allow-add="false"
    />
</template>

<script>
import DataTable from '@/components/DataTable'

export default {
    name: "Users",
    components:{
        DataTable
    },
    data(){
        return {
            headers: [
                {
                    text: 'Display Name',
                    value: 'username',
                },
                {
                    text: 'Subscription',
                    value: 'subscription',
                },
                {
                    width: 120,
                    text: 'Is Verified',
                    value: 'is_verified',
                    sortable: false
                },
                {
                    width: 120,
                    text: 'Premium Trial',
                    value: 'premium_trial',
                    sortable: false
                },
                {
                    width: 120,
                    text: 'Actions',
                    value: 'actions',
                    sortable: false
                },
            ],
        }
    },
    methods:{
        async loadData(){
            const result = await users.get()
            this.items = result.data
            return result.data
        }
    }

}
</script>

<style>

</style>