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
        @view_details="showCompanies"
     />
    
    <div class="d-flex justify-center">
        <v-dialog v-if="modal" v-model="modal">
            <v-card style="padding: 40px">
                <v-form @submit="makePremium" ref="makePremium">
                <p class="span-2 form__title mb-0">Premium Trial</p>
                <p class="span-2 mb-6">This will set the user's premium status to true till expiry date.</p>
                <BaseInput v-model="trial_expiry" type="date" label="Expiry Date" :error="errors.trial_expiry" />
                <!-- <v-text-field v-model="trial_expiry" type="date" label="Expiry Date" outlined dense /> -->
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
</template>

<script>
import DataTable from '@/components/DataTable'
import UserService from '@/services/UserService'
import SubscriptionService from '@/services/SubscriptionService'
import {inject} from 'vue'
import { useField, useForm } from 'vee-validate';
import {required} from "../../utils/validators";
import BaseInput from '@/components/BaseInput'
 
export default {
    name: "Customers",
    components:{
        DataTable,
        BaseInput
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
            loader = true
            
            await SubscriptionService.extendSubscription(stripe_subscription)
                .then(() => {
                    success = true
                    loader = false
                }).catch((err) => {
                    loader = false
                    console.log(err)
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
            loader: true
        }        
    },
    methods: {
        showModal(e){
            this.stripe_subscription.customer = e.subscription.customer
            this.modal = true
        },
        async showCompanies(e){
            this.$router.push(`/companies?id=${e._id}`)
        }
        // async makePremium(){
        //     this.stripe_subscription.date = this.trial_expiry
        //     this.loader = true
            
        //     await SubscriptionService.extendSubscription(this.stripe_subscription)
        //         .then(() => {
        //             this.success = true
        //             this.loader = false
        //         }).catch((err) => {
        //             this.loader = false
        //             console.log(err)
        //         });
        //         this.modal = false
        //     this.trial_expiry = new Date()
        //     setTimeout(() => {  this.success=false }, 1500);
        // }
    },
    async mounted() {
        const response = await UserService.getCustomers() 
        this.loader=false
        this.dataList = response.data
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