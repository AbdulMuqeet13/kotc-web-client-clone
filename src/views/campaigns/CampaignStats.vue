.<template>
  <v-progress-linear
      indeterminate
      color="cyan"
      v-if="loader"
    ></v-progress-linear>
    <DataTable 
    :badge="true"
    :allow_add="false"
    tableName="Request Statistcs"
    :columns="headers" 
    :dataList="dataList"
    actions= "none"
    :showSearch="false"
    />
    <error-dialog :reload="true" @value="closeError" v-model="error" :error="errorVal"/>
</template>

<script>
import DataTable from '@/components/DataTable'
import CampaignService from '@/services/CampaignService'
import ErrorDialog from '@/components/ErrorDialog'

export default {
    name: 'CampaignStats',
    components: {
        DataTable,
        ErrorDialog
    },

    data() {
        return {
            headers:[
                {
                    text: "Subject",
                    value: "subject"
                },
                {
                    text: "Sent",
                    value: "sent"
                },
                {
                    text: "Clicked",
                    value: "clicked"
                },
                {
                    text: "Opened",
                    value: "opened"
                },
                {
                    text: "Scored",
                    value: "scored"
                },
            ],
            dataList: [],
            loader: false,
            errorVal:{},
            error:false
        }
    },
    async beforeMount() {
        this.loader = true
        try {
            let response = await CampaignService.getStats()
            let data = response.data.sort( (a,b)=> a.scored < b.scored ? 1: -1)
            data[0].badge = 'mdi-shield-star'
            data[0].badgeColor = '#EEB609'
            data[1].badge = 'mdi-shield-star'
            data[1].badgeColor = '#AFB1AE'
            this.dataList = data
            this.loader = false
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

}
</script>

<style>

</style>