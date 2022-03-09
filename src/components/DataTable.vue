<template>
    <div class="d-flex justify-center align-center" style="height: 100%">
      <v-card elevation="10" class="datatable">
        <div class="d-flex ma-5">
          <span class="title ml-3">{{ tableName }}</span>
          <v-spacer></v-spacer>
          <v-btn v-if="allow_add" @click="this.$emit('addNew')" color="#904B46" text-color="white" type="button"> Add New {{ tableName }} </v-btn>
        </div>
        <div v-if="showSearch" class="d-flex justify-end mx-8">
          <v-spacer></v-spacer>
          <div style="width:50%">
            <BaseInput @keyup="$emit('search',search)" :showLabel="false" icon="mdi-magnify" v-model="search" label="Search" />
          </div>
        </div>
    <v-table class="px-5" fixed-header :height="height">
        <thead style="background:#fff">
          <tr>
            <th v-if="badge">Badge</th>
            <th v-for="(column, index) in columns" :key="index" >{{ column.text }}</th>
            <th v-if="actions != 'none'"><div class="d-flex"><v-spacer></v-spacer><span>Actions</span></div></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in list" :key="index">
            <td v-if="badge"><v-icon size="30" v-if="data.badge" :color="data.badgeColor">{{ data.badge }}</v-icon></td>
            <template v-for="(head, index) in columns" :key="index">
              <td v-if="typeof data[head.value] === 'boolean'" >
                <v-checkbox class="boolean-value" @click.prevent v-model="data[head.value]"></v-checkbox>
              </td>
              <td v-else>
                {{ data[head.value] }}
              </td>
            </template>
            <td class="d-flex">
                <v-spacer></v-spacer>
                <v-btn v-if="actions.includes('view_details')" @click="this.$emit('view_details', data)" elevation="0" class="bg-transparent mr-2" size="xx-small"><v-icon size="25" style="color:green">mdi-information</v-icon></v-btn>
                <v-btn v-if="actions.includes('approve')" @click="this.$emit('updateApproval', data)" elevation="0" class="bg-transparent" size="xx-small"><v-icon size="30" style="color: #EEB609">mdi-crown</v-icon></v-btn>
                <v-btn v-if="actions.includes('edit')"  @click="this.$emit('update', data)" elevation="0" class="bg-transparent" size="xx-small"><v-icon size="25" style="color: green">mdi-pencil</v-icon></v-btn>
                <v-btn v-if="actions.includes('delete')" @click="this.$emit('delete', data)"  elevation="0" class="bg-transparent" size="xx-small"><v-icon size="25" style="color: red">mdi-delete</v-icon></v-btn>                
            </td>
          </tr>
        </tbody>
    </v-table>
    <v-divider ></v-divider>
    <div class="d-flex justify-center my-4">
        <v-pagination
          @next="$emit('pageNum',page)"
          @prev="$emit('pageNum',page)"
          @update:modelValue="$emit('updateCurrentPage',$event)"
          style="width:50%"
          v-model="page"
          :length="pages"
          rounded="circle"
        ></v-pagination>
    </div>
    </v-card>
    </div>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox'
import BaseInput from '@/components/BaseInput'

export default {
  name: 'Datatable',
  components:{
    BaseCheckbox,
    BaseInput
  },
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
      },
      height:{
        type: String,
        default: '60vh'
      },
      showSearch:{
        type: Boolean,
        default: true
      },
      pages:{
        type: Number,
        default: 1
      }
  },
  data() {
    return {
      search: '',
      page: 1
    }
  },
  computed: {
      list(){
          var list= this.dataList
          return list
      }
  },
}
</script>

<style >

.datatable{
    width: 80%;
    border-radius: 10px;
}
.title{
  font-size: 30px;
  font-family: google-sans, sans-serif;
  font-weight: 500;
  font-weight: 500;
  letter-spacing: 0.0125em;
  line-height: 2rem;
  word-break: break-all;
  text-transform: capitalize;
  font-weight: 500;
}
.v-selection-control__input:hover::before {
    opacity: 0
}
</style>