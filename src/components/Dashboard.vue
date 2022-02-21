<template>
  <v-app>
    <v-main>
      <v-app-bar
          density="compact"
          color="deep-purple"
      >
        <v-app-bar-nav-icon style="color: white; background: transparent" @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="ml-10 title">Dashboard</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
          v-model="drawer"
      >
        <v-list
            nav
            density="compact"
        >
          <v-list-item-group
              active-class="deep-purple--text text--accent-4"
          >
            <template v-for="(route, index) in routes" :key="index">
              <v-list-item v-if="route.isVisible" :to="route.to">
                <v-list-item-avatar><v-icon >{{route.icon}}</v-icon></v-list-item-avatar>
                <v-list-item-title>{{route.title}}</v-list-item-title>
              </v-list-item>
            </template>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <slot></slot>
    </v-main>
  </v-app>
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