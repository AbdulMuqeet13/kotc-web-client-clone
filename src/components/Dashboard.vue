<template>
  <v-app>
    <v-main>
      <v-app-bar
          density="compact"
          color="#79201C"
          class="d-flex"
      >
        <v-app-bar-nav-icon style="color: white; background: transparent" @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title  class="ml-10 title"><router-link style="color:#fff; text-decoration:none" to="/">Dashboard</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="logout-btn" @click="logout"><v-icon>mdi-logout</v-icon> Logout</v-btn>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
      >
        <h4 class="drawer-heading d-flex align-center ">  
          <v-avatar size="45" color="#904B46" class="mr-2">
            <p style="color:white;" class="py-3">{{ initials }}</p>
          </v-avatar>
        {{ name }}</h4>
        <v-list
            nav
            density="compact"
            class="mt-8"
        >
          <v-list-item-group
              active-class="deep-purple--text text--accent-4"
          >
            <template v-for="(route, index) in routes" :key="index">
              <v-list-item color="#717171" active-color="#79201C" v-if="route.isVisible" :to="route.to">
                <v-list-item-avatar><v-icon size="25">{{route.icon}}</v-icon></v-list-item-avatar>
                <v-list-item-title class="ml-4" style="font-size:14px">{{route.title}}</v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item color="#717171" active-color="#79201C" @click="logout">
              <v-list-item-avatar><v-icon size="25">mdi-logout</v-icon></v-list-item-avatar>
              <v-list-item-title class="ml-4" style="font-size:14px">Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>

import {provide} from 'vue'

export default {
  name: 'Dashboard',
  data: () => ({
    drawer: true,
    loading: false,
    scope: []
  }),
  methods: {
    logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('auth_user')
      this.$router.push('/auth/sign-in')
    }
  },
  setup(){
    // const scope = ['user:view', 'user:create']
    const scope = JSON.parse(localStorage.getItem('auth_user')).scopes
    const name = JSON.parse(localStorage.getItem('auth_user')).first_name + ' ' + JSON.parse(localStorage.getItem('auth_user')).last_name
    // const name = 'Test User'
    var initials = JSON.parse(localStorage.getItem('auth_user')).first_name.substring(0,1) + JSON.parse(localStorage.getItem('auth_user')).last_name.substring(0,1)
    // var initials = 'TU'
    initials = initials.toUpperCase()
    provide('scope', scope)
    return {
      scope,
      name,
      initials
    }
  },
  computed: {
    routes() {
      return [
        {
          to: '/',
          title: 'Dashboard',
          icon: 'mdi-view-dashboard-variant',
          isVisible: true
        },
        {
          to: '/notifications',
          title: 'Notifications',
          icon: 'mdi-bell',
          isVisible: this.scope.includes("notification:view")
        },
        {
          to: '/users',
          title: 'Users',
          icon: 'mdi-account-group',
          isVisible: this.scope.includes("user:view")
        },
        // {
        //   to: '/companies',
        //   title: 'Companies',
        //   icon: 'mdi-domain',
        //   isVisible: true
        // },
        {
          to: '/customers',
          title: 'Customers',
          icon: 'mdi-account-group',
          isVisible: this.scope.includes("customer:view")
        },
        {
          to: '/campaigns-stats',
          title: 'Request Stats',
          icon: 'mdi-file-chart',
          isVisible: this.scope.includes("request:view")
        },
      ];
    }
  }
};
</script>

<style lang="sass" scoped>

.side-bar
  height: 91vh

.title
  color: #fff
</style>