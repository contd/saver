<template>
  <div class="uk-margin-remove uk-padding-remove">
    <slot name="home"></slot>
    <slot name="archive"></slot>
    <slot name="view"></slot>
  </div>
</template>

<script>
export default {
  name: 'NavItems'
}
</script>