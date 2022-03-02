.<template>
    <v-progress-linear
      indeterminate
      color="cyan"
      v-if="loader"
    ></v-progress-linear>
    <DataTable 
    :allow_add="false"
    :tableName="'Comapanies of '+ username"
    :columns="headers" 
    :dataList="dataList"
    actions="view_details"
    @view_details="showDetails"
    />
    <loading-dialog v-model="loading" message="Fething Data, Please wait..."/>
    <v-row justify="center">
      <v-dialog scrollable fullscreen transition="dialog-bottom-transition" v-model="detailModal">
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="detailModal = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card style="padding: 40px;">
          <div>
            <h3>Basic Information</h3>
            <div class="d-flex justify-space-between">
              <BaseInput style="width: 48%" label="Name" />
              <BaseInput style="width: 48%" label="Email" />
            </div>
            <div class="d-flex justify-space-between">
              <BaseInput style="width: 48%" label="Phone" />
              <BaseInput style="width: 48%" label="Website" />
            </div>
          </div>

          <div>
            <h3 class="mt-5">Address</h3>
            <div class="d-flex justify-space-between">
              <BaseTextArea style="width: 100%" label="Address" />
            </div>
            <div class="d-flex justify-space-between">
              <BaseInput  label="Country" />
              <BaseInput  label="State" />
              <BaseInput  label="City" />
              <BaseInput  label="Zip Code" />
            </div>
            <div>
              <h3 class="mt-5">Team</h3>
              <div class="d-flex">
                <DataTable 
                style="width:100%"
                :allow_add="false"
                tableName=""
                :columns="team_headers" 
                :dataList="team_data"
                actions="none"
                />
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
</template>

<script>
import DataTable from '@/components/DataTable'
import UserService from '@/services/UserService'
import LoadingDialog from '@/components/LoadingDialog'
import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
export default {
  name:'Companies',
  components: {
    DataTable,
    LoadingDialog,
    BaseInput,
    BaseTextArea
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
          value: 'Name'
        },
        {
          value: 'Verified'
        },
        {
          value: 'Phone'
        },
        {
          value: 'Scopes'
        }
      ],
      team_data: [],
      dataList:[],
      username: '',
      loading: false,
      detailModal: false
    }
  },
  async beforeMount(){
    this.loading = true
    let user_id = this.$route.query.id
    let response = await UserService.getCompanies(user_id)
    this.username = (await UserService.getUser(user_id)).data.first_name
    this.dataList = response.data
    this.loading = false
  },
  methods:{
    showDetails(){
      this.detailModal = true
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
</style>