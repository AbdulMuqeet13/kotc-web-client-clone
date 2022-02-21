<template>
  <router-view v-if="$route.fullPath.includes('auth')"/>
  <Dashboard v-else>
    <router-view/>
  </Dashboard>
</template>

<script>

import Dashboard from "./components/Dashboard";
export default {
  name: 'App',
  components: {Dashboard},
  data: () => ({
    //
  }),
}
</script>