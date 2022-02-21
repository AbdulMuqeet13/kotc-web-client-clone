<template>
   <v-layout style="min-height: 100vh; overflow: hidden">
    <v-app-bar
      fixed
      color="deep-purple"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="ml-10 title">Dashboard</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      class="side-bar"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
        <template v-for="(route, index) in routes" :key="index">
          <v-list-item v-if="route.isVisible" :prepend-icon="route.icon" :title="route.title" :to="route.to"></v-list-item>
        </template>
          

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-layout>




  <!-- <div>
    <v-app-bar app dark color="primary" elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-app-bar-title>Dashboard</v-app-bar-title>
      <v-spacer/>
    </v-app-bar>
    <v-main class="main-bg">
      <v-container>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="drawer" app>
      <v-divider/>
      <v-divider/>
      <template v-for="(route, key) in routes">
        <v-list-item
            v-if="route.isVisible"
            :key="key"
            class="route"
            color="#da57a7"
            active-class="route--active"
            exact
            dense
        >
          <v-list-item-icon>
            <v-icon v-text="route.icon"/>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="route.title"/>
          </v-list-item-content>
        </v-list-item>
        <v-divider v-else-if="route.isDivider" :key="key" style="margin: 10px 20px"/>
      </template>
    </v-navigation-drawer>
  </div> -->
</template>

<script>

export default {
  name: 'Dashboard',
  data: () => ({
    drawer: true,
    loading: false,
  }),
  methods: {
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
          isVisible: true 
        },
        {
          to: '/users',
          title: 'Users',
          icon: 'mdi-account-group',
          isVisible: true 
        },
        {
          to: '/customers',
          title: 'Customers',
          icon: 'mdi-account-group',
          isVisible: true 
        },
      ];
    }
  }
};
</script>

<style lang="sass" scoped>
.logo
  display: block
  margin: 5px auto
  border-radius: 10px

.route
  margin: 5px
  text-align: left
  overflow: hidden
  border-radius: 4px
  font-size: 20px !important
  font-family: "Roboto", sans-serif

  i
    font-size: 20px

  &--active i
    color: inherit

  &--active
    color: #495db7

.main-bg
  background: linear-gradient(to bottom, #1976d2 300px, white 300px)

.side-bar
  height: 91vh

.title
  color: #fff 
</style>
