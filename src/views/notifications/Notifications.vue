<template>
  <data-table
        :loader="loadData"
        :headers="headers"
        title="Notifications"
        :allow-add="false"
    />
</template>

<script>
import DataTable from '@/components/DataTable'

export default {
    name: "Notifications",
    components:{
        DataTable
    },
    data(){
        return {
            headers: [
                {
                    text: 'Display Name',
                    value: 'name',
                },
                {
                    text: 'Email',
                    value: 'email',
                },
                {
                    width: 120,
                    text: 'Is Premium',
                    value: 'is_premium',
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
            ]
        }
    },
    methods:{
    }

}
</script>

<style>

</style>