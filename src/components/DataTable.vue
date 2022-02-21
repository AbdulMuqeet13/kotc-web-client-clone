<template>
    <div class="datatable">
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
                <!-- <router-link :to="{name: 'Edit'+tableName, params: { id:data.id } }" ><i class="fas fa-pencil-alt"></i></router-link> -->
                <i @click="deleteRow(data.id)" class="fas fa-trash"></i>
            </td>
          </tr>
        </tbody>
    </v-table>
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
        }
    },
    computed: {
        list(){
            var list= this.dataList
            return list
        }
    },
    methods: {
        // deleteRow(id){
            
        //     EventService.delete(id,this.tableName)
        //      .then(() => {
        //          this.list.forEach(element => {
        //              if (element.id === id) {
        //                 //  console.log(this.list.indexOf(element))
        //                 this.list.splice(this.list.indexOf(element)) 

        //              }
        //          });
                 
        //      }).catch((err) => {
        //          console.log(err)
        //      });
        // }
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
    width: 100%;
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