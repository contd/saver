<template>
  <div class="uk-margin-remove uk-padding-remove uk-width-expand">
    <span class="main-title">{{title}}</span>
    <span class="main-subtitle">{{textUpper}}</span>
  </div>
</template>

<script>
export default {
  name: 'TitleItems',
  data() {
    return {
      title: 'Saved',
      subTitle: 'TAG'
    }
  },
  computed: {
    textUpper: function() {
      return this.subTitle.toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped>
$color:                 #666 !default;
$emphasis-color:        #333 !default;

.main-title {
  color: $emphasis-color;
  font-size: 2.0rem;
  font-weight: 700;
  font-family: 'PT Sans Caption';
  display: inline-block;
  margin-left: 0.5em;
}

.main-subtitle {
  color: $color;
  font-size: 2.0rem;
  font-weight: 700;
  font-family: 'PT Sans Caption';
  display: inline-block;
  margin-left: 0.5em;
}

.text-uppercase {
  text-transform: uppercase;
}
</style>