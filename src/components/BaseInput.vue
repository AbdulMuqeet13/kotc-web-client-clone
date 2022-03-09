<template>
  <div class="mb-3 text-start" style="position:relative">
    <label v-if="showLabel" :class="{errorLabel:(error.length>0)}">{{label}}</label>
    <input v-bind="$attrs" :type="type" :value="modelValue" :placeholder="label" @input="$emit('update:modelValue',$event.target.value)" :class="{error:(error.length>0)}"/>
    <v-btn size="ss-small" elevation="0"  v-if="icon.length > 1" @click="this.$emit('iconClick')" class="input-icon"><v-icon>{{ icon }}</v-icon></v-btn>
    <v-btn size="ss-small" elevation="0"  v-if="prepend.length > 1" @click="this.$emit('prependCLick')" class="prepend-icon"><v-icon>{{ prepend }}</v-icon></v-btn>
    <p v-if="error.length>0">{{error}}</p>
  </div>
</template>
<script>
export default {
  name: "TextField",
  props:{
    type:String,
    label:String,
    error:{
      type:String,
      default:''
    },
    modelValue:{
      type:[String,Number],
      default:''
    },
    showLabel:{
      type:Boolean,
      default:true
    },
    icon:{
      type: String,
      default: ''
    },
    prepend:{
      type:String,
      default: ''
    }
  },
}
</script>
<style scoped>
p{
  text-align: start;
  color: red;
  font-size: 80%;
}
input{
  box-sizing: border-box;
  border: 1px solid grey;
  border-radius: 5px;
  background: #f7f7f7;
  width: 100%;
  padding:8px;
}
.error{
  border: 1px solid red;
}
.errorLabel{
  color: darkred;
}
.input-icon{
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.prepend-icon{
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>