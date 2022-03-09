.<template>
    <v-progress-linear
      indeterminate
      color="cyan"
      v-if="loader"
    ></v-progress-linear>
    <DataTable 
    :allow_add="false"
    :tableName="'Locations of '+ username"
    :columns="headers" 
    :dataList="dataList"
    actions="view_details"
    @view_details="showDetails"
    />
    <loading-dialog v-model="loading" message="Fething Data, Please wait..."/>
    <div v-if="detailModal" class="detail-modal">
      <div class="d-flex justify-end" style="width:100%">
        <v-btn @click="detailModal = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
        <v-card style="width:100%; min-height: 80vh" class="overlay-card m-0">
          <div>
            <h3>Basic Information</h3>
            <div class="d-flex flex-wrap justify-space-between">
              <div v-if="data.name" style="width: 49%">
                <BaseInput readonly v-model="data.name" label="Name" />
              </div>
              <div v-if="data.email" style="width: 49%">
                <BaseInput readonly v-model="data.email" label="Email" />
              </div>
              <div v-if="data.phone" style="width: 49%">
                <BaseInput readonly v-model="data.phone" label="Phone" />
              </div>
              <div v-if="data.website" style="width: 49%">
                <BaseInput readonly v-model="data.website" label="Website" />
              </div>
            </div>
          </div>

          <div>
            <h3 class="mt-5">Address</h3>
            <div class="d-flex justify-space-between flex-wrap">
              <div v-if="data.address.address" style="width: 100%">
                <BaseInput readonly v-model="data.address.address" label="Address" />
              </div>
              <div v-if="data.address.country" style="width: 24%">
                <BaseInput readonly v-model="data.address.country" label="Country" />
              </div>
              <div v-if="data.address.state" style="width: 24%">
                <BaseInput readonly v-model="data.address.state" label="State" />
              </div>
              <div v-if="data.address.city" style="width: 24%">
                <BaseInput readonly v-model="data.address.city" label="City" />
              </div>
              <div v-if="data.address.zip_code" style="width: 24%">
                <BaseInput readonly v-model="data.address.zip_code" label="Zip Code" />
              </div>
            </div>
            <div>
              <h3 class="mt-5">Company Team</h3>
                <DataTable 
                class="my-5"
                style="width:100%; height:100%"
                :allow_add="false"
                tableName=""
                :columns="team_headers" 
                :dataList="team_data"
                actions="none"
                height="50vh"
                />
            </div>
          </div>
        </v-card>
    </div>
    <error-dialog :reload="true" @value="closeError" v-model="error" :error="errorVal"/>
</template>

<script>
import DataTable from '@/components/DataTable'
import UserService from '@/services/UserService'
import LoadingDialog from '@/components/LoadingDialog'
import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import ErrorDialog from '@/components/ErrorDialog'
export default {
  name:'Companies',
  components: {
    DataTable,
    LoadingDialog,
    BaseInput,
    BaseTextArea,
    ErrorDialog
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Email',
          value: 'email'
        },
        {
          text: 'Phone',
          value: 'phone'
        },
        {
          text: 'Address',
          value: 'address.address'
        }
      ],
      team_headers:[
        {
          text: 'Name',
          value: 'first_name'
        },
        {
          text: 'Verified',
          value: 'is_verified'
        },
        {
          text: 'Phone',
          value: 'phone'
        }
      ],
      team_data: [],
      dataList:[],
      username: '',
      loading: false,
      detailModal: false,
      data: {},
      error: false,
      errorVal: {}
    }
  },
  async beforeMount(){
    try {
      this.loading = true
      let user_id = this.$route.query.id
      let response = await UserService.getCompanies(user_id)
      this.username = (await UserService.getUser(user_id)).data.first_name
      this.dataList = response.data
      this.loading = false
    } catch (error) {
      console.log(error)
      this.error = true;
      this.errorVal = {
          title: 'Error while Fetching Data',
          description: 'Check Your Connection'
      };
      this.loader = false
    }
    
  },
  methods:{
    showDetails(e){
      this.detailModal = true
      this.data = e
      e.company_team.forEach(element => {
        if (element.scopes === []) {
          element.scopes = 'None'
        }
        this.team_data.push(element.person)
      });
    }
  }
}
</script>

<style>
.list{
  box-sizing: border-box;
  border: 1px solid grey;
  border-radius: 5px;
  background: #f7f7f7;
  width: 100%;
  padding:8px;
}
.detail-modal{
  margin: auto;
  position: absolute;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px 5% 0 5%;
  height:100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  top: 0; left: 0; bottom: 0; right: 0;
}
.overlay-card{
  padding: 40px;
  overflow-y:scroll;
  height: 80vh;
}
</style>