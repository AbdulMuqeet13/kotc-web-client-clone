.<template>
  <v-dialog v-model="modelValue">
        <v-card style="padding: 40px">
            <p class="span-2 form__title mb-0">You Sure, Want to delete this Item</p>
            <div class="d-flex justify-center">
                <v-btn @click="this.$emit('delete')" text-color="white" color="red">Yes</v-btn>
                <v-btn class="ml-3" @click="this.$emit('update:modelValue',false)" text-color="white" color="green">No</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:{
        message:{
            type: String,
            required:true
        },
        modelValue:{
            type: Boolean,
            default: false
        }
    },

}
</script>

<style>

</style>