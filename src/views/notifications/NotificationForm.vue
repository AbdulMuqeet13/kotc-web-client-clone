.<template>
<div class="d-flex justify-center my-15">
    <v-card style="padding: 40px" elevation="5" width="50vw">
        <v-form @submit.prevent="submit">
            <p class="span-2 form__title mb-0">Notification</p>
            <BaseInput v-model="title" label="Title" :error="errors.title" />
            <BaseTextArea v-model="message" label="Message" :error="errors.message" />
            <CheckBoxGroup v-if="fetchPlatform" label="Select Platform" v-model="platform" :items="items" />
            <div class="d-flex flex-wrap justify-end mt-8">
                <v-btn elevation="0" color="black" class="ml-2 mt-2" variant="outlined">Send Only</v-btn>
                <v-btn elevation="0" class="ml-2 mt-2" color="#904B46" variant="outlined">Send and Save</v-btn>
                <v-btn elevation="0" type="Submit" class=" ml-2 mt-2 btn-primary">Submit
                </v-btn>
            </div>
        </v-form>
    </v-card>
    <loading-dialog v-model="loading" message="Fething Data, Please wait..." />
    <error-dialog :reload="reload" @value="closeError" v-model="error" :error="errorVal" />
</div>
</template>

<script>
import NotificationService from '@/services/NotificationService'
import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import CheckBoxGroup from '@/components/CheckBoxGroup'
import LoadingDialog from '@/components/LoadingDialog'
import { useRoute, useRouter } from 'vue-router'
import {ref} from 'vue'
import {
    useField,
    useForm
} from 'vee-validate';
import ErrorDialog from '@/components/ErrorDialog'
import {
    required,
    string
} from "../../utils/validators";
export default {
    name: "NotificationForm",
    components: {
        BaseInput,
        BaseTextArea,
        CheckBoxGroup,
        LoadingDialog,
        ErrorDialog
    },
    data() {
        return {
            items: [{
                    label: 'For Android',
                    value: 'android'
                },
                {
                    label: 'For IOS',
                    value: 'ios'
                }
            ],
        }
    },
    setup() {
        const route = useRoute()
        const router = useRouter()
        const schema = {
            title: required,
            message: required,
            platform: string
        }
        const {handleSubmit,errors} = useForm({
            validationSchema: schema
        })
        const {value: title} = useField('title')
        const {value: message} = useField('message')
        const {value: platform} = useField('platform')
        let loading = ref(false)
        let error = ref(false)
        let errorVal = ref({})
        let fetchPlatform = ref(false)
        let reload = ref(true)
        const user_id = JSON.parse(localStorage.getItem('auth_user'))._id
        const submit = handleSubmit(async values => {
            var data = new Object
            data.title = values.title
            data.message = values.message
            data.user_id = user_id
            data.platform = values.platform
            loading = true
            if (!route.query.id) {
                await NotificationService.addNotification(data)
                    .then(() => {
                        router.back()
                    }).catch((err) => {
                        console.log(err)
                        loading = false
                        error = true
                        errorVal = {
                            title: 'Network Error',
                            description: 'Check Your Connection'
                        };
                    });
            } else {
                await NotificationService.updateNotification(route.query.id, data)
                    .then(() => {
                        router.back()
                    }).catch((err) => {
                        console.log(err)
                        loading = false
                        error = true
                        errorVal = {
                            title: 'Network Error',
                            description: 'Check Your Connection'
                        };
                    });
            }
        })
        return {

            errors,
            title,
            message,
            platform,
            error,
            errorVal,
            loading,
            submit,
            fetchPlatform,
            reload,
        }
    },
    async beforeMount() {
        if (!this.$route.query.id) {
            this.fetchPlatform = true
            return
        } else {
            this.loading = true
            await NotificationService.getNotification(this.$route.query.id)
                .then((result) => {
                    this.title = result.data.title
                    this.message = result.data.message
                    this.platform = result.data.platform
                    this.fetchPlatform = true
                }).catch((err) => {
                    console.log(err)
                    this.error = true;
                    this.reload = true
                    this.errorVal = {
                        title: 'Error while Fetching Data',
                        description: 'Check Your Connection'
                    };
                });
            this.loading = false
        }
    },
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
