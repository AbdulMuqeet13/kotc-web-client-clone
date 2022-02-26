<template>
  <div id="background">
    <v-card class="sign-in" elevation="10">
      <!-- <img src="../../assets/logo_alt.png" alt="Logo" class="sign-in__logo"/> -->
      <h1>LOGO</h1>
      <h1 class="sign-in__title">Authenticate yourself</h1>
      <v-form @submit="signIn">
        <BaseInput v-model="username" label="Your Email" :error="errors.username"/>
        <BaseInput v-model="password" type="password" label="Your Password" :error="errors.password"/>
        <!-- <v-text-field
          class="text-field"
          v-model="username"
          label="Your Email"
          outlined
          :rules="[required(), email()]"
        />
        <v-text-field
          class="text-field"
          v-model="password"
          rules="[required('Do not leave this field empty')]"
          @keypress.enter="signIn"
          label="Your Password"
          type="password"
          outlined
        /> -->

        <v-btn
          type="submit"
          class="submit_btn"
          elevation="0"
          width="100%"
          height="45px"
        >
          Authenticate
          <v-icon small style="margin-left: 5px">mdi-arrow-right</v-icon>
        </v-btn>
      </v-form>
    </v-card>
    <loading-dialog v-model="loading" message="You are being authenticated, Please wait..."/>
    <error-dialog @value="closeError" v-model="error" :error="errorVal"/>
  </div>
</template>

<script>
import {required, email} from '@/utils/validators';
import LoadingDialog from '../../components/LoadingDialog';
import ErrorDialog from '../../components/ErrorDialog';
import BaseInput from '@/components/BaseInput'
import { useField, useForm } from 'vee-validate';
import AuthService from '@/services/AuthService'

export default {
  name: 'SignIn',
  components: {ErrorDialog, LoadingDialog, BaseInput},

  data: () => ({
    error: false,
    errorVal: {},
    loading: false,
  }),
  setup(){
        const schema={
            username: email,
            password: required,
        }
        const {errors}=useForm({validationSchema:schema})
        const {value:username}=useField('username')
        const {value:password}=useField('password')

        return {
            username,
            password,
            errors,
        }
    },
  methods: {
    async signIn() {
      this.loading = true;
      try {
        let data = {
              username: this.username,
              password: this.password
            }
        await AuthService.signIn(data)
        const user = await AuthService.getProfile()
        this.$router.push('/')
      } catch (e) {
        console.log(e)
        this.error = true;
        this.errorVal = {
          title: 'Error while signing in',
          description: 'Email or Password incorrect!'
        };
        this.loading = false;
      }
      this.loading = false;
    },
    closeError(){
      this.error = false
    }
  }
};
</script>

<style lang="sass" scoped>
.sign-in
  width: 448px
  padding: 20px 40px 40px 40px
  background: white
  text-align: center
  border-radius: 8px

  &__header
    display: grid
    grid-column-gap: 20px
    grid-template-columns: calc(30% - 20px) 70%

  &__logo
    width: 30%
    margin-bottom: 20px

  &__title
    color: black
    font-size: 24px
    margin-bottom: 10px
    font-weight: normal
    font-family: google-sans, sans-serif

  &__message
    font-size: 13px
    margin-bottom: 40px


#background
  height: 100vh
  display: flex
  align-items: center
  justify-content: center
  background: #9431FE

.submit_btn
    background-color: #9431FE !important
    color:#fff
</style>

<style>
html {
  overflow-y: auto;
}
.text-field{
  height: 30px;
  margin: 10px 0px;
}
</style>
