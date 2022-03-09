.<template>
    <div class="d-flex justify-center my-15" >
        <v-card style="padding: 40px" elevation="5" width="50vw">
        <v-form @submit.prevent="submit">
        <p class="span-2 form__title mb-0">{{ haeding }} User</p>
        <div class="d-flex justify-space-between">
            <div style="width: 49%">
                <BaseInput v-model="first_name" label="First Name" :error="errors.first_name"/>
            </div>
            <div style="width: 49%">
                <BaseInput v-model="last_name" label="Last Name" :error="errors.last_name"/>
            </div>
        </div>
        <BaseInput v-model="username" label="Email" :error="errors.username"/>
        <BaseInput v-model="password" icon="mdi-eye" @iconClick="togglePassword" :type="passwordType" label="Password" :error="errors.password"/>
        <p class="message">If don't need to update password, Leave it Blank</p>
        <div class="mt-5">
            <TreeView label="Select User Scope" v-if="fetchedScopes"  :items="items" v-model="scope"/>
        </div>
        <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn
                elevation="0"
                type="Submit"
                class="mt-10 btn-primary"
            >Submit
            </v-btn>
        </div>
        </v-form>
    </v-card>
    <loading-dialog v-model="loading" message="Fething Data, Please wait..."/>
    <error-dialog :reload="reload" @value="closeError" v-model="error" :error="errorVal"/>
    </div>
</template>

<script>
import UserService from '@/services/UserService'
import BaseInput from '@/components/BaseInput'
import LoadingDialog from '@/components/LoadingDialog'
import { useField, useForm } from 'vee-validate'
import {required, string, email} from "../../utils/validators"
import TreeView from '@/components/TreeView'
import ErrorDialog from '@/components/ErrorDialog'
import { useRoute, useRouter } from 'vue-router'
import {ref} from 'vue'

export default {
    name: "UserForm",
    components:{
        BaseInput,
        TreeView,
        LoadingDialog,
        ErrorDialog
    },
    data() {
        return{
            haeding: 'Create New',
            items: [
                {
                    id: 'notification',
                    name: 'Notification',
                    checked: false,
                    children: [
                        "Create",
                        "View",
                        "Edit",
                        "Delete"
                    ]
                },
                {
                    id: 'user',
                    name: 'User',
                    checked: false,
                    children: [
                        "Create",
                        "View",
                        "Edit",
                        "Delete"
                    ]
                },
                {
                    id: 'companies',
                    name: 'companies',
                    checked: false,
                    children: [
                        "Create",
                        "View",
                        "Edit",
                        "Delete"
                    ]
                },
                {
                    id: 'request',
                    name: 'Request Stats',
                    checked: false,
                    children: [
                        "Create",
                        "View",
                        "Edit",
                        "Delete"
                    ]
                },
                {
                    id: 'customer',
                    name: 'Customer',
                    checked: false,
                    children: [
                        "Create",
                        "View",
                        "Edit",
                        "Delete"
                    ]
                },
            ],
            passwordType: 'password'
        }
    },
    methods: {
        togglePassword(){
            if (this.passwordType === 'password') {
                this.passwordType = 'text'
                return
            }
            this.passwordType = 'password'
        }
    },
    setup(){
        const schema={
            username: email,
            first_name: required,
            last_name: required,
            password: string,
            scope: required
        }
        const route = useRoute()
        const router = useRouter()
        const {handleSubmit, errors}=useForm({validationSchema:schema})
        const {value:username}=useField('username')
        const {value:first_name}=useField('first_name')
        const {value:last_name}=useField('last_name')
        const {value:password}=useField('password')
        const {value:scope}=useField('scope')
        let loading = ref(false)
        let error = ref(false)
        let errorVal = ref({})
        let fetchedScopes = ref(false)
        let reload = ref(true)
        const submit = handleSubmit(async values=>{
            var data = {}
            data.username = values.username
            data.first_name = values.first_name
            data.last_name = values.last_name
            data.password = values.password
            data.scopes = values.scope
            loading = true
            console.log(loading)
            if (!route.query.id) {
                await UserService.addUser(data)
                    .then(() => {
                        router.back()
                    }).catch((err) => {
                        console.log(err)
                        loading = false
                        error = true
                        reload = false
                        errorVal = {
                            title: 'Network Error',
                            description: 'Check Your Connection'
                        };
                    });
            } else {
                await UserService.updateUser(route.query.id, data)
                .then(() => {
                    router.back()
                }).catch((err) => {
                    console.log(err)
                    loading = false
                    error = true
                    reload = false
                    errorVal = {
                        title: 'Network Error',
                        description: 'Check Your Connection'
                    };
                });
            }
        })
        return {
            username,
            first_name,
            password,
            last_name,
            errors,
            scope,
            error,
            errorVal,
            loading,
            submit,
            fetchedScopes,
            reload
        }
    },
    async beforeMount() {
        if (!this.$route.query.id) {
            this.fetchedScopes = true
            return
        }
        else{
            this.loading = true
            this.haeding = 'Update'
            var result = await UserService.getUser(this.$route.query.id)
                .catch((err) => {
                    console.log(err)
                    this.error = true;
                    this.errorVal = {
                        title: 'Error while Fetching Data',
                        description: 'Check Your Connection'
                    };
                    this.loader = false
                });
            this.username = result.data.username
            this.password = result.data.password
            this.first_name = result.data.first_name
            this.last_name = result.data.last_name
            this.scope = result.data.scopes
            this.fetchedScopes = true
            this.loading = false
        }
    },
}
</script>

<style >
.form__title {
    font-weight: normal !important;
    text-align: center !important;
    font-size: 27px;
    padding-bottom: 20px;
    font-family: google-sans, sans-serif;
}
.v-input__details{
    display: none;
}
.message{
    font-size: 12px;
    color: gray;
}
.v-input--density-default {
    --v-input-control-height: 25px;
}
</style>