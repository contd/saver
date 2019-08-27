<template>
  <svg
    :width="width"
    :height="height"
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title :id="iconName" lang="en">{{iconName}} icon</title>
    <slot></slot>
  </svg>
</template>

<script>
export default {
  name: 'LinkIcon',
  props: {
    iconName: {
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