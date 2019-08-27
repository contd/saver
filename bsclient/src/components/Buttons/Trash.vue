<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline
      :fill="fill"
      :stroke="stroke"
      points="6.5 3 6.5 1.5 13.5 1.5 13.5 3" />
    <polyline
      :fill="fill"
      :stroke="stroke"
      points="4.5 4 4.5 18.5 15.5 18.5 15.5 4" />
    <rect x="8" y="7" width="1" height="9" />
    <rect x="11" y="7" width="1" height="9" />
    <rect x="2" y="3" width="16" height="1" />
  </svg>
</template>

<script>
export default {
  name: 'Trash',
  props: {
    linkId: {
      type: String
    },
    width: {
      type: String,
      default: "20"
    },
    height: {
      type: String,
      default: "20"
    },
    viewBox: {
      type: String,
      default: "0 0 20 20"
    },
    stroke: {
      type: String,
      default: '#999'
    },
    fill: {
      type: String,
      default: 'none'
    }
  },
  methods: {
    remove: () => {
      this.$http.put(`${this.$baseUrl}/remove/${this.linkId}`, {})
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