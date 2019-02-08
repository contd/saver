<template>
  <div class="uk-section-muted uk-grid-medium uk-flex-center uk-child-width-3-4" uk-grid>
    <div class="uk-card uk-card-default" :key="link._id">
      <div class="uk-card-header uk-background-muted">

        <div class="uk-grid uk-grid-small uk-padding-remove uk-margin-remove" uk-grid>
          <div class="uk-margin-remove uk-padding-remove uk-width-expand">
            <h1 class="article-title" contenteditable="true">
              {{link.title}}
            </h1>
          </div>
          <div class="uk-margin-remove uk-padding-remove uk-width-auto">
            <router-link class="uk-button uk-button-default uk-button-small uk-margin-small-left"
              :to="this.$router.go(-1)">BACK</router-link>
          </div>
        </div>

        <div class="uk-grid-small uk-flex-middle uk-text-meta" uk-grid>

          <div class="uk-width-auto uk-text-nowrap">
            <a :href="link.url" target="_blank" uk-tooltip="Go to original link">
              <span uk-icon="link"></span>
            </a>
          </div>

          <div class="uk-width-auto uk-text-nowrap">
            <datepicker
              v-model="created_at"
              name="created_at"
              format="humanFormat"
              @selected="changeDate"
            ></datepicker>
          </div>

          <div class="uk-width-auto uk-text-nowrap">
            <span uk-icon="clock"></span>
            <span uk-tooltip="Aproximate reading time">
              {{link.reading_time | readingTime}} min
            </span>
          </div>

          <div class="uk-width-auto uk-text-nowrap">
            <Starred
              :isStarred="link.is_starred"
              :linkId="link._id"
              uk-tooltip="Add to Favorites"
            ></Starred>
          </div>

          <div class="uk-width-auto uk-text-nowrap">
            <Archived
              :isArchived="link.is_archived"
              :linkId="link._id"
              uk-tooltip="Add to Archive"
            ></Archived>
          </div>

          <div class="uk-width-expand">
            <multiselect
              v-model="selected"
              :options="options"
              :multiple="true"
              :taggable="true"
              @tag="addTag"
              tag-placeholder="Add this as new tag"
              placeholder="Type to search or add tag"
              label="tags"
              track-by="code"
            >
            </multiselect>
          </div>
        </div>
      </div>
      <div class="uk-card-body">
        <div class="uk-article article">
          {{link.content | wrootReplace | codeReplace}}
        </div>
      </div>
      <div class="uk-card-footer">

      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

import Starred from '@/components/Starred'
import Archived from '@/components/Archived'

export default {
  name: 'DetailsView',
  props: {
    id: String
  },
  data() {
    return {
      link: {},
      selected: [],
      options: []
    }
  },
  components: {
    Starred,
    Archived,
    Multiselect,
    Datepicker
  },
  mounted() {
    hljs.initHighlightingOnLoad()
    axios.get(`${this.$baseUrl}/${this.id}`)
      .then(resp => {
        this.link = resp.data
        this.selected = this.link.tags.map(tag => {
          return {
            name: tag,
            code: tag.substring(0, 2) + Math.floor((Math.random() * 10000000))
          }
        })
        this.options = this.$tags.default.map(tag => {
          return {
            name: tag.label,
            code: tag.substring(0, 2) + Math.floor((Math.random() * 10000000))
          }
        })
      })
      .catch(err => {
        this.link = []
        console.log(`Error getting link details: ${err.message}`)
      })
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.selected.push(tag)
      // Axios put to update
    },
    humanFormat(dateStr) {
      return moment(dateStr).format("ddd, MMM Do YYYY")
    },
    changeDate(newDate) {
      this.created_at = newDate.toISOString()
      // Axis put to update
    }
  }
}
</script>