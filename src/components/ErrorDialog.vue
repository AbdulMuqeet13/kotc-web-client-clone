<template>
  <v-dialog v-model="flag" @input="$emit('value', false)">
    <v-card style="padding: 10px 0">
      <v-card-title style="font-family: google-sans, sans-serif; font-size: 24px">
        {{ error.title }}
      </v-card-title>
      <v-card-text>
        {{ error.description }}
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn v-if="reload" class="btn-primary" elevation="0" @click="this.$router.go()">Reload</v-btn>
        <v-btn v-else class="btn-primary" elevation="0" @click="$emit('update:modelValue', false)">Ok</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ErrorDialog",

  model: {
    prop: 'flag',
    event: 'value'
  },

  props: {
    flag: {
      type: Boolean,
      default: false
    },

    error: {
      type: Object,
      default: () => ({})
    },
    reload: {
      type: Boolean,
      default: false
    }
  }
}
</script>
