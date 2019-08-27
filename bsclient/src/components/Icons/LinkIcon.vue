<template>
  <g
    :fill="fill"
  >
    <path
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      d="M10.625,12.375 L7.525,15.475 C6.825,16.175 5.925,16.175 5.225,15.475 L4.525,14.775 C3.825,14.074 3.825,13.175 4.525,12.475 L7.625,9.375" />
    <path
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      d="M9.325,7.375 L12.425,4.275 C13.125,3.575 14.025,3.575 14.724,4.275 L15.425,4.975 C16.125,5.675 16.125,6.575 15.425,7.275 L12.325,10.375" />
    <path
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      d="M7.925,11.875 L11.925,7.975" />
  </g>
</template>

<script>
export default {
  name: 'LinkIcon',
  props: {
    fill: {
      type: String,
      default: "none"
    },
    stroke: {
      type: String,
      default: "#000"
    },
    strokeWidth: {
      type: String,
      default: "1.1"
    }
  }
}
</script>