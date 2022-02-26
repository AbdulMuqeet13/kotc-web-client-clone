<template>
  <div class="mb-3 text-start">
    <label v-if="showLabel" :class="{errorLabel:(error.length>0)}">{{label}}</label>
    <input :type="type" :value="modelValue" :placeholder="label" @input="$emit('update:modelValue',$event.target.value)" :class="{error:(error.length>0)}"/>
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
</style>