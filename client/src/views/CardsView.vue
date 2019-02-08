<template>
  <div class="uk-grid-small uk-grid-match uk-child-width-1-3@s uk-flex-center" uk-grid>
    <div v-for="link in links" :key="link._id" class="uk-card uk-card-default">
      <!-- Card Header -->
      <div class="uk-card-header card-head-bg">
        <h4 class="uk-text-truncate">
          <router-link :to="{name: 'DetailsView', params: {id: links._id}}" class="uk-link-heading" uk-tooltip="link.title | escapeEntities">
          {{link.title}}
          </router-link>
        </h4>
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand uk-text-meta uk-text-nowrap">
            <span uk-tooltip="Date saved">
              {{link.created_at | humanFormat}}
            </span>
          </div>
          <div class="uk-width-auto uk-text-meta">
            <span uk-icon="clock"></span>
            <span uk-tooltip="Aproximate reading time">
              {{link.reading_time | readingTime}} min
            </span>
          </div>
        </div>
      </div>
      <!-- Card Body -->
      <div class="uk-card-body uk-background-cover uk-light uk-height-small uk-padding-remove"
        :data-src="link.preview_picture | cachedImg(link._id, link.tags)" uk-img>
          <div class="uk-width-auto uk-float-right">
            <Tags :linkId="link._id" :tags="link.tags"></Tags>
          </div>
      </div>
      <!-- Card Footer -->
      <div class="uk-card-footer uk-padding-small card-bottom-trans">
        <div class="uk-grid-small uk-flex-middle" uk-grid>
          <div class="uk-width-expand uk-text-meta">
            <a :href="link.url" target="_blank" uk-tooltip="Go to saved link">
              <span uk-icon="link"></span>
              {{link.domain_name}}
            </a>
          </div>
          <div class="uk-width-auto">
            <Starred
              :isStarred="link.is_starred"
              :linkId="link._id"
              uk-tooltip="Add to Favorites"
            ></Starred>
          </div>
          <div class="uk-width-auto">
            <Archived
              :isArchived="link.is_archived"
              :linkId="link._id"
              uk-tooltip="Add to Archive"
            ></Archived>
          </div>
          <div class="uk-width-auto">
            <Trash
              :linkId="link._id"
            ></Trash>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tags from '@/components/Tags'
import Starred from '@/components/Starred'
import Archived from '@/components/Archived'
import Trash from '@/components/Trash'

export default {
  name: 'Cards',
  props: {
    links: Array
  },
  components: {
    Tags,
    Starred,
    Archived,
    Trash
  }
}
</script>
