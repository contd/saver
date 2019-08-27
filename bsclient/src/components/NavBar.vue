<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand @click="onHomeClick">Saved</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <slot></slot>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
//import { eventBus } from '@/main'

export default {
  name: 'NavBar',
  props: {
    homeClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    onHomeClick() {
      this.homeClick({})
    }
  }
}
</script>

<style lang="css">
  .navbar {
    width: 100vw;
  }
</style>