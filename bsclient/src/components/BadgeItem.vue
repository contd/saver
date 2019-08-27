<template>
  <span
    class="tag"
    :class="className"
    @click="onTagClick"
  >
    {{name}}
  </span>
</template>

<script>
export default {
  name: 'BadgeItem',
  props: {
    name: {
      type: String,
    },
    tagButtonClick: {
      type: Function,
      required: true
    }
  },
  computed: {
    className() {
      return 'tag-' + this.name
    }
  },
  methods: {
    onTagClick() {
      this.tagButtonClick({
        tag: this.name
      })
    }
  }
}
</script>

<style lang="css">
  .tag {
    border-radius: 3px;
    margin-left: 0.3em;
    padding: 0.5em;
    font-size: 0.8em;
    font-family: inherit;
  }

  .tag:hover {
    font-weight: 700;
  }

  .tag-starred { background-color: #FFDC00; color: #111111; }
  .tag-starred:hover { background-color: #c7ab00; color: #111111; }

  /*=== developer ================ */
  .tag-css { background-color: #001f3f; color: #FFFFFF; }
  .tag-css:hover { background-color: #31466a; color: #FFFFFF; }

  .tag-devops { background-color: #0a2849; color: #FFFFFF; }
  .tag-devops:hover { background-color: #3a5075; color: #FFFFFF; }

  .tag-github { background-color: #153153; color: #FFFFFF; }
  .tag-github:hover { background-color: #435a80; color: #FFFFFF; }

  .tag-golang { background-color: #1f3a5d; color: #FFFFFF; }
  .tag-golang:hover { background-color: #4d648a; color: #FFFFFF; }

  .tag-programming { background-color: #2a4367; color: #FFFFFF; }
  .tag-programming:hover { background-color: #576e95; color: #FFFFFF; }

  .tag-javascript { background-color: #344c71; color: #FFFFFF; }
  .tag-javascript:hover { background-color: #6278a0; color: #FFFFFF; }

  .tag-nodejs { background-color: #3f567a; color: #FFFFFF; }
  .tag-nodejs:hover { background-color: #6d82a9; color: #FFFFFF; }

  .tag-typescript { background-color: #495f84; color: #FFFFFF; }
  .tag-typescript:hover { background-color: #778cb4; color: #FFFFFF; }

  .tag-vuejs { background-color: #54688e; color: #FFFFFF; }
  .tag-vuejs:hover { background-color: #8296be; color: #FFFFFF; }

  .tag-media { background-color: #5e7198; color: #FFFFFF; }
  .tag-media:hover { background-color: #8d9fc9; color: #FFFFFF; }

  /*=== humanity ================ */
  .tag-brain { background-color: #3d9970; color: #111111; }
  .tag-brain:hover { background-color: #006a45; color: #111111; }

  .tag-health { background-color: #4eaa80; color: #111111; }
  .tag-health:hover { background-color: #147a53; color: #111111; }

  .tag-security { background-color: #5fbb90; color: #111111; }
  .tag-security:hover { background-color: #2b8a62; color: #111111; }

  .tag-social { background-color: #6fcba0; color: #111111; }
  .tag-social:hover { background-color: #3c9a71; color: #111111; }

  .tag-politics { background-color: #80dcb0; color: #111111; }
  .tag-politics:hover { background-color: #4eaa81; color: #111111; }

  .tag-history { background-color: #91edc0; color: #111111; }
  .tag-history:hover { background-color: #5fba90; color: #111111; }

  .tag-travel { background-color: #a2fed0; color: #111111; }
  .tag-travel:hover { background-color: #70ca9f; color: #111111; }

  /*=== technology ================ */
  .tag-awesome { background-color: #7fdbff; color: #111111; }
  .tag-awesome:hover { background-color: #47a9cc; color: #111111; }

  .tag-blockchain { background-color: #8bdfff; color: #111111; }
  .tag-blockchain:hover { background-color: #56adcc; color: #111111; }

  .tag-data { background-color: #97e3ff; color: #111111; }
  .tag-data:hover { background-color: #64b1cc; color: #111111; }

  .tag-embedded { background-color: #a3e7ff; color: #111111; }
  .tag-embedded:hover { background-color: #71b5cc; color: #111111; }

  .tag-math { background-color: #afebff; color: #111111; }
  .tag-math:hover { background-color: #7db9cc; color: #111111; }

  .tag-machinelearn { background-color: #baefff; color: #111111; }
  .tag-machinelearn:hover { background-color: #88bccc; color: #111111; }

  .tag-maker { background-color: #c6f3ff; color: #111111; }
  .tag-maker:hover { background-color: #94c0cc; color: #111111; }

  .tag-linux { background-color: #d2f7ff; color: #111111; }
  .tag-linux:hover { background-color: #a0c4cc; color: #111111; }

  .tag-science { background-color: #defbff; color: #111111; }
  .tag-science:hover { background-color: #acc8cc; color: #111111; }

  .tag-shell { background-color: #eaffff; color: #111111; }
  .tag-shell:hover { background-color: #b8cccc; color: #111111; }

  /*=== utility ================ */
  .tag-entrepreneur { background-color: #ff4136; color: #111111; }
  .tag-entrepreneur:hover { background-color: #c4000c; color: #111111; }

  .tag-read { background-color: #ff7763; color: #111111; }
  .tag-read:hover { background-color: #c74638; color: #111111; }

  .tag-sites { background-color: #ffad90; color: #111111; }
  .tag-sites:hover { background-color: #c97d62; color: #111111; }

  .tag-developer { background-color: #001F3F; color: #FFFFFF; }
  .tag-developer:hover { background-color: #31466a; color: #FFFFFF; }

  .tag-humanity { background-color: #3D9970; color: #111111; }
  .tag-humanity:hover { background-color: #006a45; color: #111111; }

  .tag-utility { background-color: #FF4136; color: #111111; }
  .tag-utility:hover { background-color: #c4000c; color: #111111; }

  .tag-technology { background-color: #7FDBFF; color: #111111; }
  .tag-technology:hover { background-color: #47a9cc; color: #111111; }

  .tag-productivity { background-color: #85144B; color: #FFFFFF; }
  .tag-productivity:hover { background-color: #b84977; color: #FFFFFF; }

  .tag-green { background-color: #2ECC40; color: #111111; }
  .tag-green:hover { background-color: #009a00; color: #111111; }

  .tag-yellow { background-color: #FFDC00; color: #111111; }
  .tag-yellow:hover { background-color: #c7ab00; color: #111111; }

  .tag-orange { background-color: #FF851B; color: #111111; }
  .tag-orange:hover { background-color: #c55600; color: #111111; }

  .tag-white { background-color: #FFFFFF; color: #111111; }
  .tag-white:hover { background-color: #cccccc; color: #111111; }

  .tag-silver { background-color: #DDDDDD; color: #111111; }
  .tag-silver:hover { background-color: #ababab; color: #111111; }

  .tag-gray { background-color: #AAAAAA; color: #111111; }
  .tag-gray:hover { background-color: #7b7b7b; color: #111111; }

  .tag-black { background-color: #111111; color: #FFFFFF; }
  .tag-black:hover { background-color: #373737; color: #FFFFFF; }
</style>