<template>
    <div class="d-flex justify-center align-center" style="height: 100%">
      <v-card elevation="10" class="datatable">
        <div class="d-flex ma-5">
          <span class="title ml-3">{{ tableName }}</span>
          <v-spacer></v-spacer>
          <v-btn v-if="allow_add" @click="this.$emit('addNew')" color="#904B46" text-color="white" type="button"> Add New {{ tableName }} </v-btn>
        </div>
    <v-table class="px-5" fixed-header height="80vh">
        <thead>
          <tr>
            <th v-if="badge">Badge</th>
            <th v-for="(column, index) in columns" :key="index" >{{ column.text }}</th>
            <th v-if="actions != 'none'"><div class="d-flex"><v-spacer></v-spacer><span>Actions</span></div></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in list" :key="index">
            <td v-if="badge"><v-icon size="30" v-if="data.badge" :color="data.badgeColor">{{ data.badge }}</v-icon></td>
            <td v-for="(head, index) in columns" :key="index">{{ data[head.value] }}</td>
            <td>
              <div class="d-flex">
                <v-spacer></v-spacer>
                <v-btn v-if="actions.includes('view_details')" @click="this.$emit('view_details', data)" elevation="0" class="bg-transparent mr-2" size="xx-small"><v-icon size="small" >mdi-eye</v-icon></v-btn>
                <v-btn v-if="actions.includes('approve')" @click="this.$emit('updateApproval', data)" elevation="0" class="bg-transparent" size="xx-small"><v-icon size="small" style="color: green">mdi-check-circle</v-icon></v-btn>
                <v-btn v-if="actions.includes('edit')"  @click="this.$emit('update', data)" elevation="0" class="bg-transparent" size="xx-small"><v-icon size="small" style="color: green">mdi-pencil</v-icon></v-btn>
                <v-btn v-if="actions.includes('delete')" @click="this.$emit('delete', data)"  elevation="0" class="bg-transparent" size="xx-small"><v-icon size="small" style="color: red">mdi-delete</v-icon></v-btn>
              </div>
                
            </td>
          </tr>
        </tbody>
    </v-table>
    </v-card>
    </div>
</template>

<script>

export default {
  name: 'Datatable',
  props: {
      columns: {
          type: Array,
          required: true
      },
      dataList: {
          type: Array,
          required: true
      },
      tableName: {
          type: String,
          required: true
      },
      allow_add: {
        type: Boolean,
        default: true
      },
      actions: {
        type: Array,
        required: true
      },
      badge: {
        Type: Array,
        default: false 
      }
  },
  computed: {
      list(){
          var list= this.dataList
          return list
      }
  },
  methods:{

  }
}
</script>

<style scoped>

.datatable{
    width: 80%;
    border-radius: 10px;
}
.title{
  font-size: 25px;
  font-family: google-sans, sans-serif;
  font-weight: 500;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
}

</style>