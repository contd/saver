<template>
  <div class="uk-section uk-section-xsmall uk-section-default uk-margin-remove uk-padding-remove">
    <div class="uk-container uk-margin-remove uk-padding-remove">
      <table class="uk-table uk-table-striped uk-margin-remove uk-padding-remove uk-width-expand">
        <thead>
          <tr>
            <th>Title</th>
            <th>Created</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in links" :key="link._id">
            <td class="uk-text-nowrap">
              <router-link :to="{name: 'DetailsView', params: {id: links._id}}" class="uk-link-heading" uk-tooltip="link.title | escapeEntities">
                {{link.title}}
              </router-link>
            </td>
            <td class="uk-text-nowrap">
              <span uk-tooltip="Date saved">
                {{link.created_at | humanFormat}}
              </span>
            </td>
            <td class="uk-text-nowrap">
              <Tags :linkId="link._id" :tags="link.tags"></Tags>
            </td>
            <td>
              <a :href="link.url" target="_blank" uk-tooltip="Go to original link">
                <span uk-icon="link"></span>
              </a>
            </td>
            <td>
              <Starred
                :isStarred="link.is_starred"
                :linkId="link._id"
                uk-tooltip="Add to Favorites"
              ></Starred>
            </td>
            <td>
              <Archived
                :isArchived="link.is_archived"
                :linkId="link._id"
                uk-tooltip="Add to Archive"
              ></Archived>
            </td>
            <td>
              <Trash :linkId="link._id"></Trash>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Tags from '@/components/Tags'
import Starred from '@/components/Starred'
import Archived from '@/components/Archived'
import Trash from '@/components/Trash'

export default {
  name: 'List',
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