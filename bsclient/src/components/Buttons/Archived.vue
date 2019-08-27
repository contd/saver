<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    :data-svg="dataSvg"
    @click="toggle"
  >
    <polyline
      :fill="isFilled"
      :stroke="stroke"
      stroke-width="1.1"
      points="4,10 8,15 17,4"
    ></polyline>
  </svg>
</template>

<script>
export default {
  name: 'Archived',
  props: {
    linkId: {
      type: String
    },
    isArchived: {
      type: Boolean
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
    },
    dataSvg: {
      type: String,
      default: "star"
    },
    onClick: {
      type: Function
    }
  },
  computed: {
    isFilled() {
      return this.isArchived ? '#FFDC00' : 'none'
    }
  },
  methods: {
    toggle: function() {
      this.isArchived = !this.isArchived

      this.$http.put(`${this.$baseUrl}/archive/${this.linkId}`, {
        is_archived: this.isArchived
      })
        .then(resp => {
          this.fill = this.isArchived ? '#FFDC00' : 'none'
          console.log(`Toggled is_archived: ${resp.data.is_archived}`)
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