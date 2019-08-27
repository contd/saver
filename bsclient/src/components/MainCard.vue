<template>
  <div class="card card-item m-0 p-0 shadow">
    <div class="card-header-img m-0 p-0" :style="styleObject"></div>
    <div class="card-body">
      <a class="text-muted" @click="showDetails">
        <h5
          class="card-title text-nowrap text-truncate"
          data-toggle="tooltip"
          data-placement="top"
          :title="title"
        >
          {{title}}
        </h5>
      </a>
      <div class="card-text">
        <div class="row text-muted m-0 p-0 card-cols">
          <div class="col-6 m-0 p-0 text-nowrap">
            <span>{{created_at | humanFormat}}</span>
          </div>
          <div class="col-3 m-0 p-0 text-nowrap">
            {{reading_time | readingTime}} min
          </div>
          <div class="col-1 m-0 p-0 text-center justify-center">
            <Archived
              :isArchived="is_archived"
              :linkId="id"
              uk-tooltip="Add to Archive"
            ></Archived>
          </div>
          <div class="col-1 m-0 p-0 text-center justify-center">
            <Starred
              :isStarred="is_starred"
              :linkId="id"
              uk-tooltip="Add to Favorites"
            ></Starred>
          </div>
          <div class="col-1 m-0 p-0 text-center justify-center">
            <Trash
              :linkId="id"
            ></Trash>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer text-muted">
      <div class="row">
        <div class="col-8">
          <a :href="url" class="card-link text-muted" target="_blank">
            <IconBase icon-name="LinkIcon">
              <LinkIcon></LinkIcon>
            </IconBase>
            {{domain_name}}
          </a>
        </div>
        <div class="col-4">
          <BadgeItem v-for="tag in tags" :key="tag"
            :name="tag"
          ></BadgeItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { eventBus } from '@/main'
import BadgeItem from '@/components/BadgeItem'
import { Archived, Starred, Trash } from '@/components/Buttons'
import { IconBase, LinkIcon } from '@/components/Icons'

export default {
  name: 'MainCard',
  props: {
    id: Number,
    title: String,
    text: String,
    url: String,
    domain_name: String,
    tags: Array,
    preview_picture: String,
    created_at: String,
    is_starred: Boolean,
    is_archived: Boolean,
    reading_time: Number,
    showItemDetails: Function
  },
  data() {
    return {
      styleObject: {
        'background-image': `url(${this.preview_picture})`
      }
    }
  },
  components: {
    BadgeItem,
    Archived,
    Starred,
    Trash,
    IconBase,
    LinkIcon
  },
  methods: {
    showDetails() {
      this.showItemDetails({
        itemId: this.id
      })
    }
  }
}
</script>

<style lang="css">
  .card-item {
    flex: auto;
    max-width: 29vw;
  }
  .card-header-img {
    background-size: cover;
    height: 150px;
  }
  .card-cols {
    font-size: 0.9rem;
  }
</style>