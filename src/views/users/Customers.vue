<template>
<v-alert v-if="success" type="success">Subscription Date Extended Successfully.</v-alert>
<v-progress-linear
      indeterminate
      color="cyan"
      v-if="loader"
    ></v-progress-linear>
    <DataTable @updateApproval="showModal" :allow_add="false" tableName="Customers" :columns="headers" :dataList="dataList" actions="approve" />
    
    <div class="d-flex justify-center">
        <v-dialog v-model="modal">
            <v-card style="padding: 40px">
                <v-form ref="makePremium">
                <p class="span-2 form__title mb-0">Premium Trial</p>
                <p class="span-2 mb-6">This will set the user's premium status to true till expiry date.</p>
                <v-text-field v-model="trial_expiry" type="date" label="Expiry Date" outlined dense />
                <v-btn
                    style="width: 100%"
                    elevation="0"
                    color="primary"
                    @click.prevent="makePremium"
                >Submit
                </v-btn>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import DataTable from '@/components/DataTable'
import UserService from '@/services/UserService'
import SubscriptionService from '@/services/SubscriptionService'

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
            trial_expiry: Date(),
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
        async makePremium(){
            this.stripe_subscription.date = this.trial_expiry
            this.loader = true
            this.modal = false
            await SubscriptionService.extendSubscription(this.stripe_subscription)
                .then(() => {
                    this.success = true
                    this.loader = false
                }).catch((err) => {
                    this.loader = false
                    console.log(err)
                });
            this.trial_expiry = new Date()
            setTimeout(() => {  this.success=false }, 1500);
        }
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