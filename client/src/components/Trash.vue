<template>
  <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <polyline fill="none" stroke="#999" points="6.5 3 6.5 1.5 13.5 1.5 13.5 3" />
    <polyline fill="none" stroke="#999" points="4.5 4 4.5 18.5 15.5 18.5 15.5 4" />
    <rect x="8" y="7" width="1" height="9" />
    <rect x="11" y="7" width="1" height="9" />
    <rect x="2" y="3" width="16" height="1" />
  </svg>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Trash',
  props: {
    linkId: String
  },
  data() {
    return {
      url: `/remove/${this.linkId}`
    }
  },
  methods: {
    remove: () => {
      axios.put(`${this.$baseUrl}${this.url}`, {})
        .then(resp => {
          console.log(`Deleted link: ${resp}`)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px;
  cursor: pointer;
}
</style>