<template>
  <div class="ma-10">
      <div class="d-flex justify-space-between">
        <v-card style="width:29%" class="pa-5">
          <p class="mb-5 welcome">Welcome <span style="color:#79201C; font-weight: 600 ">{{ name }}</span></p>
        </v-card>
        <v-card style="width: 69%" class="pa-5 d-flex flex-wrap justify-start">
          <p class="welcome" >Overall Statistics</p>
          <StatCard class="flex-grow-1" label="Reviews" :value="data.reviews" icon="mdi-star" background="#79201C" iconColor="#fff"/>
          <StatCard class="flex-grow-1" label="Customers" :value="data.customers" icon="mdi-account" background="green" iconColor="#fff"/>
          <StatCard class="flex-grow-1" label="Locations" :value="data.locations" icon="mdi-web" background="yellow" iconColor="#fff"/>
          <StatCard class="flex-grow-1" label="Active Campaigns" :value="data.active_campaigns" icon="mdi-arrow-right" background="blue" iconColor="#fff"/>
        </v-card>
      </div>
  </div>
  <loading-dialog v-model="loading" message="Fething Data, Please wait..."/>
  <error-dialog :reload="true" @value="closeError" v-model="error" :error="errorVal"/>
</template>

<script>
import StatCard from '@/components/StatCard'
import DashboardService from '@/services/DashboardService'
import LoadingDialog from '@/components/LoadingDialog'
import ErrorDialog from '@/components/ErrorDialog'

export default {
  name: 'Home',
  
  components: {
    StatCard,
    LoadingDialog,
    ErrorDialog
  },
  data() {
    return {
      data:{},
      loading: false,
      error: false,
      errorVal: {}
    }
  },
  computed: {
    name(){
      return JSON.parse(localStorage.getItem('auth_user')).first_name + ' ' + JSON.parse(localStorage.getItem('auth_user')).last_name
    }
  },
  async beforeMount() {
    this.loading = true
    try {
      const response = await DashboardService.getData()
      this.data = response.data
      console.log(this.data)
      this.loading = false
    } catch (error) {
      console.log(error)
      this.error = true;
      this.errorVal = {
          title: 'Error while Fetching Data',
          description: 'Check Your Connection'
      };
      this.loading = false
    }
  },
};
</script>

<style scoped>
  .welcome{
    width:100%;
    text-transform: Capitalize;
    font-size: 22px;
  }
</style>
