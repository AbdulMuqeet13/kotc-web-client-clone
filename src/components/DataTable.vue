<template>
    <div class="d-flex justify-center align-center" style="height: 100%">
      <v-card class="datatable">
        <router-link v-if="allow_add" :to="{name: 'Add'+tableName}"><button class="add-new" type="button"> Add New {{ tableName }} </button></router-link>
    <v-table fixed-header height="80vh">
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index" >{{ column.text }}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in list" :key="index">
            <td v-for="(head, index) in columns" :key="index">{{ data[head.value] }}</td>
            <td>
                <v-btn v-if="actions.includes('approve')" @click="this.$emit()" elevation="0" class="bg-transparent" size="xx-small"><v-icon size="small" style="color: green">mdi-check-circle</v-icon></v-btn>
                <v-btn v-if="actions.includes('edit')"  elevation="0" class="bg-transparent" size="xx-small"><v-icon size="small" style="color: green">mdi-pencil</v-icon></v-btn>
                <v-btn v-if="actions.includes('delete')"  elevation="0" class="bg-transparent" size="xx-small"><v-icon size="small" style="color: red">mdi-delete</v-icon></v-btn>
            </td>
          </tr>
        </tbody>
    </v-table>
    </v-card>
    </div>
</template>

<script>
// import EventService from '@/services/EventService'

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
        type: String,
        default: ''
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

<style>
.fa-pencil-alt{
    color:blue
}
.fa-trash{
    color: crimson;
    margin-left: 20px;
}
.fas{
    cursor: pointer;
}
.datatable{
    width: 80%;
}
.add-new{
    margin-left: 80%;
    background: #222;
    border-radius: 10px;
    color: #fff;
    padding: 10px;
    cursor: pointer;
}
</style>