<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
    :data-svg="dataSvg"
    @click="onClick"
  >
    <slot></slot>
  </svg>
</template>

<script>
export default {
  name: 'ButtonBase',
  props: {
    linkId: String,
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
    dataSvg: {
      type: String
    },
    onClick: {
      type: Function
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