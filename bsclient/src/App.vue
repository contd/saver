<template>
  <b-container fluid>
    <b-row>
      <NavBar
        :homeClick="homeClick"
      >
        <a class="nav-link" :class="archiveClass" @click="toggleArchive">Archive</a>
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
          <label class="btn btn-secondary" :class="cardsActive">
            <input type="radio" v-model="view" value="cardsView" autocomplete="off"> Cards
          </label>
          <label class="btn btn-secondary" :class="listActive">
            <input type="radio" v-model="view" value="listView" autocomplete="off"> List
          </label>
        </div>
      </NavBar>
    </b-row>
    <b-row class="text-center justify-content-center tags-navbar">
      <BadgeItem v-for="tag in this.$tags.default" :key="tag"
        :name="tag.label"
        :tagButtonClick="tagButtonClick"
      ></BadgeItem>
    </b-row>
    <b-row v-if="view === 'cards'">
      <div class="d-flex flex-wrap">
        <MainCard v-for="link in links" :key="link.id"
          v-bind="link"
          class="m-1"
        ></MainCard>
      </div>
    </b-row>
    <b-row v-else>
      <div class="mlist m-0"></div>
    </b-row>
    <b-row>
      <NavFooter></NavFooter>
    </b-row>
  </b-container>
</template>

<script>
//import { eventBus } from '@/main'
import { NavBar, NavFooter, MainCard, BadgeItem } from '@/components'

export default {
  name: 'app',
  components: {
    NavBar,
    NavFooter,
    MainCard,
    BadgeItem
  },
  data() {
    return{
      links: [],
      view: 'cards',
      archive: false
    }
  },
  mounted() {
    this.$http.get(this.$baseUrl)
      .then(resp => {
        this.links = resp.data
      })
      .catch(err => {
        console.log(`Error fetching links: ${err}`)
      })
  },
  computed: {
    archiveClass() {
      if (this.archive) {
        return 'active'
      } else {
        return
      }
    },
    cardsActive() {
      this.view === 'cards' ? 'active' : ''
    },
    listActive() {
      this.view !== 'cards' ? 'active' : ''
    }
  },
  methods: {
    showItemDetails(data) {
      // Use data.linkId to get details from this.links
      // Then switch view=details with details
    },
    homeClick() {
      const getUrl = `${this.$baseUrl}`
      this.getLinks(getUrl)
    },
    tagButtonClick(data) {
      const getUrl = `${this.$baseUrl}/${this.archive ? 'archive' : 'by'}/${data.tag}`
      this.getLinks(getUrl)
    },
    getLinks(getUrl) {
      this.$http.get()
        .then(resp => {
          this.links = resp.data
        })
        .catch(err => {
          console.log(`Error fetching links: ${err}`)
        })
    },
    toggleArchive() {
      this.archive = !this.archive
      const getUrl = `${this.$baseUrl}${this.archive ? '/archive' : ''}`

      this.$http.get(getUrl)
      .then(resp => {
        this.links = resp.data
      })
      .catch(err => {
        console.log(`Error fetching links: ${err}`)
      })
    }
  }
}
</script>

<style lang="css">
  .tags-navbar {
    padding: 0.5em;
    font-size: 0.8em;
  }
</style>