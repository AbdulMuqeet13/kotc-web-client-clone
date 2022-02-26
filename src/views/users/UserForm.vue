.<template>
    <div class="d-flex justify-center my-15" >
        <v-card style="padding: 40px" elevation="5" width="50vw">
        <v-form @submit.prevent="UpdateUser">
        <p class="span-2 form__title mb-0">{{ haeding }} User</p>
        <div class="d-flex justify-space-between">
            <BaseInput v-model="first_name" label="First Name" style="width: 49%" :error="errors.first_name"/>
            <BaseInput v-model="last_name" label="Last Name" style="width: 49%" :error="errors.last_name"/>
        </div>
        <BaseInput v-model="username" label="Email" :error="errors.username"/>
        <BaseInput v-model="password" type="password" label="Password" :error="errors.password"/>
        <p class="message">If don't need to update password, Leave it Blank</p>
        <h4 class="mt-5">Select User Scope</h4>
        <div class="mt-5">
            <TreeView :items="items" v-model="scope"/>
        </div>
        <v-btn
            style="width: 100%"
            elevation="0"
            color="primary"
            type="Submit"
            class="mt-10"
        >Submit
        </v-btn>
        </v-form>
    </v-card>
    </div>
</template>

<script>
import UserService from '@/services/UserService'
import BaseInput from '@/components/BaseInput'
import { useField, useForm } from 'vee-validate';
import {required, email} from "../../utils/validators";
import TreeView from '@/components/TreeView'

export default {
    name: "UserForm",
    components:{
        BaseInput,
        TreeView
    },
    data() {
        return{
            haeding: 'Create New',
            scope: [],
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
            ]
        }
    },
    setup(){
        const schema={
            username: email,
            first_name: required,
            last_name: required,
        }
        const {errors}=useForm({validationSchema:schema})
        const {value:username}=useField('username')
        const {value:first_name}=useField('first_name')
        const {value:last_name}=useField('last_name')

        return {
            username,
            first_name,
            last_name,
            errors,
        }
    },
    async mounted() {
        if (!this.$route.query.id) {
            return
        }
        else{
            await UserService.getUser(this.$route.query.id)
                .then((result) => {
                    this.username = result.data.username
                    this.password = result.data.password
                    this.first_name = result.data.first_name
                    this.last_name = result.data.last_name
                    this.scope = result.data.scopes
                    console.log(result.data)
                }).catch((err) => {
                    console.log(err)
                });
        }
    },
    methods: {
        async UpdateUser(){
            var data = new Object()
            data.username = this.username
            data.first_name = this.first_name
            data.last_name = this.last_name
            data.password = this.password
            data.scopes = this.scope
            if (!this.$route.query.id) {
                console.log(data)
                await UserService.addUser(data)
                    .then((res) => {
                        console.log(res)
                        this.$router.back()
                    }).catch((err) => {
                        console.log(err)
                    });
            } else {
                this.haeding = 'Update'
                await UserService.updateUser(this.$route.query.id, data)
                .then(() => {
                    this.$router.back()
                }).catch((err) => {
                    console.log(err)
                });
            }
            setTimeout(() => {  this.success=false }, 2000);
        },
    }
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