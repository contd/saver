<template>
  <div>
    <div class="uk-section uk-section-xsmall uk-section-default uk-margin-small-bottom uk-margin-remove-top uk-padding-remove-bottom uk-padding-remove-top">
      <div class="uk-grid uk-grid-small uk-padding-remove uk-margin-remove" uk-grid>
        <TitleHeader>
          <TitleItems slot="title" title="Saved" :subTitle="curTag"></TitleItems>
          <NavItems slot="nav" :onClick="changeView" :view="view" :viewBtn="viewBtn" :path="path">
            <NavButton @click="changeView(view, '/')">Home</NavButton>
            <NavButton @click="changeView(view, 'archive')">Archive</NavButton>
            <NavButton @click="changeView(view, path)">{{viewBtn}} View</NavButton>
          </NavItems>
        </TitleHeader>
        <TagsHeader>
          <TagButton v-for="tag in this.$tags.default"
            :key="tag.label"
            :path="path"
            :tag="tag.label"
            @click="changeView(view, path, tag.label)"
          >
            {{tag.label}}
          </TagButton>
        </TagsHeader>
      </div>
    </div>
    <div class="uk-section uk-section-xsmall uk-section-muted">
      <div class="uk-container">
        <CardsView v-if="view === 'cards'" :links="links" :path="path"></CardsView>
        <ListView v-if="view === 'list'" :links="links" :path="path"></ListView>
      </div>
    </div>
    <slot name="footer">
      <div class="uk-section uk-section-secondary">
        Footer
      </div>
    </slot>
  </div>
</template>

<script>
import { TagsHeader, TitleHeader, TitleItems, NavItems } from '@/components/header'
import { NavButton, TagButton } from '@/components/buttons'
import { CardsView, ListView } from '@/views'
import axios from 'axios'

export default {
  name: 'Layout',
  components: {
    TagsHeader,
    TagButton,
    TitleHeader,
    TitleItems,
    NavItems,
    NavButton,
    CardsView,
    ListView
  },
  data() {
    return {
      links: [],
      path: 'by',
      view: 'card',
      viewBtn: 'List',
      curTag: 'javascript'
    }
  },
  mounted() {
    axios.get(`${this.$baseUrl}`)
      .then(resp => {
        this.links = resp.data
      })
      .catch(err => {
        this.links = []
        console.log(`Error getting links: ${err.message}`)
      })
  },
  methods: {
    changeView(view, path, tag) {
      this.path = path
      if (view === 'card') {
        this.view = 'list'
        this.viewBtn = 'Card'
      } else {
        this.view = 'card'
        this.viewBtn = 'List'
      }
      const getPath = `${this.$baseUrl}${path ? `/${path}` : ''}${tag ? `/${tag}` : ''}`
      axios.get(getPath)
        .then(resp => {
          this.links = resp.data
        })
        .catch(err => {
          this.links = []
          console.log(`Error getting links: ${err.message}`)
        })
    }
  }
}
</script>