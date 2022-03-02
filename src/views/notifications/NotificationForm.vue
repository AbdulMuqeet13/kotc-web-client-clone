.<template>
    <div class="d-flex justify-center my-15" >
        <v-card style="padding: 40px" elevation="5" width="50vw">
        <v-form @submit.prevent="UpdateNotification">
        <p class="span-2 form__title mb-0">Notification</p>
        <BaseInput v-model="title" label="Title" :error="errors.title"/>
        <BaseTextArea v-model="message" label="Message" :error="errors.message"/>
        <CheckBoxGroup label="Select Platform" v-model="platform" :items="items" />
        <div class="d-flex flex-wrap justify-end mt-8">
            <v-btn
                elevation="0"
                color="black"
                class="ml-2 mt-2"
                variant="outlined"
            >Send Only</v-btn>
            <v-btn
                elevation="0"
                class="ml-2 mt-2"
                color="#904B46"
                variant="outlined"
            >Send and Save</v-btn>
            <v-btn
                elevation="0"
                type="Submit"
                class=" ml-2 mt-2 btn-primary"
            >Submit
            </v-btn>
        </div>
        </v-form>
    </v-card>
    <loading-dialog v-model="loading" message="Fething Data, Please wait..."/>
    </div>
</template>

<script>
import NotificationService from '@/services/NotificationService'
import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import CheckBoxGroup from '@/components/CheckBoxGroup'
import LoadingDialog from '@/components/LoadingDialog'
import { useField, useForm } from 'vee-validate';
import {required} from "../../utils/validators";
export default {
    name: "NotificationForm",
    components:{
        BaseInput,
        BaseTextArea,
        CheckBoxGroup,
        LoadingDialog
    },
    data() {
        return {
            user_id: JSON.parse(localStorage.getItem('auth_user'))._id,
            platform: [],
            items:[
                {
                    label: 'For Android',
                    value: 'android'
                },
                {
                    label: 'For IOS',
                    value: 'ios'
                }
            ],
            loading: false
        }
    },
    setup(){
        const schema={
            title: required,
            message: required
        }
        const {errors}=useForm({validationSchema:schema})
        const {value:title}=useField('title')
        const {value:message}=useField('message')

        return {
            
            errors,
            title,
            message
        }
    },
    async mounted() {
        if (!this.$route.query.id) {
            return
        }
        else{
            this.loading = true
            await NotificationService.getNotification(this.$route.query.id)
                .then((result) => {
                    this.title = result.data.title
                    this. message = result.data.message
                }).catch((err) => {
                    console.log(err)
                });
            this.loading = false
        }
    },
    methods: {
        async UpdateNotification(){
            this.loader = true
            var data = new Object
            data.title = this.title
            data.message = this.message
            data.user_id = this.user_id 
            if (!this.$route.query.id) {
                await NotificationService.addNotification(data)
                    .then(() => {
                        this.modal = false
                        this.success = true
                        this.loader = false
                        this.$router.back()
                    }).catch((err) => {
                        console.log(err)
                    });
            } else {
                await NotificationService.updateNotification(this.notification_id, this.data)
                .then((res) => {
                    this.dataList.forEach(element => {
                        if (element._id === res.data._id) {
                            element.title = res.data.title
                            element.message = res.data.message
                        }    
                    });
                    this.modal = false
                    this.success = true
                    this.loader = false
                }).catch((err) => {
                    console.log(err)
                });
            }
            setTimeout(() => {  this.success=false }, 2000);
        },
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