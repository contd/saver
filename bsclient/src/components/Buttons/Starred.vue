<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    :data-svg="dataSvg"
    @click="toggle"
  >
    <polygon
      :fill="isFilled"
      :stroke="stroke"
      stroke-width="1.01"
      points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27">
    </polygon>
  </svg>
</template>

<script>
export default {
  name: 'Starred',
  props: {
    linkId: {
      type: String
    },
    isStarred: {
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
      return this.isStarred ? '#FFDC00' : 'none'
    }
  },
  methods: {
    toggle() {
      this.isStarred = !this.isStarred
      this.$http.put(`${this.$baseUrl}/starred/${this.linkId}`, {
        is_starred: this.isStarred
      })
        .then(resp => {
          // Because if failed to update then don't change fill
          this.fill = this.isStarred ? '#FFDC00' : 'none'
          console.log(`Toggled is_starred: ${resp.data.is_starred}`)
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