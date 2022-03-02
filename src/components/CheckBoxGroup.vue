.<template>
  <h4 class="mt-5">{{ label }}</h4>
    <v-checkbox
        v-for="(item, index) in items" :key="index"
        v-model="values"
        :label="item.label"
        @change="this.$emit('update:modelValue',values)"
        :value="item.value"
    ></v-checkbox>
</template>

<script>
export default {
    props:{
        label:{
            type: String,
            required: true
        },
        items:{
            type: Array,
            required: true
        },
        modelValue:{
            type: Array,
            default: []
        }
    },
    data() {
        return {
            values: []
        }
    },
}
</script>

<style>

</style>