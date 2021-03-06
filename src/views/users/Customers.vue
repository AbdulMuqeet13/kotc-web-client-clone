<template>
<v-alert v-if="success" type="success">Subscription Date Extended Successfully.</v-alert>
<v-progress-linear
      indeterminate
      color="cyan"
      v-if="loader"
    ></v-progress-linear>
    <DataTable @updateApproval="showModal"
        :allow_add="false"
        tableName="Customers"
        :columns="headers"
        :dataList="dataList"
        :actions="actions"
        :pages="pages"
        @search="search"
        @view_details="showCompanies"
        @pageNum="updatePageNum"
        @updateCurrentPage="updatePageNum"
     />
    
    <div class="d-flex justify-center">
        <v-dialog v-if="modal" v-model="modal">
            <v-card style="padding: 40px">
                <v-form @submit="makePremium" ref="makePremium">
                <p class="span-2 form__title mb-0">Premium Trial</p>
                <p class="span-2 mb-6">This will set the user's premium status to true till expiry date.</p>
                <BaseInput v-model="trial_expiry" type="date" label="Expiry Date" :error="errors.trial_expiry" />
                <div class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn
                        elevation="0"
                        class="btn-primary"
                        type="submit"
                        
                    >Submit
                    </v-btn>
                </div>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
    <loading-dialog v-model="loading" message="Fething Data, Please wait..."/>
    <error-dialog :reload="true" @value="closeError" v-model="error" :error="errorVal"/>
</template>

<script>
import DataTable from '@/components/DataTable'
import UserService from '@/services/UserService'
import SubscriptionService from '@/services/SubscriptionService'
import {inject} from 'vue'
import { useField, useForm } from 'vee-validate';
import {required} from "../../utils/validators";
import BaseInput from '@/components/BaseInput'
import LoadingDialog from '@/components/LoadingDialog'
import ErrorDialog from '@/components/ErrorDialog'
 
export default {
    name: "Customers",
    components:{
        DataTable,
        BaseInput,
        ErrorDialog,
        LoadingDialog
    },
    setup(){
        const schema={
            trial_expiry: required,
        }
        const {handleSubmit,errors}=useForm({validationSchema:schema})
        const {value:trial_expiry}=useField('trial_expiry')
        const scope = inject('scope')
        var actions = []
        actions.push("view_details")
        if (scope.includes('customer:edit')) {
            actions.push("approve")
        }

        const makePremium= handleSubmit(async (v)=>{
            stripe_subscription.date = trial_expiry
            loading = true            
            await SubscriptionService.extendSubscription(stripe_subscription)
                .then(() => {
                    success = true
                    loading = false
                }).catch((err) => {
                    console.log(err)
                    loading = false
                    error = true;
                    errorVal = {
                        title: 'Network Error',
                        description: 'Check Your Connection'
                    };

                });
                modal = false
            trial_expiry = new Date()
            setTimeout(() => {  success=false }, 1500);
        })

        return{
            actions,
            trial_expiry,
            errors,
            makePremium
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
                },
            ],
            dataList: [],
            stripe_subscription: {},
            modal: false,
            success: false,
            loader: true,
            error: false,
            errorVal: {},
            loading: false,
            pages: 1,
            page: 1 
        }        
    },
    methods: {
        showModal(e){
            this.stripe_subscription.customer = e.subscription.customer
            this.modal = true
        },
        async showCompanies(e){
            this.$router.push(`/companies?id=${e._id}`)
        },
        async search(e){
            this.loader = true
            let data = {}
            data.name = e
            data.page = this.page
            await UserService.searchCustomer(data)
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
                const response = await UserService.getCustomers(this.page)
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
    },
    async beforeMount() {
        try {
            let page = 1
            const response = await UserService.getCustomers(page) 
            this.loader=false
            this.dataList = response.data.customers
            this.pages = response.data.total_pages
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
</script>

<style>
.form__title {
    font-weight: normal !important;
    text-align: center !important;
    font-size: 27px;
    padding-bottom: 20px;
    font-family: google-sans, sans-serif;
}

</style>