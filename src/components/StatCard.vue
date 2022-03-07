.<template>
  <div class="d-flex align-center mt-4">
      <v-card :color="background" class="icon mr-3">
          <v-icon size="30" :color="iconColor">{{ icon }}</v-icon>
      </v-card>
      <div class="text">
          <h4>{{ label }}</h4>
          <h5>{{ value }}</h5>
      </div>
  </div>
</template>

<script>
export default {
    name: 'StatCard',
    props:{
        icon:{
            type: String,
            required: true
        },
        label:{
            type: String,
            default: ''
        },
        value: {
            type: Number,
            required: true
        },
        iconColor:{
            type: String,
            default: ''
        },
        background:{
            type: String,
            default: ''
        }
    }
}
</script>

<style>
    .text h4{
        text-transform: capitalize;
    }
    .icon{
        padding: 5%;
    }
</style>