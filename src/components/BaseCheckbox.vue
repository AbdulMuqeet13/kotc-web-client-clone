.<template>
  <div class="d-flex">
      <input :name="value" :value="value" type="checkbox">
      <label @change="this.$emit('update:modelValue', this.value)" :for="value">{{ label }}</label>
  </div>
</template>

<script>
export default {
    props:{
        label: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            required: true
        },
        modelValue: {
            type: [String, Number],
            default: ''
        }
    }
}
</script>

<style>

</style>