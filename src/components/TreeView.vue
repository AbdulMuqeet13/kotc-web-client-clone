.<template>
    <div>
        <h4 class="mb-5">Select User Scope</h4>
        <div v-for="(item, index) in items" :key="index">
            <div class="d-flex mt-5 justify-start">
                <v-btn @click="showChildren(index)" elevation="0" class="bg-transparent" size="xx-small"><v-icon>mdi-chevron-down</v-icon></v-btn>
                <v-checkbox
                :label="item.name"
                @change="updateAll(index)"
                v-model="item.checked"
                ></v-checkbox>
            </div>
            <div v-if="children[index]" class="ml-10 my-2">
                <v-checkbox
                class="my-2"
                v-for="(child, child_index) in item.children" :key="child_index"
                v-model="scope"
                :label="child + ' ' + item.name"
                @change="updateSingle(index)"
                :value="item.name.toLowerCase()+ ':' +child.toLowerCase()"
                ></v-checkbox>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            scope:[],
            panel: [],
            children: []
        }
    },
    props: {
        items: {
            type: Array,
            required: true
        },
        modelValue:{
            type: Array,
            default: []
        },
        test:{
            type: Array,
        },
        label:{
            type: String,
            required: true
        }
    },
    async beforeMount() {
        this.scope = this.modelValue
        this.items.forEach(item => {
            this.scope.forEach(scope => {
                if (scope.includes(item.id)) {
                    item.checked = true
                }
            });
        });
    },
    updated(){
        this.$emit('update:modelVlaue',this.scope)
    },
    methods: {
        updateAll(index){
                if(this.items[index].checked){
                    this.items[index].children.forEach(child => {
                        if (!this.scope.includes(this.items[index].id.toLowerCase()+ ':' +child.toLowerCase())) {
                            this.scope.push(this.items[index].id.toLowerCase()+ ':' +child.toLowerCase())   
                        }
                    });
                }
                else{
                    this.items[index].children.forEach(child => {
                        if (this.scope.includes( this.items[index].id.toLowerCase()+ ':' +child.toLowerCase() ) ) {
                            this.scope.splice( this.scope.indexOf( this.items[index].id.toLowerCase()+ ':' +child.toLowerCase() ), 1)
                        }
                    });
                }
            this.$emit('update:modelValue',this.scope)
        },
        updateSingle(index){
            this.items[index].checked = true
            this.$emit('update:modelValue',this.scope)
        },
        showChildren(index){
            this.children[index] = ! this.children[index]
        }
    }
}
</script>

<style>

</style>